import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import DrawerHandler from "./DrawerHandler";

const Drawer = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className={cn(
            "visible z-30 w-full flex flex-col items-center justify-center  gap-12"
          )}
        >
          <div
            className="
            glass-square h-full rounded-[64px]
            flex flex-col items-center justify-center pt-4"
          >
            <DrawerHandler />
            <div
              className="            px-8 pt-4 gap-4 overflow-auto
            grid grid-cols-[repeat(6,_280px)] grid-rows-[repeat(3,_280px)]"
            >
              {children}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default Drawer;
