"use client";

import React from "react";
import { CloudRain } from "lucide-react";
import Clock from "./components/clock/Clock";
import ContributionsHeatmap from "./components/ContributionsHeatmap";
import GitNotificationCenter from "./components/GitNotifCard";
import AnalogClock from "./components/clock/LiveAnalogClock";
import { GitHubNumber } from "./components/GithubNumber";
import BookCover from "./components/BookCover";
import StickerBoard from "./components/Background";

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
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <StickerBoard
        preferVideo={false}
        wallpaperSrc="/wallpaper.png" // note the leading slash!
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
      <main className="z-20 min-w-full lg:px-28 flex flex-col items-center justify-center mt-12 gap-12">
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
            <div className="grid grid-rows-1 mb-4 gap-y-3 h-full min-w-content">
              <div className="flex flex-row gap-x-4 h-full">
                <ContributionsHeatmap />
                <AnalogClock />
              </div>

              <div className="flex gap-4">
                <BookCover
                  cover=""
                  onClick={() =>
                    console.log("I think you should go Notion manually.")
                  }
                />
                {/* Python Card */}
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

                <div className="solid-dark-square group rounded-2xl min-w-[12rem] flex items-center justify-center relative overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105">
                  <div className="">
                    {/* GitHubNumber acts as the dynamic background and now centers its own content */}
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex h-14 px-2 bg-neutral-800 rounded-2xl items-center transition-all duration-300 ease-in-out">
                          <h1 className="text-md font-bold uppercase text-white drop-shadow-xl">
                            Productive Hour
                          </h1>
                        </div>
                      </div>
                      {
                      <GitHubNumber
                        number="7"
                        randomBrightness={true}
                        showBackground={true}
                        withShine={true}
                        className="flex flex-col items-center justify-center relative transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-125"
                      />
                      }
                    </div>
                    {/* Headline overlay */}
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
