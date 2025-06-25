// scripts/ping-checks.ts
import { createClient } from "@supabase/supabase-js";
import fetch from "node-fetch";

const supabase = createClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,

  "https://muidwjwczbpnzaimkjnr.supabase.co",
  //   process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY! // must be service role to update all rows
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11aWR3andjemJwbnphaW1ram5yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDc4NzczMCwiZXhwIjoyMDY2MzYzNzMwfQ.SOhNNLZYGtiOO0dJSyJ1IiV2DntRVLCBTj9CTCosuhs"
);

async function main() {
  const { data: checks, error } = await supabase.from("checks").select("*");

  if (error) {
    console.error("Failed to fetch checks:", error);
    return;
  }

  console.log(`Pinging ${checks.length} checks...`);

  for (const check of checks) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8-second timeout

    try {
      const res = await fetch(check.url, {
        method: "GET",
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const newStatus = res.ok ? "online" : "offline";

      await supabase
        .from("checks")
        .update({ status: newStatus })
        .eq("id", check.id);

      console.log(`${check.name}: ${newStatus}`);
    } catch {
      clearTimeout(timeout);

      await supabase
        .from("checks")
        .update({ status: "offline" })
        .eq("id", check.id);

      console.log(`${check.name}: offline (timeout or error)`);
    }
  }
}

main();
