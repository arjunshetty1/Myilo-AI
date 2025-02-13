"use client";
import { Button } from "@/components/UI/shadcn-ui/button";
import { useEffect } from "react";
import { supabase } from "@/utils/supabaseConfig";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Logo from "./Logo";

const AuthCard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Setting up auth listener");
    
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log("Current session:", session);
      if (session) {
        console.log("Redirecting to /Application");
        router.push("/Application");
      }
    };
    
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event, "Session:", session);
        if (event === 'SIGNED_IN' && session) {
          console.log("Redirecting after sign in");
          router.push("/Application");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen md:w-1/2 w-full bg-[white] dark:from-gray-800 dark:to-gray-900 flex justify-center items-center p-6"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm p-10 w-full max-w-md border dark:border-gray-700"
      >
        <div className="flex flex-col items-center gap-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Logo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Get started with ClipMailo AI
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
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
              className="w-full py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 text-base font-medium rounded-xl"
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
            className="text-gray-500 dark:text-gray-400 text-sm text-center max-w-xs"
          >
            Your details will be synced automatically upon login.
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AuthCard;