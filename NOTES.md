# NOTES.md — Ready! Assignment

## Trade-offs & Decisions

### Custom Bottom Nav over React Navigation Bottom Tabs
I chose to build a floating bottom navigation bar as a custom component inside `HomeScreen` rather than using `@react-navigation/bottom-tabs`. The Figma design shows a non-standard floating pill-shaped nav with a separate elevated Store circle — this would have required heavy customization of the tab navigator anyway. The custom approach gave me full control over positioning, shadows, and the split-pill + circle layout.

### Dual-Layer 3D Shadow Technique
Instead of using React Native's `shadow*` props (which behave differently on iOS vs Android), I used a consistent dual-layer approach: a solid-colored "shadow" view positioned a few pixels below the actual surface. This gives a uniform, physical/elevated look across both platforms and matches the Figma's flat-design shadow aesthetic.

### Custom Modal Instead of `@gorhom/bottom-sheet`
The question detail is implemented as a React Native `Modal` that positions itself near the tapped card's Y coordinate. I went with this over `@gorhom/bottom-sheet` because the Figma shows a card that appears anchored to the specific question card (with a diamond pointer arrow), not a standard bottom sheet that slides up from the bottom. The modal also flips upward if the tapped card is in the lower portion of the screen.

### Stair Pattern for Question Cards
The question list uses a repeating padding pattern `[40, 80, 120, 160, 120, 80]` that creates a visual staircase effect. This matches the Figma layout where cards aren't all left-aligned but follow a wave-like indentation.

### Local Asset Map for Company Logos
Company logos are loaded via a `require()` map in a constants file rather than using the remote URLs from `companies.json`. This ensures logos load instantly without network dependency and display correctly during development and demos.

### Color Constants per Feature
Some features define local color constants (e.g., `homeColors`, `feedbackColors`) in separate constants files rather than adding every shade to the global theme. This was a pragmatic choice — the Figma uses many context-specific colors that would clutter the shared theme. The global theme tokens (`colors`, `spacing`, `typography`) are still used where applicable.

### ScrollView in Session Result & Settings
These screens use `ScrollView` instead of `FlashList` because their content is not a repeating list of uniform items — they contain mixed layouts (headers, tabs, cards, action rows). `FlashList` is reserved for the Home screen's question list where it provides actual recycling benefits.

---

## What I Would Improve With More Time

- **Smooth screen transitions** using `react-native-reanimated` shared transitions between the question card and the detail modal
- **Skeleton/shimmer loading states** on the Home screen while mock data "loads"
- **Haptic feedback** on button presses using `expo-haptics` (already installed)
- **Accessibility labels** on all interactive elements
- **OTP auto-read** from SMS on Android for a more realistic login feel
- **Animated bottom sheet** with gesture-based dismiss for the question detail
- **Persistent login state** using `AsyncStorage` so the user stays logged in across app restarts
- **Tab navigator integration** for a proper Store and Progress tab with their own screens
- **Audio player** with basic play/pause/seek UI in the Key Moments tab
- **Pull-to-refresh** on the Home screen question list
- **`estimatedItemSize`** on the FlashList for optimal recycling performance

---

## Assumptions About the Figma Design

1. **Question detail position**: The Figma shows the detail card near a question card — I assumed it should appear anchored to the tapped card's position rather than as a fixed bottom sheet.

2. **Bottom nav layout**: The Figma shows a floating nav with Home, Settings in a pill and Store as a separate circle. I replicated this exactly rather than using a standard tab bar.

3. **Card states**: The Figma shows three distinct card styles (green done, amber up-next with START badge, gray not-done). I inferred the state logic based on question number — the first incomplete question gets the "up-next" state.

4. **Promo banner placement**: I placed it after every 3rd question in the list, as the Figma shows it interleaved between cards.

5. **Login OTP length**: The Figma shows a multi-digit OTP input. I implemented it as 6 individual boxes with auto-advance, matching the visual pattern.

6. **Settings screen content**: The Figma includes a trial card, profile section, and action menu. Some data like streak/calendar info from the mock JSON wasn't explicitly shown in the Figma frames I referenced, so I focused on what was visible.

7. **Session result avatars**: The two avatar circles in the green header are shown as overlapping — I implemented them with a negative margin overlap matching the Figma layout.
