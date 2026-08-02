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

    // If replyText is empty (IDLE state general inquiry), invoke Groq AI
    if (!replyText && stateResult.nextStep === "IDLE" && !stateResult.isEmergencyHandled) {
      replyText = await generateGroqResponse({
        userQuery: message,
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
          "Thank you for contacting Smile Care Dental Clinic! Our clinic is open Monday to Saturday from 10:00 AM to 8:00 PM in Scheme 54, Vijay Nagar, Indore. Reply 'Book' to schedule an appointment.",
        nextStep: "IDLE",
        updatedContext: {},
      },
      { status: 200 }
    );
  }
}
