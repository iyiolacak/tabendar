import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { forwardRef, Ref } from "react";
import DrawerHandler from "./DrawerHandler";

type DrawerProps = {
  children: React.ReactNode;
};
const Drawer = forwardRef<HTMLDivElement, DrawerProps>(({ children }, ref) => {
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
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
              className="
              px-8 pt-4 gap-4 overflow-auto
              grid grid-cols-[repeat(6,_280px)] grid-rows-[repeat(3,_280px)]"
              ref={ref}
              data-swapy-slot={`slot`}
            >
              {children}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
});

Drawer.displayName = "Drawer";

export default Drawer;
