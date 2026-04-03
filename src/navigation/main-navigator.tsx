import { View, Text, StyleSheet } from "react-native";
import { HomeScreen } from "@/features/home/screens/home-screen";
import { colors } from "@/theme/colors";

function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

export function SettingsScreen() {
  return <PlaceholderScreen title="Settings" />;
}

export function StoreScreen() {
  return <PlaceholderScreen title="Store" />;
}

export { HomeScreen };

export function MainNavigator() {
  return <HomeScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 18,
    color: colors.textPrimary,
  },
});
