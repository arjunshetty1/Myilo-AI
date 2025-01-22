"use client";

import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/UI/shadcn-ui/button";
import { Input } from "@/components/UI/shadcn-ui/input";
import { Label } from "@/components/UI/shadcn-ui/label";
import { Textarea } from "@/components/UI/shadcn-ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { Card, CardContent } from "@/components/UI/shadcn-ui/card";
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { TooltipProvider } from "@/components/UI/shadcn-ui/tooltip";
import { Progress } from "@/components/UI/shadcn-ui/progress";
import { Badge } from "@/components/UI/shadcn-ui/badge";
import { Separator } from "@/components/UI/shadcn-ui/separator";
import { Reccomandations } from "@/services/Newsletter";
import { CreateContextWrapper } from "@/context/global/GlobalContext";
import { useRouter } from "next/navigation";

const LoadingOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-white bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 360],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
    />
  </motion.div>
);

const Create = () => {
  const [topic, setTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [newsletterLength, setNewsletterLength] = useState("");
  const [wordCount, setWordCount] = useState("");
  const [industry, setIndustry] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [brandGuidelines, setBrandGuidelines] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);
  const { setChoosenNewsLetterInputs } = useContext(CreateContextWrapper);

  const router = useRouter();

  useEffect(() => {
    calculateProgress();
  }, [
    selectedTopic,
    customTopic,
    newsletterLength,
    industry,
    audience,
    tone,
    keyPoints,
    brandGuidelines,
  ]);

  const calculateProgress = () => {
    const requiredFields = {
      industry: Boolean(industry),
      length: Boolean(newsletterLength),
      topics: Boolean(selectedTopic || customTopic),
    };

    const optionalFields = {
      audience: Boolean(audience),
      tone: Boolean(tone),
      keyPoints: Boolean(keyPoints.trim()),
      brandGuidelines: Boolean(brandGuidelines.trim()),
    };

    const totalRequired = Object.keys(requiredFields).length;
    const filledRequired = Object.values(requiredFields).filter(Boolean).length;
    const filledOptional = Object.values(optionalFields).filter(Boolean).length;

    const progress =
      ((filledRequired / totalRequired) * 0.7 +
        (filledOptional / Object.keys(optionalFields).length) * 0.3) *
      100;

    setFormProgress(Math.min(progress, 100));
  };

  const handleTopicClick = (clickedTopic) => {
    setSelectedTopic(selectedTopic === clickedTopic ? "" : clickedTopic);
  };

  const handleCustomTopicAdd = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setCustomTopic(e.target.value.trim());
      setSelectedTopic(""); // Clear selected recommendation when custom topic is added
      e.target.value = "";
    }
  };

  const removeCustomTopic = () => {
    setCustomTopic("");
  };

  const handleIndustryChange = async (value) => {
    setIndustry(value);
    if (value && newsletterLength) {
      await fetchRecommendations(value, newsletterLength);
    }
  };

  const handleLengthChange = async (length) => {
    setNewsletterLength(length);
    let wordCountValue = "";
    switch (length) {
      case "short":
        wordCountValue = "300-500";
        break;
      case "medium":
        wordCountValue = "500-800";
        break;
      case "long":
        wordCountValue = "800+";
        break;
    }
    setWordCount(wordCountValue);

    if (industry && length) {
      await fetchRecommendations(industry, wordCountValue);
    }
  };

  const fetchRecommendations = async (selectedIndustry, selectedLength) => {
    setIsLoadingRecommendations(true);
    try {
      const response = await Reccomandations(selectedIndustry, selectedLength);
      setRecommendations(response.suggestions || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setIsLoadingRecommendations(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!industry) errors.industry = "Industry is required";
    if (!newsletterLength)
      errors.newsletterLength = "Newsletter length is required";
    if (!selectedTopic && !customTopic)
      errors.topics = "At least one topic is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsGenerating(true);
      const params = {
        topic: selectedTopic || customTopic,
        length: wordCount,
        tone: tone || "professional",
        target: audience || "general",
        ...(keyPoints && { keyPoints }),
        ...(brandGuidelines && { brandGuidelines }),
      };
      setChoosenNewsLetterInputs(params);
      router.push("/select-template");
    }
  };

  const GenerateButton = ({ className }) => (
    <Button
      className={className}
      onClick={handleSubmit}
      disabled={isGenerating}
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 md:h-6 md:w-6 animate-spin" />
          loading...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4 md:h-6 md:w-6" />
          Select Templates
        </>
      )}
    </Button>
  );

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
          <h1 className="text-2xl font-medium text-gray-900 mb-4 pb-4 border-b border-gray-200">Generate a Newsletter</h1>
            {/* <p className="text-gray-600 text-sm md:text-base">
              Create professional newsletters in minutes with AI assistance
            </p> */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 md:p-8">
                  <Progress value={formProgress} className="mb-6 md:mb-8" />

                  <div className="space-y-6 md:space-y-8">
                    <div>
                      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">
                        Essential Details
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <Label
                            htmlFor="industry"
                            className="text-sm md:text-base font-medium"
                          >
                            Industry *
                          </Label>
                          <Select onValueChange={handleIndustryChange}>
                            <SelectTrigger id="industry" className="mt-2">
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tech">Technology</SelectItem>
                              <SelectItem value="finance">Finance</SelectItem>
                              <SelectItem value="healthcare">
                                Healthcare
                              </SelectItem>
                              <SelectItem value="retail">Retail</SelectItem>
                            </SelectContent>
                          </Select>
                          {formErrors.industry && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.industry}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label
                            htmlFor="length"
                            className="text-sm md:text-base font-medium"
                          >
                            Newsletter Length *
                          </Label>
                          <Select onValueChange={handleLengthChange}>
                            <SelectTrigger id="length" className="mt-2">
                              <SelectValue placeholder="Select length" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="short">
                                Short (300-500 words)
                              </SelectItem>
                              <SelectItem value="medium">
                                Medium (500-800 words)
                              </SelectItem>
                              <SelectItem value="long">
                                Long (800+ words)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          {wordCount && (
                            <p className="text-xs md:text-sm text-gray-500 mt-1">
                              Target length: {wordCount} words
                            </p>
                          )}
                          {formErrors.newsletterLength && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.newsletterLength}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-6">
                        <Label className="text-sm md:text-base font-medium mb-2 block">
                          Topics *
                        </Label>

                        <Input
                          placeholder="Add custom topic (press Enter)"
                          onKeyDown={handleCustomTopicAdd}
                          className="mt-2"
                          disabled={Boolean(selectedTopic)}
                        />

                        <div className="flex flex-wrap gap-2 mb-1 mt-5">
                          {isLoadingRecommendations ? (
                            <div className="flex items-center space-x-2 text-gray-500">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Loading recommendations...</span>
                            </div>
                          ) : (
                            recommendations.map((recTopic) => (
                              <motion.button
                                key={recTopic}
                                onClick={() => handleTopicClick(recTopic)}
                                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all flex items-center gap-2 ${
                                  selectedTopic === recTopic
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={Boolean(customTopic)}
                              >
                                {recTopic}
                                <svg
                                  className="w-4 h-4 text-yellow-400"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              </motion.button>
                            ))
                          )}
                        </div>

                        {customTopic && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            <Badge
                              variant="secondary"
                              className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm"
                            >
                              {customTopic}
                              <button
                                onClick={removeCustomTopic}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                              >
                                ×
                              </button>
                            </Badge>
                          </div>
                        )}
                        {formErrors.topics && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.topics}
                          </p>
                        )}
                      </div>
                    </div>

                    <Separator className="my-6 md:my-8" />

                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">
                      Customization (Optional)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div>
                        <Label
                          htmlFor="audience"
                          className="text-sm md:text-base font-medium"
                        >
                          Target Audience
                        </Label>
                        <Select onValueChange={setAudience}>
                          <SelectTrigger id="audience" className="mt-2">
                            <SelectValue placeholder="Select audience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professionals">
                              Professionals
                            </SelectItem>
                            <SelectItem value="beginners">Beginners</SelectItem>
                            <SelectItem value="experts">Experts</SelectItem>
                            <SelectItem value="students">Students</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label
                          htmlFor="tone"
                          className="text-sm md:text-base font-medium"
                        >
                          Tone of Voice
                        </Label>
                        <Select onValueChange={setTone}>
                          <SelectTrigger id="tone" className="mt-2">
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">
                              Professional
                            </SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="friendly">Friendly</SelectItem>
                            <SelectItem value="formal">Formal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="flex items-center text-primary hover:text-primary-dark transition-colors text-sm md:text-base"
                      >
                        {showAdvanced ? (
                          <ChevronUp className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                        ) : (
                          <ChevronDown className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                        )}
                        Advanced Options
                      </button>
                      <AnimatePresence>
                        {showAdvanced && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 md:space-y-6 mt-4 md:mt-6"
                          >
                            <div>
                              <Label
                                htmlFor="keyPoints"
                                className="text-sm md:text-base font-medium"
                              >
                                Key Points to Cover
                              </Label>
                              <Textarea
                                id="keyPoints"
                                placeholder="Enter the main points you want to address in your newsletter"
                                className="mt-2"
                                rows={4}
                                value={keyPoints}
                                onChange={(e) => setKeyPoints(e.target.value)}
                              />
                            </div>
                            <div>
                              <Label
                                htmlFor="brandGuidelines"
                                className="text-sm md:text-base font-medium"
                              >
                                Brand Guidelines
                              </Label>
                              <Textarea
                                id="brandGuidelines"
                                placeholder="Enter any specific brand guidelines or requirements"
                                className="mt-2"
                                rows={4}
                                value={brandGuidelines}
                                onChange={(e) =>
                                  setBrandGuidelines(e.target.value)
                                }
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="bg-white shadow-sm lg:sticky lg:top-8">
                <CardContent className="p-4 md:p-8">
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">
                    Generation Settings
                  </h2>

                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2 text-sm md:text-base">
                        Selected Topic
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedTopic && (
                          <Badge
                            variant="outline"
                            className="px-2 py-1 text-xs md:text-sm"
                          >
                            {selectedTopic}
                          </Badge>
                        )}
                        {customTopic && (
                          <Badge
                            variant="outline"
                            className="px-2 py-1 text-xs md:text-sm"
                          >
                            {customTopic}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {wordCount && (
                      <div>
                        <h3 className="font-medium text-gray-700 mb-2 text-sm md:text-base">
                          Expected Length
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {wordCount} words
                        </p>
                      </div>
                    )}

                    <Separator className="my-4 md:my-6" />

                    <div className="hidden lg:block">
                      <GenerateButton className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 md:py-6 text-sm md:text-lg shadow-lg" />
                    </div>

                    <div className="mt-4 md:mt-6 bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-100">
                      <h3 className="font-medium text-blue-800 mb-2 text-sm md:text-base">
                        Tips for Better Results
                      </h3>
                      <ul className="space-y-2 text-xs md:text-sm text-blue-700">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          Be specific with your newsletter topic
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          Select a relevant topic for comprehensive coverage
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          Include key points in advanced options for better
                          focus
                        </li>
                      </ul>
                    </div>

                    {Object.keys(formErrors).length > 0 && (
                      <div className="mt-4 p-3 md:p-4 bg-red-50 rounded-lg border border-red-100">
                        <h3 className="text-red-800 font-medium flex items-center text-sm md:text-base">
                          <AlertCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                          Please fix the following:
                        </h3>
                        <ul className="list-disc list-inside mt-2">
                          {Object.entries(formErrors).map(([key, value]) => (
                            <li
                              key={key}
                              className="text-red-600 text-xs md:text-sm"
                            >
                              {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8 mb-20 lg:mb-8 text-center text-gray-600">
            <p className="text-xs md:text-sm">
              Disclaimer: The content generated by this tool is created using
              artificial intelligence. While we strive for accuracy and quality,
              please review and edit the output as needed to ensure it meets
              your specific requirements and standards.
            </p>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg lg:hidden">
          <GenerateButton className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-base shadow-lg" />
        </div>

        <AnimatePresence>{isGenerating && <LoadingOverlay />}</AnimatePresence>
      </div>
    </TooltipProvider>
  );
};

export default Create;
