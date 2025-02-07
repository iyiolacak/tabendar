"use client";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import React from "react";

const Wallpaper = () => {
  return (
    <AnimatePresence>
      <motion.img
        key="./wallpaper_monochrome.png"
        src="./wallpaper_monochrome.png"
        alt="wallpaper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 25,
          duration: 0.5,
        }}
        className="absolute z-0 inset-0 w-full h-full object-cover"
      />
    </AnimatePresence>
  );
};

export default Wallpaper;
