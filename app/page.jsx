import { InteractiveGrid } from "@/components/UI/custom-ui/interactive-grid";
import { ShineBorder } from "@/components/UI/custom-ui/shine-border";
import { Button } from "@/components/UI/shadcn-ui/button";
import { Play, Check, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-br from-[#1e40af] via-purple-800/90 to-[#be185d] backdrop-blur-sm text-[white]">
      {/* Hero Section */}
      <section className="relative min-h-screen pt-4 md:pt-32 pb-16 overflow-hidden p-3">
        <InteractiveGrid
          containerClassName="absolute inset-0"
          className="opacity-30"
          points={40}
        />

        <ShineBorder
          className="relative z-10 max-w-6xl mx-auto md:px-6 p-11"
          borderClassName="border border-[white]/10 rounded-xl"
        >
          <div className="text-center mb-16 px-4">
            <div className="mb-8 flex items-center justify-center gap-2 bg-[white]/5 rounded-full py-1 px-4 w-fit mx-auto">
              <Star className="w-4 h-4 text-[white]" />
              <span className="text-sm whitespace-nowrap">Rated 4.9/5 by 5,000+ creators</span>
            </div>
            <h1 className="text-3xl md:text-6xl md:font-bold font-semibold mb-6 tracking-tight md:px-20 px-1">
              Build Newsletters That Converts with AI
            </h1>
            <p className="text-gray-200 text-lg mb-8 max-w-2xl mx-auto">
              Create Stunning Newsletters with AI - Build your audience, save
              time, and turn your passion into profit in just minutes.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/Login">
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/Login">
                <Button
                  variant="outline"
                  className="gap-2 border-[white]/10 bg-[white]/5 hover:bg-[white]/10 hover:text-[white] transform hover:scale-105 transition-all duration-200"
                >
                  <Play className="w-4 h-4" />
                  Watch Demo
                </Button>
              </Link>
            </div>
          </div>

          <ShineBorder
            className="mx-auto"
            borderClassName="border border-[white]/10 rounded-xl"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Hero%20image.jpg-mE5vAT4d864MlVhdkcrk1Vn2WcNONq.jpeg"
              alt="Newsletter Preview"
              width={1920}
              height={1080}
              className="w-full h-auto rounded-lg"
              priority
            />
          </ShineBorder>
        </ShineBorder>
      </section>

      {/* Features Section */}
      <section className="relative py-20 overflow-hidden">
        <InteractiveGrid
          containerClassName="absolute inset-0"
          className="opacity-30"
          points={40}
        />

        <div className="max-w-6xl mx-auto px-6">
          <ShineBorder borderClassName="border border-[white]/10 rounded-xl">
            <div className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">
                Everything You Need to Get Started
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "AI-Powered Content",
                    desc: "Transform ideas into engaging newsletters in minutes",
                  },
                  {
                    title: "Premium Templates",
                    desc: "Professionally designed templates with easy customization",
                  },
                  {
                    title: "One-Click Publishing",
                    desc: "Publish in three clicks with built-in email service",
                  },
                  {
                    title: "Built-in Email Service",
                    desc: "Send newsletters directly from our platform with no third-party tools, using your username as the sender email",
                  },
                  {
                    title: "Subscriber Management",
                    desc: "Easily manage subscribers, add/remove them, and share an invite link for onboarding",
                  },
                  {
                    title: "Visual Analytics",
                    desc: "Beautiful dashboards for data-driven decisions",
                  },
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="p-6 border border-[white]/10 rounded-xl bg-[white]/5 hover:bg-[white]/10 transform hover:scale-105 transition-all duration-200"
                  >
                    <Check className="w-8 h-8 mb-4 mx-auto text-blue-500" />
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-200">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ShineBorder>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <ShineBorder borderClassName="border border-[white]/10 rounded-xl">
            <div className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-16">
                Create in 3 Simple Steps
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: "1",
                    title: "Share Your Idea",
                    desc: "Write/pick your topic, industry, and audience preferences",
                  },
                  {
                    step: "2",
                    title: "Choose Style",
                    desc: "Select templates and let AI craft your content",
                  },
                  {
                    step: "3",
                    title: "Review & Send",
                    desc: "Quick edit and share with subscribers",
                  },
                ].map((step, i) => (
                  <div
                    key={i}
                    className="p-8 border border-[white]/10 rounded-xl bg-[white]/5 hover:bg-[white]/10 transform hover:scale-105 transition-all duration-200"
                  >
                    <div className="w-12 h-12 mb-6 mx-auto bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                    <p className="text-gray-200">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ShineBorder>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-20 overflow-hidden">
        <InteractiveGrid
          containerClassName="absolute inset-0"
          className="opacity-30"
          points={40}
        />

        <div className="max-w-6xl mx-auto px-6">
          <ShineBorder borderClassName="border border-[white]/10 rounded-xl">
            <div className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-16">
                Start Free, Upgrade as You Grow
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Starter",
                    price: "0",
                    features: [
                      "500 subscribers",
                      "8 AI newsletters/month",
                      "All templates",
                      "Email support",
                      "Basic Analytics",
                    ],
                    cta: "Start Free Trial",
                  },
                  {
                    title: "Growth",
                    price: "19",
                    features: [
                      "25K subscribers",
                      "30 AI newsletters/month",
                      "Priority support",
                      "Full Analytics",
                      "Growth tools",
                    ],
                    cta: "Coming Soon",
                    featured: true,
                  },
                  {
                    title: "Pro",
                    price: "49",
                    features: [
                      "Unlimited subscribers",
                      "Unlimited AI newsletters",
                      "Priority support",
                      "Advanced Analytics",
                      "Team access",
                    ],
                    cta: "Coming Soon",
                  },
                ].map((plan, i) => (
                  <div
                    key={i}
                    className={`p-8 border rounded-xl transform hover:scale-105 transition-all duration-200 ${
                      plan.featured
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-[white]/10 bg-[white]/5"
                    }`}
                  >
                    <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                    <div className="text-4xl font-bold mb-6">
                      ${plan.price}
                      <span className="text-gray-200 text-lg">/mo</span>
                    </div>

                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-blue-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link href="/Login">
                      <Button
                        className="w-full hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
                        variant={plan.featured ? "default" : "default"}
                        disabled={plan.cta !== "Start Free Trial"}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </ShineBorder>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <InteractiveGrid
          containerClassName="absolute inset-0"
          className="opacity-30"
          points={40}
        />

        <div className="max-w-4xl mx-auto px-6 text-center">
          <ShineBorder borderClassName="border border-[white]/10 rounded-xl">
            <div className="p-12 bg-[white]/5 rounded-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Start Your Newsletter Adventure
              </h2>
              <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
                Join thousands of creators building audiences and making their
                first dollars with AI-powered newsletters.
              </p>
              <Link href="/Login">
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all duration-200">
                  Start Free Trial <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <p className="text-sm text-gray-200 mt-4">
                No credit card required
              </p>
            </div>
          </ShineBorder>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[white]/10 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center space-x-8 mb-8">
            <Link
              href="/terms-of-service"
              className="md:text-sm text-xs text-gray-200 hover:text-white transition-colors whitespace-nowrap"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="md:text-sm text-xs text-gray-200 hover:text-white transition-colors whitespace-nowrap"
            >
              Privacy Policy
            </Link>
            <Link
              href="/contact-us"
              className="md:text-sm text-xs text-gray-200 hover:text-white transition-colors whitespace-nowrap"
            >
              Contact Us
            </Link>
            <Link
              href="/credits"
              className="md:text-sm text-xs text-gray-200 hover:text-white transition-colors whitespace-nowrap"
            >
              Credits
            </Link>
          </div>

          <div className="text-center text-sm text-gray-200">
            © 2025 ClipMailo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
