"use client";

import {
  XAxis,
  CartesianGrid,
  Area,
  AreaChart,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type PingResult = {
  created_at: string;
  dns_lookup_ms: number | null;
  tcp_connection_ms: number | null;
  tls_handshake_ms: number | null;
  ttfb_ms: number | null;
};

const chartConfig = {
  dns_lookup_ms: {
    label: "Name Lookup (ms)",
    color: "var(--chart-1)",
  },
  tcp_connection_ms: {
    label: "Connection (ms)",
    color: "var(--chart-2)",
  },
  tls_handshake_ms: {
    label: "TLS Handshake (ms)",
    color: "var(--chart-3)",
  },
  ttfb_ms: {
    label: "Data Transfer (ms)",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

export function ResponseTimeChart({ data }: { data: PingResult[] }) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");
  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);
  const latestDate =
    data.length > 0
      ? new Date(
          Math.max(...data.map((item) => new Date(item.created_at).getTime()))
        )
      : new Date();

  const filteredData = data.filter((item) => {
    const date = new Date(item.created_at);
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(latestDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader>
        {/* <CardTitle>Response Times</CardTitle> */}
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[400px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <defs>
                <linearGradient
                  id="filldns_lookup_ms"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-dns_lookup_ms)"
                    stopOpacity={1.0}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-dns_lookup_ms)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient
                  id="filltcp_connection_ms"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-tcp_connection_ms)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-tcp_connection_ms)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient
                  id="filltls_handshake_ms"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-tls_handshake_ms)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-tls_handshake_ms)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillttfb_ms" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-ttfb_ms)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-ttfb_ms)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={true} />
              <XAxis
                dataKey="created_at"
                tickLine={true}
                axisLine={true}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis />
              <ChartTooltip
                cursor={{ stroke: "#ccc", strokeWidth: 2 }}
                content={
                  <ChartTooltipContent
                    className="min-w-[200px]"
                    labelFormatter={(value: string) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }
                    indicator="line"
                  />
                }
              />
              <Area
                dataKey="dns_lookup_ms"
                type="monotone"
                fill="url(#filltcp_connection_ms)"
                stroke="var(--color-tcp_connection_ms)"
                stackId="a"
                connectNulls={true}
              />
              <Area
                dataKey="tcp_connection_ms"
                type="monotone"
                fill="url(#filldns_lookup_ms)"
                stroke="var(--color-dns_lookup_ms)"
                stackId="a"
                connectNulls={true}
              />
              <Area
                dataKey="tls_handshake_ms"
                type="monotone"
                fill="url(#filltls_handshake_ms)"
                stroke="var(--color-tls_handshake_ms)"
                stackId="a"
                connectNulls={true}
              />
              <Area
                dataKey="ttfb_ms"
                type="monotone"
                fill="url(#fillttfb_ms)"
                stroke="var(--color-ttfb_ms)"
                stackId="a"
                connectNulls={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
