import { MeasurementRequestForm } from "~/components/MeasurementReuestForm";
import { Navbar } from "~/components/Navbar";
import { Box } from "@chakra-ui/react";
import { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { skipAuth, supabaseStrategy } from "~/libs/auth.server";
import { supabaseClient } from "~/libs/supabase.server";
import { User } from "@supabase/supabase-js";
import { useLoaderData } from "@remix-run/react";
import { lineup } from '../../graphql/request/Queue';

type Data = {
  user: User | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  if (skipAuth) return { user: null };

  const session = await supabaseStrategy.checkSession(request, {
    failureRedirect: "/auth/login",
  });

  const { user } = await supabaseClient.auth.api.getUser(session.access_token);

  return { user } as Data;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  // TODO: validation
  const queues = await lineup({ teamId: Number(form.get('termId')) });

  return queues?.data?.insertIntoQueueCollection?.records;
};

const Index = () => {
  const { user } = useLoaderData<Data>();
  return (
    <>
      <Box pos="fixed" w="100%">
        <Navbar user={user} />
      </Box>
      <MeasurementRequestForm />
    </>
  );
};

export default Index;
