"use client";

import React from "react";
import Clock from "./components/clock/Clock";
import ContributionsHeatmap from "./components/ContributionsHeatmap";

const preferVideo = false;

const GlassPage: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Global Background */}
      {!preferVideo ? (
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 object-cover opacity-20"
          src="./video.mp4"
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: "url('wallpaper.png')" }}
        />
      )}

      {/* Main Content – using flex for layout */}
      <div className="flex flex-col items-center gap-12 z-10 p-4">
        <Clock />
        <div className="glass-square rounded-3xl p-8">
          <ContributionsHeatmap />
        </div>
      </div>
    </div>
  );
};

export default GlassPage;
