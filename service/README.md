# DEFILE service layer (Go)

The orchestration tier of the hybrid architecture: a Go HTTP service that drives
the Python analysis core one artifact at a time, with a job queue, a progress
state machine, a REST API (FR-INT-1), batch/corpus submission with a dedup cache
(FR-ING-4 / NFR-PERF), and an embedded web UI that shows live task progress and
findings detail.

```
 browser ──HTTP──► Go service ──exec──► python3 -m defile.cli analyze --progress
   (web UI)         (queue +            (the Python core; JSON report + @@DEFILE@@
                     workers +           progress events on stderr)
                     REST API)
```

The boundary is the JSON report model (`defile/model.py`): the worker shells out
to the CLI, streams `@@DEFILE@@<json>` progress lines from stderr into the job,
and serves the resulting report file back over the API. No Python HTTP server is
needed — the CLI contract is the integration surface.

## Build & run

```bash
cd service
go build -o defile-service .                     # Go 1.25+
./defile-service -addr 127.0.0.1:8080 -core .. -data ./.data
# open http://localhost:8080
```

Flags: `-addr` (listen address), `-core` (dir containing the `defile` package;
auto-detected by walking up from cwd), `-workers` (concurrent analyses, default
2), `-queue` (max queued jobs), `-data` (dir for triage state + uploads; default
`$TMPDIR/defile-service`), `-analyze-timeout` (hard wall-clock cap per analyze
subprocess, default 2h — a safety net against a truly hung run, not a target-size
estimate; raise it for unusually large targets, e.g. an automotive/infotainment
image with thousands of binaries including embedded Chromium, which can need
well over an hour just for the disassemble stage).

Requires the complete Python package installed with `python3 -m pip install -e .`
in an active venv; two distribution Python packages alone are insufficient.
See [setup](../ENVIRONMENT.md), the complete [settings reference](../SETTINGS.md),
and [troubleshooting](../TROUBLESHOOTING.md). All flag defaults are listed there.

### Production launch

`sh service/start.sh` resolves its own directory and executes `defile-service`
with `-core ..`, `-data ./.data` and a loopback address. Additional flags may be
passed as arguments. It does not hardcode a username or password. On a new data
directory the service creates an admin password in its startup log.

Keep the same `-data` directory when upgrading. An empty or stale path can make
history and provider profiles appear missing without producing an error. See
`../UPGRADING.md` before changing data locations.

Wait for active jobs or cancel them before restarting. Interrupted scans are not
resumable. Do not assume a worker survives shutdown of the server/session; process
group and supervisor behavior vary. Completed reports and job history persist in
the selected runtime. Startup reconciles unfinished records.

### Auth flags: `-auth` / `-user` / `-pass` / `-reset-pass`

`-auth` defaults to `true` (login required). `-user`/`-pass` only **seed** an
account the first time it's created (e.g. first launch against a fresh
`-data` dir, or a username that doesn't exist yet in `users.json`) — they do
**not** overwrite a password that already exists, including one changed via
the web UI's User center → Change password. This is deliberate: if your
launch command (a systemd unit, a docker-compose command line, ...) always
passes the same `-user`/`-pass`, treating that as "set this every time" would
silently revert any password a user picked in the UI on every restart, with
no indication anything happened. When this path is taken, the log says so:

```
-user/-pass ignored: "admin" already has a password (possibly changed via the web UI) — pass -reset-pass to force it back to -pass
```

To actually force a password (e.g. recovering a forgotten one), pass
`-reset-pass` alongside `-user`/`-pass` — it overwrites unconditionally, every
time it's present, so remove it from the launch command again once you're
back in.

## REST API

