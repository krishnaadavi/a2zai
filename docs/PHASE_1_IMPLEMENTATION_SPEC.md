# Phase 1 Implementation Spec

## Scope

Phase 1 focuses on product repositioning and IA changes on web without removing existing education capabilities.

## Objectives

- Make the homepage and navigation communicate "AI intelligence platform" in under 5 seconds.
- Shift top-level behavior toward tracking entities and signals.
- Keep Learn content accessible but no longer primary on landing surfaces.

## Non-Goals

- No paywall implementation in Phase 1.
- No full alerts engine backend in Phase 1.
- No mobile full redesign in Phase 1 (mobile alignment starts in Phase 3).

## Information Architecture Changes

### Primary Nav (Target)

1. Intelligence
2. Companies
3. Funding
4. Models
5. Watchlists (new)
6. Briefs (new)
7. Learn (secondary)

### Route Strategy

- Keep existing routes for continuity and SEO.
- Add new routes:
  - `/intelligence` (new intelligence home/feed shell)
  - `/watchlists` (MVP shell, auth-aware)
  - `/briefs` (daily/weekly brief shell)
- Keep `/learn` intact, but reduce homepage prominence.

## Homepage Redesign (Target Sections)

1. Hero
   - Message: track AI companies/startups/funding/model releases.
   - Primary CTA: "Build your watchlist."
   - Secondary CTA: "View intelligence feed."
2. Signal Feed (replace generic top news prominence)
   - Curated high-impact events with categories:
     - Funding
     - Model Release
     - Product Launch
     - Partnership / M&A
3. Watchlist Preview (auth-aware)
   - Signed out: product explainer and CTA.
   - Signed in: latest updates for followed entities (empty state if none).
4. Funding Radar
   - Most recent notable rounds with filters by stage and category.
5. Model Release Tracker
   - Recent model updates and capability notes.
6. Research and Learn (compressed)
   - Keep as supportive discovery section.

## Data and Backend Changes (Phase 1 Minimal)

- Add `/api/tools` route to align with mobile expectations.
- Add lightweight signal normalization layer (server utility) that maps current feeds into structured types:
  - `eventType`, `entityType`, `entityName`, `eventDate`, `source`, `confidence`.
- Keep fallback behavior when third-party APIs fail.

## UX and Copy Direction

- Replace "news digest" framing with "intelligence brief."
- Use decision-support copy: "what changed" and "why it matters."
- Maintain simple, scannable cards and compact metadata.

## Analytics and Instrumentation

Track at minimum:
- `hero_watchlist_cta_clicked`
- `intelligence_item_opened`
- `entity_follow_clicked` (stub until Phase 2 backend complete)
- `brief_subscribe_clicked`
- `learn_section_opened_from_home`

## SEO and Migration Considerations

- Preserve existing URLs and metadata where possible.
- Add canonical tags for new intelligence pages.
- Keep `/learn` SEO strength intact; no route deletions in Phase 1.

## Delivery Plan

### Week 1

- IA and copy updates
- Homepage section restructure
- New route shells (`/intelligence`, `/watchlists`, `/briefs`)
- `/api/tools` endpoint addition

### Week 2

- Signal normalization utility
- UI polish and instrumentation
- QA for responsive behavior and regressions

## Acceptance Criteria

- New users can identify intelligence-first value proposition immediately.
- Homepage visibly prioritizes signals and tracking over education.
- Learn pages remain functional and reachable.
- `/api/tools` returns data for mobile/web parity.
- No regression on existing core routes.

## Dependencies

- Existing data providers: NewsData, Hugging Face, Polygon, arXiv.
- Existing auth and profile infrastructure.
- Existing analytics setup.

## Risks and Mitigations

- Risk: Existing users feel sudden context shift.
  - Mitigation: Keep Learn discoverable and brand message consistent.
- Risk: Signal quality appears noisy.
  - Mitigation: Start with strict source prioritization and concise labeling.
- Risk: Scope creep into Phase 2 features.
  - Mitigation: Enforce non-goals and ship route shells first.
