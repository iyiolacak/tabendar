import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

const Drawer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className={cn(
            "visible z-30 w-full flex flex-col items-center justify-center  gap-12",
          )}
        >
          <div
            className="
             h-full w-4/6 flex flex-col items-center justify-center glass-square
      rounded-[64px] px-8 py-3 gap-4 overflow-auto"
          >
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Drawer;
