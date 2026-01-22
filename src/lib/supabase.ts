import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          display_name: string | null
          avatar_url: string | null
          xp_total: number
          current_streak: number
          longest_streak: number
          hearts: number
          last_activity_date: string | null
          is_premium: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      categories: {
        Row: {
          id: string
          name: string
          icon_name: string
          color: string
          order_index: number
        }
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['categories']['Insert']>
      }
      questions: {
        Row: {
          id: string
          category_id: string
          difficulty: number
          question_text: string
          correct_answer: string
          wrong_answers: string[]
          explanation: string
          xp_reward: number
        }
        Insert: Omit<Database['public']['Tables']['questions']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['questions']['Insert']>
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          category_id: string
          current_lesson: number
          lessons_completed: number[]
          mastery_level: number
        }
        Insert: Omit<Database['public']['Tables']['user_progress']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['user_progress']['Insert']>
      }
      leagues: {
        Row: {
          id: string
          name: string
          tier: string
          min_xp_weekly: number
          icon_url: string
        }
        Insert: Omit<Database['public']['Tables']['leagues']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['leagues']['Insert']>
      }
      league_members: {
        Row: {
          id: string
          league_id: string
          user_id: string
          weekly_xp: number
          joined_at: string
          rank_position: number
        }
        Insert: Omit<Database['public']['Tables']['league_members']['Row'], 'id' | 'joined_at'>
        Update: Partial<Database['public']['Tables']['league_members']['Insert']>
      }
    }
  }
}
