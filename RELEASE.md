# DEFILE release verification

Public repository: [xinatra99/DEFILE](https://github.com/xinatra99/DEFILE).
Production: [DEFILE Live](https://defile-demo.austinbc.dev/).
Vercel project: **defile-demo**, production branch **main**.

Only the static Live edition is hosted. Full is a separately installed,
authenticated Python/Go application. Live contains no Full runtime, credentials,
AI provider secrets or anonymous execution backend. The portfolio deployment and
unrelated DNS records were not changed by this audit.

## Publication and hosting

The initial release and subsequent Git-triggered builds are published. The
production custom domain resolves through its dedicated CNAME to Vercel. HTTPS
and anonymous HTTP 200 were verified; the certificate covers the custom hostname.
The release build uses Node.js **24.x**, `npm ci --ignore-scripts`,
`npm run build`, and output **dist/live**. No npm dependencies or build secrets
are required. No hosting/domain configuration change is needed for this audit.

The comparison release is commit `2ecaa11c6d6d013a9cf63562d072bb84ab1abe7e`.
This audit preserves its frontend and Live data. The immutable upstream baseline,
feature matrix, intentional differences and reproduction harnesses are documented
in [UPSTREAM_AUDIT.md](UPSTREAM_AUDIT.md). The release commit containing these
corrections is identified by Git history; no self-referential commit hash is
embedded in this file.

## Clean Full installation — 2026-11-20

A fresh clone of the published independent repository was installed using its own
venv and runtime, without the portfolio's package installation or private artifacts.

| Component/check | Executed result |
|---|---|
| Host | Ubuntu on WSL2, Linux x86-64; native Linux temporary runtime |
| Python | 3.14.4; clean venv, editable package install, `pip check` passed |
| Resolved core dependencies | Capstone 5.0.9, pyelftools 0.33, cve-bin-tool 3.4, cryptography 50.0.2, Pillow 13.0.0 |
| Go | Fresh official 1.27.4 Linux/amd64 archive; published SHA-256 verified; module minimum remains 1.25.0 |
| Service build/vet | Build and `go vet` passed; validation checkout used `-buildvcs=false` to avoid cross-OS ownership stamping |
| Moria | Independently cloned/built original pin `656a1d31dfa816e78828747d5c27e84c8f1cfb97`, reports 0.2.1; codecs enabled |
| CLI | Help, offline `/bin/true` analysis, JSON/Markdown/SBOM/CPU chart/progress and coverage inspection passed |
| Fresh admin/auth | Generated password, real CAPTCHA login, password change, unauthenticated request rejection passed |
| Real service scan | Uploaded harmless `/bin/true`, queued and completed analysis; all three authorized report downloads passed |
| SSE | Completed-job event stream passed |
| Persistence/restart | Password hash, encryption key, reports, job metadata, uploaded ELF, triage state/audit and local fake-provider record persisted; sessions expired |
| Runtime permissions | New data directory 0700 on native Linux storage |
| External usage | Zero paid/provider completion requests; zero CVE feed downloads |

## Regression and comparison results

| Verification | Result |
|---|---|
| Clean Python suite | **73 passed, 8 skipped** |
| DEFILE Go suite, including new auth/process contracts | **102 test results passed, no skips/failures** |
| Pinned upstream Go suite | **98 test results passed, no skips/failures** |
| Pinned upstream Python suite | **67 passed, 8 skipped** with Moria available |
| Direct Python/CLI comparison | Same complete JSON/SBOM findings, IDs, evidence and metadata on single ELF (3 findings), extracted tree (6), and absent-Ghidra option path |
| Other CLI comparisons | Four triage states persisted, every help surface equivalent, byte-identical CPU chart, progress parsed from both protocols |
| Extraction comparison | Real tar region metadata and recovered file equivalent through both wrappers |
| Full frontend contracts | All operational members retained; 13 state-changing request contracts, filters and three report URLs compared against upstream |
| YARA | yara-python 4.5.4; real harmless custom-rule match through both wrappers, equal identity/rule/confidence |
| Live | Node 24.14.1 independent build/privacy check and **22 frontend tests passed** |

Report comparison excludes only explicit identity/time/UUID/output-root changes
and the exact known missing-versus-disabled scanner warning correction. It does
not remove findings, IDs, confidence, severity or evidence to make results equal.
Both harnesses are committed under `scripts/verify-upstream*`.

## Limits of verification

The eight Python skips are six missing cross-compiler cases (MIPS, ARM/Thumb,
AArch64), one opt-in live Ghidra case and one populated-CVE-database case.
Architecture source paths remain intact, but those runtime compiler fixtures were
not exercised. The configured Ubuntu repositories did not provide the named MIPS
cross-compiler package. Cross-compilers are not required for ordinary analysis.

Ghidra/JDK is not installed; only source/discovery/fallback behavior was checked.
The original 11.1.2 guide needs Java 17+, whereas inspected 12.2 requires Java 25.
No broad feed synchronization or FKIE snapshot import was performed. Live AI
provider access was not tested: local protocol simulators cover both wire formats,
errors, streaming, tools and persistence. No CUDA/GPU path or native macOS runtime
was exercised. Moria tar extraction was real; not every supported firmware format
or nested image layout was tested.

A production browser smoke check passed sample search (5 to 1 finding), evidence
navigation and return, and original-versus-hardened comparison (0 added, 4 removed,
1 unchanged). Frontend request/VM and regression tests also passed. A complete new
browser sweep across every Full/Live viewport/workflow is not implied. Prior
production checks verified static assets and blocked backend/private paths;
actual browser download verification covered JSON, while Markdown/SBOM content and
attachment headers were verified over HTTPS. Do not interpret these narrower
checks as exhaustive browser automation or 100% integration verification.

## Documentation and distribution changes

README remains the entry point. Complete setup, settings, first usage, CLI and
troubleshooting are linked through [docs/README.md](docs/README.md). Earlier stage
records are preserved under `docs/history/` and explicitly marked historical.
The source manifest includes current guides and historical documentation.

The tested operational distribution is the Git source checkout with an editable
Python installation and separately built Go service. Python wheels contain the
analysis package/data/post-script; they are not a standalone Full server installer.
No new analysis algorithms, report formats, API routes or frontend design were
introduced. IFDA attribution, Apache-2.0 LICENSE/NOTICE and dependency notices remain.
