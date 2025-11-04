import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Globe, ArrowLeft, LayoutDashboard } from "lucide-react";

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

  return (
    <>
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
                <ArrowLeft color="black" />
              </Link>
              <div
                className={`h-2 w-2 rounded-full flex-shrink-0 ${
                  monitor.status === "online" ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <h1 className="text-sm font-semibold truncate">{monitor.name}</h1>
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
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-4 lg:py-8 space-y-6 lg:space-y-8 max-w-7xl">
          {/* Desktop Header */}
          <div className="space-y-4 hidden lg:block">
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <ArrowLeft color="black" />
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
            </div>
          </div>

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
          </div>

          {/* Response Times Chart */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className=""></CardHeader>
            <CardContent className="">
              {history && history.length > 0 ? (
                <ResponseTimeChart data={history} />
              ) : (
                <p>No ping data available.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
