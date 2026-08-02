import { describe, it, expect } from "vitest";
import { processIncomingMessage } from "@/lib/booking/stateMachine";

describe("lib/booking/stateMachine", () => {
  it("flags emergency message immediately from IDLE state", () => {
    const result = processIncomingMessage("IDLE", {}, "Doctor I have severe pain and bleeding!");
    expect(result.isEmergencyHandled).toBe(true);
    expect(result.nextStep).toBe("IDLE");
    expect(result.replyMessage).toContain("Urgent Notice");
  });

  it("initiates booking flow when user says 'Book'", () => {
    const result = processIncomingMessage("IDLE", {}, "Hi, I want to book an appointment");
    expect(result.nextStep).toBe("AWAITING_SERVICE");
    expect(result.replyMessage).toContain("select the service");
  });

  it("advances from AWAITING_SERVICE to AWAITING_DATE when valid service number selected", () => {
    const result = processIncomingMessage("AWAITING_SERVICE", {}, "1");
    expect(result.nextStep).toBe("AWAITING_DATE");
    expect(result.updatedContext.service).toBe("Teeth Cleaning");
    expect(result.replyMessage).toContain("Selected service: Teeth Cleaning");
  });

  it("advances from AWAITING_DATE to AWAITING_TIME when 'tomorrow' provided", () => {
    const result = processIncomingMessage(
      "AWAITING_DATE",
      { service: "Teeth Cleaning" },
      "Tomorrow"
    );
    expect(result.nextStep).toBe("AWAITING_TIME");
    expect(result.updatedContext.date).toBeDefined();
    expect(result.replyMessage).toContain("time slot");
  });

  it("advances from AWAITING_TIME to AWAITING_NAME with flexible time input '11 am'", () => {
    const result = processIncomingMessage(
      "AWAITING_TIME",
      { service: "Teeth Cleaning", date: "2026-09-10" },
      "11 am"
    );
    expect(result.nextStep).toBe("AWAITING_NAME");
    expect(result.updatedContext.time).toBe("11:00 AM");
    expect(result.replyMessage).toContain("Time slot confirmed: 11:00 AM");
  });

  it("completes booking when name is provided in AWAITING_NAME step", () => {
    const result = processIncomingMessage(
      "AWAITING_NAME",
      { service: "Teeth Cleaning", date: "2026-09-10", time: "10:30 AM" },
      "Suresh Sharma"
    );
    expect(result.nextStep).toBe("CONFIRMED");
    expect(result.isBookingComplete).toBe(true);
    expect(result.updatedContext.name).toBe("Suresh Sharma");
    expect(result.replyMessage).toContain("Appointment Confirmed!");
  });
});
