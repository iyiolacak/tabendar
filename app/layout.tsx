import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import StickerBoardWrapper from "./components/StickerBoard";
import { Clock } from "lucide-react";
import NotificationsProvider from "./components/NotificationsProvider";
import Wallpaper from "./components/Wallpaper";
import UsernameGate from "./components/username-gate/UsernameGate";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "New Tab",
  description: "New tabs are yours, again.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <TooltipProvider>
              <NotificationsProvider />
              <div className="relative min-h-screen  w-full flex items-center justify-center overflow-hidden">
                <div className="flex flex-col w-full h-full">,
                  <Wallpaper/>
                {children}
                </div>
              </div>
          </TooltipProvider>
        </body>
    </html>
  );
}
