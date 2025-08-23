import AppSidebar from "@/components/AppSidebar";
import NavBar from "@/components/layers/NavBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { Toaster } from "sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          <NavBar />

          {children}
        </main>
        <Toaster />
      </SidebarProvider>
    </div>
  );
}
