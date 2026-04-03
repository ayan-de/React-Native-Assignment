import { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Settings: undefined;
  Store: undefined;
  Progress: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  SessionResult: { questionId: string };
  Settings: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
