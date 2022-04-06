import { ActionFunction } from "@remix-run/cloudflare";
import { MeasurementRequestForm } from "~/components/MeasurementReuestForm";
import { Navbar } from "~/components/Navbar";
import { Box } from "@chakra-ui/react";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const endpoint = form.get('endpoint');

  // TODO: validation
  // TODO: create Queue

  // TODO: return Queue list
  return {};
};

const Index = () => {
  return (
    <>
      <Box pos="fixed" w="100%">
        <Navbar />
      </Box>
      <MeasurementRequestForm />
    </>
  );
};

export default Index;
