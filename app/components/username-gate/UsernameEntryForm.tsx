"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class merging

interface GithubUsernameFormProps {
  onUsernameSubmit: (username: string) => void; // Callback for when the username is submitted
  initialUsername?: string | null; // Potentially preload the username if it exists in local storage.
}

const usernameSchema = z
  .string({
    required_error:
      "Github @username is required to reflect your commits into your heatmap",
    invalid_type_error: "Github @username must be a string",
  })
  .min(2, "Github usernames are often two or more characters long.");

const UsernameEntryForm: React.FC<GithubUsernameFormProps> = ({
  onUsernameSubmit,
  initialUsername,
}) => {
  const [username, setUsername] = useState<string>(initialUsername || ""); // Start with an empty string
  const [error, setError] = useState<string | undefined>(undefined); // State for Zod errors

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("githubUsername");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const result = usernameSchema.safeParse(username);

    if (!result.success) {
      setError(result.error.issues[0].message); // Set the Zod error message
      return;
    }

    setError(undefined); // Clear previous error messages

    if (typeof window !== "undefined") {
      localStorage.setItem("githubUsername", result.data);
    }

    onUsernameSubmit(result.data);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setError(undefined); // Clear errors when the user types
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <label htmlFor="github-username" className="block text-sm font-medium text-white/80">
        GitHub Username:
      </label>
      <input
        type="text"
        id="github-username"
        className={cn(
          "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white",
          "bg-gray-100 border-gray-300 rounded-md px-4 py-2 text-gray-900"
        )}
        placeholder="Enter your GitHub username"
        value={username}
        onChange={handleChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-800 dark:hover:bg-indigo-900"
      >
        Save Username
      </button>
    </form>
  );
};

export default UsernameEntryForm;