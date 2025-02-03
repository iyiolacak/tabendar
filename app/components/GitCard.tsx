import { DropletOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const GitCard = ({ title, message, icon: Icon = DropletOff, id, onRemove }) => {
    
    useEffect(() => {
        const timer = setTimeout(() => onRemove(id), 5000); // remove after 5s
        return () => clearTimeout(timer);
    }, [id, onRemove]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="glass-square-accent flex items-center rounded-2xl py-2 px-3 gap-x-2 max-w-sm shadow-lg">
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
    </AnimatePresence>
  );
};

const GitNotificationCenter = ({ notifications, setNotifications }) => {
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
      {notifications.map((notif) => (
        <GitCard key={notif.id} {...notif} onRemove={removeNotification} />
      ))}
    </div>
  );
};

export default GitNotificationCenter;
