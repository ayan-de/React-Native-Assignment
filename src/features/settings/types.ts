export interface StreakInfo {
  currentStreak: number;
  maxStreak: number;
}

export interface CalendarDay {
  day: number;
  state: "none" | "active" | "missed" | "today";
}

export interface CalendarWeek {
  days: CalendarDay[];
}

export interface SettingsData {
  streak: StreakInfo;
  calendarMonth: string;
  calendarWeeks: CalendarWeek[];
  phoneNumber: string;
  learningSince: string;
  trialPrice: string;
  trialMonthlyPrice: string;
  appVersion: string;
}
