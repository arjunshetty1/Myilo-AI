"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export const Loader = () => {
  const tips = [
    "AI is crafting your newsletter...",
    "Pro tip: Newsletters convert 50% better than social media!",
    "Did you know? Consistent newsletters can increase your revenue by 30%.",
    "Building your audience fortress: Every newsletter strengthens reader relationships.",
    "AI is optimizing for engagement + deliverability...",
    "Newsletters = Owned audience = Brand immunity to algorithm changes!",
    "Monetization magic: Top creators earn $50+/month per subscriber.",
    "Personalized content drives 6x higher engagement.",
    "AI is analyzing 100+ top newsletters for best practices...",
    "Secret weapon: Newsletters get 3x more shares than blog posts.",
    "Pro insight: 80% of professionals cite newsletters as primary info source.",
    "Community building: Regular updates increase superfan conversion by 2x.",
  ]

  const [currentTip, setCurrentTip] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-900/90 backdrop-blur-lg flex items-center justify-center p-4 z-50"
    >
      <div className="w-full max-w-md">
        {/* AI Loader */}
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            className="rounded-full h-24 w-24 border-4 border-blue-400 border-t-transparent relative"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute inset-1 rounded-full bg-blue-500/20"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="text-blue-400 text-3xl"
              >
                ✨
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Crafting Newsletter Magic
        </motion.h3>

        {/* Dynamic Tips */}
        <div className="h-24 flex items-center justify-center overflow-hidden mb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTip}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-center px-4"
            >
              <p className="text-white text-lg font-medium">
                {tips[currentTip]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Persistent Preview Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-6"
        >
          <p className="text-sm text-blue-200">
            <span className="mr-2">📌</span>
            Note: Preview layout may vary slightly in email clients - 
            we optimize for both readability and deliverability!
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5, ease: "linear", repeat: Infinity }}
            className="absolute h-full bg-gradient-to-r from-blue-400 to-purple-500"
          >
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-white/20 backdrop-blur-sm"
            />
          </motion.div>
        </div>

        {/* Creator Benefits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-gray-300 mb-2">
            Every newsletter helps you:
          </p>
          <div className="flex justify-center flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">
              Build Authority
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm">
              Boost Engagement
            </span>
            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-sm">
              Drive Sales
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}