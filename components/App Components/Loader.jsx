"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export const Loader = () => {
  const tips = [
    "AI is crafting your newsletter...",
    "Pro tip: Use catchy subject lines to boost open rates!",
    "Did you know? Newsletters can increase audience retention by 30%.",
    "Personalized content drives 6x higher engagement.",
    "AI is optimizing your content for maximum impact.",
    "Stay consistent—regular newsletters build trust.",
    "Exclusive content keeps subscribers coming back for more.",
    "Segment your audience for better targeting.",
    "Use visuals to make your newsletters stand out.",
    "AI is analyzing trends to make your newsletter pop!",
  ]
  const [currentTip, setCurrentTip] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 5000) // Change tip every 5 seconds

    return () => clearInterval(interval)
  }, []) // Removed unnecessary dependency: tips.length

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div className="w-full max-w-md">
        {/* AI Loader Icon */}
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "linear" }}
            className="rounded-full h-20 w-20 border-4 border-blue-500 border-t-transparent relative"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
              className="absolute inset-1 rounded-full bg-blue-500/20"
            />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-3xl font-bold text-center mb-8 text-white">AI is Generating Your Newsletter</h3>

        {/* Dynamic Tips */}
        <div className="h-24 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTip}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-center text-white text-lg font-medium px-4"
            >
              {tips[currentTip]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
          className="h-1 bg-blue-500 mt-8 rounded-full"
        />
      </div>
    </motion.div>
  )
}

