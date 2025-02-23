import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { forwardRef, Ref } from "react";
import DrawerHandler from "./DrawerHandler";
import { Widget } from "@/app/types/types";
import { preferences } from "@/app/constants/preferences";

type DrawerProps = {
  children: React.ReactNode;
};

const Drawer = forwardRef<HTMLDivElement, DrawerProps>(({ children }, ref) => {
  return (
    // todo: add dynamic widgets support, e.g. col-span-3 row-span-1
    <>
      <div
        className={cn(
          "visible z-30 w-full flex flex-col items-center justify-center gap-12"
        )}
      >
        <div className="glass-square h-full rounded-[64px] flex flex-col items-center justify-center pt-4">
          <div className="flex flex-row w-full items-center justify-center gap-x-8">
            <button className="bg-white/80 text-black text-sm rounded-lg px-3 py-0.5">
              Add a Widget
            </button>
            <DrawerHandler />
          </div>
          <div
            className={`px-8 pt-4 gap-4 overflow-auto grid grid-cols-[repeat(${preferences.layout.columnsPerRow},_280px)] grid-rows-[repeat(${preferences.layout.rows},_280px)] border border-purple-300`}
            ref={ref}
          >
            {children} {/* Render the slot divs here */}
          </div>
        </div>
      </div>
    </>
  );
});

Drawer.displayName = "Drawer";

export default Drawer;
