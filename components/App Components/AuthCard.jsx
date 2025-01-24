"use client";
import { Button } from "@/components/UI/shadcn-ui/button";
import { useEffect } from "react";
import { supabase } from "@/utils/supabaseConfig";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const AuthCard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          localStorage.setItem("tk", session.access_token);
          router.push("/Application");
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, [router]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/Application`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen md:w-1/2 w-full bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center p-4"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <div className="flex flex-col items-center gap-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Image
              className="w-20 h-20 "
              src="/logo.jpg"
              width={80}
              height={80}
              alt="Myilo logo"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl text-gray-600 mb-2">
              Get started with Myilo AI
            </h2>
            <p className="text-gray-600">
              Dive into the world of simple newsletter creation with AI.
            </p>
          </motion.div>

          <motion.div
            className="w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => !isLoading && handleGoogleLogin()}
              className="w-full py-3 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 flex items-center justify-center gap-2 text-base font-medium rounded-lg shadow-sm "
              disabled={isLoading}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-6 h-6 border-t-2 border-gray-500 border-solid rounded-full animate-spin"
                  />
                ) : (
                  <motion.div
                    key="google"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <FcGoogle className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
              {isLoading ? "Logging in..." : "Login with Google"}
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-gray-500 text-sm text-center max-w-xs"
          >
            Your details will be synced automatically upon login.
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthCard;
