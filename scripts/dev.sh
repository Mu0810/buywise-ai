#!/usr/bin/env bash
# Dev launcher for macOS / sandboxed environments.
#
# Next's config file-watcher (Watchpack) can throw "EMFILE: too many open
# files, watch" when the OS restricts the number of fs.watch handles, which
# sends the dev server into a config-reload loop. Polling avoids fs.watch
# handles entirely and keeps the dev server stable. On a normal machine you can
# also just run `pnpm dev`.
set -euo pipefail

export WATCHPACK_POLLING=true
export CHOKIDAR_USEPOLLING=true

exec ./node_modules/.bin/next dev
