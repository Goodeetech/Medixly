import React from "react";
import DashBoardProvider from "./provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { Toaster } from "sonner";
import NavBar from "@/components/layers/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashBoardProvider>
        {/* Provider should always wrap everything */}
        <SidebarProvider>
          {/* Sidebar itself can be memoized so it doesn’t remount unnecessarily */}
          <StableSidebar />

          <main className="w-full">
            <SidebarTrigger />
            <NavBar />
            {children}
          </main>

          <Toaster />
        </SidebarProvider>
      </DashBoardProvider>
    </div>
  );
}

/** 👇 memoized AppSidebar so it doesn’t remount every route change */
const StableSidebar = React.memo(function StableSidebar() {
  return <AppSidebar />;
});
