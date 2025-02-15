"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/UI/shadcn-ui/button";
// import { Pen, Layout, Send, Mail, Users, BarChart } from "lucide-react";
import {
  Pen,
  Layout,
  Send,
  Mail,
  Users,
  BarChart,
  Youtube,
  ArrowRight,
  FileOutputIcon as FileExport,
} from "lucide-react"
import Logo from "@/components/App Components/Logo";

const PricingSection = () => {
  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, <GradientText>Transparent</GradientText> Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Start free, upgrade as you grow</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Starter",
              price: "0",
              features: [
                "500 subscribers",
                "5 newsletter creations/month",
                "5 newsletter publishes/month",
                "High-quality HD images included",
                "All templates",
                "Email support",
                "Full Analytics",
                "Email service integrated",
              ],
              cta: "Start Free Trial",
            },
            {
              title: "Growth",
              price: "19",
              features: [
                "1000 subscribers max",
                "25 newsletter creations/month",
                "25 newsletter publishes/month",
                "High-quality HD images included",
                "All templates",
                "Priority support",
                "Full Analytics",
                "Email service integrated",
              ],
              cta: "Coming Soon",
              featured: true,
            },
            {
              title: "Pro",
              price: "49",
              features: [
                "3000 subscribers included",
                "100 newsletter creations/month",
                "50 newsletter publishes/month",
                "High-quality HD images included",
                "All templates",
                "Priority support",
                "Full Analytics",
                "Email service integrated",
                "$0.15 per additional subscriber",
              ],
              cta: "Coming Soon",
              hasSlider: true,
            },
          ].map((plan, index) => {
            // Pro plan pricing calculation with slider
            const [subscribers, setSubscribers] = useState(1000);
            const baseFee = 49;
            const additionalCost = (subscribers > 1000) ? (subscribers - 1000) * 0.15 : 0;
            const totalCost = baseFee + additionalCost;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`p-8 rounded-2xl flex flex-col ${
                  plan.featured ? "bg-blue-600 text-white shadow-md scale-105" : "bg-white shadow-md"
                }`}
              >
                <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                {plan.hasSlider ? (
                  <div className="mb-6">
                    <div className="text-4xl font-bold">
                      ${totalCost.toFixed(0)}
                      <span className="text-lg text-gray-500">/month</span>
                    </div>
                    <div className="mt-4 mb-2">
                      <label htmlFor="subscribers" className="text-sm text-gray-600 block mb-1">
                        Subscribers: {subscribers.toLocaleString()}
                      </label>
                      <input
                        type="range"
                        id="subscribers"
                        min="1000"
                        max="10000"
                        step="100"
                        value={subscribers}
                        onChange={(e) => setSubscribers(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Base price $49 for 3000 subscribers + $0.15 per additional subscriber
                    </p>
                  </div>
                ) : (
                  <div className="text-4xl font-bold mb-6">
                    ${plan.price}
                    <span className={`text-lg ${plan.featured ? "text-blue-100" : "text-gray-500"}`}>/month</span>
                  </div>
                )}
                <ul className="space-y-4 mb-6 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg
                        className={`w-5 h-5 ${plan.featured ? "text-blue-200" : "text-blue-500"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={plan.featured ? "text-blue-100" : "text-gray-600"}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Link href="/Login">
                    <Button
                      className={`w-full py-6 ${
                        plan.featured
                          ? "bg-white text-blue-600 hover:bg-blue-50"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      } font-medium rounded-xl ${plan.cta === "Coming Soon" ? "opacity-50 cursor-not-allowed" : ""}`}
                      disabled={plan.cta === "Coming Soon"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            <strong>All plans include:</strong> Generate and send newsletters within one platform. 
            No third-party costs - AI generation, email delivery, and all server costs are included in the pricing.
          </p>
        </div>
      </div>
    </section>
  );
};

const GradientText = ({ children, className = "" }) => (
  <span
    className={`bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 ${className}`}
  >
    {children}
  </span>
);

const FloatingElement = ({ children }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-10, 10, -10] }}
    transition={{
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

const TestimonialCard = ({ name, role, content, image }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="p-6 rounded-2xl bg-white shadow-md border border-gray-100"
  >
    <p className="text-gray-700 mb-6">{content}</p>
    <div className="flex items-center gap-4">
      {/* <img src={image || "/placeholder.svg"} alt={name} className="w-12 h-12 rounded-full" /> */}
      <div>
        <h4 className="font-semibold text-gray-900">{name}</h4>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  </motion.div>
);

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* <span className="text-2xl text-blue-600 font-bold">ClipMailo</span>
           */}
          <Logo />
          <Link href="/Login">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 opacity-30"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        <div className="text-center md:max-w-4xl max-w-5xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full py-2 px-4 shadow-sm"
          >
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 md:text-sm text-[0.6rem] font-medium whitespace-nowrap">
              Private Beta
            </span>
            <span className="md:text-sm text-[0.6rem] text-gray-600 whitespace-nowrap">
              Internal Release  
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Create <GradientText>Stunning</GradientText> Newsletters with AI
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Transform your ideas into professional newsletters in minutes.
            Built for creators who value design and efficiency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/Login">
              <Button className="w-full sm:w-auto px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
                Try Now
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 border-gray-200 hover:bg-gray-50 text-lg font-medium rounded-xl backdrop-blur-sm bg-white/50"
            >
              Watch Demo
            </Button>
          </div>
        </div>

        {/* <FloatingElement> */}
          <div className="mt-20 relative group">
            <div className="absolute -inset-1  rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <video
                className="w-full rounded-xl shadow-2xl md:h-[43.5rem] h-[12.85rem] border border-gray-200/20 bg-white/5 backdrop-blur-sm"
                src="/Product video 2.mp4"
                controls
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        {/* </FloatingElement> */}
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{ opacity }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-auto"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,122.7C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </motion.div>
    </section>

      {/* Features Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Crafted for <GradientText>Professional</GradientText> Creators
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, manage, and grow your newsletter
              audience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Content",
                desc: "Transform ideas into engaging newsletters in minutes",
                icon: Pen,
              },
              {
                title: "Premium Templates",
                desc: "Professionally designed templates with easy customization",
                icon: Layout,
              },
              {
                title: "One-Click Publishing",
                desc: "Publish in three clicks with built-in email service",
                icon: Send,
              },
              {
                title: "Built-in Email Service",
                desc: "Send newsletters directly from our platform with no third-party tools",
                icon: Mail,
              },
              {
                title: "Subscriber Management",
                desc: "Easily manage subscribers, add/remove them, and share an invite link",
                icon: Users,
              },
              {
                title: "Visual Analytics",
                desc: "Beautiful dashboards for data-driven decisions",
                icon: BarChart,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 mb-6 flex items-center justify-center text-white">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      

      {/* How It Works */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It <GradientText>Works</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create professional newsletters in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Share Your Idea",
                description:
                  "Input your Industry, topic,length and preferences.",
              },
              {
                step: "02",
                title: "AI Magic",
                description:
                  "Our AI transforms your input into engaging content.",
              },
              {
                step: "03",
                title: "Publish & Share",
                description: "Review, edit, and share with your audience.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative p-8 rounded-2xl bg-white shadow-md"
              >
                <span className="absolute -top-6 left-8 text-7xl font-bold text-blue-100">
                  {step.step}
                </span>
                <div className="relative">
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Loved by <GradientText>Creators</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied newsletter creators
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Content Creator",
                content:
                  "ClipMailo has transformed how I create newsletters. The AI suggestions are spot-on, and the templates are beautiful.",
                image: "/api/placeholder/48/48",
              },
              {
                name: "Mike Chen",
                role: "Tech Blogger",
                content:
                  "The efficiency and quality of content generation is unmatched. My subscriber engagement has increased by 40%.",
                image: "/api/placeholder/48/48",
              },
              {
                name: "Emma Davis",
                role: "Marketing Director",
                content:
                  "Finally, a newsletter platform that understands modern design and content needs. Absolutely worth every penny.",
                image: "/api/placeholder/48/48",
              },
            ].map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <PricingSection />

{/* upcoming featuers */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Exciting <GradientText>Upcoming Features</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're constantly innovating to make ClipMailo even better. Here's a sneak peek at what's coming soon:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Youtube className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">YouTube to Newsletter Integration</h3>
                <p className="text-gray-600 mb-6">
                  Seamlessly convert your YouTube content into engaging newsletters, expanding your reach across
                  multiple platforms.
                </p>
                <div className="flex items-center text-blue-600 font-semibold">
                  <span>Coming Soon</span>
                  {/* <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" /> */}
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileExport className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Export Newsletter as an Image in Editor</h3>
                <p className="text-gray-600 mb-6">
                  Gain ultimate flexibility with the ability to export your newsletters directly from the editor,
                  perfect for multi-channel distribution strategies.
                </p>
                <div className="flex items-center text-green-600 font-semibold">
                  <span>Coming soon</span>
                  {/* <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" /> */}
                </div>
              </div>
            </motion.div>
          </div>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link href="/roadmap">
              <Button variant="outline" className="px-8 py-6 text-lg font-semibold rounded-xl">
                View Full Roadmap
              </Button>
            </Link>
          </motion.div> */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-blue-600">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your Newsletter Journey Today
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Join thousands of creators who are building their audience and
              monetizing their passion.
            </p>
            <Link href="/Login">
              <Button className="px-12 py-6 bg-white text-blue-600 hover:bg-blue-50 text-lg font-medium rounded-xl">
                Get Started Now
              </Button>
            </Link>
            <p className="mt-4 text-blue-100">No credit card required</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-gray-100">
  <div className="max-w-7xl mx-auto px-6">
    {/* Flex container for links */}
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8">
      <Link
        href="/terms-of-service"
        className="text-xs sm:text-sm whitespace-nowrap text-gray-600 hover:text-gray-900 transition-colors"
      >
        Terms of Service
      </Link>
      <Link
        href="/privacy-policy"
        className="text-xs sm:text-sm whitespace-nowrap text-gray-600 hover:text-gray-900 transition-colors"
      >
        Privacy Policy
      </Link>
      <Link
        href="/contact-us"
        className="text-xs sm:text-sm whitespace-nowrap text-gray-600 hover:text-gray-900 transition-colors"
      >
        Contact Us
      </Link>
      <Link
        href="/credits"
        className="text-xs sm:text-sm whitespace-nowrap text-gray-600 hover:text-gray-900 transition-colors"
      >
        Credits
      </Link>
    </div>

    {/* Copyright text */}
    <div className="text-center text-sm text-gray-600">
      © 2025 ClipMailo. All rights reserved.
    </div>
  </div>
</footer>
    </div>
  );
}
