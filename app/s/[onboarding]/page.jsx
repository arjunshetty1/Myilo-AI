"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Ripple from "@/components/UI/magic-ui/ripple";
import { Alert, AlertDescription } from "@/components/UI/shadcn-ui/alert";
import { Button } from "@/components/UI/shadcn-ui/button";
import { Input } from "@/components/UI/shadcn-ui/input";
import { AlertCircle, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { OnboardSubscriber } from "@/services/Subscribers";
// import { usePathname } from 'next/navigation'

const Page = () => {
  const params = useParams();
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  // const pathname = usePathname()

  const userId = params.onboarding;
  console.log(userId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      setStatus("error");
      setErrorMessage("Please agree to the terms to continue.");
      return;
    }

    setStatus("loading");
    try {
      const result = await OnboardSubscriber({
        email,
        userId,
      });

      if (result.acknowledged && result.modifiedCount > 0) {
        setStatus("success");
        setEmail("");
        setIsChecked(false);
      } else {
        throw new Error("Subscription was not successful. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  const StatusBanner = ({ type }) => {
    const config = {
      success: {
        title: "You're In! 🎉",
        description:
          "Welcome to the community! Check your inbox for a special welcome message.",
        icon: <CheckCircle className="h-5 w-5" />,
        className: "bg-green-50 text-green-700 border-green-200",
      },
      error: {
        title: "Oops!",
        description: errorMessage,
        icon: <AlertCircle className="h-5 w-5" />,
        className: "bg-red-50 text-red-700 border-red-200",
      },
    };

    const { title, description, icon, className } = config[type];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Alert className={`mt-6 ${className}`}>
          <div className="flex items-center gap-3">
            {icon}
            <div>
              <h4 className="font-semibold">{title}</h4>
              <AlertDescription className="mt-1">
                {description}
              </AlertDescription>
            </div>
          </div>
        </Alert>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8 md:px-6 lg:px-8 lg:py-12">
        {/* Main content container */}
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl">
          {/* Banner with Ripple */}
          <div className="relative flex h-48 sm:h-56 md:h-64 items-center justify-center overflow-hidden px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="z-10 text-center"
            >
              <h1 className="mb-2 sm:mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                {userId.toString().charAt(0).toUpperCase() +
                  userId.toString().slice(1)}
                's Newsletter
              </h1>
              <p className="text-base sm:text-lg text-gray-300 px-4 sm:px-0">
                Join the community of forward-readers
              </p>
            </motion.div>
            <Ripple />
          </div>

          {/* Subscription Form Section */}
          <div className="relative bg-white px-4 py-8 sm:px-6 sm:py-10 md:px-8 lg:px-12 lg:py-12">
            <div className="mx-auto max-w-xl">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div className="space-y-4 sm:space-y-6">
                  <div className="relative">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="h-12 sm:h-14 border-gray-200 bg-gray-50  md:text-base text-sm placeholder:text-gray-400 focus:border-primary focus:ring-primary"
                      required
                    />
                    <Button
                      type="submit"
                      className="absolute right-1 top-1 h-10 sm:h-12 px-4 sm:px-6 transition-all hover:scale-105"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="hidden sm:inline">Subscribe</span>
                          <span className="sm:hidden">Join</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </div>

                  <motion.div
                    className="flex items-start gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <input
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      id="terms"
                      type="checkbox"
                      className="mt-1.5 h-4 w-4 rounded border-gray-300"
                    />
                    <label
                      htmlFor="terms"
                      className="text-xs sm:text-sm text-gray-600"
                    >
                      I agree to receive curated content and updates. You can
                      unsubscribe at any time. Your data will be handled with
                      care according to our privacy policy.
                    </label>
                  </motion.div>
                </div>

                {(status === "success" || status === "error") && (
                  <StatusBanner type={status} />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
