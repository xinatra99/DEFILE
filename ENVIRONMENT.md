# DEFILE environment setup

See [README.md](README.md) for usage, [UPGRADING.md](UPGRADING.md) for existing
installations, and [MIGRATION_REPORT.md](MIGRATION_REPORT.md) for actual verification.

## Toolchain

Linux and macOS are supported; Windows needs WSL2. Capstone decodes the firmware's
architecture independently of the host CPU. The service uses POSIX process groups
for job control and a pure-Go SQLite driver without cgo.

| Component | Role |
|---|---|
| Python 3.10+ | Required engine and CLI |
| capstone, pyelftools | Multi-architecture disassembly and ELF parsing |
| cryptography, Pillow | Certificate inventory and CPU chart rendering |
| cve-bin-tool 3.4+ | Required broad CVE correlation; absence produces a visible warning and a small bundled-database fallback |
| Go 1.25+ | Service build; the actual minimum is declared in `service/go.mod` |
| GCC, optional cross-compilers | Compile test fixtures; ordinary analysis does not need cross-compilers |
| Ghidra and compatible full JDK | Optional finding-specific pseudocode |
| moria | Optional raw-image identification/extraction |
| yara-python, CuPy | Optional YARA bridge and CUDA chart rendering |

## Install Python and build the service

From the DEFILE source directory:

On Debian/Ubuntu, install `python3-venv` and `python3-pip` first; the base Python
package alone may not include `ensurepip`. Install Go separately at the version
declared in `service/go.mod`.

```bash
python3 -m venv .venv
. .venv/bin/activate
python3 -m pip install -e .
python3 -m pip install pytest
# Optional:
python3 -m pip install yara-python
python3 -m defile.cli --help
cd service
go build -o defile-service .
go vet ./...
./defile-service -addr 127.0.0.1:8080 -core .. -data ./.data
```

Open `http://localhost:8080`. A new installation generates an admin password in
the startup log. The active virtual environment must put the intended `python3`
on the service's PATH. From the project root, `sh service/start.sh` resolves its
own directory and uses `service/.data` without hardcoded credentials.

`-workers` defaults to 2, `-queue` to 128, and `-analyze-timeout` to 2h. The latter
is a hard subprocess limit, not a duration estimate; large targets may need more.
When a nested checkout under another OS user causes VCS stamping to fail, use
`go build -buildvcs=false -o defile-service .` without changing application behavior.

### Authentication and data

`-auth` defaults to true. `-user`/`-pass` seed a new account, without overwriting
an existing password. Deliberate recovery also requires `-reset-pass`; remove
that flag afterward. The Go authentication store retains salted PBKDF2 hashes,
per-account failure lockout, CAPTCHA and in-memory sessions.

Keep `reports.db`, its active WAL files, `ai.key`, `users.json`, jobs, uploads,
`triage.json` and its audit log together. Losing `ai.key` strands encrypted
provider keys. A wrong `-data` directory can quietly expose empty or stale history.
Wait for active scans before restarting; incomplete analyses are not resumable.

## CVE database

cve-bin-tool maintains its own NVD/OSV/RedHat/GitLab Advisory/Curl cache. Initial
synchronization can exceed a gigabyte and needs network access; later runs reuse
it. A manual prewarm command from the supplied setup is:

```bash
cve-bin-tool -u now -n json --disable-version-check /bin/true
```

`scripts/bootstrap_nvd_cache.py` optionally imports the documented public NVD
snapshot mirror. It is a manual operation, not service startup. The wrapper's
runtime patches address cve-bin-tool 3.4 count/formatting failures without editing
the installed dependency.

Default tests set `DEFILE_DISABLE_CVE_BIN_TOOL=1`, avoiding real downloads and
repeated database scans. Opt into the live test with:

```bash
DEFILE_CVE_BIN_TOOL_TEST=1 python3 -m pytest tests -q -k cve_bin_tool
```

## Cross-architecture and filesystem tests

```bash
sudo apt-get install gcc gcc-mips-linux-gnu gcc-arm-linux-gnueabi gcc-aarch64-linux-gnu
python3 -m pytest tests -q -rs
```

Fixtures cover x86-64, MIPS LE/BE, ARM, Thumb-2 and AArch64. Missing compilers
skip those cases. Unix permission/device/FIFO fixtures need a Linux filesystem:
Windows-mounted WSL directories without metadata support cannot provide the
required mode bits, device nodes or FIFOs, or enforce 0600 key permissions.

## Ghidra enrichment

Install a Ghidra release and the full JDK it requires. Set `GHIDRA_HOME` to the
installation directory; `/opt/ghidra` and a headless launcher on PATH are also
recognized. Ghidra 11.1.2, used by the supplied setup notes, needs JDK 17+.
Other releases may have different requirements.

```bash
python3 -m defile.cli analyze ./rootfs --json report.json --decompile
DEFILE_GHIDRA_TEST=1 python3 -m pytest tests -q -k decompile
```

The post-script is `defile/re/ghidra_scripts/defile_decompile.py`. Only functions
referenced by findings are requested, although Ghidra still imports and analyzes
each binary. Per-file and subprocess timeouts bound the cost; the pipeline runs
up to four independent targets concurrently. Missing Ghidra leaves a warning.

For `Unable to prompt user for JDK path, no TTY detected`, set the actual full JDK
path in Ghidra's `support/launch.properties`, for example:

```properties
JAVA_HOME_OVERRIDE=/usr/lib/jvm/java-21-openjdk-amd64
```

A JRE without `bin/javac` may be rejected with little detail. Check for `javac`
and validate the headless launcher before running the live integration test.

## moria extraction

Moria is an external optional installation; this repository does not ship its
source, binary or a pinned Git submodule. Install a compatible executable separately
and set `DEFILE_MORIA`, or put Moria source in `moria/` and use
`bash scripts/build-moria.sh` (CMake, C++20 and the libraries required by that
Moria release).

```bash
export DEFILE_MORIA=/absolute/path/to/moria
"$DEFILE_MORIA" --version
python3 -m defile.cli extract firmware.bin --out extracted --json regions.json
python3 -m pytest tests/test_ingest.py -q -rs
```

Resolution order is `DEFILE_MORIA`, `moria/build/moria`, then PATH. An invalid
explicit override does not silently fall back. The wrapper merges identification
and extraction JSON by byte offset. `ok`/`partial` regions with actual output are
usable; the analyst chooses the desired filesystem instead of an automatic guess.
`GET /healthz` exposes `moria_version`; restart an idle service after installation.
Missing moria affects extraction, not analysis of an extracted tree.

## macOS

Use `brew install python@3.12 go`, then the same virtual-environment, package and
service commands above. Intel and Apple Silicon service builds do not require a
C toolchain. Optional Ghidra still requires its JDK, and moria its own installation.

## Final checks

```bash
python3 -m pytest tests -q -rs
python3 -m defile.cli analyze /bin/true --json report.json --md report.md --sbom sbom.json
cd service
go test ./...
go vet ./...
go build -o defile-service .
```

Historical release-note pass counts are not current validation results.
