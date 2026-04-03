import { View, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { TopNavBar } from "../components/top-nav-bar";
import { CourseSwitcher } from "../components/course-switcher";
import { QuestionCard } from "../components/question-card";
import { ProPromoBanner } from "../components/pro-promo-banner";
import { BottomNav } from "../components/bottom-nav";
import { QuestionDetailModal } from "../components/question-detail-modal";
import { useQuestions } from "../hooks/use-questions";
import type { HomeTab, Question } from "../types";
import { useState, useCallback } from "react";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "@/navigation/types";

type ListItem =
  | { type: "question"; question: Question; questionIndex: number }
  | { type: "promo"; count: number; questionNumber: number };

export function HomeScreen() {
  const { questions } = useQuestions();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<HomeTab>("Home");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const listItems: ListItem[] = [];
  let questionIndex = 0;
  questions.forEach((q, idx) => {
    listItems.push({ type: "question", question: q, questionIndex });
    questionIndex++;
    if (idx === 2) {
      listItems.push({
        type: "promo",
        count: q.completedTodayCount,
        questionNumber: q.questionNumber,
      });
    }
  });

  const handleQuestionPress = useCallback((id: string) => {
    const q = questions.find((q) => q.id === id);
    if (q) {
      setSelectedQuestion(q);
      setIsModalVisible(true);
    }
  }, [questions]);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
    setSelectedQuestion(null);
  }, []);

  const handleReady = useCallback((questionId: string) => {
    setIsModalVisible(false);
    setSelectedQuestion(null);
    navigation.navigate("SessionResult", { questionId });
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: ListItem }) => {
      if (item.type === "question") {
        return (
          <QuestionCard
            question={item.question}
            index={item.questionIndex}
            onPress={handleQuestionPress}
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
    [handleQuestionPress]
  );

  const handleTabPress = useCallback((tab: string) => {
    if (tab === "Progress") {
      navigation.navigate("Settings");
      return;
    }
    setActiveTab(tab as HomeTab);
  }, [navigation]);

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

      <QuestionDetailModal
        visible={isModalVisible}
        question={selectedQuestion}
        onClose={handleCloseModal}
        onReady={handleReady}
      />
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
