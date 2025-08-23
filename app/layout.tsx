import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider } from "@/components/ui/sidebar";

const sora = Sora({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medixly",
  description:
    "Medixly is a modern and interactive quiz web app designed to help medical students, healthcare professionals, and curious minds test and improve their knowledge through dynamic, customizable quizzes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <SidebarProvider>
        <html lang="en">
          <body className={`${sora.className} antialiased`}>
            <Provider>{children}</Provider>
          </body>
        </html>
      </SidebarProvider>
    </ClerkProvider>
  );
}
