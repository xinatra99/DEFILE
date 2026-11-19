# Stage 2A implementation and verification

Implemented locally on November 19, 2026 against the accepted
`2.8.0+defile.2` baseline. The existing embedded Alpine application, Python engine
and Go architecture remain in place. No framework or runtime dependency was added.

## Interface changes

The parent portfolio's actual source and running site guided the charcoal,
graphite, soft-white and neutral-light palette. The workbench now has consistent
typography, spacing, borders, controls, tables, status labels and dialogs. Existing
theme keys remain intact; the monochrome default is labelled Graphite.

Submission has a visible target label, separate Analyze/Upload actions, extraction
availability and expandable analysis options. History remains beside the report on
desktop and becomes a drawer on tablet/mobile. Scan context uses a short filename
with expandable complete path and copy action. Report navigation and exports keep
their established workflow.

Findings have clearer filters, readable evidence, shortened group paths and
deliberate mobile metadata rows. Triage changes immediately refresh audit history.
Inventory retains every column; wide tables scroll locally with a visible hint.
Settings have visible field labels, keyboard focus containment, Escape handling
and focus return. Authentication, loading, empty, error, running and stopped states
share the same visual system. Destructive actions retain confirmations.

`workbench.css` owns the shared system, `evidence.css` the technical data surfaces,
`workbench.js` the existing application logic and `interface.js` DOM accessibility.
They are served through the existing embedded-file mechanism. Local heading font
assets retain their license. [DESIGN.md](DESIGN.md) and `.impeccable/design.json`
record the implemented tokens and reusable components.

## Actual verification

| Check | Result |
|---|---|
| Desktop views | Inspected 1920×1080, 2560×1440, 1440×900 and 1366×768. At 1920, the representative dashboard's complete main breakdown fits within the viewport. |
| Tablet/mobile | Inspected 768×1024 and 390×844. Drawer selection, contained table scrolling and finding investigation work; document width matched viewport width at all six sizes. |
| Themes and contrast | All seven saved themes work. Measured body contrast 10.8:1 or greater and secondary text against panel 6.0:1 or greater. This is not a comprehensive accessibility certification. |
| Core browser workflows | Real search, keyboard finding expansion, all four triage actions, file preview, three inventory pagers, all inventory/string screens, dictionary administration, comparison, settings CRUD and validation, path copying, single/bulk deletion and logout passed. |
| Real jobs | A harmless long-named ELF upload completed with one binary/two findings. Moria extraction returned two usable regions; region analysis completed with one binary/six findings. A real multi-Bash job exercised progress, logs, Pause, Resume and Stop. |
| Downloads | Browser JSON/Markdown each had six findings; Markdown retained confirmed triage. CycloneDX 1.5 downloaded correctly. Filtered JSON and parsed CSV each contained all 303 rows. All three report formats returned 401 after logout. |
| Regression suites | Python: 73 passed, 8 skipped. Go: 100 passed. Node: 8 passed. Go vet/build and JavaScript syntax checks passed; 1,192 Alpine expressions compiled. |
| Integrity | All 71 recorded engine/backend/package/legal source files remained byte-identical. Authenticated API, report and database contracts were preserved. Portfolio source was read only. |
| Final browser checks | Zero page/Alpine errors after corrections. No missing static assets observed. Polling connection refusals during intentional server restarts were retained in the private evidence as expected interruption events. |

Review discovered and corrected clipped group headings, squeezed mobile finding
metadata, overlapping binary columns, poor CVE badge contrast, excess dashboard
height, missing visible model/token-limit labels, preview/focus semantics and an
unguarded optional extraction-warning field. The independent review scored all
eight material fixes **resolved** and returned **ship** for that scope. A few
unsettled screenshots were rejected and recaptured before approval.

The documentation helper stopped at a usage limit after writing the guide; its
remaining metadata was completed and checked in the main task. Mechanical detector
advisories were reviewed: actual Alpine-bound images and padded table cells were
retained; portfolio typography and live-only progress indicators are intentional.

## Screenshots and evidence

Historical validation captures are retained privately. The public release instead
includes [sanitized Live screenshots](docs/screenshots/README.md) showing the current
shared workbench with approved educational records.

Additional viewport, state and before/after captures, browser results, downloaded
reports and integrity manifests remain private under `.validation/stage2a/`.

## Local startup

For a fresh Linux/macOS/WSL installation, follow the independent
[README](README.md). From the source root with dependencies installed and the
virtual environment active:

```bash
sh service/start.sh
```

Private workstation launchers and runtime images are not part of the public
distribution. Keep the existing data path when upgrading. Broad feed configuration
is documented in [ENVIRONMENT.md](ENVIRONMENT.md).

For an existing Linux/WSL installation with dependencies available, from the source
directory:

```bash
. .venv/bin/activate
cd service
go build -buildvcs=false -o defile-service .
./defile-service -addr 127.0.0.1:8080 -core .. -data /absolute/path/to/existing/data
```

## Remaining limits

Live Ghidra decompilation, populated external CVE feeds and genuine AI inference
retain the Stage 1 verification limits. AI settings/connection were checked with
the explicitly labelled local protocol fixture, with no paid inference. No new
research feature, standalone call-graph viewer or public demonstration was built.
No portfolio edits, Git commits/branches, remote changes, push or deployment occurred.
