"use client";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      {/* CM Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="relative w-12 h-12 flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="cmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <motion.path
            d="M20 80 Q 50 20 80 80"
            fill="none"
            stroke="url(#cmGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M35 35 Q 50 65 65 35"
            fill="none"
            stroke="url(#cmGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.8,
          ease: "easeOut",
        }}
      >
        <span className="relative text-2xl font-normal text-gray-800 dark:text-gray-200">
          <span className="font-extralight">Clip</span>
          <span className="font-medium">Mailo</span>
          <span
            className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500 dark:bg-teal-400 scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
            aria-hidden="true"
          ></span>
        </span>
      </motion.div>
    </div>
  );
};

export default Logo;
