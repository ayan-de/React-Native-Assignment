import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { typography } from "@/theme/typography";
import { homeColors } from "../constants";

export function TopNavBar() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Ready!</Text>
      <View style={styles.rightSection}>
        <View style={styles.streakContainer}>
          <View style={styles.streakBg} />
          <View style={styles.streakPill}>
            <Image
              source={require("../../../assets/lightning.png")}
              style={styles.lightningIcon}
              cachePolicy="memory-disk"
            />
            <Text style={styles.streakNumber}>8</Text>
          </View>
        </View>
        <View style={styles.menuPill}>
          <Image
            source={require("../../../assets/menu.png")}
            style={styles.menuIcon}
            cachePolicy="memory-disk"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logo: {
    fontSize: 24,
    fontFamily: typography.fonts.inter.bold,
    fontWeight: "800",
    color: "#FF7800",
  },
  streakContainer: {
    position: "relative",
    width: 52,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  streakBg: {
    position: "absolute",
    width: 44,
    height: 28,
    borderRadius: 14,
    backgroundColor: homeColors.greenStreakLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  streakPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: homeColors.greenStreak,
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: homeColors.greenStreakShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  streakNumber: {
    fontSize: 16,
    fontFamily: typography.fonts.inter.semiBold,
    fontWeight: "600",
    color: homeColors.white,
  },
  lightningIcon: {
    width: 14,
    height: 14,
    marginRight: 2,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  menuIcon: {
    width: 18,
    height: 18,
  },
  menuPill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0F0F5",
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    height: 28,
  },
});
