import { describe, it, expect, vi } from "vitest";
import { POST } from "@/app/api/send-booking/route";

vi.mock("@/lib/supabase/server", () => ({
  createServerClient: () => ({
    from: () => ({
      insert: () => ({
        select: () => ({
          single: async () => ({
            data: { id: "booking_123", patient_name: "Anita Roy" },
            error: null,
          }),
        }),
      }),
    }),
  }),
}));

vi.mock("@/lib/whatsapp/send", () => ({
  sendWhatsAppMessage: async () => ({ success: true }),
}));

describe("API Route: /api/send-booking Integration", () => {
  it("successfully creates booking and returns success status", async () => {
    const payload = {
      clinicId: "smile-care-indore",
      patientName: "Anita Roy",
      patientPhone: "9876543210",
      serviceName: "Root Canal Treatment",
      bookingDate: "2026-08-15",
      bookingTime: "11:30 AM",
      source: "WEB_WIDGET",
    };

    const req = new Request("http://localhost:3000/api/send-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.whatsappSent).toBe(true);
    expect(json.booking).toBeDefined();
  });

  it("returns 400 when required fields are missing", async () => {
    const payload = {
      patientName: "Anita Roy",
    };

    const req = new Request("http://localhost:3000/api/send-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const json = await res.json();
    expect(json.success).toBe(false);
  });
});
