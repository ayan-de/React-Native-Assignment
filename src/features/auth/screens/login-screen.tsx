import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { AuthStackParamList } from "@/navigation/types";
import { loginStyles as styles } from "../styles/login.styles";
import { useLogin } from "../hooks/use-login";
import { PhoneStep } from "../components/phone-step";
import { OtpStep } from "../components/otp-step";

type LoginNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export function LoginScreen() {
  const navigation = useNavigation<LoginNavigationProp>();
  const {
    step,
    phone,
    setPhone,
    error,
    handlePhoneSubmit,
    handleOtpChange,
    handleOtpKeyPress,
    handleVerify,
    isOtpComplete,
    otpRefs,
    otp,
  } = useLogin();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
      </TouchableOpacity>

      {step === "phone" ? (
        <PhoneStep
          phone={phone}
          onPhoneChange={setPhone}
          error={error}
          onSubmit={handlePhoneSubmit}
        />
      ) : (
        <OtpStep
          otp={otp}
          otpRefs={otpRefs}
          onOtpChange={handleOtpChange}
          onOtpKeyPress={handleOtpKeyPress}
          onVerify={handleVerify}
          isOtpComplete={isOtpComplete}
        />
      )}
    </View>
  );
}
