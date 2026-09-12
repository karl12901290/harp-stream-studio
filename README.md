# Harp Stream Studio

using this design language : continue please  (Bench — Design & Motion System

A handoff spec for implementation by AI coding agents. Every value below is a literal token — copy it into code as-is rather than reinterpreting it. Where a decision needed a reason, the reason is next to it, so an agent extending the system later can stay consistent instead of guessing.

This spec evolves the earlier flat "spec-sheet" prototype (bench-configurator.html) toward an Apple-inspired direction. What changes and why:

One type family for UI, not three. The prototype used a display face (Space Grotesk) for personality. Apple's actual approach is the opposite: one family (San Francisco) carries every level of hierarchy through weight and size alone. That reads as more considered, less "designed," which is the point. Section 1.3 keeps the monospace as a second family — that one stays, because tabular data alignment is a functional need, not a personality choice.

Materials replace flat panels. Floating/temporary surfaces (mobile summary sheet, modals, the conflict callout) now use translucency and blur instead of a flat card. Persistent layout surfaces (the main three-pane layout) stay opaque — glass is for things that come and go, not for the whole app.

Spring motion replaces CSS ease curves. The prototype used simple ease/cubic-bezier transitions. This spec specifies actual spring physics (mass/stiffness/damping) with CSS fallbacks, because spring settling is the specific thing that makes Apple's motion feel physical rather than animated.

Corner geometry, iconography, and elevation are now specified precisely — the prototype left these implicit.

0. Philosophy

Three working principles, applied concretely:

Clarity — content is the interface. Chrome (borders, dividers, backgrounds) exists only to separate meaning, never to decorate. If a hairline isn't disambiguating two different things, remove it.

Deference — the UI gets out of the way of the parts data. No gradients, no illustration, no decorative color. Color is reserved for state (selected, conflicting, warning) — it always means something.

Depth — hierarchy comes from real optical properties (blur, translucency, subtle shadow) applied to a small number of surfaces, not from shadows on every card. Depth is used to say "this is temporary/floating" vs "this is the page," not to make things look expensive.

1. Foundations

1.1 Color — semantic tokens (light + dark)

Reference only these token names in code. Never hardcode a hex value in a component.

Token Light Dark Usage surface.base #F5F5F2 #17181A App background surface.raised #FFFFFF #1E2022 Cards, panels, opaque surfaces surface.glass rgba(255,255,255,0.72) rgba(30,32,34,0.60) Floating/temporary surfaces only — see 1.2 content.primary #16181A #F2F2F0 Primary text content.secondary #6B6F73 #9A9D9F Secondary text, labels content.tertiary #9A9D9F #6B6F73 Placeholder/disabled text border.hairline #DEDDD7 rgba(255,255,255,0.08) 1px separators accent.signal #3654FF #6E85FF Interactive/selected state — the one accent used for action accent.material #B8703C #D08A52 Secondary accent, physical-spec emphasis only (never for interaction) status.success #1F8A57 #3FBE82 Compatible / resolved status.warning #B8791E #D9A03D Runs hot / cutting it close status.critical #D64526 #FF6B52 Hard incompatibility

Rule: accent.signal is the only color that means "you can act on this or you did." accent.material never appears on interactive elements — it's reserved for surfacing a physical spec value (e.g., highlighting a wattage or clearance number), so the two accents stay semantically distinct instead of competing.

Theming must follow prefers-color-scheme automatically. No manual light/dark toggle unless explicitly requested later.

1.2 Materials

Two, and only two, surface types:

Base (surface.base, surface.raised) — opaque. Used for the persistent three-pane layout: category rail, main panel, part cards.

Glass (surface.glass) — translucent, backdrop-filter: blur(24px) saturate(180%), 1px border using border.hairline at 1.5× opacity to simulate a lit edge. Used only for surfaces that appear/disappear: the mobile build-summary sheet, any modal, the conflict-detail popover. Never apply glass to a surface that's part of the permanent layout — that's what makes it read as "floating" rather than decorative.

Elevation is expressed through this base/glass distinction plus one shadow token, not a shadow scale:

shadow.float: 0 8px 30px rgba(0,0,0,0.12) — applied only to glass surfaces, never to base cards.

1.3 Typography

One UI family, one data family:

UI text: -apple-system, BlinkMacSystemFont, "Inter", sans-serif — every weight and size below comes from this single family.

Data (numbers, specs, prices): "SF Mono", "JetBrains Mono", monospace — used wherever a number needs to align in a column or be scanned quickly. This is the one deliberate exception to "one family," and it's functional: tabular figures need fixed-width digits.

Type scale:

Token Size / Line-height Weight Family Usage display 34 / 40 600 UI Rare — a single hero number (e.g. final build total on a summary screen) title-1 26 / 32 600 UI Category headline title-2 20 / 26 600 UI Panel section headers headline 16 / 22 600 UI Card titles, row names body 15 / 22 400 UI Descriptive copy, helper text callout 14 / 20 500 UI Secondary emphasis, buttons subheadline 13 / 18 400 UI Card specs, metadata footnote 12 / 16 400 UI Labels, captions data-lg 20 / 24 500 Mono Total price data-md 15 / 20 500 Mono Card price, row price data-sm 12 / 16 400 Mono Inline spec numbers inside body text

Hierarchy comes from weight and size only — never from switching typefaces for "personality." That restraint is the Apple tell, more than any individual color or radius choice.

1.4 Spacing & grid

4px base unit: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64.

Desktop layout: fixed three-pane grid — 220px category rail / fluid main panel / 340px build summary. Below 900px, collapse to a single column: rail becomes a horizontal scroller pinned to the top, summary becomes a glass sheet (see 1.2) that docks to the bottom and expands on tap rather than sitting inline.

1.5 Geometry — corner radius

Token Value Usage radius.sm 10px Chips, badges, small controls radius.md 16px Cards, rows radius.lg 24px Panels, modals, glass sheets radius.pill 999px Buttons, status chips

If the implementation target is native (SwiftUI/Electron with native chrome) rather than plain web CSS, use continuous corner curves (cornerCurve: .continuous / superellipse) at these radii instead of circular arcs — that's the actual geometric detail that makes Apple's corners look "soft" rather than "rounded." On plain web CSS, standard border-radius is the acceptable fallback; there's no native continuous-corner primitive in CSS.

1.6 Iconography

Single-weight stroke icons, 1.5px stroke, optically balanced (not a fixed pixel grid — verify each icon looks equally "heavy" next to the others). Use a consistent open-source stroke set (Phosphor or Lucide, "regular" or "thin" weight, not mixed) rather than Apple's own SF Symbols, which is Apple-proprietary. Never mix filled and outlined icons in the same context.

2. Motion System

2.1 Principles

Motion always responds to something the person did. Nothing loops or plays on load.

Everything springs — nothing eases linearly. A spring implies mass and settling, which is what separates "physical" motion from "animated" motion.

One motion vocabulary, reused everywhere. Four tokens cover the whole app (2.2). An agent adding a new interaction should reach for one of these four before inventing a fifth.

2.2 Tokens

Each token is given as a native spring (for Framer Motion, SwiftUI, or any physics-based animation system) and as a CSS fallback (for plain CSS transitions where no spring library is available). Use the native spring wherever the implementation stack supports it — the CSS version is an approximation, not the preferred form.

Token Native spring CSS fallback Use for motion.snap stiffness 320, damping 26, mass 1 (slight overshoot) cubic-bezier(0.34, 1.56, 0.64, 1), 220ms Immediate UI feedback: selection state, toggle, stepper dot motion.glide stiffness 210, damping 28, mass 1 cubic-bezier(0.22, 1, 0.36, 1), 380ms Panel/view transitions, layout reflow, meter fills motion.settle stiffness 160, damping 30, mass 1.1 cubic-bezier(0.16, 1, 0.3, 1), 480ms Structural changes: modal/sheet open, conflict line draw-in motion.instant — (opacity/color only, no spring) ease-out, 120ms Pure fades: color changes, text swaps with no movement

2.3 Interaction specs

Named interactions, so every agent implements the same one the same way:

Selecting a part — card scales 0.98 → 1 on motion.snap; selected border/tint fades in on motion.instant. A small indicator travels from the card to its row in the build summary along a curved path, using motion.glide. This is the one signature "showpiece" moment in the product — it does not also appear anywhere else, so it stays memorable instead of becoming wallpaper.

Switching category (stepper) — main panel content cross-fades and shifts 8px on motion.glide; the active stepper dot changes scale and color on motion.snap.

Conflict appears — the connector line between the two conflicting rows draws in via stroke-dashoffset animating its own path length to 0, on motion.settle. Affected rows transition their border color on motion.snap.

Conflict resolves — the line retracts/fades on motion.glide; borders return to neutral on motion.snap.

Wattage meter updates — bar width transitions on motion.glide; the color crossfade (success → warning → critical) runs on motion.snap, so the color reacts faster than the bar finishes moving.

Content becomes available (initial load, search results) — no skeleton shimmer. Items fade in on motion.instant, staggered 40ms apart, capped at the first 5 items so a long list doesn't visibly "type itself in."

Glass sheet or modal opens — the sheet's transform (slide up) and the backdrop blur's opacity animate together on motion.settle, so they finish at the same moment rather than one lagging the other.

2.4 What never animates

Hover states on non-interactive elements.

Any decorative loop (pulsing dots, breathing glows) used purely to indicate "this is alive."

Every number ticking on every change — reserve digit-roll treatment (P2, optional) for the single total-price figure only, never for every row price simultaneously.

3. Component Architecture

For each component: purpose, states, and which motion token governs its transitions — enough for an agent to build it without re-deriving the interaction design.

Component States Motion Accessibility note CategoryStepper default / active / filled / conflict motion.snap on state change Implement as a tab list (role="tablist", each item role="tab"); arrow-key navigation between items PartCard default / hover / selected / flagged motion.snap (select), motion.instant (hover) Cards in a category act as a single-select radio group — role="radiogroup" / role="radio", not plain buttons BuildSummaryPanel — (container) motion.glide for row reflow Wraps SummaryRow list, ConnectorOverlay, WattageMeter, StatusChip SummaryRow empty / filled / trouble motion.instant on trouble-state border — ConnectorOverlay hidden / drawing / shown motion.settle draw-in, motion.glide retract Purely visual — pair with a text-equivalent issue list for screen readers, never convey a conflict through the line alone WattageMeter ok / warning / critical motion.glide (width), motion.snap (color) Expose the numeric wattage as text alongside the bar, not just as a fill percentage StatusChip compatible / n-conflicts motion.instant aria-live="polite" region — announce conflict count changes to screen readers GlassPanel — (wrapper for any floating surface) motion.settle on mount/unmount Traps focus while open; returns focus to the triggering element on close

4. Handoff notes for your agents

Put the token tables (1.1, 1.3, 1.5, 2.2) into a single tokens.css (custom properties) or tokens.ts (exported constants) file first, before any component work starts. Every component references tokens by name — an agent should never see a raw hex, px, or ms value inside a component file.

If the stack has a spring-physics animation library available (Framer Motion on React, native withSpring on SwiftUI/React Native), use the native spring column in 2.2. Only fall back to the CSS cubic-bezier column if the target is plain CSS with no JS animation library.

Reference bench-configurator.html as the structural/interaction reference (layout, compatibility-engine behavior, which things animate) — this spec changes how those interactions feel, not what they do.

Build order that keeps agents from thrashing: tokens → base components (PartCard, SummaryRow) → ConnectorOverlay (hardest — depends on other components' final DOM positions) → glass surfaces last, since they're the least structural and easiest to bolt on once the base layer is solid.)   , waht to build a website to present and making our product downladable or seeling it .....ect  , such as https://kiro.dev/  , so my app now is a desktop app named harp is a Harp is an Electron desktop app — a video downloader that supports a bunch of platforms:

YouTube, Instagram, TikTok, X (Twitter), Reddit, Facebook

Watchseries (with TMDB metadata and episode picking)

Coomer (via Kemono API)

Local network streams (LAN/localhost)

Under the hood it uses yt-dlp for most platform downloads, Playwright/Chromium for scraping, and ffmpeg for stream handling. The UI is built with Vite + TypeScript + Tailwind v4, packaged as an Electron app.

The "harpelec" folder name is just shorthand for "harp + electron".  , want something profetional (no AI Slop please)

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b4938c3a-d259-40d5-9da9-e2414731c0f9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
