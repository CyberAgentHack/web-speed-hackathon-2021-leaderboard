import { Stack, FormControl, Heading, Box } from "@chakra-ui/react";
import {
  MeasureRequestFormWrapper,
  PageUrlInput,
  Submit,
} from "~/components/forms/MeasureRequest";

type Props = {
  teamId: string;
  url?: string;
};

export const MeasurementRequest = ({ teamId, url }: Props) => {
  return (
    <Box rounded="lg" p={6} borderWidth={2} w="full" maxH="160px">
      <Heading
        as="h2"
        fontSize={{ base: "xl", sm: "2xl" }}
        textAlign="center"
        mb={5}
      >
        Request Measurement
      </Heading>
      <MeasureRequestFormWrapper defaultValues={{ pageUrl: url }}>
        <input type="hidden" value={teamId} name="teamId" />
        <Stack direction={{ base: "column", md: "row" }} spacing="12px">
          <PageUrlInput placeholder="Your Page URL" />
          <FormControl w={{ base: "100%", md: "40%" }}>
            <Submit w="full" />
          </FormControl>
        </Stack>
      </MeasureRequestFormWrapper>
    </Box>
  );
};
