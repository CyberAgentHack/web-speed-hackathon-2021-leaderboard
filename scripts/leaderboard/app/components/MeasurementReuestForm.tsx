import { useActionData } from "@remix-run/react";
import { Form } from "@remix-run/react";
import {
  Stack,
  FormControl,
  Input,
  useColorModeValue,
  Heading,
  Container,
  Flex,
} from "@chakra-ui/react";
import { PrimaryButton } from "~/components/atoms/Button";

type Props = {
  teamId: string;
  url?: string;
};

export const MeasurementRequestForm = ({ teamId, url }: Props) => {
  // TODO: display error
  const errors = useActionData();

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Container
        maxW="lg"
        bg={useColorModeValue("white", "whiteAlpha.100")}
        boxShadow="xl"
        rounded="lg"
        p={6}
      >
        <Heading
          as="h2"
          fontSize={{ base: "xl", sm: "2xl" }}
          textAlign="center"
          mb={5}
        >
          Request Measurement
        </Heading>
        <Form method="post">
          <input type="hidden" value={teamId} name="termId" />
          <Stack direction={{ base: "column", md: "row" }} spacing="12px">
            <FormControl>
              <Input
                variant="solid"
                borderWidth={1}
                color="gray.800"
                _placeholder={{
                  color: "gray.400",
                }}
                borderColor={useColorModeValue("gray.300", "gray.700")}
                type="url"
                required
                placeholder="Your Page URL"
                defaultValue={url ?? ""}
                name="pageUrl"
              />
            </FormControl>
            <FormControl w={{ base: "100%", md: "40%" }}>
              <PrimaryButton w="full" type="submit">
                Request
              </PrimaryButton>
            </FormControl>
          </Stack>
        </Form>
      </Container>
    </Flex>
  );
};
