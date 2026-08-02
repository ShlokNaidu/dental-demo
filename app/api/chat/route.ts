import { NextResponse } from "next/server";
import { processIncomingMessage } from "@/lib/booking/stateMachine";
import { generateGroqResponse } from "@/lib/groq/client";
import { createServerClient } from "@/lib/supabase/server";
import { StepState, ConversationContext } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, currentStep = "IDLE", context = {}, phone = "+919876501234" } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, error: "Message text is required" },
        { status: 400 }
      );
    }

    const stateResult = processIncomingMessage(
      currentStep as StepState,
      context as ConversationContext,
      message
    );

    let replyText = stateResult.replyMessage;

    // If in IDLE and not booking intent or emergency, delegate to Groq AI
    if (stateResult.nextStep === "IDLE" && !stateResult.isEmergencyHandled && !replyText) {
      replyText = await generateGroqResponse({
        userQuery: message,
        systemPrompt:
          "You are an intelligent, friendly AI receptionist for Smile Care Dental Clinic in Vijay Nagar, Indore. Answer patient queries concisely in under 3 sentences. If asked about booking, direct them to type 'Book' or use our online form.",
      });
    }

    const supabase = createServerClient();

    // If emergency flagged, insert into human_followup_flags
    if (stateResult.isEmergencyHandled) {
      await supabase.from("human_followup_flags").insert([
        {
          clinic_id: "smile-care-indore",
          phone_number: phone,
          patient_name: "Web Visitor",
          original_message: message,
          reason: stateResult.emergencyReason || "Medical Emergency Keyword",
          status: "PENDING",
        },
      ]);
    }

    // Save message to conversations table
    await supabase.from("conversations").insert([
      {
        clinic_id: "smile-care-indore",
        phone_number: phone,
        role: "user",
        message_text: message,
      },
      {
        clinic_id: "smile-care-indore",
        phone_number: phone,
        role: "assistant",
        message_text: replyText,
      },
    ]);

    return NextResponse.json({
      success: true,
      reply: replyText,
      nextStep: stateResult.nextStep,
      updatedContext: stateResult.updatedContext,
      isEmergencyHandled: stateResult.isEmergencyHandled,
      isBookingComplete: stateResult.isBookingComplete,
    });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      {
        success: true,
        reply:
          "Thank you for contacting Smile Care Dental Clinic! Our clinic is open Mon-Sat 10 AM - 8 PM in Vijay Nagar, Indore. Reply 'Book' to schedule an appointment.",
        nextStep: "IDLE",
        updatedContext: {},
      },
      { status: 200 }
    );
  }
}
