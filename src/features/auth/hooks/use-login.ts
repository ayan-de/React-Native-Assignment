import { useState, useRef, useCallback } from "react";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/types";
import type { LoginStep, UseLoginReturn } from "../types";

const OTP_LENGTH = 6;
const PHONE_LENGTH = 10;

type LoginNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export function useLogin(): UseLoginReturn {
  const navigation = useNavigation<LoginNavigationProp>();
  const [step, setStep] = useState<LoginStep>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const otpRefs = useRef<(TextInput | null)[]>([]);

  const handlePhoneSubmit = useCallback(() => {
    const cleaned = phone.replace(/\s/g, "");
    if (cleaned.length !== PHONE_LENGTH) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    setStep("otp");
  }, [phone]);

  const handleOtpChange = useCallback(
    (value: string, index: number) => {
      if (value.length > 1) {
        const digits = value.split("").slice(0, OTP_LENGTH - index);
        const newOtp = [...otp];
        digits.forEach((digit, i) => {
          if (index + i < OTP_LENGTH) {
            newOtp[index + i] = digit;
          }
        });
        setOtp(newOtp);
        const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);
        otpRefs.current[nextIndex]?.focus();
        return;
      }

      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < OTP_LENGTH - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    },
    [otp],
  );

  const handleOtpKeyPress = useCallback(
    (key: string, index: number) => {
      if (key === "Backspace" && !otp[index] && index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    },
    [otp],
  );

  const handleVerify = useCallback(() => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === OTP_LENGTH) {
      navigation.getParent()?.navigate("Main");
    }
  }, [otp, navigation]);

  const isOtpComplete = otp.every((digit) => digit !== "");

  return {
    step,
    phone,
    setPhone,
    otp,
    error,
    handlePhoneSubmit,
    handleOtpChange,
    handleOtpKeyPress,
    handleVerify,
    isOtpComplete,
    otpRefs,
  };
}
