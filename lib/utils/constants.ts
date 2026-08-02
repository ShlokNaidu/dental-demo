import { ServiceItem } from "@/types";

export const DEFAULT_CLINIC_ID = "smile-care-indore";
export const CLINIC_NAME = "Smile Care Dental Clinic";
export const CLINIC_ADDRESS = "Scheme 54, Vijay Nagar, Indore, MP 452010";
export const CLINIC_PHONE = "+91 98765 43210";
export const CLINIC_HOURS = "Mon-Sat: 10:00 AM - 8:00 PM, Sun: Closed";

export const CLINIC_SERVICES: ServiceItem[] = [
  {
    id: "cleaning",
    name: "Teeth Cleaning",
    price: 800,
    description: "Professional scaling and polishing to remove plaque and tartar build-up.",
    duration: "45 mins",
  },
  {
    id: "root-canal",
    name: "Root Canal Treatment",
    price: 3500,
    description: "Painless single/multi-sitting endodontic treatment for infected teeth.",
    duration: "60 mins",
  },
  {
    id: "braces-consult",
    name: "Dental Braces Consultation",
    price: 500,
    description: "Expert orthodontic consultation for traditional braces and clear aligners.",
    duration: "30 mins",
  },
  {
    id: "checkup",
    name: "Comprehensive Checkup",
    price: 300,
    description: "Complete oral health examination including intraoral camera inspection.",
    duration: "30 mins",
  },
];

export const MEDICAL_EMERGENCY_KEYWORDS = [
  "severe pain",
  "extreme pain",
  "bleeding",
  "swelling",
  "pus",
  "infection",
  "broken tooth",
  "knocked out",
  "trauma",
  "fever",
  "unbearable",
  "emergency",
  "swollen face",
  "jaw locked",
];

export const GROQ_MODEL = "llama-3.1-8b-instant";
