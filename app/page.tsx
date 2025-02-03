"use client";

import React from "react";
import { motion } from "framer-motion";
import { CloudRain } from "lucide-react";
import Clock from "./components/clock/Clock";
import ContributionsHeatmap from "./components/ContributionsHeatmap";
import GitNotificationCenter from "./components/GitCard";

// Define the notification type for clarity
interface Notification {
  id: string;
  title: string;
  message: string;
  icon: React.ElementType;
}

// Static notifications array (could be moved outside if not dynamic)
const gitNotifications: Notification[] = [
  {
    id: "1",
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

const Background: React.FC<BackgroundProps> = ({
  preferVideo,
  videoSrc = "./video.mp4",
  wallpaperSrc = "wallpaper.png",
  videoOpacity = 0.4,
  wallpaperOpacity = 0.2,
}) => {
  return preferVideo ? (
    <motion.video
      initial={{ opacity: 0 }}
      animate={{ opacity: videoOpacity }}
      transition={{ duration: 1 }}
      autoPlay
      muted
      loop
      className="absolute inset-0 w-full h-full object-cover"
      src={videoSrc}
    />
  ) : (
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${wallpaperSrc}')`,
        opacity: wallpaperOpacity,
      }}
    />
  );
};

const GlassPage: React.FC = () => {
  // Set to false for wallpaper background; flip to true to use video.
  const preferVideo = false;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Layer */}
      <Background preferVideo={preferVideo} />

      {/* Main Content */}
      <main className="relative flex flex-col items-center gap-12 z-10">
        {/* Notification Center (absolutely positioned in the top-right) */}
        <div className="absolute top-4 right-4 grid grid-rows-4 gap-3 py-3 px-2">
          <GitNotificationCenter notifications={gitNotifications} />
        </div>

        {/* Clock Component */}
        <Clock />

        {/* Glass Container */}
        <section className="relative flex flex-col glass-square rounded-3xl p-8 gap-4">
          {/* Drawer Handle */}
          <div className="absolute inset-0 w-1/5 h-2 bg-white rounded-md z-50" />

          <div className="flex w-full h-full gap-4">
            {/* Left Panel: Contributions and Stats */}
            <div className="grid grid-rows-4 gap-4 w-max">
              <ContributionsHeatmap />

              <div className="flex gap-4">
                <div className="solid-dark-square flex flex-col items-center justify-center p-3 min-h-[11rem] w-fit px-12 rounded-2xl text-white">
                  <p className="text-xl text-white/80">You mostly coded in</p>
                  <h2 className="font-semibold text-3xl">Python</h2>
                </div>
                <div className="solid-dark-square flex flex-col items-center justify-center p-3 min-h-[11rem] w-fit px-12 rounded-2xl text-white">
                  <p className="text-xl text-white/80">
                    Your first commit was 4017 days ago
                  </p>
                  <h2 className="font-semibold text-3xl">
                    That&apos;s older than Rust.
                  </h2>
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
