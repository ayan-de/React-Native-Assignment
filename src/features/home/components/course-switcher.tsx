import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "@/theme/typography";
import { homeColors } from "../constants";

export function CourseSwitcher() {
  return (
    <Pressable style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.mascot}>🐊</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>
            Practicing Top 50 Questions for
          </Text>
          <Text style={styles.title}>Big Tech Companies</Text>
        </View>
      </View>
      <Ionicons
        name="chevron-down"
        size={20}
        color={homeColors.mutedText}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: homeColors.cream,
    borderRadius: 24,
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: homeColors.goldShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: homeColors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  mascot: {
    fontSize: 18,
  },
  textContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: typography.fonts.inter.medium,
    fontWeight: "500",
    color: homeColors.mutedText,
  },
  title: {
    fontSize: 16,
    fontFamily: typography.fonts.inter.semiBold,
    fontWeight: "600",
    color: homeColors.darkText,
  },
});
