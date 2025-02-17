import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const Drawer = ({ children }: { children: React.ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={isDrawerOpen}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className={cn(
            "visible min-w-full z-30 lg:px-28 flex flex-col items-center justify-center mt-12 gap-12",
            {
              "hidden ": !isDrawerOpen,
            }
          )}
          >
          {/**
          *
          * If width is 1920px, then keep the drawer width to some point. 
          * If smaller than that(which means browser window is shrinked), then make drawer width fixed but smaller and take off one widget.
          *
          */}
          <div
            className="
            w-full h-full flex flex-col items-center justify-center glass-square
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
