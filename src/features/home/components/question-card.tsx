import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { typography } from "@/theme/typography";
import { companyLogos, homeColors } from "../constants";
import { getStairPadding } from "../types";
import type { QuestionCardProps } from "../types";

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

  const stairPadding = getStairPadding(index);

  return (
    <Pressable
      style={[
        styles.container,
        {
          paddingLeft: stairPadding,
          marginTop: 4,
        },
      ]}
      onPress={() => onPress(question.id)}
    >
      {/* START Tooltip */}
      {isUpNext && (
        <View style={styles.startTooltipContainer}>
          <View style={styles.startPill}>
            <Text style={styles.startLabel}>START</Text>
            {/* Tooltip Arrow */}
            <View style={styles.tooltipArrow} />
          </View>
        </View>
      )}

      {/* Card with 3D Shadow */}
      <View style={styles.cardWrapper}>
        {/* Shadow Layer */}
        <View style={[styles.shadow, { backgroundColor: shadowColor }]} />

        {/* Main Surface */}
        <View style={[styles.surface, { backgroundColor: companyBg }]}>
          <View style={styles.leftContent}>
            <Text style={styles.companyName}>{question.companyName}</Text>
            <View style={styles.logoPill}>
              <Image
                source={companyLogos[question.companyLogoKey]}
                style={styles.logo}
                contentFit="contain"
              />
            </View>
          </View>

          {/* Number Rounded Square Placeholder */}
          <View style={[styles.numberPart, { backgroundColor: numberBg }]}>
            <View style={styles.stripeOverlay} />
            <Text style={styles.numberText}>{question.questionNumber}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    position: "relative",
    width: "100%",
  },
  cardWrapper: {
    height: 74,
    width: 200, // Slightly increased width for better breathing room
    position: "relative",
  },
  shadow: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 5,
    bottom: -5,
    borderRadius: 37,
  },
  surface: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 37,
    overflow: "hidden",
    paddingLeft: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  leftContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
    paddingRight: 10,
  },
  companyName: {
    fontSize: 14,
    fontFamily: typography.fonts.inter.semiBold,
    color: homeColors.companyTextDark,
  },
  logoPill: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: homeColors.white,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  logo: {
    width: 16,
    height: 16,
  },
  numberPart: {
    width: 66,
    height: 66,
    borderRadius: 30, // Rounded square shape
    marginRight: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  stripeOverlay: {
    position: "absolute",
    left: -15,
    top: 0,
    bottom: 0,
    width: 30,
    backgroundColor: "rgba(255,255,255,0.15)",
    transform: [{ skewX: "-25deg" }],
  },
  numberText: {
    fontSize: 36,
    fontFamily: typography.fonts.inter.bold,
    color: homeColors.numberTextWhite,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  startTooltipContainer: {
    position: "absolute",
    top: -24,
    left: 208, // Moved more to the right side
    zIndex: 10,
  },
  startPill: {
    backgroundColor: homeColors.white,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: homeColors.upNextStartBorder,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },
  startLabel: {
    fontSize: 14,
    fontFamily: typography.fonts.inter.bold,
    color: homeColors.upNextStartText,
    fontWeight: "900",
  },
  tooltipArrow: {
    position: "absolute",
    bottom: -8,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: homeColors.upNextStartBorder,
  },
});
