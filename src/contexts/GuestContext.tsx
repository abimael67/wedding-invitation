import React, { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import { GuestService } from '../services/guestService'
import type { Guest } from '../types/database'
import type { PostgrestError } from '@supabase/supabase-js'

interface GuestContextType {
  currentGuest: Guest | null
  loading: boolean
  error: PostgrestError | null
  guestCode: string | null
  refreshGuest: () => Promise<void>
  updateCurrentGuest: (guest: Guest) => void
}

const GuestContext = createContext<GuestContextType | undefined>(undefined)

interface GuestProviderProps {
  children: ReactNode
}

export const GuestProvider: React.FC<GuestProviderProps> = ({ children }) => {
  const [currentGuest, setCurrentGuest] = useState<Guest | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [guestCode, setGuestCode] = useState<string | null>(null)

  // Extract guest code from URL parameters
  const getGuestCodeFromURL = (): string | null => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get('code')
  }

  // Load guest data by code
  const loadGuestByCode = async (code: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const { data, error: fetchError } = await GuestService.getGuestByCode(code)
      
      if (fetchError) {
        setError(fetchError)
        setCurrentGuest(null)
      } else {
        setCurrentGuest(data)
      }
    } catch (err) {
      console.error('Error loading guest:', err)
      setError(err as PostgrestError)
      setCurrentGuest(null)
    } finally {
      setLoading(false)
    }
  }

  // Refresh current guest data
  const refreshGuest = async () => {
    if (guestCode) {
      await loadGuestByCode(guestCode)
    }
  }

  // Update current guest in state (for optimistic updates)
  const updateCurrentGuest = (guest: Guest) => {
    setCurrentGuest(guest)
  }

  // Initialize guest code and load guest data on mount
  useEffect(() => {
    const code = getGuestCodeFromURL()
    setGuestCode(code)
    
    if (code) {
      loadGuestByCode(code)
    }
  }, [])

  // Listen for URL changes (in case of navigation)
  useEffect(() => {
    const handlePopState = () => {
      const code = getGuestCodeFromURL()
      setGuestCode(code)
      
      if (code && code !== guestCode) {
        loadGuestByCode(code)
      } else if (!code) {
        setCurrentGuest(null)
        setError(null)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [guestCode])

  const value: GuestContextType = {
    currentGuest,
    loading,
    error,
    guestCode,
    refreshGuest,
    updateCurrentGuest
  }

  return (
    <GuestContext.Provider value={value}>
      {children}
    </GuestContext.Provider>
  )
}

// Export context type for use in hooks
export type { GuestContextType }
export { GuestContext }