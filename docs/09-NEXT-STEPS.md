# Next Steps Before Content Audit

## 1. Technical Follow-ups
1. **Run local build and smoke tests** – `npm install && npm run build && npm run preview` (not possible in hosted CLI). Confirm navigation script, Discord CTA, and markdown rendering work in production output.
2. **Add automated linting/tests** – set up `npm run check` or similar once interactive components arrive.
3. **Monitor kit performance** – the Font Awesome kit now preconnects; consider migrating to locally hosted SVGs if the payload ever exceeds budget.

## 2. Content Tasks
1. **Author remaining sections**
   - `/network/growth` (roadmap) – currently absent.
   - `/guides/**` hierarchy (ham operators, repeater owners, HOA stealth, west-side deployment) – pages referenced in docs but not yet implemented.
   - `/community/contribute` and `/community/stories` – placeholders still required.
2. **Coverage map** – implement Leaflet map once sample data/tiles are ready. Hook into the geofence coordinates and router waypoints.
3. **Network status dashboard** – design JSON feed + component for live router health/telemetry.
4. **Contact form backend** – connect to PHP handler described in `docs/03-TECHNICAL-REQUIREMENTS.md` once hosting target is finalized.

## 3. Voice & UX Checklist for Audit
- [ ] Re-read `docs/06-CONTENT-VOICE-GUIDELINES.md` to ensure future copy keeps the anti-dogma, prosumer tone.
- [ ] Verify every page still highlights the four-point geofence priority.
- [ ] Confirm Discord CTA appears where coordination is expected (should render automatically when `discordInvite` is present).
- [ ] Ensure calls-to-action reference the correct west-side Router 2 gap.

## 4. Data & Telemetry Prep
- [ ] Gather signal reports along the I-435 loop (west of I-29) to populate future coverage overlays.
- [ ] Define JSON schema for router health + MQTT metrics for the upcoming status dashboard.

## 5. Documentation Maintenance
- Update this checklist as soon as any of the above items are completed or reprioritized.
- Keep `README.md` in sync with layout/front matter changes.

Once these items are addressed, perform a full-page content audit with special focus on consistency between Markdown copy and the structured YAML data now powering the layouts.
