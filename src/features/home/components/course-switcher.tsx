import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { typography } from "@/theme/typography";
import { homeColors } from "../constants";

export function CourseSwitcher() {
  const SHADOW_HEIGHT = 4;

  return (
    <View style={styles.outerContainer}>
      {/* Shadow Layer */}
      <View style={styles.shadow} />

      {/* Surface Layer */}
      <Pressable style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../../assets/croco-mascot-frame.png")}
              style={styles.mascot}
              cachePolicy="memory-disk"
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.subtitle}>Practicing Top 50 Questions for</Text>
            <Text style={styles.title}>Big Tech Companies</Text>
          </View>
        </View>
        <Ionicons name="chevron-down" size={20} color={homeColors.mutedText} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 16,
    position: "relative",
    paddingBottom: 4,
  },
  shadow: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 4,
    bottom: 0,
    backgroundColor: homeColors.goldShadow,
    borderRadius: 24,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: homeColors.cream,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
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
    width: 28,
    height: 28,
  },
  textContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: typography.fonts.inter.medium,
    color: homeColors.mutedText,
  },
  title: {
    fontSize: 16,
    fontFamily: typography.fonts.inter.semiBold,
    color: homeColors.darkText,
  },
});
