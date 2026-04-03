import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { RootStackParamList } from "@/navigation/types";
import type { RouteProp } from "@react-navigation/native";

type SessionResultRouteProp = RouteProp<RootStackParamList, "SessionResult">;

export function SessionResultScreen() {
  const route = useRoute<SessionResultRouteProp>();
  const { questionId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Result</Text>
      <Text style={styles.subtitle}>Question: {questionId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.screenPadding,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.inter.bold,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.m,
    fontFamily: typography.fonts.inter.normal,
    color: colors.textSecondary,
  },
});
