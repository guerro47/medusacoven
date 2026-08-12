# medusacoven

MedusaElite — coming-soon landing page.

**Your Fans. Your Data. Your Empire.**

The monetization operating system for creators. This repo holds the pre-launch waitlist page (static, zero dependencies).

## Stack
- Single `index.html` — no build step
- Brand tokens: ink `#0A0A0A` / gold `#D4AF37` / bone `#EDE6D6`, Syne + DM Sans
- Waitlist form posts `{email, handle, ref, source}` to the endpoint set in `FORM_ENDPOINT` (top of the inline script). Empty = local-confirm demo mode. `ref` is the handle from the `?r=` referral param.

## Campaign
- `campaign/PLAYBOOK.md` — "The Coven Assembles" pre-launch viral playbook (phases, copy bank, ground rules).
- `/og.png` — social share card, rendered from `campaign/og-card.html` (re-render command in that file's header).
- Page ships with OG/Twitter cards, a `?r=<handle>` referral loop, and a post-signup share moment. Update the `og:url`/`og:image` host in `index.html` when the custom domain lands.

## Deploy
Connected to Vercel: every push to `main` deploys to production.

```bash
vercel --prod   # or just push to main
```

## Roadmap
See MEDUSAELITE Merger Blueprint v1 — MVP: Access Pass, Drops, Tips. Q4 2026.
