# Upgrade to DEFILE

The analysis model, rule IDs, finding fingerprints, API routes and report structure
remain compatible. Existing firmware evidence, filenames, extracted strings,
triage decisions and stored AI narratives are not rewritten. New interface text,
reports and AI narratives use DEFILE and English.

1. Finish or cancel active jobs before stopping the previous service. Incomplete
   scans are not resumable. Back up the complete data directory while stopped,
   including `reports.db`, active WAL files, `ai.key`, `users.json`, triage state
   and audit log, job directories and uploads. Keep the database and key together.
2. From this source directory, replace the old package in the active environment:

   ```bash
   python3 -m pip uninstall ifda
   python3 -m pip install -e .
   python3 -m defile.cli --help
   ```

3. Build and run against the same absolute data directory:

   ```bash
   cd service
   go build -o defile-service .
   ./defile-service -core .. -data /absolute/path/to/existing/data -addr 127.0.0.1:8080
   ```

4. Update process managers and integrations from `ifda-service`, `ifda` and
   `python3 -m ifda.cli` to `defile-service`, `defile` and `python3 -m defile.cli`.
   No parallel old package or CLI alias is installed. External progress consumers
   must change `@@IFDA@@` to `@@DEFILE@@`; both bundled ends are updated.
5. Replace `IFDA_MORIA` with `DEFILE_MORIA` and `IFDA_DISABLE_CVE_BIN_TOOL` with
   `DEFILE_DISABLE_CVE_BIN_TOOL`. A read-only fallback accepts these two production
   settings. Explicit new values win, including empty strings. Developer opt-ins
   are now `DEFILE_GHIDRA_TEST` and `DEFILE_CVE_BIN_TOOL_TEST`.

Without `-data`, an existing new `defile-service` temporary directory wins. If it
does not exist and the old `ifda-service` default contains installation state, the
service reuses it in place. It never automatically moves, merges or re-encrypts
private data. Prefer explicit `-data`. The startup script uses `service/.data`.

New data directories are created with owner-only permissions (0700). For an
existing dedicated data directory, set `chmod 700 /absolute/path/to/existing/data`
as its owner. Do not apply that command to a shared system directory. Reports and
extracted strings may contain secrets even though provider API keys are encrypted.

At the same browser origin, a one-time compatibility script copies theme, display
name, finding grouping, sensitive keywords, username and token to missing
`defile-*` keys, preserving values verbatim. A marker prevents old tokens returning
after logout. Old preferences remain for rollback; obsolete language keys are
removed. Different origins cannot share this automatic browser migration.

The bundled rule schema is `defile-secret-rules/1`. Existing custom rules carrying
`ifda-secret-rules/1` still load because the loader consumes unchanged rule fields
without rejecting that label. IDs and fingerprints remain intact.

The engine and package version is `2.8.0+defile.2`. On resubmission it invalidates
dedup entries from earlier engine versions, causing a full scan. Historical stored
reports remain available.

## Original-name reference inventory

| Shipped location | Justification |
|---|---|
| `NOTICE`, this guide, migration report and README provenance link | Attribution, modification notice and upgrade instructions |
| `defile/compat.py` | Fallback for existing environment settings |
| `service/legacy_data.go` | Preserve the previous default data location |
| Both `compat-storage.js` files | One-time browser migration and obsolete-setting cleanup |
| `tests/test_migration.py`, `tests/web_migration.test.mjs`, `service/legacy_data_test.go` | Compatibility regression fixtures |

Ignored private validation artifacts contain original baseline output and are
excluded from the distributable archive. Historical scan content is not rewritten
for branding or language.
