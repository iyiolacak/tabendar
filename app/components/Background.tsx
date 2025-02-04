"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

/////////////////////////
// Background Component
/////////////////////////

interface BackgroundProps {
  preferVideo: boolean;
  videoSrc?: string; // optional if not using video
  wallpaperSrc: string;
  wallpaperOpacity: number;
  videoOpacity: number;
  className?: string;
}

const Background: React.FC<BackgroundProps> = ({
  preferVideo,
  videoSrc,
  wallpaperSrc,
  wallpaperOpacity,
  videoOpacity,
  className = "",
}) => {
  if (preferVideo && videoSrc) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ opacity: videoOpacity }}
        className={`${className} object-cover w-full h-full`}
        src={videoSrc}
      />
    );
  } else {
    return (
      <div
        className={`${className} bg-cover bg-center bg-no-repeat w-full h-full`}
        style={{
          backgroundImage: `url('${wallpaperSrc}')`,
          opacity: wallpaperOpacity,
        }}
      />
    );
  }
};

Background.displayName = "Background";

/////////////////////////
// StickerBoard Component
/////////////////////////

interface Sticker {
  id: number;
  src: string;
  x: number;
  y: number;
}

interface StickerBoardProps extends BackgroundProps {
  // You can extend with extra props if needed
}

const StickerBoard: React.FC<StickerBoardProps> = ({
  preferVideo,
  videoSrc,
  wallpaperSrc,
  wallpaperOpacity,
  videoOpacity,
}) => {
  const [stickers, setStickers] = useState<Sticker[]>([
    { id: 412, src: "/sticker_programming.png", x: 50, y: 50 },
    { id: 113, src: "/sticker_anime.png", x: 350, y: 150 },

  ]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  // Add a new sticker at the given (x, y) position
  const addSticker = useCallback((src: string, x: number, y: number) => {
    setStickers((prev) => [...prev, { id: Date.now(), src, x, y }]);
  }, []);

  // Update sticker position after drag ends
  const updateStickerPosition = useCallback(
    (id: number, x: number, y: number) => {
      setStickers((prev) =>
        prev.map((sticker) =>
          sticker.id === id ? { ...sticker, x, y } : sticker
        )
      );
    },
    []
  );

  // Handle drop events
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDraggingOver(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        // Ensure the file is an image
        if (file.type.startsWith("image/")) {
          const url = URL.createObjectURL(file);
          if (boardRef.current) {
            const rect = boardRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            addSticker(url, x, y);
          }
        }
        e.dataTransfer.clearData();
      }
    },
    [addSticker]
  );

  // Handle click to add a default sticker
  const handleBoardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      addSticker("/sticker_programming.png", x, y);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        ref={boardRef}
        onClick={handleBoardClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className="absolute z-10 w-full h-full select-none"
        style={{ touchAction: "none" }}
      >
        {/* Background Layer */}
        <Background
          preferVideo={preferVideo}
          videoSrc={videoSrc}
          wallpaperSrc={wallpaperSrc}
          wallpaperOpacity={wallpaperOpacity}
          videoOpacity={videoOpacity}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Drop Highlight Overlay */}
        {isDraggingOver && (
          <div className="absolute inset-0 bg-gray-200 opacity-50 z-20 pointer-events-none" />
        )}

        {/* Render Draggable Stickers */}
        {stickers.map((sticker) => (
          <motion.img
            key={sticker.id}
            src={sticker.src}
            alt="sticker"
            className="absolute cursor-move z-10"
            drag
            dragConstraints={boardRef}
            dragElastic={0.1}
            dragMomentum={true}
            style={{
              x: sticker.x, // Use motion style prop directly
              y: sticker.y,
              width: 225,
              height: "auto",
            }}
            onDragEnd={(event, info) => {
              if (boardRef.current) {
                const rect = boardRef.current.getBoundingClientRect();
                const newX = info.point.x - rect.left;
                const newY = info.point.y - rect.top;
                updateStickerPosition(sticker.id, newX, newY);
              }
            }}
          />
        ))}
      </div>
    </>
  );
};

export default StickerBoard;
