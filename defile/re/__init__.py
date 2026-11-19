"""Binary reverse engineering (FR-RE): disassembly, CFG/call-graph, mitigations."""

from .mitigations import detect_mitigations
from .disasm import disassemble
# Note: the decompile *function* is intentionally not re-exported here because it
# would shadow the `defile.re.decompile` submodule. Import it explicitly:
#   from defile.re.decompile import decompile, ghidra_available, enrich_findings
from .decompile import ghidra_available, enrich_findings

__all__ = [
    "detect_mitigations", "disassemble",
    "ghidra_available", "enrich_findings",
]
