import { client } from "../apollo-client";
import {
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

const isString = (e: unknown): e is string => typeof e === "string";
