import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "@/theme/typography";
import { companyLogos, homeColors } from "../constants";
import type { QuestionCardProps } from "../types";

export function QuestionCard({ question, onPress }: QuestionCardProps) {
  const isUpNext = question.state === "upnext";
  const isDone = question.state === "done";

  const containerStyle = isUpNext
    ? styles.containerUpNext
    : isDone
      ? styles.containerDone
      : styles.containerNotDone;

  const companyStyle = isUpNext
    ? styles.companyUpNext
    : isDone
      ? styles.companyDone
      : styles.companyNotDone;

  const numberStyle = isUpNext
    ? styles.numberUpNext
    : isDone
      ? styles.numberDone
      : styles.numberNotDone;

  return (
    <Pressable
      style={[styles.container, containerStyle]}
      onPress={() => onPress(question.id)}
    >
      <View style={[styles.companySection, companyStyle]}>
        <Text
          style={[styles.companyName, !isUpNext && !isDone && styles.companyNameMuted]}
          numberOfLines={1}
        >
          {question.companyName}
        </Text>
        <View style={styles.logoCircle}>
          <Image
            source={companyLogos[question.companyLogoKey]}
            style={styles.logo}
            contentFit="contain"
            cachePolicy="memory-disk"
          />
        </View>
      </View>

      <View style={styles.buttonSection}>
        <View style={[styles.numberCircle, numberStyle]}>
          {isDone && (
            <View style={styles.checkmarkBadge}>
              <Ionicons name="checkmark-circle" size={14} color={homeColors.checkmarkGreen} />
            </View>
          )}
          <Text style={styles.numberText}>{question.questionNumber}</Text>
        </View>

        {isUpNext && (
          <View style={styles.startRow}>
            <View style={styles.startPill}>
              <Text style={styles.startLabel}>START</Text>
            </View>
            <Ionicons name="chevron-forward" size={14} color={homeColors.darkText} />
          </View>
        )}
      </View>
    </Pressable>
  );
}

const NUMBER_SIZE = 48;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
  },
  containerUpNext: {
    shadowColor: "#C19500",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 0,
    elevation: 4,
  },
  containerDone: {
    shadowColor: "#BF9C26",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 0,
    elevation: 4,
  },
  containerNotDone: {
    shadowColor: "#8E8E93",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 2,
  },
  companySection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 8,
    borderRadius: 30,
    marginRight: 8,
  },
  companyUpNext: {
    backgroundColor: homeColors.cream,
  },
  companyDone: {
    backgroundColor: "#F0FDF4",
  },
  companyNotDone: {
    backgroundColor: "#F5F5F8",
  },
  companyName: {
    flex: 1,
    fontSize: 14,
    fontFamily: typography.fonts.inter.medium,
    fontWeight: "500",
    color: homeColors.darkText,
  },
  companyNameMuted: {
    color: homeColors.mutedText,
  },
  logoCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  logo: {
    width: 22,
    height: 22,
  },
  buttonSection: {
    alignItems: "center",
    gap: 4,
  },
  numberCircle: {
    width: NUMBER_SIZE,
    height: NUMBER_SIZE,
    borderRadius: NUMBER_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  numberUpNext: {
    backgroundColor: "#F59E0B",
  },
  numberDone: {
    backgroundColor: "#4ADE80",
  },
  numberNotDone: {
    backgroundColor: "#D1D1D6",
  },
  checkmarkBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    zIndex: 1,
  },
  numberText: {
    fontSize: 22,
    fontFamily: typography.fonts.inter.bold,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  startRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  startPill: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#FF7800",
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  startLabel: {
    fontSize: 10,
    fontFamily: typography.fonts.inter.semiBold,
    fontWeight: "600",
    color: "#1C1C1E",
    letterSpacing: 0.5,
  },
});
