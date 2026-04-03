import { View, Text, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { spacing } from "@/theme/spacing";

type ReadyLogoSize = "large" | "medium";

interface ReadyLogoProps {
  size: ReadyLogoSize;
}

const VARIANTS: Record<
  ReadyLogoSize,
  {
    readyFontSize: number;
    aiFontSize: number;
    aiLineHeight: number;
    badgePaddingHorizontal: number;
    badgePaddingVertical: number;
    badgeBorderRadius: number;
  }
> = {
  large: {
    readyFontSize: 47,
    aiFontSize: 31,
    aiLineHeight: 40,
    badgePaddingHorizontal: spacing.xs,
    badgePaddingVertical: spacing.xxs + 2,
    badgeBorderRadius: 9,
  },
  medium: {
    readyFontSize: 36,
    aiFontSize: 24,
    aiLineHeight: 31,
    badgePaddingHorizontal: 3,
    badgePaddingVertical: spacing.xxs + 1,
    badgeBorderRadius: 7,
  },
};

export function ReadyLogo({ size }: ReadyLogoProps) {
  const variant = VARIANTS[size];

  return (
    <View style={styles.logoContainer}>
      <Text
        style={[
          styles.readyText,
          { fontSize: variant.readyFontSize, letterSpacing: -0.02 * variant.readyFontSize },
        ]}
      >
        Ready
      </Text>
      <View
        style={[
          styles.aiBadge,
          {
            paddingHorizontal: variant.badgePaddingHorizontal,
            paddingVertical: variant.badgePaddingVertical,
            borderRadius: variant.badgeBorderRadius,
          },
        ]}
      >
        <Text
          style={[
            styles.aiText,
            {
              fontSize: variant.aiFontSize,
              lineHeight: variant.aiLineHeight,
              letterSpacing: -0.01 * variant.aiFontSize,
            },
          ]}
        >
          AI
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  readyText: {
    fontFamily: typography.fonts.inter.bold,
    color: colors.primary,
  },
  aiBadge: {
    backgroundColor: colors.textPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  aiText: {
    fontFamily: typography.fonts.inter.bold,
    color: colors.textInverse,
  },
});
