import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { typography } from "@/theme/typography";
import { homeColors } from "../constants";
import { homeIcon, settingsIcon, storeIcon } from "@/assets";
import type { BottomNavProps } from "../types";

export function BottomNav({ activeTab, onTabPress }: BottomNavProps) {
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        {/* Main Segment (Home + Settings) */}
        <View style={styles.mainSegmentWrapper}>
          <View style={styles.segmentShadow} />
          <View style={styles.mainSegment}>
            {/* Home Tab */}
            <Pressable
              style={styles.segmentTab}
              onPress={() => onTabPress("Home")}
            >
              <Image
                source={homeIcon}
                style={[
                  styles.tabIcon,
                  { tintColor: activeTab === "Home" ? "#FF5500" : "#48484A" }
                ]}
                contentFit="contain"
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: activeTab === "Home" ? "#FF5500" : "#48484A" }
                ]}
              >
                Home
              </Text>
            </Pressable>

            {/* Settings Tab (Renamed from Progress) */}
            <Pressable
              style={styles.segmentTab}
              onPress={() => onTabPress("Settings")}
            >
              <Image
                source={settingsIcon}
                style={[
                  styles.tabIcon,
                  { tintColor: activeTab === "Settings" ? "#FF5500" : "#48484A" }
                ]}
                contentFit="contain"
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: activeTab === "Settings" ? "#FF5500" : "#48484A" }
                ]}
              >
                Settings
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Separated Store Tab */}
        <View style={styles.storeSegmentWrapper}>
          <View style={styles.circleShadow} />
          <Pressable
            style={styles.storeCircle}
            onPress={() => onTabPress("Store")}
          >
            <Image
              source={storeIcon}
              style={[
                styles.tabIcon,
                { tintColor: activeTab === "Store" ? "#1C1C1E" : "#48484A" }
              ]}
              contentFit="contain"
            />
            <Text
              style={[
                styles.tabLabel,
                { color: activeTab === "Store" ? "#1C1C1E" : "#48484A" }
              ]}
            >
              Store
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    paddingHorizontal: 16,
    paddingBottom: 40, // Generous safe area for floating effect
    paddingTop: 10,
    alignItems: "center",
    zIndex: 100,
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    justifyContent: "center",
  },
  mainSegmentWrapper: {
    width: 186, // Increased width for better visibility and presence
    position: "relative",
    paddingBottom: 4,
  },
  segmentShadow: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 4,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)", // Darkened shadow for better visibility
    borderRadius: 33,
  },
  mainSegment: {
    flexDirection: "row",
    backgroundColor: homeColors.white,
    borderRadius: 33,
    height: 66,
    alignItems: "center",
    justifyContent: "center",
    gap: 18, // Improved spacing
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },
  segmentTab: {
    width: 72, // Wider tab buttons
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  storeSegmentWrapper: {
    width: 66,
    height: 66,
    position: "relative",
    paddingBottom: 6, // Accommodate deeper shadow
  },
  circleShadow: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 6, // 6px depth for stronger physical feel
    bottom: 0,
    backgroundColor: "#A0CBF5", // Deeper blue for prominent elevation
    borderRadius: 33,
  },
  storeCircle: {
    width: 66,
    height: 66,
    backgroundColor: "#DCEEFF",
    borderRadius: 33,
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    borderWidth: 1,
    borderColor: "rgba(178,217,255,1)",
  },
  tabIcon: {
    width: 20,
    height: 20,
  },
  tabLabel: {
    fontSize: 10,
    fontFamily: typography.fonts.inter.semiBold,
    marginTop: 0,
  },
});
