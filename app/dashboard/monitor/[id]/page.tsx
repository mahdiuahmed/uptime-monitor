import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  // AlertTriangle,
  Globe,
  // Pause,
  // Settings,
  // TestTube,
  // Menu,
  ArrowLeft,
  LayoutDashboard,
} from "lucide-react";

import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ResponseTimeChart } from "./response-time-chart";

// type Check = {
//   id: string;
//   url: string;
//   name: string;
//   // interval_minutes: number;
//   status: string;
//   last_duration_ms: number;
//   last_ping_at: Date;
// };

export default async function MonitorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: monitor, error } = await supabase
    .from("checks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return <div>Error loading monitor</div>;
  }

  const { data: history } = await supabase
    .from("ping_results")
    .select("*")
    .eq("check_id", id)
    .order("created_at", { ascending: true });

  // Mock data - in real app this would come from your API
  const monitorData = {
    // id: id,
    // url: url,
    // name: name,
    // status: status,
    // last_duration_ms: last_duration_ms,
    // lastChecked: new Date(last_ping_at).toLocaleString(),
    // status: "up",
    lastChecked: "14 seconds ago",
    uptime: "25 days 20 hours 42 mins",
    incidents: 0,
    checkInterval: "3 minutes",
  };

  const statsData = [
    {
      period: "Today",
      availability: "100.0000%",
      downtime: "none",
      incidents: 0,
      longestIncident: "none",
      avgIncident: "none",
    },
    {
      period: "Last 7 days",
      availability: "100.0000%",
      downtime: "none",
      incidents: 0,
      longestIncident: "none",
      avgIncident: "none",
    },
    {
      period: "Last 30 days",
      availability: "100.0000%",
      downtime: "none",
      incidents: 0,
      longestIncident: "none",
      avgIncident: "none",
    },
    {
      period: "Last 365 days",
      availability: "100.0000%",
      downtime: "none",
      incidents: 0,
      longestIncident: "none",
      avgIncident: "none",
    },
    {
      period: "All time (Last 26 days)",
      availability: "100.0000%",
      downtime: "none",
      incidents: 0,
      longestIncident: "none",
      avgIncident: "none",
    },
  ];

  return (
    <>
      {/* <Navbar /> */}
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="/dashboard"
                  className="flex items-center gap-1"
                >
                  <LayoutDashboard size={14} />
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-1">
                  <Globe size={14} />
                  Monitor
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />

              <BreadcrumbItem>
                <BreadcrumbPage>{monitor.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="container mx-auto p-6 max-w-screen-xl mt-2">
        {/* Mobile Header */}
        <div className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <Link href="/dashboard">
                <ArrowLeft color="white" />
              </Link>
              <div
                className={`h-2 w-2 rounded-full flex-shrink-0 ${
                  monitor.status === "online" ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <h1 className="text-sm font-semibold truncate">{monitor.name}</h1>
            </div>
            {/* <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="space-y-4 py-4">
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start h-11 bg-transparent"
                    >
                      <TestTube className="h-4 w-4 mr-3" />
                      Send test alert
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start h-11 bg-transparent"
                    >
                      <AlertTriangle className="h-4 w-4 mr-3" />
                      Incidents
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start h-11 bg-transparent"
                    >
                      <Pause className="h-4 w-4 mr-3" />
                      Pause
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start h-11 bg-transparent"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Configure
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet> */}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-4 lg:py-8 space-y-6 lg:space-y-8 max-w-7xl">
          {/* Desktop Header */}
          <div className="space-y-4 hidden lg:block">
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <ArrowLeft color="white" />
              </Link>
              <div
                className={`h-3 w-3 rounded-full flex-shrink-0 ${
                  monitor.status === "online" ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <h1 className="text-2xl xl:text-3xl font-bold break-all">
                {monitor.name}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge
                variant="secondary"
                className={`${
                  monitor.status === "online"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-red-100 text-red-800 border-red-200"
                }`}
              >
                {monitor.status}
              </Badge>
              {/* <span>Checked every {monitorData.checkInterval}</span> */}
            </div>
          </div>

          {/* Mobile Status Card */}
          <Card className="lg:hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 border-green-200 text-xs"
                    >
                      Up
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Checked every {monitorData.checkInterval}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Last check</p>
                  <p className="text-sm font-medium">
                    {monitorData.lastChecked}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Desktop Action Buttons */}
          {/* <div className="hidden lg:flex flex-wrap gap-3">
            <Button variant="outline" size="sm" className="h-9 bg-transparent">
              <TestTube className="h-4 w-4 mr-2" />
              Send test alert
            </Button>
            <Button variant="outline" size="sm" className="h-9 bg-transparent">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Incidents
            </Button>
            <Button variant="outline" size="sm" className="h-9 bg-transparent">
              <Pause className="h-4 w-4 mr-2" />
              Pause
            </Button>
            <Button variant="outline" size="sm" className="h-9 bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          </div> */}

          {/* Stats Cards - Responsive Grid */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 sm:pb-3">
                <CardDescription className="text-xs sm:text-sm">
                  Currently up since:
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">
                  {monitor.created_at
                    ? new Date(monitor.created_at).toLocaleString()
                    : "Unknown"}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2 sm:pb-3">
                <CardDescription className="text-xs sm:text-sm">
                  Last checked at
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                  {new Date(monitor.last_ping_at).toLocaleString()}
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-2 sm:pb-3">
                <CardDescription className="text-xs sm:text-sm">
                  Incidents
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
                  {monitorData.incidents}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Response Times Chart */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="">
              {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <CardTitle className="text-lg sm:text-xl">
                    Response times
                  </CardTitle>
                  <CardDescription className="mt-1">
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
                      Europe
                    </div>
                  </CardDescription>
                </div>
              </div> */}
            </CardHeader>
            <CardContent className="">
              {history && history.length > 0 ? (
                <ResponseTimeChart data={history} />
              ) : (
                <p>No ping data available.</p>
              )}
            </CardContent>
          </Card>

          {/* Statistics Table - Mobile Optimized */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mobile: Stacked Cards */}
              <div className="space-y-4 p-4 sm:hidden">
                {statsData.map((row, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="font-medium text-sm mb-3">
                        {row.period}
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <div className="text-muted-foreground">
                            Availability
                          </div>
                          <div className="font-medium text-green-600">
                            {row.availability}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Incidents</div>
                          <div className="font-medium">{row.incidents}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Downtime</div>
                          <div className="font-medium">{row.downtime}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">
                            Avg. incident
                          </div>
                          <div className="font-medium">{row.avgIncident}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Tablet & Desktop: Scrollable Table */}
              <div className="hidden sm:block">
                <ScrollArea className="w-full">
                  <div className="min-w-[600px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-xs lg:text-sm font-medium">
                            Time period
                          </TableHead>
                          <TableHead className="text-xs lg:text-sm font-medium">
                            Availability
                          </TableHead>
                          <TableHead className="text-xs lg:text-sm font-medium">
                            Downtime
                          </TableHead>
                          <TableHead className="text-xs lg:text-sm font-medium">
                            Incidents
                          </TableHead>
                          <TableHead className="text-xs lg:text-sm font-medium">
                            Longest incident
                          </TableHead>
                          <TableHead className="text-xs lg:text-sm font-medium">
                            Avg. incident
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {statsData.map((row, index) => (
                          <TableRow key={index} className="hover:bg-muted/50">
                            <TableCell className="font-medium text-xs lg:text-sm">
                              {row.period}
                            </TableCell>
                            <TableCell className="text-xs lg:text-sm text-green-600 font-medium">
                              {row.availability}
                            </TableCell>
                            <TableCell className="text-xs lg:text-sm">
                              {row.downtime}
                            </TableCell>
                            <TableCell className="text-xs lg:text-sm">
                              {row.incidents}
                            </TableCell>
                            <TableCell className="text-xs lg:text-sm">
                              {row.longestIncident}
                            </TableCell>
                            <TableCell className="text-xs lg:text-sm">
                              {row.avgIncident}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

          {/* Date Range Selector - Responsive */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl">
                Custom Date Range
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                <div className="space-y-2 flex-1">
                  <Label htmlFor="from-date" className="text-xs sm:text-sm">
                    From
                  </Label>
                  <Input
                    id="from-date"
                    type="date"
                    defaultValue="2025-07-27"
                    className="h-10 sm:h-9 text-sm"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <Label htmlFor="to-date" className="text-xs sm:text-sm">
                    To
                  </Label>
                  <Input
                    id="to-date"
                    type="date"
                    defaultValue="2025-08-10"
                    className="h-10 sm:h-9 text-sm"
                  />
                </div>
                <Button className="h-10 sm:h-9 w-full sm:w-auto min-w-[100px]">
                  Calculate
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <div className="text-center text-xs sm:text-sm text-muted-foreground py-4">
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0"></div>
              <span>Need help? Let us know at</span>
              <a
                href="mailto:hello@betterstack.com"
                className="text-primary hover:underline"
              >
                hello@betterstack.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
