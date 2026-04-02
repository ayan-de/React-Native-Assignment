import { View, Text, TouchableOpacity } from "react-native";
import type { PhoneStepProps } from "../types";
import { loginStyles as styles } from "../styles/login.styles";
import { PhoneInput } from "./phone-input";

export function PhoneStep({ phone, onPhoneChange, error, onSubmit }: PhoneStepProps) {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>
        <Text style={styles.titleHighlight}>Kickstart</Text> your journey
      </Text>
      <Text style={styles.subtitle}>
        We will send you an OTP to verify your number.
      </Text>

      <PhoneInput value={phone} onChangeText={onPhoneChange} error={error} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={onSubmit}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaLabel}>Get OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
