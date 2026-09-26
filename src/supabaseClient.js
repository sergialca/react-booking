import { createClient } from "@supabase/supabase-js";

const url = process.env.REACT_APP_SUPABASE_URL;
const anonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export function requireSupabase() {
    if (!supabase) {
        throw new Error("Missing REACT_APP_SUPABASE_URL or REACT_APP_SUPABASE_ANON_KEY");
    }
    return supabase;
}
