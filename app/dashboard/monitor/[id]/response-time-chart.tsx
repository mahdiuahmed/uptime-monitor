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

// Mock data for the response time chart
// const chartData = [
//   {
//     date: "2025-08-01",
//     time: "3:00pm",
//     nameLookup: 50,
//     connection: 80,
//     tlsHandshake: 120,
//     dataTransfer: 200,
//   },
//   {
//     date: "2025-08-02",
//     time: "4:00pm",
//     nameLookup: 45,
//     connection: 75,
//     tlsHandshake: 110,
//     dataTransfer: 180,
//   },
//   {
//     date: "2025-08-03",
//     time: "5:00pm",
//     nameLookup: 55,
//     connection: 85,
//     tlsHandshake: 130,
//     dataTransfer: 220,
//   },
//   {
//     date: "2025-08-04",
//     time: "6:00pm",
//     nameLookup: 48,
//     connection: 78,
//     tlsHandshake: 115,
//     dataTransfer: 190,
//   },
//   {
//     date: "2025-08-05",
//     time: "7:00pm",
//     nameLookup: 52,
//     connection: 82,
//     tlsHandshake: 125,
//     dataTransfer: 210,
//   },
//   {
//     date: "2025-08-06",
//     time: "8:00pm",
//     nameLookup: 47,
//     connection: 77,
//     tlsHandshake: 112,
//     dataTransfer: 185,
//   },
//   {
//     date: "2025-08-07",
//     time: "9:00pm",
//     nameLookup: 53,
//     connection: 83,
//     tlsHandshake: 128,
//     dataTransfer: 215,
//   },
//   {
//     date: "2025-08-08",
//     time: "10:00pm",
//     nameLookup: 49,
//     connection: 79,
//     tlsHandshake: 118,
//     dataTransfer: 195,
//   },
//   {
//     date: "2025-08-09",
//     time: "11:00pm",
//     nameLookup: 51,
//     connection: 81,
//     tlsHandshake: 122,
//     dataTransfer: 205,
//   },
//   {
//     date: "2025-08-10",
//     time: "12:00am",
//     nameLookup: 46,
//     connection: 76,
//     tlsHandshake: 108,
//     dataTransfer: 175,
//   },
//   {
//     date: "2025-08-11",
//     time: "1:00am",
//     nameLookup: 54,
//     connection: 84,
//     tlsHandshake: 132,
//     dataTransfer: 225,
//   },
//   {
//     date: "2025-08-12",
//     time: "2:00am",
//     nameLookup: 50,
//     connection: 80,
//     tlsHandshake: 120,
//     dataTransfer: 200,
//   },
// ];

