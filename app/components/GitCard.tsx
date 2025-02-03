import { DropletOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GitCardProps {
  title: string;
  message: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onDismiss?: () => void;
  dismissDelay?: number; // in milliseconds
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -10 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: -10 },
};

const GitCard: React.FC<GitCardProps> = ({
  title,
  message,
  icon: Icon = DropletOff,
  onDismiss,
  dismissDelay = 5000,
}) => {
  // Automatically dismiss after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss?.();
    }, dismissDelay);
    return () => clearTimeout(timer);
  }, [dismissDelay, onDismiss]);

  // Dismiss notification when clicked
  const handleClick = () => {
    onDismiss?.();
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="glass-square-accent flex items-center rounded-2xl py-2 px-3 gap-x-2 max-w-sm shadow-md">
            <div className="bg-blue-700/80 flex items-center justify-center min-w-9 min-h-9 rounded-xl">
              <Icon className="text-white/60 size-6" />
            </div>
            <div className="flex flex-col max-w-xs">
              <h3 className="text-md font-medium w-full text-white/80" title={title}>
                {title}
              </h3>
              <p className="text-sm text-white/80">{message}</p>
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

interface NotificationItem {
  id: string; // unique id for each notification
  title: string;
  message: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  dismissDelay?: number;
}

interface GitNotificationCenterProps {
  notifications: NotificationItem[];
}

const GitNotificationCenter: React.FC<GitNotificationCenterProps> = ({
  notifications: initialNotifications,
}) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    setNotifications([]); // Clear existing notifications first
  
    initialNotifications.forEach((notif, i) => {
      const timer = setTimeout(() => {
        setNotifications((prev) => [...prev, notif]); // Append notification instead of replacing state
      }, 600 + i * 600); // Staggered delay
  
      return () => clearTimeout(timer);
    });
  }, [initialNotifications]);
    // Remove a notification when dismissed
  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
      <AnimatePresence>
        {notifications.map((notif) => (
          <GitCard
            key={notif.id}
            title={notif.title}
            message={notif.message}
            icon={notif.icon}
            dismissDelay={notif.dismissDelay}
            onDismiss={() => handleDismiss(notif.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default GitNotificationCenter;
