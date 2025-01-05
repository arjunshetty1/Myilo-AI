// Complete landing page

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, ChevronRight, CheckCircle2, ArrowRight, Play, Star, Users, Zap, Mail, Palette, BarChart3, Globe2, DollarSign, Sun, Moon } from 'lucide-react';

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Navigation = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 60, damping: 15 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? " backdrop-blur-md rounded-xl " : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 md:py-3">
          <Logo />
          <NavigationComponent isOpen={isOpen} setIsOpen={setIsOpen} theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </motion.header>
  );
};

const Logo = () => (
  <Link
    href="/"
    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
  >
    Myilo AI
  </Link>
);

const NavigationComponent = ({ isOpen, setIsOpen, theme, toggleTheme }) => {
  const linkClassnames =
    "text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300";

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="flex items-center">
      <div className="hidden md:flex space-x-8">
        {["Features", "How It Works", "Pricing", "Success Stories"].map(
          (item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() =>
                scrollToSection(item.toLowerCase().replace(/\s+/g, "-"))
              }
              className={linkClassnames}
            >
              {item}
            </Link>
          )
        )}
      </div>
      <div className="hidden md:flex items-center space-x-4 ml-8">
        <Link
          href="/earlyaccess"
          className="px-4 py-2 text-purple-600 dark:text-purple-400 border border-purple-600 dark:border-purple-400 rounded-full hover:bg-purple-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-gray-900 transition-colors duration-300"
        >
          Start Free
        </Link>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
      <div className="md:hidden flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        scrollToSection={scrollToSection}
      />
    </nav>
  );
};

const MobileMenu = ({ isOpen, setIsOpen, scrollToSection }) => {
  const menuItems = ["Features", "How It Works", "Pricing", "Success Stories"];

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          />
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 md:hidden"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
            >
              <X size={24} />
            </button>
            <nav className="flex flex-col p-8 mt-16">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    onClick={() => {
                      scrollToSection(item.toLowerCase().replace(/\s+/g, "-"));
                      setIsOpen(false);
                    }}
                    className="text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 py-3 block transition-colors duration-300 text-lg"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 space-y-4">
                <Link
                  href="/earlyaccess"
                  className="w-full px-4 py-2 text-purple-600 dark:text-purple-400 border border-purple-600 dark:border-purple-400 rounded-full hover:bg-purple-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-gray-900 transition-colors duration-300 text-center block"
                >
                  Start Free
                </Link>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    className="relative bg-white dark:bg-gray-800 backdrop-blur-lg rounded-2xl p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg border border-gray-200 dark:border-gray-700"
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ duration: 0.3 }}
  >
    <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center shadow-lg">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="ml-6 mt-6">
      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </motion.div>
);

const PriceTag = ({ price }) => (
  <div className="flex items-baseline justify-center">
    <span className="text-3xl font-semibold">$</span>
    <span className="text-5xl font-bold">{price}</span>
    <span className="text-xl text-gray-500 dark:text-gray-400">/mo</span>
  </div>
);

const PricingCard = ({ name, price, features, isActive }) => (
  <motion.div
    className={`relative bg-white dark:bg-gray-800 backdrop-blur-lg rounded-2xl p-8 ${
      isActive ? "ring-2 ring-purple-400" : ""
    } shadow-lg border border-gray-200 dark:border-gray-700`}
    whileHover={{ y: -10, scale: 1.02 }}
    transition={{ duration: 0.3 }}
  >
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
      {name}
    </h3>
    {isActive ? (
      <PriceTag price={price} />
    ) : (
      <div className="text-2xl font-bold text-gray-500 dark:text-gray-400 mb-4">
        {price}
      </div>
    )}
    <ul className="mt-8 space-y-4">
      {features.map((feature, index) => (
        <li
          key={index}
          className="flex items-center text-gray-600 dark:text-gray-300"
        >
          <CheckCircle2 className="w-5 h-5 mr-3 text-purple-400" />
          {feature}
        </li>
      ))}
    </ul>
    <button
      className={`w-full mt-8 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white"
          : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
      }`}
      disabled={!isActive}
    >
      {isActive ? "Start Free Trial" : "Coming Soon"}
    </button>
  </motion.div>
);

const TestimonialCard = ({ quote, author, role, image }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 backdrop-blur-lg rounded-2xl p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg border border-gray-200 dark:border-gray-700"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center mb-6">
      <div className="flex-shrink-0">
        <img src={image} alt={author} className="w-12 h-12 rounded-full" />
      </div>
      <div className="ml-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
          {author}
        </h4>
        <p className="text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
    <div className="mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="inline w-5 h-5 text-yellow-400 fill-yellow-400"
        />
      ))}
    </div>
    <p className="text-gray-600 dark:text-gray-300 italic">"{quote}"</p>
  </motion.div>
);

