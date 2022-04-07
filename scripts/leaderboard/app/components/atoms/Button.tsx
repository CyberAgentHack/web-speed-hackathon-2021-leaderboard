import { ComponentProps } from "react";
import { Button } from "@chakra-ui/react";

export const PrimaryButton = (
  props: Partial<ComponentProps<typeof Button>>
) => {
  return (
    <Button
      bg={"green.400"}
      color={"white"}
      rounded={"xl"}
      boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
      _hover={{
        bg: "green.500",
        _disabled: {
          bg: "green.100",
        },
      }}
      _focus={{
        bg: "green.500",
        _disabled: {
          bg: "green.100",
        },
      }}
      _disabled={{
        bg: "green.100",
      }}
      colorScheme="blue"
      {...props}
    />
  );
};
