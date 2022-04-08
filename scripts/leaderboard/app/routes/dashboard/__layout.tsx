import { LoaderFunction, redirect } from "@remix-run/cloudflare";
import { supabaseStrategy } from "~/libs/auth.server";
import { useLoaderData, Outlet } from "@remix-run/react";
import { Box, Container } from "@chakra-ui/react";
import { Navbar } from "~/components/Navbar";
import { getMyTeam } from "~/graphql/request/Teaming";
import {
  UserAndTeam,
  UserAndTeamContextProvider,
} from "~/components/contexts/UserAndTeam";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await supabaseStrategy.checkSession(request, {
    failureRedirect: "/auth/login",
  });

  const team = await getMyTeam({ email: session.user?.email ?? "" });
  if (!team && new URL(request.url).pathname === "/dashboard")
    return redirect("/dashboard/teams", { status: 302 });

  return { user: session.user, team } as UserAndTeam;
};

const Layout = () => {
  const data = useLoaderData<UserAndTeam>();
  return (
    <>
      <Box pos="fixed" w="100%" zIndex={10}>
        <Navbar user={data.user} />
      </Box>
      <Container maxW="8xl" pt={24}>
        <UserAndTeamContextProvider value={data}>
          <Outlet />
        </UserAndTeamContextProvider>
      </Container>
    </>
  );
};

export default Layout;
