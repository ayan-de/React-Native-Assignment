import { View, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { TopNavBar } from "../components/top-nav-bar";
import { CourseSwitcher } from "../components/course-switcher";
import { QuestionCard } from "../components/question-card";
import { ProPromoBanner } from "../components/pro-promo-banner";
import { BottomNav } from "../components/bottom-nav";
import { useQuestions } from "../hooks/use-questions";
import type { HomeTab, Question } from "../types";
import { useState, useCallback } from "react";

type ListItem =
  | { type: "question"; question: Question }
  | { type: "promo"; count: number; questionNumber: number };

export function HomeScreen() {
  const { questions } = useQuestions();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<HomeTab>("Home");

  const listItems: ListItem[] = [];
  questions.forEach((q, index) => {
    listItems.push({ type: "question", question: q });
    if (index === 2) {
      listItems.push({
        type: "promo",
        count: q.completedTodayCount,
        questionNumber: q.questionNumber,
      });
    }
  });

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => {
      if (item.type === "question") {
        return (
          <QuestionCard
            question={item.question}
            onPress={(id) => {
              console.log("Pressed question:", id);
            }}
          />
        );
      }
      return (
        <ProPromoBanner
          count={item.count}
          questionNumber={item.questionNumber}
        />
      );
    },
    []
  );

  const handleTabPress = useCallback((tab: string) => {
    setActiveTab(tab as HomeTab);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TopNavBar />
        <View style={styles.switcherSpacer}>
          <CourseSwitcher />
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlashList
          data={listItems}
          renderItem={renderItem}
          getItemType={(item) => item.type}
          keyExtractor={(item, index) =>
            item.type === "promo" ? "promo" : `${item.type}-${index}`
          }
          contentContainerStyle={styles.listContent}
        />
      </View>

      <BottomNav activeTab={activeTab} onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.background,
    paddingTop: 8,
  },
  switcherSpacer: {
    paddingBottom: spacing.s,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.xs,
  },
});
