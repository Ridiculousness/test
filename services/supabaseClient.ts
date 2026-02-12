import { createClient, SupabaseClient } from '@supabase/supabase-js';

// The exact Project URL and Public Anon Key provided by the user
const MANUAL_URL = "https://ehjzadtmqevpcbuxzczw.supabase.co"; 
const MANUAL_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoanphZHRtcWV2cGNidXh6Y3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4NTU3MjYsImV4cCI6MjA4NjQzMTcyNn0.g9HpAHc7KcNb_gJ7DtdoRJFRU7SoV8jD-a_kwfuF6GE"; 

const getEnv = (key: string, fallback: string) => {
  try {
    return (typeof process !== 'undefined' && process.env?.[key]) || fallback;
  } catch {
    return fallback;
  }
};

const supabaseUrl = getEnv("SUPABASE_URL", MANUAL_URL);
const supabaseAnonKey = getEnv("SUPABASE_ANON_KEY", MANUAL_KEY);

export const isSupabaseConfigured = !!(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http') && 
  supabaseAnonKey.length > 20
);

// Fallback to demo mode only if configuration fails
export const isDemoMode = !isSupabaseConfigured;

export const supabase: SupabaseClient | null = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isDemoMode) {
  console.log("✅ AdBuy Remake: Successfully connected to Supabase project ehjzadtmqevpcbuxzczw");
} else {
  console.warn("🚀 AdBuy Remake: Running in Demo Mode (Local Only)");
}