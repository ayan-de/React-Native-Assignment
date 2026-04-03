import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { typography } from "@/theme/typography";
import { spacing } from "@/theme/spacing";
import { homeColors } from "../constants";
import type { BottomNavProps, HomeTab } from "../types";

const TAB_ITEMS: { key: HomeTab; label: string; icon: string; activeIcon: string }[] = [
  { key: "Home", label: "Home", icon: "home-outline", activeIcon: "home" },
  { key: "Store", label: "Store", icon: "bag-handle-outline", activeIcon: "bag-handle" },
  { key: "Progress", label: "Progress", icon: "stats-chart-outline", activeIcon: "stats-chart" },
];

export function BottomNav({ activeTab, onTabPress }: BottomNavProps) {
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {TAB_ITEMS.map((tab) => {
          const isActive = activeTab === tab.key;
          const isStore = tab.key === "Store";

          if (isStore) {
            return (
              <Pressable
                key={tab.key}
                style={styles.storeButtonWrapper}
                onPress={() => onTabPress(tab.key)}
              >
                <View style={styles.storeButton}>
                  <Ionicons
                    name={tab.activeIcon as any}
                    size={24}
                    color={homeColors.storeIcon}
                  />
                </View>
                <Text style={styles.storeLabel}>{tab.label}</Text>
              </Pressable>
            );
          }

          return (
            <Pressable
              key={tab.key}
              style={styles.tabButton}
              onPress={() => onTabPress(tab.key)}
            >
              <Ionicons
                name={(isActive ? tab.activeIcon : tab.icon) as any}
                size={24}
                color={isActive ? homeColors.orangeActive : homeColors.mutedText}
              />
              <Text
                style={[
                  styles.tabLabel,
                  isActive && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: homeColors.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: homeColors.bottomNavBorder,
    shadowColor: homeColors.bottomNavShadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
    paddingBottom: 8,
  },
  navBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    paddingHorizontal: spacing.s,
    paddingTop: spacing.xs,
    height: 64,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: typography.fonts.inter.medium,
    fontWeight: "500",
    color: homeColors.mutedText,
    marginTop: 2,
  },
  tabLabelActive: {
    color: homeColors.orangeActive,
    fontFamily: typography.fonts.inter.semiBold,
    fontWeight: "600",
  },
  storeButtonWrapper: {
    alignItems: "center",
    flex: 1,
    marginTop: -20,
  },
  storeButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: homeColors.cream,
    borderWidth: 2,
    borderColor: homeColors.storeBorder,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: homeColors.storeShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  storeLabel: {
    fontSize: 11,
    fontFamily: typography.fonts.inter.medium,
    fontWeight: "500",
    color: homeColors.mutedText,
    marginTop: 4,
  },
});
