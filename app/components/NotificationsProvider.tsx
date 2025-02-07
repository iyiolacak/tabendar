// NotificationsProvider.tsx (server component, so no "use client" here)
import React from "react";
import GitNotificationCenter from "./GitNotifCard";

interface Notification {
  id: string;
  title: string;
  message: string;
  iconName?: string; // Use a string to identify the icon
}

const NotificationsProvider = () => {
  const gitNotifications: Notification[] = [
    {
      id: "7",
      title: "Cloud Abuser",
      message: "Used LLMs 4x more today. OpenAI sends their regards.",
      iconName: "CloudRain",
    },
  ];

  return (
    <div className="absolute top-4 right-4 grid grid-rows-4 gap-3 py-3 px-2">
      <GitNotificationCenter notifications={gitNotifications} />
    </div>
  );
};

export default NotificationsProvider;
