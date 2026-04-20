# International Security — Corporate Website

Single-page informational website built with plain HTML / CSS / JavaScript. No build step, no frameworks, no dependencies beyond Google Fonts.

## File structure

```
international-security/
├── index.html        Semantic markup, 11 sections, Albanian content
├── styles.css        Complete design system (CSS variables, responsive)
├── script.js         Nav, scroll-spy, reveals, counters, form validation
├── assets/
│   └── logo.png      Brand logo
└── README.md         This file
```

## How to run

Open `index.html` directly in a browser, or serve the folder:

```bash
cd international-security
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

Deploy to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, shared hosting with `/public_html`). No server-side code required.

---

## 1 · Font pairing

- **Fraunces** — display serif (headings, pull quotes, italic accents). Variable font with optical sizing — large headings use `opsz: 144` for dramatic contrast, smaller headings use `opsz: 36`. The italic cut in gold is the signature typographic gesture throughout.
- **Archivo** — body / UI sans-serif. Strong, slightly condensed, works well alongside the elegant serif without competing. Used for buttons, nav, labels, body copy.

Both loaded from Google Fonts. If you want to host them locally for performance, download from [fonts.google.com](https://fonts.google.com) and swap the `<link>` in the `<head>` for a `@font-face` block in `styles.css`.

## 2 · Color palette

| Token | Hex | Use |
|---|---|---|
| `--bg-0` | `#0A0A0D` | Page base (near-black, warm) |
| `--bg-1` | `#111114` | Alternating section background |
| `--bg-2` | `#17171C` | Cards, form surface |
| `--bg-3` | `#1E1E24` | Elevated surface on hover |
| `--red` | `#B8252E` | Primary brand red (matches logo) |
| `--red-deep` | `#8F1A22` | Hover state for primary CTA |
| `--gold` | `#C9A961` | Accent — numbers, italics, borders, icons |
| `--gold-light` | `#E4C988` | Lighter gold for highlights |
| `--text` | `#F5F2EB` | Body text (warm off-white) |
| `--text-muted` | `#A8A299` | Secondary text, descriptions |

The palette is deliberately **disciplined**: dark dominant, gold as the premium signal used sparingly, red reserved almost exclusively for primary calls-to-action. This is what makes it read as luxury/heritage rather than flashy.

## 3 · Icon style

All icons are **inline SVG, 1.4 – 1.5 stroke weight, no fill, currentColor-driven**. This matches the thin, editorial-magazine feel of the typography. Don't mix in filled icons, colored icons, or emoji — it will break the aesthetic instantly.

