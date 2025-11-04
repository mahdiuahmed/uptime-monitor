import { supabase } from "@/lib/supabase";
import DashboardClient from "./dashboard-client";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();

  const { data: checks, error } = await supabase
    .from("checks")
    .select("*")
    .eq("user_id", user?.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error.message);
  }

  return <DashboardClient initialChecks={checks || []} />;
}
