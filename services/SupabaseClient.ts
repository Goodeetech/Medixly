import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseURL || !supabaseKey) {
  throw new Error(
    "Supabase URL or Key is not defined in environment variables."
  );
}

export const supabase = createClient(supabaseURL, supabaseKey);
