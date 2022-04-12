import { client } from "../apollo-client";
import {
  // CreateTeamDocument,
  // CreateTeamMutation,
  CreateTeamMutationVariables,
  // JoinTeamDocument,
  // JoinTeamMutation,
  JoinTeamMutationVariables,
  // ListTeamsDocument,
  // ListTeamsPrevDocument,
  // ListTeamsPrevQuery,
  // ListTeamsQuery,
  // MyTeamDocument,
  // MyTeamQuery,
  MyTeamQueryVariables,
  // SignupDocument,
  // SignupMutation,
  SignupMutationVariables,
} from "generated/graphql";
// import { ApolloError } from "@apollo/client";
import { supabaseClient } from "~/libs/supabase.server";

export const signup = async (variables: SignupMutationVariables) => {
  const { data } = await supabaseClient
    .from("User")
    .upsert(variables, { onConflict: "email" })
    .throwOnError();
  return data;

  // try {
  //   return await client.mutate<SignupMutation>({
  //     mutation: SignupDocument,
  //     variables,
  //   });
  // } catch (e) {
  //   if (e instanceof ApolloError) {
  //     const error = e.graphQLErrors[0];
  //     console.log(e);
  //     if (error.message.includes("duplicate key")) return null;
  //   }
  //   console.error(e);
  //
  //   throw e;
  // }
};

export const createTeam = async (variables: CreateTeamMutationVariables) => {
  const { data } = await supabaseClient
    .from("Team")
    .insert(variables)
    .throwOnError();

  return data;

  // return client.mutate<CreateTeamMutation>({
  //   mutation: CreateTeamDocument,
  //   variables,
  //   refetchQueries: [{ query: ListTeamsDocument, variables: { cursor: null } }],
  //   awaitRefetchQueries: true,
  // });
};

export const joinTeam = async (variables: JoinTeamMutationVariables) => {
  const { data } = await supabaseClient
    .from("User")
    .update({ teamId: variables.teamId })
    .match({ email: variables.email });

  await client.clearStore();

  return data;

  // TODO: When the error on the supabase side is resolved, revert back to this code.
  // return client.mutate<JoinTeamMutation>({
  //   mutation: JoinTeamDocument,
  //   variables,
  // });
};

export const listTeams = async (
  cursor: string | null,
  prev = false,
  page = 1
): Promise<
  {
    users: { email: string; name: string }[];
    id: string;
    name: string | null;
    pageUrl: string | null;
  }[]
> => {
  const { data } = await supabaseClient
    .from("Team")
    .select("id, name, pageUrl, users:User(email, name)")
    .order("createdAt", { ascending: false })
    .range((page - 1) * 30, page * 30 - 1)
    .throwOnError();

  return data ?? [];

  // if (!prev)
  //   return client.query<ListTeamsQuery>({
  //     query: ListTeamsDocument,
  //     variables: {
  //       cursor,
  //     },
  //   });
  // else
  //   return client.query<ListTeamsPrevQuery>({
  //     query: ListTeamsPrevDocument,
  //     variables: {
  //       cursor,
  //     },
  //   });
};

export const getMyTeam = async (variables: MyTeamQueryVariables) => {
  const { data } = await supabaseClient
    .from("Team")
    .select("*, User!inner(*)")
    .eq("User.email", variables.email)
    .single();

  return data;

  // const { data } = await client.query<MyTeamQuery>({
  //   query: MyTeamDocument,
  //   variables,
  // });
  // return data.userCollection?.edges[0].node?.team;
};
