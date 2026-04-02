import { View, Text, TouchableOpacity } from "react-native";
import type { OtpStepProps } from "../types";
import { loginStyles as styles } from "../styles/login.styles";
import { OtpInput } from "./otp-input";

export function OtpStep({
  otp,
  otpRefs,
  onOtpChange,
  onOtpKeyPress,
  onVerify,
  isOtpComplete,
}: OtpStepProps) {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Enter the OTP</Text>
      <Text style={styles.subtitle}>
        We have sent a 6-digit OTP to your number
      </Text>

      <OtpInput
        otp={otp}
        otpRefs={otpRefs}
        onChange={onOtpChange}
        onKeyPress={onOtpKeyPress}
      />

      <TouchableOpacity style={styles.resendRow} activeOpacity={0.7}>
        <Text style={styles.resendText}>Resend OTP</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.ctaButton, !isOtpComplete && styles.ctaButtonDisabled]}
          onPress={onVerify}
          disabled={!isOtpComplete}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaLabel}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
