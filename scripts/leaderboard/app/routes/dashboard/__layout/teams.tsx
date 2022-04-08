import { TeamCard } from "~/components/TeamCard";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { ComponentProps } from "react";
import { useLoaderData } from "@remix-run/react";
import { createTeam, joinTeam, listTeams } from "~/graphql/request/Teaming";
import { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { NewTeamFormModal } from "~/components/NewTeamFormModal";
import { supabaseStrategy } from "~/libs/auth.server";
import { AuthorizationError } from "remix-auth";

const MAX_TEAM_MEMBERS = 3;

type Data = {
  teams: ComponentProps<typeof TeamCard>[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { data } = await listTeams(null);

  const session = await supabaseStrategy.checkSession(request);

  return {
    teams:
      data.teamCollection?.edges.map(({ node }) => {
        const members =
          node?.userCollection?.edges.map(({ node }) => node?.name ?? "") ?? [];
        const mine = node?.userCollection?.edges.some(
          ({ node }) => node?.email === session?.user?.email
        );
        return {
          id: node?.id ?? NaN,
          name: node?.name ?? "",
          members,
          joinable: members.length < MAX_TEAM_MEMBERS,
          mine,
        };
      }) ?? [],
  } as Data;
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const [name, pageUrl, join, teamId] = [
    data.get("name"),
    data.get("pageUrl"),
    data.get("join"),
    data.get("teamId"),
  ];
  if (
    request.method === "POST" &&
    typeof name === "string" &&
    typeof pageUrl === "string"
  ) {
    return await createTeam({ name, pageUrl });
  } else if (
    request.method === "POST" &&
    typeof join === "string" &&
    typeof teamId === "string"
  ) {
    const session = await supabaseStrategy.checkSession(request);
    if (!session?.user?.email)
      throw new AuthorizationError("No user session found");

    return await joinTeam({
      teamId,
      email: session.user.email,
    });
  }

  throw new Error("invalid data");
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
