---
name: Faiq Hilman Portfolio
description: A Treasure Planet star chart. A brass orb and emerald hologram in a fixed sky, with every section arriving as an engraved card that rises over it and lifts away.
colors:
  ground: "oklch(0.13 0.006 75)"
  ground-deep: "oklch(0.1 0.005 75)"
  card: "oklch(0.16 0.007 75)"
  ink: "oklch(0.95 0.012 80)"
  ink-soft: "oklch(0.85 0.016 80)"
  ink-faint: "oklch(0.7 0.022 78)"
  brass-hi: "oklch(0.9 0.09 88)"
  brass: "oklch(0.74 0.11 80)"
  brass-mid: "oklch(0.58 0.1 72)"
  brass-lo: "oklch(0.36 0.07 62)"
  gilt: "oklch(0.78 0.11 82)"
  plate-ink: "oklch(0.24 0.045 60)"
  verdigris: "oklch(0.62 0.09 170)"
  signal: "oklch(0.85 0.2 155)"
  ivory: "oklch(0.95 0.012 80)"
  ivory-card: "oklch(0.98 0.008 80)"
  ivory-ink: "oklch(0.19 0.014 68)"
  ivory-gilt: "oklch(0.47 0.1 66)"
  ivory-signal: "oklch(0.47 0.12 165)"
  banner-glaze: "oklch(0.08 0.005 75 / 0.62)"
typography:
  display:
    fontFamily: "Libre Caslon Display, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(2.75rem, 1rem + 3.9vw, 4.875rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Libre Caslon Display, Libre Caslon Text, Georgia, serif"
    fontSize: "clamp(2.25rem, 1.4rem + 2.6vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.015em"
  italic-accent:
    fontFamily: "IM Fell English, Libre Caslon Text, Georgia, serif"
    fontSize: "1.06em"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Libre Caslon Text, Georgia, Times New Roman, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "IM Fell English SC, Libre Caslon Text, Georgia, serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "0.05em"
rounded:
  none: "0px"
  hairline: "2px"
spacing:
  gutter: "clamp(20px, 6vw, 96px)"
  page: "1240px"
  nav: "92px"
  nav-compact: "72px"
  sheet-block: "clamp(80px, 9vw, 140px)"
  card-inset: "clamp(8px, 2.4vw, 40px)"
  passage: "120svh"
components:
  button-plate:
    backgroundColor: "{colors.brass}"
    textColor: "{colors.plate-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 26px 0 24px"
    height: "52px"
  button-rope:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.hairline}"
    padding: "0 22px"
    height: "52px"
  nav-cta:
    backgroundColor: "transparent"
    textColor: "{colors.gilt}"
    typography: "{typography.label}"
    rounded: "{rounded.hairline}"
    padding: "0 18px"
    height: "40px"
  nav-cta-hover:
    backgroundColor: "{colors.gilt}"
    textColor: "{colors.ground}"
  section-card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(80px, 9vw, 140px) 0"
---

# Design System: Faiq Hilman Portfolio

## Overview

**Creative North Star: "The Etherium Star Chart"**

The site is the chart from Treasure Planet, unfolded, and a voyage across it. The chart is a live WebGL sky fixed behind the whole page: a brass orb engraved with glyphs, wrapped in emerald hologram rings, projecting a career as a course plotted between stars. On the landing page nothing frames it. The copy sits on the open sky beside the orb, so the first screen is sky, not a picture of a sky.

Scrolling is the journey. Each section is a card that rises over the sky, carries its content and lifts away again. Between cards the page opens onto the sky, and in each gap the chart swings to a new station: a close-up of the orb before About, the career fixes turned to face you before Experience, the course from above before Projects, the whole chart from afar before Skills, the study fixes before Education and the last fix before Contact. Inside, every card keeps its own engraved plate: an armillary sphere, a graticule with a comet, a spiral galaxy, a radiant sun, a crescent moon and a planet rising under the closing call.

Content never becomes a table. Jobs are **ports of call**: each role is an engraved planet whose approach circle lights as you reach it, alternating left and right. Skills are an **orrery**: each set is a planet at the centre of a vast elliptical orbit, and every skill is a body pinned to the ring.

**Key Characteristics:**
- A fixed, frameless WebGL sky behind the whole page that shares the page ground in both themes
- Sections arrive as cards over the sky and lift away again, and the chart turns to a new station in every gap
- Brass is the material and emerald hologram light is the state: the two never swap roles
- Line-engraved plates (hatching, stipple, dashed orbits) behind every section, never flat fills
- Section cards are laid at 70%, so the chart keeps turning beneath them
- Period type: Caslon Display for headlines, IM Fell italic for the accent word, Fell SC for labels
- Obsidian by default and ivory in the light theme, the grounds of the original site, under its gilt tile banner

