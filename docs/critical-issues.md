# Critical Issues — Ready! App Architecture Review

> Status tracked per item. Fix before moving to Phase 3+.

---

## 1. ~~17 Hardcoded Hex Colors — violates CLAUDE.md rule #1~~ DONE

**Status:** Fixed — all 17 instances replaced with theme tokens.

| # | File | `#hex` | Replaced with |
|---|------|--------|--------------|
| 1-3 | `login.styles.ts` | `#1C1C1E` x3 | `colors.textPrimary` |
| 4-5 | `login.styles.ts` | `#48484A` x2 | `colors.textSecondary` |
| 6-8 | `login.styles.ts` | `#EFEFF4` x3 | `colors.border` |
| 9 | `login.styles.ts` | `#2C2C2E` | `colors.textPrimary` |
| 10 | `login.styles.ts` | `#FF3900` | `colors.primaryDark` |
| 11 | `splash.styles.ts` | `#1C1C1E` | `colors.textPrimary` |
| 12 | `welcome.styles.ts` | `#1C1C1E` | `colors.textPrimary` |
| 13 | `welcome.styles.ts` | `#E3F3F0` | `colors.successLight` |
| 14 | `welcome.styles.ts` | `#FF3900` | `colors.primaryDark` |
| 15 | `welcome.styles.ts` | `#6C6C70` | `colors.textSecondary` |
| 16 | `login-screen.tsx` | `#1C1C1E` | `colors.textPrimary` |
| 17 | `phone-input.tsx` | `#1C1C1E` | `colors.textPrimary` |

---

## 2. ~~16 Redundant `fontWeight` Declarations — violates CLAUDE.md~~ DONE

**Status:** Fixed — all 16 `fontWeight` properties removed. `fontFamily` via `typography.fonts.inter.*` already encodes the weight.

| # | File | Pattern Removed | Occurrences |
|---|------|-----------------|-------------|
| 1-10 | `login.styles.ts` | `fontWeight: "400"/"500"/"600"` | 10 |
| 11-12 | `splash.styles.ts` | `fontWeight: "800"` | 2 |
| 13-16 | `welcome.styles.ts` | `fontWeight: "400"/"500"/"800"` | 4 |

---

## 3. ~~DRY Violation: Logo Component Duplicated~~ DONE

**Status:** Fixed — extracted shared `ReadyLogo` component.

- Created `src/components/ui/ready-logo.tsx` with `size: "large" | "medium"` variant prop
- Updated `splash-screen.tsx` to use `<ReadyLogo size="large" />`
- Updated `welcome-screen.tsx` to use `<ReadyLogo size="medium" />`
- Removed duplicated logo styles from `splash.styles.ts` and `welcome.styles.ts`

---

## 4. ~~DRY Violation: CTA Button Repeated 3x~~ DONE

**Status:** Fixed — extracted shared `Button` component.

- Created `src/components/ui/button.tsx` with `title`, `onPress`, `disabled`, `iconName`, `borderRadius`, `fontSize` props
- Updated `phone-step.tsx` to use `<Button title="Get OTP" onPress={onSubmit} />`
- Updated `otp-step.tsx` to use `<Button title="Verify" onPress={onVerify} disabled={!isOtpComplete} />`
- Updated `welcome-screen.tsx` to use `<Button title="Get Started" iconName="checkmark-circle" borderRadius={spacing.m} fontSize={typography.sizes.l} />`
- Removed dead CTA button styles from `login.styles.ts` and `welcome.styles.ts`

---

## 5. ~~`src/components/ui/` Directory Missing~~ DONE

**Status:** Fixed — directory created with shared components.

- `src/components/ui/button.tsx` — shared CTA button
- `src/components/ui/ready-logo.tsx` — shared logo with size variants
- `text.tsx` still pending (lower priority)

---

## Moderate Issues

### 6. Hardcoded Font Sizes (magic numbers)

**Status:** Pending

| File | Value | Should use |
|------|-------|------------|
| `splash.styles.ts` | `fontSize: 47` | No token — needs addition or closest `typography.sizes.display` (36) |
| `splash.styles.ts` | `fontSize: 31` | No token — closest `typography.sizes.xxxl` (30) |
| `welcome.styles.ts` | `fontSize: 36` | `typography.sizes.display` |
| `welcome.styles.ts` | `fontSize: 24` | `typography.sizes.xxl` |
| `login.styles.ts` | `fontSize: 14` | `typography.sizes.s` (13) is close but not 14 |
| `main-navigator.tsx` | `fontSize: 18` | No token exists |

---

### 7. Hardcoded Dimension Values

**Status:** Pending

- `login.styles.ts`: `height: 36`, `width: 48`, `height: 56`, `bottom: 68`
- `welcome.styles.ts`: `marginTop: 78`, `paddingBottom: 50`, `width/height: 320`
- `splash.styles.ts`: `borderRadius: 9`, `lineHeight: 40`
- `main-navigator.tsx`: `height: spacing.xxxl + spacing.s` (mixing tokens with arithmetic)

Should use spacing tokens or new semantic tokens.

---

### 8. `useLogin` Hook Has Stale Closure Risk

**Status:** Pending

`handleOtpChange` and `handleOtpKeyPress` use `useCallback([otp])` — they recreate on every digit change. Use `setOtp` with functional updates:

```ts
setOtp(prev => { const next = [...prev]; next[index] = value; return next; });
```

---

### 9. `src/assets/index.ts` Cross-Boundary Import

**Status:** Pending

```ts
export const welcomeAvatar = require("../../assets/...");
```

Uses `../../` to leave `src/`, violating the import rule. Move image to `src/assets/` or use a direct `@/` require path.

---

### 10. `root-navigator.tsx` Missing SessionResult Route

**Status:** Pending

`RootStackParamList` declares `SessionResult: { questionId: string }` but the navigator only registers `Auth` and `Main`. Will cause runtime error if navigating to SessionResult.

---

### 11. `styles/` Subdirectory Not in Spec

**Status:** Pending

CLAUDE.md folder structure does not show a `styles/` directory within features. Deviates from the spec.

---

### 12. `PlaceholderScreen` Inline Props Type

**Status:** Pending

`main-navigator.tsx` has `{ title }: { title: string }` — should be a named interface per rules.

---

### 13. Semantic Token Misuse

**Status:** Pending

`main-navigator.tsx` uses `fontSize: spacing.xs` (8) for tab label font size. Spacing tokens are for spacing, not font sizes.

---

### 14. `login.styles.ts` Used by 4 Different Components

**Status:** Pending

`phone-input.tsx`, `otp-input.tsx`, `phone-step.tsx`, and `otp-step.tsx` all import `loginStyles`. Shared dependency makes independent styling harder.

---

### 15. Missing Welcome Screen Tagline

**Status:** Pending

Plan specifies "Practice Top Interview Questions with AI" as a tagline. Absent from welcome screen.

---

### 16. OTP Length Discrepancy

**Status:** Pending

`use-login.ts` uses `OTP_LENGTH = 6` but the plan specifies 4 digits. Verify against Figma.