// const chartData = [
//   { date: "2024-04-01", dns_lookup_ms: 222, mobile: 150 },
//   { date: "2024-04-02", desktop: 97, mobile: 180 },
//   { date: "2024-04-03", desktop: 167, mobile: 120 },
//   { date: "2024-04-04", desktop: 242, mobile: 260 },
//   { date: "2024-04-05", desktop: 373, mobile: 290 },
//   { date: "2024-04-06", desktop: 301, mobile: 340 },
//   { date: "2024-04-07", desktop: 245, mobile: 180 },
//   { date: "2024-04-08", desktop: 409, mobile: 320 },
//   { date: "2024-04-09", desktop: 59, mobile: 110 },
//   { date: "2024-04-10", desktop: 261, mobile: 190 },
//   { date: "2024-04-11", desktop: 327, mobile: 350 },
//   { date: "2024-04-12", desktop: 292, mobile: 210 },
//   { date: "2024-04-13", desktop: 342, mobile: 380 },
//   { date: "2024-04-14", desktop: 137, mobile: 220 },
//   { date: "2024-04-15", desktop: 120, mobile: 170 },
//   { date: "2024-04-16", desktop: 138, mobile: 190 },
//   { date: "2024-04-17", desktop: 446, mobile: 360 },
//   { date: "2024-04-18", desktop: 364, mobile: 410 },
//   { date: "2024-04-19", desktop: 243, mobile: 180 },
//   { date: "2024-04-20", desktop: 89, mobile: 150 },
//   { date: "2024-04-21", desktop: 137, mobile: 200 },
//   { date: "2024-04-22", desktop: 224, mobile: 170 },
//   { date: "2024-04-23", desktop: 138, mobile: 230 },
//   { date: "2024-04-24", desktop: 387, mobile: 290 },
//   { date: "2024-04-25", desktop: 215, mobile: 250 },
//   { date: "2024-04-26", desktop: 75, mobile: 130 },
//   { date: "2024-04-27", desktop: 383, mobile: 420 },
//   { date: "2024-04-28", desktop: 122, mobile: 180 },
//   { date: "2024-04-29", desktop: 315, mobile: 240 },
//   { date: "2024-04-30", desktop: 454, mobile: 380 },
//   { date: "2024-05-01", desktop: 165, mobile: 220 },
//   { date: "2024-05-02", desktop: 293, mobile: 310 },
//   { date: "2024-05-03", desktop: 247, mobile: 190 },
//   { date: "2024-05-04", desktop: 385, mobile: 420 },
//   { date: "2024-05-05", desktop: 481, mobile: 390 },
//   { date: "2024-05-06", desktop: 498, mobile: 520 },
//   { date: "2024-05-07", desktop: 388, mobile: 300 },
//   { date: "2024-05-08", desktop: 149, mobile: 210 },
//   { date: "2024-05-09", desktop: 227, mobile: 180 },
//   { date: "2024-05-10", desktop: 293, mobile: 330 },
//   { date: "2024-05-11", desktop: 335, mobile: 270 },
//   { date: "2024-05-12", desktop: 197, mobile: 240 },
//   { date: "2024-05-13", desktop: 197, mobile: 160 },
//   { date: "2024-05-14", desktop: 448, mobile: 490 },
//   { date: "2024-05-15", desktop: 473, mobile: 380 },
//   { date: "2024-05-16", desktop: 338, mobile: 400 },
//   { date: "2024-05-17", desktop: 499, mobile: 420 },
//   { date: "2024-05-18", desktop: 315, mobile: 350 },
//   { date: "2024-05-19", desktop: 235, mobile: 180 },
//   { date: "2024-05-20", desktop: 177, mobile: 230 },
//   { date: "2024-05-21", desktop: 82, mobile: 140 },
//   { date: "2024-05-22", desktop: 81, mobile: 120 },
//   { date: "2024-05-23", desktop: 252, mobile: 290 },
//   { date: "2024-05-24", desktop: 294, mobile: 220 },
//   { date: "2024-05-25", desktop: 201, mobile: 250 },
//   { date: "2024-05-26", desktop: 213, mobile: 170 },
//   { date: "2024-05-27", desktop: 420, mobile: 460 },
//   { date: "2024-05-28", desktop: 233, mobile: 190 },
//   { date: "2024-05-29", desktop: 78, mobile: 130 },
//   { date: "2024-05-30", desktop: 340, mobile: 280 },
//   { date: "2024-05-31", desktop: 178, mobile: 230 },
//   { date: "2024-06-01", desktop: 178, mobile: 200 },
//   { date: "2024-06-02", desktop: 470, mobile: 410 },
//   { date: "2024-06-03", desktop: 103, mobile: 160 },
//   { date: "2024-06-04", desktop: 439, mobile: 380 },
//   { date: "2024-06-05", desktop: 88, mobile: 140 },
//   { date: "2024-06-06", desktop: 294, mobile: 250 },
//   { date: "2024-06-07", desktop: 323, mobile: 370 },
//   { date: "2024-06-08", desktop: 385, mobile: 320 },
//   { date: "2024-06-09", desktop: 438, mobile: 480 },
//   { date: "2024-06-10", desktop: 155, mobile: 200 },
//   { date: "2024-06-11", desktop: 92, mobile: 150 },
//   { date: "2024-06-12", desktop: 492, mobile: 420 },
//   { date: "2024-06-13", desktop: 81, mobile: 130 },
//   { date: "2024-06-14", desktop: 426, mobile: 380 },
//   { date: "2024-06-15", desktop: 307, mobile: 350 },
//   { date: "2024-06-16", desktop: 371, mobile: 310 },
//   { date: "2024-06-17", desktop: 475, mobile: 520 },
//   { date: "2024-06-18", desktop: 107, mobile: 170 },
//   { date: "2024-06-19", desktop: 341, mobile: 290 },
//   { date: "2024-06-20", desktop: 408, mobile: 450 },
//   { date: "2024-06-21", desktop: 169, mobile: 210 },
//   { date: "2024-06-22", desktop: 317, mobile: 270 },
//   { date: "2024-06-23", desktop: 480, mobile: 530 },
//   { date: "2024-06-24", desktop: 132, mobile: 180 },
//   { date: "2024-06-25", desktop: 141, mobile: 190 },
//   { date: "2024-06-26", desktop: 434, mobile: 380 },
//   { date: "2024-06-27", desktop: 448, mobile: 490 },
//   { date: "2024-06-28", desktop: 149, mobile: 200 },
//   { date: "2024-06-29", desktop: 103, mobile: 160 },
//   { date: "2024-06-30", desktop: 446, mobile: 400 },
// ];

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
// const chartConfig = {
//   nameLookup: {
//     label: "Name lookup",
//     color: "hsl(var(--chart-1))",
//   },
//   connection: {
//     label: "Connection",
//     color: "hsl(var(--chart-2))",
//   },
//   tlsHandshake: {
//     label: "TLS handshake",
//     color: "hsl(var(--chart-3))",
//   },
//   dataTransfer: {
//     label: "Data transfer",
//     color: "hsl(var(--chart-4))",
//   },
// } satisfies ChartConfig;

// const chartConfig = {
//   dns_lookup_ms: {
//     label: "dns_lookup_ms",
//     color: "#2563eb",
//   },
//   tcp_connection_ms: {
//     label: "tcp_connection_ms",
//     color: "#60a5fa",
//   },
// } satisfies ChartConfig;

