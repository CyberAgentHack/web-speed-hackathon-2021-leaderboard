import { MeasurementRequestForm } from "~/components/MeasurementReuestForm";
import { Navbar } from "~/components/Navbar";
import { Box } from "@chakra-ui/react";

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
