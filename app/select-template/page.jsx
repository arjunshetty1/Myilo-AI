"use client";
import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/UI/shadcn-ui/card";
import { Badge } from "@/components/UI/shadcn-ui/badge";
import { Button } from "@/components/UI/shadcn-ui/button";
import { FileText, X } from "lucide-react";
import { CreateNewsletter } from "@/services/Newsletter";
import { CreateContextWrapper } from "@/context/global/GlobalContext";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/shadcn-ui/tooltip";

import { useToast } from "@/hooks/use-toast";

const templates = [
  { id: "0", name: "General 1", category: "General", image: "/t1.png" },
  { id: "1", name: "General 2", category: "General", image: "/t2.png" },
  { id: "2", name: "General 3", category: "General", image: "/t3.png" },
  {
    id: "3",
    name: "Minimal 1",
    category: "Minimal & Clean",
    image: "/MinimalOne.png",
  },
  // {
  //   id: "4",
  //   name: "Minimal 2",
  //   category: "Minimal & Clean",
  //   image: "/MinimalTwo.png",
  // },
  {
    id: "5",
    name: "Minimal 3",
    category: "Minimal & Clean",
    image: "/MinimalThree.png",
  },
  {
    id: "6",
    name: "Minimal 4",
    category: "Minimal & Clean",
    image: "/MinimalFour.png",
  },

  {
    id: "7",
    name: "Story Driven 1",
    category: "Story-Driven",
    image: "/MinimalFour.png",
  },
  {
    id: "8",
    name: "Story Driven 2",
    category: "Story-Driven",
    image: "/MinimalOne.png",
  },
  {
    id: "9",
    name: "Deep Dive 1",
    category: "Deep Dive",
    image: "/MinimalThree.png",
  },
  {
    id: "10",
    name: "Deep Dive 2",
    category: "Deep Dive",
    image: "/MinimalTwo.png",
  },
  {
    id: "11",
    name: "Quick Reads 1",
    category: "Quick Reads",
    image: "/MinimalTwo.png",
  },
  {
    id: "12",
    name: "Quick Reads 2",
    category: "Quick Reads",
    image: "/MinimalOne.png",
  },
];

const categories = [
  "all",
  "General",
  "Minimal & Clean",
  "Quick Reads",
  "Deep Dive",
  "Story-Driven",
];

const LoadingOverlay = ({ tips }) => {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0  bg-opacity-80 dark:bg-gray-900 dark:bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl">
        <CardContent className="p-6">
          <div className="flex justify-center mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
          </div>
          <h3 className="text-xl font-semibold text-center mb-4">
            Generating Your Newsletter
          </h3>
          <motion.p
            key={currentTip}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center text-gray-600 dark:text-gray-300"
          >
            {tips[currentTip]}
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const TemplateCard = ({ template, onClick, isSelected }) => (
  <motion.div whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
    <Card
      className={`overflow-hidden cursor-pointer rounded-xl shadow-sm transition-all ${
        isSelected ? "ring-2 ring-red-500" : ""
      }`}
      onClick={() => onClick(template)}
    >
      <CardContent className="p-0 relative">
        <Image
          src={template.image}
          alt={template.name}
          width={300}
          height={200}
          className="w-full h-72 object-contain"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#343434] to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-between p-4">
          <h2 className="text-lg font-semibold text-white">{template.name}</h2>
          <Badge className="bg-red-500 text-white">{template.category}</Badge>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function NewsletterTemplates() {
  const context = useContext(CreateContextWrapper);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const filteredTemplates = templates.filter(
    (template) =>
      activeCategory === "all" || template.category === activeCategory
  );

  const selectTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const tips = [
    "Newsletters help build a direct connection with your YouTube audience.",
    "Share behind-the-scenes content to keep subscribers engaged between videos.",
    "Use newsletters to announce upcoming videos and collaborations.",
    "Offer exclusive content to newsletter subscribers to boost sign-ups.",
    "Consistency in your newsletter schedule can lead to higher engagement rates.",
    "Use your newsletter to gather feedback and ideas for future videos.",
    "Cross-promote your newsletter in your YouTube video descriptions and end screens.",
    "Segment your newsletter audience to provide more personalized content.",
    "Use eye-catching subject lines to improve open rates.",
    "Include clear calls-to-action in your newsletters to drive views and engagement.",
  ];

  const GenerateNewsletter = async () => {
    if (!selectedTemplate) return;

    setIsLoading(true);

    const params = {
      templateId: selectedTemplate.id,
      topic: context.choosenNewsLetterInputs.topic,
      length: context.choosenNewsLetterInputs.length,
      target: context.choosenNewsLetterInputs.target,
      tone: context.choosenNewsLetterInputs.tone,
      brandGuidelines: context.choosenNewsLetterInputs.brandGuidelines,
      keyPoints: context.choosenNewsLetterInputs.keyPoints,
    };
    console.log(context.choosenNewsLetterInputs);

    if (context.choosenNewsLetterInputs == null) {
      router.push("/Application");

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "The selected video has been expired! Please select a again.",
      });
    } else {
      try {
        const response = await CreateNewsletter(params);
        if (!response) throw new Error("Failed to create newsletter");
        const objectId = response._id;
        router.push(`Edit/${objectId}`);
      } catch (error) {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Failed to generate newsletter. Please try again",
        });
        router.push("/Application");
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-[100vh]">
      <TooltipProvider>
        <div className="mx-auto px-4 md:px-24 py-12 ">
          <h1 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
            Choose Your Newsletter Template
          </h1>
          <h2 className="text-base text-gray-600 dark:text-gray-400 mb-8">
            Select a template that best fits your content and style
          </h2>

          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className="capitalize rounded-3xl"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    onClick={selectTemplate}
                    isSelected={selectedTemplate?.id === template.id}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {selectedTemplate && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              >
                <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold">
                        Generate Newsletter
                      </h3>
                      <Button
                        variant="ghost"
                        onClick={() => setSelectedTemplate(null)}
                      >
                        <X className="h-6 w-6" />
                      </Button>
                    </div>
                    <p className="mb-6 text-gray-600 dark:text-gray-300">
                      You've selected the "{selectedTemplate.name}" template.
                    </p>
                    <div className="flex justify-end space-x-4">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedTemplate(null)}
                      >
                        Cancel
                      </Button>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={GenerateNewsletter}
                            className="bg-red-500 hover:bg-red-600 text-white"
                          >
                            <FileText className="mr-2 h-4 w-4" /> Generate
                            Newsletter
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to generate your newsletter</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isLoading && <LoadingOverlay tips={tips} />}
          </AnimatePresence>
        </div>
      </TooltipProvider>
    </div>
  );
}
