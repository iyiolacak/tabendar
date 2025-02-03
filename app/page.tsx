"use client";

import React from "react";
import Clock from "./components/clock/Clock";
import ContributionsHeatmap from "./components/ContributionsHeatmap";
import GitCard from "./components/GitCard";
import { Flame, Laugh, CloudRain } from "lucide-react";
import { motion } from "framer-motion";

const preferVideo = false;

const GlassPage: React.FC = () => {
  
    const gitStats = [
      { title: "Earth Villain", message: "You used LLM services 4x more today. You don’t really love your planet, do you?", icon: CloudRain },
      { title: "Code Pyromaniac", message: "Your commit history looks like a wildfire. Ever heard of clean commits?", icon: Flame },
      { title: "Commit Comedian", message: "Half your commit messages are memes. Are you even serious about coding?", icon: Laugh },
      { title: "Push Philosopher", message: "You push once a week but write essays in the commit messages." }
    ];

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Global Background */}
      {!preferVideo ? (
        <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
        autoPlay
        muted
        loop
        className="absolute inset-0 object-cover"
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
        <Clock />
        <div className="glass-square rounded-3xl p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-3 px-2">
            {gitStats.map((stat, index) => (
              <GitCard
                key={index}
                title={stat.title}
                message={stat.message}
                icon={stat.icon}
              />
            ))}
          </div>
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
