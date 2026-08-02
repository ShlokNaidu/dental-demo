import { describe, it, expect } from "vitest";
import {
  isMedicalEmergency,
  isValidPhoneNumber,
  formatPhoneNumber,
  isValidBookingDate,
  isValidBookingTime,
} from "@/lib/utils/validators";

describe("lib/utils/validators", () => {
  describe("isMedicalEmergency", () => {
    it("detects medical emergency keywords correctly", () => {
      expect(isMedicalEmergency("I have severe pain in my lower jaw")).toBe(true);
      expect(isMedicalEmergency("My tooth is bleeding heavily")).toBe(true);
      expect(isMedicalEmergency("I need an emergency appointment for swelling")).toBe(true);
    });

    it("returns false for standard non-emergency inquiry", () => {
      expect(isMedicalEmergency("What are your opening hours on Monday?")).toBe(false);
      expect(isMedicalEmergency("How much does teeth cleaning cost?")).toBe(false);
      expect(isMedicalEmergency("I want to book an appointment for tomorrow")).toBe(false);
    });
  });

  describe("isValidPhoneNumber", () => {
    it("validates 10-digit to 14-digit phone numbers", () => {
      expect(isValidPhoneNumber("9876543210")).toBe(true);
      expect(isValidPhoneNumber("+91 98765 43210")).toBe(true);
      expect(isValidPhoneNumber("123")).toBe(false);
      expect(isValidPhoneNumber("abc1234567890")).toBe(false);
    });
  });

  describe("formatPhoneNumber", () => {
    it("formats 10 digit Indian number with prefix", () => {
      expect(formatPhoneNumber("9876543210")).toBe("+91 98765 43210");
    });
  });

  describe("isValidBookingDate", () => {
    it("rejects past dates", () => {
      expect(isValidBookingDate("2020-01-01")).toBe(false);
    });

    it("accepts current date and future dates", () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const todayStr = `${year}-${month}-${day}`;
      expect(isValidBookingDate(todayStr)).toBe(true);
      expect(isValidBookingDate("2030-12-31")).toBe(true);
    });
  });

  describe("isValidBookingTime", () => {
    it("validates 12-hour AM/PM and 24-hour time strings", () => {
      expect(isValidBookingTime("10:00 AM")).toBe(true);
      expect(isValidBookingTime("04:30 PM")).toBe(true);
      expect(isValidBookingTime("14:30")).toBe(true);
      expect(isValidBookingTime("invalid-time")).toBe(false);
    });
  });
});
