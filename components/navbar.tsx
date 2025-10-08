"use client";
import { Activity, ArrowRight } from "lucide-react";
import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  const { user } = useUser();

  return (
    <header className=" sticky top-0 z-50 border-b bg-background/50 backdrop-blur-sm">
      <div className="p-8 flex h-16 items-center justify-between">
        <Link href="/">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-600 text-primary-foreground">
              <Activity className="h-5 w-5" />
            </div>
            <span className="hidden sm:block text-xl text-foreground tracking-tighter font-semibold ">
              Uptime Monitor
            </span>
          </div>
        </Link>
        {!user ? (
          <Button asChild className="bg-white">
            <Link href="/dashboard" className="flex items-center gap-2">
              Log into Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          <UserButton />
        )}
      </div>
    </header>
  );
}
