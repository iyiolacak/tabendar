"use client";

import React from "react";
import { CloudRain } from "lucide-react";
import Background from "./components/Background";
import Clock from "./components/clock/Clock";
import ContributionsHeatmap from "./components/ContributionsHeatmap";
import GitNotificationCenter from "./components/GitNotifCard";
import AnalogClock from "./components/clock/LiveAnalogClock";
import { GitHubNumber } from "./components/GithubNumber";

export interface Notification {
  id: string;
  title: string;
  message: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

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
  const preferVideo = false;

  return (
    <div className="relative bg-blue-700/40 min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <Background
        preferVideo={preferVideo}
        wallpaperSrc="./wallpaper.png"
        wallpaperOpacity={0.3}
        videoOpacity={0.3}
        className="absolute inset-0"
      />

      {/* Notification Center */}
      <div className="absolute top-4 right-4 grid grid-rows-4 gap-3 py-3 px-2">
        <GitNotificationCenter notifications={gitNotifications} />
      </div>

      {/* Main Content */}
      {/*
       */}
      <main className="z-20 w-full flex flex-col items-center justify-center gap-12">
        <Clock />

        {/* Glass Container */}
        <section
          className="w-full h-full flex flex-col items-center justify-center glass-square 
                     rounded-3xl px-4 py-3 gap-4 overflow-auto"
        >
          {/* Drawer Handle */}
          <div className="w-48 h-2 bg-white rounded-md z-50" />

          <div className="flex w-full gap-4">
            {/* Left Panel: Contributions and Stats */}
            <div className="grid grid-rows-1 mb-4 min-w-content">
              <ContributionsHeatmap />

              <div className="flex gap-4">
                {/* Example Card */}
                <div className="group solid-dark-square flex flex-col items-center justify-center p-3 h-[15rem] w-fit px-12 rounded-2xl text-white">
                  <div className="size-16 border border-neutral-800 rounded-lg">
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

                {/* First Commit Card */}
                <div className="relative glass-square flex border-none flex-col items-center justify-center p-3 max-h-[11rem] w-fit px-12 rounded-2xl text-white overflow-hidden">
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

                {/* Productive Hour Card */}
                <div className="bg-red-600 rounded-2xl min-w-[11rem] flex items-center justify-center relative overflow-hidden">
                  <div className="flex flex-col px-2">
                    <div className="flex w-full z-20">
                      <AnalogClock />
                    </div>
                    <div className="relative w-32">
                      <div className="relative inset-0" />
                      <GitHubNumber
                        number="7"
                        randomBrightness={true}
                        showBackground={true}
                        withShine={true}
                        className="relative inset-0 flex items-center justify-center"
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
            {/* Right Panel (if needed) */}
          </div>
        </section>
      </main>

      <footer className="w-full flex justify-center">
        {/* Footer content here */}
      </footer>
    </div>
  );
};

export default GlassPage;
