import { createContext, ReactNode, useContext } from "react";
import { User } from "@supabase/supabase-js";

export type UserAndTeam = {
  user: User | null;
  team: {
    id: string;
    name?: string | null;
    pageUrl?: string | null;
  } | null;
};

const UserAndTeamContext = createContext<UserAndTeam>({
  user: null,
  team: null,
});

type Props = {
  value: UserAndTeam;
  children: ReactNode;
};

export const UserAndTeamContextProvider = (props: Props) => {
  return <UserAndTeamContext.Provider {...props} />;
};

export const useUserContext = () => {
  return useContext(UserAndTeamContext).user;
};

export const useTeamContext = () => {
  return useContext(UserAndTeamContext).team;
};
