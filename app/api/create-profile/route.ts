// /app/api/create-profile/route.ts
import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  const { error } = await supabase.from("user_profiles").upsert(
    { id: userId, role: "user" },
    { onConflict: "id" } // this ensures "upsert" works on primary key
  );

  //   if (error) {
  //     return NextResponse.json({ error: error.message }, { status: 400 });
  //   }
  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  return NextResponse.json({ message: "User profile synced" });
}
