import { DropletOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GitCard = ({ title, message, icon: Icon = DropletOff }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="glass-square-accent flex items-center rounded-2xl py-2 px-3 gap-x-2 max-w-sm shadow-md">
            <div className="solid-dark-square flex items-center justify-center min-w-9 min-h-9 rounded-xl">
              <Icon className="text-white/80 size-6" />
            </div>
            <div className="flex flex-col max-w-xs">
              <h3 className="text-md font-medium w-full" title={title}>
                {title}
              </h3>
              <p className="text-sm cursor-pointer">{message}</p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </motion.div>
  );
};

const GitNotificationCenter = ({ notifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotifications(true);
    }, 1200); // show notifications after 15s

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
      <AnimatePresence>
        {showNotifications &&
          notifications.map((notif) => (
            <GitCard key={notif.title} {...notif} />
          ))}
      </AnimatePresence>
    </div>
  );
};

export default GitNotificationCenter;
