import { client } from "../apollo-client";
import {
  LineupDocument,
  LineupMutation,
  LineupMutationVariables,
} from "generated/graphql";

export const lineup = async (variables: LineupMutationVariables) => {
  try {
    return await client.mutate<LineupMutation, LineupMutationVariables>({
      mutation: LineupDocument,
      variables,
    });
  } catch (e) {
    console.error(e);

    throw e;
  }
};
