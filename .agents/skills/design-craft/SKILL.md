---
name: design-craft
description: Personal taste library for translating wireframes into high-fidelity UI during whiteboarding/design challenges. Encodes the visual sensibility absorbed from references like Sazabi and Antimetal — color, spacing, typography, shadows, badges, chat surfaces, sidebars, dark/light mode pairings. Use this whenever the task is "move from wireframe to design" or "make this look quality". For motion, animation curves, and state transitions, also load `emil-design-eng`.
---

# Design Craft

This skill exists for one moment: **the wireframe-to-design hand-off in a whiteboarding challenge**. The problem and solution will be different every time — what carries over is the visual language. Pattern-match shamelessly from the references below; do not invent novel aesthetics under time pressure.

## Initial Response

When invoked without a specific question, respond only with:

> Loaded design-craft. Tell me the problem and the wireframe sketch — I'll translate to a designed UI using the taste library inside.

Then wait. Do not pre-emptively dump principles.

## The Anti-Slop Pledge

Before touching any pixel, say "no" to these out loud (in your head):

- Pure white `#ffffff` backgrounds for *operator/product* UI (true black `#000000` *is* allowed for the experimental/technical-beauty direction — see below — but only when paired with grain + glow + 3D)
- `Inter` or `Roboto` as the *only* typeface (Inter is fine in dark UIs at 460 weight, but it cannot carry a full design alone — pair it or choose a distinctive sans. Serif is opt-in only: use it only when the user explicitly asks for editorial, luxury, literary, or serif typography)
- Purple→blue gradients on white. Ever.
- **Gradient ring / iOS-widget bevel** on every card (`::before` mask-composite stroke) — reads as AI gloss; use flat `surface-card` + `shadow-panel` instead
- **Hairline borders on cards** to fake depth when shadow + surface stepping already separate layers — borders belong on **inputs and tables**, not metric tiles or composer shells
- Generic 3D illustration characters (the Memoji/blob-people slop)
- Neon-glow card with rounded-xl, Lucide icons, pastel pill badges, "Get Started" CTA — the Vercel-template stack
- Evenly spaced "balanced" palettes where every color gets equal airtime
- 400-weight body text on a flat surface with no elevation system
- Icon-only buttons without affordance (no border, no background, no hover state defined)
- Drop-shadows that are pure black at 25% opacity
- Default Tailwind zinc grays (`#71717a` family) — reads as 2022. Go warmer (cream/beige) or cooler (blue-tinted) instead
- `border-radius: 8px` on absolutely everything (and never go above 16px on small elements unless you're going full blob)
- Identical primary, secondary, tertiary buttons with only color swapped
- Centered body copy in long-form content (centered is for hero headlines only)
- Gradual type ramps (`72 → 56 → 40 → 32 → 24 → 18`) — pick a CLIFF instead (`72 → 16`)
- High-contrast fashion/editorial display serifs for product or dashboard UI. Do not use the "fancy morning greeting" look unless the user explicitly asks for editorial/luxury.
- Wide-tracked, all-caps eyebrow labels like `BRAND IDENTITY · PHASE 02`. This reads like design slop in product cards. Use sentence case or compact title case with normal tracking instead, e.g. `Brand identity · Phase 02`.

If the design instinctively reaches for any of these, stop and pull from the references instead.

## Pick a Direction Before You Pick Pixels

Commit to ONE conceptual track in a single sentence before anything else. Examples that have worked for the references in this skill:

| Direction | One-liner |
| --- | --- |
| Quiet operator tool | "Off-white paper, deep ink text, brand color only on action surfaces" (Antimetal light) |
| Operator dark studio | "Warm charcoal with cream-tinted whites, opacity does the work" (Sazabi dark) |
| Editorial / refined craft | "Professional sans first; use a display serif only when explicitly requested, with warm cream surface and asymmetric overlap" |
| Crisp utility | "Hairline borders, layered subtle shadows, brand-tinted elevation" |
| Brutalist graphic flex | "Pure white or pure black, type as texture, sharp corners, 1–2 saturated accents, monospace for everything that isn't a headline" |
| Experimental / technical beauty | "TRUE black `#000`, single saturated hue as a light source, 3D renders / particle / generative art, grain overlay, glow shadows, custom cursor" |
| Product / consumer app | "Generous whitespace, 12–16px radii, soft pastel mesh gradients in atmosphere only, single saturated accent, iOS-influenced" |

Write the sentence. Stick to it. Reject ideas that don't serve it.

### Why everything looks cream + blue (and when to stop)

This repo's shipped direction is **warm cream paper** (`--color-paper` / `--color-card`) plus **electric blue** (`#015efe`) as the single accent. That is intentional for the Moment challenge — not a universal law.

| What you see | Where it comes from | Fix if it feels wrong |
| --- | --- | --- |
| Cream page + sidebar step | `--color-paper` → `--color-paper-deep` surface stack | Pick a different direction sentence (cool gray `#f2f3f2`, true black studio, brutalist white/black) and rewrite the CSS comment + tokens in one pass |
| Blue cast on shadows | `--shadow-action` / `--shadow-card` use `rgba(12, 38, 77, …)` — brand *shade* as ambient tint | Use `--shadow-quiet` (warm ink only, no blue) on chat composer and prose surfaces; reserve blue-tinted stacks for chips, nav active rows, and primary chrome |
| Blue in fills | `bg-brand-50`, selection `brand-100`, focus rings | Assistant bubbles: `bg-card-raised shadow-panel` — not brand fills |
| Heavy elevation on chat | Copy-pasting `shadow-[var(--shadow-action)]` onto message bubbles | **AI bubbles: no shadow.** User bubble: inverted ink fill only (no action shadow). Composer: `shadow-quiet` at most |
| Heavy cards on Usage/dashboard | Full `shadow-card` stack on every metric tile | Pair `.surface-card` with **`shadow-panel`** (lighter Tailwind token) on dashboards; keep **`shadow-card`** for plan pickers / modals only |

Do not re-apply cream paper + blue-tinted shadows on every new component without checking the direction sentence. If the user says shadows feel loud, **lower the Tailwind shadow token** (`shadow-panel` / `shadow-action`) — do **not** delete shadows or add extra borders unless the wireframe calls for them.

## Consistency Lock

Before refining details, define the system constraints in one pass: surface stack, accent hue, text ramp, radius ladder, shadow style, spacing scale, and icon stroke weight. Every new component must reuse those choices instead of inventing local exceptions.

- **One page, one material logic**: if cards feel like paper, all raised surfaces should use paper shadows and hairlines; if they feel like glass, all raised surfaces need the same blur, stroke, and highlight behavior.
- **Quality shadows, not big shadows**: elevation should come from soft layered opacity, brand-tinted ambient bloom, and subtle 1px containment. Avoid oversized dark shadows that make components look heavy or detached. Apply shadows via **Tailwind utilities** (`shadow-panel`, `shadow-card`, `shadow-action`, `shadow-quiet`) defined in `@theme` — not removed. **Dense dashboards**: `.surface-card shadow-panel`. **Floating shells**: `.surface-card shadow-card`. **Chips/pills**: `shadow-action`. **Composer**: `shadow-quiet`.
- **One accent story**: the primary accent may shift in opacity, tint, or glow, but it should not compete with a second saturated hue unless that hue is reserved for semantic status.
- **One radius family**: do not mix sharp editorial cards, pill-shaped controls, and rounded app panels on the same screen unless the contrast is intentional and named.
- **One type hierarchy**: labels, body, titles, and hero text should repeat the same weights, tracking, and line-height decisions across sections.
- **One interaction grammar**: hover, selected, disabled, focus, and pressed states should feel related across buttons, nav rows, chips, inputs, and cards.
- **Audit before shipping**: scan the screen for orphan values — random grays, one-off shadows, odd padding, mismatched icons, and unpaired font sizes. Replace them with the nearest system token.

## Reference Library

These are the absorbed references. When stuck, ask "what would Antimetal/Sazabi do here?" — there's almost always an answer.

### Antimetal — quiet operator tool (light)

Used for AI-assisted ops/observability conversations. Premium without shouting.

- **Page surface**: `#f9f9f9` (warm off-white) or `#f2f3f2` (cooler, very subtle green-gray for chat backgrounds)
- **Body ink**: `#575858` (gray/600), never pure black. Headings step up to `#070707` (gray/900) only when they need real authority
- **Brand**: `#015efe` (electric blue) as the *singular* accent. Sidekicks: `#425976` (deep slate-blue/600), `#59779b` (500), `#7096bd` (400), `#8db7da` (300), `#c0d5e9` (200), `#eff4f9` (100)
- **Neutrals**: `#929393` (gray/400) for secondary text, `#747575` (gray/500) for labels, `#d2d2d3` (gray/200) for skeleton bars, `#f3f3f4` (gray/100) for muted bubbles, `#d8d8d8` for hairline borders
- **Inline secondary**: `#b1b2b2` for parenthetical/meta inside a label like `Antimetal (Only visible to you)`
- **Type**: `ABC Diatype Plus Variable` — the whole reason it feels like Antimetal and not a template. Pair with `ABC Diatype Plus Variable Semi-Mono` for code/identifiers inline. If unavailable, fall back to `Söhne` → `Geist` → `Inter` (in that order). Never default to Inter without trying.

### Sazabi — operator dark studio

Used for product chrome (sidebars, settings, command surfaces) on dark. **Pick this for application UI, not landing pages.**

**Source of record (dark tokens):** [Sazabi Design Versions](https://www.figma.com/design/XXTdRAlrqPchHiDfxifckX/Sazabi-Design-Versions?node-id=17623-15606) — Figma variables + Preferences/settings surfaces. Names below match the file; hex is the resolved dark-mode value.

#### Surfaces (where each sits)

| Token / role | Hex | Where it’s used |
| --- | --- | --- |
| **Background** | `#0a0f0e` | Main app field: page canvas, **inset control fills** (e.g. default button body inside a bordered control), areas that should read as “deeper” than chrome. |
| **Sidebar** (= **Subtle**) | `#121716` | **Left settings sidebar**, **section shells**, **preference list rows** — the structured chrome one step above the field. |
| **Elevated** | `#1d201f` | **Floating panels** — dropdown menus, popovers — so they read above both Background and Subtle. |
| **Black 1** | `#0D1110` | **Image / media placeholders**, dense inset frames (with optional blur). |
| **Secondary** | `rgba(255,255,255,0.05)` | **Leading slots** (28× icon wells), **keyboard shortcut chips**, small recessed wells — not full rows. |
| **Border** | `#292d2c` | **Hairlines everywhere**: sidebar right edge, section outlines, row separators, **default button border**, dropdown border. |

Never `#000` or flat `#1a1a1a` for *operator UI*; the stack is Background → Subtle/Sidebar → Elevated, not one flat gray.

#### Foreground (cream) — base + opacity

Base ink is **`#dce8e4`** (variables label this **Grey** / **Foreground-Primary**). In layouts the same family often appears as **`rgba(223, 229, 227, x)`** — treat as one cream axis; use opacity for hierarchy.

| Stop | Typical use |
| --- | --- |
| **Primary / row title** | `rgba(223,229,227,0.9)` — **active nav labels**, primary row titles. |
| **Default body on dark** | `rgba(223,229,227,0.8)` — **dropdown options**, **back button** label, general interactive copy on chrome. |
| **Section label (12px)** | `rgba(223,229,227,0.5)` — **GROUP HEADERS** in the sidebar (“General”, “Project”). |
| **Foreground-Muted** | `rgba(220,232,228,0.6)` — **secondary lines**: descriptions under dropdown options, helper/meta under titles. |
| **Foreground-Subtile** | `rgba(220,232,228,0.2)` — **avatar / small glyph wells** that should barely read. |
| **Selected row wash** | `rgba(220,232,228,0.12)` — **active sidebar item** background (still on dark chrome). |

#### Inverted text (on cream selections)

When a row uses the **cream solid** as background (**selected dropdown row** = fill `#dce8e4`), text flips dark:

| Token | Value | Where |
| --- | --- | --- |
| **Foreground-Inverted** | `#0a0f0e` | Primary line on **selected menu row** (same family as Background — intentional contrast lock). |
| **Foreground-Inverted-Muted** | `rgba(10,15,14,0.6)` | Description line on that same **selected** row. |

#### Interaction fills

| State | Value | Where |
| --- | --- | --- |
| **Hover** | `rgba(223,229,227,0.05)` | **Dropdown / list row** hover (still dark surface). |
| **Selected (menu item)** | `#dce8e4` | **Highlighted option** inside dropdown — pairs with inverted text above. |

#### Accents & status

| Token | Hex | Where |
| --- | --- | --- |
| **Accent** | `#ff0027` | **Crimson**: notifications, danger, recording/active-agent “light” (pair with plus-lighter stacks, not generic red shadows). |
| **Green** | `#5df89d` | **Online / success** indicator dots (e.g. header status). |
| **White 2** | `#808987` | **Tertiary line** accents — e.g. corner ticks / rules on **image placeholder** frames, not primary text. |

#### Effects (from file)

- **Menu elevation**: `box-shadow: 0 2px 4px rgba(0,0,0,0.15)` on dropdowns; **inner highlight** `inset 0 -1px 4px white` (Shine) for glass polish.
- **Atmosphere**: when an icon needs to “glow” (active agent, recording, error), use `mix-blend-mode: plus-lighter` on blurred shapes — **paint light**, don’t slap a drop shadow.

#### Legacy note (chat / light surfaces)

- **Date dividers** in chat: thin hairline + small label inset 6px each side. Label `rgba(20,31,27,0.6)` on light, `rgba(220,232,228,0.5)` on dark.

### "Best designs on X" — what the feed celebrates

Pulled from observing 30+ tweets of the highest-signal design work currently shared by designers on Twitter/X. Use this when the brief asks for something that should feel of-the-moment (landing page, marketing site, portfolio, app icon, brand identity, hero artifact). The patterns:

- **TRUE `#000000` is back** — but only for the experimental/technical-beauty direction. Pure black is non-negotiable for designs featuring 3D renders, particle systems, generative art, dot-matrix effects, glass orbs, dimensional renderings. The black IS the canvas. To make `#000` not look cheap: layer a `2–4%` opacity grain/noise texture across the whole surface, and use **glow shadows** (`box-shadow: 0 0 16px var(--accent-50)`) on interactive surfaces.
- **Brand color as a light source, not a CTA color** — the move that separates senior work from template work is using ONE saturated hue as a tint *throughout*: borders, text highlights, focus rings, hover glows, custom cursor. Not just on the "Sign up" button. Examples: emerald-tinted developer tool, electric-blue tinted job board.
- **Serif restraint for editorial direction** — avoid high-contrast "fashion magazine" serifs by default. Reach for `Söhne`, `Geist`, `SF Pro`, `Aptos`, or a similar professional sans first; only use `Tiempos`, `GT Sectra`, `Editorial New`, or `Playfair Display` when the user explicitly asks for editorial/luxury.
- **Hero scale cliff**: `72–80px` headline → `16–18px` body. Skip the gradual ramp. The cliff signals "I commit."
- **Monospace as personality**: not just for code, but only when the content is actually technical or the brief asks for a brutalist/utility identity. Do not use mono for ordinary product labels, card eyebrows, or badges by default.
- **Wordmark IS the brand**: top portfolios/studios don't have a logo *icon*. They have a wordmark with a single move (custom ligature, stripe fill, measured mono stack). Pick one wordmark trick. That's the brand.
- **Type as texture/graphic** (brutalist track): repeat, rotate, outline, stripe-fill, pixel-construct, layer overlapping wordmarks. Type isn't communication — it's the visual.
- **Pastel mesh gradients** done right: pink → orange → yellow, low saturation, low contrast, looks like overexposed film. **Background atmosphere only.** Never on foreground elements. Never the purple→blue Bootstrap-era slop.
- **Bento / masonry grids**: asymmetric card sizes with consistent 16–24px gaps. Breaks "every row same height." Used by portfolios, design feeds, dashboards.
- **Custom cursors** and **physics-based input feedback** (letters scattering on invalid input, slide-to-confirm interactions) are the highest-effort, highest-signal flourishes. Reserve for one moment per design.
- **Photography style when used**: soft focus, natural light, neutral/warm tones, lifestyle composition. Coffee cup at the edge of frame, hand holding object, casual environment. **Never stock photography.** If you can't get this kind of imagery, use a render or illustration instead.
- **Aesthetic direction is ALWAYS extreme** — refined-minimal *or* maximalist-graphic. The middle ground (mid-saturation, mid-spacing, mid-everything) reads as template. The feed celebrates committed extremes.

### Raindrop-style moodboard chrome — clean rounded collection UI

Use this when the brief involves bookmarks, moodboards, collections, galleries, inspiration boards, or any asset library where the content should feel curated and the UI should stay quiet.

- **Direction sentence**: "Foggy off-white chrome, rounded thumbnail cards, soft convex chips, and almost no color outside content." The UI disappears so the saved images carry the saturation.
- **Surface stack**: page canvas `#f3f4f2`, sidebar `#e9ece8`, panels/cards `#f7f8f6`, raised controls `#fbfcfa`, hairline `rgba(38, 45, 42, 0.08)`. Avoid pure white; the screenshot works because every surface is a slightly dirty light gray-green.
- **Layout posture**: fixed left sidebar around `176px`, compact top toolbar, then a masonry grid with 3 columns, `12px` gutters, and cards that vary by content height. The grid should feel like a pinboard, not a dashboard table.
- **Card shape**: large media cards use `10–12px` radius with a 1px soft ring and almost no shadow. Inner media clips to `8px`, leaving a calm outer frame. Black/dark content can sit inside this frame without making the whole UI dark.
- **Sidebar density**: rows are `30–34px` tall with `6px 8px` padding, `6–8px` radius, and 16px icons. Active row is a translucent white/cream wash plus subtle ring, not a loud accent bar.
- **Chips and buttons**: icon chips are circular `28–32px`; label pills are `68–96px` wide and `30–34px` tall with pill radius, centered 13px medium text, and a convex shadow stack. Pair an icon chip to the left of a label pill when actions need a tactile "tool palette" feel.
- **Convex control recipe**: `background: linear-gradient(180deg, #fbfcfb 0%, #eef1ee 100%)`; `box-shadow: 0 1px 1px rgba(255,255,255,0.9) inset, 0 1px 2px rgba(20,28,24,0.08), 0 0 0 1px rgba(20,28,24,0.06)`. This is for neutral floating chips like Search / Think / Upgrade / Customize, not primary CTAs.
- **Icon treatment**: tiny glyphs can sit inside a frosted circular well (`rgba(255,255,255,0.7)` with a soft ring). Keep icons gray-green and low contrast; the affordance comes from the well and shadow, not from black glyphs.
- **Color rule**: reserve strong color for thumbnails, folder dots, and the brand mark. Navigation, buttons, dividers, and labels stay nearly monochrome. This is what makes the board look clean even when the content is visually chaotic.
- **Cleanliness audit**: no heavy separators, no strong button borders, no saturated active states, no boxed title bars around cards. Use radius, surface stepping, and 1px rings to separate things.

## Color System (the rule, not the values)

Build palettes that look like this, regardless of brand:

1. **Two surfaces** that are *almost* the same: the page surface and the elevated/card surface differ by only 1–3% lightness. The reference uses `#f9f9f9` page + `white` cards, or `#f2f3f2` page + `#f9fbfa` cards.
2. **One accent**, used decisively. The accent has a 100/200/300/400/500/600/shade ramp so a single hue can mean "barely there", "subtle", "interactive", "pressed", "deepest". The shade variant (e.g. `#131d8e`) is for accent-on-accent text, not regular content. **Bonus move**: also tint borders, focus rings, hover glows, and the cursor with the accent — treat it as a *light source*, not a button color.
3. **A text ramp of 4 stops minimum**: 900 (titles) → 600 (body) → 500 (labels) → 400 (meta). All slightly tinted, never neutral gray.
4. **Hairline color** (`#d8d8d8` / `#e2e2e2` light, `#292d2c` dark) is its own token, separate from text gray.
5. **Brand-tinted shadows**: shadows use `rgba(12, 38, 77, 0.04)` instead of `rgba(0,0,0,0.1)`. The R/G/B should be the deep-shade variant of your brand. This is the single biggest "feels designed" lever.

### When TRUE black is correct

Default rule: avoid `#000` and `#fff`. **Exception**: the experimental/technical-beauty direction *requires* `#000` because the design is showcasing 3D renders, particle systems, generative art, glass orbs, etc. Pure black is the museum wall — it makes the rendered subject sing. To make it not look cheap:

- Layer a **2–4% opacity grain/noise texture** across the entire surface (a tiled SVG noise pattern or `filter: url(#grain)`). This single move is what separates "true black done right" from "default Tailwind dark."
- Use **glow shadows** instead of drop shadows on interactive elements: `box-shadow: 0 0 16px var(--accent-50)` with the accent at 40–60% opacity. The light source comes from inside the element, not from above.
- Constrain palette to `#000` + 1 saturated accent hue + maybe one neutral mid-gray. Three colors total.
- Headlines drop to deep gray `#a8a8a8` rather than pure white — true white on true black is too harsh except for one or two anchor words.

If you're not doing 3D / generative / particle work, fall back to charcoal `#121716` operator-dark instead.

### Pastel mesh gradients (the only acceptable gradients)

If using gradients on backgrounds (never on foreground elements like buttons or cards):

- Color stops: pink → orange → yellow, or coral → cream → mint, or blue → lavender → cream. Never purple → blue. Never neon.
- Saturation: keep it low. The gradient should look like overexposed film, not Bootstrap.
- Apply across large regions (full hero, full page background) with `60–120% blur` for that diffuse "atmospheric" quality. Not crisp banded gradients.
- Always layered with grain texture on top to break up banding.

## Typography

### Choose the typeface like it matters, because it does

| Vibe | Display | Body |
| --- | --- | --- |
| Operator/quiet (Antimetal) | `ABC Diatype Plus Variable` | same |
| Dark studio (Sazabi) | `Inter` 460/520 weight (semi-medium) | same |
| Professional product default | `Söhne` / `Geist` / `SF Pro` / `Aptos` | same |
| Editorial (explicit request only) | `GT Sectra` / `Tiempos` / `Editorial New` | `Söhne` / `Geist` |
| Brutal/raw | `Times New Roman` italic + `JetBrains Mono` | `IBM Plex Mono` |
| Refined luxury (explicit request only) | `Editorial New` / `PP Editorial Old` | `Söhne` |
| Playful | `Recoleta` / `PP Pangaia` | `Geist` |

Default to professional product typography: `Söhne`, `Geist`, `SF Pro`, `Aptos`, or `Inter` at 460/520 when those are what the project has. Do not reach for serif fonts unless the user explicitly asks for editorial, luxury, literary, or serif typography. If they do ask, pair the serif headline with a professional sans body.

Inter is allowed *only* at non-default weights (460 or 520) with `font-feature-settings: 'lnum' 1, 'tnum' 1` for tabular figures. Default-weight Inter (400/500/600) reads as a template.

### Type scale anchors

- **12px / line-height 12–16px**: section headers, badge text, meta. Keep casing readable; do not force all-caps or wide tracking. Use `letter-spacing: 0.065px` max on dark only when it improves rendering; `tracking: -0.13px` on light.
- **13px**: badge body, sender names. Tight tracking `-0.13px`.
- **14px / 1.35–1.6**: dense body, action descriptions. Tight tracking `-0.14px`.
- **16px / 1.6**: standard body, chat messages, primary actions. Tracking `-0.16px`.
- **18–22px**: section titles.
- **28–40px**: dashboard/section headings.
- **60–80px**: hero headlines for marketing/landing/editorial. Use a professional sans by default; switch to display serif only on an explicit editorial/luxury request. Tracking `-0.04em` to `-0.02em`. Line-height `0.95` to `1.05` (not 1.4 — let the letters sit close).

The pattern: **the smaller the text, the tighter the letter-spacing**, but flip to *positive* tracking on dark backgrounds at very small sizes (12–13px) — they need air to render cleanly.

### The hero cliff

Most "quality" landing pages do NOT use a gradual `72 → 56 → 40 → 32 → 24 → 18` ramp. They cliff: **one giant headline (60–80px)** dropping straight to **body (16–18px)**, with maybe one subhead (22–24px) as a bridge. The cliff is what makes the hero feel committed instead of tentative.

### Monospace as a design choice (not just for code)

Monospace in non-technical UI is a high-signal move only when restrained. Use it for:

- Technical labels and metadata that are naturally code-like (IDs, timestamps, statuses)
- Navigation in brutalist/utility designs
- Inline identifiers, IDs, status codes (Antimetal already does this)
- Wordmarks and capability lists only when the brief explicitly asks for brutalist/technical identity

Do not use monospace plus all-caps tracking for ordinary card eyebrows. Labels should read like professional software copy, not poster texture.

Recommended: `JetBrains Mono`, `IBM Plex Mono`, `Berkeley Mono`, `Fragment Mono`, `ABC Diatype Plus Variable Semi-Mono`, `Geist Mono`. Avoid Courier (default) and Menlo unless you're going *deeply* terminal.

### Type-as-texture (brutalist track only)

If you commit to the brutalist or experimental direction, type can stop being communication and become graphic. Moves to keep in the toolbox:

- Repeat the wordmark in a pattern, rotated, fading
- Outline-only headlines (`-webkit-text-stroke: 2px currentColor; color: transparent`) layered behind a solid version
- Stripe-fill the headline (CSS `background-clip: text` with a striped gradient)
- Massively oversize a single number/letter as a section anchor (think `04` taking up half the viewport)
- Layered overlapping headlines with mix-blend-mode

These are statement moves. One per page. Not three.

### Numerals

Always set `font-feature-settings: 'lnum' 1, 'tnum' 1'` on anything containing numbers (timestamps, counters, table cells, code chips). Lining + tabular figures are a 5-second change that reads as engineering rigor.

## Spacing & Layout

### The 4 / 6 / 8 / 12 / 16 / 24 / 40 scale

Stick to these increments. The references don't use 5, 10, 14, 20, 30. Pick from this list.

### Component-level rhythm (from the references)

- **Sidebar nav row**: padding `6px`, gap `2px` between rows, gap `8–12px` between groups. Section header is `24px` tall with `6px` horizontal padding.
- **Icon + label**: `8px` gap. Icon `20px` square in nav, `16px` in chips/badges, `24px` hero.
- **Chat bubble**: `18px` padding, `16px` border radius, `12px` gap to next bubble.
- **Card**: `16px` padding around content, `12px` gap between rows inside.
- **Page chrome**: `80px` vertical, `120px` horizontal on wide screens. Inner content max-width `640px` for chat-style content, `800px` for dashboards.
- **Pill / badge**: padding `8px 12px` (with leading icon `pl: 8`), height ~`28–32px`, fully rounded (`9999px`) or `12px`.
- **Moodboard chrome**: sidebar `176–200px`, grid gutters `12px`, toolbar height `32–40px`, media card radius `10–12px`, icon chips `28–32px`, label pills `30–34px` tall.

### Border radius ladder

| Element | Radius |
| --- | --- |
| Inline chips, code tags, letter chips | 4px |
| Buttons, small cards | 6–8px |
| Inputs, dropdowns | 8–12px |
| Cards, panels, evidence blocks | 12px |
| Chat bubbles, primary surfaces | 16px |
| Pills, full-round badges | 9999px |
| **Asymmetric tail** (chat send) | `8 / 16 / 16 / 16` — bottom-left collapses to mark direction |

The asymmetric tail on chat inputs is a signature move — the bottom corner closest to the user collapses to 8px while the others stay at 16px. Use it when the input belongs to a *speaker*.

## Shadows & Elevation (this is where most designs lose)

Never use a single `box-shadow: 0 4px 12px rgba(0,0,0,0.1)`. Build stacks.

### The Antimetal stack (premium light surface)

```css
box-shadow:
  0px 16px 40px 0px rgba(12, 38, 77, 0.05),  /* ambient */
  0px 4px 12px 0px rgba(12, 38, 77, 0.02),   /* mid */
  0px 0px 0px 1px rgba(12, 38, 77, 0.04);    /* hairline */
```

Three layers: ambient bloom + soft mid + a 1px brand-tinted hairline that *replaces* the border. The hairline-as-shadow trick is what makes the surface feel like it's floating *and* contained.

### Inner highlight (the "gloss" edge)

Add this to any elevated surface on light mode:

```css
box-shadow: ..., inset 0px 1px 1px 0px rgba(255, 255, 255, 0.88);
```

It mimics light catching the top edge. Subtle but it's the difference between flat-and-floating and physically-real.

### Pressed inner shadow (depth on a primary button/bubble)

```css
box-shadow: inset 0px -2px 10px 3px rgba(0, 0, 0, 0.1);
```

Used on the brand-blue chat bubble. Reads as "this thing has weight."

### Action chip / icon-button shadow (`--shadow-action`)

```css
/* Light — lowered defaults; blue tint only on the ambient layer */
box-shadow:
  0 0 0 1px rgba(20, 18, 14, 0.05),
  0 1px 2px 0 rgba(12, 38, 77, 0.025),
  0 1px 1px 0 rgba(12, 38, 77, 0.03);
```

Use for small buttons **inside** a card (nav active row, secondary pill, icon chip). The 1px ring + tiny shadow gives independent presence without competing with the parent. If it still reads heavy, drop the blue layer and use `--shadow-quiet` instead.

### Quiet surface shadow (`--shadow-quiet`)

```css
/* Warm ink only — no brand blue in the stack */
box-shadow:
  0 0 0 1px rgba(20, 18, 14, 0.05),
  0 1px 2px 0 rgba(20, 18, 14, 0.04);
```

Use for **chat composer**, tooltips that should not glow blue, and any raised panel sitting on the paper canvas. Prefer this over `--shadow-action` when the surface is mostly typography.

### Surface shell + Tailwind shadows

`.surface-card` is **structure only** (flat `bg-card`, radius — **no** `::before` gradient, **no** outer border). Elevation comes from a **Tailwind `shadow-*` utility** on the same element:

| Markup | Use on |
| --- | --- |
| `surface-card shadow-panel` | Usage metrics, chart, session table, in-page wallet sections |
| `surface-card shadow-card` | Pricing cards, plan & billing blocks, modals |
| `bg-card-raised shadow-panel` | Assistant chat bubbles (light, not `shadow-card`) |
| `bg-card-raised shadow-action` | Unselected time-range / preset pills |
| `shadow-quiet` | Chat composer (no border — shadow + `bg-card-raised` only) |

Define tokens in `@theme` so utilities compile:

```css
--shadow-panel: 0 1px 3px 0 rgb(12 38 77 / 0.035), 0 2px 8px -2px rgb(20 18 14 / 0.04);
--shadow-card: 0 4px 14px -2px rgb(12 38 77 / 0.04), 0 2px 6px -1px rgb(12 38 77 / 0.03);
--shadow-action: 0 0 0 1px rgb(20 18 14 / 0.05), 0 1px 2px 0 rgb(12 38 77 / 0.03), 0 1px 1px 0 rgb(12 38 77 / 0.025);
--shadow-quiet: 0 1px 3px 0 rgb(20 18 14 / 0.05), 0 2px 6px -2px rgb(20 18 14 / 0.035);
```

Prefer `shadow-panel` over `shadow-[var(--shadow-…)]` arbitrary values — same tokens, cleaner JSX.

### Shadow token routing (do not freestyle)

| Tailwind class | Use on | Do **not** use on |
| --- | --- | --- |
| `shadow-panel` | Dashboard tiles, assistant bubbles, charts, tables | Plan picker hero cards |
| `shadow-quiet` | Composer shell | Primary CTAs |
| `shadow-action` | Nav active row, unselected pills | Full-page cards |
| `shadow-card` | Pricing / billing cards, modals | Every metric tile on Usage |
| `shadow-popover` | Menus, limit badges | Message bubbles |

When shadows feel heavy: **tune `@theme` opacity**, swap `shadow-card` → `shadow-panel`, never zero out elevation unless the surface is truly flush prose.

### Paper-stack shadow (tooltip, popover)

```css
box-shadow:
  0px 1px 1px 0px white,
  0px 0px 0px 1px var(--accent-100);
```

White underneath + 1px accent-tinted ring. Looks like cardstock layered on cardstock.

### Drop-shadow vs box-shadow

For tiny floating messages (Sazabi `Message` component), use `drop-shadow` with very small blurs stacked:

```css
filter:
  drop-shadow(0px 0px 1.5px rgba(0, 0, 0, 0.15))
  drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1))
  drop-shadow(0px 0px 0.5px rgba(0, 0, 0, 0.05));
```

This produces a "barely lifted off the page" effect that box-shadow can't match because it follows non-rectangular shapes.

### Hairline borders

Reserve borders for **inputs** (focus states), **table row dividers**, and **chrome seams** (header/footer rules). **Not** for outer card shells, composer wrappers, popovers, or inset callout boxes — use `bg-paper-deep` inset instead of `border border-hairline-soft`.

### Usage / wallet dashboards (common over-shadow mistake)

Reference layout: metric row (3 tiles) → time pills → chart → alert + budget → table. **Every tile: `surface-card shadow-panel`** — not `shadow-card`. No extra borders, no gradient rings.

- **Time-range pills** (1h / 5h / …): selected = `bg-inverted`; unselected = `bg-card-raised shadow-action` (unchanged pill chrome).
- **Budget amount pills** ($5 / $10 / …): same as time pills.
- **Do not remove shadows** when the user asks to soften — reduce token strength in `@theme` or downgrade `shadow-card` → `shadow-panel`.

### Gradient card rings — do not ship by default

The mask-composite `::before` gradient stroke (white top → brand-tinted foot) was removed from this repo. On dense dashboards it reads as **synthetic / template gloss**, especially next to cream paper. Prefer:

- `surface-card shadow-panel` (or `shadow-card` when the card must lift more)
- Inset callouts: `bg-paper-deep rounded-[12px]` — not `border border-hairline-soft`
- Separation inside a card: `border-b border-hairline-soft` on header strips only (tables, alert headers)

Only reach for a gradient ring on a **single** hero object (e.g. one wallet pass) after the rest of the page is flat — never on every KPI tile.

### Glow shadow (dark mode only, used on interactive surfaces)

```css
box-shadow:
  0 0 0 1px rgba(255, 255, 255, 0.05),  /* idle hairline */
  0 0 16px 0 var(--accent-glow),         /* the glow */
  0 1px 0 0 rgba(255, 255, 255, 0.08);   /* top-edge highlight */
```

`--accent-glow` is the brand accent at 30–50% opacity. The element appears to *emit* light. Use sparingly: primary CTAs in dark mode, active toggle thumbs, hover states on featured cards. Never on every interactive element — it stops feeling special.

### Grain / noise overlay (the texture move)

```css
.grain::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.03;             /* 2–4% — never higher */
  mix-blend-mode: overlay;   /* multiply on light, overlay on dark */
  background-image: url("data:image/svg+xml,...");  /* tiled SVG noise */
}
```

This single layer is what makes `#000` look intentional and `#f9f9f9` look like paper. Add it to the page surface, not individual components. Keep opacity at `0.02–0.04`. Anything more reads as broken.

## Buttons

Three categories — never blend them.

### Primary (brand)

- Background: brand `#015efe` (or `#425976` for the deep slate variant)
- Text: brand-100 (`#eff4f9`), not pure white — keeps the surface from feeling synthetic
- Inner shadow `inset 0 -2px 10px 3px rgba(0,0,0,0.1)` for weight
- Radius: matches the surface family (16px in chat, 8px in toolbars)
- Press: `transform: scale(0.97)` 160ms ease-out (see `emil-design-eng`)

### Secondary (neutral)

- Background: white with the action-chip shadow stack
- Text: gray/500 `#747575`, medium weight
- Hover: bg shifts to `#f3f3f4`
- The 1px ring shadow does the work — no border property

### Convex utility pills (moodboard/search tools)

- Background: soft vertical gradient from near-card to deeper paper, e.g. `#fbfcfb` → `#eef1ee`
- Text: gray-green `#5f6763`, `13px` medium, centered
- Shape: pill radius, `30–34px` height, `68–96px` min-width; pair with a separate circular icon chip when useful
- Shadow: inner top highlight + tiny ambient shadow + 1px translucent ring. The chip should feel gently raised, never glossy or skeuomorphic-heavy
- Use for: Search, Think, Upgrade, Customize, filter shortcuts, view tools. Do not use for destructive actions or primary conversion CTAs

### Ghost (text-only / inline)

- No background until hover
- Hover: `bg: rgba(20,31,27,0.04)` light, `rgba(220,232,228,0.06)` dark
- Active row indicator (Sazabi): bg `rgba(220,232,228,0.12)` — solid feel, no border

### Submit/inline action pill (Antimetal)

- Bg: `#eff4f9` (brand-100), text `#59779b` (brand-500)
- Padding: `6px 8px`, gap `5px`, radius `12px`
- Trailing icon: `arrow-turn-down-left` 14px (Phosphor: `arrow-bend-down-left`)
- Used for "Submit", "Reply", "Confirm" — small, present, never shouts

## Inputs

Tall and tap-friendly. Refined inputs are not 32px-tall little nubs.

- **Height**: `44–52px` (enough for thumb tap, generous reading)
- **Internal padding**: `12–16px` horizontal, vertical centered
- **Border**: `1px solid var(--hairline)` idle, `2px solid var(--accent-500)` on focus + a soft glow ring `box-shadow: 0 0 0 4px var(--accent-100)`
- **Radius**: matches button family (`8–12px`)
- **Placeholder**: `40–50%` opacity of body text color, never the default browser gray
- **Label**: above the input, `12–13px medium`, color `gray/500`. Not floating-label patterns unless the brief specifically calls for one — they were trendy 2018, now they're noise.

## Toggles

Default browser switches are forbidden. Build chunky:

- **Track**: `44–52px` wide, `24–28px` tall, fully rounded
- **Thumb**: `20–22px` circle, white in idle, white-with-accent-glow in active
- **Idle bg**: `gray/200`
- **Active bg**: `var(--accent-500)` solid OR `var(--accent-100)` with the thumb tinted accent
- **Transition**: `transform 200ms cubic-bezier(0.32, 0.72, 0, 1)` on the thumb (see `emil-design-eng` for easing). Add a tiny scale pulse on tap.

## Badges, Pills, and States

Three-state pattern (Antimetal "Private" badge):

| State | Visual |
| --- | --- |
| Inactive / disabled | dashed border `var(--brand-200)`, transparent bg, text `var(--brand-400)` |
| Subtle / available | filled bg `var(--brand-100)`, text `var(--brand-500)` |
| Active / selected | filled bg `var(--brand-600)`, text `var(--brand-100)` |

The dashed border for "available but inactive" is the move — it reads as "this can be turned on" without competing with active elements.

Counter chip (e.g., `0/2` progress): bg `#efefef`, text `#747575`, `12px medium`, height `20px`, padding `0 6px`, radius `4px`. Sits adjacent to its label, never alone.

## Chat / Conversation Surfaces

This is the most-loaded surface in the references. Patterns:

1. **Sender label** lives *above* the bubble, not next to it. `13px`, gray/500, with parenthetical meta in lighter `#b1b2b2`.
2. **User bubble** is right-aligned, inverted ink fill (`--color-inverted` / `--color-inverted-fg` in this repo — not brand blue unless the direction sentence says so). Asymmetric radius optional (`8/16/16/16`). No `--shadow-action`.
3. **AI bubble** is left-aligned, `--color-card` (or gray/100 `#f3f3f4`), hairline border, **no shadow** — quieter than the user. Never `bg-card-raised` + `shadow-action`; white + stacked shadow reads like a floating card, not conversation.
4. **Tool calls** appear as collapsible rows: small icon (often Phosphor) + label + chevron. When collapsed: `pl-[2px] pr-[4px] py-[2px]` and looks like inline text. When expanded: framed in a card with the action-chip shadow.
5. **Streaming text** uses a horizontal gradient mask moving across the text (white→transparent→white) at ~1.5s linear infinite. Combined with a subtle blur layer for shimmer.
6. **Inline code/identifier** in prose: `Semi-Mono` font + `#f8f8f8` bg + 1px `#f3f3f4` border + 4px radius + `2px` horizontal padding. Looks embedded, not boxed.
7. **Evidence/result cards** (charts, tables, action lists) get their own framed container with a header strip (`#f9f9f9` bg) over the body (white). 0.5px borders. 12px outer radius.
8. **Multiple choice options** stack vertically, each with a letter chip (A/B/C) on the left in a 24px square. Selected = brand fill + brand-100 text on the chip; brand-100 bg + brand-shade text on the row.

## Sidebars / Navigation

### Viewport-anchored sidebar

Sidebars are application chrome, not page content. They should occupy the viewport height and stay present while the main canvas scrolls: `position: sticky; top: 0; height: 100svh` (or `100dvh` when mobile browser chrome matters), with their own `overflow-y: auto` only when the nav truly exceeds the viewport. Never let the entire sidebar scroll away with the document.

Make the sticky behavior feel designed, not bolted on:

- Keep the outer sidebar as the viewport-height shell; put scrolling on an inner nav region so top identity/back controls and bottom account/status controls can remain pinned.
- Use `padding: 12px 8px` on the shell, then let groups and rows follow the sidebar spacing rules below.
- Avoid sticky sidebars that cast heavy shadows over the canvas. Separation should come from surface stepping first, then a nearly invisible seam only if needed.
- On small screens, collapse or transform the sidebar into a drawer/tab rail rather than forcing a cramped sticky column.

### Surface stepping — sidebar darker than the main canvas

The single highest-leverage move for a sidebar is to step its surface **down** from the main canvas, not match it. Notion, Linear, ChatGPT, Vercel dashboard, Antimetal, and most modern operator UIs all share this pattern: the sidebar (chrome) sits **~2–4% darker** than the main content area in light mode, and **~2–5% darker** in dark mode. The recessed step *replaces* an explicit hairline border — once the surfaces differ, the seam becomes silky instead of drawn.

Why it works:

- **The canvas feels like a stage.** The lighter main area reads as where the user's work lives; the chrome recedes by being slightly heavier. In light mode the canvas is the *paper*; the sidebar is the desk underneath.
- **No drawn seam.** A 1px border between two visually-equal surfaces always reads as a hard line. A 1px border between two stepped surfaces reads as a transition. If you find yourself fighting a sidebar border that "looks black" or "too strong," the real fix is almost never a softer border color — it's stepping the surfaces apart so the border can be removed entirely.
- **Mirrors physical chrome.** Real-world chrome (toolbars on metal, side panels framing a notebook page) is *darker* than what it frames, because the framed surface reflects more light. Re-creating that hierarchy in pixels is what makes the layout feel built, not arranged.

Concrete values (warm cream track, the references' default):

| Surface | Light | Dark |
| --- | --- | --- |
| Main canvas (`--color-paper`) | `#f7f6f2` | `#121716` |
| Sidebar / chrome (`--color-paper-deep`) | `#f2f1ec` (~2% darker L) | `#0e1312` (~3% darker L) |
| Border on the seam | **drop it** — or `rgba(0,0,0,0.03)` light / `rgba(220,232,228,0.04)` dark | same rule |

Once the step is in place, **remove the `border-r` entirely** on the sidebar in 90% of cases. If it still feels like the surfaces are "floating apart," add the very-soft ring above — never the standard hairline (`#e6e4dd` light / `#292d2c` dark), which is calibrated for hairlines *between elements*, not between two large adjacent surfaces. A hairline tuned for a 32px chip will read as a hard line when stretched over a full-height sidebar.

Stepping rule of thumb (HSL lightness):

- Same brand/neutral hue, drop **L by 2–4%** for the sidebar.
- For a darker chrome (header bar, right rail), drop another **1–2%** below the sidebar — the hierarchy stays legible.
- Cards step *up* into white/`--color-card`. The mental model is a vertical stack: chrome at the bottom, canvas in the middle, cards on top.

Anti-patterns to call out:

- Sidebar = card color (lighter). Inverts the hierarchy — chrome looks elevated, canvas looks recessed, and the whole layout reads heavy.
- Sidebar = canvas color + visible 1px border. Produces the "black line on the right" effect — the border is doing all the separation work because the surfaces aren't, and any border strong enough to separate two equal surfaces will read as drawn.
- Stepping with a *different hue* (e.g. canvas warm cream, sidebar cool gray). Looks like two designs glued together. Step lightness only; keep the hue locked.

### Sazabi sidebar specifics

- Container: bg `--color-paper-deep` (charcoal step-down), no explicit right border, padding `12px 8px`, gap `12px` between groups
- Top "Back" pill: full-width, `bg: rgba(220,232,228,0.12)`, `padding: 4px 6px`, radius `6px`, centered text
- Group: `gap-2px` between rows
- Row: `padding: 6px`, `gap: 8px`, radius `4px`, icon `20px` + label `14px / 460-weight`
- Section label: 12px, `0.5` opacity, height `24px`, padding `0 6px`
- Active row: bg `rgba(220,232,228,0.12)`, text moves from `0.9` → `1.0` (or stays `0.9`, with bg doing the work)
- Hover idle row: bg `rgba(220,232,228,0.06)`, no animation needed (keyboard nav, see `emil-design-eng`)
- **Never** use chevrons or "→" on idle nav items — only on items that *open* something (submenu, external link)

## Icons — Phosphor

Use [Phosphor Icons](https://phosphoricons.com/) as the default set. Reasons:

1. Six weights (`thin`, `light`, `regular`, `bold`, `fill`, `duotone`). Consistency is automatic.
2. Geometric grid matches the 4/8/16/20/24 spacing scale.
3. Far less template-coded than Lucide/Heroicons (which read as Vercel/Tailwind UI on sight).

### Weight rules

- **Regular** for nav, body inline icons, chat tool-call markers
- **Bold** for primary buttons and key actions only
- **Fill** for status indicators (✓ success, ● recording, ▼ alert) — a filled icon is a state
- **Duotone** sparingly for hero/empty-state illustrations

Mix weights *intentionally*: idle = regular, active = bold or fill. Never mix randomly across a single screen.

### Sizing

- 14px in compact tags
- 16px in chips/badges/inline
- 20px in nav, secondary buttons
- 24px in heroes, primary buttons, empty states
- 32px+ → switch to an illustration, not an icon

### React import pattern

```tsx
import { ChatCircle, ArrowBendDownLeft, GitPullRequest } from "@phosphor-icons/react";

<ChatCircle size={20} weight="regular" />
```

If Phosphor isn't installed, ask before falling back. Lucide/Heroicons are last resort, not default.

## Light vs Dark — they are not inverses

Designing dark mode by inverting light mode produces neither. The references make different *choices* on each:

| Concern | Light (Antimetal) | Dark (Sazabi) |
| --- | --- | --- |
| Surface | `#f9f9f9` warm | `#121716` cool charcoal |
| Text | `#575858` (positive ink) | `rgba(220,232,228,0.9)` (cream-tinted) |
| Border | `0.5px #d8d8d8` | `1px #292d2c` |
| Shadow | brand-tinted, multi-layer | barely visible — use opacity layers instead |
| Active item | filled brand color, cool | `bg: rgba(fg, 0.12)` warm overlay |
| Glow / atmosphere | subtle ambient bloom | `mix-blend-plus-lighter` real light paint |
| Letter-spacing on small text | negative (-0.13px) | positive (0.065px) — tight tracking on dark crushes |

When asked to do "dark mode", design from scratch using dark-mode rules. Do not run a `--color-bg: invert()`.

## Layout & Composition

### The hero pattern (landing / marketing)

- Centered headline (60–80px), 4–6 word maximum
- Subhead beneath (18–22px), one sentence
- One primary CTA + at most one ghost secondary
- 120–160px bottom padding pulling toward the next section
- *Asymmetric* breaks the moment the user scrolls — center for impression, asymmetric for content

### Bento / masonry grids

When content has heterogeneous item sizes (features, projects, dashboards), reach for bento before reaching for a uniform grid:

- Card sizes vary deliberately (`1×1`, `2×1`, `1×2`, `2×2`)
- Gaps stay constant (`16–24px`) regardless of card size
- The largest card holds the hero feature; smaller cards orbit
- Each card has a single focal element (number, icon, image, headline) — not a paragraph

### Asymmetry & overlap

- Pin a smaller element so it crosses the boundary between two sections — gives the layout vertical pull
- Two-column layouts: lock one column to ~60% width, the other ~35% with a 5% gutter. Never 50/50 unless you're going *brutalist symmetry* on purpose.
- Overlap one card on top of an adjacent card by `16–24px` with a real shadow — adds Z-axis without parallax cost

### Density vs air — pick one

- **Airy** is the default for product / consumer / editorial: 80–120px between sections, 32–48px card padding. Use this when the design's job is to *invite*.
- **Dense** is the contrarian move for utility / dev tools / dashboards: 12–14px metadata everywhere, tight grid, two grays + one accent, monospace labels. Use this when the design's job is to *enable working fast*.

The middle ground ("medium spacing, medium density") reads as template. Pick a side.

## Brand & Identity Moments

These are the high-effort flourishes that elevate good design to memorable. Pick **one per design** — adding three competing identity moves makes a mess.

- **Wordmark with one custom move**: Reverie's calligraphic ligature, Publish's striped-fill rounded badge, Ten Forty Two's monospace capability list. Don't design a logo *icon* unless the brief demands one. A wordmark with a single visual idea is more memorable than yet another mark.
- **Custom cursor**: a small SVG cursor that matches the brand (a pixel arrow, a hand-drawn dot, a colored caret). Apply globally with `cursor: url(...) X Y, auto`. Highest-effort signal that someone designed every layer.
- **Distinctive empty state**: physics-based exploding letters on invalid input, slide-to-confirm gestures, hand-illustrated emptiness. Replace one default state with delight.
- **Custom pointer trails / cursor-following effects**: a subtle shape that follows the mouse with spring physics (see `emil-design-eng` for the spring config). On dark, it can paint light. On light, it can leave a soft tint.
- **Photography style commitment**: if the brief uses imagery, lock the photo direction. Soft natural light + warm tones + lifestyle composition. Coffee on the edge, hand entering frame, casual environment. Stock photography is a tell — render or illustrate before reaching for it.

## Microcopy & Density

- Headers: sentence case, never Title Case Everywhere ("Plan & billing" not "Plan & Billing")
- Eyebrows and metadata: never wide-tracked all-caps by default. Prefer `Brand identity · Phase 02`, `Due today`, or `3 invoices in flight` over `BRAND IDENTITY · PHASE 02`.
- Verbs over nouns on actions: "Restore service" not "Service restoration"
- Numbers in headlines: pair with a unit and let it breathe — "12.4M requests" not "12,400,000"
- Empty states: one sentence + one action. Never two CTAs.
- Skeletons: subtle pill bars in `gray/200` at `40–80%` opacity, varying widths (37px, 80px, 110px). Never identical lengths in a row — they read as fake.
- Body copy in long-form: always **left-aligned**. Never centered. Centered is for hero headlines and short callouts only.

## Wireframe → Design Translation Checklist

When given a wireframe and a problem, work through this in order:

1. **Pick a direction** (one sentence, see "Pick a Direction" above). Write it at the top of the file as a CSS comment so future-you doesn't drift. The direction picks the surface (true black? warm cream? off-white?), the typeface track (professional sans by default; serif/mono only if requested), and the layout posture (airy? dense? bento?).
2. **Map surfaces**: page bg, card bg, raised bg (popover/modal), inverted bg (dark sections inside light pages). Pick from references. Decide if grain texture is on or off.
3. **Lock the type pair**. Display + body. Set `font-feature-settings`. Set tracking per scale step. Decide if the hero uses the cliff (`72→16`) or a softer ramp.
4. **Build the color ramp**: 100/200/300/400/500/600/shade for accent, 100/200/400/500/600/900 for neutral, plus hairline + page + card. Decide whether the accent acts as a *light source* (tint borders, focus rings, hover glows) or only on CTAs.
5. **Pick the shadow stack** for elevated, the inner-highlight rule, the press inner-shadow, plus glow shadow if dark mode. Lock as CSS variables: `--shadow-quiet` (warm, for composer/prose chrome), `--shadow-action` (controls), `--shadow-card`, `--shadow-popover`. Chat bubbles stay flat.
6. **Lay out spacing on the 4/8/12/16/24/40 grid.** Decide airy vs dense and commit. Audit anything that's not on the grid.
7. **Set the layout posture**: centered hero or asymmetric split? Bento or uniform grid? Where do elements overlap?
8. **Place icons** (Phosphor, regular weight as default). Decide which are bold/fill for state.
9. **Write the badges and states**: dashed inactive → filled subtle → filled bold pattern.
10. **Pick one identity moment**: wordmark move, custom cursor, distinctive empty state, or photography style. Just one.
11. **Add the unseen details**: tabular figures, inline code chip styling, hairline 0.5px borders, brand-tinted shadows, 460-weight Inter (if used), inset top-edge highlight, grain overlay.
12. **Pass to `emil-design-eng`** for motion, transitions, hover/press feedback, easing curves, animation decisions.

## Output Format When Reviewing

When asked to review or upgrade a UI, return a markdown table:

| Area | Current | Move to | Why |
| --- | --- | --- | --- |
| Body text color | `#000000` | `#575858` | Pure black is harsh; gray/600 reads as ink, not screen |
| Card border | `1px solid #e5e5e5` | `0.5px solid #d8d8d8` + brand-tinted shadow ring | Hairline + tinted ring is the Antimetal move |
| Button shadow | `0 4px 12px rgba(0,0,0,0.1)` | three-stack with brand-tinted color | Single shadows look stock |
| Letter chip in MCQ | `1px gray border, white bg` | brand fill on selected (chip + row + border) | Three-tier coordinated state, not just one element |

One row per finding. Match the format Emil's skill uses.

## Anti-checklist (re-read before submitting)

- [ ] Did I pick a direction sentence and stick to it?
- [ ] Are colors picked from a ramp, not invented per-component?
- [ ] Is text `#000` or `#fff` only when the experimental direction calls for it (with grain + glow)?
- [ ] Are shadows brand-tinted and stacked — but **not** on assistant chat bubbles?
- [ ] Did assistant bubbles avoid `card-raised` + `shadow-action` (flat `card` + hairline only)?
- [ ] Are Usage/dashboard tiles `surface-card shadow-panel` (not `shadow-card` on every metric)?
- [ ] Are shadows applied via Tailwind `shadow-*` utilities from `@theme`, not deleted or replaced with extra borders?
- [ ] Are cards free of gradient `::before` rings and outer hairline borders (insets use `bg-paper-deep` only)?
- [ ] Did I add a grain overlay (2–4%) to the page surface?
- [ ] Are numbers tabular?
- [ ] Are letter-spacings set per scale step?
- [ ] Is there exactly one accent color doing the work — and is it acting as a light source, not just a button color?
- [ ] Did I commit to airy or dense (no medium)?
- [ ] Does the hero use a real scale cliff, not a gradual ramp?
- [ ] If using any serif: did the user explicitly ask for editorial, luxury, literary, or serif typography — and is the body sans paired well?
- [ ] Did I avoid Inter-as-default, Lucide-as-default, 8px-as-default, purple-blue-gradient-as-default, Tailwind-zinc-as-default?
- [ ] Are badges using the dashed/subtle/active three-tier pattern?
- [ ] Is there exactly one identity moment (wordmark / cursor / empty state / photography)?
- [ ] Did I pair this with `emil-design-eng` for motion?

If any of these are "no", don't ship the design.
