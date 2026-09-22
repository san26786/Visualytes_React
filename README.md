# Visualyte

Visualyte is a Next.js 16 marketing website and lead-generation platform.

## Development

```bash
npm install
cp .env.example .env
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000). Configure real mail, Stripe, and reCAPTCHA credentials in `.env`; never commit that file.

## Quality gates

Run these before opening a pull request:

```bash
npm run lint
npm run typecheck
npm run build
# Runs all three checks
npm run check
```

## Engineering conventions

- Prefer Server Components. Use `"use client"` only around the smallest interactive boundary.
- Keep secrets and payment calculations on the server. The checkout API accepts a package name only and determines its price from the server-side catalogue.
- Validate every request at the route boundary and escape untrusted values before placing them in HTML emails.
- Use `next/image` for raster images and supply accurate `sizes` for responsive images.
- Add a focused regression test whenever fixing a bug or adding server-side business logic.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `EMAIL_USER` / `EMAIL_PASSWORD` | Gmail SMTP credentials used by lead forms |
| `RECAPTCHA_SECRET_KEY` | Server-side reCAPTCHA verification key |
| `STRIPE_SECRET_KEY` | Stripe secret key used only by checkout |
| `NEXT_PUBLIC_URL` | Canonical application URL for Stripe redirects |
| `RECAPTCHA_SITE_KEY` | Browser-side reCAPTCHA site key |