If you need more icons: [Lucide](https://lucide.dev) and [Phosphor (Regular weight)](https://phosphoricons.com) both match this visual language.

## 4 · Image direction per section

The site currently uses **zero photography** — all imagery is CSS gradients, SVG icons, and grid textures. This is intentional: generic security stock photos would cheapen the premium feel. If you want to add real photography later:

| Section | What to shoot / source |
|---|---|
| **Hero** | Subtle background: a dimly-lit control room, keyboard close-up, or security camera against a dark wall. Heavily desaturated, color-graded toward amber/deep red. Should *not* compete with the title. |
| **About** | A real team / HQ / operations room shot. Shot in available light, grainy, serious — think Bloomberg documentary, not corporate stock. |
| **Systems showcase** | Replace the SVG illustrations with clean product photography on dark textured backgrounds. One consistent photo style across all 6 cards is essential. |
| **Projects** | Architectural / object photos of the sites you've secured (with permission). Not staged — actual locations. |
| **Testimonial** | A single portrait of a real client, shot tight, black & white. Optional. |
| **Tips cards** | Either keep text-only (clean editorial) or use one muted accent image per card. Avoid iconic "security" tropes (handshakes, locks, keys). |

**Rule of thumb:** if it looks like a stock photo, it will drag the site down. Better to have no image than a generic one.

## 5 · Premium polish — further moves

Things I'd add in a v2 if this were going into production:

1. **Replace SVG system illustrations with real product photography.** This is the #1 upgrade available.
2. **Add a real testimonial with a real name + photo.** Anonymous testimonials read as hedged — a real quote from a real client is worth more than three generic ones.
3. **Commission a 3-second silent looping video for the hero background** — a slow pan across a control room, or a camera iris slowly adjusting. Muted, autoplay, loop. Add a fallback static image for mobile + reduced-motion users.
4. **Custom 404 page** in the same visual language. Cheap to build, signals care.
5. **Proper favicon set** (16×16, 32×32, 180×180 apple-touch-icon, SVG favicon). Right now I'm using the logo PNG as the favicon — fine, but dedicated sizes look sharper.
6. **Open Graph + Twitter Card meta tags** for when links are shared. I added `<meta description>` but not the full OG set — one evening's work.
7. **Connect the contact form to a real backend.** Currently the form shows a success message without sending anything. Options: Formspree, Basin, Netlify Forms, Web3Forms, or a minimal endpoint on your own server that emails `info@internationalsecurity.com`.
8. **Real email address.** I used `info@internationalsecurity.com` as a placeholder — replace with the real one in both `index.html` (contact section + footer) and inside the form submission logic on the backend.
9. **Schema.org JSON-LD** for LocalBusiness + SecurityService. Helps Google understand you're a service business in Prishtinë. About 30 lines of JSON in the `<head>`.
10. **Compress the logo PNG** via [Squoosh](https://squoosh.app) or convert to SVG if you have the vector source. Current logo is 100 KB; could be 15 – 25 KB as WebP or 5 KB as SVG.
11. **Performance**: font preload hints are already in place. For a perfect Lighthouse score, self-host the fonts and inline critical CSS.
12. **Accessibility audit**: the current build follows semantic HTML and has `:focus-visible` styles, reduced-motion support, and ARIA labels on nav + icon-only links. Run axe DevTools before launch to catch anything I missed.

## 6 · What keeps this informational, not a shop

This is a deliberate design discipline, not just an absence of features. Notes for whoever maintains the site:

- **No prices anywhere.** No "starting at", no "from €X/month", no ranges. Price discovery happens in the conversation after "Kërko Ofertë".
- **No "Add to cart", no "Buy now", no quantity selectors.** The systems showcase uses `Kërko Konsultë` (request consultation) as the only action.
- **No filters, no sorting, no "categories" in a shopping sense.** The systems grid is a showcase, not a catalog. Do not add a sidebar with checkbox filters.
- **No user accounts, login, or registration.** No `/account`, no `/wishlist`, no saved items.
- **No "product pages" with specs, SKUs, datasheets, or purchase forms.** If you want to add detail pages per system later, they should be content-first: editorial case study, not spec sheet with a buy button.
- **All CTAs funnel to two places only**: the contact form (`#kontakt`) and the phone number. That's it. Every button on the page leads to human conversation.
- **Service cards intentionally have no links.** They describe, they don't navigate. Adding "Learn more →" on every card would turn this into a catalog. The unified section-level CTA at `#kerko-oferte` is the path.
- **The footer mirrors the same discipline** — service links point back to the `#sherbimet` anchor, not to individual service pages.

If someone later asks you to "add a shop section" or "let people order systems online", the answer to preserve the brand is: no. The whole design is calibrated around the idea that the next step is always a human conversation. A shop breaks that.

---

## Content to update before launch

- [ ] Email address in `#kontakt` and `.footer-contact` (currently `info@internationalsecurity.com` placeholder)
- [ ] Client logos in `.clients-strip` (currently placeholder names: SECTOR BANK, NORD INDUSTRIES, etc.)
- [ ] Project cards in `.projects-grid` — replace generic descriptions with real anonymized case studies
- [ ] Testimonial text + attribution
- [ ] Social links in `.footer-social` (currently `href="#"`)
- [ ] Privacy policy and terms pages (currently `href="#"` in footer-bottom-links)
- [ ] Connect `#contactForm` to a real backend (see Premium polish #7)
- [ ] Replace stat counter numbers (`18+` years, `500+` objects, `100%` licensed) with real figures if they differ

---

**Built for:** International Security, Prishtinë · Kompania e Sigurimit Fizik & Elektronik
