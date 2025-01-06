"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/UI/shadcn-ui/button"
import { Input } from "@/components/UI/shadcn-ui/input"
import { Label } from "@/components/UI/shadcn-ui/label"
import { Textarea } from "@/components/UI/shadcn-ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select"
import { Card, CardContent } from "@/components/UI/shadcn-ui/card"
import { Sparkles, ChevronDown, ChevronUp, AlertCircle, Loader2 } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/UI/shadcn-ui/tooltip"
import { Progress } from "@/components/UI/shadcn-ui/progress"
import { Badge } from "@/components/UI/shadcn-ui/badge"
import { Separator } from "@/components/UI/shadcn-ui/separator"

const recommendedTopics = [
  "Tech News",
  "Industry Updates",
  "Product Launch",
  "Company Culture",
  "Market Trends",
  "Customer Success"
]

export default function AINewsletterGenerator() {
  const [topic, setTopic] = useState("")
  const [selectedTopics, setSelectedTopics] = useState([])
  const [customTopics, setCustomTopics] = useState([])
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [formProgress, setFormProgress] = useState(0)
  const [newsletterLength, setNewsletterLength] = useState("")
  const [wordCount, setWordCount] = useState("")
  const [industry, setIndustry] = useState("")
  const [audience, setAudience] = useState("")
  const [tone, setTone] = useState("")
  const [keyPoints, setKeyPoints] = useState("")
  const [brandGuidelines, setBrandGuidelines] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [isGenerating, setIsGenerating] = useState(false)

  // Progress calculation effect
  useEffect(() => {
    calculateProgress()
  }, [topic, selectedTopics, customTopics, newsletterLength, industry, audience, tone, keyPoints, brandGuidelines])

  const calculateProgress = () => {
    const requiredFields = {
      topic: Boolean(topic.trim()),
      topics: selectedTopics.length > 0 || customTopics.length > 0,
      industry: Boolean(industry),
      length: Boolean(newsletterLength)
    }

    const optionalFields = {
      audience: Boolean(audience),
      tone: Boolean(tone),
      keyPoints: Boolean(keyPoints.trim()),
      brandGuidelines: Boolean(brandGuidelines.trim())
    }

    const totalRequired = Object.keys(requiredFields).length
    const filledRequired = Object.values(requiredFields).filter(Boolean).length
    const filledOptional = Object.values(optionalFields).filter(Boolean).length
    
    // Weight required fields more heavily than optional fields
    const progress = ((filledRequired / totalRequired) * 0.7 + 
                     (filledOptional / Object.keys(optionalFields).length) * 0.3) * 100
    
    setFormProgress(Math.min(progress, 100))
  }

  const handleTopicClick = (clickedTopic) => {
    setSelectedTopics(prev => 
      prev.includes(clickedTopic)
        ? prev.filter(t => t !== clickedTopic)
        : [...prev, clickedTopic]
    )
  }

  const handleCustomTopicAdd = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setCustomTopics(prev => [...prev, e.target.value.trim()])
      e.target.value = ''
    }
  }

  const removeCustomTopic = (topicToRemove) => {
    setCustomTopics(prev => prev.filter(t => t !== topicToRemove))
  }

  const handleLengthChange = (length) => {
    setNewsletterLength(length)
    switch (length) {
      case "short":
        setWordCount("300-500")
        break
      case "medium":
        setWordCount("500-800")
        break
      case "long":
        setWordCount("800+")
        break
      default:
        setWordCount("")
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!topic) errors.topic = "Topic is required"
    if (selectedTopics.length === 0 && customTopics.length === 0) errors.topics = "At least one topic is required"
    if (!newsletterLength) errors.newsletterLength = "Newsletter length is required"
    if (!industry) errors.industry = "Industry is required"
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      setIsGenerating(true)
      setTimeout(() => {
        setIsGenerating(false)
        alert("Your newsletter has been generated successfully!")
      }, 3000)
    }
  }

  // Generate button component to avoid duplication
  const GenerateButton = ({ className }) => (
    <Button 
      className={className}
      onClick={handleSubmit}
      disabled={isGenerating}
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 md:h-6 md:w-6 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4 md:h-6 md:w-6" />
          Generate Newsletter
        </>
      )}
    </Button>
  )

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-3xl font-bold text-gray-900 mb-2">Generate a Newsletter with AI</h1>
            <p className="text-gray-600 text-sm md:text-base">Create professional newsletters in minutes with AI assistance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2">
              <Card className="bg-white shadow-sm">
                <CardContent className="p-4 md:p-8">
                  <Progress value={formProgress} className="mb-6 md:mb-8" />

                  <div className="space-y-6 md:space-y-8">
                    {/* Essential Details Section */}
                    <div>
                      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">Essential Details</h2>
                      <div className="space-y-4 md:space-y-6">
                        <div>
                          <Label htmlFor="topic" className="text-sm md:text-base font-medium">Newsletter Topic *</Label>
                          <Input
                            id="topic"
                            placeholder="E.g., 'Latest Tech Innovations'"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="mt-2"
                          />
                          {formErrors.topic && <p className="text-red-500 text-sm mt-1">{formErrors.topic}</p>}
                        </div>

                        <div>
                          <Label className="text-sm md:text-base font-medium mb-2 block">Topics *</Label>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {recommendedTopics.map((recTopic) => (
                              <motion.button
                                key={recTopic}
                                onClick={() => handleTopicClick(recTopic)}
                                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                                  selectedTopics.includes(recTopic)
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {recTopic}
                              </motion.button>
                            ))}
                          </div>
                          <Input
                            placeholder="Add custom topic (press Enter)"
                            onKeyDown={handleCustomTopicAdd}
                            className="mt-2"
                          />
                          <div className="flex flex-wrap gap-2 mt-3">
                            {customTopics.map((customTopic) => (
                              <Badge
                                key={customTopic}
                                variant="secondary"
                                className="px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm"
                              >
                                {customTopic}
                                <button
                                  onClick={() => removeCustomTopic(customTopic)}
                                  className="ml-2 text-gray-500 hover:text-gray-700"
                                >
                                  ×
                                </button>
                              </Badge>
                            ))}
                          </div>
                          {formErrors.topics && <p className="text-red-500 text-sm mt-1">{formErrors.topics}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div>
                            <Label htmlFor="industry" className="text-sm md:text-base font-medium">Industry *</Label>
                            <Select onValueChange={setIndustry}>
                              <SelectTrigger id="industry" className="mt-2">
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="tech">Technology</SelectItem>
                                <SelectItem value="finance">Finance</SelectItem>
                                <SelectItem value="healthcare">Healthcare</SelectItem>
                                <SelectItem value="retail">Retail</SelectItem>
                              </SelectContent>
                            </Select>
                            {formErrors.industry && <p className="text-red-500 text-sm mt-1">{formErrors.industry}</p>}
                          </div>

                          <div>
                            <Label htmlFor="length" className="text-sm md:text-base font-medium">Newsletter Length *</Label>
                            <Select onValueChange={handleLengthChange}>
                              <SelectTrigger id="length" className="mt-2">
                                <SelectValue placeholder="Select length" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="short">Short (300-500 words)</SelectItem>
                                <SelectItem value="medium">Medium (500-800 words)</SelectItem>
                                <SelectItem value="long">Long (800+ words)</SelectItem>
                              </SelectContent>
                            </Select>
                            {wordCount && (
                              <p className="text-xs md:text-sm text-gray-500 mt-1">Target length: {wordCount} words</p>
                            )}
                            {formErrors.newsletterLength && <p className="text-red-500 text-sm mt-1">{formErrors.newsletterLength}</p>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-6 md:my-8" />

                    {/* Customization Section */}
                    <div>
                      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">Customization</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <Label htmlFor="audience" className="text-sm md:text-base font-medium">Target Audience</Label>
                          <Select onValueChange={setAudience}>
                            <SelectTrigger id="audience" className="mt-2">
                              <SelectValue placeholder="Select audience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="professionals">Professionals</SelectItem>
                              <SelectItem value="beginners">Beginners</SelectItem>
                              <SelectItem value="experts">Experts</SelectItem>
                              <SelectItem value="students">Students</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="tone" className="text-sm md:text-base font-medium">Tone of Voice</Label>
                          <Select onValueChange={setTone}>
                            <SelectTrigger id="tone" className="mt-2">
                              <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="casual">Casual</SelectItem>
                              <SelectItem value="friendly">Friendly</SelectItem>
                              <SelectItem value="formal">Formal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Advanced Options Section */}
                    <div className="mt-4 md:mt-6">
                      <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="flex items-center text-primary hover:text-primary-dark transition-colors text-sm md:text-base"
                      >
                        {showAdvanced ? <ChevronUp className="mr-2 h-4 w-4 md:h-5 md:w-5" /> : <ChevronDown className="mr-2 h-4 w-4 md:h-5 md:w-5" />}
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
                              <Label htmlFor="keyPoints" className="text-sm md:text-base font-medium">Key Points to Cover</Label>
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
                                <Label htmlFor="brandGuidelines" className="text-sm md:text-base font-medium">Brand Guidelines</Label>
                                <Textarea
                                  id="brandGuidelines"
                                  placeholder="Enter any specific brand guidelines or requirements"
                                  className="mt-2"
                                  rows={4}
                                  value={brandGuidelines}
                                  onChange={(e) => setBrandGuidelines(e.target.value)}
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
  
              {/* Preview and Generate Section */}
              <div className="lg:col-span-1">
                <Card className="bg-white shadow-sm lg:sticky lg:top-8">
                  <CardContent className="p-4 md:p-8">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6">Generation Settings</h2>
                    
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <h3 className="font-medium text-gray-700 mb-2 text-sm md:text-base">Selected Topics</h3>
                        <div className="flex flex-wrap gap-2">
                          {[...selectedTopics, ...customTopics].map((topic) => (
                            <Badge key={topic} variant="outline" className="px-2 py-1 text-xs md:text-sm">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
  
                      {wordCount && (
                        <div>
                          <h3 className="font-medium text-gray-700 mb-2 text-sm md:text-base">Expected Length</h3>
                          <p className="text-gray-600 text-sm">{wordCount} words</p>
                        </div>
                      )}
  
                      <Separator className="my-4 md:my-6" />
  
                      {/* Desktop generate button - only shown on larger screens */}
                      <div className="hidden lg:block">
                        <GenerateButton className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 md:py-6 text-sm md:text-lg shadow-lg" />
                      </div>
  
                      {/* Tips section */}
                      <div className="mt-4 md:mt-6 bg-blue-50 p-3 md:p-4 rounded-lg border border-blue-100">
                        <h3 className="font-medium text-blue-800 mb-2 text-sm md:text-base">Tips for Better Results</h3>
                        <ul className="space-y-2 text-xs md:text-sm text-blue-700">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            Be specific with your newsletter topic
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            Select multiple relevant topics for comprehensive coverage
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            Include key points in advanced options for better focus
                          </li>
                        </ul>
                      </div>
  
                      {/* Error display */}
                      {Object.keys(formErrors).length > 0 && (
                        <div className="mt-4 p-3 md:p-4 bg-red-50 rounded-lg border border-red-100">
                          <h3 className="text-red-800 font-medium flex items-center text-sm md:text-base">
                            <AlertCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                            Please fix the following:
                          </h3>
                          <ul className="list-disc list-inside mt-2">
                            {Object.entries(formErrors).map(([key, value]) => (
                              <li key={key} className="text-red-600 text-xs md:text-sm">{value}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
  
            {/* Footer Section */}
            <div className="mt-8 mb-20 lg:mb-8 text-center text-gray-600">
              <p className="text-xs md:text-sm">
                Disclaimer: The content generated by this tool is created using artificial intelligence. While we strive for accuracy and quality, please review and edit the output as needed to ensure it meets your specific requirements and standards
              </p>
            </div>
          </div>
  
          {/* Mobile Generate Button - Only shown on mobile */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg lg:hidden">
            <GenerateButton className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-base shadow-lg" />
          </div>
        </div>
      </TooltipProvider>
    )
  }