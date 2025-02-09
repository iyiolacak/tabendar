"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const GithubUsernameEntry: React.FC = () => {
  const [username, setUsername] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const storedUsername = localStorage.getItem("githubUsername")
    if (storedUsername) {
      setIsSubmitted(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("githubUsername", username)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return null // Don't render anything if username is already set
  }

  return (
    <motion.div
      initial={{ backgroundColor: "rgba(0, 0, 0, 1)" }}
      animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="w-full max-w-md"
      >
        <motion.input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your GitHub username"
          className="w-full px-4 py-3 text-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
          whileFocus={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <motion.button
          type="submit"
          className="mt-4 w-full px-4 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full font-semibold transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Set Username
        </motion.button>
      </motion.form>
    </motion.div>
  )
}

export default GithubUsernameEntry