## Colors

### Primary
- **Brass** (`brass-hi` → `brass-lo`): the metal. It fills plate buttons, the orb and medals, always as a four-stop gradient, never flat.
- **Gilt** (`gilt`): brass used as ink. It draws hairlines, engraved planets, accent italics, figures and plate engravings (through `--art-ink`, gilt at 0.2–0.24 alpha).

### Secondary
- **Signal** (`signal`): the emerald hologram. It carries state only: the hero's *Future*, the Underway lamp, holo rings, reached approach circles and the active nav mark.

### Neutral
- **Ground** (`ground`, `ground-deep`): obsidian, a near-black with a trace of warmth, as on the original site. It is the page and the sky, and the WebGL clear colour is exactly this value. A barely-there haze (a little cobalt at the upper right, a smoulder of gold low left) keeps the black from going flat. It must never read as navy.
- **Card** (`card`, `ivory-card`): a slightly lifted obsidian (near-white ivory in the light theme), laid at 70% so the chart shows through. Each card redefines `--ground` as the tone it reads as over the sky, so everything inside that fills with `--ground` (plates' solid bodies, certificates, knockouts) sits flush with the card.
- **Ink** (`ink`, `ink-soft`, `ink-faint`): warm ivory whites for text, in three levels of emphasis.
- **Ivory theme** (`ivory`, `ivory-ink`, `ivory-gilt`, `ivory-signal`): the light theme swaps in an ivory ground, sepia-black ink, deep gilt and a darker verdigris signal. CSS glows switch off. The chart keeps its full presence by day: its lines turn to verdigris ink at about twice the night alpha, the unit rings and limb carry a soft emerald halo, and the sky gets stars printed in ink (sepia, a quarter verdigris, the brightest with four engraved rays) over a faint verdigris and sepia foxing.
- **Banner glaze** (`banner-glaze`): the smoked black laid over the running head's tile frieze, 0.62 to 0.82 alpha top to bottom (0.52 to 0.74 in the light theme).

### Named Rules
**The Material/State Rule.** Brass is what things are made of; emerald is what they are doing. Never use emerald as decoration or brass to signal state.

**The Local Ground Rule.** There are two grounds, the sky's and the card's, and every surface fills with whichever `--ground` it sits on. A card redefines `--ground` for everything inside it. Seams come from two near-identical darks on one surface, so a surface only ever has one.

**The Night Banner Rule.** The running head is a night band in both themes. It carries its own night ink (ivory links, gilt, emerald) and never inherits the light theme's.

## Typography

**Display Font:** Libre Caslon Display (with Libre Caslon Text, Georgia)
**Body Font:** Libre Caslon Text
**Label/Accent Fonts:** IM Fell English (italic accents), IM Fell English SC (labels, nav, buttons)

**Character:** An 18th-century atlas: engraved Caslon capitals, one Fell italic word per headline, and small caps for every label.

### Hierarchy
- **Display** (400, `clamp(2.75rem, 1rem + 3.9vw, 4.875rem)`, 1.0): the hero headline only.
- **Headline** (400, `clamp(2.25rem, 1.4rem + 2.6vw, 3.75rem)`, 1.04): section titles, each with one Fell italic word in gilt.
- **Title** (400, `clamp(1.75rem, 1.3rem + 1.2vw, 2.5rem)`): port names. Orbit titles run up to 1.875rem.
- **Body** (400, 1.0625rem, 1.65): prose, capped at 66ch.
- **Label** (Fell SC, 0.9375–1.1875rem, 0.05–0.06em tracking): dates, figure captions, nav, buttons.

### Named Rules
**The One Italic Rule.** Each headline gets exactly one Fell italic word, and that word carries the colour: signal in the hero, gilt everywhere else.

## Layout

A single 1240px measure with a fluid gutter (`clamp(20px, 6vw, 96px)`, `clamp(18px, 5vw, 88px)` inside cards). The page is a stack of cards and passages over a fixed sky.

- **Sky:** `.sky` is fixed at 100lvh behind `main` and holds the canvas and the fix labels. `main` passes the pointer through to it everywhere except over content, so the orb can be turned from any open stretch of sky.
- **Hero:** 12-column grid, 100svh (700–1180px), with the copy on the open sky beside the orb. On wide screens it dissolves as you scroll away. Below 1100px it stacks: a band of sky under the nav for the orb, then the copy on its own ground, feathered at the top.
- **Passages:** empty, 120svh (100svh below 900px). Each turns the chart one station, starting as the card before it lifts and arriving as the next card rises.
- **Running head:** `--nav-h`, 92px (72px below 900px). Cards scroll up under it, and `scroll-margin-top` keeps anchors clear of it.
- **Cards:** `.sheet`, inset `clamp(8px, 2.4vw, 40px)` from the viewport, 1600px at most, with block padding `clamp(80px, 9vw, 140px)`, filled with `--card` at 70%. A `.sheet-art` plate sits behind the content at `z-index: -1`, masked from transparent to opaque over its first and last 12%.
- **Ports:** 13rem planet + text, alternating sides. 11rem planets below 1180px. Below 900px the planet sits on top and alternates left/right alignment.
- **Orrery:** 1000px and up, each set is an absolutely laid-out ellipse, positioned by `layoutOrrery()`. It falls back to a wrapped list if any label would collide or leave the bounds, and below 1000px it is always that list.
- **Breakpoints:** 1180, 1099, 1000 (orrery, in JS), 899, 719 and 560px.

## Elevation & Depth

The chart is flat; the cards float over it. Each section card declares one soft shadow, `0 40px 90px -30px` night in dark and `0 24px 60px -24px` sepia in light, plus an inset `--rule-faint` hairline that holds its edge against the chart showing through. There is no blur anywhere: the chart reads through a card undiffused. The other declared elevation, `--elevation`, belongs to brass plates sitting proud of a card: the Particulars plate and the medals. Depth elsewhere comes from engraving (hatch density for shadow, dashed back halves of rings) and from emerald glow in dark theme only (`drop-shadow(0 0 3–5px var(--signal-glow))`).

### Named Rules
**The Engraved Shadow Rule.** Shade a body with hatching, not gradients. The only gradients allowed are the brass metal and the faint brass dome on port planets.

## Shapes

Sharp. Buttons are clipped octagons (plate) or 2px hairline rectangles (rope). Certificates use a 3px double rule with gilt corner brackets. Circles and ellipses belong to celestial bodies and orbits only.

## Components

### Buttons
- **Plate button** (`.plate-link`): a brass gradient clipped octagon with an inset hairline and Fell SC label in plate ink. On hover it brightens and the arrow travels 4px.
- **Rope button** (`.rope-link`): a hairline rule border and ink label. On hover both turn gilt.
- **Nav CTA** (`.nav-cta`): a gilt outline that fills gilt on hover.

### Cards / Containers
- **Certificate** (`.cert`): ground-filled, 3px double rule and gilt corner brackets. It is opaque so it lies over the plate engraving like paper on a chart.

### Navigation
- **Running head:** the house banner restored from the original site. The gilt tile frieze (`/symbol-horizontal-nav.jpg`, a crop of the tile band) repeats across it under the smoked banner glaze, with darker ends and a gilt hairline beneath. Once scrolled the frieze eases in slightly and the rule and shadow deepen. The circular seal sits at 36px. Fell SC links, and the active section is marked with a signal dot.

### Port of call (signature)
An engraved planet (`portPlanet(i)`) with a dashed approach circle that slowly turns and lights emerald as you reach it. Beside it: dates, a Caslon title, a gilt Fell role, remarks, diamond-bullet highlights and gilt figures. There are no table rules.

### Orrery (signature)
A planet glyph with an orbiting moon, the set title and "N bodies", centred in a dashed ellipse. Skills are ring-mounted bodies with hairline stems, revealed in sequence.

### Journey (signature)
Cards rise over the fixed sky, scaling up 6% from their top edge, and lift away, scaling down 6% and fading toward their bottom edge. Scroll drives both, and they animate transform and opacity only. In the passages the chart eases to its next station: its position, distance and tilt, plus a yaw that turns that station's fixes to face the reader while their labels fade in. While a card covers the whole viewport the chart keeps turning beneath it at about 30fps, and its fix labels step back so their lettering never sits under the card's text.

## Do's and Don'ts

### Do:
- **Do** fill every surface with the `--ground` it sits on: the sky's on the page (including the WebGL clear colour), the card's inside a card.
- **Do** draw plates as line engraving in `--art-ink`, masked at section edges.
- **Do** keep emerald for state and brass for material.
- **Do** give every headline one Fell italic word.
- **Do** honour reduced motion: cards hold still, the chart jumps straight to each station, plates and moons stop, and reveals show at once.

### Don't:
- **Don't** frame the hero or give it a border or panel. The sky is the page.
- **Don't** lay experience or skills out as tables or ruled grids.
- **Don't** use flat fills or brass dome washes on background plates.
- **Don't** let plates sit behind dense text at full strength: keep `--art-ink` at 0.2–0.24 alpha.
- **Don't** round the cards or give them more than their hairline and one shadow, and don't use gradient text.
- **Don't** make the cards opaque or frost them: 70%, no blur, so the chart stays visible.
- **Don't** let the dark ground drift back to navy. Obsidian is the house colour.
- **Don't** put content in a passage. The gaps belong to the sky.
