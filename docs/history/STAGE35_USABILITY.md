> Historical engineering record. For current installation and verification, use the [README](../../README.md) and [release report](../../RELEASE.md).

# Stage 3.5 usability and navigation refinement

DEFILE Full and Live retain the Stage 2A design and the Stage 3 distribution model.
This stage changes presentation and navigation around existing report data and
controls. It adds no analysis algorithm, endpoint, report field or external service.
Work remained local to DEFILE; the parent portfolio was not edited or published.

## Audit and corrections

The audit followed the research journey as both a technically capable first-time
visitor and an experienced firmware researcher. It inspected the running UI,
existing navigation/state, all report areas, extraction/log views and settings.
These are implementation walkthroughs, not a claim of an external user study.

| Observed problem | Implemented correction |
|---|---|
| Live led with Analyze/Upload controls that cannot execute | Sample-first introduction, searchable library and a purpose description for each sample; execution controls remain accessible under a labelled Full-only disclosure |
| Users had to know which file paths belong to the server | Full's submission area distinguishes server paths, uploaded binaries and extraction; it states that upload immediately starts analysis |
| Repeated `rootfs` names obscured the selected target | Descriptive sample names and parent/rootfs names, visible scan context and file count; complete paths and IDs remain available |
| Overview did not clearly connect to the next task | Direct Review findings, Inspect binaries and Download report actions |
| Global research tools displaced the report with no explicit return | Back to the previous report section, retaining the selected scan, filters and underlying event stream |
| Findings displayed locations but required manual navigation to supporting records | Direct links to existing binary/function metadata or text-file previews, with Back to finding preserving query and expansion |
| Function counts exposed little useful context | Read-only inspection of existing function addresses, sizes and imported calls, with search; no new function recovery or disassembly is performed |
| Export abbreviations were easy to overlook | Reports view with described Markdown, JSON and CycloneDX downloads; filtered exports remain in Findings |
| Integrations were scattered or buried in analysis options | Overview entry points for Ghidra, CVE and AI, retaining explicit Live preview labels and truthful Full availability |
| Ghidra's original-sample illustration replaced the visitor's research context | Back to previous context restores the originating scan, view, filters, grouping, pagination, expanded findings and focus |
| Confidence, hardening and static service inference invited overinterpretation | Concise context and hover/focus/touch explanations; inferred ports and heuristic evidence are distinguished from proof of exploitation |
| Mobile tool navigation relied on unlabeled icons | Compact labelled tool row, preserving keyboard access and the existing monochrome system |
| Comparison required choosing cryptic records and could include non-report jobs | Labelled baseline/new selectors, sensible defaults and exclusion of extraction/timeline records from report comparison |

The existing inventories, string workflows, triage, configuration, execution
controls, comparison details and exports remain available. Evidence text and
identifiers are preserved. Binary inspection displays only metadata already in
the analysis report; it does not invent pseudocode, instruction streams or a
call-graph viewer.

## Implemented boundaries

Full continues to use authenticated API calls, SSE and its private persistent
runtime. Opening a workspace tool now leaves the event stream intact so ongoing
analysis can continue updating while another view is open. Returning to the report
does not reset filters or launch another analysis.

Live continues to use the immutable in-memory adapter and same-origin static assets.
Sample results and extraction/process records are genuine precomputed output.
Ghidra pseudocode and AI responses remain explicitly authored illustrations.
CVE references remain curated; no live feed synchronization or inference is added.
Unavailable actions explain their limits and do not report fabricated success.
Session dictionary/preferences remain separate from Full.

Only the shared web HTML/CSS/JavaScript, isolated Live bootstrap styling, regression
tests and documentation were changed. All 71 protected engine/backend files match
their Stage 3.5 starting hashes. API and report contracts remain unchanged.

## Browser verification

Headless Microsoft Edge exercised actual UI controls in both running editions:

- First-time entry, sample selection and the Overview investigation actions.
- Finding to binary/function evidence and back, preserving query and expansion.
- Finding to actual configuration-file preview and back, in both editions.
- Baseline/new comparison, actual results and return to the previous context.
- Ghidra, CVE and AI entry points; Live hover/focus/Escape/touch explanations.
- Full integration availability, provider settings and dialog focus; no inference
  or external provider requests were initiated.
- Reports discovery, JSON/Markdown/SBOM downloads and Live Reports refresh.
- All six inventory views, both string views, dictionary, recorded logs and
  extraction results; unavailable Live execution explains its boundary.
- An authenticated Full submission followed by forced uncached analysis of the
  safe filesystem fixture: completed with 5 findings and real progress events.
- Password-dialog cancellation without changing the account.

Both editions were checked at 1920×1080, 2560×1440, 1440×900, 1366×768,
768×1024 and 390×844. No document-level horizontal overflow was measured.
Wide technical tables retain their own scroll regions. Mobile Live integration
tooltips remained within the viewport. Browser checks recorded no page errors;
Live made no privileged API/health/Full-service requests.

Validation records and screenshots are in the excluded `.validation/stage35`
directory. Failed test waits were corrected to wait for the requested finding
rather than a stale one-row result, and to allow Full's Python coverage metadata
request to complete. UI testing also corrected mobile tool-label overlap and
native search-field styling before final capture.

## Regression results

| Check | Result |
|---|---|
| Python | 73 passed, 8 skipped |
| Go | 100 passed; vet and build passed |
| JavaScript, adapter and static bundle | 22 passed |
| Alpine binding syntax | Compiled successfully |
| Full account, history and encryption key | Preserved; authenticated browser login verified |
| Static output/privacy and source audit | Passed; private runtime and validation material excluded |

The optional skips remain cross-compiler, live Ghidra and populated external CVE
feed checks. The existing configured runtime still has no Ghidra installation,
populated broad CVE feeds or live AI provider. Full CVE coverage can take several
seconds on first load while Python collects local checker metadata.

## Build and use

From the DEFILE directory, Node.js 20+:

```bash
npm run build
npm run preview
```

Open **http://localhost:8081** for Live. Static output remains **dist/live**;
the refreshed static archive is **dist/DEFILE-Live.zip**. Full remains at
**http://localhost:8080**, with its existing account and private data.
See [LIVE_DEMO.md](../../LIVE_DEMO.md) for Full setup and the future static deployment
procedure. The refreshed project archive is **dist/DEFILE-source.zip**.

## Remaining usability limits

Firmware and static-analysis evidence still require domain judgment. Function
recovery can be incomplete; binary inspection lists up to 100 matching functions
at once, with search and complete JSON export available. Large evidence tables
scroll horizontally on small screens. Live hash refresh preserves the selected
scan and major view; browser Back is not a full research-history replay. Explicit
return controls preserve the supported research context. Public signup and email
password recovery are outside this stage and remain administrator-managed.

The mobile header is now 104px to accommodate labelled research tools, retaining
the existing 56px scan toolbar and drawer. Palette, typography and shape tokens
remain inherited. The documentation inheritance check preserved the historical
Stage 2A design artifacts; it did not canonize pre-existing style drift.

The finish reviewer requested one material correction: restore context after the
Ghidra illustration. A browser test from a filtered, expanded finding in the
hardened sample verified the originating scan, query, grouping, active Findings
tab and expansion after returning. The reviewer scored that fix resolved and
returned **ship** at the scope of the scored fix. A transient active-tab color
transition in an immediate screenshot was recaptured after settling; the DOM
active-state assertion and stable capture agree.

No commits, remote changes, GitHub publication, Vercel configuration, deployment
or domain changes were performed.
