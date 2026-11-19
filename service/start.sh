#!/usr/bin/env sh
set -eu
cd -- "$(dirname -- "$0")"
exec ./defile-service -addr 127.0.0.1:8080 -core .. -data ./.data "$@"
