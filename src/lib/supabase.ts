import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface StudyPlan {
  id: string;
  user_id: string;
  title: string;
  duration_minutes: number;
  scheduled_time: string;
  completed: boolean;
  broken: boolean;
  created_at: string;
}

export interface StudySession {
  id: string;
  plan_id: string;
  started_at: string;
  ended_at: string | null;
  actual_duration_minutes: number | null;
  completed: boolean;
}
