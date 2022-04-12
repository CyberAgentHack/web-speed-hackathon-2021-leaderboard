import * as z from "zod"
import * as imports from "./customs"
import { CompleteUser, RelatedUserModel, CompleteMeasurement, RelatedMeasurementModel, CompleteQueue, RelatedQueueModel } from "./index"

export const TeamModel = z.object({
  id: z.string(),
  name: z.string().min(3).max(15).refine(imports.strip),
  pageUrl: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteTeam extends z.infer<typeof TeamModel> {
  Users: CompleteUser[]
  Measurements: CompleteMeasurement[]
  Queues: CompleteQueue[]
}

/**
 * RelatedTeamModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTeamModel: z.ZodSchema<CompleteTeam> = z.lazy(() => TeamModel.extend({
  Users: RelatedUserModel.array(),
  Measurements: RelatedMeasurementModel.array(),
  Queues: RelatedQueueModel.array(),
}))
