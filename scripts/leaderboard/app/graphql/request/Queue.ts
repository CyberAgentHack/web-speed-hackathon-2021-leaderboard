// import { client } from "../apollo-client";
import {
  // LineupDocument,
  // LineupMutation,
  LineupMutationVariables,
} from "generated/graphql";
import { supabaseClient } from "~/libs/supabase.server";
import { QueueStatus } from "@prisma/client";

export const myQueues = async ({
  email,
}: {
  email: string;
}): Promise<
  { createdAt: string; status: QueueStatus; duration: null | number }[]
> => {
  const { data } = await supabaseClient
    .from<{
      createdAt: string;
      status: QueueStatus;
      updatedAt: string;
      "Team.User.email": string;
    }>("Queue")
    .select("createdAt, status, updatedAt, Team!inner(User!inner(*))")
    .eq("Team.User.email", email)
    .order("createdAt", { ascending: false })
    .limit(5)
    .throwOnError();
  if (!data) return [];

  return data.map(({ createdAt, status, updatedAt }) => {
    const duration = ["DONE", "FAILED"].includes(status)
      ? new Date(updatedAt).getTime() - new Date(createdAt).getTime()
      : null;

    return {
      createdAt,
      status,
      duration,
    };
  });
};

export const lineup = async (variables: LineupMutationVariables) => {
  return Promise.all([
    supabaseClient
      .from("Queue")
      .insert({ teamId: variables.teamId })
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
