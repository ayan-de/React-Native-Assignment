import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { companyLogos } from "@/features/home/constants";
import { call1, call2 } from "@/assets";
import { useState } from "react";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "@/navigation/types";
import type { FeedbackTab, SessionResult } from "../types";
import type { Question } from "@/features/home/types";
import sessionResultData from "@/mock-data/session-result.json";
import questionsData from "@/mock-data/questions.json";

type SessionResultRouteProp = RouteProp<RootStackParamList, "SessionResult">;

const AVATAR_SIZE = 107;

const questions = questionsData as Question[];

const feedbackColors = {
  screenBg: "#D4F3E5",
  questionCardBg: "#00C35F",
  questionCardBorder: "#D4F3E5",
  closeBtnBg: "#79E8BA",
  closeBtnShadow: "#00C35F",
  closeIcon: "#1C1C1E",
  tabActiveText: "#2C2C2E",
  tabInactiveText: "#6C6C70",
  tabIndicator: "#2C2C2E",
  tabBarBorder: "#EFEFF4",
  sectionTitle: "#48484A",
  bulletText: "#48484A",
  bulletIcon: "#6C6C70",
  divider: "#EFEFF4",
  companySubtitle: "#EFEFF4",
  white: "#FFFFFF",
};

const highlightColors = {
  playerBg: "#FFF0E3",
  playBtnBg: "#FFFFFF",
  playIcon: "#CD5800",
  progressBg: "#FFCEA0",
  progressFillTop: "#FF6D00",
  progressFillBottom: "#FF3900",
  progressBorder: "#CD5800",
  audioLabel: "#CD5800",
  audioTime: "#6C6C70",
  highlightTitle: "#0093FA",
  highlightDescription: "#48484A",
  dividerLine: "#EFEFF4",
};

export function SessionResultScreen() {
  const route = useRoute<SessionResultRouteProp>();
  const navigation = useNavigation();
  const { questionId } = route.params;
  const [activeTab, setActiveTab] = useState<FeedbackTab>("smart-summary");

  const result: SessionResult = sessionResultData as SessionResult;
  const question = questions.find((q) => q.id === questionId);
  const companyName = question?.companyName ?? result.companyName;
  const companyLogoKey = question?.companyLogoKey ?? result.companyLogoKey;
  const questionText = question?.text ?? result.questionText;
  const isSmartSummary = activeTab === "smart-summary";

  const handleClose = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Pressable style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={18} color={feedbackColors.closeIcon} />
        </Pressable>

        <View style={styles.avatarRow}>
          <View style={styles.avatarBack}>
            <Image
              source={call1}
              style={styles.avatar}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
          </View>
          <View style={styles.avatarFront}>
            <Image
              source={call2}
              style={styles.avatar}
              contentFit="cover"
              cachePolicy="memory-disk"
            />
          </View>
        </View>

        <View style={styles.questionCardWrapper}>
          <View style={styles.diamond} />
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{questionText}</Text>
            <View style={styles.companyRow}>
              <View style={styles.companyInfo}>
                <Text style={styles.companySubtitle}>
                  Asked by {companyName}
                </Text>
                {companyLogos[companyLogoKey] && (
                  <View style={styles.logoCircle}>
                    <Image
                      source={companyLogos[companyLogoKey]}
                      style={styles.logo}
                      contentFit="contain"
                      cachePolicy="memory-disk"
                    />
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.tabBar}>
          <Pressable
            style={styles.tab}
            onPress={() => setActiveTab("smart-summary")}
          >
            <Text
              style={[
                styles.tabLabel,
                isSmartSummary && styles.tabLabelActive,
              ]}
            >
              Smart Summary
            </Text>
            {isSmartSummary && <View style={styles.tabIndicator} />}
          </Pressable>
          <Pressable
            style={styles.tab}
            onPress={() => setActiveTab("key-moments")}
          >
            <Text
              style={[
                styles.tabLabel,
                !isSmartSummary && styles.tabLabelActive,
              ]}
            >
              Key Moments
            </Text>
            {!isSmartSummary && <View style={styles.tabIndicator} />}
          </Pressable>
        </View>

        {isSmartSummary ? (
          <SmartSummaryContent result={result} />
        ) : (
          <KeyMomentsContent result={result} />
        )}
      </View>
    </View>
  );
}

