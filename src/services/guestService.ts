import { supabase } from "../lib/supabase";
import type { Guest, GuestInsert, GuestUpdate } from "../types/database";
import type { PostgrestError } from "@supabase/supabase-js";

export class GuestService {
  /**
   * Get all guests
   */
  static async getAllGuests(): Promise<{
    data: Guest[] | null;
    error: PostgrestError | null;
  }> {
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .order("created_at", { ascending: false });

    return { data, error };
  }

  /**
   * Get guest by code (UUID)
   */
  static async getGuestByCode(
    code: string
  ): Promise<{ data: Guest | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .eq("code", code)
      .single();

    return { data, error };
  }

  /**
   * Get guest by phone number
   */
  static async getGuestByPhone(
    phone: string
  ): Promise<{ data: Guest | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .eq("phone", phone)
      .single();

    return { data, error };
  }

  /**
   * Create a new guest
   */
  static async createGuest(
    guest: GuestInsert
  ): Promise<{ data: Guest | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("guests")
      .insert(guest)
      .select()
      .single();

    return { data, error };
  }

  /**
   * Update guest RSVP response
   */
  static async updateGuestRSVP(
    code: string,
    rsvpData: {
      attending: boolean | null;
      pax?: number;
      message?: string;
    }
  ): Promise<{ data: Guest | null; error: PostgrestError | null }> {
    const updateData: GuestUpdate = {
      attending: rsvpData.attending,
      pax: rsvpData.pax,
      message: rsvpData.message,
      answered_on: new Date().toLocaleString(),
    };

    const { data, error } = await supabase
      .from("guests")
      .update(updateData)
      .eq("code", code)
      .select()
      .single();

    return { data, error };
  }

  /**
   * Update guest information
   */
  static async updateGuest(
    code: string,
    updates: GuestUpdate
  ): Promise<{ data: Guest | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
      .from("guests")
      .update(updates)
      .eq("code", code)
      .select()
      .single();

    return { data, error };
  }

  /**
   * Delete a guest
   */
  static async deleteGuest(
    code: string
  ): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase.from("guests").delete().eq("code", code);

    return { error };
  }

  /**
   * Get RSVP statistics
   */
  static async getRSVPStats(): Promise<{
    data: {
      total: number;
      responded: number;
      attending: number;
      notAttending: number;
      totalPax: number;
    } | null;
    error: PostgrestError | null;
  }> {
    const { data: guests, error } = await this.getAllGuests();

    if (error || !guests) {
      return { data: null, error };
    }

    const stats = {
      total: guests.length,
      responded: guests.filter((g) => g.attending !== null).length,
      attending: guests.filter((g) => g.attending === true).length,
      notAttending: guests.filter((g) => g.attending === false).length,
      totalPax: guests
        .filter((g) => g.attending === true && g.pax)
        .reduce((sum, g) => sum + (g.pax || 0), 0),
    };

    return { data: stats, error: null };
  }
}
