"use client";

import React from "react";
import Clock from "./components/clock/Clock";
import ContributionsHeatmap from "./components/ContributionsHeatmap";
import { motion } from "framer-motion";
import GitNotificationCenter from "./components/GitCard";
import { CloudRain, Laugh, ScrollText } from "lucide-react";

const preferVideo = false;

const GlassPage: React.FC = () => {    
  const gitNotifications = [
    { title: "Cloud Abuser", message: "Used LLMs 4x more today. OpenAI sends their regards.", icon: CloudRain, id: "1" },
    { title: "Commit Clown", message: "50% of your commits are memes. The other 50% are ‘fix typo’.", icon: Laugh, id: "3" },
    { title: "Push Poet", message: "You push once a week but each commit is a full TED Talk.", icon: ScrollText, id: "4" }
  ];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Global Background */}
      {!preferVideo ? (
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
            <GitNotificationCenter notifications={gitNotifications}/>
          </div>
        <Clock />
        <div className="glass-square rounded-3xl p-8">
          <ContributionsHeatmap />
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
