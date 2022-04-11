// import { client } from "../apollo-client";
import {
  // LineupDocument,
  // LineupMutation,
  LineupMutationVariables,
} from "generated/graphql";
import { supabaseClient } from "~/libs/supabase.server";

export const lineup = async (variables: LineupMutationVariables) => {
  return Promise.all([
    supabaseClient
      .from("Queue")
      .insert({ teamId: variables.teamId, status: "RUNNING" })
      .throwOnError(),
    supabaseClient
      .from("Team")
      .update({ pageUrl: variables.pageUrl })
      .eq("id", variables.teamId)
      .throwOnError(),
  ]);

  // try {
  //   return await client.mutate<LineupMutation, LineupMutationVariables>({
  //     mutation: LineupDocument,
  //     variables,
  //   });
  // } catch (e) {
  //   console.error(e);
  //
  //   throw e;
  // }
};
