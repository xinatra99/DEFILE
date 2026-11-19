---
name: DEFILE
description: A restrained, evidence-first firmware research workbench.
colors:
  bg: "#0d0d0f"
  surface: "#111113"
  panel: "#161618"
  panel2: "#202023"
  line: "#2b2b30"
  line2: "#414148"
  fg: "#f5f5f7"
  fg2: "#d4d4d8"
  muted: "#a1a1aa"
  dim: "#666670"
  soft: "#bcbcc5"
  code: "#101012"
  accent: "#e4e4e7"
  accent-h: "#fff"
  accent2: "#b7bdc8"
  on-accent: "#171719"
  crit: "#fb777e"
  high: "#f5aa70"
  med: "#e4c575"
  low: "#7dd5a9"
  info: "#90bce9"
  severity-ink: "#18181b"
  light-bg: "#f5f5f7"
  light-surface: "#fff"
  light-panel2: "#ededf0"
  light-line: "#d8d8de"
  light-line2: "#afafb9"
  light-fg: "#1d1d1f"
  light-fg2: "#37373d"
  light-muted: "#62626c"
  light-soft: "#50505a"
  light-code: "#f1f1f4"
  light-accent: "#27272a"
  light-accent-h: "#09090b"
  light-crit: "#ba2537"
  light-high: "#a34d12"
  light-med: "#806010"
  light-low: "#247446"
  light-info: "#2b64a0"
typography:
  headline:
    fontFamily: "Inter, 'Segoe UI', Arial, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-.025em"
  title:
    fontFamily: "Inter, 'Segoe UI', Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-.025em"
  body:
    fontFamily: "'Segoe UI', Arial, Helvetica, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Segoe UI', Arial, Helvetica, sans-serif"
    fontSize: "13px"
    fontWeight: 500
  technical:
    fontFamily: "'Cascadia Code', 'SFMono-Regular', Consolas, 'Liberation Mono', monospace"
    fontSize: "13px"
    lineHeight: 1.7
rounded:
  r1: "4px"
  r2: "6px"
  r3: "8px"
  r4: "12px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.r2}"
    padding: "8px 16px"
    height: "40px"
  button-primary-hover:
    backgroundColor: "{colors.accent-h}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.fg2}"
    rounded: "{rounded.r2}"
    padding: "8px 16px"
    height: "40px"
  input:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.fg}"
    rounded: "{rounded.r2}"
    padding: "8px 11px"
    height: "40px"
  navigation:
    textColor: "{colors.muted}"
    padding: "7px 12px"
    height: "36px"
  chip:
    backgroundColor: "{colors.panel2}"
    textColor: "{colors.muted}"
    rounded: "{rounded.r1}"
    padding: "3px 7px"
  analysis-card:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.r4}"
    padding: "22px"
---

# Design System: DEFILE

## Overview

**Creative North Star: "The Graphite Research Workbench"**

A precise, quiet operating interface derived from the parent portfolio's monochrome surfaces and restrained typography. Neutral controls and small tonal steps let scan state, findings and technical evidence carry the visual emphasis.

Density serves investigation: compact history sits beside a readable report workspace, complete values remain available, and large displays gain capacity rather than oversized type. This records the implemented Stage 2A system, not a replacement proposal. Surface composition is recorded by the shipped implementation; source truth is `service/web/workbench.css`, `evidence.css`, `index.html`, `interface.js` and `workbench.js`.

**Key Characteristics:**
- Graphite and neutral light surfaces with semantic state color.
- Local semibold headings, system UI text and monospace evidence.
- Bordered, flat containers and restrained small-radius controls.
- Persistent scan context with locally contained overflow.

## Colors

### Primary

The pale neutral accent gives primary actions and active indicators a clear visual priority; its dark ink is a deliberate contrast pair. Light mode reverses that polarity. Secondary accent text supports syntax and technical presentation rather than a second brand color.

### Neutral

