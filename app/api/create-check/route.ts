import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  //   supabase
  const { name, url } = await req.json();

  const { error } = await supabase.from("checks").insert({
    user_id: userId,
    name,
    url,
    status: "unknown",
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
