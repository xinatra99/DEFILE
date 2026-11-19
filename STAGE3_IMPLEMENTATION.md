# Stage 3 implementation and verification

DEFILE Live is a locally implemented, interactive static edition of the Stage 2A
workbench. DEFILE Full retains its authenticated Go service and Python engine.
Nothing was committed, pushed, published or configured on GitHub or Vercel.
The parent portfolio's tracked files were not changed.

## Delivered implementation

The static builder reuses the existing HTML, JavaScript, styles, fonts and vendored
Alpine runtime. A separate bootstrap and immutable in-memory adapter supply the
existing view contracts. Shared source changes add optional transport/storage/URL
hooks with the original Full defaults. A null-safe AI view getter also corrects a
scan-switch teardown error found during browser testing. Backend routes, schemas,
analysis algorithms and authentication were not changed for Live.

Visitors can navigate all existing major areas, inspect real evidence, search,
filter, sort, paginate, compare the original and hardened samples, inspect actual
extraction regions and completed process logs, and download recorded or filtered
reports. The larger fixture exercises 305 findings and files, and 101 binaries.
Appearance and dictionary changes remain scoped to the current browser session.

Three engine-generated reports contain 5, 1 and 305 findings. Actual Moria output
contains two usable regions. Public samples come from project-authored educational
C/filesystem fixtures, with synthetic OpenSSL banners disclosed as matching test
signals. No vendor firmware or executable is shipped. Private recording paths are
sanitized and finding IDs re-keyed. JSON, Markdown and CycloneDX outputs preserve
sample provenance. The original Apache license and attribution notices remain.

Ghidra pseudocode and AI investigation notes are explicitly authored illustrations.
Neither tool was run for those views. CVE intelligence uses genuine public records
and three reviewed affected-range rows; its checker catalogue is recorded metadata.
Persistent labels and hover/focus/touch explanations disclose these boundaries.
Unavailable actions explain their requirement for Full, without fake execution,
success states, uploads, live progress, provider requests or database updates.

## Verification

| Check | Executed result |
|---|---|
| Full Python regression | 73 passed, 8 skipped |
| Full Go regression | 100 passed; vet and build passed |
| JavaScript regression and Live bundle | 17 passed |
| Independent Full browser run | Authenticated session; forced uncached Python analysis completed with 6 findings; Live transport absent |
| Live browser workflows | Navigation, inventories, filtering, paging, real comparison, file inspection, extraction, logs, reports and blocked controls checked |
| Download validation | Recorded JSON contains 5 findings; Markdown/SBOM downloads valid; filtered export includes all 305 matching records |
| Integration disclosure | Ghidra, CVE and AI hover, keyboard focus and touch explanations verified; authored-origin labels visible |
| Responsive browser checks | 1920×1080, 2560×1440, 1440×900, 1366×768, 768×1024 and 390×844; no document-level horizontal overflow |
| Static separation | Browser traffic contains no Full/API/health requests; privileged endpoints do not exist on the static host |
| Privacy and compatibility | Whitelisted bundle audit; no runtime data, private paths, credentials or executables; 71 protected backend/engine files match their Stage 3 starting hashes |
| Design review | Existing design system retained; comparison selection labels corrected after review; finish review disposition: ship |

Python skips cover unavailable cross-compilers, live Ghidra and an external CVE
feed. These remain explicit Full integration limits. Existing Moria, ordinary
static analysis and curated correlation were exercised; no paid AI calls were made.
Local browser evidence, logs and protected-file hashes are kept under the excluded
`.validation/stage3` directory and other private validation folders.

## Problems encountered and corrected

- Windows-mounted fixture permissions produced unrelated hardening findings;
  recordings were regenerated on the native ext4 runtime with correct permissions.
- Switching away from AI cleared the view object before Alpine finished teardown;
  a safe view getter now handles that state and has a regression test.
- Comparison results loaded while native selectors still displayed placeholders;
  selection values are reapplied after the lazily mounted options exist.
- Static hosting lacks the Full service's download headers; explicit download
  attributes now make the recorded JSON, Markdown and SBOM links download correctly.
- Refreshing directly into AI initially omitted its recorded notes; bootstrap now
  explicitly loads that view's data before continuing.

## Build, output and preview

Run from the DEFILE project directory with Node.js 20+:

```bash
npm run build
npm run preview
```

Open **http://localhost:8081** with no login. Output: **dist/live**.
Packages: **dist/DEFILE-Live.zip** (static output) and **dist/DEFILE-source.zip**
(redistributable project source, excluding runtime/tools/validation).
Full remains separately available at **http://localhost:8080**, with its existing
account and private runtime. See [LIVE_DEMO.md](LIVE_DEMO.md) for Full installation,
data refresh and the intended future GitHub-to-Vercel procedure.

Remaining limits are deliberate: Live cannot analyze uploads, execute tools,
persist triage or administrative changes, synchronize CVE feeds or run inference.
Small educational samples do not represent the breadth of real firmware or all
possible tool outputs. BusyBox/service inventories retain honest empty states
when the fixture provides none. Full integrations still need their documented
local dependencies and configuration. Public deployment remains unauthorized.
