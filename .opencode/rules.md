# Ready! — Agent Rules

## Project
React Native + Expo app. Feature-based architecture. TypeScript strict mode.

## Absolute Rules — Never Break These

### Components
- NEVER use `FlatList` or `ScrollView` for lists — ALWAYS use `@shopify/flash-list`
- NEVER use React Native `Image` — ALWAYS use `expo-image` with `cachePolicy="memory-disk"`
- NEVER hardcode hex colors, px values, or font weights inline

### Imports
- NEVER use `../../` imports across feature boundaries
- ALWAYS use `@/` alias (maps to `src/`)
- Correct: `import { colors } from "@/theme/colors"`
- Wrong: `import { colors } from "../../theme/colors"`

### Theme — Always Reference These
- Colors: `import { colors } from "@/theme/colors"` → use `colors.primary`, `colors.background`, etc.
- Spacing: `import { spacing } from "@/theme/spacing"` → use `spacing.screenPadding`, etc.
- Typography: `import { typography } from "@/theme/typography"` → use `typography.fonts.inter.semiBold`

### TypeScript
- NEVER use `any` type
- Define interfaces for ALL props, data shapes, and navigation params
- All interfaces go in the feature's `types.ts` file

### File Naming
- Files: `kebab-case` → `home-screen.tsx`, `question-card.tsx`, `use-questions.ts`
- Exports: PascalCase for components, camelCase for functions/hooks

## Folder Structure — Always Follow This
```
src/
├── components/ui/         # Shared primitives only (Button, Text, etc.)
├── features/
│   ├── auth/
│   │   ├── screens/       # splash-screen.tsx, welcome-screen.tsx, login-screen.tsx
│   │   └── types.ts
│   ├── home/
│   │   ├── components/    # question-card.tsx, question-bottom-sheet.tsx
│   │   ├── screens/       # home-screen.tsx
│   │   └── types.ts
│   ├── session-result/
│   │   ├── components/    # smart-summary-tab.tsx, key-moments-tab.tsx
│   │   ├── screens/       # session-result-screen.tsx
│   │   └── types.ts
│   └── settings/
│       ├── screens/       # settings-screen.tsx
│       └── types.ts
├── navigation/
│   ├── root-navigator.tsx
│   ├── auth-navigator.tsx
│   ├── main-navigator.tsx
│   └── types.ts           # ALL navigation param types live here
├── theme/                 # DO NOT MODIFY
└── mock-data/             # JSON files — populate with realistic data
```

## Component Patterns

### Every screen file:
```tsx
// features/home/screens/home-screen.tsx
import { View, StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { typography } from "@/theme/typography";

export function HomeScreen() { ... }

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing.screenPadding,
  }
});
```

### Every list:
```tsx
import { FlashList } from "@shopify/flash-list";
// estimatedItemSize is required
<FlashList data={items} renderItem={...} estimatedItemSize={80} />
```

### Every image:
```tsx
import { Image } from "expo-image";
<Image source={{ uri: url }} style={...} cachePolicy="memory-disk" />
```

### Props interface — always in the same file or types.ts:
```tsx
interface QuestionCardProps {
  question: Question;
  onPress: (id: string) => void;
}
```

## Navigation Types Pattern
```typescript
// navigation/types.ts
export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Settings: undefined;
  Store: undefined;
};
```

## Mock Data
- All data from `src/mock-data/*.json`
- Import with proper typing: `import questions from "@/mock-data/questions.json"`
- NO API calls, NO fetch, NO axios

## What NOT to do
- No `any` types
- No inline styles with magic numbers
- No hardcoded color strings
- No FlatList
- No RN Image
- No UI component kits (NativeBase, Tamagui, etc.)
- No business logic inside screen components — extract to hooks if needed
- No dead code / commented-out blocks