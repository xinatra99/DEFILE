# Settings and administration

[README](README.md) · [Complete setup](ENVIRONMENT.md) · [CLI](CLI.md) ·
[Troubleshooting](TROUBLESHOOTING.md)

## Service flags

Verified against `service/main.go`. These are command-line flags, not environment
variables. Run `./service/defile-service -help` for the executable's own reference.

| Flag | Default | Meaning |
|---|---|---|
| `-addr` | `:8080` | Listen address; raw default listens on all interfaces. The launcher overrides it to `127.0.0.1:8080`. |
| `-core` | empty | Find the directory containing `defile/__init__.py` by walking up from cwd; pass an explicit repository path when launching elsewhere. |
| `-workers` | `2` | Concurrent analysis workers. |
| `-queue` | `128` | Queue capacity. |
| `-analyze-timeout` | `2h` | Analyze subprocess wall-clock cap, not a duration estimate; large inputs may need more. |
| `-data` | empty | Runtime directory; see resolution below. Relative paths resolve from the service process cwd. |
| `-auth` | `true` | Require login. `-auth=false` is only for an intentionally trusted isolated installation. |
| `-user`, `-pass` | empty | Seed a new account; an existing password is preserved. Neither constitutes an online signup flow. |
| `-reset-pass` | `false` | With `-user` and `-pass`, force a password replacement. Remove afterward. |
| `-rotate-ai-key` | `false` | Re-encrypt stored provider secrets, back up the old key, verify and exit. Run only while the normal service is stopped, against the same data directory. |

Keep the venv active: the service and its tests launch `python3` from PATH.
Additional arguments to `sh service/start.sh` override its earlier defaults.

## Environment

| Variable | Default/behavior |
|---|---|
| `DEFILE_MORIA` | Nonempty explicit executable path, then `moria/build/moria`, then PATH. An invalid explicit executable stops discovery; it does not fall back. |
| `DEFILE_DISABLE_CVE_BIN_TOOL` | Only the exact value `1` disables the broad scanner; bundled correlation remains. |
| `GHIDRA_HOME` | Directory containing `support/analyzeHeadless`; then `/opt/ghidra`, `/usr/share/ghidra`, `/usr/local/ghidra`, then launcher on PATH. Availability is a file probe, not a live Java test. |
| `PATH` | Selects service `python3`, external tools and cross-compilers. |
| `TMPDIR` | OS temporary directory selection; affects raw service default storage and temporary analysis work. Prefer explicit persistent `-data`. |
| `JAVA_HOME` | Java runtime discovery used by Ghidra; use a full compatible JDK. |
| `DEFILE_GHIDRA_TEST=1` | Opt into live Ghidra tests. |
| `DEFILE_CVE_BIN_TOOL_TEST=1` | Opt into feed-dependent tests; default tests set scanner disable to `1`. |

The two production settings accept read-only `IFDA_MORIA` and
`IFDA_DISABLE_CVE_BIN_TOOL` fallbacks **only when the new variable is absent**.
An explicitly empty new value wins. Test opt-ins use the new names only.
`JAVA_HOME_OVERRIDE` belongs in Ghidra's `support/launch.properties`, not in a
DEFILE configuration file. Scanner feed/API/proxy settings belong to the installed
cve-bin-tool version. There is no DEFILE `.env` loader, universal API-key variable,
or environment shortcut that configures AI providers.

## Accounts, sessions and recovery

A fresh authenticated data directory generates an `admin` password and prints it
once in the startup log. Store it privately; there is no shared default password.
Sign in with username, password and the displayed one-use CAPTCHA. Change the
password in User center (at least eight characters, current password required).
The OS administrator provisions additional accounts using `-user`/`-pass` on
startup. There is no self-registration, email reset or role/tenant isolation.

Passwords use salted PBKDF2-HMAC-SHA256 (100,000 iterations); user records persist
in `users.json`. Sessions last 24 hours and are in memory: restarting requires a
new login. Five failed credential attempts lock the account for five minutes.
API clients use `Authorization: Bearer <session>`; SSE/downloads also accept
`?token=`. Keep token-bearing URLs private. Logout invalidates the current token.

For recovery, stop the service, activate its venv and run in **Bash** from the repository root (including on macOS):

```bash
read -r -s -p 'New administrator password: ' DEFILE_RECOVERY_PASSWORD; printf '\n'
sh service/start.sh -user admin -pass "$DEFILE_RECOVERY_PASSWORD" -reset-pass
```

After confirming login, stop that invocation, `unset DEFILE_RECOVERY_PASSWORD`,
then restart normally **without** recovery flags. The password is temporarily
visible in process arguments; perform this on the trusted host. Use the same
`-data` override on both launches if yours differs from `service/.data`.
Never delete `users.json` or change data directories as a password-reset shortcut.

## Persistent state and backups

