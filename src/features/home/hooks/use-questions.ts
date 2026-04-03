import { useMemo } from "react";
import questionsData from "@/mock-data/questions.json";
import type { Question } from "../types";

export function useQuestions() {
  const questions: Question[] = useMemo(() => {
    return questionsData.map((q) => ({
      ...q,
      state: q.state as Question["state"],
    }));
  }, []);

  return { questions };
}
