import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

const LOGO_SIZE = 320;
const COMPANY_LOGO_SIZE = 48;

export const welcomeStyles = StyleSheet.create({
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
    letterSpacing: -0.02 * 36,
    color: colors.primary,
  },
  aiBadge: {
    paddingHorizontal: 3,
    paddingVertical: spacing.xxs + 1,
    backgroundColor: colors.textPrimary,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  aiText: {
    fontSize: 24,
    fontFamily: typography.fonts.inter.bold,
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
    borderColor: colors.successLight,
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
    shadowColor: colors.primaryDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 0,
  },
  ctaLabel: {
    fontSize: typography.sizes.l,
    fontFamily: typography.fonts.inter.medium,
    lineHeight: 24,
    letterSpacing: -0.01 * typography.sizes.l,
    color: colors.textInverse,
  },
  termsText: {
    fontSize: typography.sizes.s,
    fontFamily: typography.fonts.inter.normal,
    lineHeight: 16,
    textAlign: "center",
    letterSpacing: -0.01 * typography.sizes.s,
    color: colors.textSecondary,
  },
});

export const LOGO_POSITIONS = [
  { right: -4, top: 13 },
  { right: -12, bottom: 14 },
  { left: -12, bottom: 0 },
  { left: 9, top: 13 },
  { left: 166, top: -16 },
] as const;
