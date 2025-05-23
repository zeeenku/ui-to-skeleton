"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion, useAnimation, useInView } from "framer-motion"
import { Wand2, Github } from "lucide-react"

export function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <div className="px-4">
    <div className="container px-4 py-16 relative" ref={ref}>
      {/* Animated background blobs - Fixed z-index */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            opacity: [0, 0.7, 0.4],
            transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
          },
        }}
        className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl -z-10 pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          visible: {
            opacity: [0, 0.5, 0.2],
            transition: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 },
          },
        }}
        className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl -z-10 pointer-events-none"
      />

      {/* Floating particles - Fixed z-index and pointer events */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={controls}
          variants={{
            visible: {
              opacity: [0, 0.6, 0],
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * -100],
              transition: {
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              },
            },
          }}
          className="absolute w-2 h-2 rounded-full bg-white -z-10 pointer-events-none"
          style={{
            left: `${Math.random() * 90}%`,
            top: `${Math.random() * 80}%`,
          }}
        />
      ))}

      {/* CTA Box - Proper z-index */}
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              staggerChildren: 0.2,
            },
          },
        }}
        className="relative bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl p-8 md:p-12 shadow-xl max-w-5xl mx-auto text-center text-white z-20 overflow-hidden"
      >
        {/* Grid background - Behind content */}
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:20px_20px] pointer-events-none" />

        {/* Corner accents - Behind content */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, delay: 0.6 },
            },
          }}
          className="absolute top-0 left-0 w-16 h-16 pointer-events-none"
        >
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, delay: 0.7 },
            },
          }}
          className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none"
        >
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30 rounded-br-lg" />
        </motion.div>

        {/* Content - Proper z-index */}
        <div className="relative z-10">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5 },
              },
            }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to transform your loading experience?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.1 },
              },
            }}
            className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
          >
            Be part of thousands of developers designing beautiful skeleton loaders in just moments, not hours.
          </motion.p>

          {/* Buttons - Highest z-index */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, delay: 0.2 },
              },
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center relative z-30"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-white block text-cyan-700 hover:bg-cyan-50 group relative z-40" asChild>
                <Link href="/studio" className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 transition-transform group-hover:rotate-12" />
                  <span>Get Your Skeleton</span>
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-slate-900  flex items-center gap-2 relative z-40"
              >
                <a
                  href="https://github.com/zeeenku/ui-to-skeleton/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                  <span>I have an Issue</span>
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
    </div>
  )
}
