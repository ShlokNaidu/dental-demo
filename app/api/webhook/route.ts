import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { processIncomingMessage } from "@/lib/booking/stateMachine";
import { generateGroqResponse } from "@/lib/groq/client";
import { sendWhatsAppMessage } from "@/lib/whatsapp/send";
import { Conversation, StepState, WhatsAppWebhookPayload } from "@/types";
import { DEFAULT_CLINIC_ID } from "@/lib/utils/constants";

// GET Handler for WhatsApp Webhook Verification
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "smile_care_verify_token";

  if (mode && token) {
    if (mode === "subscribe" && token === verifyToken) {
      console.log("WhatsApp Webhook Verified Successfully!");
      return new Response(challenge, { status: 200 });
    } else {
      return new Response("Forbidden: Invalid verify token", { status: 403 });
    }
  }

  return new Response("Bad Request", { status: 400 });
}

// POST Handler for Incoming WhatsApp Messages
export async function POST(request: Request) {
  const startTime = Date.now();
  try {
    const payload: WhatsAppWebhookPayload = await request.json();

    // Check payload structure
    const entry = payload?.entry?.[0];
    const change = entry?.changes?.[0];
    const message = change?.value?.messages?.[0];

    if (!message || message.type !== "text" || !message.text?.body) {
      // Not a text message or status update payload
      return NextResponse.json({ status: "ignored" }, { status: 200 });
    }

    const fromPhone = message.from;
    const messageText = message.text.body;

    console.log(`Incoming WhatsApp message from ${fromPhone}: "${messageText}"`);

    const supabase = createServerClient();

    // 1. Fetch or create active conversation from Supabase
    let currentStep: StepState = "IDLE";
    let conversationContext = {};

    const { data: convData } = await supabase
      .from("conversations")
      .select("*")
      .eq("phone_number", fromPhone)
      .single();

    if (convData) {
      currentStep = convData.current_step as StepState;
      conversationContext = convData.context || {};
    }

    // 2. Run pure state machine logic
    const stateResult = processIncomingMessage(currentStep, conversationContext, messageText);

    // 3. Handle Medical Emergency Flag
    if (stateResult.isEmergencyHandled) {
      await supabase.from("human_followup_flags").insert([
        {
          phone_number: fromPhone,
          reason: stateResult.emergencyReason || "Medical Emergency Keyword",
          original_message: messageText,
          status: "PENDING",
        },
      ]);

      await sendWhatsAppMessage(fromPhone, stateResult.replyMessage);

      // Reset conversation step
      await supabase.from("conversations").upsert({
        phone_number: fromPhone,
        current_step: "IDLE",
        context: {},
        updated_at: new Date().toISOString(),
      });

      return NextResponse.json({ status: "emergency_flagged" }, { status: 200 });
    }

    // 4. Handle Active Booking Flow Step
    if (stateResult.nextStep !== "IDLE" || stateResult.isBookingComplete) {
      // Send State Machine Reply
      await sendWhatsAppMessage(fromPhone, stateResult.replyMessage);

      if (stateResult.isBookingComplete && stateResult.updatedContext) {
        // Insert confirmed booking into Supabase database
        await supabase.from("bookings").insert([
          {
            clinic_id: DEFAULT_CLINIC_ID,
            patient_name: stateResult.updatedContext.name || "WhatsApp Patient",
            patient_phone: fromPhone,
            service_name: stateResult.updatedContext.service || "Dental Service",
            booking_date: stateResult.updatedContext.date || new Date().toISOString().split("T")[0],
            booking_time: stateResult.updatedContext.time || "10:00 AM",
            status: "CONFIRMED",
            source: "WHATSAPP",
          },
        ]);

        // Reset conversation state
        await supabase.from("conversations").upsert({
          phone_number: fromPhone,
          current_step: "IDLE",
          context: {},
          updated_at: new Date().toISOString(),
        });
      } else {
        // Update conversation state and context for next turn
        await supabase.from("conversations").upsert({
          phone_number: fromPhone,
          current_step: stateResult.nextStep,
          context: stateResult.updatedContext,
          updated_at: new Date().toISOString(),
        });
      }

      const duration = Date.now() - startTime;
      console.log(`Webhook step processing finished in ${duration}ms`);
      return NextResponse.json({ status: "step_processed" }, { status: 200 });
    }

    // 5. General/Logistics FAQ Question -> Call Groq AI Fallback
    // Fetch clinic system prompt from database
    let systemPrompt: string | undefined = undefined;
    const { data: clinicData } = await supabase
      .from("clinics")
      .select("system_prompt")
      .eq("id", DEFAULT_CLINIC_ID)
      .single();

    if (clinicData?.system_prompt) {
      systemPrompt = clinicData.system_prompt;
    }

    const groqReply = await generateGroqResponse({
      userQuery: messageText,
      systemPrompt: systemPrompt,
    });

    await sendWhatsAppMessage(fromPhone, groqReply);

    const duration = Date.now() - startTime;
    console.log(`Webhook Groq processing finished in ${duration}ms`);
    return NextResponse.json({ status: "groq_replied" }, { status: 200 });
  } catch (error: any) {
    console.error("Fail-safe error in POST /api/webhook:", error);
    // Return HTTP 200 to WhatsApp to avoid payload retries while keeping error logged
    return NextResponse.json(
      { status: "error_handled", error: error.message },
      { status: 200 }
    );
  }
}
