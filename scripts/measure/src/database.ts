import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export const updateQueueStatus = async (id: string, status: 'RUNNING' | 'FAILED' | 'DONE') => {
  const { data, error } = await supabaseClient.from('Queue').update({status}).match({id});
  if (error?.message) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return { data };
}
