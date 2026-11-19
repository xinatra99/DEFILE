#!/usr/bin/env python3
"""Compare real CLI outputs with the pinned IFDA baseline; never fetch code.

Run in the DEFILE venv on Linux/WSL2. Supply a separate upstream checkout at
BASELINE. Outputs contain only generated fixtures; review before sharing.
"""
from __future__ import annotations

import argparse
import copy
import json
import os
from pathlib import Path
import shutil
import subprocess
import sys
import tarfile
import tempfile

BASELINE = "90c11c2179c8a1c907529a9e866c06b636375077"
ROOT = Path(__file__).resolve().parent.parent
OLD_CVE_WARNING = "cve-bin-tool not installed (required dependency; pip install cve-bin-tool) — CVE coverage limited to the small built-in banner DB"
NEW_CVE_WARNING = "cve-bin-tool unavailable or disabled (required dependency; pip install cve-bin-tool) — CVE coverage limited to the small built-in banner DB"


def run(command, cwd, env):
    result = subprocess.run(command, cwd=cwd, env=env, capture_output=True, text=True, timeout=180)
    if result.returncode:
        raise RuntimeError(f"{command[0]} failed ({result.returncode}): {result.stderr[-2000:]}")
    return result


def report_contract(doc):
    doc = copy.deepcopy(doc)
    # Only volatile report-envelope fields; finding IDs/evidence stay untouched.
    doc.pop("generated_at", None)
    doc.pop("tool_version", None)
    # Explicitly documented correction, not general warning suppression.
    for binary in doc.get("binaries", []):
        binary["warnings"] = [NEW_CVE_WARNING if warning == OLD_CVE_WARNING else warning
                              for warning in binary.get("warnings", [])]
    return doc


