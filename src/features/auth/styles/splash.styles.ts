import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { spacing } from "@/theme/spacing";

export const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  readyText: {
    fontSize: 47,
    fontFamily: typography.fonts.inter.bold,
    fontWeight: "800",
    letterSpacing: -0.02 * 47,
    color: colors.primary,
  },
  aiBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs + 2,
    backgroundColor: colors.textPrimary,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  aiText: {
    fontSize: 31,
    fontFamily: typography.fonts.inter.bold,
    fontWeight: "800",
    lineHeight: 40,
    letterSpacing: -0.01 * 31,
    color: colors.textInverse,
  },
});
