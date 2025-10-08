import { supabase } from "@/lib/supabase"; // server-side supabase client
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
  const { data: checks, error } = await supabase
    .from("checks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase fetch error:", error.message);
  }

  return <DashboardClient initialChecks={checks || []} />;
}
