# Home Open State - Question Detail Modal

## Summary

When a user taps any question card on the home screen, a centered modal popup appears showing the question details, company info, duration, and two action buttons (READY and Practice with headphones).

## Behavior

- **Trigger**: Tap on any question card (all states: done, upnext, not-done)
- **Dismissal**: Tap backdrop, or hardware back button
- **READY button**: Navigates to SessionResult screen with `{ questionId }` param
- **Practice button**: No action yet (placeholder for future)

## Visual Design (from Figma)

### Modal Card
- Background: #FFCE00 (yellow)
- Size: ~345px wide, ~220px tall
- Border radius: 12px
- Padding: 16px
- Positioned center of screen

### Diamond Decoration
- Small rotated square (#FFCE00) positioned above the card top edge
- Creates a "speech bubble" visual connection

### Question Text
- Font: Manrope Bold, 16px
- Color: #1C1C1E
- Max 2 lines

### Info Row (horizontal, space-between)
- **Left**: "Asked by [CompanyName]" (Manrope SemiBold, 14px, #48484A) + small company logo (22px circle)
- **Right**: Stopwatch icon + "2 mins" (Manrope SemiBold, 14px, #48484A)

### READY Button
- Background: #FFFFFF (white)
- Text: "READY" (Inter Bold, 15px, #00C35F, uppercase, letter-spacing 0.51px)
- Shadow: 0px 3px 0px rgba(0,0,0,0.2)
- Border radius: 12px
- Height: 41px

### Practice Button
- Background: #846A11 (dark gold)
- Text: headphones icon + "PRACTICE" (Inter Bold, 15px, white, uppercase)
- Shadow: 0px 3px 0px #42360F
- Border radius: 12px
- Height: 41px

### Backdrop
- Semi-transparent dark overlay behind the modal
- Tap to dismiss

## Architecture

### Approach: React Native `<Modal>`
Using the built-in Modal component because the design calls for a centered popup (not a bottom sheet). The `@gorhom/bottom-sheet` is already installed but better suited for future bottom sheet patterns.

### New Files
| File | Purpose |
|------|---------|
| `src/features/home/components/question-detail-modal.tsx` | The modal component with all visual elements |
| `src/features/session-result/screens/session-result-screen.tsx` | Placeholder SessionResult screen |
| `src/features/session-result/types.ts` | Session result types |

### Modified Files
| File | Change |
|------|--------|
| `src/features/home/screens/home-screen.tsx` | Add `selectedQuestion` state, render `QuestionDetailModal` |
| `src/features/home/types.ts` | Add `QuestionDetailModalProps` interface |
| `src/navigation/root-navigator.tsx` | Register `SessionResult` screen in root stack |
| `src/features/home/constants.ts` | Add modal-specific color tokens |

### Component Tree

```
QuestionDetailModal
├── Modal (React Native Modal, transparent, animationType="fade")
│   ├── Backdrop (Pressable, semi-transparent, dismisses)
│   ├── Card Container (centered)
│   │   ├── Diamond Decoration (rotated square)
│   │   ├── Card Body (yellow rounded)
│   │   │   ├── Question Text
│   │   │   ├── Info Row
│   │   │   │   ├── Company Info (name + logo)
│   │   │   │   └── Duration (icon + text)
│   │   │   ├── READY Button (Pressable)
│   │   │   └── Practice Button (Pressable)
```

### Data Flow

1. `HomeScreen` manages `selectedQuestion: Question | null` and `isModalVisible: boolean`
2. `QuestionCard.onPress` sets the selected question and opens the modal
3. `QuestionDetailModal` receives the question + callbacks
4. On READY: calls `onReady(questionId)` → navigates to `SessionResult`
5. On dismiss: calls `onClose()` → clears state

### Navigation

- Route: `SessionResult` in `RootStackParamList` with `{ questionId: string }`
- The SessionResult screen will be a placeholder for now

### Theme Tokens Used

Modal-specific colors will be added to `homeColors` in `constants.ts`:
- `modalBackground`: #FFCE00
- `modalButtonDarkBg`: #846A11
- `modalButtonDarkShadow`: #42360F
- `modalReadyText`: #00C35F
- `modalSubtitleText`: #48484A
- `modalQuestionText`: #1C1C1E

Existing theme tokens used:
- `colors.textPrimary` for question text
- `spacing.m` (16px) for card padding
- `typography.fonts.inter.bold` for button labels
