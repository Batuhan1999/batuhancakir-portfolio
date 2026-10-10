# Batuhan Cakir Portfolio

A static portfolio built for Cloudflare Workers Static Assets.

## Local development

```bash
npm install
npm run dev
```

## Deploy

Pushing to `main` deploys automatically through Cloudflare Workers Builds, which runs `wrangler deploy` with `wrangler.jsonc`.

The site source lives in `site/`. Files in `site/assets/` are cached for a year, so give a changed asset a new filename instead of overwriting it. No API keys or account credentials are stored in this project.