def sbom_contract(doc):
    doc = copy.deepcopy(doc)
    doc.pop("serialNumber", None)  # per-export UUID
    meta = doc.get("metadata", {})
    meta.pop("timestamp", None)
    for tool in meta.get("tools", []):
        if tool.get("name") in ("ifda", "defile"):
            tool["name"] = "defile"
            if tool.get("vendor") in ("ifda", "defile"):
                tool["vendor"] = "defile"
            tool.pop("version", None)
    return doc


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--upstream", type=Path, required=True)
    parser.add_argument("--output", type=Path, default=ROOT / ".validation/parity")
    parser.add_argument("--moria", type=Path, help="exact Moria executable to test both wrappers")
    args = parser.parse_args()
    upstream = args.upstream.resolve()
    head = subprocess.check_output(["git", "-c", f"safe.directory={upstream}", "-C", str(upstream), "rev-parse", "HEAD"], text=True).strip()
    if head != BASELINE:
        parser.error(f"upstream must be checked out at {BASELINE}")
    args.output.mkdir(parents=True, exist_ok=True)
    env = dict(os.environ, IFDA_DISABLE_CVE_BIN_TOOL="1", DEFILE_DISABLE_CVE_BIN_TOOL="1")
    env.pop("PYTHONPATH", None)
    env.pop("PYTHONHOME", None)
    if args.moria:
        env["IFDA_MORIA"] = env["DEFILE_MORIA"] = str(args.moria.resolve())
    results = {"upstream": head, "checks": [], "normalization": [
        "report envelope generated_at/tool_version", "SBOM serialNumber/timestamp/tool identity",
        "CLI help product name", "extraction output root only",
        "exact missing/disabled CVE warning wording correction"], "external_feeds": "disabled"}
    with tempfile.TemporaryDirectory(prefix="defile-parity-") as temporary:
        work = Path(temporary)
        target = work / "rootfs"
        (target / "bin").mkdir(parents=True)
        (target / "etc/init.d").mkdir(parents=True)
        # Compiled but never executed. Reuses the committed educational fixture.
        run(["gcc", "-O0", "-fno-stack-protector", "-no-pie", str(ROOT / "demo/fixtures/probe.c"), "-o", str(target / "bin/probe")], ROOT, env)
        (target / "etc/init.d/status").write_text("#!/bin/sh\necho 'fixture status'\n")
        (target / "etc/config.ini").write_text("debug=1\n")
        (target / "etc/shadow").write_text("fixture:!:0:0:0:0:0:0:0\n")
        (target / "etc/shadow").chmod(0o644)
        (target / "bin/probe-link").symlink_to("probe")
        os.mkfifo(target / "status.fifo")
        for name, item in (("single-elf", target / "bin/probe"), ("rootfs", target),
                           ("decompile-option", target / "bin/probe")):
            docs = []
            sboms = []
            for package, cwd in (("ifda", upstream), ("defile", ROOT)):
                stem = args.output / f"{name}-{package}"
                command = [sys.executable, "-m", package + ".cli", "analyze", str(item),
                           "--json", str(stem) + ".json", "--md", str(stem) + ".md",
                           "--sbom", str(stem) + ".sbom.json", "--progress"]
                if name == "decompile-option":
                    command.append("--decompile")
                result = run(command, cwd, env)
                progress = [json.loads(line.split("@@", 2)[-1]) for line in result.stderr.splitlines()
                            if line.startswith("@@" + package.upper() + "@@")]
                assert progress, f"{package}: no machine-readable progress"
                doc = json.loads(Path(str(stem) + ".json").read_text())
                # Envelopes are checked before excluding known release differences.
                assert doc["tool_version"] in ("2.8.0", "2.8.0+defile.2")
                assert doc["generated_at"]
                assert Path(str(stem) + ".md").stat().st_size > 100
                docs.append(report_contract(doc))
                sboms.append(sbom_contract(json.loads(Path(str(stem) + ".sbom.json").read_text())))
            assert docs[0] == docs[1], f"{name}: analysis differs; inspect saved JSON (no findings normalized)"
            assert sboms[0] == sboms[1], f"{name}: SBOM differs"
            results["checks"].append({"input": name, "analysis": "equal", "sbom": "equal",
                                      "findings": len(docs[0]["findings"]), "binaries": len(docs[0]["binaries"]),
                                      "progress": "parsed both protocols", "markdown": "generated both"})
        finding_id = json.loads((args.output / "single-elf-defile.json").read_text())["findings"][0]["id"]
        for state in ("confirmed", "false_positive", "accepted_risk", "new"):
            for package, cwd in (("ifda", upstream), ("defile", ROOT)):
                store = work / f"triage-{package}.json"
                run([sys.executable, "-m", package + ".cli", "triage", str(store), finding_id, state], cwd, env)
                assert json.loads(store.read_text())[finding_id] == state
        results["checks"].append({"triage": "all four states persisted through both real CLIs"})
        slices = work / "slices.json"
        slices.write_text('[{"name":"unchanged","value":3},{"name":"modified","value":1}]')
        charts = []
        for package, cwd in (("ifda", upstream), ("defile", ROOT)):
            chart = work / f"chart-{package}.png"
            result = run([sys.executable, "-m", package + ".cli", "chart", str(slices), str(chart)], cwd, env)
            assert json.loads(result.stdout)["renderer"] == "cpu"
            charts.append(chart.read_bytes())
        assert charts[0] == charts[1], "CPU chart pixels differ"
        results["checks"].append({"chart": "both real CLIs produced byte-identical CPU PNG"})
        for command in ([], ["analyze"], ["extract"], ["triage"], ["chart"], ["vulndb"]):
            helps = [run([sys.executable, "-m", package + ".cli", *command, "--help"], cwd, env).stdout
                     for package, cwd in (("ifda", upstream), ("defile", ROOT))]
            old_help = helps[0].replace("ifda", "defile").replace("IFDA", "DEFILE")
            assert " ".join(old_help.split()) == " ".join(helps[1].split()), f"CLI help differs: {command}"
        results["checks"].append({"cli_help": "all six parser surfaces equivalent after executable rename"})
        if args.moria:
            archive = work / "fixture.tar"
            with tarfile.open(archive, "w") as tar:
                tar.add(target / "etc/config.ini", arcname="config.ini")
            regions = []
            for package, cwd in (("ifda", upstream), ("defile", ROOT)):
                out = work / package
                result = run([sys.executable, "-m", package + ".cli", "extract", str(archive), "--out", str(out)], cwd, env)
                doc = json.loads(result.stdout)
                usable = [region for region in doc["regions"] if region["usable"]]
                assert usable and (Path(usable[0]["path"]) / "config.ini").read_text() == "debug=1\n"
                # Replace only the known extraction output directory, not metadata.
                regions.append(json.loads(json.dumps(doc).replace(str(out), "<extraction-output>")))
            assert regions[0] == regions[1], "Moria region contract differs"
            results["checks"].append({"moria_tar": "equivalent metadata and recovered file"})
        else:
            results["checks"].append({"moria": "UNVERIFIED: no --moria executable supplied"})
    (args.output / "results.json").write_text(json.dumps(results, indent=2) + "\n")
    print(json.dumps(results, indent=2))


if __name__ == "__main__":
    main()
