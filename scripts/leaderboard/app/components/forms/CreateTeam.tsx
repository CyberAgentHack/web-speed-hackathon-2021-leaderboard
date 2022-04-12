import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { PrimaryButton } from "~/components/atoms/Button";
import { withZod } from "@remix-validated-form/with-zod";
import { TeamModel } from "~/zod";
import {
  useField,
  useFormContext,
  useIsSubmitting,
  validationError,
  ValidatedForm,
} from "remix-validated-form";
import { createTeam } from "~/graphql/request/Teaming";
import { ReactNode, useEffect } from "react";

const validator = withZod(TeamModel.pick({ name: true }));

export const handler = async (data: FormData) => {
  if (!data.has("newTeam")) return;
  const fieldValues = await validator.validate(data);
  if (fieldValues.error) throw validationError(fieldValues.error);
  const { name } = fieldValues.data;

  await createTeam({ name });

  return true;
};

export const NewTeamFormWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ValidatedForm method="post" validator={validator}>
      {children}
    </ValidatedForm>
  );
};

export const TeamNameInput = () => {
  const { error, getInputProps } = useField("name");
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>Team Name</FormLabel>
      <Input {...getInputProps()} />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export const Submit = ({ afterSubmit }: { afterSubmit?: Function }) => {
  const isSubmitting = useIsSubmitting();
  const { isValid, hasBeenSubmitted } = useFormContext();
  useEffect(() => {
    hasBeenSubmitted && afterSubmit?.();
  }, [hasBeenSubmitted, afterSubmit]);
  return (
    <PrimaryButton
      type="submit"
      mr={3}
      disabled={isSubmitting || !isValid}
      name="newTeam"
    >
      {isSubmitting ? "Submitting..." : "Submit"}
    </PrimaryButton>
  );
};
