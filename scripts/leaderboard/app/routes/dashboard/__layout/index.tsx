import { MeasurementRequest } from "~/components/MeasurementReuest";
import { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { getSample } from "~/graphql/request/Sample";
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
  Spacer,
} from "@chakra-ui/react";
import { ObserveMeasurementsAndRefresh } from "~/components/ObserveMeasurements";
import { Ranking } from "~/components/Ranking";
import { useReducer } from "react";
import { handler } from "~/components/forms/MeasureRequest";

type Data = {
  scores: Awaited<ReturnType<typeof scoresForGraph>>;
};

export const loader: LoaderFunction = async () => {
  const [test, scores] = await Promise.all([getSample(), scoresForGraph()]);
  console.log(test);

  return { scores };
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  if (await handler(data)) return null;

  throw new Error("invalid request");
};

const Index = () => {
  const team = useTeamContext();
  const { scores } = useLoaderData<Data>();
  const [flag, toggle] = useReducer((s) => !s, false);
  if (!team) return null;

  return (
    <>
      <MeasurementRequest teamId={team.id} url={team.pageUrl ?? ""} />
      <Box height="500px" mt={8}>
        <Flex alignItems="end" mb={4}>
          <Heading as="h2">Score</Heading>
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
    </>
  );
};

export default Index;
