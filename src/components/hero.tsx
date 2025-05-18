"use client";

import { Button } from "./ui/button";
import { useState } from "react";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import Link from "next/link";

export function Hero() {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background layer */}
      <div className="absolute -inset-1 z-0 lg:p-16 p-4">
        <BackgroundBeamsWithCollision className="glass-effect backdrop-blur-md" children={undefined} />
      </div>

      <div className="absolute z-0 -inset-1 rounded-full bg-gradient-to-br from-cyan-50 to-slate-50 opacity-75 blur-xl"></div>

      {/* Glassmorphism foreground */}
      <div className="relative w-full min-h-screen flex items-center justify-center text-center flex-col z-10 backdrop-blur-md lg:p-16 p-4">
        <div className="inline-block mb-4">
          <div className="bg-cyan-100 text-cyan-800 text-xs font-medium px-3 py-1 rounded-full">
            ✨ Introducing UI to Skeleton (Alpha Release)
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gradient mt-6 mb-6">
          <span className="relative inline-flex sm:inline">
            <span className="bg-gradient-to-r from-cyan-300 to-cyan-500 blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
            <span className="relative text-gradient">From hours and minutes to moments</span>
          </span>
        </h1>

        <p className="text-slate-500 max-w-[700px] text-lg mx-auto mb-8">
          Transform your UI components into skeleton loaders with just a few clicks. Save development time and
          create consistent loading states for a better user experience.
        </p>

        <div className="flex gap-4 justify-center mb-8">
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-600/30 transition-all"
          >
            <Link href="/studio">
              Start Building
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800"
            asChild
          >
            <Link href="/#features">
              Learn more
            </Link>
          </Button>
        </div>

        <div className="relative mt-6 lg:w-2/3">
        {/* todo: needs layout updates after adding real preview video */}
         <div className="relative rounded-lg border overflow-hidden border-cyan-500 lg:h-[600px] bg-slate-900 z-10">
            <video className="w-full" autoPlay muted loop>
              <source src="preview.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

        </div>
      </div>
    </div>
  );
}
