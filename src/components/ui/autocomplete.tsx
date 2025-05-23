"use client"

import React, { useEffect, useState, useRef, useMemo } from "react"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { Button } from "./button"
import { Pen } from "lucide-react"

interface AutocompleteInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  suggestions: string[]
  onSelect: (value: string) => void
  placeholder?: string
  showColorDot?: boolean
}

export function AutocompleteInput({
  label,
  value,
  onChange,
  suggestions,
  onSelect,
  placeholder = "",
  showColorDot = false,
}: AutocompleteInputProps) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleCommitValue = () => {
    if (inputValue.trim() !== "") {
      onChange(inputValue.trim())
      onSelect(inputValue.trim())
    }
    setOpen(false)
  }

  const filteredSuggestions = useMemo(() => suggestions.filter((s) =>
    s.toLowerCase().includes(inputValue.trim().toLowerCase())) , [inputValue, suggestions]
  )

  return (
    <div className="w-full">
      <Label className="mb-1.5 block text-slate-700">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            onClick={() => setOpen(true)}
            className="cursor-pointer  text-sm flex justify-between items-center px-3 py-2 border border-slate-300 rounded-md bg-white hover:bg-slate-50"
          >    
          <div className="flex items-center">
             { showColorDot && 
            <span className="bg-[#cbd5e1] w-4 h-4 rounded-full mr-2">
                <span  className={`bg-${value}-500 block w-4 h-4 rounded-full`}/>
            </span>
          }                  
        
            {value || <span className="text-slate-400">{placeholder}</span>}
          </div>
         
         <Pen className="w-4 h-4 text-slate-400 fill-slate-400"/>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full">
          <Command>
            <CommandInput
              ref={inputRef}
              placeholder="Type and hit enter..."
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleCommitValue()
                }
              }}
              className="h-9"
            />
            <CommandEmpty className="p-1">
                 <Button
                 tabIndex={-1}
                 variant="ghost"
                 className="w-full justify-start px-2 h-8"
                 onClick={handleCommitValue}
                >
                    <div className="flex items-center">
                    {showColorDot && (
                      <span className="bg-[#cbd5e1] w-4 h-4 rounded-full mr-2">
                      <span
                        className={`bg-${inputValue}-500 block w-4 h-4 rounded-full`}
                      />
                      </span>
                    )}
                    <span className="">{inputValue}</span>
                  </div>
                </Button>
            </CommandEmpty>
            <CommandGroup className="max-h-24 overflow-y-auto">
              {filteredSuggestions.map((item, idx) => (
                <CommandItem
                  key={idx}
                  onSelect={() => {
                    onChange(item)
                    onSelect(item)
                    setInputValue(item)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center">
                    {showColorDot && (
                    <span className="bg-[#cbd5e1] w-4 h-4 rounded-full mr-2">
                      <span
                        className={`bg-${item}-500 block w-4 h-4 rounded-full`}
                      />
                      </span>
                    )}
                    <span className="">{item}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
