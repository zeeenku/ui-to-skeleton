"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const DEFAULT_CODE = `// Your React component with Tailwind CSS
import React from 'react';

export default function UserCard() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-blue-500"></div>
        <div>
          <h3 className="text-lg font-bold">John Doe</h3>
          <p className="text-gray-500">Frontend Developer</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
      <div className="mt-4 flex justify-end">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          View Profile
        </button>
      </div>
    </div>
  );
}`

export default function CodeEditor() {
  const [code, setCode] = useState(DEFAULT_CODE)
  const [bgColor, setBgColor] = useState("#ffffff")
  const [skeletonColor, setSkeletonColor] = useState("gray")
  const [skeletonBorder, setSkeletonBorder] = useState("rounded-md")
  const [skeletonBorderColor, setSkeletonBorderColor] = useState("border-gray-200")
  const [activeTab, setActiveTab] = useState("ui")
  const [fullPreview, setFullPreview] = useState(false)

  const generateSkeleton = () => {
    setActiveTab("skeleton")
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-2">UI to Skeleton Generator</h2>
        <p className="opacity-90">Customize your skeleton loader with the options below</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white p-6 rounded-lg shadow-md border border-cyan-100">
        <div className="flex flex-col gap-2 md:flex-1">
          <Label htmlFor="bg-color" className="text-slate-700">
            Global Background Color
          </Label>
          <Input
            id="bg-color"
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="h-10 w-full border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div className="flex flex-col gap-2 md:flex-1">
          <Label htmlFor="skeleton-color" className="text-slate-700">
            Skeleton Color
          </Label>
          <Select value={skeletonColor} onValueChange={setSkeletonColor}>
            <SelectTrigger id="skeleton-color" className="border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500">
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gray">Gray</SelectItem>
              <SelectItem value="slate">Slate</SelectItem>
              <SelectItem value="zinc">Zinc</SelectItem>
              <SelectItem value="cyan">Cyan</SelectItem>
              <SelectItem value="sky">Sky</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2 md:flex-1">
          <Label htmlFor="skeleton-border" className="text-slate-700">
            Skeleton Border
          </Label>
          <Select value={skeletonBorder} onValueChange={setSkeletonBorder}>
            <SelectTrigger id="skeleton-border" className="border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500">
              <SelectValue placeholder="Select border" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rounded-none">None</SelectItem>
              <SelectItem value="rounded-sm">Small</SelectItem>
              <SelectItem value="rounded-md">Medium</SelectItem>
              <SelectItem value="rounded-lg">Large</SelectItem>
              <SelectItem value="rounded-full">Full</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2 md:flex-1">
          <Label htmlFor="skeleton-border-color" className="text-slate-700">
            Border Color
          </Label>
          <Select value={skeletonBorderColor} onValueChange={setSkeletonBorderColor}>
            <SelectTrigger
              id="skeleton-border-color"
              className="border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500"
            >
              <SelectValue placeholder="Select border color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="border-gray-200">Gray</SelectItem>
              <SelectItem value="border-slate-200">Slate</SelectItem>
              <SelectItem value="border-zinc-200">Zinc</SelectItem>
              <SelectItem value="border-cyan-200">Cyan</SelectItem>
              <SelectItem value="border-sky-200">Sky</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-3 mb-6">
        <Button
          onClick={generateSkeleton}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-md shadow-cyan-500/20 hover:shadow-cyan-600/30 transition-all"
        >
          Generate Skeleton
        </Button>
        <Button
          variant="outline"
          onClick={() => setFullPreview(!fullPreview)}
          className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800"
        >
          {fullPreview ? "Show Editor" : "Full Page Preview"}
        </Button>
      </div>

      {!fullPreview ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100vh-380px)]">
          <div className="border rounded-lg overflow-hidden shadow-md bg-white">
            <div className="bg-slate-800 p-3 border-b font-mono text-sm text-white flex items-center">
              <div className="flex space-x-2 mr-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span>Component Code</span>
            </div>
            <div className="p-4 h-full overflow-auto bg-slate-900 text-slate-100">
              <pre className="font-mono text-sm whitespace-pre-wrap">
                <code>{code}</code>
              </pre>
            </div>
          </div>
          <div className="border rounded-lg overflow-hidden shadow-md bg-white">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="bg-slate-100 p-3 border-b">
                <TabsList className="grid w-full grid-cols-2 bg-slate-200">
                  <TabsTrigger value="ui" className="data-[state=active]:bg-white data-[state=active]:text-cyan-700">
                    UI
                  </TabsTrigger>
                  <TabsTrigger
                    value="skeleton"
                    className="data-[state=active]:bg-white data-[state=active]:text-cyan-700"
                  >
                    Skeleton
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="p-6 h-[calc(100%-57px)] overflow-auto" style={{ backgroundColor: bgColor }}>
                <TabsContent value="ui" className="mt-0 h-full">
                  <div className="flex items-center justify-center h-full">
                    <div className="w-full max-w-md transform transition-all hover:scale-105 duration-300">
                      <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200">
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua.
                          </p>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-shadow">
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="skeleton" className="mt-0 h-full">
                  <div className="flex items-center justify-center h-full">
                    <div className="w-full max-w-md">
                      <div className={`p-6 ${skeletonBorder} border ${skeletonBorderColor} shadow-md bg-white`}>
                        <div className="flex items-center gap-4">
                          <div className={`h-12 w-12 rounded-full bg-${skeletonColor}-200 animate-pulse`}></div>
                          <div className="space-y-2">
                            <div className={`h-5 w-32 bg-${skeletonColor}-200 ${skeletonBorder} animate-pulse`}></div>
                            <div className={`h-4 w-40 bg-${skeletonColor}-200 ${skeletonBorder} animate-pulse`}></div>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className={`h-3 w-full bg-${skeletonColor}-200 ${skeletonBorder} animate-pulse`}></div>
                          <div className={`h-3 w-full bg-${skeletonColor}-200 ${skeletonBorder} animate-pulse`}></div>
                          <div className={`h-3 w-3/4 bg-${skeletonColor}-200 ${skeletonBorder} animate-pulse`}></div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <div className={`h-10 w-28 bg-${skeletonColor}-200 ${skeletonBorder} animate-pulse`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden h-[calc(100vh-280px)] shadow-lg">
          <div className="p-6 h-full overflow-auto" style={{ backgroundColor: bgColor }}>
            {activeTab === "ui" ? (
              <div className="flex items-center justify-center h-full">
                <div className="w-full max-w-md transform transition-all hover:scale-105 duration-300">
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-slate-200">
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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                      </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white px-4 py-2 rounded-md shadow-sm hover:shadow-md transition-shadow">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="w-full max-w-md">
                  <div className={`p-6 ${skeletonBorder} border ${skeletonBorderColor} shadow-md bg-white`}>
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 rounded-full bg-${skeletonColor}-200 animate-pulse`}></div>
                      <div className="space-y-2">
                        <div className={`h-5 w-32 bg-${skeletonColor}-200 ${skeletonBorder} animate-pulse`}></div>
                        <div className={`h-4 w-40 bg-${skeletonColor}-200 ${skeletonBorder} animate-pulse`}></div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className={`h-3 w-full bg-${skeletonColor}-200 ${skeletonBorder} animate-pulse`}></div>
                      <div className={`h-3 w-full bg-${skeletonColor}-200 ${skeletonBorder} animate-pulse`}></div>
                      <div className={`h-3 w-3/4 bg-${skeletonColor}-200 ${skeletonBorder} animate-pulse`}></div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <div className={`h-10 w-28 bg-${skeletonColor}-200 ${skeletonBorder} animate-pulse`}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-100 text-sm text-cyan-800">
        <p className="font-medium">Pro Tip:</p>
        <p>
          Try different skeleton colors and borders to match your design system. The best skeletons mimic the actual
          content layout.
        </p>
      </div>
    </div>
  )
}
