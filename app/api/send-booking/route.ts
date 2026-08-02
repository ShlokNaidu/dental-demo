import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { sendWhatsAppMessage } from "@/lib/whatsapp/send";
import { CLINIC_NAME } from "@/lib/utils/constants";

export async function POST(request: Request) {
  const startTime = Date.now();
  try {
    const body = await request.json();
    const { clinicId, patientName, patientPhone, serviceName, bookingDate, bookingTime, source } = body;

    if (!patientName || !patientPhone || !serviceName || !bookingDate || !bookingTime) {
      return NextResponse.json(
        { success: false, error: "Missing required booking details" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();
    const newBooking = {
      clinic_id: clinicId || "smile-care-indore",
      patient_name: patientName,
      patient_phone: patientPhone,
      service_name: serviceName,
      booking_date: bookingDate,
      booking_time: bookingTime,
      status: "CONFIRMED",
      source: source || "WEB_WIDGET",
    };

    // Insert into Supabase
    let bookingResult = { id: `mock_${Date.now()}`, ...newBooking, created_at: new Date().toISOString() };
    const { data: dbData, error: dbError } = await supabase.from("bookings").insert([newBooking]).select().single();

    if (!dbError && dbData) {
      bookingResult = dbData;
    } else if (dbError) {
      console.warn("Supabase booking insert warning:", dbError.message);
    }

    // Send WhatsApp confirmation ticket message
    const whatsappMsg = `🎉 *Appointment Confirmed!*

Dear *${patientName}*, your appointment at *${CLINIC_NAME}* has been successfully reserved.

📌 *Details:*
• *Service:* ${serviceName}
• *Date:* ${bookingDate}
• *Time:* ${bookingTime}
• *Location:* Scheme 54, Vijay Nagar, Indore, MP

Need to reschedule or cancel? Reply to this message anytime!`;

    const waResult = await sendWhatsAppMessage(patientPhone, whatsappMsg);

    const totalDuration = Date.now() - startTime;
    console.log(`POST /api/send-booking completed in ${totalDuration}ms`);

    return NextResponse.json({
      success: true,
      booking: bookingResult,
      whatsappSent: waResult.success,
      executionTimeMs: totalDuration,
    });
  } catch (err: any) {
    console.error("Error in /api/send-booking:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
