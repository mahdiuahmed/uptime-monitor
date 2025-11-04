"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createCheck } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Globe,
  Trash2,
  Search,
  LayoutDashboard,
  LoaderCircle,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Check = {
  id: string;
  url: string;
  name: string;
  status: string;
  last_duration_ms: number;
  last_ping_at: Date;
  created_at: Date;
};

export default function DashboardClient({
  initialChecks,
}: {
  initialChecks: Check[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUser();
  const router = useRouter();
  const [checks, setChecks] = useState<Check[]>(initialChecks);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    url: "",
    // interval: 10,
  });

  const filteredChecks = checks.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (!user) return;
    // Call your create-profile API route
    fetch("/api/create-profile", { method: "POST" });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      await createCheck({
        userId: user.id,
        name: form.name,
        url: form.url,
      });
      setForm({ name: "", url: "" });
      const res = await fetch(`/api/get-checks?userId=${user.id}`);
      if (res.ok) {
        toast.success("✅ Check created");
      } else {
        toast.error("❌ Failed to create check");
      }

      const data = await res.json();
      setChecks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const response = async (checkId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("checks")
        .delete()
        .eq("id", checkId)
        .eq("user_id", user?.id);

      if (error) {
        console.error("Supabase error:", error.message);
        toast.error("❌ Failed to delete check");
        return;
      }

      toast.success("✅ Check deleted");
      // Refresh checks after deletion
      const res = await fetch(`/api/get-checks?userId=${user?.id}`);
      if (res.ok) {
        const data = await res.json();
        setChecks(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = (check: Check) => {
    router.push(`/dashboard/monitor/${check.id}`);
  };

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
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="container mx-auto p-6 max-w-5xl mt-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Website Monitoring
            </h1>
            <p className="text-muted-foreground">
              Monitor your websites and get notified when they go down
            </p>
          </div>

          <Card className="">
            <CardHeader>
              <CardTitle>Add New Check</CardTitle>
              <CardDescription>
                Create a new website monitoring check
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Website Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="My Website"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="url">Website URL</Label>
                    <Input
                      id="url"
                      type="url"
                      placeholder="https://example.com"
                      value={form.url}
                      onChange={(e) =>
                        setForm({ ...form, url: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? "Adding Check..." : "Add Check"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* <CreateCheckForm /> */}
          <div className="space-y-4 mb-12">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold ">Your Checks</h2>
              <Badge variant="outline">{checks.length} total</Badge>
            </div>

            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search Checks..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {checks.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Globe className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No checks yet</h3>
                  <p className="text-muted-foreground text-center">
                    Add your first website check to start monitoring
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="rounded-lg border">
                <Table className="table-fixed">
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead>Status</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="">URL</TableHead>
                      <TableHead className="">Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredChecks.map((check) => (
                      <TableRow
                        key={check.id}
                        onClick={() =>
                          check.status !== "unknown" && handleCheck(check)
                        }
                        className={`${
                          check.status !== "unknown" && "cursor-pointer"
                        }`}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <StatusBadge status={check.status} />
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold truncate">
                          {check.name}
                        </TableCell>
                        <TableCell className="truncate">
                          <Link
                            href={check.url}
                            target="_blank"
                            className="text-sm text-muted-foreground underline hover:text-foreground"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {check.url}
                          </Link>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground truncate">
                          {new Date(check.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <AlertDialog>
                            <AlertDialogTrigger
                              asChild
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Button
                                className="items-center justify-center p-2 rounded-md transition-colors"
                                variant={"destructive"}
                              >
                                <Trash2 size={16} className="text-white" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your monitoring for this
                                  website and remove your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    response(check.id);
                                  }}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "online"
      ? "bg-green-700"
      : status === "unknown"
      ? "bg-secondary"
      : "bg-red-700";
  return (
    <Badge className={color + " text-white h-fit flex items-center"}>
      {status === "online" ? (
        "Online"
      ) : status === "unknown" ? (
        <>
          <LoaderCircle className=" animate-spin" />
          Pending
        </>
      ) : (
        "Offline"
      )}
    </Badge>
  );
}
