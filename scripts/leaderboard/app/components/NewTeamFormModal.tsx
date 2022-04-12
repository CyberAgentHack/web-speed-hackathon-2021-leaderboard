import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { PrimaryButton } from "~/components/atoms/Button";
import {
  NewTeamFormWrapper,
  Submit,
  TeamNameInput,
} from "~/components/forms/CreateTeam";

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
          <NewTeamFormWrapper>
            <ModalBody pb={6}>
              <TeamNameInput />
            </ModalBody>
            <ModalFooter>
              <Submit afterSubmit={onClose} />
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </NewTeamFormWrapper>
        </ModalContent>
      </Modal>
    </>
  );
};
