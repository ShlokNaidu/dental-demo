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
 * Strips quotes, whitespace, and parses flexible human time formats (e.g. "11 am", "'11:00 AM'", "4pm", "14:00").
 * Returns normalized string like "11:00 AM" or "04:00 PM", or null if invalid.
 */
export function normalizeBookingTime(timeStr: string): string | null {
  if (!timeStr) return null;

  // Strip surrounding quotes and whitespace
  let clean = timeStr.trim().replace(/^['"]+|['"]+$/g, "").trim();

  // Match e.g. "11:00 AM", "11:00am", "11:30 PM", "11:30pm"
  const fullAmPmMatch = clean.match(/^(0?[1-9]|1[0-2]):([0-5][0-9])\s*(am|pm)$/i);
  if (fullAmPmMatch) {
    let hour = parseInt(fullAmPmMatch[1], 10);
    const min = fullAmPmMatch[2];
    const period = fullAmPmMatch[3].toUpperCase();
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    return `${formattedHour}:${min} ${period}`;
  }

  // Match e.g. "11 am", "11am", "4 pm", "4pm", "9 AM"
  const shortAmPmMatch = clean.match(/^(0?[1-9]|1[0-2])\s*(am|pm)$/i);
  if (shortAmPmMatch) {
    let hour = parseInt(shortAmPmMatch[1], 10);
    const period = shortAmPmMatch[2].toUpperCase();
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    return `${formattedHour}:00 ${period}`;
  }

  // Match 24-hr format e.g. "14:00", "09:30", "18:45"
  const militaryMatch = clean.match(/^(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/);
  if (militaryMatch) {
    let hour = parseInt(militaryMatch[1], 10);
    const min = militaryMatch[2];
    const period = hour >= 12 ? "PM" : "AM";
    let displayHour = hour % 12;
    if (displayHour === 0) displayHour = 12;
    const formattedHour = displayHour < 10 ? `0${displayHour}` : `${displayHour}`;
    return `${formattedHour}:${min} ${period}`;
  }

  // Match single numbers like "10", "11", "2", "4"
  const singleNumMatch = clean.match(/^(0?[1-9]|1[0-2])$/);
  if (singleNumMatch) {
    let hour = parseInt(singleNumMatch[1], 10);
    // Clinic hours 10 AM - 8 PM: 10, 11 -> AM; 1..8 -> PM
    const period = hour >= 10 && hour <= 11 ? "AM" : "PM";
    const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
    return `${formattedHour}:00 ${period}`;
  }

  return null;
}

/**
 * Validates if time string is a recognized time format.
 */
export function isValidBookingTime(timeStr: string): boolean {
  return normalizeBookingTime(timeStr) !== null;
}
