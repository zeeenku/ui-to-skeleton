"use client"

import { useState, useEffect } from "react"
import { useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Initialize on first render
  useEffect(() => {
  try {
    const item = window.localStorage.getItem(key)
    if (item !== null) {
      setStoredValue(JSON.parse(item))
    } else {
      // fallback only if localStorage has no value
      window.localStorage.setItem(key, JSON.stringify(initialValue))
    }
  } catch (error) {
    console.log(error)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [key]) 

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value

      // Save state
      setStoredValue(valueToStore)

      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue] as const
}

