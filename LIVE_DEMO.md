# DEFILE Full and Live

Both editions use the Stage 2A Alpine workbench, styles, local fonts and vendored
Alpine runtime. Full embeds that frontend in the Go service. Live copies it into
a static bundle and installs an explicit, isolated browser data adapter.

## Preview Live

Requirements: Node.js 24.x for the pinned release. No npm dependencies, Python, Go, Moria, Ghidra,
vulnerability database or paid provider are needed to build or serve Live.

From the DEFILE directory in PowerShell, Command Prompt or a terminal:

```bash
npm ci --ignore-scripts
npm run build
npm run preview
```

Open **http://localhost:8081**; no credentials are required. Leave the preview
terminal running. Stop it with Ctrl+C. The generated directory is **dist/live**;
the preview binds to loopback only. Rebuild after changing frontend or sample files.

```bash
npm run test:live
```

These tests exercise the adapter, immutability, comparison, exports and built
bundle. Build first so the bundle checks inspect current output.

## Run Full

Full requires Python 3.10+, Go 1.25+ and the dependencies in pyproject.toml.
Use Linux/WSL or macOS and a native filesystem for persistent runtime data.
See [ENVIRONMENT.md](ENVIRONMENT.md) for system tools and optional integrations.
From the project root, a typical fresh installation is:

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -e .
cd service
go build -o defile-service .
cd ..
./service/defile-service -addr 127.0.0.1:8080 -core "$PWD" -data "$PWD/.data"
```

Open **http://localhost:8080**. On a fresh data directory, read the generated admin
password in the local startup log. Existing installations must keep their existing
data path and credentials; the command above is an example for a new installation,
not a migration command. See [UPGRADING.md](UPGRADING.md). Do not copy `.data` or
other private runtime directories into a static deployment.

No workstation-specific launcher or private runtime is required by this repository.
Use the documented service command above or `sh service/start.sh` from the root.
Full does not load Live's adapter or samples.

## Architecture and behavior

`scripts/build-live.mjs` checks JavaScript syntax, copies a whitelist of frontend,
legal and sample assets and generates a static index and 404 fallback. It does not
compile or deploy the Go service. The output's content security policy permits
same-origin data and local assets; it has no privileged backend or administrative
endpoint. `scripts/preview-live.mjs` is only a local static file server.

`demo/live.js` installs `DEFILE_TRANSPORT` before the shared application starts.
`demo/data-adapter.js` answers the existing frontend's read contracts in memory
from a recursively frozen dataset. It never forwards a request to Full or any
provider. Comparisons and chart requests compute against those records locally.
Mutating requests are rejected. The shared frontend falls back to its original
fetch, EventSource, local storage and report URLs when this adapter is absent.

| Area | Live behavior |
|---|---|
| Overview, history and inventories | Genuine navigation over recorded engine results; existing empty states where a fixture has no corresponding evidence |
| Findings, strings, binaries and files | Search, filters, sorting, pagination, real evidence and bundled text previews |
| Comparison | Actual local before/after finding, file and function comparison |
| Progress and extraction | Actual completed process events and Moria region results, labelled Recorded; no artificial running progress |
| Reports | Recorded JSON, Markdown and CycloneDX exports; filtered JSON/CSV generated locally |
| Ghidra | Existing finding detail with explicitly illustrative pseudocode; no Ghidra execution |
| CVE intelligence | Three reviewed affected-range rows for two public CVEs; recorded checker catalogue; no synchronization or live comprehensive matching |
| AI investigation | Authored illustrative evidence-based notes; no provider-generated origin claim, live inference or API key |
| Dictionary and appearance | Changes scoped to namespaced browser session storage; published records stay unchanged |
| Upload, analysis, execution, triage and administration | Visible controls explain that the operation requires Full; no pretend success or persistent mutation |

Ghidra, CVE and AI panels retain persistent Demo Preview labels. Information
buttons expose their explanations through hover, keyboard focus and touch pinning;
Escape or an outside click dismisses them. Hash navigation preserves the selected
sample and major view on refresh. All public data and downloads remain same-origin.

## Recordings and refresh

The original and hardened educational root filesystems yield **5 and 1 findings**.
A larger corpus of **101 ELF copies and 305 files** yields **305 findings**, allowing
real pagination and full filtered export. These are engine-generated heuristics,
not proof of exploitable vulnerabilities. The deliberate OpenSSL version strings
exercise version-banner matching; there is no OpenSSL implementation in the sample.
No vendor firmware, compiled executables or private historical reports are bundled.

See [demo/README.md](demo/README.md), [fixture source](demo/fixtures/probe.c),
[fixture notes](demo/fixtures/README.md) and [manifest](demo/data/manifest.json).
The manifest records input/report hashes, tool versions and counts. Actual engine
recordings and Moria extraction are distinct from the authored pseudocode and AI
notes. Public CVE references are listed in [curated-cves.json](demo/curated-cves.json).

To refresh under Linux/WSL with the engine virtual environment active, GCC installed,
Moria available, and `.tools/local-runtime` on a native Linux filesystem:

```bash
export DEFILE_MORIA=/absolute/path/to/moria
python3 scripts/record-demo.py
npm run build
npm run test:live
```

The recorder compiles but never executes its sample binaries, runs the existing
engine, records real progress and extraction, replaces private paths, re-keys
finding IDs and writes public exports into `demo/data`. It deliberately disables
external CVE feeds. Review generated data and manifests before redistribution.
The static builder overlays the reviewed CVE subset and rejects known private
paths, secret formats, executables and runtime artifacts in the output. It is
still necessary to review any newly introduced fixture and report content.

## GitHub to Vercel configuration

Stage 4 authorizes the independent `xinatra99/DEFILE` repository and the
`defile-demo` Vercel project. See [RELEASE.md](RELEASE.md) for the verified state.

Import the independent repository at its root. Select the static/Other framework,
Node.js 24.x, Build Command `npm run build`, Output Directory `dist/live`,
and Install Command `npm ci --ignore-scripts` (the package has no dependencies).
`vercel.json`, `.nvmrc` and the npm lockfile record these settings.
No environment variables or backend services are required. Use Vercel's assigned
preview URL first; verify hash refresh, asset URLs and all downloads. The authorized
production custom domain is `defile-demo.austinbc.dev`; configure only its required
DNS record at the authoritative provider, preserving the portfolio and unrelated records.

Do not select the repository root or private runtime as the published output.
Do not deploy Full as part of this static configuration. Keep LICENSE, NOTICE
and vendored dependency/font licenses with the public bundle.
