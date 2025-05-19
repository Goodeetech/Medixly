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
import Link from "next/link";

const AppSidebar = () => {
  const pathname = usePathname();
  console.log(pathname);
  const sidebarItems = [
    {
      name: "Dashboard",
      icon: Home,
      path: "/dashboard",
      description: "Your learning progress, quiz stats, and recent activity.",
    },
    {
      name: "Quiz Library",
      icon: Bookmark,
      path: "/quizzes",
      description: "Browse and attempt quizzes by topic or difficulty.",
    },
    {
      name: "Practice Mode",
      icon: Calendar,
      path: "/practice",
      description: "Take quizzes without time pressure to master concepts.",
    },
    {
      name: "Leaderboard",
      icon: FrameIcon,
      path: "/leaderboard",
      description: "See top scorers and compete with other users.",
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
      description: "Manage your profile, preferences, and quiz settings.",
    },
    {
      name: "Help / FAQ",
      icon: HelpCircleIcon,
      path: "/help",
      description: "Get answers to your questions or contact support.",
    },
    {
      name: "Logout",
      icon: LogOut,
      path: "/logout",
      description: "Securely log out of your Medixly account.",
    },
  ];

  return (
    <div>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="my-4 outline-none">
              <Image
                src={"/logo1.png"}
                alt="logo"
                width={180}
                height={180}
                className="object-contain"
              />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-6 mt-8 w-full justify-center">
                {sidebarItems.map((item) => (
                  <SidebarMenuItem
                    key={item.name}
                    className={`hover:text-gray-800 text-gray-400 transition-all duration-600  px-2 z-10  rounded-lg relative  ${
                      pathname.startsWith(item.path) && "bg-gray-100"
                    }`}
                  >
                    <div
                      className={`bg-gradient-to-b from-[#4382BE] to-[#45B4A6] left-0 h-full w-2 ${
                        pathname.startsWith(item.path) &&
                        "rounded-br-sm rounded-tr-sm absolute"
                      }`}
                    ></div>

                    <SidebarMenuButton
                      asChild
                      // className="hover:bg-[#D8D8D8] transition-all duration-300"
                    >
                      <Link href={item.path}>
                        <item.icon color="#3DAEAC" strokeWidth={2} size={64} />
                        <span
                          className={`text-[16px]  px-1   ${
                            pathname.startsWith(item.path) && "text-gray-800 "
                          } `}
                        >
                          {item.name}
                        </span>
                      </Link>
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
