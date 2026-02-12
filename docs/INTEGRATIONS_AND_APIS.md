# Integrations and APIs

## Policy

- Do not store real API keys in git-tracked files.
- Keep secrets in environment variables only.
- Keep this document for integration purpose, setup notes, and official docs links.

## Core Integrations

### News Provider (NewsData)

- Purpose: AI news feed ingestion
- Env var: `NEWSDATA_API_KEY`
- Docs: https://newsdata.io/documentation

### Model Metadata (Hugging Face)

- Purpose: model listings and metadata
- Env var: `HUGGINGFACE_API_KEY`
- Docs: https://huggingface.co/docs/api-inference/index

### Market Data (Polygon)

- Purpose: stock and market metrics for AI companies
- Env var: `POLYGON_API_KEY`
- Docs: https://polygon.io/docs

### Research Source (arXiv)

- Purpose: latest research papers feed
- Env var: none required currently
- Docs: https://arxiv.org/help/api

### Email Delivery (Resend)

- Purpose: newsletters and transactional digest emails
- Env var: `RESEND_API_KEY`
- Docs: https://resend.com/docs

### Web Auth (Google OAuth via NextAuth)

- Purpose: web sign-in
- Env vars: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
- Docs:
  - https://next-auth.js.org/providers/google
  - https://next-auth.js.org/configuration/options

### Mobile Auth (Google + Apple)

- Purpose: native mobile sign-in support
- Env vars: `GOOGLE_IOS_CLIENT_ID`, `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`
- Docs:
  - https://docs.expo.dev/guides/authentication/
  - https://docs.expo.dev/versions/latest/sdk/apple-authentication/

## Internal API Surface (Current)

- `/api/news`
- `/api/models`
- `/api/research`
- `/api/funding`
- `/api/signals`
- `/api/digest/preview`
- `/api/briefs/personalized`
- `/api/watchlists`
- `/api/watchlists/preferences`
- `/api/watchlists/suggestions`
- `/api/admin/alerts/run` (protected by `CRON_SECRET`; triggers/statuses alert pipeline)
- `/api/cron/alerts` (Vercel cron trigger; protected by `CRON_SECRET`)
- `/api/glossary`
- `/api/search`
- `/api/feed`
- `/api/comments`
- `/api/user/alerts`
- `/api/user/personalization`
- `/api/user/*`
- `/api/newsletter/*`
- `/api/auth/[...nextauth]`
- `/api/auth/mobile`

Planned Phase 1 addition:
- `/api/tools` (for web/mobile parity)

## Environment Variable Checklist

Required for baseline local run:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

Required for full production parity:
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_IOS_CLIENT_ID`
- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`
- `NEWSDATA_API_KEY`
- `HUGGINGFACE_API_KEY`
- `POLYGON_API_KEY`
- `RESEND_API_KEY`
- `CRON_SECRET`

Optional for live funding provider integration:
- `FUNDING_PROVIDER` (`dealroom` or `crunchbase`)
- `DEALROOM_API_KEY` (when `FUNDING_PROVIDER=dealroom`)
- `CRUNCHBASE_API_KEY` (when `FUNDING_PROVIDER=crunchbase`)

## Security Notes

- Never commit `.env` files.
- Rotate leaked keys immediately.
- If needed, maintain a separate non-git secure runbook for key ownership and rotation schedule.
