import { ConversationContext, StepState } from "@/types";
import { CLINIC_SERVICES } from "../utils/constants";
import { isMedicalEmergency, isValidBookingDate, isValidBookingTime } from "../utils/validators";

export interface StateMachineResult {
  nextStep: StepState;
  updatedContext: ConversationContext;
  replyMessage: string;
  isEmergencyHandled?: boolean;
  emergencyReason?: string;
  isBookingComplete?: boolean;
}

export function processIncomingMessage(
  currentStep: StepState,
  context: ConversationContext,
  messageText: string
): StateMachineResult {
  const text = messageText.trim();

  // Check for medical emergency keyword first
  if (isMedicalEmergency(text)) {
    return {
      nextStep: "IDLE",
      updatedContext: context,
      replyMessage:
        "⚠️ Urgent Notice: We have flagged your request as an urgent medical inquiry. A dentist or clinical assistant from Smile Care Dental Clinic will contact you immediately on this number. If you are experiencing severe symptoms, please visit the nearest hospital emergency room.",
      isEmergencyHandled: true,
      emergencyReason: `Medical keywords detected: "${text}"`,
    };
  }

  // Handle command/intent keywords to start booking flow
  const lower = text.toLowerCase();
  const isBookingIntent =
    lower.includes("book") ||
    lower.includes("appointment") ||
    lower.includes("schedule") ||
    lower === "hi" ||
    lower === "hello" ||
    lower === "start";

  if (isBookingIntent) {
    const serviceOptions = CLINIC_SERVICES.map(
      (s, i) => `${i + 1}. ${s.name} (₹${s.price})`
    ).join("\n");

    return {
      nextStep: "AWAITING_SERVICE",
      updatedContext: {},
      replyMessage: `Welcome to Smile Care Dental Clinic! 🦷\n\nPlease select the service you would like to book by replying with the number or name:\n\n${serviceOptions}`,
    };
  }

  switch (currentStep) {
    case "AWAITING_SERVICE": {
      let selectedService = "";
      const numIndex = parseInt(text, 10);

      if (!isNaN(numIndex) && numIndex >= 1 && numIndex <= CLINIC_SERVICES.length) {
        selectedService = CLINIC_SERVICES[numIndex - 1].name;
      } else {
        const matched = CLINIC_SERVICES.find((s) =>
          s.name.toLowerCase().includes(text.toLowerCase())
        );
        if (matched) selectedService = matched.name;
      }

      if (!selectedService) {
        const serviceOptions = CLINIC_SERVICES.map(
          (s, i) => `${i + 1}. ${s.name} (₹${s.price})`
        ).join("\n");
        return {
          nextStep: "AWAITING_SERVICE",
          updatedContext: context,
          replyMessage: `Please select a valid service number (1-${CLINIC_SERVICES.length}) or service name from below:\n\n${serviceOptions}`,
        };
      }

      return {
        nextStep: "AWAITING_DATE",
        updatedContext: { ...context, service: selectedService },
        replyMessage: `Great choice! Selected service: ${selectedService}.\n\nPlease provide your preferred date for the appointment (e.g. YYYY-MM-DD or "Tomorrow" / "Today").`,
      };
    }

    case "AWAITING_DATE": {
      let dateValue = text;
      const today = new Date();

      if (text.toLowerCase() === "today") {
        dateValue = today.toISOString().split("T")[0];
      } else if (text.toLowerCase() === "tomorrow") {
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        dateValue = tomorrow.toISOString().split("T")[0];
      }

      if (!isValidBookingDate(dateValue)) {
        return {
          nextStep: "AWAITING_DATE",
          updatedContext: context,
          replyMessage:
            "Please provide a valid date format (YYYY-MM-DD, Today, or Tomorrow) that is not in the past.",
        };
      }

      return {
        nextStep: "AWAITING_TIME",
        updatedContext: { ...context, date: dateValue },
        replyMessage: `Date confirmed: ${dateValue}.\n\nPlease select your preferred appointment time slot (e.g., 10:00 AM, 11:30 AM, 04:00 PM, 06:30 PM). Clinic hours: 10 AM - 8 PM.`,
      };
    }

    case "AWAITING_TIME": {
      if (!isValidBookingTime(text)) {
        return {
          nextStep: "AWAITING_TIME",
          updatedContext: context,
          replyMessage:
            "Please provide a valid time format, e.g., '10:30 AM' or '04:00 PM'.",
        };
      }

      return {
        nextStep: "AWAITING_NAME",
        updatedContext: { ...context, time: text },
        replyMessage: `Time slot confirmed: ${text}.\n\nFinally, please enter your full name to complete the booking.`,
      };
    }

    case "AWAITING_NAME": {
      if (text.length < 2) {
        return {
          nextStep: "AWAITING_NAME",
          updatedContext: context,
          replyMessage: "Please enter your full name (at least 2 characters).",
        };
      }

      const finalContext: ConversationContext = {
        ...context,
        name: text,
      };

      return {
        nextStep: "CONFIRMED",
        updatedContext: finalContext,
        replyMessage: `🎉 Appointment Confirmed!\n\nPatient Name: ${finalContext.name}\nService: ${finalContext.service}\nDate: ${finalContext.date}\nTime: ${finalContext.time}\nLocation: Smile Care Dental Clinic, Vijay Nagar, Indore.\n\nThank you! We look forward to seeing you.`,
        isBookingComplete: true,
      };
    }

    case "CONFIRMED":
    default: {
      return {
        nextStep: "IDLE",
        updatedContext: {},
        replyMessage:
          "How can we help you today? Reply 'Book' to start a new appointment booking or ask any question about our services.",
      };
    }
  }
}
