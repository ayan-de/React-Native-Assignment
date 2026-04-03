export type QuestionState = "done" | "upnext" | "not-done";

export interface Question {
  id: string;
  questionNumber: number;
  companyId: string;
  companyName: string;
  companyLogoKey: string;
  text: string;
  durationMinutes: number;
  completedTodayCount: number;
  state: QuestionState;
}

export interface Company {
  id: string;
  name: string;
  logoKey: string;
  logoUrl: string;
}

const STAIR_PATTERN = [40, 80, 120, 160, 120, 80];

export function getStairPadding(index: number): number {
  return STAIR_PATTERN[index % STAIR_PATTERN.length];
}

export interface QuestionCardProps {
  question: Question;
  index: number;
  onPress: (id: string) => void;
}

export interface BottomNavProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export type HomeTab = "Home" | "Store" | "Settings";

export interface QuestionDetailModalProps {
  visible: boolean;
  question: Question | null;
  onClose: () => void;
  onReady: (questionId: string) => void;
}
