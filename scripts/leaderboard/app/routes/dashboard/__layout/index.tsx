import { MeasurementRequest } from "~/components/MeasurementReuest";
import { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { useTeamContext } from "~/components/contexts/UserAndTeam";
import { scoresForGraph } from "~/graphql/request/Measurement";
import { Chart } from "~/components/Chart";
import { useLoaderData } from "@remix-run/react";
import {
  Box,
  Heading,
  Switch,
  FormControl,
  FormLabel,
  Flex,
  Stack,
  Spacer,
} from "@chakra-ui/react";
import { ObserveMeasurementsAndRefresh } from "~/components/ObserveMeasurements";
import { Ranking } from "~/components/Ranking";
import { useReducer } from "react";
import { handler } from "~/components/forms/MeasureRequest";
import { QueueList } from "~/QueueList";
import { myQueues } from "~/graphql/request/Queue";
import { supabaseStrategy } from "~/libs/auth.server";
import { promiseHash } from "remix-utils";

type Data = {
  scores: Awaited<ReturnType<typeof scoresForGraph>>;
  queues: Awaited<ReturnType<typeof myQueues>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await supabaseStrategy.checkSession(request);

  return promiseHash({
    queues: myQueues({ email: session?.user?.email ?? "" }),
    scores: scoresForGraph(),
  });
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  if (await handler(data)) return null;

  throw new Error("invalid request");
};

const Index = () => {
  const team = useTeamContext();
  const { scores, queues } = useLoaderData<Data>();
  const [flag, toggle] = useReducer((s) => !s, false);
  if (!team) return null;

  return (
    <>
      <Box height="500px">
        <Flex alignItems="end" mb={4}>
          <Heading as="h2" fontSize={{ base: "xl", sm: "2xl" }}>
            Score
          </Heading>
          <Spacer />
          <Box>
            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Sequence</FormLabel>
              <Switch size="lg" onChange={toggle} defaultChecked={flag} />
              <FormLabel mb="0" ml={4}>
                Ranking
              </FormLabel>
            </FormControl>
          </Box>
        </Flex>
        {flag ? <Ranking data={scores} /> : <Chart data={scores} />}
        <ObserveMeasurementsAndRefresh />
      </Box>
      <Stack direction={["column", "row"]} mt={32} spacing={8}>
        <MeasurementRequest teamId={team.id} url={team.pageUrl ?? ""} />
        <QueueList queues={queues} />
      </Stack>
    </>
  );
};

export default Index;
