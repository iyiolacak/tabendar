import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { forwardRef, Ref } from "react";
import DrawerHandler from "./DrawerHandler";
import { WidgetLayoutValue } from "@/app/types/types";

type DrawerProps = {
  children: React.ReactNode;
  onAddWidget: (widget: WidgetLayoutValue) => void;
};
const Drawer = forwardRef<HTMLDivElement, DrawerProps>(({ children, onAddWidget }, ref) => {
  const handleAddWidget = () => {
    onAddWidget("S");
  }
  return (
    <>
        <div
          className={cn(
            "visible z-30 w-full flex flex-col items-center justify-center  gap-12"
          )}
        >
          <div
            className="
            glass-square h-full rounded-[64px]
            flex flex-col items-center justify-center pt-4"
          >
            <div className="flex flex-row w-full items-center justify-center gap-x-8">
              <button className="bg-white/80 text-black text-sm rounded-lg px-3 py-0.5" onClick={handleAddWidget}>
                Add a Widget
              </button>
            <DrawerHandler />
            </div>
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
        </div>
    </>
  );
});

Drawer.displayName = "Drawer";

export default Drawer;
