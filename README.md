# UMIA Portfolio

Next.js portfolio site for UMIA.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build

```bash
npm run build
```

## Environment Variables

Create `.env.local` for local development. Do not commit `.env.local`.

Required variable:

```bash
NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=
```

Set the same variable in Vercel Project Settings before deployment.
