# A2Z AI

AI intelligence platform for builders and investors, with education as a secondary pillar.

Live site: `https://a2zai.ai`

## Documentation Index

- Vision: `docs/VISION.md`
- Product roadmap: `docs/PRODUCT_ROADMAP.md`
- Phase 1 implementation spec: `docs/PHASE_1_IMPLEMENTATION_SPEC.md`
- Technical architecture: `docs/TECHNICAL_ARCHITECTURE.md`
- Progress log: `docs/PROGRESS.md`
- Integrations and APIs: `docs/INTEGRATIONS_AND_APIS.md`
- Deployment guide: `docs/DEPLOYMENT.md`
- Decisions log: `docs/DECISIONS.md`
- Session continuity memory: `MEMORY.md`

## Local Development

Install dependencies:

```bash
npm install
```

Run web app:

```bash
npm run dev
```

Run mobile app:

```bash
cd mobile
npx expo start
```

## Notes

- Web app is in `src/`
- Mobile app is in `mobile/`
- API routes are in `src/app/api/`
- DB schema is in `prisma/schema.prisma`
