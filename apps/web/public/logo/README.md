# Brand masters — Medusa bust

Drop the **official Medusa bust masters (alpha PNG)** here once confirmed
(Phase 0, item 1). Expected files:

| File | Use |
| --- | --- |
| `medusa-bust@2x.png` | Header / footer mark |
| `medusa-bust-og.png` | OG card (replaces the runtime-generated card in `app/opengraph-image.tsx`) |
| `medusa-bust-favicon.svg` | Favicon (replaces the interim serpent-ring `app/icon.svg`) |

Until the masters land, the interim mark is the gold serpent ring
(`app/icon.svg`) plus the MEDUSAELITE wordmark — already injected in the
header, footer, favicon and OG card. Swapping in the bust is an asset drop,
not a code change, except for pointing `opengraph-image` at the static PNG.
