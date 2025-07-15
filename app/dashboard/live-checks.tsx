"use client";

import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";

type Check = {
  id: string;
  url: string;
  name: string;
  interval_minutes: number;
  status: string;
  last_duration_ms: number;
  last_ping_at: Date;
};

export default function LiveChecks() {
  const [checks, setChecks] = useState<Check[]>([]);

  const fetchChecks = async () => {
    const { data, error } = await supabase
      .from("checks")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setChecks(data);
  };

  useEffect(() => {
    fetchChecks(); // initial load

    const channel = supabase
      .channel("realtime:checks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "checks" },
        (payload) => {
          console.log("⚡ Realtime payload:", payload);
          fetchChecks(); // refetch on any change
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (checks.length === 0) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {checks.map((check) => (
        <div
          key={check.id}
          className="flex justify-between items-center border p-4 rounded-xl"
        >
          <div>
            <p className="font-medium">{check.name}</p>
            <p className="text-sm text-muted-foreground">{check.url}</p>
          </div>
          <Badge
            variant={check.status === "online" ? "default" : "destructive"}
          >
            {check.status}
          </Badge>
        </div>
      ))}
    </div>
  );
}
