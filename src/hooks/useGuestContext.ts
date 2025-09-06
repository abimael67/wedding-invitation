import { useContext, useState } from "react";
import { GuestContext } from "../contexts/GuestContext";
import { GuestService } from "../services/guestService";
import type { GuestContextType } from "../contexts/GuestContext";
import type { PostgrestError } from "@supabase/supabase-js";

// Custom hook to use the guest context
export const useGuestContext = (): GuestContextType => {
  const context = useContext(GuestContext);

  if (context === undefined) {
    throw new Error("useGuestContext must be used within a GuestProvider");
  }

  return context;
};

// Helper hook for RSVP operations
export const useGuestRSVP = () => {
  const { currentGuest, guestCode, updateCurrentGuest } = useGuestContext();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<PostgrestError | null>(null);

  const submitRSVP = async (rsvpData: {
    attending: boolean | null;
    pax?: number;
    message?: string;
  }) => {
    if (!guestCode) {
      throw new Error("No guest code available");
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const { data, error } = await GuestService.updateGuestRSVP(
        guestCode,
        rsvpData
      );

      if (error) {
        setSubmitError(error);
        return { success: false, error };
      }

      if (data) {
        updateCurrentGuest(data);
      }

      return { success: true, data };
    } catch (err) {
      const error = err as PostgrestError;
      setSubmitError(error);
      return { success: false, error };
    } finally {
      setSubmitting(false);
    }
  };

  return {
    currentGuest,
    guestCode,
    submitting,
    submitError,
    submitRSVP,
  };
};
