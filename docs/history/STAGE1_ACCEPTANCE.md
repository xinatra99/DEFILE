> Historical engineering record. For current installation and verification, use the [README](../../README.md) and [release report](../../RELEASE.md).

# Stage 1 acceptance — CONDITIONAL PASS

Verified November 19, 2026 against the real Go service and Python engine,
version `2.8.0+defile.2`, using Windows Edge and WSL Ubuntu. The story tested was:
browser submission → authenticated API → Python analysis/extraction → persisted
results → browser findings, triage and downloads. Tests used a separate local
account/data directory and the same executable; the user's account was preserved.

Core local workflows pass after the corrections below. Stage 2 frontend work is
ready for authorization with the optional integration limits explicitly retained.
Stage 2 has not started. This is not a claim of complete external-tool coverage or
exhaustive vulnerability detection.

## Completed real workflows

| Actual input | Terminal result and consistency checks |
|---|---|
| Locally compiled harmless x86-64 ELF, 17,864 bytes | Uploaded and analyzed to 100%; 1 binary, 2 heuristic findings. Actual disassembly and function recovery occurred. |
| Five-file representative root filesystem containing that ELF, startup script, dummy configuration and a public certificate | Completed; 1 binary, 12 functions, 1 script, 1 certificate, 6 findings after correction. Non-English input evidence remained verbatim. |
| Genuine 4,848-byte gzip/tar archive of that tree | Moria extracted two usable nested regions; extracted ELF matched the original bytes. Starting analysis from the extracted region completed with 1 binary and 6 findings. |
| 101 ELF copies and 201 harmless scripts | Completed; 101 binaries, 302 files and 303 heuristic findings. Exercised real pagination beyond 100 binaries/scripts, 200 files and the findings page limit. |
| Actual local OpenSSL executable | Completed; 1 binary, 2,017 recovered functions, 25 heuristic findings. Component recognition returned zero entries; no OpenSSL version/CVE match is claimed. |
| 32 local Bash executable copies | Actual running jobs exercised Pause, Resume and Stop. A deliberately interrupted paused job became failed after restart with an explicit interruption message; no analysis child was left running. |

Findings are analyzer output, not independently proven exploitable vulnerabilities.
Real re-scan bypassed the cache, preserved confirmed triage and produced six
findings; comparison returned zero added/removed findings and 12 unchanged functions.

## Application and security checks

PASS: CAPTCHA login and invalid-login cases; password change and restart persistence;
session expiry/recovery and logout revocation; upload/path submission; actual job
progress; pause/resume/stop; single/bulk deletion; re-scan and comparison; dashboard,
findings and all inventory/string screens; finding search/filter/sort/group/page
controls; binary/script/file pagination; file previews; all four triage states,
reset and history; seven themes; sensitive dictionary add/remove/reset/persistence;
AI provider create/edit/delete/model listing and connection-failure presentation.

Call relationships were checked in recovered function metadata (including
`main → fixture_copy → strcpy/puts`). The current product has no separate
interactive call-graph viewer. BusyBox/services/components empty states were
verified; a populated real firmware example for those screens was not available.

Unauthenticated/invalid-token API requests and all three protected downloads
returned 401. Invalid requests returned appropriate 400/404/409 responses.
A multipart `../../escape.elf` filename was sanitized and contained within uploads;
an unrelated filesystem preview returned 404. Provider responses did not return
plaintext stored keys. Authenticated local-path displays are intentional analysis
context; private validation files are excluded from distribution.

All 40 initially hashed fixture files remained unchanged; the extracted ELF was
byte-identical. Existing data directories now have mode 0700 and key files 0600;
a freshly started service also created its data directory as 0700. The user's
password file and encryption key hashes were unchanged across the final restart.

## Verified exports

Real browser downloads: full JSON, Markdown and CycloneDX 1.5 SBOM. JSON and
Markdown each contained six findings with current triage; SBOM tool version agreed
with JSON. The fixture had zero recognized components/CVEs, so the empty SBOM
component/vulnerability result is accurate. Filtered JSON and parsed CSV each
contained all 303 matching findings. Export authorization was independently tested.

## Optional integrations

| Integration | Actual status |
|---|---|
| Moria 0.3.0 | PASS: installed from its official release; real CLI and browser extraction, nested-region analysis and integration tests passed. |
| Ghidra | BLOCKED: Ghidra/Java unavailable; real requested enrichment completed with an explicit missing-tool warning. Genuine decompilation remains unverified. |
| cve-bin-tool 3.4 | Installed and CLI checked. Curated offline table renders all 12 entries with affected ranges; 365 checker names are available in coverage metadata. Real scanner timeout now produces an incomplete-scan warning. Full external-feed matching/sync remains BLOCKED because a populated database was not downloaded. |
| OpenAI-compatible and Anthropic integrations | Both browser/backend streaming transports, configuration and error handling passed against an explicitly labelled loopback protocol fixture. No AI inference occurred. Genuine provider/model behavior remains BLOCKED without authorized credentials. |

The local review launcher enables Moria and explicitly disables broad cve-bin-tool
scanning to avoid unsolicited feed downloads. Curated fallback checks remain active;
the UI reports the disabled scanner truthfully. Checker browsing tied to an enabled
scanner, feed synchronization, CUDA and six cross-architecture cases are unverified.

## Verified defects corrected

1. Finding search sent the previous query; input updates now precede the request.
2. Markdown exports retained stale triage; current decisions now overlay report metadata while leaving evidence/code blocks intact.
3. Public certificate-only PEM files were classified as readable private keys; mixed/private bundles still receive the warning.
4. Scanner timeout/start/invalid-report failures silently resembled empty results; failures now reach the existing pipeline warning path.
5. Nested extraction regions inherited incorrect format metadata at the same offset; metadata now matches offset and type.
6. The AI connection-test button started disabled; its pending-state binding is now Boolean.
7. Session-expiry error objects corrupted the job list and cached empty CVE coverage; failed requests now preserve valid state and allow retry.
8. Repeated CVEs with distinct affected ranges collided in the table; rows now have distinct keys and show lower bounds.
9. The live SVG chart used an unsupported SVG template; equivalent circle rendering now works. Report/preview bindings are safe during teardown and job switching.
10. Newly created runtime directories were overly permissive; private data parents now use 0700.

Changes restore intended behavior and preserve the existing visual design. Engine
version `.2` invalidates earlier analysis caches; historical reports remain readable.

## Validation and evidence

| Check | Final result |
|---|---|
| Python regression/integration suite | PASS: 73 passed; 8 skipped (six cross-compilers, live Ghidra, populated live CVE database). |
| Go suite, including Moria and Markdown triage regressions | PASS: 100 tests; no skips. |
| Browser-state regression tests | PASS: 6 Node tests. |
| Static/build checks | PASS: Go vet/build; 1,168 Alpine expressions compiled; English-only/reference audit. |
| Final corrected browser run | PASS: 12 CVE rows, live chart, control transitions, report switching, preview close, compare teardown and logout; zero page errors. |
| Packaging/integrity | PASS: isolated wheel CLI/import/resources check; source archive audit, preserved license/vendor/assets, unchanged API routes and valid documentation links. |

Earlier failed checks remain in the private evidence alongside their successful
retests; they are not omitted from the record. Evidence is under
`.validation/stage1/` (live-results, artifact-results, reports and browser captures),
with suite/build logs under `.validation/`. The original source archive, portfolio
application and required attribution were preserved. No commits, branches, repository
creation, push or public deployment occurred. Local preview is available at
`http://localhost:8080`; temporary acceptance services were stopped after testing.
