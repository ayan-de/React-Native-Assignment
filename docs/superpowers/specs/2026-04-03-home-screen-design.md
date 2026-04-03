# Home Screen Design - Pixel-Perfect Figma Implementation

## Overview

Implement the Home screen from the Figma design (Grapevine Internship Program, node 2-16676 "Home - Open State"). The screen shows a list of interview practice questions organized by company, with a course switcher, streak counter, and custom bottom navigation.

**Starting state**: Q1 is Up Next (no completed questions yet). All other questions are Not Done.

## File Structure

```
src/
├── assets/
│   ├── companies/              # 8 company logo PNGs (downloaded from Figma)
│   │   ├── phonepe-logo.png
│   │   ├── amazon-logo.png
│   │   ├── google-logo.png
│   │   ├── microsoft-logo.png
│   │   ├── meta-logo.png
│   │   ├── apple-logo.png
│   │   ├── zomato-logo.png
│   │   └── swiggy-logo.png
│   └── icons/                  # SVG icons
├── features/
│   └── home/
│       ├── components/
│       │   ├── question-card.tsx       # Question card with 3 states
│       │   ├── course-switcher.tsx     # Yellow pill with course name
│       │   ├── top-nav-bar.tsx         # Logo + streak counter
│       │   ├── pro-promo-banner.tsx    # "2,312 users completed..." banner
│       │   └── bottom-nav.tsx          # Custom bottom nav with elevated Store button
│       ├── screens/
│       │   └── home-screen.tsx         # Main home screen
│       ├── hooks/
│       │   └── use-questions.ts        # Question state logic
│       └── types.ts                    # Interfaces
├── mock-data/
│   ├── questions.json     # Updated: 10 questions
│   └── companies.json     # Updated: 8 companies
└── navigation/
    └── main-navigator.tsx  # Updated: custom bottom nav
```

## Components

### 1. TopNavBar

Static header at the top of the home screen.

