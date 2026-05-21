#!/bin/bash
# Install as /home/admin/deploy-kcmesh.sh (admin:admin mode 0755).
#
# Invoked by GitHub Actions over SSH via a restricted authorized_keys entry.
# Reads a tar.gz of the Astro static dist/ on stdin, validates it, and
# atomically swaps the new build into place. The mesh-web nginx container
# bind-mounts /home/admin/kansascitymesh.live/dist read-only; rsync's
# temp-then-rename behavior keeps it serving cleanly throughout the swap.
#
# The CI-side that calls this:
#   ssh -i $DEPLOY_KEY admin@161.35.226.162 < dist.tar.gz
# The authorized_keys entry pins this script as the forced command, so the
# key cannot do anything else.

set -euo pipefail

REPO="/home/admin/kansascitymesh.live"
INCOMING="$REPO/dist-incoming"
LIVE="$REPO/dist"
LOG="/home/admin/.rebuild-trigger/deploy-kcmesh.log"
LOCK="/home/admin/.rebuild-trigger/deploy-kcmesh.lock"

ts() { date -u +%Y-%m-%dT%H:%M:%SZ; }

mkdir -p "$(dirname "$LOG")"

# Single deploy at a time. A second deploy mid-flight gets the lock and
# waits — preferable to two deploys interleaving rsync into the live tree.
exec 9>"$LOCK"
flock 9

echo "[$(ts)] Deploy starting (pid $$)" >> "$LOG"

# Reset the staging dir. Old contents may exist if a previous deploy died
# between extract and swap.
rm -rf "$INCOMING"
mkdir -p "$INCOMING"

# Extract the tarball coming in on stdin.
if ! tar -xzf - -C "$INCOMING" 2>>"$LOG"; then
  echo "[$(ts)] FAIL: tar extract failed" >> "$LOG"
  rm -rf "$INCOMING"
  exit 1
fi

# Sanity-check the artifact looks like a real Astro static build.
# Both index.html and the hashed _astro/ asset bundle directory must be present.
if [[ ! -f "$INCOMING/index.html" ]] || [[ ! -d "$INCOMING/_astro" ]]; then
  echo "[$(ts)] FAIL: artifact missing index.html or _astro/ directory" >> "$LOG"
  rm -rf "$INCOMING"
  exit 1
fi

# Swap into place. rsync --delete mirrors content; the nginx container keeps
# serving from the same dist/ inode throughout. Each file is replaced
# atomically by rsync's temp-then-rename behavior.
if ! rsync -a --delete "$INCOMING/" "$LIVE/" 2>>"$LOG"; then
  echo "[$(ts)] FAIL: rsync to live failed" >> "$LOG"
  exit 1
fi

rm -rf "$INCOMING"

echo "[$(ts)] Deploy complete" >> "$LOG"
