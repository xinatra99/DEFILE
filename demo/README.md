# DEFILE Live sample provenance

Live shares DEFILE Full's Stage 2A interface. Its static adapter performs genuine
navigation, filtering, sorting, pagination, comparison, previews and downloads
against bundled immutable recordings. It never connects to DEFILE Full.

Three reports were generated with the existing Python engine from project-authored,
redistributable C/filesystem fixtures: original, hardened and a 101-ELF-copy corpus.
The fixture source and Apache-2.0 license are included. No vendor firmware, compiled
executables, private runtime, credentials or third-party libraries are distributed.
The binary accepts no untrusted input. OpenSSL version banners are deliberate
educational matching signals; OpenSSL itself is not bundled. Findings are actual
engine heuristics, not new vulnerability discoveries or proof of exploitability.

Moria actually extracted the educational gzip/tar sample. The process-log view
shows actual completed engine events labelled Recorded; it never animates a fake
running analysis. Private recording paths are replaced with samples/... and finding
IDs re-keyed from sanitized content. The manifest lists input/report hashes and counts.

Ghidra pseudocode is an explicitly labelled illustration written for this demo;
Ghidra was not run. AI investigation notes are illustrative responses authored for
the demo, not outputs from an AI provider. No model inference occurs. CVE references
use the small reviewed subset in curated-cves.json; NVD and the OpenSSL advisory
identify the public records and affected branches.
There is no live CVE synchronization or comprehensive component-matching service.

Analysis, uploads, execution controls, triage persistence, destructive operations,
provider changes and external API requests explain their unavailability. Browser
theme/dictionary changes are session-only and do not modify published data.

Refresh recordings from Linux/WSL with the project virtual environment active:

```bash
export DEFILE_MORIA=/absolute/path/to/moria
python3 scripts/record-demo.py
```

Use a native Linux filesystem for .tools/local-runtime: Windows-mounted permission
semantics can otherwise introduce unrelated filesystem-hardening findings. This
recording directory is private, excluded from both distribution archives, and
contains generated executables that are never included in the public output.

GCC and existing engine dependencies are needed only for recording. Review data,
manifest and privacy checks before distributing refreshed samples. The normal
static build needs only Node 20+; public runtime needs only a static file host.
