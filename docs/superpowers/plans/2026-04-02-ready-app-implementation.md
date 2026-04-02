# Ready! App — Full Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete "Ready!" AI interview practice app matching the Figma design pixel-perfectly, with proper architecture, TypeScript, and navigation.

**Architecture:** Feature-based folder structure under `src/features/`. React Navigation v7 for auth (Stack) and main (Bottom Tabs). All data from mock JSON files. Theme tokens from `src/theme/`. Bottom sheet via `@gorhom/bottom-sheet`.

**Tech Stack:** React Native + Expo SDK 55, TypeScript strict, React Navigation v7, @shopify/flash-list, expo-image, @gorhom/bottom-sheet, react-native-reanimated, Inter font via @expo-google-fonts/inter

**Time Budget: 24 hours total**

| Phase | Block | Time |
|---|---|---|
| Phase 0 | Figma study + mock data population | 1.5h |
| Phase 1 | Navigation + foundation + shared UI | 1.5h |
| Phase 2 | Auth flow (Splash, Welcome, Login) | 2h |
| Phase 3 | Home screen + bottom sheet | 4h |
| Phase 4 | Session Result (tabs) | 2.5h |
| Phase 5 | Settings screen | 1h |
| Phase 6 | Polish + bonus | 2h |
| Phase 7 | NOTES.md + APK build + video | 1.5h |
| Buffer | Unexpected issues | ~2h |

**Evaluation Weights (keep in mind):**
- 30% UI Fidelity — pixel-perfect Figma match
- 25% Code Quality — clean, DRY, no dead code
- 20% Architecture — exact folder structure
- 15% TypeScript — no `any`, typed props everywhere
- 10% Bonus — animations, haptics, accessibility

---

## PHASE 0 — Figma Study & Mock Data Population

**Time: 1.5 hours**

Open the Figma in dev mode before doing anything. Every color, spacing, font size, and layout decision must come from here. Do NOT skip this.

### Task 0.1: Figma Audit

**Files:** None (research only)

- [ ] **Step 1:** Open Figma link: `https://www.figma.com/design/8i6wNZ6dafxTh5Zl9jbgu3/Grapevine-Internship-Program?node-id=2-16244&p=f&m=dev`
- [ ] **Step 2:** Enable Dev Mode (bottom-right toggle) to see exact px values, font weights, hex codes
- [ ] **Step 3:** Screenshot or note the following for EVERY screen:
  - Splash: logo size, positioning, background color, auto-navigate delay
  - Welcome: brand text sizes, tagline, CTA button dimensions/colors, illustrated character positioning
  - Login: heading text, input field heights/borders, OTP input box sizes (4 digits), submit button, back nav
  - Home: header layout (logo left, notification + hamburger right), practice set card dimensions, question card layout (company logo size, name, question badge), START button styling, bottom tab bar icons
  - Home Open State: bottom sheet snap points, question text layout, company info, duration badge, FEEDBACK button, AI VS AI button, social proof text styling
  - Session Result: avatar section, question card in header, tab bar styling, Smart Summary bullet points, Key Moments timestamp layout, audio player bar
  - Settings: profile avatar size/name/phone layout, CTA button, menu items layout, Log Out button

- [ ] **Step 4:** Cross-reference Figma colors with `src/theme/colors.ts` palette tokens — map every Figma hex to a theme token
- [ ] **Step 5:** Note all font sizes from Figma and map them to `src/theme/typography.ts` sizes
- [ ] **Step 6:** Note all spacing values (padding, margin, gaps) from Figma and map them to `src/theme/spacing.ts` tokens
- [ ] **Step 7:** Note all border-radius values used across screens

### Task 0.2: Populate Mock Data — companies.json

**Files:**
- Modify: `src/mock-data/companies.json`

