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
      <Suspense fallback="We are loading the video, bro.">
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: videoOpacity }}
          transition={{ duration: 1 }}
          autoPlay
          muted
          loop
          playsInline
          // Instead of absolute, we rely on the grid container to size this element.
          className={`${className} object-cover`}
          src={videoSrc}
        />
      </Suspense>
    ) : (
      <div
        className={`${className} bg-cover bg-center bg-no-repeat`}
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
