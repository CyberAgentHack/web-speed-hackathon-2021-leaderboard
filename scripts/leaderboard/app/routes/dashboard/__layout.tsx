import { LoaderFunction } from "@remix-run/cloudflare";
import { skipAuth, supabaseStrategy } from "~/libs/auth.server";
import { useLoaderData, Outlet } from "@remix-run/react";
import { Box, Container } from "@chakra-ui/react";
import { Navbar } from "~/components/Navbar";
import { User } from "@supabase/supabase-js";

type Data = {
  user: User | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  if (skipAuth) return { user: null };

  const session = await supabaseStrategy.checkSession(request, {
    failureRedirect: "/auth/login",
  });

  // TODO: redirect /dashboard/teams if user is not joined a team

  return { user: session.user } as Data;
};

const Layout = () => {
  const { user } = useLoaderData<Data>();
  return (
    <>
      <Box pos="fixed" w="100%" zIndex={10}>
        <Navbar user={user} />
      </Box>
      <Container maxW="8xl" pt={24}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