- [ ] **Step 1:** Fill with 6-8 Indian tech companies visible in the Figma (PhonePe, Amazon, Google, Flipkart, Microsoft, Swiggy, etc.)
- [ ] **Step 2:** Each entry needs: `id`, `name`, `logoUrl` (use Wikipedia/Wikimedia CDN URLs for company logos — they're reliable and free)
- [ ] **Step 3:** Ensure company logos are SVG or high-quality PNG URLs that will load in expo-image

### Task 0.3: Populate Mock Data — questions.json

**Files:**
- Modify: `src/mock-data/questions.json`

- [ ] **Step 1:** Create 8-12 realistic interview questions — match the EXACT text visible in the Figma for at least the first 2-3 questions
- [ ] **Step 2:** Each entry needs: `id`, `questionNumber`, `companyId`, `companyName`, `companyLogoUrl`, `text`, `durationMinutes`, `completedTodayCount`
- [ ] **Step 3:** Distribute questions across multiple companies (not all from one company)
- [ ] **Step 4:** Match the first question exactly to the Figma: "API latency is variable & app is sluggish. How do you design UI safely?" for PhonePe
- [ ] **Step 5:** Use realistic `completedTodayCount` numbers (1000-5000 range)

### Task 0.4: Populate Mock Data — session-result.json

**Files:**
- Modify: `src/mock-data/session-result.json`

- [ ] **Step 1:** Fill `smartSummary.whatWorkedWell` with 3-5 bullet points matching Figma text (look at the Feedback screen)
- [ ] **Step 2:** Fill `smartSummary.overallTakeaways` with 3-5 bullet points matching Figma text
- [ ] **Step 3:** Fill `keyMoments` with 5-8 timestamped entries matching the Figma Highlights screen — note the exact timestamps and descriptions
- [ ] **Step 4:** Set `audioDurationSeconds` to match the Figma audio player (likely ~312 seconds / 5:12)
- [ ] **Step 5:** Ensure each key moment has correct `type` ("positive" or "negative") — green/red indicators in Figma

### Task 0.5: Populate Mock Data — user.json

**Files:**
- Modify: `src/mock-data/user.json`

- [ ] **Step 1:** Fill with realistic user profile data matching the Figma Settings screen
- [ ] **Step 2:** Use a real avatar URL (the existing pravatar.cc URL is fine, or match the Figma avatar)
- [ ] **Step 3:** Use a realistic Indian phone number format (+91 XXXXX XXXXX)
- [ ] **Step 4:** Commit all mock data files

---

## PHASE 1 — Foundation: Navigation, Types, Shared UI

**Time: 1.5 hours**

Everything else depends on this phase. Do it first and do it right.

### Task 1.1: Define All Navigation Types

**Files:**
- Create: `src/navigation/types.ts`

- [ ] **Step 1:** Define `AuthStackParamList` with screens: Splash (undefined), Welcome (undefined), Login (undefined)
- [ ] **Step 2:** Define `MainTabParamList` with tabs: Home (undefined), Settings (undefined), Store (undefined)
- [ ] **Step 3:** Define `RootStackParamList` that combines auth stack and main tabs (Auth: Navigator type, Main: Navigator type)
- [ ] **Step 4:** Export all type lists

### Task 1.2: Define All Feature Types

**Files:**
- Create: `src/features/auth/types.ts`
- Create: `src/features/home/types.ts`
- Create: `src/features/session-result/types.ts`
- Create: `src/features/settings/types.ts`

- [ ] **Step 1:** In `auth/types.ts` — define interfaces for any auth-specific props (e.g., LoginScreen props if needed, OTP input props)
- [ ] **Step 2:** In `home/types.ts` — define `Question` interface (matching questions.json shape), `Company` interface (matching companies.json shape), `QuestionCardProps`, `QuestionBottomSheetProps`, `PracticeSetCardProps`
- [ ] **Step 3:** In `session-result/types.ts` — define `SessionResult` interface, `KeyMoment` interface, `SmartSummary` interface, `SmartSummaryTabProps`, `KeyMomentsTabProps`
- [ ] **Step 4:** In `settings/types.ts` — define `User` interface (matching user.json shape), `SettingsMenuItem` interface, `SettingsScreenProps`

### Task 1.3: Create Shared UI Components

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/text.tsx`

- [ ] **Step 1:** Create `button.tsx` — a reusable Button component accepting: `title`, `onPress`, `variant` ("primary" | "secondary" | "outline" | "ghost"), `disabled`, `size` ("small" | "medium" | "large"), `style` override. Use theme tokens exclusively. Apply `typography.fonts.inter.semiBold`, `colors.buttonPrimary`, `spacing.buttonRadius`, etc.
- [ ] **Step 2:** Create `text.tsx` — a reusable Text component accepting: `children`, `variant` ("heading" | "subheading" | "body" | "caption" | "label"), `color` override, `weight` override, `style` override. Map variants to `typography.sizes` and `typography.fonts.inter.*`. Default color to `colors.textPrimary`.
- [ ] **Step 3:** Ensure both components use `StyleSheet.create` with theme tokens, no inline styles, no hardcoded values

### Task 1.4: Create Auth Navigator

**Files:**
- Create: `src/navigation/auth-navigator.tsx`

- [ ] **Step 1:** Import `createNativeStackNavigator` from `@react-navigation/native-stack`
- [ ] **Step 2:** Import `AuthStackParamList` from `./types`
- [ ] **Step 3:** Create stack with Splash, Welcome, Login screens (use placeholder components for now — just `View` with `Text`)
- [ ] **Step 4:** Configure screen options: `headerShown: false` for all auth screens
- [ ] **Step 5:** Export as `AuthNavigator`

### Task 1.5: Create Main Navigator (Bottom Tabs)

**Files:**
- Create: `src/navigation/main-navigator.tsx`

- [ ] **Step 1:** Import `createBottomTabNavigator` from `@react-navigation/bottom-tabs`
- [ ] **Step 2:** Import `MainTabParamList` from `./types`
- [ ] **Step 3:** Create tab navigator with Home, Settings, Store tabs (placeholder screens for now)
- [ ] **Step 4:** Configure tab bar: icons from `@expo/vector-icons` (use Ionicons — check Figma for exact icon names: home outline, settings/gear outline, store/bag outline), active/inactive tint colors from theme (`colors.primary` for active, `colors.textSecondary` for inactive), tab bar style with border color from `colors.border`
- [ ] **Step 5:** Export as `MainNavigator`

### Task 1.6: Create Root Navigator

**Files:**
- Create: `src/navigation/root-navigator.tsx`

- [ ] **Step 1:** Import `createNativeStackNavigator` from `@react-navigation/native-stack`
- [ ] **Step 2:** Import `AuthNavigator` and `MainNavigator`
- [ ] **Step 3:** Create root stack with two screens: Auth (renders AuthNavigator), Main (renders MainNavigator)
- [ ] **Step 4:** Set `headerShown: false` for both
- [ ] **Step 5:** Export as `RootNavigator`

### Task 1.7: Wire Up App.tsx Entry Point

**Files:**
- Modify: `src/App.tsx` (actually `App.tsx` at root — but consider refactoring to `src/App.tsx` if it makes imports cleaner; check if `index.ts` imports correctly)

Wait — `App.tsx` is at root and `index.ts` imports it. Keep it at root.

- Modify: `App.tsx`

- [ ] **Step 1:** Replace the placeholder App with NavigationContainer wrapping RootNavigator
- [ ] **Step 2:** Load Inter fonts using `useFonts` from `@expo-google-fonts/inter` (load all weights: 300Light, 400Regular, 500Medium, 600SemiBold, 700Bold)
- [ ] **Step 3:** Show a loading/null state while fonts load
- [ ] **Step 4:** Wrap everything in `SafeAreaProvider` from `react-native-safe-area-context`
- [ ] **Step 5:** Ensure `GestureHandlerRootView` wraps the app (required by `@gorhom/bottom-sheet`)
- [ ] **Step 6:** Ensure `BottomSheetModalProvider` from `@gorhom/bottom-sheet` wraps the app
- [ ] **Step 7:** Configure `StatusBar` from expo-status-bar with appropriate style

### Task 1.8: Verify Phase 1

- [ ] **Step 1:** Run `yarn start` and verify the app loads without errors
- [ ] **Step 2:** Verify navigation works between auth stack and main tabs (may need a temp navigation trigger)
- [ ] **Step 3:** Verify fonts load correctly (no system font fallback)
- [ ] **Step 4:** Verify bottom tab bar renders with correct icons
- [ ] **Step 5:** Commit all Phase 1 files with message: `feat: navigation structure, types, and shared UI components`

---

## PHASE 2 — Auth Flow (Splash, Welcome, Login)

**Time: 2 hours**

Three screens. All local state, no real auth. Match Figma pixel-perfectly.

### Task 2.1: Splash Screen

**Files:**
- Create: `src/features/auth/screens/splash-screen.tsx`

- [ ] **Step 1:** White background (`colors.background`), centered "Ready!" logo/text
- [ ] **Step 2:** Use the splash-icon from `./assets/splash-icon.png` or the Ready! brand text — check Figma for exact treatment
- [ ] **Step 3:** Auto-navigate to Welcome after ~2 seconds using `useEffect` with a `setTimeout`
- [ ] **Step 4:** Use `navigation.replace` (not `navigate`) so user can't go back to splash
- [ ] **Step 5:** Add a subtle fade-out animation with react-native-reanimated if time permits (bonus)

### Task 2.2: Welcome Screen

**Files:**
- Create: `src/features/auth/screens/welcome-screen.tsx`

- [ ] **Step 1:** White background, vertically centered content
- [ ] **Step 2:** Ready! brand logo/text at top — match Figma size and weight (likely `typography.sizes.xxxl` or `typography.sizes.display` with `typography.fonts.inter.bold`)
- [ ] **Step 3:** Illustrated character image below — check Figma for the exact illustration. If it's an asset, download from Figma and place in `assets/`. If it's a remote URL, use expo-image. If not extractable, create a similar placeholder illustration or use a colored View with an icon.
- [ ] **Step 4:** Tagline text: "Practice Top Interview Questions with AI" — match Figma font size and color (`colors.textSecondary` likely)
- [ ] **Step 5:** Primary CTA button at bottom using the shared `Button` component — match Figma label (likely "Get Started" or similar), full-width, primary variant
- [ ] **Step 6:** CTA navigates to Login screen
- [ ] **Step 7:** Padding using `spacing.screenPadding` throughout

### Task 2.3: Login Screen — Phone Input

**Files:**
- Create: `src/features/auth/screens/login-screen.tsx`

- [ ] **Step 1:** White background with back navigation (stack header hidden, custom back button or swipe-back)
- [ ] **Step 2:** "Kickstart your journey" heading — match Figma font size/weight/color exactly
- [ ] **Step 3:** Subtitle text below heading (check Figma for exact copy)
- [ ] **Step 4:** Mobile number input field:
  - Country code prefix (+91) as a non-editable label
  - Text input for 10-digit phone number
  - Styling: border from `colors.border`, focused border from `colors.borderFocused`, radius from `spacing.inputRadius`
  - Font: `typography.fonts.inter.normal`, size from `typography.sizes.l`
  - Placeholder text: "Mobile Number" or similar from Figma
- [ ] **Step 5:** State management: `useState` for `step` ("phone" | "otp"), `phone`, `otp`

### Task 2.4: Login Screen — OTP Input

**Files:**
- Modify: `src/features/auth/screens/login-screen.tsx`

- [ ] **Step 1:** When phone is submitted, transition UI to OTP step (no navigation, same screen state change)
- [ ] **Step 2:** "Enter OTP" heading — match Figma
- [ ] **Step 3:** 4-digit OTP input: 4 individual boxes side-by-side, each accepting one digit
  - Each box: square-ish, border from `colors.border`, focused border from `colors.borderFocused`
  - Auto-focus next box on digit entry
  - Auto-advance to verification when all 4 digits entered (or explicit submit button)
- [ ] **Step 4:** "Verify" or "Submit" button — primary variant, using shared Button component
- [ ] **Step 5:** "Resend OTP" text link below (non-functional or with a timer — check Figma)
- [ ] **Step 6:** On verify: navigate to Main tabs using `navigation.replace` (reset the stack so user can't go back to auth)

### Task 2.5: Verify Phase 2

- [ ] **Step 1:** Run app, verify Splash → Welcome → Login → Home flow works end-to-end
- [ ] **Step 2:** Verify back navigation works (Login → Welcome)
- [ ] **Step 3:** Verify OTP input works with any 4 digits
- [ ] **Step 4:** Verify phone input transitions to OTP step
- [ ] **Step 5:** Verify no `any` types, no hardcoded values
- [ ] **Step 6:** Commit: `feat: auth flow — splash, welcome, and login screens`

---

## PHASE 3 — Home Screen + Open State (Hardest Phase)

**Time: 4 hours**

This is the most evaluated screen. Take your time on UI fidelity.

### Task 3.1: Home Screen — Header

**Files:**
- Create: `src/features/home/screens/home-screen.tsx`

- [ ] **Step 1:** Create the header bar:
  - Left: "Ready!" brand logo/text in orange (`colors.primary`) — match Figma size and weight
  - Right: notification bell icon with red badge (count from mock data or hardcoded "3"), hamburger menu icon
  - Use `@expo/vector-icons` (Ionicons) for bell and menu icons
  - Layout: row with space-between, padding from `spacing.screenPadding`
  - Background: `colors.background` (white)
- [ ] **Step 2:** Wrap entire screen in a View with SafeArea handling

### Task 3.2: Home Screen — Practice Set Card

**Files:**
- Create: `src/features/home/components/practice-set-card.tsx` (if Figma shows it as a distinct card — otherwise inline in home-screen)
- Modify: `src/features/home/types.ts` (add PracticeSetCardProps if needed)

- [ ] **Step 1:** Card showing current practice set title: "Practicing Top 50 Questions for Big Tech Companies" (match Figma text exactly)
- [ ] **Step 2:** Chevron icon on the right (expand/collapse indicator) — Ionicons chevron-down
- [ ] **Step 3:** Card styling: background `colors.cardBackground`, border `colors.cardBorder`, radius `spacing.cardRadius`, padding `spacing.cardPadding`
- [ ] **Step 4:** Title text: match Figma font size/weight/color
- [ ] **Step 5:** Subtle shadow or elevation if visible in Figma

### Task 3.3: Home Screen — Question Card Component

**Files:**
- Create: `src/features/home/components/question-card.tsx`
- Modify: `src/features/home/types.ts`

- [ ] **Step 1:** Define `QuestionCardProps` in `types.ts`: `question: Question`, `onPress: (id: string) => void`, `isFirst: boolean`
- [ ] **Step 2:** Card layout (horizontal row):
  - Left: Company logo (expo-image, small thumbnail ~40x40 or match Figma), `cachePolicy="memory-disk"`
  - Middle: Company name (bold), question text preview (truncated to 2 lines), or just company name depending on Figma
  - Right or overlay: Question number badge (circle with number)
- [ ] **Step 3:** First card (`isFirst === true`) shows a "START" button — match Figma styling (likely pill-shaped, orange background)
- [ ] **Step 4:** Card styling: background, border, radius, padding all from theme tokens
- [ ] **Step 5:** Wrap in `React.memo` for performance (bonus point)

### Task 3.4: Home Screen — Question List with FlashList

**Files:**
- Modify: `src/features/home/screens/home-screen.tsx`

- [ ] **Step 1:** Import `FlashList` from `@shopify/flash-list`
- [ ] **Step 2:** Import questions from `@/mock-data/questions.json`
- [ ] **Step 3:** Render FlashList below the practice set card:
  - `data={questions}` — the JSON array
  - `renderItem` — renders `QuestionCard` component
  - `estimatedItemSize={80}` (adjust to match actual card height from Figma)
  - `keyExtractor` — use question `id`
  - `ItemSeparatorComponent` — small spacer between cards (match Figma gap)
- [ ] **Step 4:** Use `ListHeaderComponent` for the practice set card so it scrolls with the list
- [ ] **Step 5:** Handle `onPress` on each card — set selected question state and open bottom sheet

### Task 3.5: Home Screen — Bottom Sheet (Open State)

**Files:**
- Create: `src/features/home/components/question-bottom-sheet.tsx`
- Modify: `src/features/home/types.ts`

- [ ] **Step 1:** Define `QuestionBottomSheetProps`: `question: Question | null`, `onFeedbackPress: (questionId: string) => void`
- [ ] **Step 2:** Use `@gorhom/bottom-sheet` BottomSheetModal:
  - Configure snap points matching Figma (likely ["50%", "80%"] or similar — measure from Figma)
  - Background styling: white, top border radius
  - Handle indicator at top (the drag bar)
- [ ] **Step 3:** Sheet content layout (top to bottom):
  - Question text — match Figma size/weight/color
  - "Asked by [Company Name]" row with company logo (expo-image) — small icon + company name text
  - Duration estimate: "2 mins" — badge/pill styling
  - Two buttons stacked or side-by-side (check Figma):
    - "FEEDBACK" — primary button, navigates to Session Result on press
    - "AI VS AI (LISTEN)" — secondary/outline button, can be disabled/dummy
  - Social proof text: "X users completed Question N today" — `colors.textSecondary`, smaller font
- [ ] **Step 4:** Animate open/close (bottom sheet handles this, but ensure smooth feel)
- [ ] **Step 5:** Handle `onFeedbackPress` — navigate to SessionResult screen with question context

### Task 3.6: Home Screen — Wire It All Together

**Files:**
- Modify: `src/features/home/screens/home-screen.tsx`
- Modify: `src/navigation/main-navigator.tsx` (ensure Home screen is connected)

- [ ] **Step 1:** State: `selectedQuestion` (null or Question), `isSheetOpen` (boolean)
- [ ] **Step 2:** On question card press: set `selectedQuestion`, open bottom sheet ref
- [ ] **Step 3:** On feedback press in bottom sheet: close sheet, navigate to SessionResult
- [ ] **Step 4:** Add `ref` for BottomSheetModal, call `ref.current?.present()` / `ref.current?.close()`
- [ ] **Step 5:** Ensure bottom sheet is rendered at the bottom of the component tree (after FlashList)

### Task 3.7: Verify Phase 3

- [ ] **Step 1:** Run app, navigate to Home after login
- [ ] **Step 2:** Verify header renders correctly (logo, notification, hamburger)
- [ ] **Step 3:** Verify practice set card renders with correct text
- [ ] **Step 4:** Verify question list renders with FlashList (no FlatList)
- [ ] **Step 5:** Verify tapping a question opens bottom sheet
- [ ] **Step 6:** Verify bottom sheet content matches Figma layout
- [ ] **Step 7:** Verify FEEDBACK button navigation (will go to SessionResult — OK if that screen isn't built yet)
- [ ] **Step 8:** Verify no `any`, no hardcoded values, all imports use `@/`
- [ ] **Step 9:** Commit: `feat: home screen with practice set card, question list, and bottom sheet`

---

## PHASE 4 — Session Result (Smart Summary + Key Moments Tabs)

**Time: 2.5 hours**

Two tabs in one screen. Match Figma's "Feedback" and "Highlights" screens.

### Task 4.1: Session Result — Shared Header

**Files:**
- Create: `src/features/session-result/screens/session-result-screen.tsx`
- Modify: `src/features/session-result/types.ts`

- [ ] **Step 1:** Define `SessionResultScreenProps` in types — route params will carry `questionId`
- [ ] **Step 2:** Header section (shared, above tabs):
  - Two illustrated avatar characters side-by-side — check Figma for exact images. If they're illustrations, extract from Figma and place in `assets/`. Use expo-image to render.
  - Question card below avatars: question text + company logo + company name
  - Background: `colors.background` or `colors.backgroundFeedback` (check Figma — likely a light green tint)
- [ ] **Step 3:** Import session-result data from `@/mock-data/session-result.json`

### Task 4.2: Session Result — Tab Navigation

**Files:**
- Modify: `src/features/session-result/screens/session-result-screen.tsx`

- [ ] **Step 1:** Create a custom tab bar (not a full navigator — use simple state for tab switching):
  - Two tabs: "Smart Summary" and "Key Moments"
  - Active tab indicator: orange underline or background change
  - Match Figma tab styling exactly
- [ ] **Step 2:** State: `activeTab: "summary" | "moments"`
- [ ] **Step 3:** Conditionally render `SmartSummaryTab` or `KeyMomentsTab` based on `activeTab`

### Task 4.3: Smart Summary Tab

**Files:**
- Create: `src/features/session-result/components/smart-summary-tab.tsx`
- Modify: `src/features/session-result/types.ts`

- [ ] **Step 1:** Define `SmartSummaryTabProps`: `smartSummary` data object
- [ ] **Step 2:** "What worked well" section:
  - Section heading with green check icon or similar (check Figma)
  - Bullet-point list from `session-result.json → smartSummary.whatWorkedWell`
  - Background: `colors.backgroundFeedback` (light green tint)
  - Each bullet: green dot or checkmark + text
  - Text styling from Figma (size, color, weight)
- [ ] **Step 3:** "Overall takeaways" section:
  - Section heading
  - Bullet-point list from `session-result.json → smartSummary.overallTakeaways`
  - Similar styling to "What worked well" section
- [ ] **Step 4:** Wrap in FlashList if list is long, otherwise use simple map with Views (FlashList preferred for consistency)
- [ ] **Step 5:** Section spacing from theme tokens

### Task 4.4: Key Moments Tab

**Files:**
- Create: `src/features/session-result/components/key-moments-tab.tsx`
- Modify: `src/features/session-result/types.ts`

- [ ] **Step 1:** Define `KeyMomentsTabProps`: `keyMoments` array, `audioDurationSeconds`
- [ ] **Step 2:** Mock audio player bar at top:
  - Play/pause button (Ionicons play-circle)
  - Progress bar (colored portion = fraction of audioDurationSeconds, total = audioDurationSeconds)
  - Current time label and total duration label
  - This is NON-FUNCTIONAL UI only — no real audio playback needed
  - Styling: match Figma colors, radius, sizes
- [ ] **Step 3:** Timestamped key moments list below the audio player:
  - Each item: timestamp (e.g. "01:37") on the left, description text on the right
  - Type indicator: green dot for "positive", red dot for "negative" (match Figma)
  - Timestamp styling: monospace or bold, `colors.textSecondary` or specific color
  - Description: body text styling
- [ ] **Step 4:** Wrap in FlashList with `estimatedItemSize`
- [ ] **Step 5:** All colors/spacing/typography from theme tokens

### Task 4.5: Add Session Result to Navigation

**Files:**
- Modify: `src/navigation/types.ts`
- Modify: `src/navigation/main-navigator.tsx` (or wherever makes sense — SessionResult is likely a stack screen within the main tab, not a tab itself)

- [ ] **Step 1:** Add `SessionResult` to the appropriate param list in `navigation/types.ts` — it needs a `questionId` param
- [ ] **Step 2:** Since it's accessed from Home (not a tab), it should be part of a nested stack within the Home tab or a separate stack. Easiest approach: make Main navigator a Stack that contains the Tab navigator and SessionResult as sibling screens.
- [ ] **Step 3:** Alternative (simpler): Keep Bottom Tabs but add SessionResult to `MainTabParamList` (it just won't show in the tab bar). Or restructure: Root → Auth Stack | Main Stack (which contains Tabs + SessionResult).
- [ ] **Step 4:** The recommended architecture: Change RootNavigator to have Auth and Main. Main is a Stack with: Tabs (Home, Settings, Store) and SessionResult. This way SessionResult can be pushed on top of the tabs.
- [ ] **Step 5:** Wire navigation from Home's FEEDBACK button to SessionResult with `questionId` param

### Task 4.6: Verify Phase 4

- [ ] **Step 1:** Navigate from Home question → Session Result screen
- [ ] **Step 2:** Verify header shows avatars and question info
- [ ] **Step 3:** Verify Smart Summary tab renders bullet points correctly
- [ ] **Step 4:** Verify Key Moments tab renders audio player bar and timestamped list
- [ ] **Step 5:** Verify tab switching works smoothly
- [ ] **Step 6:** Verify back navigation returns to Home
- [ ] **Step 7:** Verify all theme tokens used, no hardcoded values
- [ ] **Step 8:** Commit: `feat: session result screen with smart summary and key moments tabs`

---

## PHASE 5 — Settings Screen

**Time: 1 hour**

Simplest screen. Straightforward layout.

### Task 5.1: Settings Screen — Profile Section

**Files:**
- Create: `src/features/settings/screens/settings-screen.tsx`
- Modify: `src/features/settings/types.ts`

- [ ] **Step 1:** Profile section at top:
  - Avatar image (expo-image, circular, `spacing.avatarSize` or Figma size) from `user.json → avatarUrl`
  - User name below avatar (bold, `typography.sizes.l` or match Figma)
  - Phone number below name (`colors.textSecondary`, smaller font)
  - Import user from `@/mock-data/user.json`
- [ ] **Step 2:** "Sign up / Continue" CTA button below profile — primary variant, match Figma label exactly
- [ ] **Step 3:** Padding from `spacing.screenPadding`, vertical spacing from theme

### Task 5.2: Settings Screen — Menu List

**Files:**
- Modify: `src/features/settings/screens/settings-screen.tsx`
- Modify: `src/features/settings/types.ts`

- [ ] **Step 1:** Define `SettingsMenuItem` type: `id`, `label`, `icon` (Ionicons name), `onPress` handler
- [ ] **Step 2:** Menu items — check Figma for exact labels and icons. Likely includes:
  - Edit Profile / My Profile
  - Notifications
  - Privacy / Privacy Policy
  - Help & Support / Help Center
  - About / About Us
  - Any others visible in Figma
- [ ] **Step 3:** Each menu item: icon on left, label text, chevron-right on right
- [ ] **Step 4:** Divider lines between items (`colors.border`, 1px height or `StyleSheet.hairlineWidth`)
- [ ] **Step 5:** Menu items can be non-functional (just UI) except Log Out

### Task 5.3: Settings Screen — Log Out

**Files:**
- Modify: `src/features/settings/screens/settings-screen.tsx`

- [ ] **Step 1:** "Log Out" item at the bottom of the menu list
- [ ] **Step 2:** Styling: likely red text or distinctive style (check Figma) — `colors.error` or specific logout styling
- [ ] **Step 3:** On press: navigate back to Welcome screen by resetting navigation state (use `CommonActions.reset` to clear the stack back to auth)
- [ ] **Step 4:** Optional: show a confirmation alert before logging out

### Task 5.4: Verify Phase 5

- [ ] **Step 1:** Navigate to Settings tab
- [ ] **Step 2:** Verify profile section renders with avatar, name, phone
- [ ] **Step 3:** Verify menu items render with icons and labels
- [ ] **Step 4:** Verify Log Out navigates to Welcome screen
- [ ] **Step 5:** Verify back navigation works correctly after logout
- [ ] **Step 6:** Commit: `feat: settings screen with profile, menu, and logout`

---

## PHASE 6 — Polish + Bonus

**Time: 2 hours**

This phase directly impacts the 30% UI Fidelity and 10% Bonus scores.

### Task 6.1: Figma Pixel-Perfect Audit

**Files:** All screen files

- [ ] **Step 1:** Open Figma side-by-side with the running app
- [ ] **Step 2:** Compare Splash screen — logo size, position, background
- [ ] **Step 3:** Compare Welcome screen — text sizes, illustration size, CTA button dimensions, spacing
- [ ] **Step 4:** Compare Login screen — heading size, input field height/border, OTP box sizes, button styling
- [ ] **Step 5:** Compare Home screen — header alignment, practice set card dimensions, question card layout (logo size, text truncation, number badge position), START button, tab bar icon sizes
- [ ] **Step 6:** Compare Bottom Sheet — snap height, padding, question text size, company logo, button widths, social proof text
- [ ] **Step 7:** Compare Session Result — avatar section, question card in header, tab indicator, bullet point styling, audio player bar dimensions, key moment timestamps
- [ ] **Step 8:** Compare Settings — avatar size, profile text sizes, menu item heights, divider lines
- [ ] **Step 9:** Fix ALL discrepancies found above

### Task 6.2: Performance Optimizations (Bonus)

**Files:** All component files

- [ ] **Step 1:** Wrap `QuestionCard` in `React.memo`
- [ ] **Step 2:** Wrap `KeyMomentItem` (if extracted) in `React.memo`
- [ ] **Step 3:** Add `useMemo` for derived data (e.g., filtered questions, formatted user counts)
- [ ] **Step 4:** Add `useCallback` for press handlers passed to list items

### Task 6.3: Animations (Bonus)

**Files:** Relevant screen files

- [ ] **Step 1:** Add screen transition animations using react-native-reanimated (shared transitions on question cards between Home and Session Result)
- [ ] **Step 2:** Add subtle fade-in animation on Splash screen logo
- [ ] **Step 3:** Add scale/opacity animation on button press (TouchableOpacity `activeOpacity` at minimum)
- [ ] **Step 4:** Ensure bottom sheet animation is smooth (already handled by @gorhom/bottom-sheet but verify)

### Task 6.4: Haptic Feedback (Bonus)

**Files:** Button component and key press handlers

- [ ] **Step 1:** Import `expo-haptics`
- [ ] **Step 2:** Add `Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)` on button presses
- [ ] **Step 3:** Add `Haptics.notificationAsync` on OTP verification success
- [ ] **Step 4:** Keep haptics subtle — not on every tap, only meaningful actions

### Task 6.5: Accessibility Labels (Bonus)

**Files:** All screen and component files

- [ ] **Step 1:** Add `accessibilityLabel` to all interactive elements (buttons, inputs, menu items)
- [ ] **Step 2:** Add `accessibilityRole` ("button", "link", "header", "image")
- [ ] **Step 3:** Add `accessibilityHint` for non-obvious actions (e.g., "Opens question details")
- [ ] **Step 4:** Verify with VoiceOver/TalkBack if possible

### Task 6.6: Code Quality Sweep

**Files:** All files

- [ ] **Step 1:** Run `yarn lint` and fix all warnings/errors
- [ ] **Step 2:** Search for `any` type usage: fix all instances
- [ ] **Step 3:** Search for hardcoded hex values: replace with theme tokens
- [ ] **Step 4:** Search for `../../` imports: replace with `@/` imports
- [ ] **Step 5:** Remove all dead code, console.logs, commented-out blocks
- [ ] **Step 6:** Ensure consistent file naming (all kebab-case)
- [ ] **Step 7:** Ensure all interfaces are in the correct `types.ts` files
- [ ] **Step 8:** Verify no business logic in screen components (extract to hooks if found)
- [ ] **Step 9:** Commit: `feat: polish — pixel-perfect fixes, performance, animations, accessibility`

---

## PHASE 7 — Submission Prep (NOTES.md, APK, Video)

**Time: 1.5 hours**

### Task 7.1: Write NOTES.md

**Files:**
- Create: `NOTES.md` (at repo root)

- [ ] **Step 1:** Section: "Assumptions" — list every assumption made about unclear Figma elements:
  - Any screen where the Figma was ambiguous
  - Font sizes/weights that weren't explicitly labeled
  - Navigation flows that weren't fully specified
  - Image assets that couldn't be extracted from Figma
- [ ] **Step 2:** Section: "Trade-offs & Decisions" — explain each design decision:
  - Why bottom sheet vs. full-screen modal for open state
  - Why local state vs. context for auth
  - Why specific navigation structure choices
  - Any time-constraint trade-offs
  - Why specific mock data choices
- [ ] **Step 3:** Section: "What I'd Improve With More Time" — be specific, not generic:
  - Specific screens or interactions that need more polish
  - Features like search, filtering, dark mode
  - Performance improvements beyond React.memo
  - Testing (unit tests for components, integration tests for navigation)
  - Specific animations that could be smoother
- [ ] **Step 4:** Keep it honest and specific — a good NOTES.md recovers lost points

### Task 7.2: Build APK via EAS

- [ ] **Step 1:** Run `npm install -g eas-cli` if not already installed
- [ ] **Step 2:** Run `eas login` (create free Expo account if needed)
- [ ] **Step 3:** Run `eas build --platform android --profile preview`
- [ ] **Step 4:** Wait for cloud build to complete (~10-15 min)
- [ ] **Step 5:** Copy the direct APK download URL from EAS output
- [ ] **Step 6:** Test the APK on a real device if possible

### Task 7.3: Record Loom Video

- [ ] **Step 1:** Open Loom (or similar screen recorder)
- [ ] **Step 2:** Record 1-3 minute walkthrough:
  - Start from app launch (splash)
  - Show Welcome → Login flow
  - Enter OTP and navigate to Home
  - Show question list scrolling
  - Tap a question, show bottom sheet
  - Navigate to Session Result, show both tabs
  - Navigate to Settings, show profile and menu
  - Log out back to Welcome
- [ ] **Step 3:** Upload/get shareable link

### Task 7.4: Final Commit & Push

- [ ] **Step 1:** Ensure all changes are committed
- [ ] **Step 2:** Push to public GitHub repository
- [ ] **Step 3:** Verify repo has: all source files, NOTES.md, no node_modules, no secrets
- [ ] **Step 4:** Compose email to `internships@grapevine.in`:
  - Subject: `RN Assignment — [Your Name]`
  - Body: GitHub repo link, Loom video link, APK download link
- [ ] **Step 5:** Send email before deadline

---

## FILE INVENTORY (Complete List)

### Files to CREATE:

| File | Purpose |
|---|---|
| `src/navigation/types.ts` | All navigation param types |
| `src/navigation/auth-navigator.tsx` | Auth stack (Splash → Welcome → Login) |
| `src/navigation/main-navigator.tsx` | Bottom tabs (Home, Settings, Store) |
| `src/navigation/root-navigator.tsx` | Root stack combining auth + main |
| `src/components/ui/button.tsx` | Reusable Button component |
| `src/components/ui/text.tsx` | Reusable Text component |
| `src/features/auth/types.ts` | Auth feature types |
| `src/features/auth/screens/splash-screen.tsx` | Splash screen |
| `src/features/auth/screens/welcome-screen.tsx` | Welcome screen |
| `src/features/auth/screens/login-screen.tsx` | Login screen (phone + OTP) |
| `src/features/home/types.ts` | Home feature types |
| `src/features/home/screens/home-screen.tsx` | Home screen (header + card + list) |
| `src/features/home/components/practice-set-card.tsx` | Practice set card |
| `src/features/home/components/question-card.tsx` | Question list item card |
| `src/features/home/components/question-bottom-sheet.tsx` | Bottom sheet for open state |
| `src/features/session-result/types.ts` | Session result types |
| `src/features/session-result/screens/session-result-screen.tsx` | Session result with tabs |
| `src/features/session-result/components/smart-summary-tab.tsx` | Smart Summary tab |
| `src/features/session-result/components/key-moments-tab.tsx` | Key Moments tab |
| `src/features/settings/types.ts` | Settings feature types |
| `src/features/settings/screens/settings-screen.tsx` | Settings screen |
| `NOTES.md` | Assignment notes |

### Files to MODIFY:

| File | Changes |
|---|---|
| `App.tsx` | Replace placeholder with NavigationContainer + providers |
| `src/mock-data/companies.json` | Populate with 6-8 companies |
| `src/mock-data/questions.json` | Populate with 8-12 questions |
| `src/mock-data/session-result.json` | Populate with realistic session data |
| `src/mock-data/user.json` | Populate with user profile data |

### Files DO NOT MODIFY:

| File | Reason |
|---|---|
| `src/theme/colors.ts` | Already provided |
| `src/theme/spacing.ts` | Already provided |
| `src/theme/typography.ts` | Already provided |
| `src/theme/index.ts` | Already provided |
| `app.json` | Expo config — don't touch |
| `tsconfig.json` | Already configured with `@/` alias |
| `babel.config.js` | Already configured with module-resolver + reanimated |
| `eas.json` | Already configured |
| `index.ts` | Entry point — don't touch |

---

## NON-NEGOTIABLE CHECKLIST (verify before submission)

- [ ] NO `FlatList` anywhere — all lists use `@shopify/flash-list`
- [ ] NO `Image` from react-native — all images use `expo-image` with `cachePolicy="memory-disk"`
- [ ] NO hardcoded hex colors — all colors from `colors.*`
- [ ] NO hardcoded spacing values — all spacing from `spacing.*`
- [ ] NO hardcoded font weights/sizes — all from `typography.*`
- [ ] NO `../../` imports across feature boundaries — all use `@/` alias
- [ ] NO `any` types anywhere
- [ ] ALL files in kebab-case
- [ ] ALL component props have TypeScript interfaces
- [ ] ALL navigation params defined in `navigation/types.ts`
- [ ] ALL data from mock JSON files — no API calls
- [ ] ALL screens navigate end-to-end (Splash → Welcome → Login → Home → SessionResult → Settings → Welcome)
- [ ] `NOTES.md` exists at repo root with assumptions, trade-offs, and improvements
- [ ] APK built and downloadable
- [ ] Loom video recorded and shareable
- [ ] No `node_modules` committed
- [ ] No dead code or commented-out blocks
