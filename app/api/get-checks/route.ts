import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json([], { status: 200 });
  }

  const { data, error } = await supabase
    .from("checks")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Supabase error:", error.message);
    return NextResponse.json([], { status: 200 });
  }

  return NextResponse.json(data);
}
