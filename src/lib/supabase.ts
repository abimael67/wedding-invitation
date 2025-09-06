import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database'

const supabaseUrl = 'https://gorkkdhtnfhtshupsxty.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvcmtrZGh0bmZodHNodXBzeHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxMTEzMzUsImV4cCI6MjA3MjY4NzMzNX0.xbSY3iY7vQ0hHyEPEH-IMWzubrHf363EnLseVK7ZxrI'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)