`service/start.sh` changes cwd to `service/` and always supplies `-data ./.data`,
so it uses **`service/.data`**, regardless of where the script was invoked.
Running the executable directly with `-data ./.data` resolves from your current
directory: from the repository root this is a **different** `.data` directory.
Running it without `-data` uses the OS temp `defile-service` directory, with a
legacy default fallback described in [UPGRADING.md](UPGRADING.md). Do not mix these.
Check the absolute `data dir:` startup line before scanning or restoring.

| State | Location under the selected data directory |
|---|---|
| Accounts | `users.json` |
| Provider encryption key | `ai.key` (32 bytes, mode 0600) |
| Reports, inventory, AI profiles and narratives | `reports.db`, including active SQLite WAL/SHM files |
| Job lifecycle and report/extraction files | `jobs/` (job metadata JSON and per-job subdirectories) |
| Uploaded artifacts | `uploads/` |
| Triage decisions and history | `triage.json`, `triage.json.log.jsonl` |

The display name, theme, finding grouping, sensitive keyword dictionary and
browser token/preferences are origin-local browser storage, not server backups.
Triage's display-name attribution is not an authenticated audit identity. API
triage supplies `actor`; review it as analyst-supplied attribution.

Wait for completed jobs or explicitly cancel active work before stopping.
Interrupted scans cannot resume from partial disassembly. On startup, unfinished
job/AI records are reconciled rather than silently treated as completed.
Ctrl+C or a normal termination stops the server; do not assume analysis subprocesses
will survive a service/session shutdown. Start again with the same environment,
core and data path. Rebuild after embedded web asset changes.

With the service stopped, copy the **entire data directory**, retaining Unix
permissions. Keep the SQLite database and `ai.key` in the same backup; include any
remaining WAL/SHM files and rotated-key backups. Also retain external analysis
targets/extraction trees needed for later previews: server-path targets are not
automatically copied into uploads. Store backups outside Git and the Live output.
Restore the complete directory while stopped, then point `-data` at it. Never
merge individual databases, keys or job directories from different installations.
New directories are mode 0700; existing dedicated directories should be owner-only
on a filesystem that enforces Unix permissions. Read [UPGRADING.md](UPGRADING.md)
before an upgrade; keep the previous build and a stopped-state backup for rollback.

## AI providers (optional, Full only)

In **AI settings**, add a name, Host URL, API key, protocol, model and output-token
limit. Use a versioned API base, not a chat website or a complete operation URL:

| Protocol | Example base | Wire operations |
|---|---|---|
| OpenAI-compatible (`openai`, default) | `https://api.openai.com/v1` | Bearer auth; `GET /models`, streaming `POST /chat/completions` |
| Anthropic-compatible (`anthropic`) | `https://api.anthropic.com/v1` | `x-api-key` and `anthropic-version`; `GET /models`, streaming `POST /messages` |

These identify protocol examples, not a recommendation or proof that every model
supports the required streaming/tools. Select a model from **Fetch models** before
saving; endpoints must implement that listing contract. The client trims trailing
slashes and may retry an unversioned host with `/v1` after HTML/404 responses.
Specify the correct base explicitly. Default maximum output is 8192 tokens;
server values are clamped to 256–65536. Provider/model limits may be lower.

Saved profiles can be edited, deleted and connection-tested (model-list request,
not an analysis completion). Editing without a replacement key keeps the old key.
Choose a provider in a completed scan's **AI Analysis** view and run explicitly.
Analysis streams and saves results in SQLite; an interrupted stream is marked as
an error with retained partial text. A scan allows one active AI analysis at once.
No provider or paid subscription is required for core static analysis.

Provider keys are AES-256-GCM encrypted in `reports.db` with local `ai.key`;
only a last-four-character hint is returned for display. This does not encrypt
all reports or protect secrets from the server OS administrator. Losing the key
strands saved credentials. Key rotation uses `-rotate-ai-key`; back up first and
retain its recovery files until verification succeeds.

External requests can contain report summaries, target/component names and paths,
selected findings, strings, evidence, taint paths and pseudocode. The agent can
request further finding details, init-script contents, BusyBox inventory and
service metadata through bounded tools. This can include sensitive firmware data;
review the provider's retention/access terms before sending it. Requests go from
the Full server to your configured endpoint; provider charges depend on its plan.
Live uses authored examples and never calls a provider.

## Analysis and browser settings

Full Analysis options enables Ghidra (`decompile`, default false). Re-scan sends
`force: true` to bypass dedup; extraction uses `kind: "extract"`. Ordinary repeated
analysis may reuse the path/size/mtime/version cache. Findings support search,
severity/class/triage/confidence filters, sorting, grouping and CSV/JSON filtered
exports. Reports provides complete JSON/Markdown/CycloneDX exports. Triage states
are `new`, `confirmed`, `false_positive`, `accepted_risk`; decisions overlay stored
reports and survive rescans by fingerprint. Compare operates on two stored scans.
Pause/resume/stop and deletion operate on jobs; deleting a job is not a backup.
Themes and the sensitive-string keyword dictionary are browser preferences, while
the backend's bundled JSON/YARA rules are separate analysis inputs. The UI and AI
output use English. Live exposes only its documented sample interactions.