Background, shell surface, panel and raised panel form a close graphite progression. Foreground, secondary foreground, muted and soft text create readable hierarchy. Subtle lines separate regions; the stronger line defines controls. The dim token is used for inactive indicators, not ordinary body copy. Code has a distinct near-black surface.

The persisted keys are `midnight`, `ocean`, `forest`, `dusk`, `rose`, `nord` and `light`. The visible label for `midnight` is **Graphite**; do not migrate the storage key. Ocean, Forest, Dusk, Rose and Nord retain their theme-specific surface, text and accent overrides in the stylesheet. Light is neutral white and gray, with dark text. Its additional source overrides include dim, secondary accent and on-accent values; inherit the source rather than constructing themes from this default palette alone.

Severity is critical / high / medium / low / informational; status aliases are bad → critical, warn → medium, ok → low. Dark themes use light semantic text and dark ink on filled severity tags; light mode uses darker semantic colors and white tag ink. Subtle chips use semantic color mixed with transparency. Status labels, severity words and hardening abbreviations accompany color. Chart composition is deliberately desaturated; it must not redefine severity.

**The Semantic Color Rule.** Reserve severity and status colors for the meaning already attached to the underlying data; retain their text labels and theme-specific ink pairings.

## Typography

Headings use the locally served Inter semibold face (`/fonts/inter-semibold.woff2`, weight 600, swap loading); the copied font license remains part of the assets. UI text uses Segoe UI with Arial/Helvetica fallbacks. Evidence, paths, hashes and job identifiers use the technical monospace stack. The system is a compact role hierarchy, not a geometric type scale.

- **Headline:** the frontmatter headline role for report and dialog headings; report titles reduce to 22px below 900px and 20px below 600px.
- **Title:** the frontmatter title role; shell and submission headings use 17px, analysis panel titles 15px. Login branding uses 26px.
- **Body:** the frontmatter body role; finding descriptions use 1.7 line height and a 90ch maximum.
- **Label:** 13px for navigation, form labels and secondary UI; 12px for metadata and compact chips. Severity labels use 11–12px semibold. Small screens retain 14px finding titles.
- **Technical:** the frontmatter technical role for code/evidence, with 12px code on small screens. Body text remains proportional. Summary counts use Inter 24px; risk totals use 34px, reducing to 30px on phones.

**The Complete Value Rule.** Truncate only the compact overview; retain a full-value detail, selectable text, tooltip or existing drill-down for the technical value.

## Layout

The desktop shell has a 64px header and a two-column main region: fixed submission/history rail plus `minmax(0,1fr)` workspace. The rail and report content scroll independently. At the default 1920px viewport the rail is 352px and workspace padding 32px. At ≥2200px these become 384px and 40px; ≤1600px uses 328px and 24px; ≤1150px uses 300px and 20px. Dashboard panels use two columns, collapsing at ≤1150px; the mobile/tablet override restores two columns at ≤900px before stacking at ≤600px.

At ≤900px the header is 60px and a 56px scan toolbar replaces the persistent rail. The rail becomes a translated drawer, width `min(390px,92vw)`, under the header/tool strip. Its shade closes it; selecting a scan closes it; Escape closes the drawer or menu after higher-priority dialogs. Workspace padding is 24px, then 16px at ≤600px. Report tabs scroll horizontally on small screens. Summary counts use five columns at intermediate widths and three on phones.

The spacing primitives are the frontmatter 4–32px scale, with observed component-specific adjustments. Primary controls and fields have a 40px minimum; secondary navigation 36px; small inline controls 32px; hardening chips 24px. History action buttons are 30px. Login fields are 44px. These are minimums, not fixed clipping heights.

Tables scroll inside a full-width bordered region: general tables have a 720px minimum and the fixed-layout binary inventory 1280px. A ResizeObserver shows the horizontal-scroll hint and gives the region a Tab stop only when overflow exists. Long paths wrap or expose full values through existing actions; inventory columns retain a readable matrix. Do not remove local overflow to squeeze all columns into phone width.

