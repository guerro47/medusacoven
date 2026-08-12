# THE COVEN ASSEMBLES
### MedusaElite pre-launch viral campaign — playbook v1

**Objective:** fill the founding-creator waitlist before Q4 2026 doors-open, at near-zero paid spend, without ever feeling like an ad.

**The subtlety principle:** we never pitch. The campaign sells three things obliquely — a symbol (the open gold ring), a scarce object (your handle), and a belief (creators should own their fan graph). People share claims and symbols; nobody shares a sales pitch.

---

## 0. Ground rules (non-negotiable)

- **Disclosure.** Any creator who is paid, gifted, or promised founding-creator perks in exchange for posting tags the post `#ad` / uses the platform's paid-partnership label. Subtle means understated, not undisclosed — undisclosed endorsements are an FTC violation and a brand-killer for a company whose entire pitch is *trust*.
- **No astroturfing.** No fake fan accounts, no staged "organic" hype, no bot engagement. Every voice in this campaign is a real person speaking as themselves.
- **No fake scarcity.** Waitlist counts and handle-claim numbers quoted publicly are real numbers or not quoted at all.
- **18+ everywhere.** All ad targeting, creator seeding, and community spaces are age-gated. No campaign content is sexually explicit — the brand is luxury/occult-minimal, not NSFW.

---

## 1. The mechanics already in the product (shipped with this playbook)

| Mechanic | Where | Why it spreads |
|---|---|---|
| Rich share card | `og.png` + OG/Twitter meta on `index.html` | Every pasted link renders the gold ring + "Your Fans. Your Data. Your Empire." — the link *is* the ad. |
| Handle reservation | Waitlist form | Claiming `medusaelite.com/@name` is a possession, not a signup. Possessions get screenshotted. |
| Referral loop | `?r=<handle>` param → `ref` in the payload | "Every claim through your link moves you up the list." Position on the list becomes the game. |
| Share moment | Success box: "Share on X" + "Copy my link" | The one moment users are proudest — the claim — is the one moment we ask them to share. |

Backend note: the `ref` field arrives with each signup. Rank the waitlist by referred-claim count; that ranking powers Phase 2.

---

## 2. Phases

### Phase 0 — WHISPER (weeks 1–2)
No product name. No link in copy (link in bio only). Just the glyph and one line at a time, posted from a bare brand account whose avatar is the gold open ring on black.

The ring is an *open* circle — an ouroboros that refuses to close. That's the whole thesis (no lock-in, leave anytime) drawn in one stroke. Never explain it. Let reply-guys decode it; decoding is engagement.

**Copy bank (one line per post, gold-on-black type card):**
- "The ring doesn't close."
- "Your audience is not their asset."
- "Rent is what you pay someone who owns your door."
- "Est. 2024. Doors 2026."
- "The coven is assembling."

**Success signal:** quote-posts asking "what is this?" Do not answer them.

### Phase 1 — SUMMON (weeks 3–4)
Name reveal. One post: the og card image, the line *"Your fans. Your data. Your empire."* and the link. Everything before this was the fuse.

Simultaneously, begin **creator seeding**: 20–30 hand-picked creators (mid-size, platform-burned, vocal about fees/deplatforming) get a personal note — not a press kit:

> "We built the thing you keep tweeting should exist. Own the fan graph, export everything, leave anytime. Your handle's unclaimed — @yourname — and founding creators keep founding rates for life. No obligation to post. If you do post, disclose it."

The DM offer is real early access, not payment-for-posts. If any perk is contingent on posting, it's `#ad` — see ground rules.

**Copy bank:**
- "We're not a platform. Platforms keep the exits locked."
- "Export everything. Leave anytime. We'd rather earn your staying."
- "Founding creators keep founding rates. Forever. That's the whole deal."

### Phase 2 — CLAIM RUSH (weeks 5–8)
The referral ranking goes public-ish: each waitlister can see their own position and how many claims came through their link (email them their rank monthly). Scarcity is real and specific:

- "Founding-creator rates close at doors-open."
- Weekly post: real waitlist count, real most-summoned handles (with their permission).
- Short-form video prompt for seeded creators (their own words, disclosed if perked): *"the platform math nobody shows you"* — what 20% of their gross actually is per year vs. a flat founding rate.

---

## 3. Channel notes

- **X** — primary. The whisper posts, the reveal, the weekly counts. Brand voice: declarative, no emojis, no hashtags except `#TheCovenAssembles` in Phase 1+.
- **Instagram** — the glyph as a 9-post black/gold grid during Whisper; Stories with the "add yours" sticker on "what do you actually own on your platform?"
- **TikTok** — creator-led only. The brand account posts nothing; the story only works in first person.
- **Reddit/Discord creator communities** — founders answer questions as founders, flaired/identified, only in threads already about platform fees or deplatforming. Participation, not promotion; follow each subreddit's self-promo rules.

**UTM convention:** `?utm_source=<channel>&utm_medium=<organic|seed|ad>&utm_campaign=coven-assembles` — keep `?r=` for people, UTM for channels.

---

## 4. Measurement

- North star: **waitlist signups/week** and **% arriving with a `ref`** (the viral coefficient proxy — target ≥ 35% by Phase 2).
- Per-phase: Whisper = quote-post rate & profile visits; Summon = link CTR from seeded posts; Claim Rush = referred-claims per sharer.
- Kill criteria: if `ref` share < 10% after two weeks of Phase 2, the loop isn't looping — rework the share moment before spending anything on ads.

---

## 5. Asset inventory

| Asset | Path | Status |
|---|---|---|
| Share card (1200×630) | `/og.png` | ✅ shipped |
| Share card source | `campaign/og-card.html` | ✅ (self-contained; re-render with the command in the file header) |
| OG/Twitter meta | `index.html` | ✅ shipped — update host when custom domain lands |
| Referral capture + share moment | `index.html` | ✅ shipped |
| Whisper type cards | — | render from copy bank, same tokens as og-card |
| Creator seed list | — | founder-curated, keep private |
