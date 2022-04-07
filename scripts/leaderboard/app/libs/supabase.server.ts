import { createClient } from "@supabase/supabase-js"

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_API_KEY, {
  fetch: fetch.bind(globalThis),
})