## Elevation & Depth

The interface is flat at rest: borders and tonal layers carry depth. Although `--elevation` remains defined, final overrides remove shadows from settings dialogs, user menu and notifications. The open mobile drawer alone uses the structural side shadow (`16px 0 48px -20px #0008`) over its dark shade. Preserve this final cascade rather than restoring earlier declarations.

## Shapes

Controls use the six-pixel radius; small chips four; table and compact container edges eight; analysis panels, login and settings surfaces twelve. Borders are thin and neutral. Report tabs use square edges and a two-pixel active underline. Dots and the avatar retain circular silhouettes. Charts and progress tracks use compact rounded geometry, without decorative depth.

## Components

### Buttons and fields

Primary buttons use the accent/ink contrast pair; ghost buttons use transparent fill, neutral text and a line border. Hover raises neutral brightness or panel tone; active buttons move down 1px. Disabled buttons use 45% opacity and a blocked cursor. Fields use the background surface, stronger border and visible labels. Default control transitions are 150ms for color, background and border.

Keyboard focus uses a 2px accent outline with 3px offset; fields use a 1px offset. The skip link becomes visible on focus. Preserve semantic buttons and the implemented Enter/Space activation of history, finding headers, metric cards and chart drill-down rows.

### Navigation and scan context

Header navigation uses neutral segmented controls. Report tabs keep the selected scan and mark the active section with weight and underline. Selected history rows gain a panel fill and stronger border, plus `aria-current`. Mobile scan control exposes its expanded state. The report target is a short name with an expandable complete, selectable path and clipboard action; clipboard failure leaves a manual-copy message.

### Evidence, chips and tables

Findings combine labeled severity, title, metadata, triage and expandable evidence. On phones their header becomes a three-column grid with metadata and triage on separate rows. Technical evidence uses a code surface, readable line height and wrapped text; source previews scroll locally. Hardening cells keep fixed abbreviations and explicit on/partial/off/unknown states. Table path actions expose complete values without changing the data.

### Dialogs and feedback

Login uses a 440px card; settings use a 760px card with viewport-bounded height and internal scrolling. Their width is capped by available space. The active overlay receives dialog semantics, initial field focus and a Tab loop; background header, main and mobile toolbar become inert. Closing restores a visible trigger where available. Escape closes AI settings first, then the password dialog; it does not dismiss sign-in. Notifications remain bounded, use `role="status"` in the markup and clear after ten seconds. Motion is disabled under `prefers-reduced-motion: reduce`; existing progress/spinner animation otherwise indicates actual work.

### Integration and evidence boundaries

Keep the native embedded Alpine interface and authenticated Go API around the existing Python engine. Preserve views, endpoints, authorization, job/SSE protocol, report formats, persisted database/triage structures and engine algorithms. Present backend availability as reported; do not infer verified Ghidra, external CVE feeds or AI inference from a visual control. The portfolio is read-only visual reference and carries no deployment authorization.

Evidence is data, including literal escape sequences and Unicode. Preserve `x-text` for plain values and the existing escaping/tokenization boundary before syntax-highlighted `x-html`: both untouched text and captures pass through `escapeHtml`. Never decode, translate or rewrite protected evidence payloads as an interface polish step.

## Do's and Don'ts

### Do:
- **Do** extend the source theme tokens and retain all seven persisted theme keys.
- **Do** keep semantic state labels, visible focus and complete technical values available.
- **Do** contain wide evidence and tables inside their own scroll regions.
- **Do** preserve the native API, engine and evidence-encoding boundaries.

### Don't:
- **Don't** use severity colors as decorative brand accents.
- **Don't** enlarge desktop typography merely because the workspace is wider.
- **Don't** restore shadows removed by the final flat-surface overrides.
- **Don't** rewrite protected evidence, fabricate integration states or modify the portfolio during UI work.

Not canonized: existing text-glyph close/caret affordances are implementation debt, not an icon-system rule; source-only documentation does not assert an independent accessibility audit.
