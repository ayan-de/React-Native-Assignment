import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  borderRadius?: number;
  fontSize?: number;
}

export function Button({
  title,
  onPress,
  disabled = false,
  iconName,
  borderRadius = spacing.buttonRadius,
  fontSize = typography.sizes.m,
}: ButtonProps) {
  const SHADOW_HEIGHT = 6;

  return (
    <View style={styles.container}>
      {/* Shadow Layer */}
      <View
        style={[
          styles.shadow,
          {
            borderRadius,
            backgroundColor: disabled ? colors.buttonDisabled : colors.primaryShadow,
            bottom: 0,
            height: 56, // Match button height
          }
        ]}
      />
      {/* Button Layer */}
      <TouchableOpacity
        style={[
          styles.button,
          {
            borderRadius,
            marginBottom: disabled ? 0 : SHADOW_HEIGHT,
            marginTop: disabled ? SHADOW_HEIGHT : 0,
          },
        ]}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={
            disabled
              ? [colors.buttonDisabled, colors.buttonDisabled]
              : [colors.primaryGradientStart, colors.primaryGradientEnd]
          }
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[styles.gradient, { borderRadius }]}
        >
          {iconName && (
            <Ionicons
              name={iconName}
              size={22}
              color={colors.textInverse}
              style={styles.icon}
            />
          )}
          <Text
            style={[
              styles.label,
              { fontSize, letterSpacing: -0.01 * fontSize },
            ]}
          >
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  shadow: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  button: {
    width: "100%",
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.l,
    minHeight: 56,
  },
  icon: {
    marginRight: spacing.xs,
  },
  label: {
    fontFamily: typography.fonts.inter.bold,
    color: colors.textInverse,
    textAlign: "center",
  },
});
