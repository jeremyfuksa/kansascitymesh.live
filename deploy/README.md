# Deploy

How `kansascitymesh.live` ships to production, and how its server-side support pieces work.

## Architecture

```
push to main
  │
  ▼
GitHub Actions
  ├─ npm ci
  ├─ npm run format:check
  ├─ npm run check
  ├─ npm run build      → dist/
  ├─ tar -czf dist.tar.gz -C dist .
  └─ ssh admin@droplet < dist.tar.gz
       │ (key pinned to deploy-kcmesh.sh via forced command)
       ▼
     deploy-kcmesh.sh on droplet
       ├─ flock — one deploy at a time
       ├─ tar -xzf - into dist-incoming/
       ├─ sanity-check (index.html + _astro/ present)
       ├─ rsync -a --delete dist-incoming/ → dist/
       └─ logs to .rebuild-trigger/deploy-kcmesh.log
  │
  ▼
Traefik → mesh-web (nginx:alpine) → /usr/share/nginx/html
                                     (bind-mounted /home/admin/kansascitymesh.live/dist:ro)
```

## Files

| File                                                    | Lives                       | Purpose                                                                                           |
| ------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------- |
| `.github/workflows/deploy.yml`                          | this repo                   | Builds + ships on push to main                                                                    |
| `deploy/server/deploy-kcmesh.sh`                        | this repo (source of truth) | Server-side deploy script — atomic dist swap                                                      |
| `deploy/server/generate-mesh-stats.py`                  | this repo (source of truth) | Server-side stats generator — runs via cron, produces `/api/stats.json`                           |
| `/home/admin/deploy-kcmesh.sh`                          | droplet                     | Installed copy. Pinned as `command="…"` in `~/.ssh/authorized_keys`.                              |
| `/home/admin/generate-mesh-stats.py`                    | droplet                     | Installed copy. Run by cron every 5 minutes.                                                      |
| `/home/admin/kcml-stats/stats.json`                     | droplet                     | Output of the stats generator. Bind-mounted into the mesh-web container at `/srv/api/stats.json`. |
| `/home/admin/.rebuild-trigger/deploy-kcmesh.{log,lock}` | droplet                     | Deploy log + flock for serialization                                                              |

## Stats generator

`deploy/server/generate-mesh-stats.py` runs on the droplet every 5 minutes via cron. It:

1. Fetches `https://map.kansascitymesh.live/api/nodes` and `/api/stats` (the local MeshMonitor instance)
2. Computes active counts across five windows (1h / 24h / 7d / 30d / 90d), total registered nodes, top hardware breakdown
3. Reads `DISCORD_BOT_TOKEN` from `/home/admin/.env` and queries Discord's `GET /guilds/{id}?with_counts=true` for member + presence counts
4. Atomically writes the combined blob to `/home/admin/kcml-stats/stats.json`

The site fetches this file client-side via `src/utils/liveStats.ts` to hydrate `[data-live-stat]` elements.

On any non-fatal fetch failure (upstream stats or Discord), the corresponding fields become `null` and the rest of the data still ships. On primary mesh fetch failure, the script exits non-zero and leaves the previous JSON file untouched.

Crontab entry (on the droplet):

```cron
*/5 * * * * /home/admin/generate-mesh-stats.py >> /home/admin/.mesh-stats.log 2>&1
```

5-minute cadence keeps the "LIVE · updated 2m ago" eyebrow honest. The fetches are cheap (MeshMonitor is loopback on the same box; Discord allows ~50 requests/sec on guild endpoints — 12 per hour is nothing). If the log grows uncomfortably, rotate it via `logrotate`; don't slow the cadence down.

## Server-side `.env`

`/home/admin/.env` (mode 0600) holds environment variables used by various server scripts. The stats generator reads `DISCORD_BOT_TOKEN` from this file directly because cron jobs run with minimal environment and can't rely on shell sourcing.

The bot token comes from a Discord application with the **Server Members Intent** privileged gateway intent enabled and the `View Channels` permission added to the KC Mesh server. It's never in the browser, never in GitHub Actions, and never in the repo — only on the droplet.

## Secrets

GitHub Actions repository secrets:

| Name                | What it is                                                                                             |
| ------------------- | ------------------------------------------------------------------------------------------------------ |
| `KCMESH_DEPLOY_KEY` | ed25519 private key. Matching public key is pinned to `deploy-kcmesh.sh` in droplet `authorized_keys`. |

The Discord bot token is **not** a GitHub secret. It lives in `/home/admin/.env` on the droplet because the stats generator runs there via cron, never at build time. See the "Server-side `.env`" section above.

## Updating server-side scripts

The repo holds the source of truth for both server scripts. When either changes, copy the new version up:

```bash
# Deploy script
scp deploy/server/deploy-kcmesh.sh admin@161.35.226.162:/home/admin/deploy-kcmesh.sh
ssh admin@161.35.226.162 'chmod 0755 /home/admin/deploy-kcmesh.sh'

# Stats generator
scp deploy/server/generate-mesh-stats.py admin@161.35.226.162:/home/admin/generate-mesh-stats.py
ssh admin@161.35.226.162 'chmod 0755 /home/admin/generate-mesh-stats.py'

# Optional: run the stats generator once to verify it works
ssh admin@161.35.226.162 '/home/admin/generate-mesh-stats.py'
```

Script changes should land in the same PR as any related code change so the two stay in sync.

## Rotating the deploy key

1. Generate a new keypair:
   ```bash
   ssh-keygen -t ed25519 -C "kansascitymesh.live CI deploy $(date -u +%Y-%m-%d)" -f /tmp/new_deploy_key -N ""
   ```
2. Append the new public key to `~/.ssh/authorized_keys` on the droplet, pinned to the same forced command:
   ```
   command="/home/admin/deploy-kcmesh.sh",no-pty,no-port-forwarding,no-X11-forwarding,no-agent-forwarding,restrict <new-pubkey>
   ```
3. Update the `KCMESH_DEPLOY_KEY` GitHub secret with the new private key.
4. Verify a deploy works.
5. Remove the old public key line from `authorized_keys`.
6. Shred the local copies.

## Manual deploy fallback

If GitHub Actions is unavailable, you can deploy from a local checkout:

```bash
npm ci
npm run build
tar -czf dist.tar.gz -C dist .
# Authenticate with the deploy private key (saved somewhere off the repo).
ssh -i /path/to/kcmesh_deploy_key admin@161.35.226.162 < dist.tar.gz
```

The forced command will run `deploy-kcmesh.sh` exactly as Actions would.
