"use client";

import { useState, useEffect } from "react";

const CountdownTimer = ({ days, hours, minutes }) => {
  return (
    <div className="flex justify-center items-center space-x-4 md:space-x-6">
      <div className="flex flex-col items-center group">
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 shadow-xl transition-all duration-300 hover:scale-105">
          <span className="text-4xl md:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            {days.toString().padStart(2, "0")}
          </span>
          <div className="absolute inset-0 border-2 border-gray-800 rounded-xl opacity-20 group-hover:opacity-40 transition-opacity" />
        </div>
        <span className="text-xs text-gray-500 mt-3 tracking-widest font-medium">
          DAYS
        </span>
      </div>

      <div className="text-3xl text-gray-400 mb-6">:</div>

      <div className="flex flex-col items-center group">
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 shadow-xl transition-all duration-300 hover:scale-105">
          <span className="text-4xl md:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            {hours.toString().padStart(2, "0")}
          </span>
          <div className="absolute inset-0 border-2 border-gray-800 rounded-xl opacity-20 group-hover:opacity-40 transition-opacity" />
        </div>
        <span className="text-xs text-gray-500 mt-3 tracking-widest font-medium">
          HOURS
        </span>
      </div>

      <div className="text-3xl text-gray-400 mb-6">:</div>

      <div className="flex flex-col items-center group">
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 shadow-xl transition-all duration-300 hover:scale-105">
          <span className="text-4xl md:text-5xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            {minutes.toString().padStart(2, "0")}
          </span>
          <div className="absolute inset-0 border-2 border-gray-800 rounded-xl opacity-20 group-hover:opacity-40 transition-opacity" />
        </div>
        <span className="text-xs text-gray-500 mt-3 tracking-widest font-medium">
          MINUTES
        </span>
      </div>
    </div>
  );
};

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-8 right-8 p-4 rounded-xl shadow-2xl flex items-center space-x-3
      ${type === "success" ? "bg-green-500" : "bg-red-500"} 
      animate-fade-in-up`}
    >
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {type === "success" ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        )}
      </svg>
      <span className="text-sm font-medium text-white">{message}</span>
    </div>
  );
};

const EarlyAccessPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 5, hours: 4, minutes: 23 });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes } = prev;
        if (minutes > 0) return { ...prev, minutes: minutes - 1 };
        if (hours > 0) return { days, hours: hours - 1, minutes: 59 };
        if (days > 0) return { days: days - 1, hours: 23, minutes: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);

    try {
      await new Promise((resolve, reject) =>
        setTimeout(() => (Math.random() > 0.5 ? resolve() : reject()), 1500)
      );

      setToast({
        message: "🎉 You're on the list! Check your email soon.",
        type: "success",
      });
      setEmail("");
    } catch {
      setToast({
        message: "⚠️ Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-12">
        <div className="text-center space-y-6">
          <h1
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent 
            bg-gradient-to-r from-purple-400 to-blue-400 leading-tight"
          >
            Join the AI Newsletter Revolution
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto">
            Secure your spot in the next generation of content creation powered
            by AI.
          </p>
        </div>

        <CountdownTimer {...timeLeft} />

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
          <div className="relative group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
              className="w-full px-6 py-4 bg-gray-800 rounded-xl border-2 border-gray-700 
                focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none 
                transition-all duration-300 peer"
            />
            <label
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500
              peer-placeholder-shown:text-base peer-placeholder-shown:translate-y-0
              peer-focus:-translate-y-1/2 peer-focus:text-sm transition-all duration-300
              pointer-events-none bg-gray-800 px-2"
            >
              Email address
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-8 rounded-xl font-semibold transition-all duration-300 
              ${
                isLoading
                  ? "bg-purple-500/50 cursor-not-allowed"
                  : "bg-purple-500 hover:bg-purple-600 hover:shadow-2xl hover:shadow-purple-500/20"
              }
              flex items-center justify-center space-x-2`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Securing Your Spot...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span>Claim Early Access</span>
              </>
            )}
          </button>
        </form>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default EarlyAccessPage;
