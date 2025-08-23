import React, { Suspense } from "react";
import DashBoardProvider from "./provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { Toaster } from "sonner";
import NavBar from "@/components/layers/NavBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashBoardProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <SidebarTrigger />
            <NavBar />
            <Suspense
              fallback={<div className="p-4">Loading...</div>}
            ></Suspense>
            {children}
          </main>
          <Toaster />
        </SidebarProvider>
      </DashBoardProvider>
    </div>
  );
}
