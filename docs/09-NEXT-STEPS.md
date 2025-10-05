# Next Steps: Content & Development

## Phase 2 Progress

### Voice Refinement - COMPLETE ✅

All guides have been reviewed and updated to invitation/documentation style:

- ✅ `/guides/west-side.astro` - Reframed from "help me find host" to "here's what deployment would look like"
- ✅ `/guides/repeater-owners.astro` - Updated from "I'm asking for" to invitation tone
- ✅ `/guides/ham-operators.astro` - Already in proper voice
- ✅ `/guides/solar-residential.astro` - Already in proper voice
- ✅ Contact page - Already in proper voice (coordination emphasis, not recruitment)

**Voice consistency achieved across all critical pages.**

---

## Administrative Pages (Lower Priority)

Can be minimal placeholders for initial launch:

### Network Info
- `/network/status.astro` - "Router 1 operational. West side gap exists. Check back for updates."
- `/network/growth.astro` - "Logical deployment order: R1 (done), R2 (west gap), R3/R4 (north/south)"

### Resources
- `/resources/frequencies.astro` - 915 MHz ISM band reference
- `/resources/troubleshooting.astro` - Common issues (region setting, antenna, power)
- `/resources/faqs.astro` - Quick Q&A

### Community
- `/community/stories.astro` - "Deployment examples will appear here as they happen"
- `/community/contribute.astro` - "Deploy without asking. Here's how."

### Section Indexes
- `/guides/index.astro`
- `/resources/index.astro`
- `/community/index.astro`
- `/network/index.astro`

---

## Development Tasks (Post-Content)

### Build & Deploy Test
1. Run `npm run build` from the project root
2. Check for build errors
3. Test dev server: `npm run dev`
4. Verify all routes work

### Interactive Features (Future)
- Coverage map implementation (Leaflet.js)
- Network status dashboard (pull from JSON)
- Contact form backend (PHP handler per deployment docs)

### Performance
- Image optimization
- JS payload budget (<100KB per requirements)
- Mobile-first responsive check

---

## Content Voice Checklist

Before declaring content complete, verify:

- [ ] First-person narrative maintained ("I'm building...")
- [ ] Honest motivation prominent ("it's just fun" before emergency comms)
- [ ] Anti-dogma messaging throughout (15ft works, 10W adequate, test indoor)
- [ ] Invitation tone, not recruitment ("here's what works" not "help me")
- [ ] Prosumer scope maintained ($25-200 hardware range)
- [ ] Non-tech accessibility (avoid RF jargon without explanation)
- [ ] kansascitymesh.net coordination emphasized (coordination banner, contact page)

---

## For Future AI Sessions

### Using Gemini for Topography Analysis
**Task:** Suggest optimal Router 2-4 locations based on KC metro terrain

**Example prompt:**
```bash
gemini -p "Analyze Kansas City metro topography for optimal mesh router placements. Consider: elevation data, population density, Johnson County high points for Router 2, existing infrastructure (water towers, tall buildings), line-of-sight coverage patterns. Provide specific location recommendations with coordinates or landmarks."
```

**Why Gemini:** Best for geospatial reasoning, terrain analysis, large dataset processing

### Voice Consistency for Future Content
If adding new pages, always:
1. Read `06-CONTENT-VOICE-GUIDELINES.md` first
2. Check `08-CONTENT-STATUS.md` for completed examples
3. Lead with honest motivation ("it's fun" before "emergency")
4. Frame as documentation/invitation, not recruitment
5. Test with "Would I send this to a friend?" criteria

---

## Launch Readiness Criteria

### Minimum Viable Launch
- [x] All critical pages completed with correct voice
- [ ] West-side guide reframed (Phase 2 priority)
- [ ] Build succeeds without errors
- [ ] Mobile responsive verified
- [ ] Contact methods working

### Nice to Have for Launch
- [ ] All administrative pages (can be placeholders)
- [ ] Section index pages
- [ ] Interactive coverage map
- [ ] Network status dashboard

### Can Wait Until After Launch
- Success stories (as they happen)
- Troubleshooting expansion (as issues emerge)
- Equipment deep-dive (hardware guide is sufficient)
- Community contributions page
