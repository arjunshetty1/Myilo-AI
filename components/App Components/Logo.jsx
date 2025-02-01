import React from "react";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <div>
      {/* Inline CSS for animated gradient */}
      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 300% 300%;
            animation: gradientAnimation 6s ease-in-out infinite;
          }
        `}
      </style>

      <div className="flex items-center space-x-4">
        {/* Animated Monogram Icon */}
        <motion.div
          initial={{ scale: 0.95, rotate: 0 }}
          animate={{ scale: [1, 1.05, 1], rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 rounded-full shadow-sm transition-transform duration-300 hover:scale-105 animate-gradient"
        >
          <span className="text-white font-bold text-xl tracking-tight">
            CM
          </span>
        </motion.div>

        {/* Logo Text */}
        <div className="flex flex-col">
          <span className="text-xl font-bold text-gray-900 dark:text-white tracking-wide">
            ClipMailo
          </span>
          <span className="text-sm font-light text-gray-500 dark:text-gray-400">
            AI Newsletter Builder
          </span>
        </div>
      </div>
    </div>
  );
};

export default Logo;