export function ResponseTimeChart({ data }: { data: PingResult[] }) {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("90d");
  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);
  // Find the latest date in the data array
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

  // Custom tooltip formatter
  // const formatTooltipValue = (
  //   value: string | number | (string | number)[] | null | undefined,
  //   name: string | number | null | undefined
  // ): [React.ReactNode, string] => {
  //   const config = chartConfig[name as keyof typeof chartConfig];

  //   if (typeof value === "number") {
  //     return [`${value} ms`, config?.label || String(name)];
  //   }

  //   if (typeof value === "string") {
  //     return [value, config?.label || String(name)];
  //   }

  //   return ["–", config?.label || String(name)];
  // };

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

                    // formatter={formatTooltipValue}
                    // formatter={(value, name) => [
                    //   [
                    //     chartConfig[name as keyof typeof chartConfig].label,
                    //     ` ${value} ms`,
                    //   ],
                    // ]}
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

// export default function ResponseTimeChart({ data }: { data: PingResult[] }) {
//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <LineChart data={data}>
//         <XAxis dataKey="created_at" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line
//           type="monotone"
//           dataKey="dns_lookup_ms"
//           stroke="#8884d8"
//           name="DNS Lookup"
//         />
//         <Line
//           type="monotone"
//           dataKey="tcp_connection_ms"
//           stroke="#82ca9d"
//           name="TCP Connection"
//         />
//         <Line
//           type="monotone"
//           dataKey="tls_handshake_ms"
//           stroke="#ffc658"
//           name="TLS Handshake"
//         />
//         <Line type="monotone" dataKey="ttfb_ms" stroke="#ff0000" name="TTFB" />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }

// <div className="space-y-4">
//   {/* Time Period Tabs - Responsive */}
//   <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2">
//     <Button
//       variant="secondary"
//       size="sm"
//       className="h-8 px-3 text-xs sm:text-sm whitespace-nowrap"
//     >
//       Day
//     </Button>
//     <Button
//       variant="ghost"
//       size="sm"
//       className="h-8 px-3 text-xs sm:text-sm whitespace-nowrap"
//     >
//       Week
//     </Button>
//     <Button
//       variant="ghost"
//       size="sm"
//       className="h-8 px-3 text-xs sm:text-sm whitespace-nowrap"
//     >
//       Month
//     </Button>
//   </div>

//   {/* Chart - Responsive Height */}
//   <ChartContainer
//     config={chartConfig}
//     className="h-[250px] sm:h-[300px] lg:h-[350px]"
//   >
//     <ResponsiveContainer width="100%" height="100%">
//       <LineChart
//         data={chartData}
//         margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
//       >
//         <CartesianGrid
//           strokeDasharray="3 3"
//           className="stroke-muted opacity-30"
//         />
//         <XAxis
//           dataKey="time"
//           className="text-xs"
//           tick={{ fontSize: 10 }}
//           interval="preserveStartEnd"
//           tickMargin={8}
//         />
//         <YAxis
//           className="text-xs"
//           tick={{ fontSize: 10 }}
//           tickMargin={8}
//           label={{
//             value: "ms",
//             angle: -90,
//             position: "insideLeft",
//             style: { textAnchor: "middle", fontSize: "10px" },
//           }}
//         />
//         <ChartTooltip
//           content={<ChartTooltipContent />}
//           labelStyle={{ fontSize: "12px" }}
//           contentStyle={{ fontSize: "12px" }}
//         />
//         <Line
//           type="monotone"
//           dataKey="nameLookup"
//           stroke="var(--color-nameLookup)"
//           strokeWidth={2}
//           dot={false}
//           activeDot={{ r: 4 }}
//         />
//         <Line
//           type="monotone"
//           dataKey="connection"
//           stroke="var(--color-connection)"
//           strokeWidth={2}
//           dot={false}
//           activeDot={{ r: 4 }}
//         />
//         <Line
//           type="monotone"
//           dataKey="tlsHandshake"
//           stroke="var(--color-tlsHandshake)"
//           strokeWidth={2}
//           dot={false}
//           activeDot={{ r: 4 }}
//         />
//         <Line
//           type="monotone"
//           dataKey="dataTransfer"
//           stroke="var(--color-dataTransfer)"
//           strokeWidth={2}
//           dot={false}
//           activeDot={{ r: 4 }}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   </ChartContainer>

//   {/* Legend - Responsive Grid */}
//   <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
//     <div className="flex items-center gap-2">
//       <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-chart-1 flex-shrink-0"></div>
//       <span className="truncate">Name lookup</span>
//     </div>
//     <div className="flex items-center gap-2">
//       <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-chart-2 flex-shrink-0"></div>
//       <span className="truncate">Connection</span>
//     </div>
//     <div className="flex items-center gap-2">
//       <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-chart-3 flex-shrink-0"></div>
//       <span className="truncate">TLS handshake</span>
//     </div>
//     <div className="flex items-center gap-2">
//       <div className="h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-chart-4 flex-shrink-0"></div>
//       <span className="truncate">Data transfer</span>
//     </div>
//   </div>
// </div>
