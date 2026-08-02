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
  const lower = text.toLowerCase();

  // 1. Check for medical emergency keyword first
  if (isMedicalEmergency(text)) {
    return {
      nextStep: "IDLE",
      updatedContext: context,
      replyMessage:
        "⚠️ Urgent Notice: We have flagged your request as an urgent medical inquiry. A dentist or clinical assistant from Smile Care Dental Clinic will contact you immediately. If you are experiencing severe symptoms, please visit the nearest emergency room.",
      isEmergencyHandled: true,
      emergencyReason: `Medical keywords detected: "${text}"`,
    };
  }

  // 2. Explicit booking intent detection
  const isExplicitBooking =
    lower === "book" ||
    lower.startsWith("book ") ||
    lower.includes("book an appointment") ||
    lower.includes("schedule an appointment") ||
    lower.includes("i want to book") ||
    lower === "hi" ||
    lower === "hello" ||
    lower === "start";

  if (isExplicitBooking && currentStep === "IDLE") {
    const serviceOptions = CLINIC_SERVICES.map(
      (s, i) => `${i + 1}. ${s.name} (₹${s.price})`
    ).join("\n");

    return {
      nextStep: "AWAITING_SERVICE",
      updatedContext: {},
      replyMessage: `Welcome to Smile Care Dental Clinic! 🦷\n\nPlease select the service you would like to book by replying with the number or name:\n\n${serviceOptions}`,
    };
  }

  // 3. State machine handling
  switch (currentStep) {
    case "AWAITING_SERVICE": {
      let selectedService = "";
      const numIndex = parseInt(text, 10);

      if (!isNaN(numIndex) && numIndex >= 1 && numIndex <= CLINIC_SERVICES.length) {
        selectedService = CLINIC_SERVICES[numIndex - 1].name;
      } else {
        const found = CLINIC_SERVICES.find(
          (s) => s.name.toLowerCase() === lower || lower.includes(s.name.toLowerCase())
        );
        if (found) {
          selectedService = found.name;
        }
      }

      if (!selectedService) {
        const serviceOptions = CLINIC_SERVICES.map(
          (s, i) => `${i + 1}. ${s.name} (₹${s.price})`
        ).join("\n");

        return {
          nextStep: "AWAITING_SERVICE",
          updatedContext: context,
          replyMessage: `Please select a valid service from the list below:\n\n${serviceOptions}`,
        };
      }

      return {
        nextStep: "AWAITING_DATE",
        updatedContext: { ...context, service: selectedService },
        replyMessage: `Great choice! Service selected: ${selectedService}.\n\nPlease provide your preferred date (YYYY-MM-DD, or 'Today' / 'Tomorrow').`,
      };
    }

    case "AWAITING_DATE": {
      let parsedDate = text;
      if (lower === "today") {
        parsedDate = new Date().toISOString().split("T")[0];
      } else if (lower === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        parsedDate = tomorrow.toISOString().split("T")[0];
      }

      if (!isValidBookingDate(parsedDate)) {
        return {
          nextStep: "AWAITING_DATE",
          updatedContext: context,
          replyMessage:
            "Please provide a valid date (YYYY-MM-DD or 'Today'/'Tomorrow') for today or a future date.",
        };
      }

      return {
        nextStep: "AWAITING_TIME",
        updatedContext: { ...context, date: parsedDate },
        replyMessage: `Date set to ${parsedDate}.\n\nPlease select a time slot (e.g. 10:00 AM, 11:30 AM, 02:00 PM, 04:30 PM, 06:00 PM).`,
      };
    }

    case "AWAITING_TIME": {
      if (!isValidBookingTime(text)) {
        return {
          nextStep: "AWAITING_TIME",
          updatedContext: context,
          replyMessage:
            "Please provide a valid time format, e.g., '10:00 AM', '02:00 PM', or '06:00 PM'.",
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
        replyMessage: `🎉 Appointment Confirmed!\n\nPatient Name: ${finalContext.name}\nService: ${finalContext.service}\nDate: ${finalContext.date}\nTime: ${finalContext.time}\nLocation: Smile Care Dental Clinic, Scheme 54, Vijay Nagar, Indore.\n\nThank you! We look forward to seeing you.`,
        isBookingComplete: true,
      };
    }

    case "IDLE":
    default: {
      return {
        nextStep: "IDLE",
        updatedContext: {},
        replyMessage: "",
      };
    }
  }
}
