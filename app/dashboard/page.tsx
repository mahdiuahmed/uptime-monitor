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
import { Loader2, Globe, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Navbar from "@/components/navbar";
// import Image from "next/image";
// import bgImg from "../../public/motherboard-circuit-technology-background-png-blue.png";

// import router from "next/router";
// import CreateCheckForm from "./create-check-form";

// function StatusBadge({ status }: { status: string }) {
//   const color = status === "online" ? "bg-green-500" : "bg-red-500";
//   return (
//     <Badge className={color + " text-white"}>
//       {status === "online" ? "Online 🟢" : "Offline 🔴"}
//     </Badge>
//   );
// }

type Check = {
  id: string;
  url: string;
  name: string;
  interval_minutes: number;
  status: string;
  last_duration_ms: number;
  last_ping_at: Date;
};

export default function DashboardPage() {
  const { user } = useUser();
  const [checks, setChecks] = useState<Check[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    url: "",
    interval: 10,
  });

  useEffect(() => {
    if (!user) return;
    // Call your create-profile API route
    fetch("/api/create-profile", { method: "POST" });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/get-checks?userId=${user.id}`)
      .then((res) => res.json())
      .then(setChecks);
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
        interval_minutes: form.interval,
      });
      setForm({ name: "", url: "", interval: 10 });
      const res = await fetch(`/api/get-checks?userId=${user.id}`);
      if (res.ok) {
        toast.success("✅ Check created");
        //   router.refresh();
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

  //   const getStatusVariant = (status: string) => {
  //     switch (status) {
  //       case "online":
  //         return "default";
  //       case "offline":
  //         return "destructive";
  //       default:
  //         return "secondary";
  //     }
  //   };

  //   const getStatusColor = (status: string) => {
  //     switch (status) {
  //       case "online":
  //         return "bg-green-100 text-green-700 hover:bg-green-100";
  //       case "offline":
  //         return "bg-red-100 text-red-700 hover:bg-red-100";
  //       default:
  //         return "bg-gray-100 text-gray-700 hover:bg-gray-100";
  //     }
  //   };

  return (
    <>
      <Navbar />
      {/* <Image
        alt="background image of a motherboard circuit"
        src={bgImg}
        // placeholder="blur"
        quality={100}
        fill
        // sizes="100vw"
        style={{
          objectFit: "cover",
        }}
        className="-z-50 hue-rotate-60 opacity-50 blur-sm"
      /> */}
      <div className="container mx-auto p-6 max-w-4xl mt-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Website Monitoring
            </h1>
            <p className="text-muted-foreground">
              Monitor your websites and get notified when they go down
            </p>
          </div>

          <Card>
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
                <div className="space-y-2">
                  <Label htmlFor="interval">Check Interval (minutes)</Label>
                  <Input
                    id="interval"
                    type="number"
                    min={1}
                    placeholder="10"
                    value={form.interval}
                    onChange={(e) =>
                      setForm({ ...form, interval: Number(e.target.value) })
                    }
                    className="w-full md:w-48"
                    required
                  />
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
              <div className="grid md:grid-cols-2 gap-4">
                {checks.map((check) => (
                  <div
                    className="rounded-xl border p-4 shadow-sm space-y-2 bg-background"
                    key={check.id}
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-semibold">{check.name}</h2>
                      <div className="flex items-center space-x-2">
                        <StatusBadge status={check.status} />
                        <AlertDialog>
                          <AlertDialogTrigger
                            asChild
                            className="cursor-pointer"
                          >
                            {/* <Button variant="ghost" size="icon"> */}
                            <Trash2 size={16} color="#9a2c2c" className="" />
                            {/* </Button> */}
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
                              <AlertDialogAction>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <Link
                      href={check.url}
                      className="text-sm text-muted-foreground underline hover:text-foreground break-all"
                    >
                      {check.url}
                    </Link>
                    <p className="text-xs text-gray-500">
                      Last checked:{" "}
                      {check.last_ping_at
                        ? new Date(check.last_ping_at).toLocaleString()
                        : "Never"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Last response time: {check.last_duration_ms ?? "N/A"}
                      ms
                    </p>
                  </div>
                  // <Card key={check.id}>
                  //   <CardContent className="p-6">
                  //     <div className="flex items-center justify-between">
                  //       <div className="space-y-1 flex-1">
                  //         <div className="flex items-center gap-2">
                  //           <h3 className="font-semibold">{check.name}</h3>
                  //           <Badge
                  //             variant="outline"
                  //             className={getStatusColor(check.status)}
                  //           >
                  //             {check.status}
                  //           </Badge>
                  //         </div>
                  //         <p className="text-sm text-muted-foreground flex items-center gap-1">
                  //           <Globe className="h-3 w-3" />
                  //           {check.url}
                  //         </p>
                  //         <p className="text-xs text-muted-foreground flex items-center gap-1">
                  //           <Clock className="h-3 w-3" />
                  //           Checked every {check.interval_minutes} minutes
                  //         </p>
                  //       </div>

                  //     </div>
                  //   </CardContent>
                  // </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color = status === "online" ? "bg-green-700" : "bg-red-700";
  return (
    <Badge className={color + " text-white h-fit"}>
      {status === "online" ? "Online" : "Offline"}
    </Badge>
  );
}
