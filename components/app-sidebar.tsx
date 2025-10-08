"use client";

import * as React from "react";
import {
  // IconChartBar,
  IconDashboard,
  // IconFolder,
  // IconListDetails,
  // IconUsers,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Activity } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconDashboard,
      },
      // {
      //   title: "Lifecycle",
      //   url: "#",
      //   icon: IconListDetails,
      // },
      // {
      //   title: "Analytics",
      //   url: "#",
      //   icon: IconChartBar,
      // },
      // {
      //   title: "Projects",
      //   url: "#",
      //   icon: IconFolder,
      // },
      // {
      //   title: "Team",
      //   url: "#",
      //   icon: IconUsers,
      // },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <div className="flex items-center space-x-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-primary text-primary-foreground ">
                    <Activity className="h-4 w-4" />
                  </div>
                  <span className="hidden sm:block text-xl text-foreground tracking-tighter ">
                    Uptime Monitor
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        {/* <NavUser user={data.user} /> */}
        <UserButton />
      </SidebarFooter>
    </Sidebar>
  );
}
