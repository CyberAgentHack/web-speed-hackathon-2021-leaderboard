import { isErr } from 'option-t/cjs/PlainResult';

import type { Competitor, MeasurementResult } from './types';
import { fetchBuildInfo } from './fetch_build_info';
import { measureCompetitor } from './measure_competitor';

export async function scoring(competitor: Competitor, targetPaths: string[]): Promise<MeasurementResult> {
  const result = await measureCompetitor(competitor, targetPaths);

  if (isErr(result)) {
    return {
      competitor,
      result: { error: result.err },
    };
  }

  const buildInfo = await fetchBuildInfo(competitor);

  return {
    competitor,
    buildInfo,
    result: result.val,
  };
}
