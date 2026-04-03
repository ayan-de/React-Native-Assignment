import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    marginLeft: spacing.s,
    marginTop: spacing.m,
    padding: spacing.xxs,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xxl,
    fontFamily: typography.fonts.inter.semiBold,
    color: colors.textPrimary,
    marginTop: spacing.l,
  },
  titleHighlight: {
    color: colors.primary,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: typography.fonts.inter.normal,
    lineHeight: 20,
    letterSpacing: -0.01 * 14,
    color: colors.textSecondary,
    marginTop: spacing.xxs,
  },
  inputGroup: {
    marginTop: spacing.xl,
    gap: spacing.xxs,
  },
  inputLabel: {
    fontSize: typography.sizes.s,
    fontFamily: typography.fonts.inter.medium,
    lineHeight: 16,
    letterSpacing: -0.01 * typography.sizes.s,
    color: colors.textSecondary,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.inputRadius,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
  },
  inputContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.s,
    height: 36,
  },
  regionCode: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  regionCodeText: {
    fontSize: 15,
    fontFamily: typography.fonts.inter.normal,
    lineHeight: 22,
    letterSpacing: -0.01 * 15,
    color: colors.textPrimary,
  },
  divider: {
    width: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: typography.fonts.inter.normal,
    lineHeight: 22,
    letterSpacing: -0.01 * 15,
    color: colors.textPrimary,
    padding: 0,
  },
  errorText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.inter.normal,
    color: colors.error,
    marginTop: spacing.xxs,
  },
  hintText: {
    fontSize: typography.sizes.xs,
    fontFamily: typography.fonts.inter.normal,
    color: colors.textDisabled,
    marginTop: spacing.xxs,
  },
  otpContainer: {
    flexDirection: "row",
    gap: spacing.s,
    marginTop: spacing.xl,
    justifyContent: "center",
  },
  otpBox: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.inputRadius,
    textAlign: "center",
    fontSize: typography.sizes.xxxl,
    fontFamily: typography.fonts.inter.semiBold,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  otpBoxFilled: {
    borderColor: colors.primary,
  },
  resendRow: {
    marginTop: spacing.l,
  },
  resendText: {
    fontSize: typography.sizes.m,
    fontFamily: typography.fonts.inter.medium,
    color: colors.primary,
  },
  buttonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 68,
    paddingHorizontal: spacing.m,
  },
});
