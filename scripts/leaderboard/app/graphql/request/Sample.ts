import { client } from '../apollo-client'
import { SampleDocument, SampleQuery } from 'generated/graphql'

export const getSample = async () => {
  return await client.query<SampleQuery>({
    query: SampleDocument
  })
}
