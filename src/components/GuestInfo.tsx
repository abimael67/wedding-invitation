import React from 'react'
import { useGuestContext } from '../hooks/useGuestContext'
import { User, Calendar, Users, MessageSquare } from 'lucide-react'

interface GuestInfoProps {
  className?: string
}

export const GuestInfo: React.FC<GuestInfoProps> = ({ className = '' }) => {
  const { currentGuest, loading, error, guestCode } = useGuestContext()

  if (loading) {
    return (
      <div className={`bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-6 ${className}`}>
        <p className="text-red-600 text-sm">
          Error loading guest information: {error.message}
        </p>
        {guestCode && (
          <p className="text-red-500 text-xs mt-1">
            Guest code: {guestCode}
          </p>
        )}
      </div>
    )
  }

  if (!currentGuest) {
    return (
      <div className={`bg-yellow-50 border border-yellow-200 rounded-lg p-6 ${className}`}>
        <p className="text-yellow-700 text-sm">
          {guestCode 
            ? 'Guest not found with the provided code.' 
            : 'No guest code provided in URL. Add ?code=YOUR_GUEST_CODE to the URL.'}
        </p>
      </div>
    )
  }

  return (
    <div className={`bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-wedding-pink-100 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <User className="h-5 w-5 text-wedding-pink-600" />
        <h3 className="text-lg font-semibold text-gray-800">
          Welcome, {currentGuest.name}!
        </h3>
      </div>
      
      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-wedding-blue-500" />
          <span>Maximum guests: {currentGuest.maxPax}</span>
        </div>
        
        {currentGuest.phone && (
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 text-wedding-blue-500">📱</span>
            <span>Phone: {currentGuest.phone}</span>
          </div>
        )}
        
        {currentGuest.main && (
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 text-wedding-blue-500">👤</span>
            <span>Main contact: {currentGuest.main}</span>
          </div>
        )}
        
        {currentGuest.attending !== null && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-wedding-pink-500" />
              <span className="font-medium">
                RSVP Status: 
                <span className={`ml-1 ${
                  currentGuest.attending 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {currentGuest.attending ? 'Attending' : 'Not Attending'}
                </span>
              </span>
            </div>
            
            {currentGuest.attending && currentGuest.pax && (
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-wedding-blue-500" />
                <span>Party size: {currentGuest.pax}</span>
              </div>
            )}
            
            {currentGuest.message && (
              <div className="flex items-start gap-2">
                <MessageSquare className="h-4 w-4 text-wedding-blue-500 mt-0.5" />
                <div>
                  <span className="font-medium">Message:</span>
                  <p className="text-gray-700 mt-1">{currentGuest.message}</p>
                </div>
              </div>
            )}
            
            {currentGuest.answered_on && (
              <p className="text-xs text-gray-500 mt-2">
                Responded on: {new Date(currentGuest.answered_on).toLocaleDateString()}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}