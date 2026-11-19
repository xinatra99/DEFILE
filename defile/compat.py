"""Read-only compatibility for environment settings from pre-migration installs.

New names take precedence, including explicitly empty values. Keep legacy names
isolated here; analysis evidence and persisted report contents are never rewritten.
"""

import os

_LEGACY_ENV = {
    "DEFILE_MORIA": "IFDA_MORIA",
    "DEFILE_DISABLE_CVE_BIN_TOOL": "IFDA_DISABLE_CVE_BIN_TOOL",
}


def env_value(name: str, default: str = "") -> str:
    if name in os.environ:
        return os.environ[name]
    legacy = _LEGACY_ENV.get(name)
    return os.environ.get(legacy, default) if legacy else default