- Left: "Ready!" gradient text (orange gradient, Onest/Bold 24px)
- Right: Streak counter pill
  - Green background (#57D997), 4px bottom shadow (rgba(19,191,105,1))
  - White text "8" (SemiBold 16px)
  - Lightning bolt icon (yellow/white)
  - Second decorative circle behind (lighter green, #F5F5F8)
- Layout: Row, space-between, padding 10px horizontal 16px

### 2. CourseSwitcher

Yellow/cream rounded pill below the top nav.

- Background: #FFF6D9
- Border radius: 24px
- Bottom shadow: 4px solid rgba(191,156,38,1) (golden)
- Contents (row, centered, gap 12px, padding 16px):
  - Croco mascot icon (32x32, white background)
  - Text block:
    - "Practicing Top 50 Questions for" — Manrope Medium 500, 14px, #48484A
    - "Big Tech Companies" — Manrope SemiBold 600, 16px, #1C1C1E
  - Chevron-down icon (24x24, line style)

### 3. QuestionCard

The primary interactive component with three visual states.

**Common structure**: Row with company section (left) and button section (right).

**Company section** (all states):
- Rounded container with border radius 30px
- Company name text (Manrope Medium 500, 14px)
- Circular company logo (22x22, white background, thin border stroke)
- Box shadow varies by state

**Button section** (varies by state):

| State | Button Fill | Number Text | Shadow | Extras |
|-------|-----------|-------------|--------|--------|
| Done | Green gradient + mask SVG overlay | White, ExtraBold 36px, 2px stroke | Golden 4px | Checkmark/decoration SVG |
| Up Next | Purple/yellow gradient | White, ExtraBold 36px, 2px stroke | Golden 8px | START pill (white bg, green text, orange border, 10px radius) + chevron icon |
| Not Done | Light gray (#D1D1D6) | White, ExtraBold 36px, 2px stroke | Gray 8px | None |

**Shadow details**:
- Done: 4px bottom, rgba(191,156,38,1)
- Up Next: 8px bottom, rgba(193,148,0,1)
- Not Done: 8px bottom, rgba(142,142,147,1)

### 4. ProPromoBanner

Full-width banner inserted between Q3 and Q4 in the list.

- Layout: Row, centered, gap 12px, padding 6px vertical 16px horizontal
- Border: Bottom only, dashed, 2px, color #BF9C26
- Contents: Flag icon (filled) + text + flag icon (filled)
- Text: "2,312 users completed Question 3 today" — Manrope Bold 700, 14px, #BF9C26
- Flag icon: SVG with #2F384C dark blue fill

### 5. BottomNav

Custom bottom navigation bar replacing React Navigation's default.

- Background: White, top border #F3F3F8
- Shadow: 4px bottom, rgba(229,229,234,1)
- Border radius: 99999px on the bar container
- Three tabs:
  - **Home** (active): home-4 filled icon, orange gradient color, "Home" label in orange (#FF7800)
  - **Store** (center, elevated): 68x68 circular button, gradient background, blue border (#B2D9FF), shopping-bag-2 filled icon, 4px blue shadow
  - **Progress** (inactive): presentation-chart line icon, gray #48484A, "Progress" label in gray

- Home indicator at bottom: white bar, 5px tall, 144px wide, centered

### 6. HomeScreen

Main screen composing all components:

- SafeAreaView with white background
- TopNavBar (fixed at top)
- CourseSwitcher (fixed below nav)
- FlashList for scrollable content:
  - QuestionCard items with 8px gaps
  - ProPromoBanner inserted between Q3 and Q4
  - estimatedItemSize based on card height
- BottomNav (fixed at bottom)
- Fade gradient overlay at bottom (transparent to white)

## Data Model

### types.ts

```typescript
interface Question {
  id: string;
  questionNumber: number;
  companyId: string;
  companyName: string;
  companyLogoAsset: string;
  text: string;
  durationMinutes: number;
  completedTodayCount: number;
  state: "done" | "upnext" | "not-done";
}

interface Company {
  id: string;
  name: string;
  logoAsset: string;
}
```

### Mock Data

**companies.json** — 8 companies: PhonePe, Amazon, Google, Microsoft, Meta, Apple, Zomato, Swiggy. Each has a `logoAsset` field referencing the downloaded PNG in `assets/companies/`.

**questions.json** — 10 questions matching the Figma order:

| # | Company | State |
|---|---------|-------|
| 1 | PhonePe | upnext |
| 2 | Amazon | not-done |
| 3 | PhonePe | not-done |
| 4 | Google | not-done |
| 5 | Microsoft | not-done |
| 6 | Meta | not-done |
| 7 | Amazon | not-done |
| 8 | Meta | not-done |
| 9 | Microsoft | not-done |
| 10 | Google | not-done |

## Navigation Changes

Replace `createBottomTabNavigator` with a custom approach:

- Keep `MainTabParamList` type definition
- Use `NavigationContainer` + manual tab switching via state
- Render custom `BottomNav` component instead of default tab bar
- Home, Settings, Store screens rendered conditionally based on active tab

## Theme Considerations

The Figma design uses colors outside the existing ReadyU theme. Since CLAUDE.md says "DO NOT MODIFY" the theme, the home feature will define its own local color constants in a `colors.ts` within the home feature or inline in styles. These include:

- Golden/cream: #FFF6D9, #BF9C26
- Green streak: #57D997
- Gray muted: #D1D1D6, #48484A
- Dark text: #1C1C1E
- Orange brand: #FF7800
- Blue store border: #B2D9FF

Existing theme colors (`colors.background`, `spacing.screenPadding`, `typography.fonts.inter`) will be reused where they match the Figma design.

## Constraints

- Use `@shopify/flash-list` for the question list (never FlatList)
- Use `expo-image` with `cachePolicy="memory-disk"` for company logos (never RN Image)
- All imports use `@/` alias
- No `any` types
- No inline hardcoded colors — use StyleSheet constants
- No business logic in screen component — extract to `useQuestions` hook
- Props interfaces in `types.ts`
