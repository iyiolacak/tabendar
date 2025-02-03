"use client";

import React from "react";
import Clock from "./components/clock/Clock";
import ContributionsHeatmap from "./components/ContributionsHeatmap";
import { motion } from "framer-motion";
import GitNotificationCenter from "./components/GitCard";
import { CloudRain } from "lucide-react";

const preferVideo = false;

const GlassPage: React.FC = () => {
  const gitNotifications = [
    {
      title: "Cloud Abuser",
      message: "Used LLMs 4x more today. OpenAI sends their regards.",
      icon: CloudRain,
      id: "1",
    },
    //    { title: "Commit Clown", message: "50% of your commits are memes. The other 50% are ‘fix typo’.", icon: Laugh, id: "3" },
    //   { title: "Push Poet", message: "You push once a week but each commit is a full TED Talk.", icon: ScrollText, id: "4" }
  ];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Global Background */}
      {preferVideo ? (
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
          src="./video.mp4"
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('wallpaper.png')" }}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center gap-12 z-10 p-4">
        <div className="absolute top-4 right-4 grid grid-rows-4 gap-3 py-3 px-2">
          <GitNotificationCenter notifications={gitNotifications} />
        </div>
        <Clock />
        <div className="flex flex-col glass-square rounded-3xl p-8 gap-4">
          <div className="flex w-full h-full">
            <div className="grid h-full w-max gap-4 grid-rows-4 grid-cols-1">
              <ContributionsHeatmap />
              <div className="grid grid-cols-4">
                <div className="solid-dark-square flex flex-col p-3 min-h-[11rem] w-fit px-12 rounded-2xl text-white">
                  <p className="text-xl text-white/80">You mostly coded in</p>
                  <h2 className="font-semibold text-3xl">Python</h2>
                </div>
                <div className="solid-dark-square flex flex-col p-3 min-h-[11rem] w-fit px-12 rounded-2xl text-white">
                  <p className="text-xl text-white/80">
                    Your first commit was 4017 days ago
                  </p>
                  <h2 className="font-semibold text-3xl">
                    That&apos;s older than Rust.
                  </h2>
                </div>
              </div>
            </div>
            <div className="solid-dark-square min-w-[20rem] h-[20rem]"></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-3">
        <p className="font-sans text-white/60 text-xl">
          Beauty without depth is just decoration.
        </p>
      </div>
    </div>
  );
};

export default GlassPage;
