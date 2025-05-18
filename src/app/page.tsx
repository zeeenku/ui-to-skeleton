"use client"

import { useState, useEffect } from "react"
import { Github, Zap, Palette, Code, Clock, Sparkles, Layers, Repeat, Smartphone } from "lucide-react"
import Link from "next/link"
import Image from "next/image" 
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import CodeEditor from "@/components/code-editor"
import Logo from "@/components/logo"
import { useLocalStorage } from "@/hooks/use-local-storage"
import DemoAnimation from "@/components/demo-animation"
import TestimonialCard from "@/components/testimonial-card"
import PricingCard from "@/components/pricing-card"
import StatsSection from "@/components/stats-section"
import IntegrationsSection from "@/components/integrations-section"
import FloatingShapes from "@/components/floating-shapes"
import FeatureCard from "@/components/feature-card"

export default function Home() {
  const [showEditor, setShowEditor] = useState(false)
  const [usageCount, setUsageCount] = useLocalStorage("usageCount", 0)

  useEffect(() => {
    setUsageCount((prev) => prev + 1)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-cyan-50 bg-dot-pattern relative">
      <FloatingShapes />

      <header className="sticky top-0 z-50 glass-effect backdrop-blur-md border-b border-cyan-100 shadow-sm">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8 text-cyan-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
              UI to Skeleton
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-slate-600 hover:text-cyan-600 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-slate-600 hover:text-cyan-600 transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-slate-600 hover:text-cyan-600 transition-colors">
              Testimonials
            </Link>
            <Link href="#faq" className="text-slate-600 hover:text-cyan-600 transition-colors">
              FAQ
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/username/ui-to-skeleton"
              target="_blank"
              className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="hidden sm:inline">GitHub</span>
            </Link>
            <Button
              onClick={() => setShowEditor(true)}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-md"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {!showEditor ? (
          <div className="flex flex-col items-center justify-center space-y-16 py-16">
            {/* Hero Section */}
            <div className="container text-center px-4">
              <div className="inline-block mb-4">
                <div className="bg-cyan-100 text-cyan-800 text-xs font-medium px-3 py-1 rounded-full">
                  ✨ Introducing UI to Skeleton v1.0
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 opacity-75 blur-xl"></div>
                <Logo className="relative h-24 w-24 text-cyan-500 mx-auto" />
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gradient mt-6 mb-6">
                From hours and minutes to moments
              </h1>

              <p className="text-slate-600 max-w-[700px] text-lg mx-auto mb-8">
                Transform your UI components into skeleton loaders with just a few clicks. Save development time and
                create consistent loading states for a better user experience.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  size="lg"
                  onClick={() => setShowEditor(true)}
                  className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-600/30 transition-all"
                >
                  Start Building
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="bg-white rounded-lg px-6 py-3 shadow-md border border-cyan-100 text-sm inline-block">
                Used by <span className="font-bold text-cyan-600">{usageCount}</span> developers worldwide
              </div>
            </div>

            {/* Demo Section */}
            <div className="w-full max-w-6xl mx-auto px-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-600 opacity-20 blur-xl rounded-xl"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-cyan-100 p-6">
                  <div className="absolute top-3 right-3 bg-cyan-500 text-white text-xs px-2 py-1 rounded-full">
                    Live Demo
                  </div>
                  <h3 className="text-lg font-semibold mb-4 text-slate-800">See it in action</h3>
                  <div className="mt-2">
                    <DemoAnimation />
                  </div>
                </div>
                <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-cyan-100 p-6">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-slate-800">How it works</h3>
                      <ol className="space-y-3 text-left text-slate-600">
                        <li className="flex gap-2">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 font-medium text-sm">
                            1
                          </span>
                          <span>Paste your UI component code</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 font-medium text-sm">
                            2
                          </span>
                          <span>Customize skeleton appearance</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 font-medium text-sm">
                            3
                          </span>
                          <span>Generate your skeleton loader</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-cyan-100 text-cyan-800 font-medium text-sm">
                            4
                          </span>
                          <span>Copy the code and use it in your project</span>
                        </li>
                      </ol>
                    </div>
                    <div className="mt-6">
                      <img
                        src="/placeholder.svg?height=200&width=400"
                        alt="UI to Skeleton Demo"
                        className="w-full h-auto rounded-md border border-slate-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="container px-4">
              <StatsSection />
            </div>

            {/* Say Goodbye Section */}
            <div className="container px-4">
              <div className="bg-gradient-to-r from-cyan-50 to-white p-8 rounded-xl border border-cyan-100 max-w-4xl mx-auto shadow-lg">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Say Goodbye to Ugly Loaders</h2>
                <p className="text-slate-600 text-lg mb-4">
                  No more spinning wheels or bouncing dots. Create beautiful, content-aware skeleton loaders that
                  enhance your user experience in moments, not hours.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-red-100 rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-500"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800">Ugly Spinners</h3>
                      <p className="text-slate-500 text-sm">Generic loaders that don't match your UI</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-green-100 rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800">Beautiful Skeletons</h3>
                      <p className="text-slate-500 text-sm">Content-aware loaders that match your design</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-red-100 rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-red-500"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800">Hours of Coding</h3>
                      <p className="text-slate-500 text-sm">Wasting time on loading states</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-green-100 rounded-full p-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-500"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800">Moments to Generate</h3>
                      <p className="text-slate-500 text-sm">Create loaders in seconds, not hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="container px-4" id="features">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">Powerful Features</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Everything you need to create beautiful skeleton loaders for your applications
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <FeatureCard
                  title="Lightning Fast"
                  description="Generate skeleton loaders in seconds, not hours."
                  icon={Zap}
                />
                <FeatureCard
                  title="Customizable"
                  description="Tailor your skeletons to match your brand and design system."
                  icon={Palette}
                />
                <FeatureCard
                  title="Developer Friendly"
                  description="Built for developers, by developers. Easy to integrate."
                  icon={Code}
                />
                <FeatureCard
                  title="Time Saving"
                  description="Focus on building features, not loading states."
                  icon={Clock}
                />
                <FeatureCard
                  title="Beautiful Results"
                  description="Create professional, polished loading experiences."
                  icon={Sparkles}
                />
                <FeatureCard
                  title="Framework Agnostic"
                  description="Works with React, Vue, Angular, and more."
                  icon={Layers}
                />
                <FeatureCard
                  title="Reusable Components"
                  description="Create once, use everywhere in your application."
                  icon={Repeat}
                />
                <FeatureCard
                  title="Responsive Design"
                  description="Skeletons that look great on any device."
                  icon={Smartphone}
                />
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 rounded-xl shadow-lg text-white">
                  <h3 className="text-lg font-semibold mb-2">Pro Features Coming Soon</h3>
                  <p className="mb-4">
                    We're constantly adding new features to make your development experience even better.
                  </p>
                  <Button variant="secondary" className="bg-white text-cyan-700 hover:bg-cyan-50">
                    Join Waitlist
                  </Button>
                </div>
              </div>
            </div>

            {/* Integrations Section */}
            <div className="container px-4">
              <IntegrationsSection />
            </div>

            {/* Testimonials Section */}
            <div className="container px-4" id="testimonials">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">Loved by Developers</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  See what other developers are saying about UI to Skeleton
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <TestimonialCard
                  name="Sarah Johnson"
                  role="Frontend Developer"
                  company="TechCorp"
                  quote="UI to Skeleton saved me hours of development time. Now I can create beautiful loading states in seconds!"
                  rating={5}
                  imageSrc="/placeholder.svg?height=48&width=48"
                />
                <TestimonialCard
                  name="Michael Chen"
                  role="UI Engineer"
                  company="DesignLabs"
                  quote="The customization options are incredible. I can match our brand perfectly and create consistent experiences."
                  rating={5}
                  imageSrc="/placeholder.svg?height=48&width=48"
                />
                <TestimonialCard
                  name="Emily Rodriguez"
                  role="Full Stack Developer"
                  company="StartupX"
                  quote="This tool has become an essential part of my workflow. I can't imagine going back to manually coding skeletons."
                  rating={4}
                  imageSrc="/placeholder.svg?height=48&width=48"
                />
              </div>
            </div>

            {/* Pricing Section */}
            <div className="container px-4" id="pricing">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">Simple, Transparent Pricing</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Start for free, upgrade when you need more features</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <PricingCard
                  title="Free"
                  price="Free"
                  description="Perfect for getting started with skeleton loaders"
                  features={[
                    "Basic skeleton generation",
                    "5 skeleton templates",
                    "Standard customization options",
                    "Community support",
                  ]}
                  ctaText="Get Started"
                />
                <PricingCard
                  title="Pro"
                  price="$9"
                  description="For professional developers who need more options"
                  features={[
                    "Advanced skeleton generation",
                    "Unlimited templates",
                    "Advanced customization",
                    "Export to multiple frameworks",
                    "Priority support",
                  ]}
                  isPopular={true}
                  ctaText="Upgrade to Pro"
                />
                <PricingCard
                  title="Team"
                  price="$29"
                  description="For teams working on multiple projects"
                  features={[
                    "Everything in Pro",
                    "Team collaboration",
                    "Shared templates",
                    "Custom branding",
                    "API access",
                    "Dedicated support",
                  ]}
                  ctaText="Contact Sales"
                />
              </div>

              <div className="mt-12 text-center">
                <p className="text-slate-500 mb-4">Need a custom plan for your enterprise?</p>
                <Button variant="outline" className="border-cyan-300 text-cyan-700 hover:bg-cyan-50">
                  Contact Us
                </Button>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="container px-4" id="faq">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">Frequently Asked Questions</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Got questions? We've got answers</p>
              </div>

              <div className="max-w-3xl mx-auto space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-md border border-cyan-100">
                  <h3 className="text-lg font-semibold mb-2">What is a skeleton loader?</h3>
                  <p className="text-slate-600">
                    A skeleton loader is a placeholder that mimics the layout of content while it's loading. It provides
                    a better user experience than traditional spinners or loading indicators.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-cyan-100">
                  <h3 className="text-lg font-semibold mb-2">Which frameworks are supported?</h3>
                  <p className="text-slate-600">
                    UI to Skeleton works with all major frontend frameworks including React, Vue, Angular, and vanilla
                    HTML/CSS.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-cyan-100">
                  <h3 className="text-lg font-semibold mb-2">Can I customize the animations?</h3>
                  <p className="text-slate-600">
                    Yes! You can customize the animation type, speed, and other properties to match your design system.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-cyan-100">
                  <h3 className="text-lg font-semibold mb-2">Is there an API available?</h3>
                  <p className="text-slate-600">
                    Yes, API access is available on the Team plan, allowing you to integrate skeleton generation
                    directly into your workflow.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="container px-4">
              <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl p-8 md:p-12 shadow-xl max-w-5xl mx-auto text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your loading experience?</h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  Join thousands of developers who are creating beautiful skeleton loaders in moments, not hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    onClick={() => setShowEditor(true)}
                    className="bg-white text-cyan-700 hover:bg-cyan-50"
                  >
                    Start Building Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Schedule a Demo
                  </Button>
                </div>
              </div>
            </div>

            <Alert className="max-w-lg bg-cyan-50 border-cyan-200 text-cyan-800">
              <AlertDescription>
                This is the first version of UI to Skeleton. More features will be added in future updates.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <CodeEditor />
        )}
      </main>

      <footer className="border-t py-12 bg-white relative z-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Logo className="h-6 w-6 text-cyan-500" />
                <span className="text-lg font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                  UI to Skeleton
                </span>
              </div>
              <p className="text-slate-500 max-w-md mb-4">
                An open-source tool to help developers create beautiful skeleton loaders for their UI components.
              </p>
              <div className="flex gap-4 mb-6">
                <Link
                  href="https://twitter.com/username"
                  target="_blank"
                  className="text-slate-400 hover:text-cyan-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </Link>
                <Link
                  href="https://github.com/username"
                  target="_blank"
                  className="text-slate-400 hover:text-cyan-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </Link>
                <Link
                  href="https://discord.com/users/username"
                  target="_blank"
                  className="text-slate-400 hover:text-cyan-500 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                </Link>
              </div>
              <p className="text-sm text-slate-400">
                &copy; {new Date().getFullYear()} UI to Skeleton. All rights reserved.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-slate-500 hover:text-cyan-600 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-500 hover:text-cyan-600 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-500 hover:text-cyan-600 transition-colors">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-500 hover:text-cyan-600 transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-slate-500 hover:text-cyan-600 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-500 hover:text-cyan-600 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-500 hover:text-cyan-600 transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-slate-500 hover:text-cyan-600 transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-cyan-200">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Developer"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-slate-800">Developer Name</p>
                <p className="text-sm text-slate-500">Frontend Developer</p>
              </div>
            </div>

            <div className="mt-4 md:mt-0">
              <Button variant="outline" className="border-cyan-300 text-cyan-700 hover:bg-cyan-50">
                Contact Developer
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
