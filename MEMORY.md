# A2Z AI Memory

This file is the continuity source for future sessions. Update it at the end of each significant work session.

Last updated: 2026-02-11

## Snapshot

- Product direction has shifted from education-first to intelligence-first.
- Positioning: "Bloomberg for AI builders/investors."
- AI Education is retained as a secondary pillar, not removed.
- Phase 1 focus is web repositioning and IA changes before iOS launch completion.

## Canonical Docs

- Vision: `docs/VISION.md`
- Roadmap: `docs/PRODUCT_ROADMAP.md`
- Phase 1 spec: `docs/PHASE_1_IMPLEMENTATION_SPEC.md`
- Architecture: `docs/TECHNICAL_ARCHITECTURE.md`
- Progress log: `docs/PROGRESS.md`
- Integrations and APIs: `docs/INTEGRATIONS_AND_APIS.md`
- Deployment: `docs/DEPLOYMENT.md`
- Decisions: `docs/DECISIONS.md`

## Current Product State

- Web app is live on `a2zai.ai` / `www.a2zai.ai`.
- Mobile app exists in `mobile/` with auth, feed, quiz, learn, and profile flows.
- Mobile has iOS release work in progress (auth credentials and release hardening remain).
- Known parity gap: mobile expects `/api/tools`; route needs implementation.

## Strategic Decisions (Active)

1. Reposition homepage and navigation to intelligence-first.
2. Preserve existing learn routes and content.
3. Sequence:
   - Phase 1: web IA/look-and-feel repositioning
   - Phase 2: watchlists + alerts MVP
   - Phase 3: iOS launch completion aligned to new IA
   - Phase 4: monetization and premium briefing

## Immediate Next Actions

1. Implement Phase 1 homepage and nav changes.
2. Add route shells: `/intelligence`, `/watchlists`, `/briefs`.
3. Add `/api/tools` route for web/mobile parity.
4. Add initial analytics events for watchlist and intelligence CTAs.
5. Run regression QA and update progress log.

## Mobile and iOS Notes (Carry Forward)

- Bundle ID: `ai.a2z.app`
- App Store Connect app exists.
- Apple Sign In and Google Sign-In are integrated but need final production credential verification.
- Simulator notification registration issues are non-blocking for real device behavior.

## Security and Secrets Reminder

- Never commit real keys in docs or code.
- Keep key values only in environment configuration.
- Use integration docs for variable names and official references only.

## Session Log

