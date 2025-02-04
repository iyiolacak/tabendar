"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";

interface BackgroundProps {
  preferVideo: boolean;
  videoSrc?: string;
  wallpaperSrc?: string;
  videoOpacity?: number;
  wallpaperOpacity?: number;
  className?: string;
}

const Background = React.memo(
  ({
    preferVideo,
    videoSrc = "./video.mp4",
    wallpaperSrc = "wallpaper.png",
    videoOpacity = 0.4,
    wallpaperOpacity = 0.2,
    className = "",
  }: BackgroundProps) => {
    return preferVideo ? (
      <Suspense fallback={<div>Loading video…</div>}>
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: videoOpacity }}
          transition={{ duration: 1 }}
          autoPlay
          muted
          loop
          playsInline
          // This video fills its container via grid placement
          className={`${className} object-cover z-10 max-w-full max-h-full`}
          src={videoSrc}
        />
      </Suspense>
    ) : (
      <div
        className={`${className} z-10 bg-cover bg-center bg-no-repeat max-w-full max-h-full`}
        style={{
          backgroundImage: `url('${wallpaperSrc}')`,
          opacity: wallpaperOpacity,
        }}
      />
    );
  }
);

Background.displayName = "Background";

export default Background;
