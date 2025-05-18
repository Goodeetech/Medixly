import React from "react";
import DashBoardProvider from "./provider";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashBoardProvider>{children}</DashBoardProvider>
    </div>
  );
}
