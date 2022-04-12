import { PrimaryButton } from "~/components/atoms/Button";
import { withZod } from "@remix-validated-form/with-zod";
import { UserModel } from "~/zod";
import {
  useFormContext,
  useIsSubmitting,
  validationError,
  ValidatedForm,
} from "remix-validated-form";
import { joinTeam } from "~/graphql/request/Teaming";
import { useUserContext } from "~/components/contexts/UserAndTeam";

const validator = withZod(UserModel.pick({ teamId: true, email: true }));

export const handler = async (data: FormData) => {
  if (!data.has("joinTeam")) return;
  const fieldValues = await validator.validate(data);
  if (fieldValues.error) throw validationError(fieldValues.error);
  const { teamId, email } = fieldValues.data;

  await joinTeam({ teamId, email });

  return true;
};

export const JoinTeamForm = ({
  teamId,
  disabled = false,
}: {
  teamId: string;
  disabled?: boolean;
}) => {
  return (
    <ValidatedForm method="post" validator={validator}>
      <input type="hidden" name="teamId" value={teamId} />
      <input type="hidden" name="email" value={useUserContext()?.email ?? ""} />
      <Submit disabled={disabled} />
    </ValidatedForm>
  );
};

const Submit = ({ disabled }: { disabled?: boolean }) => {
  const isSubmitting = useIsSubmitting();
  const { isValid } = useFormContext();
  return (
    <PrimaryButton
      mt={10}
      w={"full"}
      type="submit"
      name="joinTeam"
      disabled={disabled || isSubmitting || !isValid}
    >
      {isSubmitting ? "Processing..." : "Join"}
    </PrimaryButton>
  );
};
