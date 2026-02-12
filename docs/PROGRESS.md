# Progress Log

## Status Key

- `DONE` completed and verified
- `IN_PROGRESS` actively being worked
- `PENDING` planned, not started
- `BLOCKED` waiting on dependency

## Current Initiative

Initiative: Intelligence-first repositioning ("Bloomberg for AI builders/investors")
Phase: Phase 1 (Reposition + IA foundation)

## Milestone Tracker

### M1: Strategy and Documentation

- `DONE` Vision document created
- `DONE` Product roadmap created
- `DONE` Technical architecture documented
- `DONE` Phase 1 implementation spec created
- `DONE` Integration/API catalog documented
- `DONE` Deployment doc created
- `DONE` Memory file refreshed for continuity

### M2: Web IA and Homepage Repositioning

- `DONE` Update global nav order and labels
- `DONE` Add route shells: `/intelligence`, `/watchlists`, `/briefs`
- `DONE` Rework homepage section hierarchy to intelligence-first
- `DONE` Add watchlist-focused CTA language

### M3: Backend Parity and Signal Layer (Phase 1)

- `DONE` Add `/api/tools` endpoint for mobile parity
- `DONE` Add signal normalization utility (event typing metadata)
- `DONE` Add basic analytics events for key CTAs
- `DONE` Add `/api/funding`, `/api/signals`, and `/api/digest/preview` endpoints for fresher intelligence pages
- `DONE` Add category filtering support to `/api/news`
- `DONE` Replace digest mock generation with live backend-driven digest service

### M5: Watchlists Phase 2 Backend

- `DONE` Add persistent watchlist models (`TrackedEntity`, `UserWatchlist`, `AlertPreference`) in Prisma schema
- `DONE` Add authenticated watchlist CRUD endpoint (`/api/watchlists`)
- `DONE` Add watchlist alert preference endpoint (`/api/watchlists/preferences`)
- `DONE` Add watchlist suggestion endpoint (`/api/watchlists/suggestions`)
- `DONE` Replace `/watchlists` placeholder with real interactive manager for follows/removals/preferences

### M6: Personalization Layer

- `DONE` Add signal service abstraction for reusable live signal generation
- `DONE` Add watchlist-based signal matching and filtering utilities
- `DONE` Enhance `/api/signals` with personalized and watchlist-only modes
- `DONE` Add `/api/briefs/personalized` endpoint for user-specific brief output
- `DONE` Add personalized mode support to `/api/digest/preview`
- `DONE` Wire `/briefs` page to auto-load personalized brief preview for signed-in users with generic digest fallback
- `DONE` Add signed-in/signed-out personalization state indicator on `/briefs` preview panel
- `DONE` Add personalized ranking in `/api/signals` using watchlists, user preferences, and read history with transparent score breakdown metadata
- `DONE` Add temporary admin debug endpoint to inspect personalized ranking payloads (`/api/admin/personalization/signals`) and retire it after calibration
- `DONE` Add Intelligence feed `Recommended` vs `Latest` toggle with personalized “why this signal” reason chips
- `DONE` Backfill read-history tracking coverage across core click surfaces (`news`, `models`, `research`, `funding`, and `intelligence` signals)
- `DONE` Unify preferences backend + UI flow via `/api/user/personalization` (content preferences + watchlist alert preferences in one save path)
- `DONE` Implement alert trigger pipeline with channel-aware dedupe, in-app alert persistence, and admin run/status endpoint
- `DONE` Add cron-compatible trigger endpoint (`/api/cron/alerts`) and `vercel.json` schedule for daily alert runs
- `DONE` Add in-app alerts UX (`/profile/alerts`) with unread count + mark-read controls
- `DONE` Add pipeline run telemetry persistence (`AlertPipelineRun`) and expose recent runs in admin status endpoint
- `DONE` Remove temporary admin personalization debug endpoint after operational handoff

### M4: QA and Release Readiness

- `IN_PROGRESS` Regression test core routes (`/`, `/learn`, `/news`, `/models`, `/companies`)
- `PENDING` Validate responsive layouts
- `IN_PROGRESS` Smoke-test API endpoints with fallbacks

### Latest Session Update (2026-02-11)

- `DONE` Intelligence-first navigation launched in `AppHeader` and footer information architecture
- `DONE` Homepage repositioned to signal-first UX with watchlist and brief CTAs
- `DONE` Route shells created: `/intelligence`, `/watchlists`, `/briefs`
- `DONE` New API endpoint created: `/api/tools` with category/query/limit support
- `DONE` Signal normalization utility added and wired to homepage and intelligence feed
- `DONE` Canonical metadata added for `/intelligence`, `/watchlists`, `/briefs`
- `DONE` Basic analytics event wiring added for watchlist, intelligence, briefs, and learn CTA clicks
- `DONE` Targeted lint validation passed for all modified files
- `DONE` Deployment access verified (GitHub auth, Vercel auth, project inspect, production alias check)
- `DONE` Phase 1.6 copy consistency sweep on key branded surfaces (logo tagline, footer/newsletter copy, About page, JSON-LD, Open Graph image text)

## Open Decisions

- Keep current domain brand (`A2Z AI`) while using intelligence-first copy
- Keep Learn in top nav or move to overflow after Phase 1 metrics
- Initial source-priority rules for signal feed ranking

## Next Actions (Execution Order)

1. Implement nav and homepage IA updates
2. Add new route shells
3. Add `/api/tools` endpoint
4. Add analytics events
5. Complete QA pass and polish copy consistency
