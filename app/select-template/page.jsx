"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/UI/shadcn-ui/card";
import { Badge } from "@/components/UI/shadcn-ui/badge";
import { Button } from "@/components/UI/shadcn-ui/button";
import { FileText, X, LayoutTemplate, Sparkles } from "lucide-react";
import { CreateNewsletter } from "@/services/Newsletter";
import { CreateContextWrapper } from "@/context/global/GlobalContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/UI/shadcn-ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Loader } from "@/components/App Components/Loader";

const TEMPLATES = [
  {
    id: "0",
    name: "Timeless Editorial",
    category: "General",
    image: "/templates/timeless-editorial.png"  // Replace with actual image path
  },
  {
    id: "2",
    name: "Executive Digest",
    category: "General",
    image: "/templates/executive-digest.png"
  },
  {
    id: "3",
    name: "Neutral Foundations",
    category: "Minimal & Clean",
    image: "/templates/neutral-foundations.png"
  },
  {
    id: "4",
    name: "Essential Blueprint",
    category: "Minimal & Clean",
    image: "/templates/essential-blueprint.png"
  },
  {
    id: "5",
    name: "Pure Interface",
    category: "Minimal & Clean",
    image: "/templates/pure-interface.png"
  },
  {
    id: "6",
    name: "Narrative Canvas",
    category: "Story-Driven",
    image: "/templates/narrative-canvas.png"
  },
  {
    id: "7",
    name: "Chronicle Framework",
    category: "Story-Driven",
    image: "/templates/chronicle-framework.png"
  },
  {
    id: "8",
    name: "Data Deep Dive",
    category: "Deep Dive",
    image: "/templates/data-deep-dive.png"
  },
  {
    id: "9",
    name: "Insight Matrix",
    category: "Deep Dive",
    image: "/templates/insight-matrix.png"
  },
  {
    id: "10",
    name: "Rapid Pulse",
    category: "Quick Reads",
    image: "/templates/rapid-pulse.png"
  },
  {
    id: "11",
    name: "Bite-Sized Update",
    category: "Quick Reads",
    image: "/templates/bite-sized-update.png"
  },
];

const CATEGORIES = [
  "All",
  "General",
  "Minimal & Clean",
  "Quick Reads",
  "Deep Dive",
  "Story-Driven",
];

const TemplateCard = ({ template, onClick, isSelected }) => (
  <motion.div 
    whileHover={{ y: -8 }} 
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card
      className={`group relative overflow-hidden cursor-pointer rounded-2xl border-2 transition-all ${
        isSelected 
          ? "border-blue-500 shadow-xl dark:border-blue-400" 
          : "border-transparent hover:border-gray-200 dark:hover:border-gray-700"
      }`}
      onClick={() => onClick(template)}
    >
      <CardContent className="p-6 flex flex-col items-center gap-4 h-full">
        <div className="w-full aspect-video mb-2 overflow-hidden rounded-lg">
          <img
            src="/api/placeholder/400/300"  // Replace this with template.image when ready
            alt={template.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
            {template.name}
          </h3>
          <Badge 
            variant="outline" 
            className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-200"
          >
            {template.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function NewsletterTemplates() {
  const context = useContext(CreateContextWrapper);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [generating, setGenerating] = useState(false);
  const { toast } = useToast();

  const filteredTemplates = TEMPLATES.filter(
    (template) =>
      activeCategory === "All" || template.category === activeCategory
  );

  const selectTemplate = (template) => {
    setSelectedTemplate(template);
  };

  const GenerateNewsletter = async () => {
    if (!selectedTemplate) return;

    setIsLoading(true);
    setGenerating(true);

    const params = {
      templateId: selectedTemplate.id,
      topic: context.choosenNewsLetterInputs.topic,
      length: context.choosenNewsLetterInputs.length,
      target: context.choosenNewsLetterInputs.target,
      tone: context.choosenNewsLetterInputs.tone,
      brandGuidelines: context.choosenNewsLetterInputs.brandGuidelines,
      keyPoints: context.choosenNewsLetterInputs.keyPoints,
    };

    if (!context.choosenNewsLetterInputs) {
      router.push("/Application");
      toast({
        variant: "destructive",
        title: "Session Expired",
        description: "Your configuration has expired. Please start again.",
      });
    } else {
      try {
        const response = await CreateNewsletter(params);
        if (!response) throw new Error("Failed to create newsletter");
        router.push(`Edit/${response._id}`);
      } catch (error) {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: "Couldn't create newsletter. Please try again.",
        });
        router.push("/Application");
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-900 dark:to-gray-800/20 min-h-screen">
      <TooltipProvider>
        <div className="mx-auto px-4 md:px-24 py-12">
          <header className="mb-12 text-center space-y-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-blue-600 bg-blue-50 px-4 py-1 rounded-full dark:bg-blue-900/30 dark:text-blue-400"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">New templates available</span>
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Craft Your Narrative
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Select a foundation that aligns with your communication style and audience expectations
            </p>
          </header>

          <nav className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-5 ${
                    activeCategory === category 
                      ? "shadow-md bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:opacity-90"
                      : "bg-white dark:bg-gray-800"
                  }`}
                >
                  {category.replace(/([A-Z])/g, " $1").trim()}
                </Button>
              ))}
            </div>
          </nav>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
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
            {selectedTemplate && !generating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              >
                <Card className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl border-0 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#e6e6e6] to-[white] p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-black">
                        Confirm Template
                      </h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-white/80 hover:text-white hover:bg-white/10 rounded-full"
                        onClick={() => setSelectedTemplate(null)}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <p className="text-gray-600 dark:text-gray-300">
                        Selected template:
                      </p>
                      <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                        <LayoutTemplate className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {selectedTemplate.name}
                        </span>
                        <Badge variant="outline" className="ml-auto">
                          {selectedTemplate.category}
                        </Badge>
                      </div>
                      <div className="mt-4">
                        <img
                          src="/api/placeholder/400/300"  // Replace with selectedTemplate.image when ready
                          alt={selectedTemplate.name}
                          className="w-full rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedTemplate(null)}
                        className="rounded-full"
                      >
                        Cancel
                      </Button>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={GenerateNewsletter}
                            className="rounded-full bg-gradient-to-r from-blue-500 to-blue-400 hover:opacity-90"
                          >
                            <FileText className="mr-2 w-4 h-4" />
                            Generate Now
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Start newsletter generation</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>
        </div>
      </TooltipProvider>
    </div>
  );
}