import type { TextInput } from "react-native";

export interface PhoneInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error: string;
}

export interface OtpInputProps {
  otp: string[];
  otpRefs: React.MutableRefObject<(TextInput | null)[]>;
  onChange: (value: string, index: number) => void;
  onKeyPress: (key: string, index: number) => void;
}

export interface PhoneStepProps {
  phone: string;
  onPhoneChange: (value: string) => void;
  error: string;
  onSubmit: () => void;
}

export interface OtpStepProps {
  otp: string[];
  otpRefs: React.MutableRefObject<(TextInput | null)[]>;
  onOtpChange: (value: string, index: number) => void;
  onOtpKeyPress: (key: string, index: number) => void;
  onVerify: () => void;
  isOtpComplete: boolean;
}

export type LoginStep = "phone" | "otp";

export interface UseLoginReturn {
  step: LoginStep;
  phone: string;
  setPhone: (value: string) => void;
  otp: string[];
  error: string;
  handlePhoneSubmit: () => void;
  handleOtpChange: (value: string, index: number) => void;
  handleOtpKeyPress: (key: string, index: number) => void;
  handleVerify: () => void;
  isOtpComplete: boolean;
  otpRefs: React.MutableRefObject<(TextInput | null)[]>;
}
