# Day 14 — Deployment runbook

1. Push this project to a repository you control.
2. Import the repository in Vercel and use the Next.js framework preset.
3. Add `SESSION_SECRET` (a unique random value with at least 32 characters) for **Preview** and **Production** separately. Add `SITE_URL` for each environment using its correct origin. Never add secrets with a `NEXT_PUBLIC_` prefix.
4. Deploy Preview first. Run the test battery in `DAY14-TESTS.md`; fix every failure.
5. Deploy Production, then run the same battery against the production URL in a private window.
6. Put the actual public URL in the README only after the deployment is live and verified. Do not use the example URL from `.env.example`.

## Current status
This package is not connected to the user's GitHub or Vercel account, so it cannot create a repository, set hosted environment variables, or truthfully provide a live URL. The app also uses demo credentials and in-memory order storage; treat it as a learning project, not a production commerce service.
