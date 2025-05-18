"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BellRing,
  Bookmark,
  Calendar,
  FrameIcon,
  HelpCircleIcon,
  Home,
  LogOut,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const AppSidebar = () => {
  const pathname = usePathname();
  console.log(pathname);
  const sidebarItems = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/dashboard",
      description:
        "Overview of reminders, adherence stats, and recent activity.",
    },
    {
      name: "My Medications",
      icon: Bookmark,
      path: "/medications",
      description: "List of medications you're currently tracking.",
    },
    {
      name: "Reminders",
      icon: BellRing,
      path: "/reminders",
      description: "Create, update, or delete medication reminders.",
    },
    {
      name: "Calendar View",
      icon: Calendar,
      path: "/calendar",
      description: "Visual schedule of your upcoming doses.",
    },
    {
      name: "Stats",
      icon: FrameIcon,
      path: "/stats",
      description: "Simple adherence stats (e.g., missed vs taken doses).",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
      description: "Manage profile, notification preferences, timezone, etc.",
    },
    {
      name: "Support / Help",
      icon: HelpCircleIcon,
      path: "/help",
      description: "FAQ or link to contact support (even if basic).",
    },
    {
      name: "Logout",
      icon: LogOut,
      path: "/logout",
      description: "Securely log out of your Medixly account.",
    },
  ];

  return (
    <div className="shadow-md">
      <Sidebar>
        <SidebarContent className=" ">
          <SidebarGroup>
            <SidebarGroupLabel className="my-4">
              <Image
                src={"/logo1.png"}
                alt="logo"
                width={180}
                height={180}
                className="object-contain"
              />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-6 mt-4 w-full justify-center">
                {sidebarItems.map((item) => (
                  <SidebarMenuItem
                    key={item.name}
                    className={` ${
                      pathname.startsWith(item.path) && "bg-[#D8D8D8] "
                    }px-2 z-10 rounded-lg `}
                  >
                    <SidebarMenuButton
                      asChild
                      className="hover:bg-[#D8D8D8] transition-all duration-300"
                    >
                      <a href={item.path}>
                        <item.icon color="#3DAEAC" strokeWidth={2} size={64} />
                        <span className="text-md font-semibold text-gray-800 px-1 ">
                          {item.name}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
};

export default AppSidebar;
