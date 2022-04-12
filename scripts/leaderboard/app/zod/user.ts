import * as z from "zod"
import * as imports from "./customs"
import { CompleteTeam, RelatedTeamModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  teamId: z.string().nullish(),
  email: z.string().email(),
  name: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  Team?: CompleteTeam | null
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  Team: RelatedTeamModel.nullish(),
}))
