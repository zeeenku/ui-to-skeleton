"use client"

import { Sheet, SheetTrigger, SheetContent, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Github, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass-effect backdrop-blur-md border-b border-cyan-100 shadow-sm">
      <div className="flex h-16 items-center justify-between p-4 md:px-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 text-cyan-500">
            <Image src="/logo.svg" alt="UI to Skeleton logo" width={32} height={32} />
          </div>
          <span className="hidden sm:inline text-xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
            UI to Skeleton
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link href="/#features" className="text-slate-600 hover:text-cyan-600 transition-colors">
            Features
          </Link>
          <Link href="/#testimonials" className="text-slate-600 hover:text-cyan-600 transition-colors">
            Testimonials
          </Link>
          <Link href="/#faq" className="text-slate-600 hover:text-cyan-600 transition-colors">
            FAQ
          </Link>
          <Link href="/#" className="text-slate-600 hover:text-cyan-600 transition-colors">
            Support
            {/* todo: add link */}
          </Link>
        </div>


        <div className="flex flex-row-reverse lg:flex-row items-center gap-1">
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
                <SheetClose asChild>
                <Link href="/#features" className="text-slate-600 hover:text-cyan-600 transition-colors text-lg font-medium">
                    Features
                </Link>
                </SheetClose>
                <SheetClose asChild>
                <Link href="/#testimonials" className="text-slate-600 hover:text-cyan-600 transition-colors text-lg font-medium">
                    Testimonials
                </Link>
                </SheetClose>
                <SheetClose asChild>
                <Link href="/#faq" className="text-slate-600 hover:text-cyan-600 transition-colors text-lg font-medium">
                    FAQ
                </Link>
                </SheetClose>
                <SheetClose asChild>
                <Link href="/#" className="text-slate-600 hover:text-cyan-600 transition-colors text-lg font-medium">
                    Support
                </Link>
                </SheetClose>
            </div>
            </SheetContent>
            </Sheet>
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
          <Button
            asChild
            className="text-xs md:text-sm bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-md"
          >
            <Link href="/studio">
                Get Started
            </Link>
          </Button>


        </div>

       
      </div>
    </header>
  )
}
