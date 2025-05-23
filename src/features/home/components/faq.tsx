"use client"
import { AccordionItem } from "@/features/home/components/faq-accordion"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface FAQItem {
  question: string
  answer: string
}

const faqQuestions: FAQItem[] = [
  {
    question: "What is a skeleton loader?",
    answer:
      "A skeleton loader is a placeholder that mimics the layout of content while it's loading. It provides a better user experience than traditional spinners or loading indicators by showing users what to expect.",
  },
  {
    question: "Which frameworks are supported?",
    answer:
      "UI to Skeleton works with all major frontend frameworks including React, Vue, Angular, Svelte, and vanilla HTML/CSS. We also support popular CSS frameworks like Tailwind CSS and Bootstrap.",
  },
  {
    question: "Can I customize the animations?",
    answer:
      "Yes! You can customize the animation type, speed, duration, and other properties to match your design system. Choose from pulse, wave, shimmer, and fade animations with adjustable timing.",
  },
  {
    question: "Is there an API available?",
    answer:
      "Yes, API access is available on the Team plan, allowing you to integrate skeleton generation directly into your workflow. Generate skeletons programmatically and automate your development process.",
  },
  {
    question: "How accurate are the generated skeletons?",
    answer:
      "Our AI-powered analysis creates pixel-perfect skeleton loaders that match your component structure. The system analyzes layout, spacing, and content hierarchy to generate accurate placeholders.",
  },
  {
    question: "Can I use this for commercial projects?",
    answer:
      "All generated skeleton loaders can be used in commercial projects. The code is yours to use, modify, and distribute as needed for your applications.",
  },
]

export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const controls = useAnimation()
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0])) // First item open by default

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time between each child animation
        delayChildren: 0.3, // Initial delay before starting children animations
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const accordionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.6 + i * 0.1, // Increasing delay for each accordion item
      },
    }),
  }

  return (
    <div className="container px-4" id="faq" ref={ref}>
      <motion.div initial="hidden" animate={controls} variants={containerVariants} className="text-center mb-12">
        <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gradient mb-4">
          Frequently Asked Questions
        </motion.h2>
        <motion.p variants={itemVariants} className="text-slate-600 max-w-2xl mx-auto">
          Got questions? We've got answers
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-3xl mx-auto space-y-6"
      >
        {faqQuestions.map((item, index) => (
          <motion.div key={index} custom={index} variants={accordionVariants} initial="hidden" animate={controls}>
            <AccordionItem title={item.question}>{item.answer}</AccordionItem>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
