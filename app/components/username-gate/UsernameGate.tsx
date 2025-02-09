// components/UsernameGate.tsx
"use client";

import { useEffect, useState } from "react";
import UsernameEntryForm from "./UsernameEntryForm";

export default function UsernameGate({ children }: { children: React.ReactNode }) {
  const [hasUsername, setHasUsername] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem("githubUsername");
    setHasUsername(!!username);
    setIsLoading(false);
  }, []);

  const handleSubmit = () => {
    setHasUsername(true);
  };

  if (isLoading) return null; // Add loading state if needed

  if (!hasUsername) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative rounded-2xl border border-white/10 bg-gray-900 p-8 shadow-xl">
          <UsernameEntryForm onUsernameSubmit={handleSubmit} />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}