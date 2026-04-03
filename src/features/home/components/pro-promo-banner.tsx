import { View, Text, StyleSheet } from "react-native";
import { typography } from "@/theme/typography";
import { homeColors } from "../constants";

interface ProPromoBannerProps {
  count: number;
  questionNumber: number;
}

export function ProPromoBanner({ count, questionNumber }: ProPromoBannerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.flag}>🚩</Text>
      <Text style={styles.text}>
        {count.toLocaleString()} users completed Question {questionNumber} today
      </Text>
      <Text style={styles.flag}>🚩</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: homeColors.promoText,
    borderStyle: "dashed",
  },
  text: {
    fontSize: 14,
    fontFamily: typography.fonts.inter.bold,
    fontWeight: "700",
    color: homeColors.promoText,
  },
  flag: {
    fontSize: 14,
  },
});
