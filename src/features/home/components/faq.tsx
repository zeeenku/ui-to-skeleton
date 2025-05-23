"use client"
import { AccordionItem } from "@/features/home/components/faq-accordion"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { faqQuestions } from "../constants"


export function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])



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
