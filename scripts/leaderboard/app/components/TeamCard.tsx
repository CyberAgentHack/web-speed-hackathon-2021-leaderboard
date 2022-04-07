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

type Props = {
  id: number;
  name: string;
  members: string[];
  joinable?: boolean;
};

export const TeamCard = ({ name, members, joinable = false }: Props) => {
  return (
    <Center py={6}>
      <Box
        w={"300px"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
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

          <PrimaryButton mt={10} w={"full"}>
            Join
          </PrimaryButton>
        </Box>
      </Box>
    </Center>
  );
};
