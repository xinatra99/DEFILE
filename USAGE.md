# First investigation

Install [DEFILE Full](README.md#install-defile-full) first. The public
[Live demo](https://defile-demo.austinbc.dev/) needs no credentials and only explores
recorded samples; it cannot accept your files or run these operations.

1. Activate the venv and run `sh service/start.sh` from the source root. Leave the
   terminal running. Open `http://localhost:8080`.
2. On first launch, find the generated `admin` password in that terminal's startup
   log. Enter it, the username and the displayed CAPTCHA. This is your private
   account. Change it in **User center → Change password**.
3. For a Linux/WSL2 trial without feed downloads, stop the idle service and restart
   with `DEFILE_DISABLE_CVE_BIN_TOOL=1 sh service/start.sh`. Keep the same runtime.
   Sign in again; restarting expires sessions.
4. Enter `/bin/true` as a path on the **analysis server**, then start analysis. This
   harmless system ELF is inspected without execution. Alternatively upload a copy;
   uploading submits analysis immediately.
5. Wait for completion. Review **Overview**, then **Findings**. A harmless program
   can have zero findings; that is a valid trial, not proof of complete security.
   Coverage warnings explain the deliberately disabled broad scanner.
6. Open **Inventory** for architecture, protections and recovered function metadata.
   On scans with findings, expand one, review evidence/confidence and follow the
   supporting binary/function evidence. Return controls retain investigation
   context. Files previews recorded scripts/configuration; Strings provides search.
7. Triage a finding as confirmed, false positive, accepted risk or new, and review
   its history. Filtered finding exports and complete scan exports serve different
   purposes.
8. Open **Reports** and download JSON, Markdown or CycloneDX SBOM. Keep private
   reports outside Git; paths, strings and evidence may contain secrets.
9. Configure integrations below only when needed. Finish or cancel active work
   before shutdown and restart against the same data directory. See
   [backup procedures](SETTINGS.md#persistent-state-and-backups).

On macOS `/bin/true` is Mach-O, not ELF: substitute a Linux ELF or an extracted
Linux tree. Native macOS setup was source-reviewed, not executed in this audit.

## Choose the input

An **ELF executable** is an individual Linux program/library. Analyze it directly.
An **extracted root filesystem** is a directory of programs, libraries, configuration
and scripts; analyzing that tree also enables filesystem, script and cross-binary
stages. A **firmware image** is a packed update, partition or flash container and
may need extraction first. Extensions alone do not establish format support.

For packed images, install [Moria](ENVIRONMENT.md#moria-extraction), restart the
idle service, choose **Extract firmware**, and inspect its regions. Choose a usable
region and **Start analysis**, or extract a nested container again. Multiple root
filesystems are possible; DEFILE does not choose automatically. Unsupported or
encrypted formats can remain partially or wholly unanalyzed.

Ordinary Linux ELF programs also work; inputs need not originate from IoT devices.
Static service/port detections are inferences, not live probes. Findings and
heuristic taint paths require analyst validation.

## Optional evidence

- **Ghidra:** adds finding-associated pseudocode. Install its compatible full JDK
  and enable enrichment in Analysis options before a new scan. Ordinary disassembly
  works without it.
- **CVE feeds:** scanner installation does not populate advisories. Initialize
  explicitly for broad correlation; bundled offline coverage is small.
- **AI investigation:** configure an OpenAI-compatible or Anthropic-compatible
  endpoint, fetch/select its model and save a profile in AI settings. Run AI Analysis
  on a completed scan. Selected evidence and tool-retrieved firmware details may
  leave the server; provider charges and retention terms apply.

Use [setup](ENVIRONMENT.md), [settings](SETTINGS.md) and the complete
[CLI reference](CLI.md) for exact procedures.
