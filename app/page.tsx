"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { CloudRain } from "lucide-react";
import Clock from "./components/clock/Clock";
import ContributionsHeatmap from "./components/ContributionsHeatmap";
import GitNotificationCenter from "./components/GitNotifCard";
import AnalogClock from "./components/clock/LiveAnalogClock";
import { GitHubNumber } from "./components/GithubNumber";

// Define the notification type for clarity
interface Notification {
  id: string;
  title: string;
  message: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | undefined;
}

// Static notifications array (could be moved outside if not dynamic)
const gitNotifications: Notification[] = [
  {
    id: "7",
    title: "Cloud Abuser",
    message: "Used LLMs 4x more today. OpenAI sends their regards.",
    icon: CloudRain,
  },
  // { id: "3", title: "Commit Clown", message: "50% of your commits are memes. The other 50% are ‘fix typo’.", icon: Laugh },
  // { id: "4", title: "Push Poet", message: "You push once a week but each commit is a full TED Talk.", icon: ScrollText },
];

// A separate Background component encapsulates background logic
interface BackgroundProps {
  preferVideo: boolean;
  videoSrc?: string;
  wallpaperSrc?: string;
  videoOpacity?: number;
  wallpaperOpacity?: number;
}

const Background = React.memo(
  ({
    preferVideo,
    videoSrc,
    wallpaperSrc,
    videoOpacity,
    wallpaperOpacity,
  }: BackgroundProps) => {
    return preferVideo ? (
      <Suspense fallback="We are loading the video, bro.">
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: videoOpacity }}
          transition={{ duration: 1 }}
          autoPlay
          muted
          loop
          playsInline // Helps performance on mobile
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
        />
      </Suspense>
    ) : (
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${wallpaperSrc}')`,
          opacity: wallpaperOpacity,
        }}
      />
    );
  }
);
Background.displayName = "Background";

const GlassPage: React.FC = () => {
  // Set to false for wallpaper background; flip to true to use video.
  const preferVideo = false;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <Background
        preferVideo={preferVideo}
        wallpaperSrc="./wallpaper.png"
        wallpaperOpacity={0.3}
        videoOpacity={0.3}
      />

      {/* Main Content */}
      <main className="relative flex flex-col items-center gap-12 z-10">
        {/* Notification Center (absolutely positioned in the top-right) */}
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
                {/* First commit x days ago Card */}
                <div className="relative glass-square flex border-none flex-col items-center justify-center p-3 max-h-[11rem] w-fit px-12 rounded-2xl text-white overflow-hidden">
                  {/* Background Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/nested_hearts.png"
                    alt="Commit History"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
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
                <div className="solid-dark-square rounded-2xl min-w-[9rem] h-[10rem] flex items-center justify-center relative overflow-hidden">
                  <div className="flex w-min">
                    <div className="flex w-full z-20 bg-blue-600">
                    <AnalogClock />
                    </div>
                    <div className="w-32">
                    <div className="absolute inset-0 bg-red-600" />
                    <GitHubNumber
                      number="7"
                      randomBrightness={true}
                      showBackground={false}
                      withShine={true}
                      className="absolute inset-0 flex items-center justify-center"
                      />
                    <div className="relative p-3 flex flex-col text-lg text-center text-white/40">
                      Believe it or not,
                      <span>Your productive time is</span>
                    </div>
                      </div>
                  </div>
                </div>{" "}
              </div>
            </div>

            {/* Right Panel: Highlighted Metric */}
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
