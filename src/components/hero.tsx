"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button } from "./ui/button";
import { useState } from "react";
import Image from "next/image";
import { BackgroundBeamsWithCollision } from "./ui/background-beams-with-collision";
import { AuthorCard } from "./author-card";

export function Hero() {
  const [usageCount, setUsageCount] = useLocalStorage("usageCount", 0);
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      
      {/* Background layer BELOW glass layer */}
      <div className="absolute -inset-1 z-0">
        <BackgroundBeamsWithCollision children={undefined} className="glass-effect backdrop-blur-md" />
      </div>
     
          <div className="absolute z-0 -inset-1 rounded-full bg-gradient-to-br from-cyan-50 to-slate-50 opacity-75 blur-xl"></div>

      {/* Glassmorphism foreground */}
      <div className="relative w-full min-h-screen flex items-center justify-center text-center flex-col z-10  backdrop-blur-md lg:p-16 p-4">
        <div className="inline-block mb-4">
          <div className="bg-cyan-100 text-cyan-800 text-xs font-medium px-3 py-1 rounded-full">
            ✨ Introducing UI to Skeleton v1.0
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gradient mt-6 mb-6">
           <span className="relative inline-flex sm:inline">
                        <span className="bg-gradient-to-r from-cyan-300  to-cyan-500 blur-lg filter opacity-30 w-full h-full absolute inset-0"></span>
                        <span className="relative text-gradient">From hours and minutes to moments</span>
                    </span>
        </h1>

        <p className="text-slate-500 max-w-[700px] text-lg mx-auto mb-8">
          Transform your UI components into skeleton loaders with just a few clicks. Save development time and
          create consistent loading states for a better user experience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            size="lg"
            onClick={() => setShowEditor(true)}
            className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-600/30 transition-all"
          >
            Start Building
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800"
          >
            Watch Demo
          </Button>
        </div>

        {/* <div className="bg-white rounded-lg px-6 py-3 shadow-md border border-cyan-100 text-sm inline-block">
          Used by <span className="font-bold text-cyan-600">{usageCount}</span> developers worldwide
        </div> */}


<div className="relative mt-6 w-2/3">
  {/* Fake gradient shadow */}
  <div className="absolute -inset-1 blur-xl rounded-lg z-0 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 opacity-50"></div>

  {/* Main content */}
  <div className="relative rounded-lg h-[300px] bg-slate-900 z-10"></div>
</div>
      </div>
    </div>
  );
}
