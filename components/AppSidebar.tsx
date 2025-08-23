"use client";
import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
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
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile, setOpen, setOpenMobile } = useSidebar();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isMobile) setOpenMobile(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isMobile]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a skeleton placeholder
  }
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
      name: "Billing",
      icon: Wallet,
      path: "/billing",
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
      <Sidebar
        collapsible="icon"
        variant="sidebar"
        side="left"
        className={!mounted ? "invisible" : ""}
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="my-4 outline-none">
              <Image
                src={"/logo1.png"}
                alt="logo"
                width={180}
                height={180}
                priority
                className="object-contain"
              />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col gap-6 mt-8 w-full justify-center">
                {sidebarItems.map((item) => (
                  <SidebarMenuItem
                    key={item.name}
                    className={`hover:text-gray-800 text-gray-400 transition-all duration-400  px-2 z-10  rounded-lg relative  ${
                      pathname.startsWith(item.path) &&
                      "bg-gray-100 font-semibold"
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
                      <Link
                        href={item.path}
                        onClick={() => {
                          if (isMobile) setOpenMobile(false);
                        }}
                      >
                        <item.icon
                          color="#3DAEAC"
                          strokeWidth={pathname.startsWith(item.path) ? 3 : 2}
                        />
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
