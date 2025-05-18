"use client"

import { useEffect, useState } from "react"

export default function DemoAnimation() {
  const [showSkeleton, setShowSkeleton] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSkeleton((prev) => !prev)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full max-w-md mx-auto">
      {showSkeleton ? (
        <div className="p-6 rounded-lg border border-gray-200 shadow-md bg-white">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-cyan-200 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-5 w-32 bg-cyan-200 rounded-md animate-pulse"></div>
              <div className="h-4 w-40 bg-cyan-200 rounded-md animate-pulse"></div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full bg-cyan-200 rounded-md animate-pulse"></div>
            <div className="h-3 w-full bg-cyan-200 rounded-md animate-pulse"></div>
            <div className="h-3 w-3/4 bg-cyan-200 rounded-md animate-pulse"></div>
          </div>
          <div className="mt-4 flex justify-end">
            <div className="h-10 w-28 bg-cyan-200 rounded-md animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-lg border border-gray-200 shadow-md bg-white">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold">
              JD
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">John Doe</h3>
              <p className="text-slate-500">Frontend Developer</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-slate-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-2 rounded-md shadow-sm">
              View Profile
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
