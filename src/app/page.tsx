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
import { AccordionItem } from "@/features/home/components/faq-accordion"
import { CTA } from "@/features/home/components/cta"
import { FAQ } from "@/features/home/components/faq"

export default function Home() {

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


              <FAQ/>

              <CTA/>
            
              <Footer/>
          </div>


      </main>

    </div>
  )
}
