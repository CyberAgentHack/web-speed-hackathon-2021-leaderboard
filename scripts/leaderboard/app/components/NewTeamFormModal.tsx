import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Form } from "@remix-run/react";
import { PrimaryButton } from "~/components/atoms/Button";

export const NewTeamFormModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <PrimaryButton onClick={onOpen}>New Team</PrimaryButton>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new team</ModalHeader>
          <ModalCloseButton />
          <Form method="post" onSubmit={onClose}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>* Team Name (max 15 chars)</FormLabel>
                <Input required type="text" name="name" maxLength={15} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>URL</FormLabel>
                <Input placeholder="Your page url" type="url" name="pageUrl" />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <PrimaryButton type="submit" mr={3}>
                Save
              </PrimaryButton>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};
