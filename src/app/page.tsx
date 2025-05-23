"use client"

import { useState, useEffect } from "react"
import { Github, Zap, Palette, Code, Clock, Sparkles, Layers, Repeat, Smartphone } from "lucide-react"
import Link from "next/link"
import Image from "next/image" 
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import CodeEditor from "@/components/code-editor"
import { useLocalStorage } from "@/hooks/use-local-storage"
import DemoAnimation from "@/components/demo-animation"
import TestimonialCard from "@/components/testimonial-card"
import PricingCard from "@/components/pricing-card"
import SupportedTools from "@/components/supported-tools"
import FloatingShapes from "@/components/floating-shapes"
import FeatureCard from "@/components/feature-card"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Demo } from "@/components/demo"
import { Comparaison } from "@/components/comparaison"
import { Features } from "@/components/features"
import { Footer } from "@/features/home/components/footer"
import { AccordionItem } from "@/components/faq-accordion"
import { CTA } from "@/features/home/components/cta"

export default function Home() {
  const [showEditor, setShowEditor] = useState(false)
  const [usageCount, setUsageCount] = useLocalStorage("usageCount", 0)

  useEffect(() => {
    setUsageCount((prev) => prev + 1)
  }, [])


  const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    company: "TechCorp",
    quote: "UI to Skeleton saved me hours of development time. Now I can create beautiful loading states in seconds!",
    rating: 5,
    imageSrc: "/placeholder.svg?height=48&width=48"
  },
  {
    name: "Michael Chen",
    role: "UI Engineer",
    company: "DesignLabs",
    quote: "The customization options are incredible. I can match our brand perfectly and create consistent experiences.",
    rating: 5,
    imageSrc: "/placeholder.svg?height=48&width=48"
  },
  {
    name: "Emily Rodriguez",
    role: "Full Stack Developer",
    company: "StartupX",
    quote: "This tool has become an essential part of my workflow. I can't imagine going back to manually coding skeletons.",
    rating: 4,
    imageSrc: "/placeholder.svg?height=48&width=48"
  }
];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-cyan-50 bg-dot-pattern relative">
      <FloatingShapes />

     <Header isHome={true} />

      <main className="w-full flex-1 relative z-10">
        {!showEditor ? (
          <div className="w-full flex flex-col items-center justify-center space-y-24">

            <div className="space-y-8">
              <Hero/>
              <SupportedTools />
            </div>


            {/* Demo Section */}
            <div className="space-y-8">
              <Demo/>
              <Comparaison/>
            </div>

            <Features/>

            {/* Testimonials Section */}
            <div className="max-w-6xl  lg:px-16 px-4" id="testimonials">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">Loved by Developers</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  See what other developers are saying about UI to Skeleton
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    name={testimonial.name}
                    role={testimonial.role}
                    company={testimonial.company}
                    quote={testimonial.quote}
                    rating={testimonial.rating}
                    imageSrc={testimonial.imageSrc}
                  />
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="container px-4" id="faq">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gradient mb-4">Frequently Asked Questions</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Got questions? We've got answers</p>
              </div>

              <div className="max-w-3xl mx-auto space-y-6">
                  <AccordionItem title={<h3>What is a skeleton loader?</h3>}>
                    A skeleton loader is a placeholder that mimics the layout of content while it's loading. It provides a better user experience than traditional spinners or loading indicators.
                  </AccordionItem>

                  <AccordionItem title={<h3>Which frameworks are supported?</h3>}>
                    UI to Skeleton works with all major frontend frameworks including React, Vue, Angular, and vanilla HTML/CSS.
                  </AccordionItem>

                  <AccordionItem title={<h3>Can I customize the animations?</h3>}>
                    Yes! You can customize the animation type, speed, and other properties to match your design system.
                  </AccordionItem>

                  <AccordionItem title={<h3>Is there an API available?</h3>}>
                    Yes, API access is available on the Team plan, allowing you to integrate skeleton generation directly into your workflow.
                  </AccordionItem>
              </div>
            </div>

            {/* CTA Section
            <div className="container px-4">
              <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl p-8 md:p-12 shadow-xl max-w-5xl mx-auto text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to transform your loading experience?</h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  Be part of thousands of developers designing beautiful skeleton loaders in just moments, not hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-cyan-700 hover:bg-cyan-50"
                    asChild
                  >
                    <Link href="/studio">
                      Get Your Skeleton 
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-cyan-700 hover:bg-white/10">
                    <a href="https://github.com/zeeenku/ui-to-skeleton/issues/new">I have an Issue</a>
                  </Button>
                </div>
              </div>
            </div> */}


              <CTA/>
            {/* <Alert className="max-w-lg bg-cyan-50 border-cyan-200 text-cyan-800">
              <AlertDescription>
                This is the first version of UI to Skeleton. More features will be added in future updates.
              </AlertDescription>
            </Alert> */}

            
    <Footer/>
          </div>
        ) : (
          <CodeEditor />
        )}

      </main>

    </div>
  )
}
