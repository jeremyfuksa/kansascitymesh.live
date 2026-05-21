# Deploy

How `kansascitymesh.live` ships to production.

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

| File                                                    | Lives                       | Purpose                                                              |
| ------------------------------------------------------- | --------------------------- | -------------------------------------------------------------------- |
| `.github/workflows/deploy.yml`                          | this repo                   | Builds + ships on push to main                                       |
| `deploy/server/deploy-kcmesh.sh`                        | this repo (source of truth) | Server-side script — atomic dist swap                                |
| `/home/admin/deploy-kcmesh.sh`                          | droplet                     | Installed copy. Pinned as `command="…"` in `~/.ssh/authorized_keys`. |
| `/home/admin/.rebuild-trigger/deploy-kcmesh.{log,lock}` | droplet                     | Deploy log + flock for serialization                                 |

## Secrets

GitHub Actions repository secrets:

| Name                | What it is                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `KCMESH_DEPLOY_KEY` | ed25519 private key. Matching public key is pinned to `deploy-kcmesh.sh` in droplet `authorized_keys`.       |
| `DISCORD_BOT_TOKEN` | Set but not yet wired. Reserved for a follow-up that fetches the Discord guild's member count at build time. |

## Updating the deploy script

If `deploy/server/deploy-kcmesh.sh` changes, copy the new version to the droplet:

```bash
scp deploy/server/deploy-kcmesh.sh admin@161.35.226.162:/home/admin/deploy-kcmesh.sh
ssh admin@161.35.226.162 'chmod 0755 /home/admin/deploy-kcmesh.sh'
```

The script change should land in the same PR as any related workflow change so the two stay in sync.

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
