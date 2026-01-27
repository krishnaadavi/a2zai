# A2Z AI - Development Memory

> Auto-updated checkpoint file for session continuity.
> Last updated: 2026-01-26 (Session 1)

## Project Overview

**A2Z AI** - Educational platform for learning AI fundamentals.
- **Web:** Next.js 16.1.5 + React 19 + Prisma + TailwindCSS (deployed on Vercel)
- **Mobile:** React Native 0.81.5 + Expo 54 + Expo Router 6 (iOS focus)
- **Bundle ID:** `ai.a2z.app`
- **Domain:** www.a2zai.ai (note: a2zai.ai 307-redirects to www)

## Current State (Checkpoint)

### Mobile App Status: RUNNING ON SIMULATOR, NOT COMMITTED
- The `mobile/` directory is **untracked** in git (never committed)
- iOS built and running on iPhone 16e simulator (iOS 26.2)
- Built with xcodebuild + ad-hoc signing (`CODE_SIGN_IDENTITY=-`)
- `.gitignore` in `mobile/` excludes `/ios` and `/android` (generated)

### Bugs Fixed This Session
1. **API base URL** (`lib/api.ts`): Changed `a2zai.ai` -> `www.a2zai.ai` (was getting 307 redirect, fetch wasn't following)
2. **News data mapping** (`lib/api.ts`): API returns `{ success, data, count }` with `url`/`publishedAt` fields. Added mapping to mobile's `{ articles }` with `link`/`pubDate` fields.
3. **Glossary data mapping** (`lib/api.ts`): API returns `shortDef`/`slug`, mobile expects `definition`/`id`. Added mapping layer.
4. **Models data mapping** (`lib/api.ts`): API returns `provider`/`type`, mobile expects `author`/`pipeline_tag`. Added mapping layer.
5. **Notifications crash on simulator** (`lib/notifications.ts`): `setNotificationHandler` guarded with `Device.isDevice`. `scheduleDailyTeaser` skips on simulator.
6. **Notification listener crash** (`app/_layout.tsx`): `addNotificationResponseListener` guarded with `Device.isDevice` check.

### Known Issue (Non-blocking)
- `getRegistrationInfoAsync` error from expo-notifications native module on simulator. This is a simulator-only issue (no real APNS connection). Doesn't affect functionality. Will not appear on real devices.

### What Exists in Mobile
**4 Tab Screens:**
1. **Home** (`app/(tabs)/index.tsx`) - Streak tracker, Daily AI Teaser, Quick Quiz/Flashcard buttons, News feed (WORKING)
2. **Learn** (`app/(tabs)/learn.tsx`) - Flashcards with flip animation, progress stats, quiz CTA, topic chips
3. **Explore** (`app/(tabs)/explore.tsx`) - 3-tab switcher (Tools/Models/Companies), HuggingFace integration
4. **Profile** (`app/(tabs)/profile.tsx`) - User stats, streak display, quiz scores, web resource links

**Modal Screens:**
- Quiz (`app/quiz/[id].tsx`) - 5-question quiz with haptic feedback, score tracking
- Article (`app/article/[id].tsx`) - Article viewer
- Term (`app/term/[slug].tsx`) - Glossary term detail

**Lib Modules:**
- `lib/api.ts` - API client (base: www.a2zai.ai), with response mapping for all endpoints
- `lib/cache.ts` - TTL-based caching (5min news, 1hr models, 24hr glossary)
- `lib/analytics.ts` - Event tracking
- `lib/notifications.ts` - Push notifications (daily 9AM teaser, simulator-safe)
- `lib/storage.ts` - AsyncStorage for progress/bookmarks/streaks
- `lib/types.ts` - TypeScript interfaces
- `lib/theme.ts` - Dark theme colors (purple/cyan/green palette)

### Root Changes (Uncommitted)
- `package.json`: Added `expo` dep, bumped `next` to 16.1.5
- `tsconfig.json`: Added `extends: "expo/tsconfig.base"`, formatting changes
- `package-lock.json`: Large lockfile update from expo install

### What Needs Doing
- [ ] First git commit of mobile/ directory
- [ ] Test Learn, Explore, Profile tabs on simulator (Home tab verified working)
- [ ] Test Quiz modal screen
- [ ] EAS build config incomplete (missing Apple team ID, app store IDs in eas.json)
- [ ] Authentication not wired up in mobile (Google sign-in -> web redirect)
- [ ] App Store submission prep
- [ ] Consider adding expo-dev-client for better DX

## Key Commands
```bash
# Start Metro bundler
cd mobile && npx expo start

# Build for simulator (workaround for expo run:ios code signing issue)
cd mobile/ios && xcodebuild -workspace A2ZAI.xcworkspace -scheme A2ZAI \
  -sdk iphonesimulator -configuration Debug \
  -destination 'platform=iOS Simulator,id=13D21611-560A-4D0F-96D5-338373DCEA3B' \
  CODE_SIGN_IDENTITY=- build

# Install on simulator
xcrun simctl install 13D21611-560A-4D0F-96D5-338373DCEA3B \
  ~/Library/Developer/Xcode/DerivedData/A2ZAI-dwsvowtahapnkccvmynxzjcfngex/Build/Products/Debug-iphonesimulator/A2ZAI.app

# Launch on simulator
xcrun simctl launch 13D21611-560A-4D0F-96D5-338373DCEA3B ai.a2z.app

# Prebuild iOS (regenerate native project)
cd mobile && npx expo prebuild --platform ios --clean

# EAS build
cd mobile && eas build --platform ios --profile development
```

## Architecture Notes
- Mobile consumes REST API from the web app (no direct DB access)
- API response format: `{ success: true, data: [...], count: N }` - all endpoints
- React Native New Architecture enabled
- Deep linking configured for a2zai.ai/learn and a2zai.ai/news
- Dark mode only (userInterfaceStyle: "dark")
- Streak tracking uses date-based logic in AsyncStorage
- `expo run:ios` broken (requires code signing certs not available). Use xcodebuild directly.

## Simulator Info
- **Device:** iPhone 16e (13D21611-560A-4D0F-96D5-338373DCEA3B)
- **iOS:** 26.2
- **DerivedData:** ~/Library/Developer/Xcode/DerivedData/A2ZAI-dwsvowtahapnkccvmynxzjcfngex/

## Session Log
- **2026-01-26 Session 1:** Resumed iOS development. Explored full project state. Built and ran on simulator. Fixed API base URL (307 redirect), news/glossary/models data mapping, notification crashes on simulator. Home screen verified working with live news feed. Created MEMORY.md.
