import Groq from "groq-sdk";
import { GROQ_MODEL, CLINIC_NAME, CLINIC_ADDRESS, CLINIC_HOURS, CLINIC_PHONE, DOCTOR_NAME, DOCTOR_TITLE } from "../utils/constants";

let groqInstance: Groq | null = null;

function getGroqClient(): Groq | null {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;
  if (!groqInstance) {
    groqInstance = new Groq({ apiKey });
  }
  return groqInstance;
}

export interface AnswerQuestionOptions {
  userQuery: string;
  systemPrompt?: string;
}

export async function generateGroqResponse(options: AnswerQuestionOptions): Promise<string> {
  const startTime = Date.now();
  try {
    const groq = getGroqClient();
    if (!groq) {
      console.warn("GROQ_API_KEY is not set. Returning fallback response.");
      return `Thank you for contacting ${CLINIC_NAME}! Our clinic is open ${CLINIC_HOURS} at ${CLINIC_ADDRESS}. For appointments, reply 'Book'.`;
    }

    const defaultPrompt = `
You are the intelligent, polite, and helpful AI Dental Assistant for ${CLINIC_NAME} in Indore.

CLINIC INFORMATION:
- Name: ${CLINIC_NAME}
- Location / Address: ${CLINIC_ADDRESS}
- Opening Hours: ${CLINIC_HOURS} (Monday to Saturday: 10:00 AM - 8:00 PM, Sunday: Closed)
- Phone & WhatsApp: ${CLINIC_PHONE}
- Lead Dental Surgeon: ${DOCTOR_NAME}, ${DOCTOR_TITLE} (15+ Years Experience)

SERVICES & PRICING:
1. Teeth Cleaning / Scaling & Polishing: ₹800 (45 mins)
2. Root Canal Treatment (Painless Single/Multi-Sitting): ₹3,500 (60 mins)
3. Braces & Clear Aligners Consultation: ₹500 (30 mins)
4. Comprehensive Dental Checkup: ₹300 (30 mins)

RULES FOR RESPONSE:
1. Answer the patient's question directly, warmly, and accurately in 2-3 sentences.
2. If asked about opening hours, state clearly: "We are open Monday to Saturday from 10:00 AM to 8:00 PM (Closed on Sundays)."
3. If asked about booking an appointment, invite them to reply 'Book' to start automated booking or click the online booking button.
4. Keep tone professional, reassuring, and concise.
`;

    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        {
          role: "system",
          content: options.systemPrompt || defaultPrompt,
        },
        {
          role: "user",
          content: options.userQuery,
        },
      ],
      temperature: 0.3,
      max_tokens: 250,
    });

    const durationMs = Date.now() - startTime;
    console.log(`Groq API response time: ${durationMs}ms`);

    return (
      completion.choices[0]?.message?.content?.trim() ||
      `Thank you for reaching out to ${CLINIC_NAME}! Our opening hours are Monday to Saturday from 10:00 AM to 8:00 PM. Reply 'Book' to schedule an appointment.`
    );
  } catch (error) {
    console.error("Error invoking Groq API:", error);
    return `Thank you for reaching out to ${CLINIC_NAME}! Our opening hours are Mon-Sat: 10:00 AM - 8:00 PM in Scheme 54, Vijay Nagar, Indore. Reply 'Book' to schedule your visit.`;
  }
}
