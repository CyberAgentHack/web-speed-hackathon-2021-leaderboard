import { MeasurementRequestForm } from "~/components/MeasurementReuestForm";
import { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { getSample } from "~/graphql/request/Sample";
import { lineup } from "~/graphql/request/Queue";
import { useTeamContext } from "~/components/contexts/UserAndTeam";
import { scoresForGraph } from "~/graphql/request/Measurement";
import { Chart } from "~/components/Chart";
import { useLoaderData } from "@remix-run/react";
import { Box, Heading } from "@chakra-ui/react";
import { ObserveMeasurementsAndRefresh } from "~/components/ObserveMeasurements";

type Data = {
  scores: Awaited<ReturnType<typeof scoresForGraph>>;
};

export const loader: LoaderFunction = async () => {
  const [test, scores] = await Promise.all([getSample(), scoresForGraph()]);
  console.log(test);

  return { scores };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const [teamId, pageUrl] = [form.get("termId"), form.get("pageUrl")];
  if (!(typeof teamId === "string" && typeof pageUrl === "string"))
    throw new Error("Invalid request");

  return await lineup({ teamId, pageUrl });
  // const queues = await lineup({ teamId, pageUrl });

  // return queues?.data?.insertIntoQueueCollection?.records;
};

const Index = () => {
  const team = useTeamContext();
  const { scores } = useLoaderData<Data>();
  if (!team) return null;

  return (
    <>
      <MeasurementRequestForm teamId={team.id} url={team.pageUrl ?? ""} />
      <Box height="500px" mt={8}>
        <Heading as="h2" textAlign="center" p={4}>
          Score
        </Heading>
        <Chart data={scores} />
        <ObserveMeasurementsAndRefresh />
      </Box>
    </>
  );
};

export default Index;
