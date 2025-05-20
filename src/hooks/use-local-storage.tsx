"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
  try {
    const item = window.localStorage.getItem(key)
  
    if (item !== null && JSON.parse(item).trim().length > 0) {
      setStoredValue(JSON.parse(item))
    } else {
      window.localStorage.setItem(key, JSON.stringify(initialValue))
    }
  } catch (error) {
    console.log(error)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [key]) 


  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue] as const
}

