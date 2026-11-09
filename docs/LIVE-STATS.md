# Network observations

The homepage and `/status` use the existing `/api/stats.json` snapshot. The
generator and deployment contract are unchanged. Browser code lives in
`src/utils/liveStats.ts`; clock, ordering, and distribution rules live in
`src/utils/networkData.ts`.

- A snapshot older than 15 minutes is labelled **Stale snapshot**. The source
  normally generates a snapshot every five minutes. Freshness uses
  `generated_at`, never the time the browser fetched it.
- We fetch on page load, once a minute while the tab is visible, and when the
  reader returns to the tab. Requests time out after 12 seconds. Relative
  timestamps advance every 30 seconds even if the next fetch fails.
- A failed or malformed response preserves the last good snapshot and marks
  it stale. An initial failure shows **Observations unavailable**, with
  automatic retries. Missing optional counts display an em dash; zero remains
  zero. JavaScript is required to load these observations.
- **Recently heard routers** uses the six most recent valid timestamps from
  the existing `backbone_nodes` array. This is the collector's limited router
  sample, not a general message feed or proof of coverage at a location.
- The hardware view uses **all-time identified hardware**, including historical
  nodes. Its chart and list share the exact `nodes_with_hwmodel` denominator.
  The chart includes the remaining models as **Other**, with counts and an
  accessible text description. Known hardware models link to existing detail
  pages. Unknown models remain readable without a guessed destination.

## Verification

```sh
npm test
npm run format:check
npm run check
npm run build
```

For browser checks against the production build:

```sh
node tests/preview-server.mjs 4321 fresh
```

Open `http://127.0.0.1:4321/` and `/status`. The preview binds to loopback and
visibly labels its synthetic observations. It never publishes data. Other
modes are `stale`, `unavailable`, `empty`, and `malformed`; use a different
port or stop the previous preview. **Simulate refresh failure** changes that
preview's API to HTTP 503 and triggers a refresh. The counts should remain
visible with a stale/refresh-failed label. Reloading then tests initial failure.

Check phone, tablet, and desktop widths. The backbone table scrolls within its
own container on narrow screens. Confirm that hardware names and counts remain
readable, the header has a textual freshness state, and router observations
never revert to the removed sample rows.
