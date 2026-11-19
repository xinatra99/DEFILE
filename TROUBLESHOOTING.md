# Troubleshooting and recovery

[Setup](ENVIRONMENT.md) · [Settings, accounts and backups](SETTINGS.md) ·
[CLI](CLI.md) · [Release verification](RELEASE.md)

| Symptom | Check and resolution |
|---|---|
| `ensurepip` unavailable creating venv | Debian/Ubuntu needs `python3-venv` (or the matching version-specific venv package) and `python3-pip`; recreate the failed venv after installing them. |
| `ModuleNotFoundError`, `defile` absent | Activate this checkout's venv, run `python3 -m pip install -e .`, `python3 -m pip check`, and `python3 -c 'import defile; print(defile.__file__)'`. Check `command -v python3` before starting the service. |
| Old Go / module needs newer toolchain | `service/go.mod` requires 1.25.0+, not upstream's outdated 1.22. Install a suitable official toolchain; check PATH and `go version`. |
| VCS stamping error under another OS user | Use the checkout owner where possible. For a nested validation checkout, `go build -buildvcs=false -o defile-service .` avoids stamping; do not globally mark unrelated directories safe. |
| Browser connection refused | Keep `sh service/start.sh` running in its terminal; inspect startup errors and `/healthz`. Full is port 8080; the separate static preview is 8081. An already-used port needs another `-addr`, not a password reset. |
| `fork/exec python3: no such file or directory` | Also check the **`-core` directory**, not just Python. Workers chdir there before exec; nonexistent cwd can produce this misleading error. Pass the correct repository root, activate its venv, rebuild/restart. |
| Empty history, missing providers or newly generated admin | Read the absolute `data dir:` log. `service/.data`, root `.data`, the OS temp default and `-data ./` are different locations. Stop, locate the intact original runtime and restart against it. Do not delete/reseed files or merge databases. |
| Forgotten password | Follow the stopped-service `-user`/`-pass`/`-reset-pass` procedure in SETTINGS.md against the **same** runtime. Existing-account seed flags alone intentionally do not reset it. |
| Login fails despite known password | Refresh the one-use CAPTCHA; confirm this is the intended Full instance. Five failed credential attempts lock the username for five minutes. A restart expires all sessions; sign in again. No public Live credentials exist. |
| `ai.key` length/permission/decryption failure | Stop and restore the matching complete backup, including database and key. Do not delete/regenerate the key to repair existing encrypted credentials. Verify native Unix filesystem permissions. |
| Extract disabled / `moria not installed` | Follow the exact pinned build in ENVIRONMENT.md. Check `DEFILE_MORIA` is executable, `moria_version()` resolves it, then restart an idle service: capability probes run once at startup. A bad explicit override blocks fallback. |
| Moria builds but compressed extraction fails | Inspect CMake codec checks; install zlib/LZMA/LZ4/Zstd development packages and rebuild. An identified region need not be extractable; partial output is not complete firmware support. Select a usable region or extract another nested layer. |
| Extract reports a directory error | `extract` accepts a raw file. Point `analyze` at an already-extracted directory instead. |
| Ghidra unavailable | Set GHIDRA_HOME to the directory with `support/analyzeHeadless`, check executable bits and launch directly. `/healthz` is only a discovery probe. |
| Ghidra says no TTY / cannot select Java | Install the chosen release's **full JDK**, check `bin/javac`, set the actual directory in `support/launch.properties` as `JAVA_HOME_OVERRIDE=...`. Java 17 advice applies to 11.1.2; 12.2 requires Java 25. See ENVIRONMENT.md. |
| Ghidra found but no pseudocode | Test headless import and the opt-in integration. Only functions associated with findings are requested. Launcher/JDK/script errors and timeouts can leave no enrichment; absence of pseudocode does not imply absence of findings. |
| CVE checker installed but zero feed counts | Installation is not synchronization. `defile vulndb` distinguishes checkers from local advisory rows. Initialize explicitly if desired; expect network/time/disk use. Check the cache owner, API rate limits and network restrictions. |
| CVE timeout, missing JSON or restricted network | Retain the report warning. Use the patched API2 synchronization command in ENVIRONMENT.md; do not use stale `-n json` or quiet mode. For intentional offline work, set `DEFILE_DISABLE_CVE_BIN_TOOL=1`; bundled coverage remains limited. |
| YARA does nothing | Both `yara-python` and valid rules under `defile/data/yara/` are required. No YARA pack is shipped. JSON signature rules are independent. |
| CUDA unavailable | CPU Pillow rendering is supported. CuPy wheel, NVIDIA driver and CUDA must match; CUDA changes chart rendering only. |
| AI model list/test fails | Use the provider's versioned API base, protocol and key. HTML usually means a website/wrong base. The configured endpoint must support model listing; a successful listing does not prove completion/tool support or available credit. |
| AI stream interrupted/truncated | Partial content is retained with an error/truncation indication. Check provider/network/output budget. A retry may incur a new provider charge; core analysis remains available. |
| Missing Unix hardening findings / key mode error on WSL | Move runtime to native Linux storage and use Linux metadata-capable test fixtures. Windows mounts without metadata cannot model all Unix permissions, device nodes or FIFOs. |
| Old results after re-submission | Dedup uses path/size/mtime and engine version. Use Re-scan (`force:true`) to bypass it. Stored reports do not retroactively acquire new evidence. |
| Job interrupted during shutdown | Partial analysis is not resumable. Restart with the same data directory, inspect reconciled status, and resubmit if needed. Wait/cancel before shutdown; do not assume orphan workers finish. |
| UI unchanged after source edits | Full embeds its web files: rebuild the Go executable and restart. Live needs `npm run build`; use Node 24.x and its own output/preview. |

If recovery is uncertain, preserve the complete stopped-state runtime before
trying anything destructive. Reports and uploaded firmware can contain secrets;
keep diagnostic logs, backups and screenshots private. Share only sanitized errors.
