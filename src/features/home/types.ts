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

export interface QuestionCardProps {
  question: Question;
  onPress: (id: string) => void;
}

export interface BottomNavProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export type HomeTab = "Home" | "Store" | "Progress";
