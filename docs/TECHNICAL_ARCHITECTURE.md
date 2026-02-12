# Technical Architecture

## System Overview

A2Z AI is a monorepo with:
- Web app in Next.js (App Router)
- Mobile app in Expo React Native
- Shared backend APIs exposed through Next.js route handlers
- PostgreSQL database via Prisma ORM

## Repository Layout

- `src/app/` - web pages and API routes
- `src/lib/` - server/client utilities, data adapters, integrations
- `prisma/` - schema and seeds
- `mobile/` - Expo app (tabs, screens, mobile libs)
- `public/` - static assets

## Web Architecture

- Framework: Next.js + React
- Routing: App Router (`src/app/**`)
- Auth: NextAuth for web sessions
- API: Next.js route handlers under `src/app/api/**`
- Data fetch: third-party APIs + DB via Prisma

## Mobile Architecture

- Framework: React Native + Expo + Expo Router
- Auth: native Google/Apple sign-in with mobile auth endpoint
- Data access: REST calls to `https://www.a2zai.ai/api/*`
- Local persistence: SecureStore and AsyncStorage
- Caching: TTL-based cache for feed-like endpoints

## Auth Model

- Web: cookie session via NextAuth
- Mobile: bearer token support
- Shared server helper resolves user from either session style for protected routes

## Data Layer

- Primary DB: PostgreSQL
- ORM: Prisma
- Current entities include users, content (glossary/explainers), engagement, newsletter, and learning progress
- Planned additions for intelligence model:
  - `TrackedEntity`
  - `UserWatchlist`
  - `SignalEvent`
  - `AlertPreference`

## External Integrations

- News API provider for AI news
- Hugging Face API for model metadata
- Polygon API for market data
- arXiv feed access for research
- Resend for email workflows

## Runtime and Deployment

- Web runtime: Vercel-hosted Next.js app
- Mobile build pipeline: Expo EAS
- Domain: `a2zai.ai` and `www.a2zai.ai`

## Reliability and Fallbacks

- Existing code supports mock fallback for external API failures
- Recommendation: centralize fallback and source health logging for intelligence reliability

## Phase 1 Architecture Notes

- Add structured signal mapping utility in `src/lib/`
- Add `/api/tools` route for parity with mobile client expectations
- Keep route compatibility and avoid breaking existing APIs
