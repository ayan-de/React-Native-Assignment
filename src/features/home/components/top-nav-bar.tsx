import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { typography } from "@/theme/typography";
import { homeColors } from "../constants";

export function TopNavBar() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Ready!</Text>
      <View style={styles.rightSection}>
        {/* Elevated Streak Pill */}
        <View style={styles.streakContainer}>
          {/* Shadow Layer */}
          <View style={styles.streakShadow} />
          {/* Surface Layer */}
          <View style={styles.streakPill}>
            <Image
              source={require("../../../assets/lightning.png")}
              style={styles.lightningIcon}
              cachePolicy="memory-disk"
            />
            <Text style={styles.streakNumber}>8</Text>
          </View>
        </View>

        {/* Elevated Menu Pill */}
        <View style={styles.menuContainer}>
          {/* Shadow Layer */}
          <View style={styles.menuShadow} />
          {/* Surface Layer */}
          <View style={styles.menuPill}>
            <Image
              source={require("../../../assets/menu.png")}
              style={styles.menuIcon}
              cachePolicy="memory-disk"
            />
          </View>
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
    paddingBottom: 4,
  },
  streakShadow: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 4,
    bottom: 0,
    backgroundColor: homeColors.greenStreakShadow,
    borderRadius: 14,
  },
  streakPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: homeColors.greenStreak,
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 44,
    justifyContent: "center",
  },
  streakNumber: {
    fontSize: 16,
    fontFamily: typography.fonts.inter.semiBold,
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
    gap: 12,
  },
  menuIcon: {
    width: 18,
    height: 18,
  },
  menuContainer: {
    position: "relative",
    paddingBottom: 4,
  },
  menuShadow: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 4,
    bottom: 0,
    backgroundColor: "#D1D1D6",
    borderRadius: 14,
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
    minWidth: 36,
  },
});
