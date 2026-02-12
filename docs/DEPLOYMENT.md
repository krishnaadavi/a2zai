# Deployment Guide

## Environments

- Local: developer machines
- Staging (recommended): preview branches / pre-release validation
- Production: live domain (`a2zai.ai`, `www.a2zai.ai`)

## Web Deployment (Next.js)

Platform:
- Vercel (recommended and currently used)

Checklist:
1. Configure project root and build command (`npm run build`)
2. Set environment variables in Vercel project settings
3. Validate preview deployment for every PR
4. Promote to production after smoke tests

Smoke tests after deploy:
- Home page loads
- Auth flow works
- Core pages respond: `/news`, `/models`, `/companies`, `/learn`
- API endpoints respond: `/api/news`, `/api/models`, `/api/research`

## Mobile Deployment (Expo / EAS)

Build system:
- Expo EAS (`mobile/eas.json`)

iOS release flow:
1. Confirm Apple and Google auth credentials
2. Run app version bump and changelog update
3. Build via EAS iOS production profile
4. Upload and validate in App Store Connect
5. Release via phased rollout

Pre-release checks:
- Auth flows on real device
- Push notification behavior
- Deep links and API reachability

## Domain and Routing

- Primary user-facing domain: `www.a2zai.ai`
- Root domain should redirect consistently to canonical host
- Ensure canonical metadata matches preferred host

## Rollback Strategy

- Web: redeploy previous stable Vercel build
- Mobile: pause rollout in App Store Connect or release hotfix build

## Observability Baseline

- Track deploy timestamps in progress log
- Monitor error logs for API failures post-release
- Monitor key user flows after each deployment window

## Ownership

Maintain a deployment owner map (person/tool access) in private operations notes, not in public repo docs.
