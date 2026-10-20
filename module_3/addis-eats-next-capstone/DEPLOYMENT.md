# ADDIS EATS — Next.js Capstone Submission — deployment handoff

## Deployment status

This archive has **not** been deployed and no GitHub push has been performed from this environment. A real deployed URL cannot be written here until you create/connect a repository and deploy it. Do not treat `https://addis-eats.example.com` as a live URL; it is a placeholder.

## Required production steps

1. Create a private or public GitHub repository and push this project (commands in `README.md`).
2. Provision a persistent database and replace `lib/server/order-store.js`'s in-memory `Map` with database-backed storage. In-memory order data is not durable or safe across serverless instances.
3. Replace the hard-coded demo credentials in `app/auth/actions.js` with a trusted identity provider or database-backed password verification (Argon2id/bcrypt), rate limiting, and account recovery. Do not deploy the demo passwords.
4. Deploy the app to a Next.js-compatible host (for example, Vercel). Set `SESSION_SECRET` and `SITE_URL` as server-side environment variables in the hosting dashboard. Set `SITE_URL` to the actual HTTPS production origin. Leave analytics disabled unless you intentionally configure its public measurement ID.
5. Run a production build and smoke tests; capture the actual output. Do not paste expected output as if it were observed.
6. Update the README with the real deployed URL, repository URL, production build route table, Lighthouse report values, and smoke-test results.
7. Clone the GitHub repository into a fresh folder and repeat install, build, and smoke tests.

## Required secrets and environment

- `SESSION_SECRET`: random secret, 32+ characters, server only. Never use a `NEXT_PUBLIC_` prefix.
- `SITE_URL`: actual canonical production origin, including `https://`.
- `NEXT_PUBLIC_ANALYTICS_ID`: optional public analytics identifier only; not a secret.
- `.env.example` is safe to commit; `.env.local` must never be committed.

## Known blockers before production

- Demo sign-in users/passwords are hard-coded in the source.
- Order records are in-memory and disappear on restart or across different instances.
- Performance measurements in `PERF.md` are TODO until Lighthouse is run on both builds under the same conditions.
- Production build and fresh-clone checks must be executed in your environment; no successful run is claimed by this archive.
