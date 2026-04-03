import { useEffect, useRef } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/types";
import { ReadyLogo } from "@/components/ui/ready-logo";
import { splashStyles as styles } from "../styles/splash.styles";

type SplashNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Splash">;

export function SplashScreen() {
  const navigation = useNavigation<SplashNavigationProp>();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      navigation.replace("Welcome");
    }, 2000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ReadyLogo size="large" />
    </View>
  );
}
