import { createClient, SupabaseClient } from '@supabase/supabase-js';

const MANUAL_URL = "https://ehjzadtmqevpcbuxzczw.supabase.co"; 
const MANUAL_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoanphZHRtcWV2cGNidXh6Y3p3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4NTU3MjYsImV4cCI6MjA4NjQzMTcyNn0.g9HpAHc7KcNb_gJ7DtdoRJFRU7SoV8jD-a_kwfuF6GE"; 

const getEnv = (key: string, fallback: string) => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      return process.env[key] || fallback;
    }
  } catch (e) {}
  return fallback;
};

const supabaseUrl = getEnv("SUPABASE_URL", MANUAL_URL);
const supabaseAnonKey = getEnv("SUPABASE_ANON_KEY", MANUAL_KEY);

export const isSupabaseConfigured = !!(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http') && 
  supabaseAnonKey.length > 20
);

export const isDemoMode = !isSupabaseConfigured;

export const supabase: SupabaseClient | null = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

if (!isDemoMode) {
  console.log("✅ AdBuy: Auth connected.");
}