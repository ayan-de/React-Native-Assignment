export interface SessionResultRouteParams {
  questionId: string;
}

export type FeedbackTab = "smart-summary" | "key-moments";

export interface BulletPoint {
  id: string;
  text: string;
}

export interface KeyMoment {
  id: string;
  timestamp: string;
  description: string;
  type: "positive" | "negative" | "neutral";
}

export interface SmartSummary {
  whatWorkedWell: BulletPoint[];
  overallTakeaways: BulletPoint[];
}

export interface SessionResult {
  questionId: string;
  questionText: string;
  companyName: string;
  companyLogoKey: string;
  durationMinutes: number;
  avatarUrl: string;
  smartSummary: SmartSummary;
  keyMoments: KeyMoment[];
  audioDurationSeconds: number;
  audioProgressPercent: number;
}
