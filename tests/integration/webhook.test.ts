import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST, GET } from "@/app/api/webhook/route";

// Mock Supabase server module
vi.mock("@/lib/supabase/server", () => ({
  createServerClient: () => ({
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
        }),
      }),
      insert: async () => ({ data: [], error: null }),
      upsert: async () => ({ data: [], error: null }),
    }),
  }),
}));

// Mock WhatsApp send module
vi.mock("@/lib/whatsapp/send", () => ({
  sendWhatsAppMessage: async () => ({ success: true }),
}));

// Mock Groq SDK client
vi.mock("@/lib/groq/client", () => ({
  generateGroqResponse: async () => "Mocked Groq FAQ response for dental clinic.",
}));

describe("API Route: /api/webhook Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET Verification", () => {
    it("returns 200 challenge when verify token matches", async () => {
      const req = new Request(
        "http://localhost:3000/api/webhook?hub.mode=subscribe&hub.verify_token=smile_care_verify_token&hub.challenge=12345"
      );
      const res = await GET(req);
      expect(res.status).toBe(200);
      const text = await res.text();
      expect(text).toBe("12345");
    });

    it("returns 403 when verify token is incorrect", async () => {
      const req = new Request(
        "http://localhost:3000/api/webhook?hub.mode=subscribe&hub.verify_token=wrong_token&hub.challenge=12345"
      );
      const res = await GET(req);
      expect(res.status).toBe(403);
    });
  });

  describe("POST Message Event Handler", () => {
    it("handles emergency keyword message gracefully", async () => {
      const emergencyPayload = {
        object: "whatsapp_business_account",
        entry: [
          {
            id: "entry_1",
            changes: [
              {
                field: "messages",
                value: {
                  messaging_product: "whatsapp",
                  metadata: { display_phone_number: "919876543210", phone_number_id: "100" },
                  messages: [
                    {
                      from: "919876511223",
                      id: "msg_1",
                      timestamp: "1700000000",
                      type: "text",
                      text: { body: "Doctor I have severe pain and bleeding!" },
                    },
                  ],
                },
              },
            ],
          },
        ],
      };

      const req = new Request("http://localhost:3000/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emergencyPayload),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.status).toBe("emergency_flagged");
    });

    it("handles general FAQ question by delegating to Groq AI", async () => {
      const faqPayload = {
        object: "whatsapp_business_account",
        entry: [
          {
            id: "entry_1",
            changes: [
              {
                field: "messages",
                value: {
                  messaging_product: "whatsapp",
                  metadata: { display_phone_number: "919876543210", phone_number_id: "100" },
                  messages: [
                    {
                      from: "919876511223",
                      id: "msg_2",
                      timestamp: "1700000000",
                      type: "text",
                      text: { body: "What are your clinic opening hours on Sunday?" },
                    },
                  ],
                },
              },
            ],
          },
        ],
      };

      const req = new Request("http://localhost:3000/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(faqPayload),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.status).toBe("groq_replied");
    });

    it("handles malformed payload without crashing (fail-safe test)", async () => {
      const malformedPayload = { invalidKey: true };

      const req = new Request("http://localhost:3000/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(malformedPayload),
      });

      const res = await POST(req);
      expect(res.status).toBe(200);
      const json = await res.json();
      expect(json.status).toBe("ignored");
    });
  });
});
