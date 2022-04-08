import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsFillPersonFill } from "react-icons/bs";
import { PrimaryButton } from "~/components/atoms/Button";
import { Form } from "@remix-run/react";

type Props = {
  id: number;
  name: string;
  members: string[];
  joinable?: boolean;
  mine?: boolean;
};

export const TeamCard = ({
  id,
  name,
  members,
  joinable = false,
  mine = false,
}: Props) => {
  return (
    <Center py={6}>
      <Box
        w={"300px"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
        {...(mine ? { border: "2px", borderColor: "green.200" } : {})}
      >
        <Stack
          textAlign={"center"}
          p={6}
          py={8}
          color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"xl"} isTruncated>
              {name}
            </Text>
          </Stack>
        </Stack>

        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
          <List h={"120px"} spacing={3}>
            {members.map((member) => (
              <ListItem key={member}>
                <ListIcon as={BsFillPersonFill} color="green.400" />
                {member}
              </ListItem>
            ))}
            {members.length < 1 && (
              <ListItem>
                <ListIcon as={BsFillPersonFill} color="green.400" />
                no member
              </ListItem>
            )}
          </List>

          <Form method="post">
            <input type="hidden" name="teamId" value={id} />
            <PrimaryButton
              mt={10}
              w={"full"}
              type="submit"
              name="join"
              disabled={!joinable || mine}
            >
              Join
            </PrimaryButton>
          </Form>
        </Box>
      </Box>
    </Center>
  );
};
