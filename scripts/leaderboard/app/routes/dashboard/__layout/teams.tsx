import { TeamCard } from "~/components/TeamCard";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { useLoaderData } from "@remix-run/react";
import { listTeams } from "~/graphql/request/Teaming";
import { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { NewTeamFormModal } from "~/components/NewTeamFormModal";
import { useTeamContext } from "~/components/contexts/UserAndTeam";
import { handler as newTeamHandler } from "~/components/forms/CreateTeam";
import { handler as joinTeamHandler } from "~/components/forms/JoinTeam";

const MAX_TEAM_MEMBERS = 3;

type Data = {
  teams: { id: string; name: string; members: string[]; joinable: boolean }[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const data = await listTeams(null);

  return {
    teams:
      data.map(({ users, ...team }) => {
        const members = users.map(({ name }) => name);
        return {
          ...team,
          members,
          joinable: members.length < MAX_TEAM_MEMBERS,
        };
      }) ?? [],
  } as Data;
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  if (await newTeamHandler(data)) return null;
  if (await joinTeamHandler(data)) return null;

  throw new Error("invalid request");
};

const Teams = () => {
  const { teams } = useLoaderData<Data>();
  const myTeam = useTeamContext();

  return (
    <>
      <NewTeamFormModal />
      <Wrap spacing="30px">
        {teams.map((team) => (
          <WrapItem key={team.id}>
            <TeamCard {...team} mine={team.id === myTeam?.id} />
          </WrapItem>
        ))}
      </Wrap>
      {/* TODO: pagination */}
    </>
  );
};

export default Teams;
