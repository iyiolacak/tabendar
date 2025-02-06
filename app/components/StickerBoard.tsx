"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Sticker {
  id: number;
  src: string;
  x: number;
  y: number;
}

const StickerBoard: React.FC = () => {
  const [stickers, setStickers] = useState<Sticker[]>([
    { id: 412, src: "/sticker_programming.png", x: 50, y: 50 },
    { id: 113, src: "/sticker_anime.png", x: 350, y: 150 },
  ]);

  const addSticker = useCallback((src: string, x: number, y: number) => {
    setStickers((prev) => [...prev, { id: Date.now(), src, x, y }]);
  }, []);

  const updateStickerPosition = useCallback((id: number, x: number, y: number) => {
    setStickers((prev) => prev.map((sticker) => sticker.id === id ? { ...sticker, x, y } : sticker));
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        const rect = e.currentTarget.getBoundingClientRect();
        addSticker(url, e.clientX - rect.left, e.clientY - rect.top);
      }
    }
  }, [addSticker]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-full h-full"
    >
      {/* Background Image */}
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src="/wallpaper.png"
        alt="Background"
      />

      {/* Stickers */}
      {stickers.map((sticker) => (
        <motion.img
          key={sticker.id}
          src={sticker.src}
          alt="sticker"
          className="absolute cursor-pointer"
          drag
          dragConstraints={{ left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight }}
          style={{ x: sticker.x, y: sticker.y, width: 225, height: "auto" }}
          onDragEnd={(event, info) => {
            if(event !== null) {
              if (event.target !== null) {
                const rect = (event.target as HTMLElement).getBoundingClientRect();
                updateStickerPosition(sticker.id, info.point.x - rect.left, info.point.y - rect.top);
              }
            }
          }}
        />
      ))}
    </div>
  );
};

export default StickerBoard;
