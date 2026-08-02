import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createServerClient();
    const { data: flags, error } = await supabase
      .from("human_followup_flags")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(30);

    if (error) {
      console.warn("Supabase fetch followups error:", error.message);
      return NextResponse.json({ success: true, flags: [] });
    }

    return NextResponse.json({ success: true, flags: flags || [] });
  } catch (err: any) {
    console.error("GET /api/followups exception:", err);
    return NextResponse.json({ success: true, flags: [] });
  }
}
