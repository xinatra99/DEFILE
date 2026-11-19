# DEFILE engineering progress

English consolidation of the supplied engineering notes. Release measurements
below are historical observations, not claims that those firmware images, external
tools or GPUs were retested during this migration. Current results belong in
[MIGRATION_REPORT.md](MIGRATION_REPORT.md). Requirements are in
[firmware-analysis-requirements.md](firmware-analysis-requirements.md).

## Architecture and contracts

The Python package is the analysis library and CLI; Go owns orchestration, HTTP,
authentication, persistence and the embedded Alpine.js interface. The canonical
integration model is `defile/model.py`. Each worker invokes `python3 -m defile.cli`,
reads `@@DEFILE@@` JSON progress lines from stderr, and imports the report into SQLite.
Do not change finding fingerprints as part of a presentation change: triage uses
them across scans. Extraction produces candidate regions instead of a findings report.

The main analysis stages are ELF loading, mitigations/disassembly, per-binary
detectors, cross-binary reachability, broad CVE scan, secrets, scripts, filesystem
and configuration checks, anomalous commands, complete file inventory, BusyBox,
network-service signatures, firmware metadata, prioritization and optional Ghidra.
Stages degrade independently; a warning is distinct from a verified clean result.

SQLite holds findings, binaries, scripts, components, files, report metadata,
provider profiles and AI narratives. Job metadata is persisted as JSON files;
triage state and append-only attribution history have their own files. Sessions
are intentionally in memory. Embedding the frontend means a Go rebuild is required
after any `service/web` change.

## Historical implementation notes

### September 21, 2026 — large-report comparison

The browser previously fetched both complete JSON reports for comparison. Real
605 MB and 627 MB reports exceeded V8's roughly 512 MiB string limit, and a caught
parse failure looked like an empty scan. `POST /api/compare` now computes deltas in
`ReportDB.CompareJobs`. Finding identity uses rule, class, relative location and
sorted CVEs, preserving comparisons across independently extracted directories.
Partial unmarshalling avoids materializing unused import/export symbol arrays.
Rendered findings are bounded to 1,000 per side, function rows to 5,000 and strings
to 2,000; true totals remain separate. The historical pair produced an approximately
15 MB response in about 12 seconds, rather than requiring 1.2 GB of browser parsing.

### September 16, 2026 — interface density and contrast

The existing interface reorganized eleven top-level views into five: Dashboard,
Findings, Inventory, Strings and AI analysis. Inventory holds Binaries, Scripts,
Components, Files, BusyBox and Services; Strings holds all/sensitive views. The
header pins the image name, architecture, kernel and size. Occasional preferences
move into the user menu. This layout is retained in DEFILE.

The dashboard counts all five severities in a proportional bar. Current-page
findings are grouped by component, with groups larger than five initially collapsed.
The binaries table uses fixed 46 px rows and six ordered hardening slots
NX/CN/RL/PI/FT/SY. CVEs expand from a count; MD5 remains fully visible. Paths truncate
the common directory prefix from the left, preserving the filename. Job-card fields
clip on one line with a title containing the full value.

Muted text was raised from an observed 3.4:1 to at least 4.5:1 against each theme's
panel. The previous dimmer value is reserved for decoration. Historical validation
used real job-65 (3,010 findings, 537 binaries, 548 CVEs), 1600×1000 headless Chrome
at 2× density, four views and both midnight/light themes. Those observations are
distinct from current migration checks.

### September 11, 2026 — extraction

`defile/ingest` wraps `moria -j -e`, merging recognition and extraction manifests by
offset. Regions retain type, confidence, warnings, status, source size, extracted
bytes and output path. Only `ok`/`partial` regions with actual files/directories are
usable. Failed regions remain visible with reasons. The analyst selects a rootfs or
requests another extraction, avoiding silent selection of an inactive A/B bank.

Go reuses its queue, job logs and SSE through `Job.Kind` and `Job.Regions`.
Extraction does not use the findings dedup cache. Resolution prefers the explicit
environment override, then the in-tree build, then PATH. An invalid override does
not fall back. Startup logs and `/healthz` expose the actual version. Tests cover
all three paths and guard the module-relative in-tree path calculation.

The supplied ZIP omits the optional moria source/gitlink. See `ENVIRONMENT.md`;
do not describe this source archive as containing a usable pinned extraction build.

### September 9, 2026 — subprocess duration

A large target was killed partway through disassembly by a fixed 30-minute context
timeout, with `signal: killed` masking the cause. `-analyze-timeout` now defaults to
two hours and is configurable. It bounds hung subprocesses rather than predicting
target cost. Dynamic estimates were avoided because they would require another
directory walk and duplicate ELF detection before starting the actual engine.

