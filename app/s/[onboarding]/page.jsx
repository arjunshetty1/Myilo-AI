"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Ripple from "@/components/UI/magic-ui/ripple";
import { Alert, AlertDescription } from "@/components/UI/shadcn-ui/alert";
import { Button } from "@/components/UI/shadcn-ui/button";
import { Input } from "@/components/UI/shadcn-ui/input";
import { AlertCircle, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { GetCreatorProfile, OnboardSubscriber } from "@/services/Subscribers";

const Page = () => {
  const params = useParams();
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUserName] = useState("");

  const userId = params.onboarding;

  useEffect(() => {
    getCreatorData();
  }, []);

  const getCreatorData = async () => {
    try {
      const res = await GetCreatorProfile(userId);
      setUserName(res.username);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isChecked) {
      setStatus("error");
      setErrorMessage("Please agree to the terms to continue.");
      return;
    }
  
    setStatus("loading");
  
    let retries = 3;
    while (retries > 0) {
      try {
        const result = await OnboardSubscriber({ email, userId });
  
        if (result.acknowledged && result.modifiedCount > 0) {
          setStatus("success");
          setEmail("");
          setIsChecked(false);
          return;
        } else {
          throw new Error("Subscription was not successful. Please try again.");
        }
      } catch (error) {
        retries--;
        if (retries === 0) {
          setStatus("error");
          setErrorMessage(error.message || "An error occurred. Please try again.");
        }
      }
    }
  };

  const handleCheckboxClick = (e) => {
    // Prevent double-firing of click events
    e.stopPropagation();
    setIsChecked(!isChecked);
  };

  const StatusBanner = ({ type }) => {
    const config = {
      success: {
        title: "Welcome Aboard! 🚀",
        description: "You've successfully joined the newsletter. You will start receiving newsletters soon as I publish.",
        icon: <CheckCircle className="h-5 w-5" />,
        className: "bg-emerald-50 text-emerald-700 border-emerald-200",
      },
      error: {
        title: "Something Went Wrong",
        description: errorMessage,
        icon: <AlertCircle className="h-5 w-5" />,
        className: "bg-rose-50 text-rose-700 border-rose-200",
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
              <AlertDescription className="mt-1">{description}</AlertDescription>
            </div>
          </div>
        </Alert>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-indigo-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-white shadow-md sm:rounded-3xl"
        >
          <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 pb-16 pt-12 sm:pb-32 sm:pt-24">
            <div className="absolute inset-0">
              <Ripple />
            </div>
            <div className="relative px-4 text-center sm:px-6">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-indigo-100"
              />
              <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                Join {userName}'s Inner Circle
              </h1>
              <p className="mt-3 text-sm text-indigo-100 sm:text-lg">
                Get exclusive content delivered straight to your inbox
              </p>
            </div>
          </div>

          <div className="px-4 pb-6 pt-4 sm:px-8 sm:pb-12 sm:pt-8">
            <div className="-mt-12 rounded-xl bg-white p-4 shadow-lg ring-1 ring-slate-900/5 sm:-mt-20 sm:rounded-2xl sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="h-10 text-sm border-slate-200 bg-slate-50 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-indigo-500 sm:h-12 sm:text-base"
                      required
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="absolute right-1 top-1 h-8 px-3 text-sm font-medium bg-indigo-500 hover:bg-indigo-700 sm:h-10 sm:px-4 sm:text-base"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <div className="flex items-center gap-1">
                          Join
                          <ArrowRight className="h-3 w-3" />
                        </div>
                      )}
                    </Button>
                  </div>

                  <motion.div
                    className="flex items-start gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-start w-full">
                      <div className="relative flex items-start">
                        <div className="flex h-6 items-center">
                          <input
                            checked={isChecked}
                            onChange={() => setIsChecked(!isChecked)}
                            onClick={handleCheckboxClick}
                            id="terms"
                            type="checkbox"
                            className="h-5 w-5 cursor-pointer rounded border-slate-300 text-indigo-500 focus:ring-indigo-500"
                            aria-labelledby="terms-label"
                          />
                        </div>
                        <label
                          htmlFor="terms"
                          id="terms-label"
                          className="ml-2 block cursor-pointer text-xs text-slate-600 sm:text-sm"
                        >
                          I agree to receive email updates and acknowledge ClipMailo's{" "}
                          <a
                            href="https://clipmailo.com/privacy-policy"
                            className="text-indigo-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Privacy Policy
                          </a>
                          . Unsubscribe anytime.
                        </label>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {(status === "success" || status === "error") && (
                  <StatusBanner type={status} />
                )}
              </form>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 text-center sm:mt-8">
          <div className="flex flex-col items-center justify-center gap-2 text-xs text-slate-600 sm:flex-row sm:text-sm">
            <div className="flex items-center gap-1.5">
              <span>Generate & send beautiful newsletters within 1 minute</span>
            </div>
            <a
              href="https://clipmailo.com"
              className="slow-color-change font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Try ClipMailo →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;