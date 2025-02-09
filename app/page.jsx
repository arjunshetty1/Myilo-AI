// import { Button } from "@/components/ui/button"
import { InteractiveGrid } from "@/components/UI/custom-ui/interactive-grid"
import { ShineBorder } from "@/components/UI/custom-ui/shine-border"
import { Button } from "@/components/UI/shadcn-ui/button"
import { Play, Check, Star, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-16 overflow-hidden">
        <InteractiveGrid containerClassName="absolute inset-0" className="opacity-30" points={40} />
        
        <ShineBorder className="relative z-10 max-w-6xl mx-auto px-6" borderClassName="border border-white/10 rounded-xl">
          <div className="text-center mb-16 px-4">
            <div className="mb-8 flex items-center justify-center gap-2 bg-white/5 rounded-full py-1 px-4 w-fit mx-auto">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">Rated 4.9/5 by 5,000+ creators</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Empowering 10,000+ Newsletter Creators
            </h1>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Create Stunning Newsletters with AI - Build your audience, save time, and turn your passion into profit in just minutes.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                Start Free Trial
              </Button>
              <Button variant="outline" className="gap-2 border-white/10 bg-white/5 hover:bg-white/10">
                <Play className="w-4 h-4" />
                Watch Demo
              </Button>
            </div>
          </div>

          <ShineBorder className="mx-auto" borderClassName="border border-white/10 rounded-xl">
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
        <InteractiveGrid containerClassName="absolute inset-0" className="opacity-30" points={40} />
        
        <div className="max-w-6xl mx-auto px-6">
          <ShineBorder borderClassName="border border-white/10 rounded-xl">
            <div className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Everything You Need to Get Started</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: 'AI-Powered Content', desc: 'Transform ideas into engaging newsletters in minutes' },
                  { title: 'Premium Templates', desc: 'Professionally designed templates with easy customization' },
                  { title: 'One-Click Publishing', desc: 'Publish in three clicks with built-in email service' },
                  { title: 'Audience Growth Tools', desc: 'Comprehensive toolkit for organic community building' },
                  { title: 'Visual Analytics', desc: 'Beautiful dashboards for data-driven decisions' },
                  { title: 'Expert Support', desc: 'Guides, tutorials, and responsive support' },
                ].map((feature, i) => (
                  <div key={i} className="p-6 border border-white/10 rounded-xl bg-white/5">
                    <Check className="w-8 h-8 mb-4 mx-auto text-blue-500" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.desc}</p>
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
          <ShineBorder borderClassName="border border-white/10 rounded-xl">
            <div className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-16">Create in 3 Simple Steps</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { step: '1', title: 'Share Your Idea', desc: 'Write/pick your topic, industry, and audience preferences' },
                  { step: '2', title: 'Choose Style', desc: 'Select templates and let AI craft your content' },
                  { step: '3', title: 'Review & Send', desc: 'Quick edit and share with subscribers' },
                ].map((step, i) => (
                  <div key={i} className="p-8 border border-white/10 rounded-xl bg-white/5">
                    <div className="w-12 h-12 mb-6 mx-auto bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold">{step.step}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                    <p className="text-gray-400">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </ShineBorder>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-20 overflow-hidden">
        <InteractiveGrid containerClassName="absolute inset-0" className="opacity-30" points={40} />
        
        <div className="max-w-6xl mx-auto px-6">
          <ShineBorder borderClassName="border border-white/10 rounded-xl">
            <div className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-16">Start Free, Upgrade as You Grow</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    title: 'Starter',
                    price: '0',
                    features: ['500 subscribers', '8 AI newsletters/month', 'All templates', 'Email support', 'Basic Analytics'],
                    cta: 'Start Free Trial'
                  },
                  { 
                    title: 'Growth',
                    price: '19',
                    features: ['25K subscribers', '30 AI newsletters/month', 'Priority support', 'Full Analytics', 'Growth tools'],
                    cta: 'Coming Soon',
                    featured: true
                  },
                  { 
                    title: 'Pro',
                    price: '49',
                    features: ['Unlimited subscribers', 'Unlimited AI newsletters', 'Priority support', 'Advanced Analytics', 'Team access'],
                    cta: 'Coming Soon'
                  },
                ].map((plan, i) => (
                  <div key={i} className={`p-8 border rounded-xl ${plan.featured ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-white/5'}`}>
                    <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                    <div className="text-4xl font-bold mb-6">${plan.price}<span className="text-gray-400 text-lg">/mo</span></div>
                    
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <Check className="w-5 h-5 text-blue-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      variant={plan.featured ? 'default' : 'outline'}
                      disabled={plan.cta !== 'Start Free Trial'}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </ShineBorder>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <InteractiveGrid containerClassName="absolute inset-0" className="opacity-30" points={40} />
        
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ShineBorder borderClassName="border border-white/10 rounded-xl">
            <div className="p-12 bg-white/5 rounded-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Newsletter Adventure</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of creators building audiences and making their first dollars with AI-powered newsletters.
              </p>
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
              <p className="text-sm text-gray-400 mt-4">No credit card required</p>
            </div>
          </ShineBorder>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ClipMailo</h3>
            <p className="text-gray-400 text-sm">Empowering creators since 2024</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#">Features</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Testimonials</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#">Blog</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          © 2024 ClipMailo. All rights reserved.
        </div>
      </footer>
    </div>
  )
}