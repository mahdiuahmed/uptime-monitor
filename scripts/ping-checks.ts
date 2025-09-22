// // scripts/ping-checks.ts
// import { createClient } from "@supabase/supabase-js";
// import fetch from "node-fetch";

// const supabase = createClient(
//   //   process.env.NEXT_PUBLIC_SUPABASE_URL!,

//   "https://muidwjwczbpnzaimkjnr.supabase.co",
//   //   process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY! // must be service role to update all rows
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11aWR3andjemJwbnphaW1ram5yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDc4NzczMCwiZXhwIjoyMDY2MzYzNzMwfQ.SOhNNLZYGtiOO0dJSyJ1IiV2DntRVLCBTj9CTCosuhs"
// );

// async function main() {
//   const { data: checks, error } = await supabase.from("checks").select("*");

//   if (error) {
//     console.error("Failed to fetch checks:", error);
//     return;
//   }

//   console.log(`Pinging ${checks.length} checks...`);

//   for (const check of checks) {
//     console.log(`🔍 Pinging ${check.url}`);

//     const startTime = Date.now();
//     let isUp = false;

//     try {
//       const res = await fetch(check.url, { method: "GET" });

//       isUp = res.ok; // true if status is 2xx
//     } catch (error) {
//       console.error(`❌ Error pinging ${check.url}:`, error);
//       isUp = false;
//     }

//     const endTime = Date.now();
//     const duration = endTime - startTime;

//     // Update Supabase
//     await supabase
//       .from("checks")
//       .update({
//         last_ping_at: new Date().toISOString(),
//         last_duration_ms: duration,
//         status: isUp ? "online" : "offline",
//       })
//       .eq("id", check.id);
//   }
// }

// main();

// scripts/ping-checks.ts
import { createClient } from "@supabase/supabase-js";
import got from "got";

const supabase = createClient(
  "https://muidwjwczbpnzaimkjnr.supabase.co",
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
    console.log(`🔍 Pinging ${check.url}`);

    let isUp = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timings: any = {};

    try {
      const res = await got(check.url, {
        method: "GET",
        timeout: { request: 10000 },
        retry: { limit: 0 },
      });

      isUp = res.statusCode >= 200 && res.statusCode < 300;
      timings = res.timings;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(`❌ Error pinging ${check.url}:`, error.message);
      isUp = false;
    }

    // Extract timing phases safely
    const total = timings.phases?.total ?? null;
    const dns = timings.phases?.dns ?? null;
    const tcp = timings.phases?.tcp ?? null;
    const tls = timings.phases?.tls ?? null;
    const ttfb = timings.phases?.request ?? null;

    // 1) Update latest status in `checks`
    await supabase
      .from("checks")
      .update({
        last_ping_at: new Date().toISOString(),
        last_duration_ms: total,
        status: isUp ? "online" : "offline",
      })
      .eq("id", check.id);

    // 2) Insert historical record into `ping_results`
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
