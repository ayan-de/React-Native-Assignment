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
  logoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 78,
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
    paddingBottom: 80,
    gap: 40,
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
