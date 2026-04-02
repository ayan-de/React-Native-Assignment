import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";
import { AuthStackParamList } from "@/navigation/types";
import companies from "@/mock-data/companies.json";
import { welcomeAvatar } from "@/assets";

type WelcomeNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Welcome">;

export function WelcomeScreen() {
  const navigation = useNavigation<WelcomeNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.readyText}>Ready</Text>
        <View style={styles.aiBadge}>
          <Text style={styles.aiText}>AI</Text>
        </View>
      </View>

      <View style={styles.centerContainer}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={welcomeAvatar}
              style={styles.avatar}
              contentFit="cover"
              cachePolicy="memory-disk"
            />

            {companies.slice(0, 5).map((company, index) => {
              const position = getLogoPosition(index);
              return (
                <View
                  key={company.id}
                  style={[styles.companyLogoWrapper, position]}
                >
                  <Image
                    source={{ uri: company.logoUrl }}
                    style={styles.companyLogo}
                    contentFit="contain"
                    cachePolicy="memory-disk"
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate("Login")}
          activeOpacity={0.85}
        >
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={colors.textInverse}
          />
          <Text style={styles.ctaLabel}>Get Started</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you acknowledge agreeing to our terms of service and
          privacy policy
        </Text>
      </View>
    </View>
  );
}

function getLogoPosition(index: number) {
  const positions = [
    { right: -4, top: 13 },
    { right: -12, bottom: 14 },
    { left: -12, bottom: 0 },
    { left: 9, top: 13 },
    { left: 166, top: -16 },
  ];
  return positions[index] || positions[0];
}

const LOGO_SIZE = 320;
const COMPANY_LOGO_SIZE = 48;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xxs,
    marginTop: 78,
  },
  readyText: {
    fontSize: 36,
    fontFamily: typography.fonts.inter.bold,
    fontWeight: "800",
    letterSpacing: -0.02 * 36,
    color: colors.primary,
  },
  aiBadge: {
    paddingHorizontal: 3,
    paddingVertical: spacing.xxs + 1,
    backgroundColor: "#1C1C1E",
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  aiText: {
    fontSize: 24,
    fontFamily: typography.fonts.inter.bold,
    fontWeight: "800",
    lineHeight: 31,
    letterSpacing: -0.01 * 24,
    color: colors.textInverse,
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  avatarSection: {
    alignItems: "center",
    gap: spacing.l,
  },
  avatarContainer: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
  },
  companyLogoWrapper: {
    position: "absolute",
    width: COMPANY_LOGO_SIZE,
    height: COMPANY_LOGO_SIZE,
    borderRadius: COMPANY_LOGO_SIZE / 2,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: "#E3F3F0",
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xxs,
    zIndex: 10,
  },
  companyLogo: {
    width: COMPANY_LOGO_SIZE - 8,
    height: COMPANY_LOGO_SIZE - 8,
  },
  bottomSection: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 50,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xxs,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.m,
    marginBottom: spacing.m,
    elevation: 4,
    shadowColor: "#FF3900",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
  },
  ctaLabel: {
    fontSize: typography.sizes.l,
    fontFamily: typography.fonts.inter.medium,
    fontWeight: "500",
    lineHeight: 24,
    letterSpacing: -0.01 * typography.sizes.l,
    color: colors.textInverse,
  },
  termsText: {
    fontSize: typography.sizes.s,
    fontFamily: typography.fonts.inter.normal,
    fontWeight: "400",
    lineHeight: 16,
    textAlign: "center",
    letterSpacing: -0.01 * typography.sizes.s,
    color: "#6C6C70",
  },
});
