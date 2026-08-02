import { MEDICAL_EMERGENCY_KEYWORDS } from "./constants";

/**
 * Checks if a string contains any medical emergency keywords requiring immediate human follow-up.
 */
export function isMedicalEmergency(text: string): boolean {
  if (!text) return false;
  const lower = text.toLowerCase();
  return MEDICAL_EMERGENCY_KEYWORDS.some((keyword) => lower.includes(keyword));
}

/**
 * Validates phone number format (basic international / Indian format check).
 */
export function isValidPhoneNumber(phone: string): boolean {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s\-\+\(\)]/g, "");
  return /^\d{10,14}$/.test(cleaned);
}

/**
 * Formats a phone number cleanly with standard spacing.
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[^\d]/g, "");
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}

/**
 * Validates YYYY-MM-DD date string format and checks it is not in the past.
 */
export function isValidBookingDate(dateStr: string): boolean {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const [year, month, day] = dateStr.split("-").map(Number);
  const targetDate = new Date(year, month - 1, day, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return !isNaN(targetDate.getTime()) && targetDate.getTime() >= today.getTime();
}

/**
 * Validates time string format (e.g., "10:00 AM", "02:30 PM", "14:00").
 */
export function isValidBookingTime(timeStr: string): boolean {
  if (!timeStr) return false;
  return /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM|am|pm)$/i.test(timeStr.trim()) ||
    /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(timeStr.trim());
}
