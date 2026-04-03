import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { AuthStackParamList } from "@/navigation/types";
import companies from "@/mock-data/companies.json";
import { welcomeAvatar } from "@/assets";
import { ReadyLogo } from "@/components/ui/ready-logo";
import { welcomeStyles as styles, LOGO_POSITIONS } from "../styles/welcome.styles";

type WelcomeNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Welcome">;

export function WelcomeScreen() {
  const navigation = useNavigation<WelcomeNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <ReadyLogo size="medium" />
      </View>

      <View style={styles.centerContainer}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={welcomeAvatar}
              style={styles.avatar}
              contentFit="cover"
              cachePolicy="memory-disk"
            />

            {companies.slice(0, 5).map((company, index) => {
              const position = LOGO_POSITIONS[index];
              return (
                <View
                  key={company.id}
                  style={[styles.companyLogoWrapper, position]}
                >
                  <Image
                    source={{ uri: company.logoUrl }}
                    style={styles.companyLogo}
                    contentFit="contain"
                    cachePolicy="memory-disk"
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate("Login")}
          activeOpacity={0.85}
        >
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={colors.textInverse}
          />
          <Text style={styles.ctaLabel}>Get Started</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By continuing, you acknowledge agreeing to our terms of service and
          privacy policy
        </Text>
      </View>
    </View>
  );
}
