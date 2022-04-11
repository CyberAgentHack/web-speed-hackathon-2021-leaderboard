import type { Competitor } from './types';
import { scoring } from './scoring';

export async function main(id: string, url: string) {
  const competitor: Competitor = {
    id,
    url,
  };

  //const targetPaths = JSON.parse(process.env['WSH_SCORING_TARGET_PATHS'] as string);
  const targetPaths = ['/'];

  const result = await scoring(competitor, targetPaths);

  if ('error' in result.result) {
    throw result.result.error;
  }
  console.log(`::set-output name=export::${JSON.stringify(result)}`);

  return result;
}