function SmartSummaryContent({ result }: { result: SessionResult }) {
  return (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What worked well</Text>
        {result.smartSummary.whatWorkedWell.map((item) => (
          <View key={item.id} style={styles.bulletRow}>
            <Ionicons
              name="star"
              size={10}
              color={feedbackColors.bulletIcon}
              style={styles.bulletIcon}
            />
            <Text style={styles.bulletText}>{item.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overall Takeaways</Text>
        {result.smartSummary.overallTakeaways.map((item) => (
          <View key={item.id} style={styles.bulletRow}>
            <Ionicons
              name="star"
              size={10}
              color={feedbackColors.bulletIcon}
              style={styles.bulletIcon}
            />
            <Text style={styles.bulletText}>{item.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function KeyMomentsContent({ result }: { result: SessionResult }) {
  const elapsedSec = Math.round(
    (result.audioProgressPercent / 100) * result.audioDurationSeconds
  );
  const elapsedMin = Math.floor(elapsedSec / 60);
  const elapsedRemSec = elapsedSec % 60;
  const totalMin = Math.floor(result.audioDurationSeconds / 60);
  const totalRemSec = result.audioDurationSeconds % 60;

  const formatTime = (m: number, s: number) =>
    `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  return (
    <ScrollView
      style={styles.highlightsScroll}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.audioPlayerCard}>
        <View style={styles.audioPlayerRow}>
          <View style={styles.playButton}>
            <Ionicons
              name="play"
              size={20}
              color={highlightColors.playIcon}
            />
          </View>
          <View style={styles.audioTextSection}>
            <Text style={styles.audioLabel}>Mock Interview</Text>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${result.audioProgressPercent}%` },
                ]}
              />
            </View>
            <View style={styles.audioTimeRow}>
              <Text style={styles.audioTimeText}>
                {formatTime(elapsedMin, elapsedRemSec)}
              </Text>
              <Text style={styles.audioTimeText}>
                {formatTime(totalMin, totalRemSec)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.highlightsList}>
        {result.keyMoments.map((moment, index) => (
          <View key={moment.id}>
            <View style={styles.highlightItem}>
              <Text style={styles.highlightTitle}>
                {moment.timestamp}
              </Text>
              <Text style={styles.highlightDescription}>
                {moment.description}
              </Text>
            </View>
            {index < result.keyMoments.length - 1 && (
              <View style={styles.highlightDivider} />
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: feedbackColors.screenBg,
  },
  headerSection: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 0,
    paddingHorizontal: spacing.m,
  },
  closeButton: {
    position: "absolute",
    top: 56,
    right: spacing.m,
    width: 42,
    height: 42,
    borderRadius: 28,
    backgroundColor: feedbackColors.closeBtnBg,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: feedbackColors.closeBtnShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    zIndex: 10,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: -5,
  },
  avatarBack: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: feedbackColors.white,
    overflow: "hidden",
    marginRight: -23,
  },
  avatarFront: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: feedbackColors.white,
    borderWidth: 2.7,
    borderColor: feedbackColors.questionCardBorder,
    overflow: "hidden",
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  questionCardWrapper: {
    alignItems: "center",
    width: "100%",
  },
  diamond: {
    width: 20,
    height: 20,
    backgroundColor: feedbackColors.questionCardBg,
    borderRadius: 2,
    transform: [{ rotate: "45deg" }],
    marginBottom: -10,
    zIndex: 2,
  },
  questionCard: {
    width: "100%",
    backgroundColor: feedbackColors.questionCardBg,
    borderRadius: spacing.m,
    padding: spacing.m,
    gap: 10,
    zIndex: 1,
  },
  questionText: {
    fontSize: 16,
    fontFamily: typography.fonts.inter.bold,
    fontWeight: "700",
    color: feedbackColors.white,
    lineHeight: 22,
    textAlign: "center",
  },
  companyRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  companyInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  companySubtitle: {
    fontSize: 14,
    fontFamily: typography.fonts.inter.semiBold,
    fontWeight: "600",
    color: feedbackColors.companySubtitle,
    letterSpacing: -0.01,
  },
  logoCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: feedbackColors.white,
    overflow: "hidden",
  },
  logo: {
    width: 22,
    height: 22,
  },
  detailsCard: {
    flex: 1,
    backgroundColor: feedbackColors.white,
    borderTopLeftRadius: spacing.xxl,
    borderTopRightRadius: spacing.xxl,
    marginTop: 12,
    paddingHorizontal: spacing.m,
    paddingTop: spacing.l,
    paddingBottom: spacing.xxxl,
    gap: spacing.m,
  },
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: feedbackColors.tabBarBorder,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingBottom: spacing.xs,
    position: "relative",
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: typography.fonts.inter.normal,
    color: feedbackColors.tabInactiveText,
    letterSpacing: -0.01,
  },
  tabLabelActive: {
    fontFamily: typography.fonts.inter.medium,
    fontWeight: "500",
    color: feedbackColors.tabActiveText,
  },
  tabIndicator: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: feedbackColors.tabIndicator,
    borderRadius: 2,
  },
  tabContent: {
    gap: spacing.xs,
  },
  section: {
    gap: spacing.xs,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: typography.fonts.inter.semiBold,
    fontWeight: "600",
    color: feedbackColors.sectionTitle,
    lineHeight: 22,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.xs,
  },
  bulletIcon: {
    marginTop: 6,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    fontFamily: typography.fonts.inter.medium,
    fontWeight: "500",
    color: feedbackColors.bulletText,
    lineHeight: 19,
  },
  divider: {
    height: 1,
    backgroundColor: feedbackColors.divider,
    marginVertical: spacing.xs,
  },
  highlightsScroll: {
    flex: 1,
  },
  audioPlayerCard: {
    backgroundColor: highlightColors.playerBg,
    borderRadius: spacing.cardRadius,
    padding: spacing.m,
  },
  audioPlayerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.m,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: highlightColors.playBtnBg,
    alignItems: "center",
    justifyContent: "center",
  },
  audioTextSection: {
    flex: 1,
    gap: spacing.xs,
  },
  audioLabel: {
    fontSize: 14,
    fontFamily: typography.fonts.inter.semiBold,
    fontWeight: "600",
    color: highlightColors.audioLabel,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: highlightColors.progressBg,
    borderRadius: spacing.cardRadius,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FF5300",
    borderBottomWidth: 1,
    borderBottomColor: highlightColors.progressBorder,
    borderRadius: spacing.cardRadius,
  },
  audioTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  audioTimeText: {
    fontSize: 12,
    fontFamily: typography.fonts.inter.semiBold,
    fontWeight: "600",
    color: highlightColors.audioTime,
  },
  highlightsList: {
    gap: 0,
    marginTop: spacing.m,
  },
  highlightItem: {
    gap: spacing.xxs,
    paddingVertical: spacing.xs,
  },
  highlightTitle: {
    fontSize: 14,
    fontFamily: typography.fonts.inter.semiBold,
    fontWeight: "600",
    color: highlightColors.highlightTitle,
    lineHeight: 19,
  },
  highlightDescription: {
    fontSize: 14,
    fontFamily: typography.fonts.inter.medium,
    fontWeight: "500",
    color: highlightColors.highlightDescription,
    lineHeight: 19,
  },
  highlightDivider: {
    height: 8,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: highlightColors.dividerLine,
  },
});
