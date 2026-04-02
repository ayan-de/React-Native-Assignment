import { View, TextInput } from "react-native";
import type { OtpInputProps } from "../types";
import { loginStyles as styles } from "../styles/login.styles";

export function OtpInput({ otp, otpRefs, onChange, onKeyPress }: OtpInputProps) {
  return (
    <View style={styles.otpContainer}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            otpRefs.current[index] = ref;
          }}
          style={[styles.otpBox, digit ? styles.otpBoxFilled : null]}
          value={digit}
          onChangeText={(value) => onChange(value, index)}
          onKeyPress={({ nativeEvent }) => onKeyPress(nativeEvent.key, index)}
          keyboardType="number-pad"
          maxLength={1}
          autoFocus={index === 0}
          textContentType="oneTimeCode"
        />
      ))}
    </View>
  );
}
