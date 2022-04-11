// import { client } from "../apollo-client";
// import { SampleDocument, SampleQuery } from "generated/graphql";
import { supabaseClient } from "~/libs/supabase.server";

export const getSample = async () => {
  const { data } = await supabaseClient
    .from("Queue")
    .select("id")
    .throwOnError();
  return data;

  // return await client.query<SampleQuery>({
  //   query: SampleDocument
  // })
};
