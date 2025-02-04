"use client";

import React from "react";
import { CloudRain } from "lucide-react";

// Import our modularized Background component
import Background from "./components/Background";

// Import other components (assumed to already exist in your project)
import Clock from "./components/clock/Clock";
import ContributionsHeatmap from "./components/ContributionsHeatmap";
import GitNotificationCenter from "./components/GitNotifCard";
import AnalogClock from "./components/clock/LiveAnalogClock";
import { GitHubNumber } from "./components/GithubNumber";

// Define the notification type for clarity (export if needed elsewhere)
export interface Notification {
  id: string;
  title: string;
  message: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

// Static notifications array (this can also be extracted if reused)
const gitNotifications: Notification[] = [
  {
    id: "7",
    title: "Cloud Abuser",
    message: "Used LLMs 4x more today. OpenAI sends their regards.",
    icon: CloudRain,
  },
  // Additional notifications can be added here
];

const GlassPage: React.FC = () => {
  // Set to false for wallpaper background; change to true for video background.
  const preferVideo = false;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <Background
        preferVideo={preferVideo}
        wallpaperSrc="./wallpaper.png"
        wallpaperOpacity={0.3}
        videoOpacity={0.3}
        className="absolute inset-0"
      />

      {/* Main Content */}
      <main className="z-20 flex flex-col items-center justify-center gap-12">
        {" "}
        {/* Notification Center */}
        <div className="absolute top-4 right-4 grid grid-rows-4 gap-3 py-3 px-2">
          <GitNotificationCenter notifications={gitNotifications} />
        </div>
        {/* Clock Component */}
        <Clock />
        {/* Glass Container */}
        <section className="relative flex flex-col glass-square rounded-3xl p-8 h-min gap-4">
          {/* Drawer Handle */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-white rounded-md z-50" />

          <div className="flex w-full gap-4">
            {/* Left Panel: Contributions and Stats */}
            <div className="grid grid-rows-4 gap-x-4 w-max">
              <ContributionsHeatmap />

              <div className="flex gap-4">
                {/* Example Card */}
                <div className="group solid-dark-square flex flex-col items-center justify-center p-3 h-[15rem] w-fit px-12 rounded-2xl text-white">
                  <div className="size-16 border border-neutral-800 rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/python_mono.png"
                      alt="python_monochrome"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <p className="text-xl text-white/80 mb-1 mt-3">
                    You mostly coded in
                  </p>
                  <h2 className="font-semibold text-2xl transition-colors group-hover:text-black group-hover:bg-[#f1ea62]">
                    Python*
                  </h2>
                  <p className="text-sm mt-3 text-white/30 ">*Except today.</p>
                </div>

                {/* First commit card */}
                <div className="relative glass-square flex border-none flex-col items-center justify-center p-3 max-h-[11rem] w-fit px-12 rounded-2xl text-white overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/nested_hearts.png"
                    alt="Commit History"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
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

                {/* Productive hour card */}
                <div className="glass-square rounded-2xl min-w-[9rem] h-[10rem] flex items-center justify-center relative overflow-hidden">
                  <div className="flex w-min py-12">
                    <video
                      className="bg-red-200 blur-sm w-full h-full opacity-40"
                      src="./clock_nest_loop.mp4"
                      loop
                      autoPlay
                    />
                    <div className="flex w-full z-20">
                      <AnalogClock />
                    </div>
                    <div className="relative w-32">
                      <div className="absolute inset-0" />
                      <GitHubNumber
                        number="7"
                        randomBrightness={true}
                        showBackground={true}
                        withShine={true}
                        className="absolute inset-0 flex items-center justify-center"
                      />
                      <div className="relative z-50 p-3 flex flex-col text-lg text-center text-black">
                        Believe it or not,
                        <span>Your productive time is</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Highlighted Metric (if any) */}
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
