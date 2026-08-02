import { WhatsAppSendResponse, WhatsAppTextMessage } from "./types";

export async function sendWhatsAppMessage(
  toPhoneNumber: string,
  messageText: string
): Promise<{ success: boolean; data?: WhatsAppSendResponse; error?: string }> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;

  if (!token || !phoneId) {
    console.warn("WHATSAPP_TOKEN or WHATSAPP_PHONE_ID not set. Simulating message send.");
    return {
      success: true,
      data: {
        messaging_product: "whatsapp",
        contacts: [{ input: toPhoneNumber, wa_id: toPhoneNumber }],
        messages: [{ id: `mock_msg_${Date.now()}` }],
      },
    };
  }

  const cleanPhone = toPhoneNumber.replace(/[^\d]/g, "");

  const payload: WhatsAppTextMessage = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: cleanPhone,
    type: "text",
    text: {
      preview_url: false,
      body: messageText,
    },
  };

  const startTime = Date.now();

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${phoneId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const durationMs = Date.now() - startTime;
    console.log(`WhatsApp Send API latency: ${durationMs}ms`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`WhatsApp API Error (${response.status}):`, errorText);
      return { success: false, error: errorText };
    }

    const data: WhatsAppSendResponse = await response.json();
    return { success: true, data };
  } catch (error: any) {
    console.error("WhatsApp API Network Exception:", error);
    return { success: false, error: error.message || "Network request failed" };
  }
}
