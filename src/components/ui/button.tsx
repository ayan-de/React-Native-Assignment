import { Text, TouchableOpacity, type ViewStyle, type TextStyle, StyleSheet } from "react-native";
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
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { borderRadius },
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
    >
      {iconName && <Ionicons name={iconName} size={20} color={colors.textInverse} />}
      <Text style={[styles.label, { fontSize, letterSpacing: -0.01 * fontSize }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xxs,
    backgroundColor: colors.primary,
    paddingVertical: spacing.m + 2,
    elevation: 4,
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
  },
  buttonDisabled: {
    backgroundColor: colors.buttonDisabled,
    elevation: 0,
    shadowOpacity: 0,
  },
  label: {
    fontFamily: typography.fonts.inter.medium,
    lineHeight: 24,
    color: colors.textInverse,
  },
});
