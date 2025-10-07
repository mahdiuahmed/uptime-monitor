/* eslint-disable @typescript-eslint/no-explicit-any */
// scripts/ping-checks.ts

import { config } from "dotenv";
config({ path: ".env.local" }); // ✅ force load .env.local from project root
import got from "got";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function main() {
  const { data: checks, error } = await supabase.from("checks").select("*");

  if (error) {
    console.error("Failed to fetch checks:", error);
    return;
  }

  console.log(`Pinging ${checks.length} checks...`);

  for (const check of checks) {
    console.log(`🔍 Pinging ${check.url}`);

    let isUp = false;
    let timings: any = {};

    try {
      const res = await got(check.url, {
        method: "GET",
        timeout: { request: 10000 },
        retry: { limit: 0 },
      });

      isUp = res.statusCode >= 200 && res.statusCode < 300;
      timings = res.timings;
    } catch (error: any) {
      console.error(`❌ Error pinging ${check.url}:`, error.message);
      isUp = false;
    }

    const total = timings.phases?.total ?? null;
    const dns = timings.phases?.dns ?? null;
    const tcp = timings.phases?.tcp ?? null;
    const tls = timings.phases?.tls ?? null;
    const ttfb = timings.phases?.request ?? null;

    await supabase
      .from("checks")
      .update({
        last_ping_at: new Date().toISOString(),
        last_duration_ms: total,
        status: isUp ? "online" : "offline",
      })
      .eq("id", check.id);

    await supabase.from("ping_results").insert({
      check_id: check.id,
      created_at: new Date().toISOString(),
      status: isUp ? "online" : "offline",
      total_duration_ms: total,
      dns_lookup_ms: dns,
      tcp_connection_ms: tcp,
      tls_handshake_ms: tls,
      ttfb_ms: ttfb,
    });

    console.log(
      `✅ Recorded ping for ${check.url} (status: ${
        isUp ? "online" : "offline"
      }, ${total}ms)`
    );
  }
}

main();
