export type Competitor = {
  id: string;
  url: string;
};

export type LighthouseScore = {
  score: number;
  firstContentfulPaint: number;
  speedIndex: number;
  largestContentfulPaint: number;
  timeToInteractive: number;
  totalBlockingTime: number;
  cumulativeLayoutShift: number;
};

export type LighthouseScoreList = {
  [path: string]: LighthouseScore;
};

export type HackathonScore = {
  score: number;
  lighthouseScores: LighthouseScoreList;
};

export type BuildInfo = {
  commitHash: string;
  buildDate: string;
};

export type MeasurementResult =
  | {
      competitor: Competitor;
      buildInfo: BuildInfo | null;
      result: HackathonScore;
    }
  | {
      competitor: Competitor;
      result: { error: Error };
    };
