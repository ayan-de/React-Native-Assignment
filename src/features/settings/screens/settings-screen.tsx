import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import type { SettingsData } from "../types";
import settingsData from "@/mock-data/settings.json";

const settings = settingsData as SettingsData;

const sColors = {
  screenBg: "#F5F5F8",
  navTitle: "#0F2723",
  navIcon: "#6C6C70",
  cardBg: "#FFFFFF",
  cardBorder: "#E5E5EA",
  trialCardBg: "#1C1C1E",
  trialYellow: "#FFCE00",
  trialSubText: "#E5E5EA",
  trialBtnBg: "#FBE8C7",
  trialBtnText: "#8F6200",
  menuLabel: "#2C2C2E",
  menuValue: "#AEAEB2",
  menuChevron: "#8E8E93",
  menuDivider: "#F5F5F8",
  updateBadgeBg: "#E3F3F0",
  updateBadgeBorder: "#008272",
  menuIcon: "#6C6C70",
  footerText: "rgba(0, 0, 0, 0.64)",
};

export function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <Pressable style={styles.navBackBtn}>
          <Ionicons name="chevron-back" size={22} color={sColors.navIcon} />
        </Pressable>
        <Text style={styles.navTitle}>Your Profile</Text>
        <View style={styles.navRightPlaceholder} />
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TrialCard />
        <UpdateCard />
        <ProfileCard />
        <ActionCard />
        <Footer />
      </ScrollView>
    </View>
  );
}

function TrialCard() {
  return (
    <View style={styles.trialCard}>
      <View style={styles.trialContent}>
        <Text style={styles.trialTitle}>
          3 days free trial for
        </Text>
        <View style={styles.trialPriceRow}>
          <Text style={styles.trialPrice}>{settings.trialPrice}</Text>
        </View>
        <Text style={styles.trialSubtext}>
          Then {settings.trialMonthlyPrice}
        </Text>
      </View>
      <Image
        source={require("@/assets/settingsImage.png")}
        style={styles.trialImage}
        cachePolicy="memory-disk"
      />
      <Pressable style={styles.trialButton}>
        <Text style={styles.trialButtonText}>
          START 3 DAYS TRIAL @ {settings.trialPrice}
        </Text>
      </Pressable>
    </View>
  );
}

function UpdateCard() {
  return (
    <View style={styles.menuCard}>
      <View style={styles.menuRow}>
        <View style={styles.menuLeft}>
          <Ionicons name="layers-outline" size={16} color={sColors.menuIcon} />
          <Text style={styles.menuLabel}>New update available</Text>
        </View>
        <View style={styles.updateBadge}>
          <Ionicons
            name="download-outline"
            size={16}
            color={sColors.updateBadgeBorder}
          />
        </View>
      </View>
    </View>
  );
}

function ProfileCard() {
  return (
    <View style={styles.menuCard}>
      <View style={styles.menuRow}>
        <View style={styles.menuLeft}>
          <Ionicons name="call-outline" size={16} color={sColors.menuIcon} />
          <Text style={styles.menuLabel}>Phone number</Text>
        </View>
        <Text style={styles.menuValue}>{settings.phoneNumber}</Text>
      </View>
      <View style={styles.menuDivider} />
      <View style={styles.menuRow}>
        <View style={styles.menuLeft}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color={sColors.menuIcon}
          />
          <Text style={styles.menuLabel}>Learning since</Text>
        </View>
        <Text style={styles.menuValue}>{settings.learningSince}</Text>
      </View>
    </View>
  );
}

function ActionCard() {
  const actions = [
    { icon: "chatbubbles-outline", label: "Chat with us" },
    { icon: "share-outline", label: "Share the app" },
    { icon: "star-outline", label: "Rate the app" },
    { icon: "log-out-outline", label: "Log out" },
  ];

  return (
    <View style={styles.menuCard}>
      {actions.map((action, index) => (
        <View key={action.label}>
          <View style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <Ionicons
                name={action.icon as any}
                size={16}
                color={sColors.menuIcon}
              />
              <Text style={styles.menuLabel}>{action.label}</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={sColors.menuChevron}
              style={{ opacity: 0.7 }}
            />
          </View>
          {index < actions.length - 1 && <View style={styles.menuDivider} />}
        </View>
      ))}
    </View>
  );
}

function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        App version {settings.appVersion}
      </Text>
      <Text style={styles.footerText}>Made with ❤️ from India</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: sColors.screenBg,
  },
  topNav: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.m,
    height: 62,
    gap: spacing.m,
  },
  navBackBtn: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  navTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: typography.fonts.inter.semiBold,
    fontWeight: "600",
    color: sColors.navTitle,
    textAlign: "center",
  },
  navRightPlaceholder: {
    width: 30,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.m,
    paddingBottom: spacing.xxxl,
    gap: spacing.m,
  },
  trialCard: {
    backgroundColor: sColors.trialCardBg,
    borderRadius: spacing.xxl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.m,
    gap: spacing.m,
    overflow: "hidden",
  },
  trialContent: {
    paddingHorizontal: spacing.m,
    gap: spacing.xxs,
  },
  trialTitle: {
    fontSize: 16,
    fontFamily: typography.fonts.inter.bold,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  trialPriceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
  },
  trialPrice: {
    fontSize: 32,
    fontFamily: typography.fonts.inter.bold,
    fontWeight: "700",
    color: sColors.trialYellow,
  },
  trialSubtext: {
    fontSize: 14,
    fontFamily: typography.fonts.inter.normal,
    fontWeight: "400",
    color: sColors.trialSubText,
  },
  trialImage: {
    position: "absolute",
    right: 20,
    top: 1,
    width: 120,
    height: 132,
    zIndex: 3,
  },
  trialButton: {
    marginHorizontal: spacing.m,
    backgroundColor: sColors.trialBtnBg,
    borderRadius: spacing.cardRadius,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.21,
    shadowRadius: 0,
    elevation: 3,
  },
  trialButtonText: {
    fontSize: 14,
    fontFamily: typography.fonts.inter.bold,
    fontWeight: "800",
    color: sColors.trialBtnText,
    letterSpacing: 0.8,
  },
  menuCard: {
    backgroundColor: sColors.cardBg,
    borderWidth: 1,
    borderColor: sColors.cardBorder,
    borderRadius: spacing.xxl,
    paddingVertical: spacing.xxs,
    paddingHorizontal: spacing.m,
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.m,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.m,
  },
  menuLabel: {
    fontSize: 14,
    fontFamily: typography.fonts.inter.medium,
    fontWeight: "500",
    color: sColors.menuLabel,
    letterSpacing: -0.01,
  },
  menuValue: {
    fontSize: 14,
    fontFamily: typography.fonts.inter.normal,
    fontWeight: "400",
    color: sColors.menuValue,
    letterSpacing: -0.01,
  },
  menuDivider: {
    height: 1,
    backgroundColor: sColors.menuDivider,
  },
  updateBadge: {
    width: 36,
    height: 32,
    backgroundColor: sColors.updateBadgeBg,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    alignItems: "center",
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
    gap: spacing.xxs,
  },
  footerText: {
    fontSize: 13,
    fontFamily: typography.fonts.inter.medium,
    fontWeight: "500",
    color: sColors.footerText,
    letterSpacing: -0.01,
    opacity: 0.4,
  },
});