### August 25, 2026 — charts, fingerprints and progress

Directory composition uses top-level byte totals. CUDA rasterizes wedges per pixel;
Pillow supplies the CPU fallback and draws labels for both paths. Small wedges may
omit external labels to prevent overlap; the HTML legend retains exact values.
The renderer also accepts arbitrary named slices for function-diff charts.

Function fingerprints hash an operand-independent mnemonic histogram during the
existing disassembly walk. Comparison matches functions by name within the same
relative binary path, reporting added/removed/modified/unchanged. This is not
structural BinDiff: renaming or stripping a function can look like removal/addition,
and different bodies can share a histogram.

Progress is monotonic. Ghidra no longer starts below an already-reported 99% or
spends most wall time in a three-point range. Disassembly/decompile emit done/total
alongside overall percentage. Architecture composition updates after each binary is
analyzed. Rescan uses `force` to bypass the unchanged-target cache. The analyzer
version participates in cache identity; schema-affecting upgrades must invalidate it.

Two production path issues were documented: a nonexistent subprocess working
directory produced a misleading `fork/exec python3` error, and `-data ./` opened an
old database instead of `./.data`. Both demonstrate why actual resolved paths matter.
The startup script now resolves its own service directory and passes an explicit core.

Observed restarts also terminated running analysis children despite separate
process groups; possible session/cgroup teardown was not conclusively diagnosed.
Do not promise orphaned jobs survive restart, or that partial reports are recoverable.

### July 27, 2026 — interrupted AI streams and view isolation

A gateway closed an Anthropic stream after 4,505 characters without a stop marker;
`bufio.Scanner.Err()` returned nil at EOF, causing partial content to be stored as
done. Both dialect parsers now require a finish reason or terminal marker after
content, otherwise returning `errStreamInterrupted`. Existing error handling keeps
partial text. Gateways that emit a valid final marker without a reason remain valid.
Four regression tests cover interrupted and terminal-marker-only endings.

AI state could also leak from scan A into scan B in the browser. `select()` clears
analysis state only when the job really changes; asynchronous fetches capture and
recheck job identity before applying results. Selecting an active streaming job
must not null its state while delta callbacks still own it.

The AI status strip remains visible for the entire run, with connecting/thinking/
writing phases, elapsed time, a streaming caret, and tail-following that yields when
the user scrolls more than 40 px from the bottom. Elapsed time comes from persisted
`started_at`, including in observing tabs. Reduced-motion preferences stop movement
without removing status information. Tool checkmarks represent completed retrievals.

### July 26, 2026 — optional AI investigation

Provider profiles include host, protocol, real fetched model, output budget and an
encrypted API key. Supported wire formats are OpenAI-compatible chat completions
and Anthropic Messages. Keys use AES-256-GCM and a 32-byte local `ai.key` with 0600
mode. Last-four display is computed before encryption; ciphertext is never sent to
the browser. Rotation decrypts all keys first, aborts before changes if any fail,
updates ciphertext transactionally, backs up the old key and verifies the result.

NDJSON events carry delta/tool/done/error. Partial output is periodically persisted,
and startup reconciles abandoned running records to interrupted state. A per-job
guard prevents overlapping writers. Provider errors distinguish bad host paths,
HTML masquerading as JSON/SSE, authorization failures, transient 429/5xx and output
budget exhaustion. `/v1` fallback happens only before committed output. A transport
timeout replaces a whole-request deadline so healthy long streams can continue.

Finding selection clusters identical component/rule origins and balances classes,
preventing one component's CVE expansion from consuming the entire prompt. The
prompt caps entries at 60, per-class fairness at eight, field length at 800 and its
findings section at 60,000 characters. Coverage metadata reports omitted content.

The bounded tools retrieve finding searches/details, init-script lists/content,
BusyBox audit and services. Round/call caps force a final no-tools synthesis when
exhausted; gateways explicitly rejecting tools can fall back before output starts.
Firmware and tool results are untrusted evidence, never instructions. Narratives
are rendered as text. DEFILE removes the previous language setting and always
requests English without altering stored evidence or old narratives.

### July 11, 2026 — kernel correlation and additional heuristic classes

A 35 MB kernel stored its banner at 17.1 MB, beyond the previous 8 MB cap. The cap
was raised to 64 MB. cve-bin-tool's kernel checker also missed the banner because
the compiler string contained `~`; `correlate_kernel_cve()` therefore uses the
engine's independent kernel detector and bundled records. Version ranges support
combined lower/upper bounds, avoiding a single-interval Dirty Pipe rule that would
flag already-backported branches. Historical fixtures include patched 5.15.55 and
5.10.150; kernel identification is not a general kernel-configuration hardening audit.

