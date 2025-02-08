"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight, CheckCircle2, Play, Star, ArrowUpRight } from "lucide-react";


const testimonials = [
  {
    name: "John Doe",
    role: "CEO, Acme Corp",
    text: "This product has completely transformed our workflow. Highly recommend!"
  },
  {
    name: "Jane Smith",
    role: "Marketing Director, TechWave",
    text: "Amazing experience! The team is fantastic and always willing to help."
  },
  {
    name: "Alex Johnson",
    role: "CTO, InnovateX",
    text: "Our productivity has skyrocketed since using this. It's a game-changer!"
  }
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-lg shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Logo />
          {/* <NavContent isOpen={isOpen} setIsOpen={setIsOpen} /> */}
        </div>
      </div>
    </motion.header>
  );
};

const Logo = () => (
  <Link href="/" className="flex items-center space-x-3 group">
    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center transition-transform group-hover:rotate-[360deg] duration-500">
      <span className="text-white font-bold text-xl">CM</span>
    </div>
    <span className="text-xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
      ClipMailo
    </span>
  </Link>
);

const HeroSection = () => (
  <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-indigo-50 relative overflow-hidden isolate pt-20 md:pt-0">
    {/* Dynamic background - optimized for mobile */}
    <div className="absolute inset-0 opacity-10 md:opacity-15 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]">
      <div className="absolute inset-0 animate-gradient-pan bg-[linear-gradient(120deg,rgba(165,180,252,0.15)_25%,transparent_50%,rgba(165,180,252,0.15)_75%)] bg-[length:400%_400%]"></div>
    </div>

    {/* Floating particles - reduced count for mobile */}
    <div className="absolute inset-0 opacity-20 md:opacity-30 pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-12 bg-gradient-to-b from-indigo-400 to-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: [0, 1, 0],
            y: `calc(100vh + ${Math.random() * 100}px)`,
            x: Math.random() * 100 - 50 + 'vw'
          }}
          transition={{
            duration: 5 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
        />
      ))}
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="text-center">
        {/* Animated badge - mobile adjustments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-6 md:mb-8 px-4 py-2 md:px-6 md:py-2.5 bg-white/90 backdrop-blur-lg rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-sm md:text-base"
        >
          <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent font-medium">
            {/* <Sparkles className="inline-block w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2 -mt-0.5 text-indigo-500" /> */}
            15,000+ Newsletters Launched
          </span>
        </motion.div>

        {/* Main headline - mobile font sizes */}
        <motion.div 
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6 md:mb-8 leading-tight text-gray-900 px-2">
            <span className="block">Elevate Your</span>
            <span className="relative inline-block mt-2 md:mt-0">
              <span className="relative z-10 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                Content Game
              </span>
              <motion.div 
                className="absolute inset-x-0 -bottom-2 md:-bottom-4 h-4 md:h-8 bg-gradient-to-r from-indigo-400/30 to-pink-400/30 blur-2xl"
                animate={{ opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </span>
          </h1>
        </motion.div>

        {/* Subtext - mobile adjustments */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12 font-medium px-4"
        >
          Transform ideas into stunning newsletters with AI-enhanced design intelligence.
        </motion.p>

        {/* CTA buttons - mobile stacking */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 px-4"
        >
          <Link
            href="/Login"
            className="group relative px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-[2rem] font-medium hover:shadow-2xl transition-all duration-300 flex items-center gap-2 overflow-hidden text-sm md:text-base"
          >
            <span className="relative z-10">Start Building Free</span>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 relative z-10 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
          
          <button className="group px-6 py-3 md:px-8 md:py-4 bg-white/90 backdrop-blur-lg border-2 border-gray-200 rounded-[2rem] font-medium hover:border-indigo-100 hover:bg-indigo-50/50 transition-all flex items-center gap-2 shadow-sm hover:shadow-md text-sm md:text-base">
            <Play className="w-4 h-4 md:w-5 md:h-5 text-indigo-600 transition-transform group-hover:scale-110" />
            <span className="bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Watch Demo
            </span>
          </button>
        </motion.div>

        {/* Social proof - mobile adjustments */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 md:mt-16 flex flex-col items-center gap-6 md:gap-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="flex -space-x-4 md:-space-x-5">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  className="relative w-10 h-10 md:w-14 md:h-14 rounded-full border-4 border-white bg-gradient-to-br from-indigo-100 to-pink-100 shadow-lg overflow-hidden hover:z-10 hover:shadow-xl transition-all"
                >
                  <img
                    src={`https://i.pravatar.cc/100?u=${i}`}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                </motion.div>
              ))}
            </div>
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1 md:mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 md:w-6 md:h-6 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <span className="text-gray-600 font-medium text-sm md:text-base">4.98/5</span>
              </div>
              <p className="text-gray-600 text-sm md:text-lg">
                Trusted by <span className="font-semibold text-gray-900">8,000+</span> creators
              </p>
            </div>
          </div>

          {/* Client logos - mobile grid */}
          <div className="grid grid-cols-2 md:flex flex-wrap justify-center gap-4 md:gap-8 opacity-70 mt-4 md:mt-6 px-4">
            {['Forbes', 'HubSpot', 'Substack', 'ConvertKit'].map((logo) => (
              <motion.div
                key={logo}
                whileHover={{ scale: 1.1 }}
                className="text-lg md:text-2xl font-bold text-gray-700 opacity-80 hover:opacity-100 transition-opacity text-center"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>

    {/* Floating demo preview - mobile hidden */}
    {/* <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, type: 'spring' }}
      className="hidden md:block absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[800px] aspect-video bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white to-indigo-50 opacity-50" />
      <div className="relative z-10 p-4 md:p-8 h-full">
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl border border-gray-100">
          <img
            src="/demo-preview.jpg"
            alt="Demo preview"
            className="w-full h-full object-cover animate-pan-right"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30" />
        </div>
      </div>
    </motion.div> */}
  </section>
);
const FeatureSection = () => {
  const features = [
    {
      icon: '🤖', // Consider using @heroicons/react for actual icons
      title: "AI-Powered Writing",
      description: "Generate high-quality content in seconds with our GPT-4 powered engine",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: '🎯',
      title: "Smart Templates",
      description: "100+ professionally designed templates with auto-layouts",
      gradient: "from-blue-500 to-cyan-400"
    },
    {
      icon: '🚀',
      title: "3-Click Publishing",
      description: "Publish to web, email, and social media simultaneously",
      gradient: "from-orange-400 to-rose-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-white-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Supercharged
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
              Features
            </span>
          </h2>
          <p className="text-gray-600 text-xl">Everything you need to create stunning newsletters</p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.15, type: 'spring' }}
              className="group relative bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] border border-gray-100 hover:border-transparent"
            >
              {/* Animated gradient border */}
              <div className={`absolute -inset-[2px] rounded-[2rem] bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10`} />
              
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br shadow-lg mb-4"
                  style={{ backgroundImage: `linear-gradient(to bottom right, ${feature.gradient.replace('from-', '').replace('to-', '').replace(/\d+/g, m => `${m}`)})` }}>
                  <span className="text-3xl">{feature.icon}</span>
                </div>
                
                <h3 className="text-2xl text-[#242424] font-bold bg-gradient-to-r bg-clip-text text-transparent"
                  style={{ backgroundImage: `linear-gradient(to right, ${feature.gradient.replace('from-', '').replace('to-', '').replace(/\d+/g, m => `${m}`)})` }}>
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                  {feature.description}
                </p>
              </div>

              {/* Hover effect line */}
              <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent group-hover:w-4/5 group-hover:transition-all duration-300 transform -translate-x-1/2" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};



const HowItWorks = () => (
  <section id="how-it-works" className="py-28 bg-gradient-to-b from-white to-indigo-50">
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-24"
      >
        <div className="mb-8">
          <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
            Streamlined Process
          </span>
        </div>
        <h2 className="text-5xl font-bold mb-6 text-gray-900">
          Craft Perfect Newsletters
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
            in Three Simple Steps
          </span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Share Your Vision", text: "Describe your core message and audience needs", icon: "💡", color: "from-blue-500 to-cyan-400" },
          { title: "AI-Powered Design", text: "Select from intelligent layout suggestions", icon: "✨", color: "from-purple-500 to-pink-400" },
          { title: "Launch & Optimize", text: "Publish and refine with real-time analytics", icon: "📈", color: "from-orange-400 to-rose-500" }
        ].map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 border border-gray-100"
          >
            <div className="flex flex-col h-full">
              <div className={`mb-8 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl backdrop-blur-lg`}>
                {step.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-gray-400 font-mono text-lg">0{index + 1}</span>
                  <h3 className="text-2xl font-semibold text-gray-900">{step.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{step.text}</p>
              </div>

              <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center ml-auto">
                  {/* <ArrowRight className="w-5 h-5 text-gray-600" /> */}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: 0,
      features: ["1K subscribers", "5 campaigns/month", "Basic analytics", "Community support"],
      border: "border-gray-200"
    },
    {
      name: "Professional",
      price: 29,
      features: ["10K subscribers", "Unlimited campaigns", "Advanced analytics", "Priority support", "A/B Testing"],
      border: "border-blue-500",
      popular: true
    },
    {
      name: "Enterprise",
      price: 99,
      features: ["Unlimited subscribers", "Unlimited campaigns", "Dedicated support", "Custom domains", "Team members"],
      border: "border-gray-200"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-white-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Simple Pricing,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
              Scalable Results
            </span>
          </h2>
          <p className="text-gray-600 text-xl">Start free and upgrade as you grow</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white p-8 rounded-2xl border-2 ${plan.border} ${plan.popular ? "shadow-xl" : "shadow-sm"}`}
            >
              {plan.popular && (
                <div className="mb-6 -mt-4 text-center">
                  <span className="inline-block bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{plan.name}</h3>
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                <span className="text-gray-600">/month</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 mr-3" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                href="/Login"
                className={`w-full block text-center py-3 px-6 rounded-lg font-medium transition-all ${
                  plan.popular 
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => (
  <section className="py-24 bg-gradient-to-b from-white to-indigo-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Trusted by
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
            Amazing Teams
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-xl border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                {/* <User className="w-6 h-6 text-blue-500" /> */}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6">"{testimonial.text}"</p>
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Ready to Transform Your Newsletter?</h2>
      <p className="text-lg text-purple-100 mb-8 max-w-xl mx-auto">Join thousands of creators already growing their audience with ClipMailo</p>
      <Link
        href="/Login"
        className="inline-block px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg"
      >
        Start Your Free Trial
      </Link>
      <p className="mt-4 text-purple-200 text-sm">No credit card required</p>
    </div>
  </section>
);

const Footer = () => (
  <footer className=" bg-gradient-to-b from-white to-white-50 pt-20 pb-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
        <Logo />
        
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <Link href="/contact-us" className="text-gray-600 hover:text-purple-600 transition-colors">
            Contact Us
          </Link>
          <Link href="/credits" className="text-gray-600 hover:text-purple-600 transition-colors">
            Credits
          </Link>
          <Link href="/privacy-policy" className="text-gray-600 hover:text-purple-600 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-gray-600 hover:text-purple-600 transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8 text-center">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} ClipMailo. All rights reserved.<br />
          Crafted with ❤️ by newsletter enthusiasts
        </p>
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <FeatureSection />
      <HowItWorks />
      <PricingSection /> 
      <Testimonials /> 
      <CTA /> 
      <Footer />
    </div>
  );
}