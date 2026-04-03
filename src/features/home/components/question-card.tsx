import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "@/theme/typography";
import { companyLogos, homeColors } from "../constants";
import { getStairPadding } from "../types";
import type { QuestionCardProps } from "../types";

const NUMBER_SIZE = 74;

export function QuestionCard({ question, index, onPress }: QuestionCardProps) {
  const isUpNext = question.state === "upnext";
  const isDone = question.state === "done";

  const companyBg = isUpNext
    ? homeColors.upNextCompanyBg
    : isDone
      ? homeColors.doneCompanyBg
      : homeColors.notDoneCompanyBg;

  const shadowColor = isUpNext
    ? homeColors.upNextShadow
    : isDone
      ? homeColors.doneCompanyShadow
      : homeColors.notDoneCompanyShadow;

  const numberBg = isUpNext
    ? homeColors.upNextNumberBg
    : isDone
      ? homeColors.doneNumberBg
      : homeColors.notDoneNumberBg;

  const logoBorder = isUpNext
    ? homeColors.logoBorderUpNext
    : isDone
      ? homeColors.logoBorderDone
      : homeColors.logoBorderNotDone;

  return (
    <Pressable
      style={[styles.container, { paddingLeft: getStairPadding(index), marginTop: isUpNext ? 28 : 0 }]}
      onPress={() => onPress(question.id)}
    >
      <View style={styles.innerRow}>
        <View style={[styles.companySection, { backgroundColor: companyBg, shadowColor }]}>
          <Text
            style={[
              styles.companyName,
              !isUpNext && !isDone && styles.companyNameMuted,
            ]}
            numberOfLines={1}
          >
            {question.companyName}
          </Text>
          <View style={[styles.logoCircle, { borderColor: logoBorder }]}>
            <Image
              source={companyLogos[question.companyLogoKey]}
              style={styles.logo}
              contentFit="contain"
              cachePolicy="memory-disk"
            />
          </View>
        </View>

        <View style={[styles.numberCircle, { backgroundColor: numberBg }]}>
          <Text style={styles.numberText}>{question.questionNumber}</Text>
        </View>
      </View>

      {isUpNext && (
        <View style={styles.startRow}>
          <View style={styles.startPill}>
            <Text style={styles.startLabel}>START</Text>
          </View>
          <Ionicons name="chevron-down" size={14} color={homeColors.darkText} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    height: 91,
    overflow: "visible",
  },
  innerRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  companySection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
    height: 73,
    width: 150,
    shadowOffset: { width: 1, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  companyName: {
    flex: 1,
    fontSize: 14,
    fontFamily: typography.fonts.inter.semiBold,
    fontWeight: "600",
    color: homeColors.companyTextDark,
  },
  companyNameMuted: {
    fontFamily: typography.fonts.inter.medium,
    fontWeight: "500",
    color: homeColors.companyTextDark,
  },
  logoCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: homeColors.white,
    borderWidth: 1,
    overflow: "hidden",
  },
  logo: {
    width: 22,
    height: 22,
  },
  numberCircle: {
    width: NUMBER_SIZE,
    height: NUMBER_SIZE,
    borderRadius: NUMBER_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -12,
    zIndex: 2,
  },
  numberText: {
    fontSize: 36,
    fontFamily: typography.fonts.inter.bold,
    fontWeight: "800",
    color: homeColors.numberTextWhite,
    textShadowColor: homeColors.numberTextStroke,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  startRow: {
    alignItems: "center",
    position: "absolute",
    left: "76%",
    top: -26,
    zIndex: 3,
  },
  startPill: {
    backgroundColor: homeColors.white,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: homeColors.upNextStartBorder,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  startLabel: {
    fontSize: 15,
    fontFamily: typography.fonts.inter.bold,
    fontWeight: "700",
    color: homeColors.upNextStartText,
    letterSpacing: 0.34,
  },
  startArrow: {
    alignItems: "center",
    marginTop: -2,
  },
});