const RevenueStreamCard = ({ icon: Icon, title, description }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex items-center mb-4">
      <Icon className="w-8 h-8 text-purple-500 mr-3" />
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
    </div>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

export default function LandingPage() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navigation theme={theme} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:via-purple-900 dark:to-pink-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,255,0.1),rgba(255,0,255,0))]" />
          <div className="absolute w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),rgba(255,255,255,0))]" />
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-purple-100 dark:bg-white/10 backdrop-blur-sm text-purple-800 dark:text-purple-300 text-sm font-medium mb-6">
                🚀 Join 10,000+ newsletter newbies
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 dark:text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Start Your Newsletter Journey with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                AI Magic
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl mb-10 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              No experience? No problem! Create engaging newsletters in minutes and start making money, even as a complete beginner.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <Link href="/earlyaccess">
                <button className="group bg-gradient-to-r from-purple-400 to-pink-400 text-white text-lg px-8 py-3 rounded-full hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 flex items-center">
                  Start Free Trial
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
              <button className="group bg-white dark:bg-white/10 text-gray-900 dark:text-white text-lg px-8 py-3 rounded-full hover:bg-gray-100 dark:hover:bg-white/20 transition-all duration-300 flex items-center">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 flex justify-center items-center space-x-8"
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white dark:border-gray-800"
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-white">
                  4.9/5
                </span>{" "}
                from 200+ beginner reviews
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-2 md:px-10 bg-gray-50 dark:bg-gray-800"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
            >
              Beginner-Friendly Features
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Everything you need to create stunning newsletters and start making money, even if you're just starting out
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Zap}
              title="AI-Powered Content Creation"
              description="Our AI writes engaging content for you, so you don't need to be an expert writer to create great newsletters."
            />
            <FeatureCard
              icon={Palette}
              title="Beginner-Friendly Templates"
              description="Choose from our collection of easy-to-use templates designed to make your newsletters look professional from day one."
            />
            <FeatureCard
              icon={Mail}
              title="One-Click Publishing"
              description="Write, design, and send newsletters with just a few clicks. No technical skills required!"
            />
            <FeatureCard
              icon={Users}
              title="Audience Building Tools"
              description="Grow your subscriber list effortlessly with our built-in tools, perfect for those just starting out."
            />
            <FeatureCard
              icon={BarChart3}
              title="Simple Analytics"
              description="Track your newsletter's performance with easy-to-understand charts and graphs. No data science degree needed!"
            />
            <FeatureCard
              icon={DollarSign}
              title="Monetization Made Easy"
              description="Start making money from your newsletter with our beginner-friendly monetization tools and guidance."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 px-2 md:px-10 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
            >
              How It Works (Even If You're New!)
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Create your first newsletter in just three easy steps, no experience required
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Choose Your Topic",
                description:
                  "Tell our AI what you're interested in, even if you're not an expert",
                icon: "🎯",
              },
              {
                step: 2,
                title: "Customize Your Newsletter",
                description:
                  "Pick a template and let AI generate engaging content for you",
                icon: "✍️",
              },
              {
                step: 3,
                title: "Publish and Profit",
                description:
                  "Send your newsletter and start exploring ways to make money",
                icon: "💰",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative bg-white dark:bg-gray-800 backdrop-blur-lg rounded-2xl p-8 text-center shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
            >
              Affordable Pricing for Beginners
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Start for free, upgrade as you grow
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingCard
              name="Starter"
              price="0"
              features={[
                "Up to 100 subscribers",
                "5 AI-generated newsletters/month",
                "Basic templates",
                "Email support",
                "Basic analytics",
              ]}
              isActive={true}
            />
            <PricingCard
              name="Growth"
              price="19"
              features={[
                "Up to 1,000 subscribers",
                "20 AI-generated newsletters/month",
                "Advanced templates",
                "Priority support",
                "Advanced analytics",
                "Basic monetization tools",
              ]}
              isActive={true}
            />
            <PricingCard
              name="Pro"
              price="49"
              features={[
                "Up to 10,000 subscribers",
                "Unlimited AI-generated newsletters",
                "Premium templates",
                "24/7 support",
                "Advanced analytics",
                "Advanced monetization features",
              ]}
              isActive={true}
            />
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section
        id="success-stories"
        className="py-20 px-2 md:px-10 bg-white dark:bg-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
            >
              Beginner Success Stories
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              See how complete beginners have built thriving newsletters from scratch
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="I knew nothing about newsletters, but Myilo AI helped me launch and grow to 1,000 subscribers in just 2 months!"
              author="Sarah Johnson"
              role="Fitness Enthusiast"
              image="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="The AI-generated content is amazing. It sounds just like me, and I'm now making $500/month from sponsorships as a complete beginner!"
              author="Michael Chen"
              role="Tech Hobbyist"
              image="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="As a busy mom with no writing experience, I never thought I could start a newsletter. Myilo AI made it possible, and now it's my side hustle!"
              author="Emily Rodriguez"
              role="Parenting Blogger"
              image="/placeholder.svg?height=100&width=100"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Start Your Newsletter Adventure?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of beginners who are building audiences and making their first dollars with AI-powered newsletters.
            </p>
            <Link href="/earlyaccess">
              <button className="bg-white text-purple-600 text-lg px-8 py-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Start Your Free Trial
              </button>
            </Link>
            <p className="mt-4 text-purple-200">No credit card required</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="footer"
        className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 py-12"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm mb-4 md:mb-0">
              © 2024 Myilo AI. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy-policy"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact-us"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