| Method & path | Purpose |
|---|---|
| `POST /api/jobs` `{"target":"/path"}` | Enqueue an analysis; returns the job (202). Dedup cache returns a cached result for an unchanged target. Add `"kind":"extract"` to identify + unpack a raw firmware image via `moria` (FR-ING/FR-EXT; needs a moria build — see below) instead — the completed job carries `regions` (moria's findings, each with an `offset`/`type`/`status`/`usable`/`path`), not a findings report; pick a region and resubmit its `path` as a normal (or another `extract`) job. Add `"force":true` to bypass the dedup cache (e.g. the web UI's re-scan button); meaningless for `kind:"extract"`, which never uses the cache. |
| `GET /api/jobs` | List jobs (newest first) with status + progress. |
| `GET /api/jobs/{id}` | One job: status, progress %, stage, detail, counts. |
| `GET /api/jobs/{id}/events` | **SSE** stream of job progress until terminal. |
| `GET /api/jobs/{id}/report` | Findings report with triage overlaid. `?format=json\|md\|sbom`, `?download=1`. |
| `POST /api/jobs/{id}/triage` `{"finding_id","state"}` | Set triage (`new\|confirmed\|false_positive\|accepted_risk`); persisted. |
| `POST /api/upload` (multipart `file`) | Store an artifact server-side; returns a `target` path to submit. |
| `GET /api/captcha`, `POST /api/login` | Public challenge and username/password login. Login requires `captcha_id` and `captcha_answer`; returns a private `session` token. |
| `POST /api/logout`, `POST /api/change-password` | Revoke current session, or verify old password and set a new one. |
| `GET /api/jobs/{id}/summary` | Aggregate counts/metadata without loading the full report. |
| `GET /api/jobs/{id}/findings` | Paged findings; `offset`, `limit`, repeated `sev`, `vclass`, `triage`, `min_conf`, `q`, `sort`. |
| `GET /api/jobs/{id}/binaries`, `/scripts`, `/components`, `/files` | Inventory lists; `offset`/`limit`, or `all=1` where supported; files also accept `kind`. |
| `GET /api/jobs/{id}/binary?path=...` | One recorded binary's metadata/functions. |
| `GET /api/jobs/{id}/file-content?path=...` | Preview only a regular file recorded for this scan; special/unrecorded paths are refused. |
| `GET /api/jobs/{id}/busybox`, `/services`, `/dir-chart` | BusyBox/init inventory, static services, and root composition PNG. |
| `POST /api/jobs/{id}/pause`, `/resume`, `/stop` | Control running processes; stop is not resumable. |
| `DELETE /api/jobs/{id}`, `POST /api/jobs/batch-delete` | Remove terminal jobs/reports; batch body uses `ids`. |
| `POST /api/compare` | Compare scans; JSON body `a`, `b`, optional `sensitive_keywords`; bounded detail output. |
| `GET /api/triage/history` | Newest-first audit history; optional `finding_id`. |
| `GET /api/vulndb` | Curated data, scanner checker availability and local advisory counts. |
| `POST /api/chart/pie` | Render named/value slices as a PNG. |
| `GET`, `POST /api/ai/providers`; `PUT`, `DELETE /api/ai/providers/{id}` | Manage profiles; encrypted provider keys are never returned. |
| `POST /api/ai/models` | Fetch/test models with host/key/kind or saved `provider_id`; no completion requested. |
| `GET`, `POST /api/jobs/{id}/ai-analysis` | Read saved investigation or run with `provider_id`; response streams NDJSON events and persists progress. |
| `GET /healthz` | Liveness plus `login_required`, `ghidra_available`, `moria_version`. |
| `GET /` | Embedded single-page web UI. |

The table uses `/scripts` etc. as suffixes of the immediately preceding
`/api/jobs/{id}` prefix. Apart from CAPTCHA/login and health, state APIs require
a valid session. Set `DEFILE_SESSION` from your own login response and
`DEFILE_JOB_ID` from the job response before using the examples; keep tokens private.

Job states: `queued → running`, with pause/resume between `running` and `paused`.
Terminal outcomes are `completed`, `failed` or `cancelled`. While running,
`progress` (0–100), `stage`, and `detail` update live; clients receive them via
the SSE `events` stream (no polling).

```bash
curl -XPOST localhost:8080/api/jobs -H "Authorization: Bearer $DEFILE_SESSION" -H 'Content-Type: application/json' \
     -d '{"target":"/path/to/extracted_rootfs"}'
curl -N -H "Authorization: Bearer $DEFILE_SESSION" "localhost:8080/api/jobs/$DEFILE_JOB_ID/events"                 # live progress (SSE)
curl -H "Authorization: Bearer $DEFILE_SESSION" "localhost:8080/api/jobs/$DEFILE_JOB_ID/report"                 # findings JSON
curl -H "Authorization: Bearer $DEFILE_SESSION" "localhost:8080/api/jobs/$DEFILE_JOB_ID/report?format=md"     # Markdown export
curl -XPOST "localhost:8080/api/jobs/$DEFILE_JOB_ID/triage" -H "Authorization: Bearer $DEFILE_SESSION" \
     -H 'Content-Type: application/json' \
     -d '{"finding_id":"<id>","state":"false_positive"}'     # triage a finding
```

### Triage persistence

Triage is keyed by finding **fingerprint** (the same id the Python core uses),
stored in `<data>/triage.json`, and overlaid onto every served report. A decision
therefore survives a service restart and re-applies to any future job that
re-discovers the same finding (FR-VUL-8) — including across different scans of the
same firmware.

