import { MeasurementRequestForm } from "~/components/MeasurementReuestForm";
import { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { getSample } from "~/graphql/request/Sample";
import { lineup } from "~/graphql/request/Queue";
import { useTeamContext } from "~/components/contexts/UserAndTeam";

export const loader: LoaderFunction = async ({ request }) => {
  const test = await getSample();
  console.log(test);

  return null;
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
  if (!team) return null;

  return (
    <>
      <MeasurementRequestForm teamId={team.id} url={team.pageUrl ?? ""} />
    </>
  );
};

export default Index;
