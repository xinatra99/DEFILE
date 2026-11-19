#!/usr/bin/env bash
# Builds an available moria source tree (FR-ING/FR-EXT: firmware identification
# and extraction) into moria/build/moria, which is where defile/ingest looks for
# it before falling back to PATH.
#
# Nothing in this repo requires the build to exist: a system-wide moria on PATH
# works exactly as before, and with neither one the extract job kind reports
# "not available" instead of breaking anything else (NFR-USE-1). What the
# in-tree build provides an explicit executable from source installed by the user.
#
#   scripts/build-moria.sh            # configure + build
#   scripts/build-moria.sh --clean    # discard moria/build first
#
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
src="$repo_root/moria"
build="$src/build"

if [[ ! -f "$src/CMakeLists.txt" ]]; then
  echo "error: no Moria source was found at $src." >&2
  echo "  Install Moria separately and set DEFILE_MORIA, or place its source in moria/." >&2
  exit 1
fi

for tool in cmake g++; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    echo "error: $tool not found. moria needs cmake and a C++20 compiler." >&2
    echo "  Debian/Ubuntu: sudo apt install cmake g++ zlib1g-dev liblzma-dev liblz4-dev libzstd-dev" >&2
    exit 1
  fi
done

if [[ "${1:-}" == "--clean" ]]; then
  rm -rf "$build"
fi

# The codec dev libraries (zlib/lzma/lz4/zstd) are what --extract decompresses
# with. moria can be configured without any one of them, so a host missing a
# codec still gets a working binary with that format disabled rather than a
# failed build — an identify-only moria is still useful here, since the region
# list is what a human picks from.
cmake -S "$src" -B "$build" -DCMAKE_BUILD_TYPE=Release -DMORIA_OPTIONAL_CODECS=ON
cmake --build "$build" -j"$(getconf _NPROCESSORS_ONLN 2>/dev/null || echo 4)"

echo
echo "built: $build/moria"
"$build/moria" --version
echo
echo "defile/ingest will now prefer this build over any moria on PATH."
echo "Restart defile-service to pick it up (it probes once at startup)."
