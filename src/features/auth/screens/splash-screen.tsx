import { useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";
import { spacing } from "@/theme/spacing";
import { AuthStackParamList } from "@/navigation/types";

type SplashNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Splash">;

export function SplashScreen() {
  const navigation = useNavigation<SplashNavigationProp>();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      navigation.replace("Welcome");
    }, 2000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.readyText}>Ready</Text>
        <View style={styles.aiBadge}>
          <Text style={styles.aiText}>AI</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "#1C1C1E",
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
