import { MeasurementRequestForm } from "~/components/MeasurementReuestForm";
import { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { getSample } from "~/graphql/request/Sample";
import { lineup } from "~/graphql/request/Queue";

export const loader: LoaderFunction = async ({ request }) => {
  const test = await getSample();
  console.log(test);

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  // TODO: validation
  const queues = await lineup({ teamId: Number(form.get("termId")) });

  return queues?.data?.insertIntoQueueCollection?.records;
};

const Index = () => {
  return (
    <>
      <MeasurementRequestForm />
    </>
  );
};

export default Index;
