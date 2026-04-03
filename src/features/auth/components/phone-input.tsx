import { View, Text, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import type { PhoneInputProps } from "../types";
import { loginStyles as styles } from "../styles/login.styles";

export function PhoneInput({ value, onChangeText, error }: PhoneInputProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Phone Number</Text>
      <View style={styles.inputWrapper}>
        <View style={styles.inputContent}>
          <View style={styles.regionCode}>
            <Text style={styles.regionCodeText}>+91</Text>
            <Ionicons name="chevron-down" size={12} color={colors.textPrimary} />
          </View>
          <View style={styles.divider} />
          <TextInput
            style={styles.phoneInput}
            value={value}
            onChangeText={(text) => {
              onChangeText(text.replace(/[^0-9]/g, "").slice(0, 10));
            }}
            placeholder="Mobile Number"
            placeholderTextColor={colors.textDisabled}
            keyboardType="phone-pad"
            maxLength={10}
            autoFocus
          />
        </View>
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <Text style={styles.hintText}>
          Please enter a valid 10-digit mobile number
        </Text>
      )}
    </View>
  );
}
