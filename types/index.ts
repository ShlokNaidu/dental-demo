export interface ServiceItem {
  id?: string;
  name: string;
  price: number;
  description?: string;
  duration?: string;
}

export interface Clinic {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  services: ServiceItem[];
  system_prompt: string;
  updated_at?: string;
}

export type BookingStatus = "CONFIRMED" | "CANCELLED" | "COMPLETED";
export type BookingSource = "WEB_WIDGET" | "WHATSAPP";

export interface Booking {
  id: string;
  clinic_id: string;
  patient_name: string;
  patient_phone: string;
  service_name: string;
  booking_date: string;
  booking_time: string;
  status: BookingStatus;
  source: BookingSource;
  created_at: string;
}

export type StepState =
  | "IDLE"
  | "AWAITING_SERVICE"
  | "AWAITING_DATE"
  | "AWAITING_TIME"
  | "AWAITING_NAME"
  | "CONFIRMED";

export interface ConversationContext {
  service?: string;
  date?: string;
  time?: string;
  name?: string;
}

export interface Conversation {
  id: string;
  phone_number: string;
  current_step: StepState;
  context: ConversationContext;
  created_at: string;
  updated_at: string;
}

export type FollowUpStatus = "PENDING" | "RESOLVED";

export interface HumanFollowUpFlag {
  id: string;
  phone_number: string;
  patient_name?: string;
  reason: string;
  original_message: string;
  status: FollowUpStatus;
  created_at: string;
}

export interface WebhookMessage {
  from: string;
  id: string;
  timestamp: string;
  text?: {
    body: string;
  };
  type: string;
}

export interface WebhookEntry {
  id: string;
  changes: Array<{
    value: {
      messaging_product: string;
      metadata: {
        display_phone_number: string;
        phone_number_id: string;
      };
      messages?: WebhookMessage[];
    };
    field: string;
  }>;
}

export interface WhatsAppWebhookPayload {
  object: string;
  entry: WebhookEntry[];
}
