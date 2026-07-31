# medusacoven

MedusaElite — coming-soon landing page.

**Your Fans. Your Data. Your Empire.**

The monetization operating system for creators. This repo holds the pre-launch waitlist page (static, zero dependencies).

## Stack
- Single `index.html` — no build step
- Brand tokens: ink `#0A0A0A` / gold `#D4AF37` / bone `#EDE6D6`, Syne + DM Sans
- Waitlist form posts `{email, handle, source}` to the endpoint set in `FORM_ENDPOINT` (top of the inline script). Empty = local-confirm demo mode.

## Deploy
Connected to Vercel: every push to `main` deploys to production.

```bash
vercel --prod   # or just push to main
```

## Roadmap
See MEDUSAELITE Merger Blueprint v1 — MVP: Access Pass, Drops, Tips. Q4 2026.
