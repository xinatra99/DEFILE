> Historical engineering record. For current installation and verification, use the [README](../../README.md) and [release report](../../RELEASE.md).

# DEFILE identity migration

This records the initial migration checks. The later, broader live acceptance
test found and corrected additional defects; see [Stage 1 acceptance](STAGE1_ACCEPTANCE.md)
for the current `2.8.0+defile.2` results and remaining limitations.

Implemented November 19, 2026, in `projects/DEFILE` inside the existing portfolio
checkout. Portfolio application files were not changed. No repository was created,
and nothing was published or deployed.

## Names and integration

- Python package `ifda/` → `defile/`; distribution and console command → `defile`.
- Ghidra post-script → `defile/re/ghidra_scripts/defile_decompile.py`.
- Go module → `defile.local/service`; executable → `defile-service`.
- Imports, package resources, subprocess calls, core discovery, temporary paths,
  report attribution, SBOM tool metadata and downloads use the new identity.
- Progress producer/consumer both use `@@DEFILE@@`; production environment settings
  and developer test opt-ins use `DEFILE_*`. API routes and report fields remain stable.
- Engine/package versions agree at `2.8.0+defile.1`. Wheel metadata includes bundled
  rule/CVE data and the Ghidra script; LICENSE and NOTICE accompany distribution.

## English-only presentation

Both web pages have native English copy. Translation dictionaries, lookup/dispatch
functions, language controls, language state, language-switching styles and the
Chinese webfont were removed. The AI request no longer exposes a language option;
new narratives request English. Programming-language syntax highlighting remains.
Firmware strings, vendor filenames, evidence, historical reports and stored AI text
are never translated or rewritten. Duplicate localized README/requirements files
were removed; environment/progress documentation was consolidated in English.

## Visual assets and design

The existing layouts, navigation, themes, components and shield artwork remain.
Titles, metadata, wordmarks and favicon accessibility names use DEFILE. Six PNGs
were retained as four precisely edited scan captures and two fresh login captures:
`defile-dashboard.png`, `defile-dashboard-detail.png`, `defile-findings.png`,
`defile-binaries.png`, `defile-sign-in.png`, `defile-sign-in-detail.png`.

The four scan images retain all pixels outside declared branding/translation
regions; the pixel comparison found **zero outside-region changes**. Their
2150×1518 dimensions remain. Fresh sign-in captures use the running application,
Dusk theme and original 1878×1474 dimensions. Generated drafts that changed technical
content were rejected and are not distributed. Historical scan captures predate
the former five-tab layout. Those historical captures are retained privately;
Stage 4's public source ships only current sanitized Live screenshots.

## Documentation, packaging and upgrade compatibility

README, environment setup, service/site guides, engineering history, commands,
examples and image links were updated. Inaccurate Go-minimum and zero-dependency
claims were corrected against the actual module. No replacement repository or
social account was invented. The startup script resolves its own directory and
keeps the existing `.data` location without hardcoded credentials.

`UPGRADING.md` documents reuse of existing data, engine-version cache invalidation,
new command names, environment precedence, one-time browser preference migration,
old rule-schema acceptance and rollback considerations. Password hashes, encryption
keys, finding IDs and persisted report schemas retain their existing contracts.
The supplied Apache LICENSE is unchanged; NOTICE preserves upstream attribution
and identifies the modified distribution.

## Verification actually executed

| Check | Result |
|---|---|
| Original Python baseline | 65 passed, 10 skipped |
| Original Go baseline | 97 passed, 1 skipped; service build passed |
| Migrated Python suite | 67 passed, 10 skipped |
| Migrated Go suite | 98 passed, 1 skipped |
| Browser-setting migration tests | 3 passed with Node's built-in test runner |
| Go static checks and service build | `go vet ./...` and build passed |
| Distributable wheel | Built; isolated install, CLI, imports, bundled rules/CVE data and Ghidra script verified |
| Engine equivalence | Same representative tree produced identical complete reports after excluding only tool version/timestamp: 1 binary, 9 findings, 3 files; original non-English evidence hash unchanged |
| Code/reference audit | 38 analysis modules retain the same normalized Python syntax trees; all existing API routes remain unchanged; no broken documentation/asset links |
| Running application | CAPTCHA login, protected API, UI analysis submission, live job progress, inventory retrieval, JSON/Markdown/CycloneDX exports, download naming, persisted triage, dedup and comparison passed |
| Browser interface/site | English-only controls, legacy preference migration, themes/mobile navigation; no observed JavaScript or resource errors |
| Final embedded interface | 1,169 Alpine bindings compile; final executable launched and UI submission/inline triage click passed |
| Dependency installation | Declared dependencies installed, `pip check` passed, cve-bin-tool 3.4 CLI version verified |
| Screenshot integrity | Dimensions retained; scan data pixels outside text regions unchanged |

Validation used WSL Ubuntu, Python 3.12 and Go 1.27.4; the module requires Go 1.25+.
Windows-mounted filesystems initially caused permission/device/FIFO failures. The
same tests passed with Linux filesystem fixtures backed by a workspace-local image.
Those environment failures were not hidden or worked around by changing analyzers.

## Limits and original-name exceptions

Six cross-architecture Python cases skipped because the MIPS/ARM/AArch64 compilers
were unavailable. Live Ghidra, a populated cve-bin-tool database scan, and two moria
Python cases were not run. The Go moria end-to-end case also skipped. CUDA hardware
and real paid AI providers were not exercised; CPU rendering and both provider
protocols were covered through available tests. No live external provider call was
made. The source ZIP omits moria source and its pinned gitlink, so extraction needs
a separate compatible installation; see `ENVIRONMENT.md`.

Remaining IFDA strings are confined to NOTICE/provenance and upgrade/report text,
`defile/compat.py`, `service/legacy_data.go`, both `compat-storage.js` files and their
three compatibility test files. They exist to preserve original attribution or
migrate existing installations. Private ignored baseline artifacts retain original
names and are excluded from the source archive. No active product filenames or
package directories retain the old name.

## Build and launch

From the DEFILE source directory on Linux, macOS or WSL:

```bash
python3 -m venv .venv
. .venv/bin/activate
python3 -m pip install -e .
cd service
go build -o defile-service .
./defile-service -addr 127.0.0.1:8080 -core .. -data ./.data
```

Open `http://localhost:8080`; a new installation prints its generated admin
credentials in the startup log. Existing installations should read `UPGRADING.md`
and pass the same data directory. Optional tools retain their original identities.
