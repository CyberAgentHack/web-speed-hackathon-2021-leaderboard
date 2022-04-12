import * as z from "zod"
import * as imports from "./customs"
import { CompleteTeam, RelatedTeamModel } from "./index"

export const MeasurementModel = z.object({
  id: z.string(),
  teamId: z.string(),
  score: z.number(),
  vrtUrl: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteMeasurement extends z.infer<typeof MeasurementModel> {
  Team: CompleteTeam
}

/**
 * RelatedMeasurementModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedMeasurementModel: z.ZodSchema<CompleteMeasurement> = z.lazy(() => MeasurementModel.extend({
  Team: RelatedTeamModel,
}))
