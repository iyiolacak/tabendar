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
  className: string;
}

const Background = React.memo(
  ({
    preferVideo,
    videoSrc,
    wallpaperSrc,
    videoOpacity,
    wallpaperOpacity,
    className,
  }: BackgroundProps) => {
    if (preferVideo && videoSrc) {
      return (
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{ opacity: videoOpacity }}
          className={`${className} object-cover z-10 w-full h-full`}
          src={videoSrc}
        />
      );
    } else {
      return (
        <div
          className={`${className} z-10 bg-cover bg-center bg-no-repeat w-full h-full`}
          style={{
            backgroundImage: `url('${wallpaperSrc}')`,
            opacity: wallpaperOpacity,
          }}
        />
      );
    }
  }
);

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

const StickerBoard: React.FC<BackgroundProps> = ({
  preferVideo,
  videoSrc,
  wallpaperSrc,
  wallpaperOpacity,
  videoOpacity,
}) => {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  // Add a new sticker at (x, y) position
  const addSticker = useCallback((src: string, x: number, y: number) => {
    setStickers((prev) => [...prev, { id: Date.now(), src, x, y }]);
  }, []);

  // Update sticker position after drag end
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

  // Handle files dropped from outside (or from a sticker palette)
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

  // Also handle clicks to add a default sticker (ensure the file exists in your public folder)
  const handleBoardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      addSticker("/default-sticker.png", x, y);
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
    <div
      ref={boardRef}
      onClick={handleBoardClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      className="relative w-full h-full select-none"
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
          className="absolute cursor-move z-30"
          drag
          dragConstraints={boardRef}
          dragElastic={0.1}
          dragMomentum={true}
          initial={{ x: sticker.x, y: sticker.y }}
          animate={{ x: sticker.x, y: sticker.y }}
          onDragEnd={(event, info) => {
            if (boardRef.current) {
              const rect = boardRef.current.getBoundingClientRect();
              const newX = info.point.x - rect.left;
              const newY = info.point.y - rect.top;
              updateStickerPosition(sticker.id, newX, newY);
            }
          }}
          style={{ width: 100, height: "auto" }}
        />
      ))}
    </div>
  );
};

export default StickerBoard;