## Web UI

`web/index.html` + vendored `web/vendor/alpine.min.js`, both embedded into the
binary (no CDN, no build step — works air-gapped). Built on Alpine.js:

- **Header**: the open report's image name with its architecture, kernel and size; a
  segmented group for Compare / CVE database / Sensitive dictionary / AI settings; and a
  user menu holding the things set once per session (triage display name and theme).
- **Submit / upload** a target (server path or file upload) at the top of the left rail.
- **Job list** with live SSE progress. Every field in a card is single-line and clips, with
  the full value on its title attribute.
- Five primary tabs. **Dashboard**, **Findings**, **Inventory**, **Strings** and **AI
  analysis**; Inventory and Strings each open a second-level segmented control (Inventory:
  Binaries / Scripts / Components / Files / BusyBox / Services — Strings: all strings /
  sensitive).
- **Dashboard**: total findings with a proportional severity bar covering all five levels,
  an inventory tile row, and the BusyBox / network-service / rootfs-composition panels.
- **Findings**: severity pills carrying each level's count, plus filters for vuln class,
  triage state, confidence threshold and full-text search; sort by severity/confidence;
  group by component (a group of more than five starts collapsed) or show a flat list;
  expand a finding for evidence, taint path, and decompiled pseudocode; triage inline
  (confirm / false-positive / accept-risk / reset).
- **Binaries**: fixed-height rows; per-binary path (the shared directory prefix truncates,
  the file name never does), arch, libc, a six-slot hardening strip
  (NX / CN / RL / PI / FT / SY, colour-coded on / partial / off, with a legend), CVE count,
  string count, function count, and the full MD5.
- **Export** buttons: JSON / Markdown / SBOM download.

Colour tokens are per-theme CSS custom properties on `[data-theme]`. `--muted` is the
lightest value still used for text and is picked per theme to clear 4.5:1 against that
theme's `--panel`; `--dim` is the dimmer step and is for hairlines and decorative glyphs
only, never text.

## Firmware extraction (moria)

The `extract` job kind shells out to `python3 -m defile.cli extract`, which runs `moria`. The
binary is resolved by `defile/ingest` as `$DEFILE_MORIA`, then the optional independent
source build at `moria/build/moria`, then `moria` on `PATH`. Follow the exact
[pinned build](../ENVIRONMENT.md#moria-extraction), not `git submodule update`.

The service probes this **once at startup** and logs what answered:

```
moria firmware extraction: moria 0.2.1
```

The same string is served as `moria_version` on `GET /healthz` (empty when there is no moria),
which is what the web UI reads to disable the Extract button with a hint instead of letting a
submitted job fail. Rebuilding or installing moria therefore needs a service restart to be
noticed — the probe is not repeated per job.

## Not yet / production notes

- Job lifecycle metadata is held in memory and persisted to per-job JSON files.
  Reports, inventory and AI records use SQLite; triage and its audit trail are file-backed.
- Uploads are stored as supplied. Extraction uses optional moria; built-in session
  authentication is enabled by default. Isolation and deployment policy remain operational concerns.
- The dedup cache keys on target path + size + mtime.

## Current interfaces and storage

The interactive UI uses `/summary`, `/findings`, `/binaries`, `/binary`, `/scripts`,
`/components`, `/files`, `/file-content`, `/busybox`, `/services` and `/dir-chart`
under `/api/jobs/{id}`. List endpoints support their existing offset/limit filters.
Full `/report` exports remain complete and are not used to render ordinary tabs.
`POST /api/compare` computes a server-side diff. Jobs also support pause, resume,
stop, single deletion and batch deletion. Triage audit history is served at
`GET /api/triage/history`. The REST examples above require authentication;
add `-H "Authorization: Bearer $DEFILE_SESSION"` after completing the UI login
and obtaining your own session. Never publish that token or token-bearing URLs.

Authentication uses CAPTCHA plus username/password at `/api/login`; protected API
examples assume a valid `Authorization: Bearer <token>` header. `/api/logout` and
`/api/change-password` retain their existing behavior. `/api/ai/providers` manages
provider profiles, `/api/ai/models` fetches models, and `/api/jobs/{id}/ai-analysis`
retrieves or starts streamed investigation. Narratives are English; no language
option is exposed. Provider keys use AES-256-GCM with `<data>/ai.key`.

The Python package is `defile`, the executable is `defile-service`, and the Go
module is `defile.local/service`. This local module name does not imply a remote
repository exists. Rebuild the executable after any embedded web asset change.
