"use client";

import React, { Suspense, useMemo } from "react";
import { motion } from "framer-motion";
import { CloudRain } from "lucide-react";
import Clock from "./components/clock/Clock";
import ContributionsHeatmap from "./components/ContributionsHeatmap";
import GitNotificationCenter from "./components/GitNotifCard";
import Background from "./components/Background";

// Define the notification type for clarity
interface Notification {
  id: string;
  title: string;
  message: string;
  icon: React.ElementType;
}

// Static notifications array (using useMemo to avoid re-creation on each render)
const gitNotifications: Notification[] = [
  {
    id: "1",
    title: "Cloud Abuser",
    message: "Used LLMs 4x more today. OpenAI sends their regards.",
    icon: CloudRain,
  },
  // Additional notifications can go here.
];

interface BackgroundProps {
  preferVideo: boolean;
  videoSrc?: string;
  wallpaperSrc?: string;
  videoOpacity?: number;
  wallpaperOpacity?: number;
}


const GlassPage: React.FC = () => {
  // Set to false for wallpaper background; flip to true to use video.
  const preferVideo = false;

  // Memoize the notifications so they don't get recreated on every render.
  const notifications = useMemo(() => gitNotifications, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <Background preferVideo={preferVideo} />

      {/* Main Content */}
      <main className="relative flex flex-col items-center gap-12 z-10">
        {/* Notification Center */}
        <div className="absolute top-4 right-4 grid grid-rows-4 gap-3 py-3 px-2">
          <GitNotificationCenter notifications={notifications} />
        </div>

        {/* Clock Component */}
        <Clock />

        {/* Glass Container */}
        <section className="relative flex flex-col glass-square rounded-3xl p-8 h-min gap-4">
          {/* Drawer Handle */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-white rounded-md z-50" />

          <div className="flex w-full gap-4">
            {/* Left Panel: Contributions and Stats */}
            <div className="grid grid-rows-4 gap-4 w-max">
              <ContributionsHeatmap />

              <div className="flex gap-4">
                <div className="solid-dark-square flex flex-col items-center justify-center p-3 min-h-[11rem] w-fit px-12 rounded-2xl text-white">
                  <p className="text-xl text-white/80">You mostly coded in</p>
                  <h2 className="font-semibold text-3xl">Python</h2>
                  <p className="text-sm text-white/30 h-full">Except today.</p>
                </div>
                <div className="relative glass-square flex border-none flex-col items-center justify-center p-3 min-h-[11rem] w-fit px-12 rounded-2xl text-white overflow-hidden">
                  {/* Background Image (with lazy loading) */}
                  <img
                    src="/nested_hearts.png"
                    alt="Commit History"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>

                  {/* Text Content */}
                  <div className="z-10 text-center">
                    <p className="text-xl shadow-2xl">
                      Your first commit was{" "}
                      <span className="font-medium">4017</span> days ago
                    </p>
                    <h2 className="font-semibold text-3xl">
                      That&apos;s older than Rust.
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Highlighted Metric */}
            <div className="solid-dark-square rounded-2xl min-w-[20rem] h-[20rem] flex items-center justify-center">
              <p className="font-chintzy text-6xl text-blue-700">4017</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Text */}
      <footer className="absolute bottom-3 w-full flex justify-center">
        <p className="font-sans text-white/60 text-xl">
          Beauty without depth is just decoration.
        </p>
      </footer>
    </div>
  );
};

export default GlassPage;
