import { useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/navigation/types";
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
      <View style={styles.logoContainer}>
        <Text style={styles.readyText}>Ready</Text>
        <View style={styles.aiBadge}>
          <Text style={styles.aiText}>AI</Text>
        </View>
      </View>
    </View>
  );
}
