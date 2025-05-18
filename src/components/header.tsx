import { Github } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image" 
import Link from "next/link"

export function Header(){
    return(
         <header className="sticky top-0 z-50 glass-effect backdrop-blur-md border-b border-cyan-100 shadow-sm">
        <div className="flex h-16 items-center justify-between p-4 md:px-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 text-cyan-500" >
              <Image src="./logo.svg" alt="UI to Skeleton logo" width={32} height={32} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
              UI to Skeleton
            </span>
          </Link>
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
              onClick={() => {}}
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-md"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>
    );
}