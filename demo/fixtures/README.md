# Public sample fixtures

`probe.c` is project-authored educational C under the root Apache-2.0 license.
It accepts no untrusted inputs. Its two builds intentionally exercise unsafe-call,
hardening and version-banner heuristics. Embedded OpenSSL banners are synthetic
matching signals: the executable does **not** bundle OpenSSL. CVE matches are
recorded heuristic correlations, not new discoveries or proof of exploitability.

The generator creates two filesystem revisions plus a 101-binary pagination
corpus from this source. Text configuration/startup fixtures are authored by the
generator, contain no credentials and do not start services during recording.
Only sanitized report data, public source and generated chart assets are shipped;
private runtimes and compiler output are excluded from the static application.

Run `scripts/record-demo.py` through the project's Linux/WSL virtual environment
to refresh the recordings. GCC, the existing Python dependencies and Moria are
needed for recording; they are not needed for the static build or public runtime.
