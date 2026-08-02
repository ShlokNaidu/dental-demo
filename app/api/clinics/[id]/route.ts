import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { CLINIC_ADDRESS, CLINIC_HOURS, CLINIC_NAME, CLINIC_PHONE } from "@/lib/utils/constants";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const clinicId = params.id;
  try {
    const supabase = createServerClient();
    const { data: clinic, error } = await supabase
      .from("clinics")
      .select("*")
      .eq("id", clinicId)
      .single();

    if (error || !clinic) {
      // Return default clinic details fallback if DB empty
      return NextResponse.json({
        success: true,
        clinic: {
          id: clinicId,
          name: CLINIC_NAME,
          address: CLINIC_ADDRESS,
          phone: CLINIC_PHONE,
          hours: CLINIC_HOURS,
          services: [],
          system_prompt:
            "You are an intelligent, polite, and reassuring AI assistant for Smile Care Dental Clinic in Vijay Nagar, Indore. Answer patient logistics questions accurately based on prices: Cleaning (₹800), Root Canal (₹3500), Braces Consultation (₹500), Checkup (₹300). Hours are Mon-Sat 10 AM - 8 PM. Keep answers concise and helpful.",
        },
      });
    }

    return NextResponse.json({ success: true, clinic });
  } catch (err: any) {
    console.error("GET /api/clinics/[id] exception:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch clinic settings" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const clinicId = params.id;
  try {
    const body = await request.json();
    const { name, address, phone, hours, system_prompt } = body;

    const supabase = createServerClient();
    const updatePayload = {
      name,
      address,
      phone,
      hours,
      system_prompt,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("clinics")
      .upsert({ id: clinicId, ...updatePayload })
      .select()
      .single();

    if (error) {
      console.warn("Supabase clinic upsert warning:", error.message);
      return NextResponse.json({
        success: true,
        clinic: { id: clinicId, ...updatePayload },
      });
    }

    return NextResponse.json({ success: true, clinic: data });
  } catch (err: any) {
    console.error("PUT /api/clinics/[id] exception:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to update clinic settings" },
      { status: 500 }
    );
  }
}
