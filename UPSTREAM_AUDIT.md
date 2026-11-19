# IFDA functional parity audit

Baseline: [cn0xroot/IFDA `90c11c2179c8a1c907529a9e866c06b636375077`](https://github.com/cn0xroot/IFDA/tree/90c11c2179c8a1c907529a9e866c06b636375077).
DEFILE comparison: [`2ecaa11c6d6d013a9cf63562d072bb84ab1abe7e`](https://github.com/xinatra99/DEFILE/tree/2ecaa11c6d6d013a9cf63562d072bb84ab1abe7e).
Audit date: 2026-11-20. This report accompanies the corrective documentation and
verification changes; see [RELEASE.md](RELEASE.md) for release execution results.

No missing upstream Python module or unintended loss of an operational app method
was found. No known unintended functional regression remains from this comparison.
This is **not a claim of 100% live integration verification**: cross-architecture
compiler fixtures, live Ghidra, populated external CVE feeds, paid/remote AI,
CUDA and native macOS remain limited as described below. Finite fixtures do not
prove exhaustive firmware compatibility or vulnerability detection accuracy.

## Method and evidence

Upstream was inspected before DEFILE changes. Sources included both READMEs,
English/Chinese requirements, ENVIRONMENT.md, service guide/startup, manifests,
both setup scripts, CHANGELOG and relevant Chinese PROGRESS entries (Moria pin,
Java selection, wrong-data-directory recovery, worker interruption, AI encryption
and streaming). Draft requirements and historical pass counts were checked against
the actual implementation, not promoted into capability claims.

All **42 upstream Python files** were mapped to the renamed package. After exact
product-name normalization, the substantive differences are the existing version
suffix, public-certificate permission correction, Moria region-type merge fix,
environment compatibility and explicit CVE failure/warning reporting. No stage
was removed. Rule datasets and the Ghidra post-script match after identity changes.

All **21 upstream Go source/test files** were compared. Worker/job control,
CAPTCHA, AI clients/tools/agent/encryption and most storage/tests match after
identity normalization. Material differences are English-only AI output,
Markdown triage overlay, legacy data discovery and 0700 new runtime directories.
Password hashing code is unchanged; its old explanatory comment was corrected.
REST route registrations and handler protection remain equivalent.

The original app has 291 members and the current app 326. The only eight missing
original members are language state and translation helpers, an approved
presentation difference. Every original operational method remains. Source review
also checked the redesigned Full markup/entry points; retaining a method alone
was not treated as evidence that its request contract still works.

Evidence labels used in the matrix:

- **S:** direct pinned-source comparison, including actual callers and contracts.
- **D:** real CLI differential harness: single ELF (3 findings), extracted tree
  (6 findings), decompile option without Ghidra, progress, SBOM, Markdown generation,
  four triage states, byte-identical CPU chart, every help surface and real tar extraction.
- **P:** clean-environment Python suite: 73 passed, 8 skipped; includes real Moria.
- **G:** DEFILE Go tests: 102 passed, none skipped; upstream Go tests: 98 passed,
  none skipped. Upstream Python: 67 passed, 8 skipped with Moria on PATH. Includes local HTTP provider simulators; no paid inference.
- **R:** separately started clean-clone service: generated-admin CAPTCHA login,
  password change, auth rejection, upload/analysis, three exports, terminal SSE,
  local provider encryption, shutdown/restart and persisted runtime state.
- **W:** actual upstream/current app methods compared in Node VMs: 13 state-changing
  request contracts, filter query and three authorized download URL formats.
- **L:** independent Node 24.14.1 Live build/privacy checks and 22 passing frontend tests.
- **Y:** real yara-python 4.5.4 custom-rule match through both wrappers; ID/rule/confidence equal.

A production browser smoke check also exercised sample search, finding/evidence
navigation and the original/hardened comparison (0 added, 4 removed, 1 unchanged).

Matrix source paths are exact repository-relative locations. For Python rows,
`ifda/...` in the pinned upstream maps to `defile/...` here. For service rows,
both use `service/...`; the original inline app in `service/web/index.html` maps
to current `service/web/workbench.js` and `index.html`. The pinned upstream tree
link above fixes every upstream reference to one immutable commit.

## Analysis, evidence and reporting

| Capability | Upstream → DEFILE source | Contract / entry point | Evidence and difference/action | Final status |
|---|---|---|---|---|
| Target walk, single ELF, directory | `ifda/pipeline.py` → `defile/pipeline.py` | `analyze TARGET`; regular-file discovery | S/D/P; no stage removed | PARITY VERIFIED |
| ELF parsing, symbols/imports, libc, sections | `loader/elf.py` in both packages | BinaryInfo metadata | S/D/P; same evidence/schema | PARITY VERIFIED |
| Filesystem inventory/root composition | `pipeline.py`, `inventory/firmware_meta.py` | Files, rootfs metadata, chart breakdown | S/D/P/G; same traversal | PARITY VERIFIED |
| Symlinks/FIFOs/devices | `pipeline.py`, `fs/hardening.py`, `inventory/secrets.py` | Record safe metadata; avoid opening special files | S/D/P; native Linux fixtures | PARITY VERIFIED |
| x86/x86-64 disassembly | `re/disasm.py` | Instructions, functions, import/call xrefs | S/D/P; x86-64 real compiled fixtures; x86 path source-equivalent | PARITY VERIFIED (executed x86-64 scope) |
| ARM/Thumb, veneers/interworking | `re/disasm.py` | Capstone mode/mapping-symbol handling | S; same implementation; compiler fixture tests skipped | UNVERIFIED (live architecture fixtures) |
| AArch64 disassembly/import resolution | `re/disasm.py` | AArch64 PLT/call recovery | S; same implementation; compiler fixtures unavailable | UNVERIFIED (live architecture fixtures) |
| MIPS LE/BE | `re/disasm.py` | GOT/`jalr $t9` and endianness handling | S; same implementation; compiler unavailable | UNVERIFIED (live architecture fixtures) |
| Function recovery/call graph/xrefs | `re/disasm.py`, `model.py` | Symbol/linear/direct-call/prologue recovery | S/D/P; function fields retained | PARITY VERIFIED (tested corpus) |
| Mitigations | `re/mitigations.py` | NX/canary/RELRO/PIE/FORTIFY, metadata | S/D/P; unchanged | PARITY VERIFIED |
| Dangerous calls, catalogs, backdoor/auth heuristics | `vuln/dangerous_funcs.py`, `catalog.py`, `backdoor.py`, `auth_weak.py` | Findings and call-site evidence | S/D/P; no new algorithm or removed rules | PARITY VERIFIED (tested corpus) |
| Heuristic taint and cross-binary reachability | `vuln/taint.py`, `crossbinary.py` | Candidate source/sink evidence | S/P; same interfaces and algorithms | PARITY VERIFIED (tested corpus) |
| Secrets, entropy, certificates | `inventory/secrets.py`, `rules/engine.py` | Redacted evidence, certificate inventory | S/P; unchanged matching | PARITY VERIFIED |
| Native JSON signatures | `data/secret_rules.json`, `rules/engine.py` | Rule IDs/fields, JSON loader | S/P; schema identity renamed, IDs retained | PARITY VERIFIED |
| Shell and PHP/Python/Lua checks | `scripts/shell.py`, `langs.py` | Script findings and extracted evidence | S/P; same matching paths | PARITY VERIFIED |
| Filesystem/config hardening | `fs/hardening.py`, `vuln/config_audit.py` | Permission and config findings | S/D/P; valid public certificates no longer treated as private keys; mixed key bundles remain flagged | ENHANCED |
| BusyBox applets/init scripts | `inventory/busybox_audit.py` | Inventory + init source | S/P/G; unchanged | PARITY VERIFIED |
| Static services/ports/components/kernel | `inventory/service_id.py`, `firmware_meta.py`, `vuln/cve.py` | Banner/config inference; no network probes | S/P/G; same inputs/outputs | PARITY VERIFIED (tested corpus) |
| Curated CVEs/affected ranges | `data/vuln_db.json`, `vuln/cve.py` | Version-range/banner correlation | S/P; data preserved; UI preserves distinct ranges | PARITY VERIFIED |
| Broad scanner/patch/error reporting | `vuln/cve_bin_tool.py`, `_nvd_patch.py`, `pipeline.py` | Tree-level scanner JSON → findings/components | S/P; dependency remains required; failures now surface warnings instead of silent empty results | ENHANCED; live feeds UNVERIFIED |
| Severity, confidence, fingerprints | `model.py`, `vuln/findings.py` | Stable IDs, prioritization, triage | S/D/P; exact finding data compared without ID normalization | PARITY VERIFIED (tested corpus) |
| JSON report model | `model.py`, `report/json_report.py` | Full structured report | S/D/G; only timestamp/release identity excluded in comparison | PARITY VERIFIED |
| Markdown | `report/markdown_report.py`, service `api.go`/`markdown_triage.go` | `--md`, authorized report export | S/D/G/R; current triage overlays metadata while preserving evidence | ENHANCED |
| CycloneDX 1.5 | `report/sbom.py` | `--sbom`, components/CVEs | S/D/R; exporter identity renamed; component/vulnerability data equal | PARITY VERIFIED |
| Progress | `cli.py`, `service/job.go` | stderr JSON prefix, SSE | D/G/R; `@@IFDA@@` → `@@DEFILE@@` on both bundled ends; external consumers must update | INTENTIONAL DIFFERENCE |

## CLI and extraction

| Capability | Source / DEFILE entry point | Evidence and difference/action | Final status |
|---|---|---|---|
| Analyze and exports/options | Both `cli.py`; `defile analyze TARGET --json/--md/--sbom/--chart/--triage/--progress/--decompile` | S/D; all parser options retained; help differs only by identity/wrapping | PARITY VERIFIED |
| Extract | Both `cli.py`, `ingest/__init__.py`; `defile extract FILE --out DIR [--json PATH] [--progress]` | D/P/G; real Moria invocation and recovered tar file | PARITY VERIFIED (tar scope) |
| Arbitrary pie chart | Both `cli.py`, `report/piechart.py`; `defile chart SLICES OUT` | D/G; byte-identical CPU PNG | PARITY VERIFIED |
| CLI triage | Both `cli.py`, `vuln/findings.py`; `defile triage STORE ID STATE` | D/P; all four real CLI writes; triage applied during analysis | PARITY VERIFIED |
| Coverage inspection | Both `cli.py`, `vuln/cve_bin_tool.py`; `defile vulndb` | S/R; distinguishes checker availability and advisory counts | PARITY VERIFIED (no populated feed) |
| Moria dependency acquisition | Upstream `.gitmodules`, gitlink `moria`, `scripts/build-moria.sh` → independent ignored checkout + same helper | Missing reproducible pin in DEFILE docs corrected with exact tested checkout/build | INTENTIONAL DIFFERENCE (corrected setup gap) |
| Moria version | Upstream gitlink `656a1d31dfa816e78828747d5c27e84c8f1cfb97` → same explicitly documented SHA | Clean source build reports 0.2.1; MIT source notice retained externally | PARITY VERIFIED |
| Executable precedence | Both `ingest/__init__.py` | Explicit override → in-tree build → PATH; invalid override blocks fallback; new names retain legacy fallback | ENHANCED |
| Region metadata/output/usable state | Both `ingest/__init__.py` | D/P; status/offset/type/paths/counts retained; existing type-aware merge avoids offset-zero nested-container confusion | ENHANCED |
| Nested/archive/filesystem formats | Pinned Moria implementation + wrapper | Same pin/JSON invocation; tar live-tested, nested-offset regression fixture tested; not every filesystem/image format exercised | UNVERIFIED (exhaustive format coverage) |
| Missing Moria | Both wrapper/CLI and `service/main.go`, `api.go` | P/G/R; extraction reports unavailable; analysis remains; startup version shown in health | PARITY VERIFIED |

## Service and interface

| Capability | Source in both / current entry point | Evidence and difference/action | Final status |
|---|---|---|---|
| Startup/core/Python lookup | `service/main.go`, `start.sh`; `/healthz` | R; loopback launcher, no hardcoded password; complete dependencies and cwd documented | ENHANCED |
| Flags/concurrency/queue/timeout | `main.go`, `job.go`; workers=2, queue=128, analyze cap=2h | S/G/R; no flags removed; full reference added | PARITY VERIFIED |
| Account initialization/recovery | `main.go`, `auth.go`; generated admin or explicit seed/reset | S/G/R; generated credentials preserved, old insecure startup password not restored | ENHANCED |
| CAPTCHA/hash/lockout | `captcha.go`, `auth.go`, `api.go`; `/api/captcha`, `/api/login` | S/G/R; one-use challenge, same PBKDF2 contract, five-attempt lockout tested | PARITY VERIFIED |
| Sessions/password/logout | `auth.go`, `api.go`; `/api/change-password`, `/api/logout` | G/R; 24-hour/in-memory expiry and restart invalidation, stored password persists | PARITY VERIFIED |
| API protection/download authorization | `api.go` routes/auth wrapper | S/G/R; headers/query tokens retained; unauthenticated state and report requests denied | PARITY VERIFIED |
| Jobs and workers | `job.go`, `api.go`; POST/GET `/api/jobs` | S/G/R/W; real CLI worker, progress and concurrent-worker code preserved | PARITY VERIFIED |
| SSE | `job.go`, `api.go`; `/api/jobs/{id}/events` | S/G/R; terminal stream checked; same live event implementation | PARITY VERIFIED |
| Pause/resume/stop | `job.go`, `api.go`; POST `/api/jobs/{id}/pause`, `/resume`, `/stop` | S/G/W; real process-group pause/resume/kill test | PARITY VERIFIED |
| Dedup/rescan | `job.go`; same path/size/mtime/version key, request `force:true` | S/G/W; force and version invalidation regression tests | PARITY VERIFIED |
| Job persistence/restart/deletion | `job.go`, `api.go`; JSON lifecycle store and delete routes | S/G/R; terminal state/IDs persist, unfinished work reconciles, no partial resume promised | PARITY VERIFIED |
| SQLite report/inventory store | `reportdb.go`; summary and paginated endpoints | S/G/R; legacy schemas/migrations/large export tests retained | PARITY VERIFIED |
| Reports/downloads | `api.go`; `/api/jobs/{id}/report?format=json|md|sbom` | G/R/W; three complete formats protected; Markdown triage fix retained | ENHANCED |
| Triage/history | `triage.go`, `reportdb.go`, `api.go`; `/triage`, `/api/triage/history` | S/G/R/W; state, fingerprint overlay and audit log persist; immediate UI history refresh retained | ENHANCED |
| Scan comparison | `reportdb.go`, `api.go`; POST `/api/compare` | S/G/L; server-side bounded response retained; no huge-report browser parsing restored | PARITY VERIFIED |
| Upload/extraction jobs | `api.go`, `job.go`; `/api/upload`, job `kind:extract` | S/G/R/W; real upload scan and Moria worker tests | PARITY VERIFIED (tested format scope) |
| File previews | `api.go`; `/api/jobs/{id}/file-content` | S/G; recorded-path check and refusal of non-regular files unchanged | PARITY VERIFIED |
| Health/tool probes | `main.go`, `api.go`; `/healthz` | S/R; same startup-cached Moria/Ghidra hints; docs distinguish probe from working integration | PARITY VERIFIED |
| Full overview/findings/inventory/strings | Upstream inline app → `service/web/workbench.js` + `index.html` | S/W/L; all operational members remain, evidence fields retained, filters/export contracts exercised; complete new browser sweep not performed | PARITY VERIFIED (source/contract scope) |
| File/BusyBox/services/CVE/dictionary views | Same app mapping | S/P/G/L; original methods and entry points retained; evidence previews/search preserved | PARITY VERIFIED (source/contract scope) |
| Navigation/theme/evidence return | Same app mapping, `interface.js` | L; existing Stage 2A/3.5 improvements preserved; no frontend source changed in this audit | ENHANCED |
| Language switching | Inline translation state/helpers → native English | Eight localization members intentionally removed; extracted evidence/historical content not translated | INTENTIONAL DIFFERENCE |
| Browser/storage/runtime migration | `compat-storage.js`, `defile/compat.py`, `legacy_data.go` | P/G/L; new values win; old preferences/default data remain recoverable | ENHANCED |

## Optional integrations, platform and distribution

| Capability | Sources / current equivalent | Evidence and correction | Final status |
|---|---|---|---|
| Ghidra discovery/headless/post-script | Both `re/decompile.py`, renamed `ghidra_scripts/defile_decompile.py` | S/P/D; identical launcher/timeouts/association after naming; missing-tool option tested, actual Ghidra/JDK absent | UNVERIFIED (live decompilation) |
| CVE initialization/sync | Both `_nvd_patch.py`, `cve_bin_tool.py`, `scripts/bootstrap_nvd_cache.py` | S/P; corrected obsolete `-n json` to patched API2; no large synchronization performed | UNVERIFIED (live feed population) |
| OpenAI/Anthropic protocol clients | `ai_provider.go` | S/G; stream, model listing, auth, retry/HTML/path/truncation/interruption tested with local servers | PARITY VERIFIED (simulated providers); remote providers UNVERIFIED |
| AI evidence/tools/selection | `ai_prompt.go`, `ai_tools.go`, `ai_agent.go` | S/G; class-fair budgeting, tool evidence, capped loops/fallback retained; English output intentional | PARITY VERIFIED (local protocol tests) |
| Provider management/encryption/persistence | `ai_api.go`, `aicrypto.go`, `reportdb.go` | S/G/R/W; CRUD, AES-GCM, key rotation/failure recovery tests; local fake-key record survives restart | PARITY VERIFIED |
| AI analysis streaming/history | `ai_api.go`, `reportdb.go` | S/G; streaming/save/concurrency/interruption recovery tested without paid calls | PARITY VERIFIED (local protocol tests) |
| YARA bridge | Both `rules/engine.py`; optional `yara-python`, supplied rules | S/Y; real custom-rule matching equal; no default rule pack implied | PARITY VERIFIED (custom-rule API scope) |
| CuPy/CUDA charts | Both `report/piechart.py`, `pyproject.toml` cuda extra | S/D/G; CPU fallback works, CUDA path preserved but no usable GPU/CuPy test | UNVERIFIED (GPU path) |
| angr extra | Both `pyproject.toml`; no execution backend caller | Source confirms installed extra is future integration, not active taint replacement | UPSTREAM NOT IMPLEMENTED (backend) |
| Linux/WSL2 clean installation | Manifests, launcher, complete setup | R/P/G; own venv, official fresh Go toolchain, pinned Moria build; native runtime permissions checked | PARITY VERIFIED (tested environment) |
| Native macOS | POSIX process control/pure-Go SQLite + reviewed docs | Source-reviewed only; no macOS machine, no native Darwin execution claimed | UNVERIFIED |
| Live static edition | DEFILE addition: `demo/`, `scripts/build-live.mjs`, shared UI | L; no execution backend/private runtime; production preserved | ENHANCED |
| Python/Go/Node requirements | `pyproject.toml`, `service/go.mod`, `.nvmrc`, package engines | Corrected stale Go 1.22 and partial dependency advice; minimum Go 1.25.0, Python 3.10+, release Node 24.x | ENHANCED (documentation) |
| Provenance/licenses | `LICENSE`, `NOTICE`, vendored dependency notices | Apache/IFDA provenance retained; external Moria MIT; no false cve-bin-tool subprocess-only claim | PARITY VERIFIED |
| Roadmap-only features | Requirements/README vs actual callers | Dynamic emulation, angr backend, SPDX/PDF export, universal format/architecture support not shipped upstream; not restored as imaginary features | UPSTREAM NOT IMPLEMENTED |

## Corrective work and intentional differences

No detection algorithm, API route, report schema or frontend design was changed
for this audit. Existing corrections (public certificates, nested region merge,
CVE failure visibility, Markdown triage, state migration and private runtime
permissions) remain. Their tests continue to pass; they were not normalized away
to conceal lost findings.

The actual deficiencies corrected here were documentation/distribution issues:

| Deficiency | Correction | Proof |
|---|---|---|
| Moria external advice omitted original reproducible pin/build prerequisites | Exact SHA, codecs, build path, discovery and tar verification documented | Fresh build 0.2.1; D/P/G |
| Scanner install confused with feed population; stale `-n json` command | Patched API2 command, cache/network/storage/fallback/warning distinctions | Scanner 3.4 help/source and offline wrapper tests; live sync explicitly unverified |
| Go/version/dependency and Java advice conflicted | Source-derived Go 1.25.0+, complete Python dependencies, release-specific JDK requirements | Clean install/build; Ghidra release properties reviewed |
| Settings/CLI/AI/backup/recovery knowledge scattered | Dedicated SETTINGS, CLI, USAGE and TROUBLESHOOTING guides | Source parser/flag/route comparison, D/G/R/W |
| Service guide contained speculative shutdown claims and misleading partial dependency advice | Document actual persistence/reconciliation and full venv dependency requirement | G/R |
| Release page still described plans | Replace with verified publication/install/test state | RELEASE.md and release verification |
| Historical stage records cluttered active instructions; stale links | Preserve under `docs/history/`, add documentation index, fix manifest/links | Internal-link and source-distribution checks |
| Parity evidence depended only on prior suites | Add real upstream differential harnesses and auth/process contracts | D/W plus new Go tests |

Renamed executable/package/progress identifiers, English-only chrome and AI prose,
external Moria acquisition, secure first-run credentials, Full/Live split and
existing visual/navigation refinements remain deliberate. Original firmware
evidence, filenames, IDs and historical narratives are not rewritten.

## Reproduce the comparison

Use a separate upstream checkout at the exact baseline, the DEFILE venv and GCC.
Do not install the old package over DEFILE. No automatic upstream fetch or feed
download occurs inside these harnesses:

```bash
git clone https://github.com/cn0xroot/IFDA.git ../ifda-audit-baseline
git -C ../ifda-audit-baseline checkout --detach 90c11c2179c8a1c907529a9e866c06b636375077
python3 scripts/verify-upstream.py --upstream ../ifda-audit-baseline \
  --moria "$PWD/moria/build/moria" --output "$PWD/.validation/parity"
node scripts/verify-upstream-web.mjs ../ifda-audit-baseline
```

The Python harness compares full structured findings/evidence without dropping
IDs, classes, counts, confidence, severity or binary metadata. Normalization is
limited to report timestamps/version identity, SBOM UUID/time/tool identity,
CLI help naming/wrapping, extraction output root and the **exact** documented
missing/disabled-scanner warning correction. The decompile-option comparison
tests graceful absence here, not live pseudocode. Web harness results verify
actual method/request contracts, not a complete visual/browser sweep.

Remaining limitations are explicit matrix entries, not deferred known regressions.
Actual firmware format coverage, live provider compatibility, remote feed health
and native platform behavior still require their own environment-specific tests.
