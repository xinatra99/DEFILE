# Command-line reference

Activate the installed venv first. `defile` and `python3 -m defile.cli` run the
same entry point. Linux ELF binaries and extracted trees are analysis inputs;
the host does not need to match their CPU architecture. See [setup](ENVIRONMENT.md).

| Command | Arguments and supported options |
|---|---|
| `analyze TARGET` | `--json PATH`, `--md PATH`, `--sbom PATH`, `--chart PATH`, `--triage PATH`, `--progress`, `--decompile` |
| `extract TARGET` | Required `--out DIRECTORY`; optional `--json PATH`, `--progress`; requires Moria |
| `chart SLICES_JSON OUTPUT_PNG` | Render `[{"name":"…","value":1}, …]`; reports CPU/CUDA renderer as JSON |
| `triage STORE_JSON FINDING_ID STATE` | Set `new`, `confirmed`, `false_positive` or `accepted_risk` |
| `vulndb` | Print curated records, scanner/checker availability and local database counts |

Each command accepts `--help`. There is no CLI account manager, compare command,
feed-sync command, architecture selector or universal config file. Those operations
belong to the service, external dependencies or Python API, as documented.

## Harmless end-to-end example (Linux/WSL2)

From the source root, in the venv:

```bash
mkdir -p smoke-output
DEFILE_DISABLE_CVE_BIN_TOOL=1 defile analyze /bin/true \
  --json smoke-output/report.json --md smoke-output/report.md \
  --sbom smoke-output/report.sbom.json --chart smoke-output/chart.png --progress
python3 -m json.tool smoke-output/report.json > /dev/null
python3 -m json.tool smoke-output/report.sbom.json > /dev/null
```

This analyzes `/bin/true` statically; it does not execute the target or download
feeds. The deliberate broad-scanner disable is reflected in coverage warnings.
Markdown contains the human-readable report; SBOM is CycloneDX 1.5 JSON.
On macOS `/bin/true` is Mach-O: substitute a Linux ELF or an extracted Linux tree.

Without `--json`, `--md` or `--sbom`, analysis JSON goes to stdout (even if
`--chart` is given). With report paths, a short summary goes to stderr.
`--progress` emits `@@DEFILE@@` followed by one JSON object per stderr line;
keep stdout and stderr separate in integrations. Output parent directories must
already exist. `--decompile` is opt-in and needs a working Ghidra/JDK installation.

Triage uses an ID from your report, not a title:

```bash
defile triage triage.json FINDING_ID false_positive
DEFILE_DISABLE_CVE_BIN_TOOL=1 defile analyze ./rootfs --triage triage.json --json reviewed.json
```

Replace `FINDING_ID` with the actual fingerprint. CLI triage stores decisions in
the specified JSON; it is separate from the service runtime unless explicitly
coordinated while the service is stopped. False-positive/accepted-risk findings
are suppressed by the CLI triage application. The service keeps its complete
report and applies its triage overlay for interactive review.

For a generic chart:

```bash
printf '[{"name":"unchanged","value":3},{"name":"modified","value":1}]\n' > slices.json
defile chart slices.json chart.png
```

For raw extraction and the exact supported Moria pin, use
[the tested extraction procedure](ENVIRONMENT.md#moria-extraction). Extraction
returns regions rather than an analysis report; choose a usable region and submit
its path to `analyze`. Missing Moria causes a nonzero extraction exit and an error
field. Archive filenames alone do not establish format support.
