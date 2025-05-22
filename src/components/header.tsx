"use client"

import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Github, Menu, DiscIcon as Discord, ArrowLeft, Home, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export function Header({ isHome = false }: { isHome?: boolean }) {
  const [showHeader, setShowHeader] = useState(true)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const pathname = usePathname()

  let lastScrollY = 0

  const handleScroll = () => {
    const currentScrollY = window.scrollY
    const documentHeight = document.documentElement.scrollHeight
    const windowHeight = window.innerHeight

    if (currentScrollY + windowHeight >= documentHeight) {
      setShowHeader(false)
      return
    }

    if (currentScrollY === 0) {
      setShowHeader(true)
      return
    }

    if (currentScrollY > lastScrollY) {
      setShowHeader(false)
    } else if (currentScrollY <= lastScrollY) {
      setShowHeader(true)
    }

    lastScrollY = currentScrollY
  }

  useEffect(() => {
    const throttleScroll = handleScroll //debounce(handleScroll, 20);
    window.addEventListener("scroll", throttleScroll)
    return () => {
      window.removeEventListener("scroll", throttleScroll)
    }
  }, [])

  const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }

  // Get page context for non-home pages
  const getPageContext = () => {
    if (isHome) return null

    const paths = pathname.split("/").filter(Boolean)
    if (paths.length === 0) return null

    const currentPage = paths[paths.length - 1]
    return {
      name: currentPage.charAt(0).toUpperCase() + currentPage.slice(1),
      path: pathname,
    }
  }

  const pageContext = getPageContext()

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: showHeader ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-full sticky z-50 top-0"
    >
      <header className="glass-effect backdrop-blur-md border-b border-cyan-100 shadow-sm">
        <div className="flex h-16 items-center justify-between p-4 lg:px-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="h-8 w-8 text-cyan-500 relative"
            >
              <Image src="/logo.svg" alt="UI to Skeleton logo" width={32} height={32} />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="absolute inset-0 bg-cyan-400 rounded-full blur-lg"
              />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="hidden sm:inline text-xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent"
            >
              UI to Skeleton
            </motion.span>
          </Link>

          {/* Page Context (for non-home pages) */}
          {!isHome && pageContext && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center gap-2"
            >
              <Link href="/" className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 transition-colors">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <span className="text-slate-400">/</span>
              <div className="flex items-center gap-1 bg-cyan-50 px-2 py-1 rounded-md border border-cyan-100">
                <Sparkles className="h-3.5 w-3.5 text-cyan-500" />
                <span className="text-cyan-800 font-medium">{pageContext.name}</span>
              </div>
            </motion.div>
          )}

          {/* Desktop Nav */}
          {isHome ? (
            <>
              <div className="hidden lg:flex items-center space-x-6">
                {["Features", "Testimonials", "FAQ", "Support"].map((item) => (
                  <Link
                    key={item}
                    href={`/#${item.toLowerCase()}`}
                    className="text-slate-600 hover:text-cyan-600 transition-colors relative py-1"
                    onMouseEnter={() => setHoveredItem(item)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item}
                    <AnimatePresence>
                      {hoveredItem === item && (
                        <motion.span
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: "100%", opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-0 left-0 h-0.5 bg-cyan-500"
                        />
                      )}
                    </AnimatePresence>
                  </Link>
                ))}
              </div>

              <div className="flex flex-row-reverse lg:flex-row items-center gap-2">
                {/* Mobile Menu */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="hover:bg-white lg:hidden" size="sm">
                      <Menu className="h-6 w-6 text-cyan-600" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[260px] p-4">
                    <div className="flex flex-col space-y-4 mt-4">
                      {["Features", "Testimonials", "FAQ", "Support"].map((item) => (
                        <SheetClose key={item} asChild>
                          <Link
                            href={`/#${item.toLowerCase()}`}
                            className="text-slate-600 hover:text-cyan-600 transition-colors text-lg font-medium"
                          >
                            {item}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Discord Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" className="hover:bg-white" size="sm" asChild>
                    <Link
                      href="https://discord.gg/ui-to-skeleton"
                      target="_blank"
                      className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors"
                    >
                      <Discord className="h-5 w-5" />
                      <span className="hidden lg:inline">Discord</span>
                    </Link>
                  </Button>
                </motion.div>

                {/* GitHub Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="ghost" className="hover:bg-white" size="sm" asChild>
                    <Link
                      href="https://github.com/zeeenku/ui-to-skeleton"
                      target="_blank"
                      className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span className="hidden lg:inline">GitHub</span>
                    </Link>
                  </Button>
                </motion.div>

                {/* Get Started Button */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-md blur opacity-0 group-hover:opacity-75 transition duration-200"></div>
                  <Button
                    asChild
                    className="relative text-xs md:text-sm bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-md"
                  >
                    <Link href="/studio">Get Started</Link>
                  </Button>
                </motion.div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">

              {/* Discord Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" className="hover:bg-white" size="sm" asChild>
                  <Link
                    href="https://discord.gg/ui-to-skeleton"
                    target="_blank"
                    className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors"
                  >
                    <Discord className="h-5 w-5" />
                    <span className="hidden lg:inline">Discord</span>
                  </Link>
                </Button>
              </motion.div>

              {/* GitHub Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" className="hover:bg-white" size="sm" asChild>
                  <Link
                    href="https://github.com/zeeenku/ui-to-skeleton"
                    target="_blank"
                    className="flex items-center gap-2 text-slate-600 hover:text-cyan-600 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    <span className="hidden lg:inline">GitHub</span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </header>

      {/* Ad Banner */}
      {!isHome && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 backdrop-blur-sm p-3 text-center text-sm text-slate-700 border-b border-cyan-200/30"
        >
          <span className="font-medium">Sponsored:</span> Try our new premium templates for advanced skeleton loaders
        </motion.div>
      )}
    </motion.div>
  )
}
