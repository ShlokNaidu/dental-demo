import Groq from "groq-sdk";
import { GROQ_MODEL } from "../utils/constants";

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
      return "Thank you for contacting Smile Care Dental Clinic! Our clinic is open Mon-Sat 10 AM - 8 PM in Vijay Nagar, Indore. For appointments, please reply 'Book'.";
    }

    const defaultPrompt =
      "You are an intelligent, helpful AI assistant for Smile Care Dental Clinic in Vijay Nagar, Indore. Answer patient inquiries politely and accurately. If asked about booking, direct them to reply 'Book'.";

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
      max_tokens: 300,
    });

    const durationMs = Date.now() - startTime;
    console.log(`Groq API response time: ${durationMs}ms`);

    return (
      completion.choices[0]?.message?.content?.trim() ||
      "Thank you for reaching out to Smile Care Dental Clinic! Reply 'Book' to schedule an appointment."
    );
  } catch (error) {
    console.error("Error invoking Groq API:", error);
    return "Thank you for reaching out to Smile Care Dental Clinic! We received your message. Reply 'Book' to schedule your visit.";
  }
}
