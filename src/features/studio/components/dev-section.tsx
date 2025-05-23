"use client"
import Image from "next/image";
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DeveloperBio() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="w-full py-12 bg-gradient-to-br from-sky-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="relative backdrop-blur-md bg-white/70 dark:bg-slate-900/70 rounded-xl overflow-hidden border border-sky-100 dark:border-sky-900/30 shadow-lg">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-sky-400/10 dark:bg-sky-500/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-400/10 dark:bg-cyan-500/10 rounded-full blur-2xl"></div>

          <div className="grid md:grid-cols-[180px_1fr] gap-6 p-5">
            {/* Profile image and social links */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center md:items-start gap-4"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full blur opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                <Image
                width={128} height={128}
                  src="/placeholder.svg?height=180&width=180"
                  alt="Developer Profile"
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-white/80 dark:border-slate-700/50 shadow-md relative z-10"
                />
              </div>

              <div className="flex gap-2 mt-1">
                {[
                  { icon: <Github className="h-4 w-4" />, href: "https://github.com/username", label: "GitHub" },
                  { icon: <Twitter className="h-4 w-4" />, href: "https://twitter.com/username", label: "Twitter" },
                  {
                    icon: <Linkedin className="h-4 w-4" />,
                    href: "https://linkedin.com/in/username",
                    label: "LinkedIn",
                  },
                  { icon: <ExternalLink className="h-4 w-4" />, href: "https://paletui.com", label: "Website" },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    <Link href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-sky-100/50 dark:border-slate-700/50 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all duration-200"
                      >
                        {social.icon}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Bio content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <div className="space-y-3">
                <div>
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-xl md:text-2xl font-bold text-sky-600 dark:text-sky-400"
                  >
                    Youssef El Azizi
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-sm text-slate-500 dark:text-slate-400"
                  >
                    @youssefdev
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    Hacking{" "}
                    <Link href="https://paletui.com" className="text-sky-600 dark:text-sky-400 hover:underline">
                      paletui.com
                    </Link>
                    . Young Moroccan Programmer. On my journey to discover what does it mean to be strong.
                  </p>

                  <p className="text-xs mt-2 text-slate-500 dark:text-slate-400">
                    Building tools that empower designers and developers to create beautiful interfaces effortlessly.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="pt-1"
                >
                  <Link href="https://paletui.com" target="_blank" rel="noopener noreferrer">
                    <Button className="h-8 text-xs bg-sky-500 hover:bg-sky-600 text-white">Explore My Work</Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
