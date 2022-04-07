import { client } from "../apollo-client";
import {
  CreateTeamDocument,
  CreateTeamMutation,
  CreateTeamMutationVariables,
  JoinTeamDocument,
  JoinTeamMutation,
  JoinTeamMutationVariables,
  ListTeamsDocument,
  ListTeamsPrevDocument,
  ListTeamsPrevQuery,
  ListTeamsQuery,
  SignupDocument,
  SignupMutation,
  SignupMutationVariables,
} from "generated/graphql";
import { ApolloError } from "@apollo/client";

export const signup = async (variables: SignupMutationVariables) => {
  try {
    return await client.mutate<SignupMutation>({
      mutation: SignupDocument,
      variables,
    });
  } catch (e) {
    if (e instanceof ApolloError) {
      const msg = e.graphQLErrors[0];
      if (isString(msg) && msg.includes("duplicate key")) return null;
    }
    console.error(e);

    throw e;
  }
};

export const createTeam = async (variables: CreateTeamMutationVariables) => {
  return client.mutate<CreateTeamMutation>({
    mutation: CreateTeamDocument,
    variables,
    refetchQueries: [{ query: ListTeamsDocument, variables: { cursor: null } }],
    awaitRefetchQueries: true,
  });
};

export const joinTeam = async (variables: JoinTeamMutationVariables) => {
  return client.mutate<JoinTeamMutation>({
    mutation: JoinTeamDocument,
    variables,
  });
};

export const listTeams = async (cursor: string | null, prev = false) => {
  if (!prev)
    return client.query<ListTeamsQuery>({
      query: ListTeamsDocument,
      variables: {
        cursor,
      },
    });
  else
    return client.query<ListTeamsPrevQuery>({
      query: ListTeamsPrevDocument,
      variables: {
        cursor,
      },
    });
};

const isString = (e: unknown): e is string => typeof e === "string";