Path traversal reuses source-to-call-graph-sink reachability with file-operation
sinks. Authentication weakness uses auth-related function names plus nonconstant
time comparisons, at medium severity/confidence 0.45. Neither proves exploitability.
Integer-overflow-to-allocation was deliberately deferred: mere reachability to
ubiquitous allocation functions produces noise without argument-level arithmetic.

### July 8, 2026 — service inventory, certificates, configs and large scans

Service identification is static. Versions come from embedded banners; configured
ports come from UCI, inetd entries (including literal escaped tabs in init scripts),
init flags, then defaults. ELF validation prevents identically named configs/init
scripts being counted as extra services. BusyBox applet symlinks are recognized;
gSOAP can be found by content even under vendor-specific binary names. Historical
firmware validation reduced eleven duplicate results to seven distinct services.
No corresponding binary means no service merely because an init script mentions it.

Certificates are parsed with cryptography, per certificate rather than per file.
RSA classification derives from the public key, not the PEM header. CA bundles and
chains are counted correctly; certificates contribute inventory counts, not findings.
Historical data contained 169 certificates, including 152 RSA, and 27 components.

Configuration classification uses extensions, known basenames, UCI paths and
content signatures. Content audits cover insecure service/settings defaults,
distinct from filesystem permissions and literal secret values. A regex delimiter
fix prevents `telnet_enable=0` being mistaken for an enabled value. Database migration
must add a column before creating an index that depends on it.

Config preview once regressed because a new kind was omitted from the preview
predicate. Script/config/other files are previewable, binaries/symlinks are not.
File previews verify membership in the job's stored inventory before reading disk,
cap content at 256 KB and mark truncation. Inline syntax highlighting is a small
tokenizer, separate from product localization. Binaries/scripts paginate at 100;
Strings deliberately loads a separate complete source set so paging a table cannot
silently narrow string coverage. Components remain a comparatively small bulk load.

Stripped-function recovery combines direct-call discovery, prologues, executable
regions and entry points. Known symbol bodies reduce false entries inside data.
Robust decoding skips undecodable literal pools instead of losing the remaining
code. ARM/Thumb coverage chooses a plausible default when mapping symbols are absent.

The NVD wrapper retains fixes for a Cloudflare-blocked count endpoint, missing
logger attribute, inconsistent ID key case and a CVSSv2/V4 indexing typo. Broad
correlation remains delegated to cve-bin-tool; the bundled database is a fallback.

SQLite pagination replaced whole-report reactive rendering. Export paths must use
unbounded queries rather than ordinary 100/500-row page limits. Triage is applied
at ingest and across matching stored IDs. Relative comparison identities fixed a
historical false diff: equivalent extractions changed from 512 common plus 2,494
added/removed each, to 3,006 common and no additions/removals.

BusyBox applet detection uses exact NUL-delimited string tokens, not substrings.
Extra executables are collected from bin/sbin directories at any depth, and init
scripts retain their source. File walkers skip special files before opening them;
a real console device can otherwise block indefinitely. Kernel fallback sources
include vermagic and module directory names. Static resources use `no-cache`
because embedded assets have no meaningful modification timestamp.

## Accuracy and validation posture

Typical confidence ordering is precise call sites (0.8), call-graph candidates
(0.5), cross-binary candidates (0.45), then import-only signals (0.4). These are
heuristic leads. Secret detectors distinguish private keys, structured tokens,
password hashes, assignments and entropy candidates; evidence is redacted.

Shell analysis distinguishes reparsing/command position from ordinary arguments.
Quoted assignments and static command literals should not become injection leads.
PHP/Python/Lua passes are lightweight, largely line-oriented approximations, not
full language interpreters. Cross-binary linking uses imports/exports by name and
does not implement dynamic linker resolution or argument-level symbolic execution.

Tests compile representative binaries, check call sites/mitigations, curated and
parsed CVEs, secrets/redaction, scripts, hardening, certificates, service inference,
SBOM, triage, extraction contracts and persistence. Optional live integrations are
gated separately. Release-note measurements do not substitute for current tests.

## Remaining scope

Precise symbolic taint, sandboxed emulation, dynamic service probing, integer-size
arithmetic tracking, kernel CONFIG hardening, SPDX output and a unified queue/report
store remain future work. Optional dependency declarations or extension interfaces
do not mean those engines are implemented. This identity migration adds none of them.

EMBA remains acknowledged for its modular assessment approach and signature ideas;
cve-bin-tool, moria, Ghidra and other dependencies retain their own identities.
