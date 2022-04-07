import { TeamCard } from "~/components/TeamCard";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { ComponentProps } from "react";
import { useLoaderData } from "@remix-run/react";
import { createTeam, listTeams } from "~/graphql/request/Teaming";
import { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { NewTeamFormModal } from "~/components/NewTeamFormModal";

const MAX_TEAM_MEMBERS = 3;

type Data = {
  teams: ComponentProps<typeof TeamCard>[];
};

export const loader: LoaderFunction = async () => {
  const { data } = await listTeams(null);

  return {
    teams:
      data.teamCollection?.edges.map(({ node }) => {
        const members =
          node?.userCollection?.edges.map(({ node }) => node?.name ?? "") ?? [];
        return {
          id: node?.id ?? NaN,
          name: node?.name ?? "",
          members,
          joinable: members.length < MAX_TEAM_MEMBERS,
        };
      }) ?? [],
  } as Data;
};

export const action: ActionFunction = async ({ request }) => {
  if (request.method === "POST") {
    const data = await request.formData();
    const [name, pageUrl] = [data.get("name"), data.get("pageUrl")];
    if (typeof name === "string" && typeof pageUrl === "string") {
      return await createTeam({ name, pageUrl });
    } else {
      // TODO: ErrorBoundary
      throw new Error("invalid data");
    }
  }

  return null;
};

const Teams = () => {
  const { teams } = useLoaderData<Data>();
  return (
    <>
      <NewTeamFormModal />
      <Wrap spacing="30px">
        {teams.map((team) => (
          <WrapItem key={team.id}>
            <TeamCard {...team} />
          </WrapItem>
        ))}
      </Wrap>
      {/* TODO: pagination */}
    </>
  );
};

export default Teams;