- 2026-01-26: Mobile resumed and stabilized on simulator; API mapping and notification guards added.
- 2026-01-27: Mobile auth architecture implemented; App Store Connect setup advanced.
- 2026-02-11: Product direction reset to intelligence-first. Documentation system established and Phase 1 implementation spec formalized.
- 2026-02-11 (Phase 1 implementation): Added intelligence-first IA to homepage and global nav, introduced route shells (`/intelligence`, `/watchlists`, `/briefs`), added `/api/tools` for mobile/web parity, wired key analytics CTA events, and updated progress tracking docs.
- 2026-02-11 (Phase 1.5): Added `src/lib/signal-normalizer.ts` and integrated structured signals into home/intelligence feeds, added canonical metadata for new intelligence routes, and verified deployment access using Vercel/GitHub CLI (`vercel whoami`, `vercel project inspect aionai`, deployment alias inspection including `a2zai.ai` and `www.a2zai.ai`).
- 2026-02-11 (Phase 1.6): Performed brand/copy consistency sweep across high-visibility web surfaces to align messaging with intelligence-first positioning (updated `Logo`, `Footer`, `NewsletterSignup`, `About`, `JsonLd`, and `opengraph-image` copy).
- 2026-02-11 (Backend freshness pass): Added backend routes for `funding`, `signals`, and digest preview (`/api/funding`, `/api/signals`, `/api/digest/preview`), upgraded `/api/news` with category filtering, wired `digest` page to live backend digest generation (removed random mock digests), and wired `funding` page to fetch backend data.
- 2026-02-11 (Phase 2 watchlists): Added persistent watchlist backend with Prisma models (`TrackedEntity`, `UserWatchlist`, `AlertPreference`), implemented `/api/watchlists` CRUD, `/api/watchlists/preferences`, `/api/watchlists/suggestions`, and replaced watchlists placeholder UI with interactive follow/remove + alert preference management.
- 2026-02-11 (Phase 2 personalization): Added reusable live signal service and watchlist matching utilities, extended `/api/signals` with `personalized` and `watchlistOnly` support, added `/api/briefs/personalized`, and enabled personalized mode in `/api/digest/preview`.
- 2026-02-11 (Briefs UI personalization): Updated `/briefs` to fetch personalized brief preview for authenticated users and automatically fall back to generic digest preview for signed-out users or no-match states.
- 2026-02-11 (Briefs personalization UX): Added signed-in/signed-out indicator and contextual guidance on `/briefs` preview panel, including prompts to sign in or add watchlist entities when personalization is unavailable.
- 2026-02-11 (Signal ranking personalization): Implemented `/api/signals` ranking for authenticated users based on watchlist matches, topic preferences, and recent read behavior, and exposed per-signal `personalizationScore` breakdown metadata for explainability.
- 2026-02-11 (Admin personalization debug): Added temporary protected endpoint `/api/admin/personalization/signals` (guarded by `CRON_SECRET`) to inspect ranked signal outputs and scoring behavior for a selected user.
- 2026-02-11 (Intelligence UI personalization): Reworked `/intelligence` feed list into a client-side panel with `Recommended` vs `Latest` toggle and user-facing “why this signal” chips sourced from personalized ranking reasons.
- 2026-02-11 (Read-history coverage pass): Added reusable read-tracked external link handling and wired read tracking into high-traffic pages (`/news`, category news, `/models`, `/research`, `/funding`, and intelligence feed cards), including backend support for `funding` read type.
- 2026-02-11 (Unified personalization settings): Added `/api/user/personalization` to merge `UserPreferences` and `AlertPreference` reads/writes and updated profile preferences UI to save both content and alert controls in a single operation.
- 2026-02-11 (Alert pipeline): Added persistent alert models (`InAppAlert`, `AlertDeliveryLog`), implemented `runPersonalizedAlertPipeline` with score-threshold matching + per-channel dedupe + email delivery controls, and added admin run/status route (`/api/admin/alerts/run`) plus user in-app alert API (`/api/user/alerts`).
- 2026-02-11 (Alert ops rollout): Added Vercel cron trigger endpoint (`/api/cron/alerts`) and schedule config, added in-app alerts UI at `/profile/alerts` with unread/mark-read support, added `AlertPipelineRun` telemetry logging, ran threshold calibration (currently `0` considered users due no watchlisted users in production), and removed temporary `/api/admin/personalization/signals` debug route after handoff.
- 2026-02-12 (Auth UX hardening + QA pass): Fixed NextAuth sign-in loop by restoring proper sign-in flow, added dedicated `/signin` page with explicit OAuth error messaging and callback handling, switched all product sign-in links/redirects from `/api/auth/signin` to `/signin`, and added missing `public/grid.svg` to clear production static-asset 404s during route smoke testing.
- 2026-02-12 (Data freshness hardening): Updated model ingestion to use live HuggingFace trending (no-store, broader feed) with explicit fallback source metadata in `/api/models` and UI warning when fallback is used; added live NewsData-filtered funding headlines and funding freshness metadata to `/api/funding` + `/funding`; added `no-store` headers for `/funding` and `/intelligence` to reduce stale page caching.
- 2026-02-12 (Live funding radar): Added `funding-live-service` to derive current funding deal signals from live news (with company/amount/round extraction and confidence scoring), wired `liveSignals` into `/api/funding`, and surfaced a "Live Deal Signals" panel on `/funding` to provide current activity even when curated rounds are older.
- 2026-02-12 (Provider bridge - TheNewsAPI): Added provider-aware funding bridge for `FUNDING_PROVIDER=thenewsapi` using `THE_NEWS_API_TOKEN`, integrated TheNewsAPI fetch client with automatic fallback to existing live-news ingestion, and surfaced provider readiness messaging in the funding API/page to support low-cost interim live coverage while enterprise provider contracts are pending.
- 2026-02-12 (Funding persistence layer): Added Prisma models for funding snapshot cache + run telemetry (`FundingSignalSnapshot`, `FundingSnapshotRun`), implemented snapshot ingest/read services, wired `/api/funding` to serve cached live funding signals/headlines with on-demand ingest fallback, added protected admin ingest/status route (`/api/admin/funding/ingest`), and scheduled 6-hour Vercel cron ingest via `/api/cron/funding/ingest`.
- 2026-02-12 (Funding ingest tuning): Broadened funding keyword/query coverage, reduced signal confidence threshold, and added resilient baseline candidate fallback so funding snapshot ingests produce non-zero records more reliably even when upstream funding-specific matches are sparse.
