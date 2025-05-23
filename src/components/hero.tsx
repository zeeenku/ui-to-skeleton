"use client"

import { Button } from "./ui/button"
import { useState, useEffect } from "react"
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Wand2, Code, Zap, ArrowRight, CheckCircle2, Clock, Lightbulb } from "lucide-react"

export function Hero() {
  const [showEditor, setShowEditor] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Enhanced Background layer */}
      <div className="absolute -inset-1 z-0">
        <BackgroundBeamsWithCollision className="glass-effect backdrop-blur-md"  />
      </div>

      {/* Animated gradient orbs - more cyan focused */}
      <div className="absolute z-0 top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-400/40 to-cyan-300/40 opacity-75 blur-3xl animate-pulse"></div>
      <div
        className="absolute z-0 bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-cyan-300/30 to-cyan-200/30 opacity-60 blur-3xl animate-pulse"
        style={{ animationDuration: "8s" }}
      ></div>

      {/* Floating particles - more cyan */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 3 === 0 ? "bg-cyan-500" : i % 3 === 1 ? "bg-cyan-400" : "bg-cyan-300"
            }`}
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0.2 + Math.random() * 0.5,
            }}
            animate={{
              y: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              x: [Math.random() * 100 + "%", Math.random() * 100 + "%", Math.random() * 100 + "%"],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Glassmorphism foreground */}
      <div className="relative w-full min-h-screen flex items-center justify-center text-center flex-col z-10 backdrop-blur-md lg:p-16 p-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-4"
        >
          <div className="bg-cyan-100 text-cyan-800 text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm shadow-cyan-200/50">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Introducing UI to Skeleton (Alpha Release)</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mt-6 mb-6"
        >
          <span className="relative inline-flex sm:inline">
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
            <span className="relative bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
              From hours and minutes to moments ⚡
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-cyan-900 dark:text-cyan-100 max-w-[700px] text-lg mx-auto mb-8"
        >
          Transform your UI components into skeleton loaders with just a few clicks. Save development time and create
          consistent loading states for a better user experience. No more tedious skeleton coding!
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex gap-4 justify-center mb-8"
        >
          <Button
            size="lg"
            asChild
            className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-600/30 transition-all duration-300"
          >
            <Link href="/studio" className="flex items-center gap-2">
              <Wand2 className="h-4 w-4 transition-transform group-hover:rotate-12" />
              <span>Transform Your UI</span>
              <span className="absolute inset-0 w-full h-full bg-white/10 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800 transition-all duration-300"
            asChild
          >
            <Link href="/#demo" className="flex items-center gap-2">
              <span>See it in action</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </motion.div>

        {/* "Feels like AI" section with fewer emojis */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative py-4 px-6 mb-10 backdrop-blur-sm bg-cyan-50/50 dark:bg-cyan-900/20 rounded-xl border border-cyan-200 shadow-xl shadow-cyan-500/10 max-w-2xl mx-auto"
        >
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-cyan-500 text-white text-xs px-4 py-1 rounded-full font-medium">
            The Magic Behind It
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 text-white">
              <Zap className="h-6 w-6" />
            </div>
            <p className="text-cyan-900 dark:text-cyan-100 text-center md:text-left">
              <span className="font-semibold">Feels like AI magic</span>, but it&apos;s just{" "}
              <span className="inline-flex items-center px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 font-mono text-sm">
                <Code className="h-3.5 w-3.5 mr-1" />
                code
              </span>{" "}
              working behind the scenes to analyze your components and generate perfect skeleton loaders.
            </p>
          </div>
        </motion.div>

        {/* Enhanced preview video section inspired by Stripe/ClickUp */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mt-6 lg:w-3/4 mx-auto"
        >
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-cyan-400/20 rounded-full blur-xl"></div>

          {/* Feature indicators */}
          <motion.div
            className="absolute -left-4 top-1/4 bg-white rounded-lg shadow-lg p-2 z-20 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-cyan-900">Save hours of coding</span>
          </motion.div>

          <motion.div
            className="absolute -right-4 top-2/3 bg-white rounded-lg shadow-lg p-2 z-20 flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600">
              <Lightbulb className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-cyan-900">Smart component analysis</span>
          </motion.div>

          {/* Main video container */}
          <div className="relative">
            {/* Glowing border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

            {/* Browser-like frame */}
            <div className="relative rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-2xl shadow-cyan-500/20 border border-cyan-200 dark:border-cyan-800">
              {/* Browser header */}
              <div className="bg-cyan-50 dark:bg-cyan-900/30 border-b border-cyan-100 dark:border-cyan-800 p-3 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="mx-auto flex items-center bg-white dark:bg-slate-800 rounded-full px-3 py-1 text-xs text-cyan-800 dark:text-cyan-200">
                  <span>ui-to-skeleton.app</span>
                </div>
              </div>

              {/* Video content with overlay effects */}
              <div className="relative lg:h-[500px] overflow-hidden">
                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-grid-cyan/[0.05] bg-[size:20px_20px]"></div>

                {/* Animated highlights */}
                <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-cyan-500/10 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-cyan-500/10 to-transparent"></div>

                {/* Video */}
                <video className="w-full h-full object-cover" autoPlay muted loop>
                  <source src="preview.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Floating UI elements */}
                <motion.div
                  className="absolute top-10 right-10 bg-white/90 dark:bg-slate-800/90 rounded-lg shadow-lg p-3 border border-cyan-200 dark:border-cyan-800"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="text-cyan-500 w-5 h-5" />
                    <span className="text-sm font-medium text-cyan-900 dark:text-cyan-100">Generated in seconds</span>
                  </div>
                </motion.div>
              </div>

              {/* Bottom toolbar */}
              <div className="bg-cyan-50 dark:bg-cyan-900/30 border-t border-cyan-100 dark:border-cyan-800 p-3 flex justify-between items-center">
                <div className="text-xs text-cyan-600 dark:text-cyan-300">Auto-updating</div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></div>
                  <span className="text-xs text-cyan-600 dark:text-cyan-300">Live Preview</span>
                </div>
              </div>
            </div>

            {/* Decorative corner elements */}
            <div
              className="absolute -top-2 -left-2 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-75"
              style={{ animationDuration: "3s" }}
            ></div>
            <div
              className="absolute -bottom-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-75"
              style={{ animationDuration: "4s" }}
            ></div>
          </div>

          {/* Feature badges below video */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[
              { text: "Instant Generation" },
              { text: "Pixel Perfect" },
              { text: "Live Updates" },
              { text: "Responsive Ready" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1, duration: 0.5 }}
                className="bg-cyan-100/80 backdrop-blur-sm text-cyan-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {feature.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
