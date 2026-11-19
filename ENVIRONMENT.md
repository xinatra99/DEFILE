# DEFILE environment setup

Start with [README.md](README.md) for the minimum installation, then use this guide
for optional integrations. See [SETTINGS.md](SETTINGS.md) for every service flag,
environment setting, account, AI and storage procedure; [CLI.md](CLI.md) for all
commands; [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for recovery; and
[RELEASE.md](RELEASE.md) for executed checks. Upgrade instructions are in
[UPGRADING.md](UPGRADING.md).

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

The five required Python dependency bounds are Capstone `>=4.0`, pyelftools
`>=0.29`, cryptography `>=41.0`, Pillow `>=10.0` and cve-bin-tool `>=3.4`.
These are lower bounds, not a frozen environment. `service/go.mod` and `go.sum`
record Go dependencies (including SQLite); older upstream statements that the
service has zero third-party dependencies are obsolete. Node.js **24.x** is the
release toolchain for Live (`.nvmrc`, package engines and Vercel), not a Full
prerequisite. The original draft requirements are not implemented guarantees:
binary disassembly supports ELF x86/x86-64, ARM/Thumb, AArch64 and MIPS LE/BE;
PE, Mach-O, RISC-V disassembly, dynamic emulation and angr execution are not implemented.

## Install Python and build the service

From the DEFILE source directory:

On Debian/Ubuntu, install `python3-venv` and `python3-pip` first; the base Python
package alone may not include `ensurepip`. Install Go separately at the version
declared in `service/go.mod` (1.25.0+). Use [official Go downloads](https://go.dev/dl/),
select the archive for your OS/CPU and verify its published SHA-256 before
extracting. Add its `bin` directory to PATH and check `go version`; a distribution's
older `golang` package may not meet the minimum. Install the full Python package,
not only the two distribution Capstone/pyelftools packages.

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

cve-bin-tool installation provides the scanner/checkers, not a populated advisory
database. Component detection identifies names/versions; correlation matches
advisory ranges. Vendor backports and uncertain versions still require review.
The curated `defile/data/vuln_db.json` is a small offline fallback, including
kernel-banner matching, not a complete feed. Installing the package alone does
not establish broad CVE coverage.

The wrapper runs once per target tree, with `-u daily -n api2` and a 1,800-second
timeout. It imports DEFILE's compatibility patch before invoking the scanner.
Initial synchronization may need multi-GB storage and substantial time/network
access; subsequent runs reuse `~/.cache/cve-bin-tool` for the **service OS user**.
Firewall/proxy restrictions, API throttling and permissions can block updates.
See the installed `cve-bin-tool --help` and [scanner documentation](https://cve-bin-tool.readthedocs.io/)
for feed credentials/settings. These are separate from AI-provider credentials.
An explicit, potentially large manual synchronization using the same patch is:

```bash
python3 -c 'import defile.vuln._nvd_patch; from cve_bin_tool.cli import main; raise SystemExit(main())' \
  -u now -n api2 --disable-version-check /bin/true
```

`scripts/bootstrap_nvd_cache.py` optionally imports the documented public NVD
snapshot mirror (FKIE, third-party). It is a manual NVD-only operation, not service
startup or a full synchronization of all feeds. It needs download, RAM and disk,
uses dependency internals, and was not live-tested in this audit. The wrapper's
runtime patches address cve-bin-tool 3.4 count/formatting failures without editing
the installed dependency. The old upstream `-n json` example is obsolete. Do not
add `-q` to the 3.4 integration: it can suppress the JSON report. Scanner exit 1
may mean findings, so inspect its output. Use `defile vulndb` to distinguish
executable availability, checker names and database counts; zero feed counts do
not mean an empty set of vulnerabilities. Missing/disabled scanner leaves a
limited-coverage warning; timeout or invalid/missing output leaves an incomplete
correlation warning. Set `DEFILE_DISABLE_CVE_BIN_TOOL=1` for deliberate offline
bundled-only scans. No feeds were downloaded for this audit.

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
skip those cases. Cross-compiler package availability varies by distribution; the
tested Ubuntu repositories did not provide gcc-mips-linux-gnu. A separate matching
toolchain can be used; cross-compilers are not ordinary analysis prerequisites.
Unix permission/device/FIFO fixtures need a Linux filesystem:
Windows-mounted WSL directories without metadata support cannot provide the
required mode bits, device nodes or FIFOs, or enforce 0600 key permissions.
Prefer a checkout under the Linux home directory (`~/DEFILE`) and run as an
ordinary user. If keeping source on a Windows mount, select an absolute native
Linux `-data` directory instead of putting secrets in `service/.data` on that
mount. Cross-compilers build test fixtures; ordinary foreign-architecture ELF
analysis does not require a compiler or emulator.

## Ghidra enrichment

Install a Ghidra release and the full JDK it requires. Set `GHIDRA_HOME` to the
installation directory containing `support/`; discovery then tries `/opt/ghidra`,
`/usr/share/ghidra`, `/usr/local/ghidra`, and a headless launcher on PATH. A PATH
symlink may require explicit GHIDRA_HOME because the home is derived from its
location. Ghidra 11.1.2 from the original notes declares Java 17 minimum in its
[release properties](https://github.com/NationalSecurityAgency/ghidra/blob/Ghidra_11.1.2_build/Ghidra/application.properties).
The inspected newer Ghidra 12.2 declares **Java 25**, not Java 17 or 21, in its
[release properties](https://github.com/NationalSecurityAgency/ghidra/blob/Ghidra_12.2_build/Ghidra/application.properties).
Always follow your chosen [official release](https://github.com/NationalSecurityAgency/ghidra/releases)
requirements. Neither version was live-tested in this audit; newer scripting
compatibility must be checked with the opt-in integration test.

```bash
export GHIDRA_HOME=/opt/ghidra
export JAVA_HOME=/absolute/path/to/full-jdk
test -x "$JAVA_HOME/bin/javac"
"$JAVA_HOME/bin/java" -version
"$GHIDRA_HOME/support/analyzeHeadless"
```

The final command should show headless usage, not a Java selection error; actual
analysis also requires project/import arguments. Discovery and `/healthz` are
file probes, not proof that Java or decompilation works.

```bash
python3 -m defile.cli analyze ./rootfs --json report.json --decompile
DEFILE_GHIDRA_TEST=1 python3 -m pytest tests -q -k decompile
```

The post-script is `defile/re/ghidra_scripts/defile_decompile.py`. Only functions
referenced by findings are requested, although Ghidra still imports and analyzes
each binary. Per-file and subprocess timeouts bound the cost; the pipeline runs
up to four independent targets concurrently. Defaults are 120 seconds per-file
analysis and 300 seconds outer timeout (Python API parameters, not service flags).
Missing Ghidra leaves a warning; analysis continues.

For `Unable to prompt user for JDK path, no TTY detected`, set the actual full JDK
path in Ghidra's `support/launch.properties`, for example:

```properties
JAVA_HOME_OVERRIDE=/absolute/path/to/full-jdk
```

A JRE without `bin/javac` may be rejected with little detail. Check for `javac`
and validate the headless launcher before running the live integration test.
`JAVA_HOME_OVERRIDE` is a Ghidra property, not a DEFILE env variable. The release's
`support/LaunchSupport.jar` Java-discovery diagnostic can help isolate launch
failures. On macOS, use `/usr/libexec/java_home` to find the appropriate installed
JDK; approve manually downloaded applications through the normal macOS security UI.

## moria extraction

Moria is external and optional. Upstream IFDA pins commit
**`656a1d31dfa816e78828747d5c27e84c8f1cfb97`**, reporting **0.2.1**.
The supplied ZIP had the submodule declaration but no Moria source; DEFILE removed
the orphan declaration instead of publishing a nonfunctional submodule. Previously
the generic external-install advice lost the pin's reproducibility. The following
explicit checkout restores it without a Git submodule. Later versions are not
automatically verified. Run at the DEFILE root with no existing `moria/`:

```bash
sudo apt-get install cmake g++ zlib1g-dev liblzma-dev liblz4-dev libzstd-dev
git clone https://github.com/nmatt0/moria.git moria
git -C moria checkout --detach 656a1d31dfa816e78828747d5c27e84c8f1cfb97
bash scripts/build-moria.sh
export DEFILE_MORIA="$PWD/moria/build/moria"
export PATH="$PWD/moria/build:$PATH"
"$DEFILE_MORIA" --version
mkdir -p smoke-root
printf 'DEFILE extraction check\n' > smoke-root/hello.txt
tar -cf smoke.tar -C smoke-root hello.txt
defile extract smoke.tar --out smoke-extracted --json regions.json --progress
python3 -m pytest tests/test_ingest.py -q -rs
```

Inspect `regions.json`, find a usable region and verify its `hello.txt`. The helper
requires CMake and a C++20 compiler and produces **`moria/build/moria`**; it does
not install a system binary. Codec development libraries enable compressed formats;
inspect CMake output because missing codecs can leave extraction formats disabled
despite a successful build. Retain Moria's MIT notice when redistributing it.
The PATH export also enables tests that specifically skip unless Moria is on PATH.

Resolution order is nonempty `DEFILE_MORIA`, `moria/build/moria`, then PATH. An invalid
explicit override does not silently fall back. The wrapper merges identification
and extraction JSON by byte offset. `ok`/`partial` regions with actual output are
usable; the analyst chooses the desired filesystem instead of an automatic guess.
Partial output does not guarantee completeness; nested containers may need another
extract pass. Extraction accepts a single file, not a directory. Format/recursion
coverage comes from this Moria build, not every format in the draft requirements.
`GET /healthz` exposes `moria_version`; restart an idle service after installation.
Missing moria affects extraction, not analysis of an extracted tree.

## macOS

These instructions were source-reviewed, **not executed on macOS**. Use
`brew install python@3.12 go`, then `python3.12 -m venv .venv`, activate it and
follow the package/service commands above. Check `go version` meets 1.25.0.
Intel and Apple Silicon pure-Go service builds need no C toolchain. Optional
Moria needs a C++20 compiler (Xcode Command Line Tools) and
`brew install cmake zlib xz lz4 zstd`, followed by the same pinned source build;
review CMake's codec discovery. Ghidra still requires its release-specific full
JDK; do not guess a Homebrew installation path or assume the cask installs Java.
On macOS `/bin/true` is Mach-O: substitute a Linux ELF/tree for the Linux smoke
analysis example.

## Optional Python integrations

`python3 -m pip install yara-python` enables the bridge when
`defile/data/yara/*.yar` or `*.yara` files exist. Create that directory and supply
valid rules; no YARA rule pack is bundled. The ordinary JSON signature library
works without YARA. Custom JSON is supported by the Python rule loader, not a
nonexistent CLI rules flag.

`python3 -m pip install '.[cuda]'` installs `cupy-cuda12x>=12.0` for a compatible
NVIDIA driver/CUDA 12 environment. Choose another appropriate CuPy wheel separately
if needed. CUDA accelerates chart rasterization, not the analysis engine; no GPU
or usable CuPy means automatic Pillow CPU rendering. The `.[taint]` extra installs
angr, but no angr backend is wired in: it is a future integration, not a required
dependency or a current accuracy upgrade. YARA was exercised with yara-python 4.5.4
and a harmless custom rule through both wrappers. CUDA was source-reviewed only;
no usable GPU/CuPy test environment was available.

## Final checks

```bash
python3 -m pip install pytest build
python3 -m pip check
python3 -m pytest tests -q -rs
DEFILE_DISABLE_CVE_BIN_TOOL=1 defile analyze /bin/true --json report.json --md report.md --sbom sbom.json
cd service
go test ./...
go vet ./...
go build -o defile-service .
```

Historical release-note pass counts are not current validation results.
Keep the venv active for Go tests that invoke the chart-rendering Python process.
`python3 -m build` exercises package build tooling; the complete source checkout
and editable installation are the verified operational distribution.

## Operational limits

These are implementation defaults, not additional service/CLI flags. They are
preserved from the selected upstream; a successful scan is not exhaustive coverage.

| Path | Bound / consequence |
|---|---|
| Secret matching (`inventory/secrets.py`) | At most 20,000 regular files; reads up to 8 MiB each; entropy findings capped at 25 per file. Certificate inventory also limits file count/size. |
| General inventory (`inventory/firmware_meta.py`) | Default 200,000 entries; files above 64 MiB skip inventory MD5. Kernel banner scanning reads at most 64 MiB per file. |
| Non-ELF inventory strings | Files above 2 MiB are skipped for this string view; at most 500 strings retained per file. The separate secrets stage has its own larger read bound. |
| File preview (`service/api.go`) | 256 KiB, with truncation indicated; only recorded regular paths are readable. This is not the complete file content export. |
| Moria wrapper | 20-minute subprocess timeout; Moria's own format/size/depth guards can yield partial output. This is separate from `-analyze-timeout`. |
| AI investigation | At most 60 initial selected finding entries, six tool rounds and 20 tool calls, with further character/result budgets; not every finding is sent. |
| Upload parsing | The 256 MiB multipart memory threshold is not a total upload-size quota. Full does not implement tenant isolation, a disk quota or a general execution sandbox. Workers/extractors run with the service OS user's permissions. |

For unusually large trees, inspect warnings, omitted/truncated views and actual
report coverage. Retain original inputs. Raising a service timeout does not remove
these independent per-stage bounds.
