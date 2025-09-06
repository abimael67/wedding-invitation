import { useState, useEffect } from 'react'
import { GuestService } from '../services/guestService'
import type { Guest, GuestInsert } from '../types/database'
import type { PostgrestError } from '@supabase/supabase-js'

/**
 * Hook for managing guest data and RSVP operations
 */
export const useGuests = () => {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)

  // Load all guests
  const loadGuests = async () => {
    setLoading(true)
    setError(null)
    
    const { data, error: fetchError } = await GuestService.getAllGuests()
    
    if (fetchError) {
      setError(fetchError)
    } else if (data) {
      setGuests(data)
    }
    
    setLoading(false)
  }

  // Get guest by code
  const getGuestByCode = async (code: string) => {
    setLoading(true)
    setError(null)
    
    const { data, error: fetchError } = await GuestService.getGuestByCode(code)
    
    setLoading(false)
    
    if (fetchError) {
      setError(fetchError)
      return null
    }
    
    return data
  }

  // Submit RSVP
  const submitRSVP = async (
    code: string,
    rsvpData: {
      attending: boolean
      pax?: number
      message?: string
    }
  ) => {
    setLoading(true)
    setError(null)
    
    const { data, error: updateError } = await GuestService.updateGuestRSVP(code, rsvpData)
    
    if (updateError) {
      setError(updateError)
      setLoading(false)
      return { success: false, error: updateError }
    }
    
    // Update local state if successful
    if (data) {
      setGuests(prev => prev.map(guest => 
        guest.code === code ? data : guest
      ))
    }
    
    setLoading(false)
    return { success: true, data }
  }

  // Create new guest
  const createGuest = async (guestData: GuestInsert) => {
    setLoading(true)
    setError(null)
    
    const { data, error: createError } = await GuestService.createGuest(guestData)
    
    if (createError) {
      setError(createError)
      setLoading(false)
      return { success: false, error: createError }
    }
    
    // Add to local state if successful
    if (data) {
      setGuests(prev => [data, ...prev])
    }
    
    setLoading(false)
    return { success: true, data }
  }

  // Load guests on mount
  useEffect(() => {
    loadGuests()
  }, [])

  return {
    guests,
    loading,
    error,
    loadGuests,
    getGuestByCode,
    submitRSVP,
    createGuest
  }
}

/**
 * Hook for RSVP statistics
 */
export const useRSVPStats = () => {
  const [stats, setStats] = useState<{
    total: number
    responded: number
    attending: number
    notAttending: number
    totalPax: number
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)

  const loadStats = async () => {
    setLoading(true)
    setError(null)
    
    const { data, error: fetchError } = await GuestService.getRSVPStats()
    
    if (fetchError) {
      setError(fetchError)
    } else {
      setStats(data)
    }
    
    setLoading(false)
  }

  useEffect(() => {
    loadStats()
  }, [])

  return {
    stats,
    loading,
    error,
    loadStats
  }
}