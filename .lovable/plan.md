# Harp product website

## Goal
Build a professional, multi-page product site for **Harp**, a free Electron desktop video downloader for Windows, macOS, and Linux. The site will present the real product clearly, establish trust, explain supported sources and workflows, and make downloads the dominant action.

## Visual direction
- Apply the supplied Bench system literally: semantic light/dark tokens, automatic system theming, one Apple-style UI family, monospace for technical data, precise radii, Lucide 1.5px icons, and no decorative gradients or “AI SaaS” effects.
- Keep permanent page surfaces opaque; reserve 24px-blurred glass for temporary mobile navigation and download selection surfaces only.
- Use `accent.signal` only for actions and selected states; use `accent.material` only for physical or technical values.
- Create a distinctive product-first opening: Harp’s name, direct value statement, OS-aware free download action, supported-platform strip, and a large, carefully composed preview of the actual desktop workflow rather than stock imagery.
- Use restrained spring motion only in response to interaction, with reduced-motion fallbacks and no looping decoration.

## Pages and content
1. **Home**
   - Product statement and OS-aware “Download for …” action with “All platforms” fallback.
   - Desktop app preview showing URL intake, format/quality selection, progress, and completed output.
   - Supported-source presentation for YouTube, Instagram, TikTok, X, Reddit, Facebook, Watchseries, Coomer, and local streams.
   - Focused proof sections for format control, episode selection with metadata, stream handling, and local processing.
   - Privacy/trust statement that avoids unsupported claims.
2. **Features**
   - Detailed workflows grouped by standard downloads, series/episodes, archive sources, and local network streams.
   - Technical capability notes for yt-dlp, Chromium-assisted extraction, and ffmpeg handling, framed as product behavior rather than implementation marketing.
3. **Supported sites**
   - Searchable/scannable compatibility directory with platform, supported workflow, and relevant limitations.
   - Clear legal-use notice: users are responsible for permissions and platform terms.
4. **Download**
   - Separate Windows, macOS, and Linux download panels with architecture/package metadata slots, system requirements, version notes, and checksum locations.
   - Download links will be centralized in one configuration object. Until real installer URLs/version details are supplied, controls will show an honest unavailable/coming-soon state rather than fake downloads.
5. **Documentation**
   - Getting started, choosing quality/format, episode selection, local streams, output location, and troubleshooting.
   - Sidebar navigation on desktop and compact navigation on mobile.
6. **Privacy and Terms**
   - Separate, concise legal pages with clearly marked draft language where product policy details have not been provided.

## Shared experience
- Build a consistent responsive header and footer across all pages, with a prominent Download action.
- Use accessible landmarks, keyboard navigation, visible focus states, proper labels, and sufficient contrast in both themes.
- On narrow screens, use a compact top navigation and a glass download sheet only when invoked.
- Add unique titles, descriptions, Open Graph text, and Twitter card metadata for every page.

## Technical implementation
- Define the supplied color, typography, geometry, shadow, spacing, and motion values centrally before page work; page code will reference semantic names only.
- Use TanStack Router pages for `/`, `/features`, `/supported-sites`, `/download`, `/docs`, `/privacy`, and `/terms`.
- Use the existing Tailwind v4 and shared UI primitives; add Motion for React for the specified spring behavior if needed.
- Create focused reusable pieces for navigation, download controls, platform/source rows, app preview, technical metadata, and temporary glass surfaces.
- Keep this website frontend-only for now: no account system, payment flow, database, or fabricated release API.

## Validation
- Verify every route, navigation target, download state, theme, keyboard path, and mobile/desktop layout in the running preview.
- Check that content does not overlap, product controls remain stable, reduced-motion is honored, and there are no browser errors.
