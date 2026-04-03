import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { AuthNavigator } from "./auth-navigator";
import { MainNavigator } from "./main-navigator";
import { SessionResultScreen } from "@/features/session-result/screens/session-result-screen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen name="SessionResult" component={SessionResultScreen} />
    </Stack.Navigator>
  );
}
