import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import Provider from "./provider";

const sora = Sora({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medixly",
  description:
    "Never miss a dose again. Medixly is your smart medication companion — built to remind, track, and keep you on schedule with ease. Stay healthy, stay consistent.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
