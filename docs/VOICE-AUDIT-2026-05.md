# Voice + content audit — May 2026

This is a comprehensive read of every content-bearing component on the site, audited against:

1. **The new collective-voice posture.** The site speaks as the KC Mesh community of 200+ — not as Jeremy alone, not as a corporate "we." First-person plural, specific over abstract, no individual-ownership framing.
2. **The jeremy-voice anti-pattern catalog.** The same brain wrote both the personal essays and the site copy. The site doesn't need to sound like a Cocktail Napkin post, but it should pass the same diagnostic checks — no wrap-up closers, no scaffolding tics, no "X, not Y" rhythm, no "actually" as superiority marker, no graduation-speech sentences, etc.
3. **The KC Mesh anti-dogma posture** (per CLAUDE.md): deployed imperfect beats theoretical perfect; prosumer hobbyist scale; welcoming to beginners; combat perfectionism.

## How to read this doc

For each component I list every distinct passage. Each gets one of three verdicts:

- **KEEP** — the passage works as-is. No change.
- **TIGHTEN** — the passage mostly works but has a flagged issue. Specific edit proposed.
- **REWRITE** — the passage doesn't earn its place under the new posture. Full rewrite proposed.

After each verdict I name the violation (e.g. AP-CL-2, AP-RH-1) when applicable, then give the proposed text.

Read the whole doc end-to-end, then react. Mark each verdict you accept, reject, or want to negotiate. Don't apply any of this until you've reviewed it.

---

## Cross-cutting observations

Before page-by-page, a few patterns that appear across multiple files:

**1. The hero pattern is a label-eyebrow-headline-body stack on most pages.** Currently consistent and works. ✅

**2. Cards-of-3-or-5 with `title + body` is the dominant content shape.** It's been used for: hardware, resources, host types, what KC Mesh provides, operational tips. Each card body averages 1–3 sentences. The pattern is sound but the prose inside the cards is uneven — some are tight and specific, others ramble. ✅

**3. The "tip-banner" callout** (Info icon + paragraph) appears in HostANodePage and GetStartedPage. Good visual rhythm, but the prose inside often violates AP-CL-2 (capping sentence). ✅

**4. "Honest list" / "honest tips" / "X, in practice"** as section framings appear repeatedly. Once is voice. Three times is a tic. The site uses some variant of "honest" or "real" as a headline-modifier in at least four places. ✅

**5. The word "absolutely" appears twice** ("Stealth deployments are absolutely a thing"). Mild AP-VO-4 territory — "actually" as superiority marker has a cousin in "absolutely." Cut when possible. ✅

**6. Bold-for-scaffolding (AP-SC-1) is used in two places** to label list items inside paragraphs. Both should become real prose. ✅

**7. Closing exhortations end multiple sections.** Several sections end with sentences like "That's the whole ask." / "That's the whole thing." / "There's nothing in there worth gatekeeping." This _can_ work as understatement (AP-CL-3 closer principle) but it's overused. Three of these in a single page reads formulaic. ✅

---

# HeroSection.tsx

## H1 + tagline

```
Kansas City has a Mesh Network
(And we want to say, "Hi!")
```

**KEEP.** The parenthetical is in voice — warm, specific, no scaffolding. The fact-statement headline followed by friendly parenthetical is exactly the right register. (Note: this is one of the rare places where the tagline is in voice and the headline isn't trying to be — that contrast works.) ✅

## Stat card heading

```
60+ active nodes. 130+ total nodes. 200+ in Discord.
```

**KEEP.** Numbers doing real work. Three counts, each meaningful (active vs. total tells you about retention; Discord count tells you about community size beyond hardware). ✅

## Stat card body

```
Power up a Meshtastic node and say hello. We're always welcoming newcomers.
```

**TIGHTEN.** The first sentence is fine. The second is filler — every community claims to welcome newcomers. Verdict is suspect on AP-CO-3 (vapid abstract): "we're welcoming" passes the swap test for _"we're friendly,"_ _"we're inclusive,"_ _"we're open."_ All equally true, all equally hollow.

**Proposed:**

> Power up a Meshtastic node and say hello. Someone in the mesh will hear you.

(More specific. Names what actually happens when you power up — the mesh hears you. Drops the welcome-mat platitude.) ✅

## Mid-card paragraph 1

```
Did you just activate your first node and wonder, "What's next?" Or, did you just hear about Meshtastic online and wondered whether people are using it in Kansas City?
```

**KEEP** with a small tighten. The pattern of two questions targeting two distinct readers (current owner vs. curious researcher) is good audience work. But "wondered" vs. "wonder" tense mismatch and the "Or," comma is awkward.

**Proposed:**

> Just activated your first node and wondering what's next? Or you've heard about Meshtastic and wondering if anyone in Kansas City is on it?

(Drops "Did you just" → mid-thought entry, more conversational. Parallels the two questions cleanly.) ✅

## Mid-card paragraph 2

```
We're here. Say hello.
```

**KEEP.** Voice-tight. Reporting flat. The understatement does the work. ✅

## Mid-card paragraph 3

```
We'll chat on air, but Meshtastic is best for short messages, so we have a Discord server for longer chats and questions. No pressure to join. Just a group chat for KC folks interested in Meshtastic.
```

**TIGHTEN.** First sentence is good. "No pressure to join. Just a group chat..." is the AP-CL-2 cousin — capping the prior sentence by restating "it's chill." The reader got that from "longer chats and questions."

**Proposed:**

> We'll chat on air, but Meshtastic is best for short messages. The Discord is where the longer conversations happen.

(Drops the reassurance coda. The sentence describes the role of Discord; the reader infers "low pressure" from "longer conversations" without being told.) ✅

## Right card heading + body

```
Live Mesh Map of KC
See where the action is. Identify places to fill out the mesh.
```

**KEEP.** Short, specific, names the use. "See where the action is" earns its place because it's concrete (you can literally see active nodes on the map). "Identify places to fill out the mesh" gives a second use case. Good. ✅

---

# HardwareSection.tsx

## Section heading + lede

```
What people are running
Start with one. Most of us end up with three or four (it's weirdly fun).
```

**KEEP.** Heading is voice — names a topic by reporting observed behavior, not labeling. Lede has the right energy: parenthetical aside that's actually funny, not decorative. The "weirdly fun" admission is in voice. ✅

## Card descriptions

```
RAK Wireless — "Popular for solar nodes. No screen means lower power draw."
Heltec V4 — "Most popular starter node. Compact and easy to set up."
T-1000 E — "Lightweight tracker. Built-in GPS and long battery life."
Lilygo T-Deck — "Perfect all-in-one unit for everywhere you go."
```

**Verdict mixed:**

- RAK, Heltec, T-1000 E: **KEEP.** Compact, specific, each sentence does real work.
- Lilygo T-Deck: **TIGHTEN.** "Perfect all-in-one unit for everywhere you go" is AP-CO-3 territory — "perfect," "for everywhere you go" are vague intensifiers. The other three cards name specific features. This one doesn't.

**Proposed Lilygo description:**

> Full keyboard and screen. Send messages without your phone.

(Names the two features that actually differentiate it from the others. Drops "perfect.") ✅

**Cross-card note:** the descriptions across these four hardware cards and the four cards on GetStartedPage Step 1 are _almost identical but not quite_. The Heltec card here says "Most popular starter node" while the GetStartedPage card says "Most popular starter unit. Small screen, built-in LoRa antenna." The duplication is a structural issue — hardware descriptions are scattered across two pages with slight inconsistencies. Worth a structural call: should hardware data live in one place and get rendered in both? YES ✅

---

# ResourcesSection.tsx

## Section heading + lede

```
Resources & Links
A few essential links to get you started and keep you going.
```

**TIGHTEN.**

- Heading: "Resources & Links" is generic. AP-SC-7 — it labels a topic instead of naming something. Compare to "What people are running" earlier. The heading should name the _kind_ of resource or report something specific.
- Lede: "to get you started and keep you going" is AP-CL-2 / AP-CO-3 — feel-good filler that any site could say.

**Proposed:**

> ## When you need something deeper than Discord
>
> Three places we send people often.

(Reports the actual function: these are the off-site references the community defers to. "Three places we send people" reports observed behavior.) ✅

## Card descriptions

```
Meshtastic Official Site — "The source of all truth. Docs, downloads, and official blog."
Meshtastic Subreddit — "The community hub for all things Meshtastic. Ask questions, share projects, and connect with other users."
Meshtastic Site Planner — "A tool for planning your mesh network. See how your nodes will connect and predict coverage."
```

**Verdict mixed:**

- Meshtastic Official Site: **KEEP.** "Source of all truth" is voice — slightly weird, confident, accurate.
- Subreddit: **REWRITE.** "Hub for all things X. Ask questions, share projects, and connect with other users" is AP-SC-4 / AP-CO-3 — a corporate website description of a community forum. Three vague verbs in series. Reader-direction failure.
- Site Planner: **TIGHTEN.** "A tool for planning your mesh network" is filler — the name already says "site planner." Use the description to say what it actually does.

**Proposed:**

Subreddit:

> Bigger and rougher than the Discord. Worth a scroll when you want a question answered by 50 people instead of 5.

Site Planner:

> Drop a pin, set an antenna height, get a propagation map. The right tool for "would a node here actually reach downtown?"

## "Visit site" link text

**KEEP.** Functional UI copy. No voice issue. ✅

---

# HostInfrastructureCTA.tsx

## Headline

```
Got a rooftop, a tower, or a high spot in the metro?
```

**KEEP.** Specific, declarative, lists three concrete things. Good voice. ✅

## Body

```
We're recruiting hosts for the KC Backbone Initiative — hosted nodes that fill the metro's east and west edges (Bonner Springs, Independence, Blue Springs) and close the I-70 hop chain out to existing outlier nodes in Manhattan and Columbia.
```

**KEEP.** Specific places named. Names what's being recruited and why. Tight. ✅

## Button

```
Become a host
```

**KEEP.** Standard CTA. No issue. ✅

---

# DroneFlyCTA.tsx

## Headline

```
Got a drone? Let's fly a node.
```

**KEEP.** Specific, conversational, declarative call. ✅

## Paragraph 1 (the how)

```
KC Mesh is borrowing a tactic from Austin Mesh: once a week, anyone with a drone coordinates a time and lifts a Meshtastic node a few hundred feet for a few minutes. A second node on the ground (set to client_mute so it doesn't add to the routing burden) blasts a friendly invite to the Discord into the mesh.
```

**KEEP.** Specific, technical, attributes the source. Reports the mechanism cleanly. ✅

## Paragraph 2 (the why)

```
Why bother? Because a lot of people in KC bought a node, didn't see traffic on day one, and stuck it in a drawer. An altitude burst hits dozens of those silent nodes at once. Most won't see the message live — but they'll see it next time they power back up. That's how dormant nodes come back to the network.
```

**TIGHTEN.** First three sentences are excellent — reporting an observed problem and a tactical solution. The closer ("That's how dormant nodes come back to the network") is AP-CL-2 — a capping sentence that restates what the previous sentence already showed.

**Proposed:**

> Why bother? Because a lot of people in KC bought a node, didn't see traffic on day one, and stuck it in a drawer. An altitude burst hits dozens of those silent nodes at once. Most won't see the message live — but they'll see it next time they power back up.

(Drops the final sentence. The reader gets the point from "they'll see it next time they power back up.") ✅

## Paragraph 3 (the ask)

```
We haven't scheduled the first one yet — looking for a couple of drone pilots to lock in a cadence. If you've got a drone (Mavic, Mini, anything that'll get a node up safely) and want to be one of the first to try it, hop in the Discord and say so. We'll pick a Saturday.
```

**KEEP.** Honest about state ("haven't scheduled the first one yet"). Specific drone examples. Direct ask. The Saturday detail is concrete — beats "we'll pick a time." ✅

## Button

```
I've got a drone — let's coordinate
```

**KEEP.** Self-selecting CTA, voice-appropriate. ✅

---

# FinalCTASection.tsx

## Headline

```
See you out there
```

**KEEP.** Voice. Short, warm, declarative. ✅

## Body

```
Whether you're saying hello on the mesh or asking questions in Discord, we're glad you're here. Pick up a node, check the coverage map, and join the conversation wherever feels right.
```

**TIGHTEN.** First clause is fine. "We're glad you're here" is AP-CO-3 — swap test: "we're glad you came," "we're glad you stopped by," all equally hollow. Second sentence is a list of three things to do, but it ends on the "wherever feels right" reassurance coda (AP-CL-2 cousin — the _closing-the-closer_ reassurance).

**Proposed:**

> Whether you're saying hello on the mesh or asking questions in Discord — pick up a node, check the coverage map, find the channel where you fit.

(Combines the two sentences. Drops the "glad you're here" platitude. "Find the channel where you fit" is more specific than "join the conversation wherever feels right.") ✅

---

# Footer.tsx

## Nav links

```
Coverage Map | Get Started | Host a Node | Steal This Network | Join Discord
```

**KEEP.** Standard nav labels. No voice issue. ✅

## Copyright

```
© 2025 Kansas City Meshtastic Network
```

**FACTUAL ISSUE.** Today is 2026-05-21 per the project context. Year should be `© 2025-2026` or `© 2026`.

**Proposed:**

> © 2026 Kansas City Meshtastic Network ✅

## Disclaimer

```
Not affiliated with meshtastic.org.
```

**KEEP.** Factual, useful, no voice issue. ✅

## License + source paragraph

```
Site content licensed under CC-BY-SA 4.0 — take whatever helps. Source on GitHub.
```

**KEEP.** Tight. Voice-correct. "take whatever helps" lands without preaching. ✅

## Lineage paragraph

```
Built on what Austin Mesh and Cascadia Mesh did first. If we've inspired you, please steal this network.
```

**KEEP.** This is one of the best sentences on the site. The "please steal this network" link doing double duty as both invitation and navigation is voice-perfect. ✅

## Version

```
v{version}
```

**KEEP.** Functional. ✅

---

# GetStartedPage.tsx

## Hero

```
Getting Started
From zero to your first transmission in about 30 minutes. Here's how folks in KC get started, but this should work for anyone in the United States.
```

**TIGHTEN.**

- Heading is fine.
- Lede has a structural issue: "Here's how folks in KC get started, but this should work for anyone in the United States" buries two distinct claims. First is "this is the KC path." Second is "this generalizes." Plus "but this should work" softens the claim unnecessarily.

**Proposed:**

> From zero to your first transmission in about 30 minutes. This is the path we use in KC — most of it works anywhere in the US. ✅

## Step 1 heading + lede

```
Step 1: Choose Your Hardware
Start with one device. You can always add more later. There are a few community favorites:
```

**TIGHTEN.** "You can always add more later" is reassurance filler (AP-CL-2 cousin). The first sentence already implies it.

**Proposed:**

> ## Step 1: Choose Your Hardware
>
> Start with one device. A few favorites: ✅

## Step 1 hardware cards

```
Heltec V3 or V4 — "Most popular starter unit. Small screen, built-in LoRa antenna. Works with your phone via Bluetooth. Perfect for testing coverage while you drive around."
```

**KEEP.** Specific, names features, ends on a concrete use case (driving around testing coverage). Good. ✅

```
RAK WisBlock — "Popular for outdoor nodes. No screen means lower power draw. Great for 24/7 home nodes or solar deployments. Several KC rooftop nodes use these."
```

**KEEP.** The "Several KC rooftop nodes use these" is specific to KC and reports observable fact. Good voice. ✅

```
Lilygo T-Deck — "Full keyboard and screen. Send messages without your phone. Built-in GPS, keyboard, trackball. Higher price but people love these for portable use."
```

**TIGHTEN.** "Keyboard" appears twice. "Higher price but people love these for portable use" — the "but people love these" is AP-CO-3 (swap test: "but people swear by these," "but people are obsessed with these"). Drop it; just report the use case.

**Proposed:**

> Full keyboard and screen. Send messages without your phone. Built-in GPS and trackball. Pricier than the others, but the only one that works fully standalone. ✅

```
T-Echo / T1000-E — "Lightweight trackers. Built-in GPS and long battery life. Great for throwing in a backpack or vehicle. T-Echo has e-ink screen, T1000-E is tiny."
```

**KEEP.** Tight, names specific features, distinguishes the two variants. ✅

## Step 1 tip-banner

```
Most people start with a Heltec V3 or V4. It's affordable, has a screen, and you can test the mesh before committing to more expensive gear.
```

**KEEP.** Functional advice. Reports observed default. No issue. ✅

## Step 2 heading + lede

```
Step 2: Get Your Device
Three main options, depending on budget and timeline:
```

**KEEP.** Functional. ✅

## Step 2 source cards

```
AliExpress — "Cheapest prices, but 2-3 week shipping from China. Good if you're patient and want to save $10-20."
Amazon — "Fast shipping (1-2 days), higher prices. Search 'Heltec V3 LoRa' or 'Meshtastic node' — watch for sellers shipping from US warehouses."
Rokland.net — "US-based, supports the Meshtastic community, good customer service. Slightly higher than AliExpress, but they test before shipping and provide support."
```

**Verdict mixed:**

- AliExpress: **KEEP.**
- Amazon: **KEEP.** Specific search terms are useful.
- Rokland.net: **TIGHTEN.** "good customer service" + "provide support" is redundant. Also "supports the Meshtastic community" is AP-CO-3 (swap test: "supports the open-source community," "supports the hobby"). Doesn't carry meaning.

**Proposed Rokland.net:**

> US-based, slightly higher than AliExpress. They test each board before shipping, and they answer email. ✅

## Step 3 heading + lede

```
Step 3: Flash the Firmware
This is easier than it sounds. Takes about 5 minutes:
```

**KEEP.** Both sentences earn their place. "Easier than it sounds" combats perfectionism, which is on-brand. ✅

## Step 3 steps

```
1. Go to flasher.meshtastic.org — Works in Chrome or Edge. No downloads needed.
2. Connect your device with a USB-C cable — The web flasher will detect it automatically.
3. Select your device model and click "Flash" — Takes 2-3 minutes. The device will reboot when done.
```

**KEEP.** All three are functional and specific. ✅

## Step 4 heading + lede

```
Step 4: Configure Your Node
Download the Meshtastic app for iOS, Android, or use the web client. Connect via Bluetooth and configure these settings:
```

**KEEP.** Functional. ✅

## Step 4 setting cards

```
Set your node name — "Something recognizable. A clever or descriptive name is better than 'Meshtastic abcd'."
Region: United States — "This sets your LoRa frequency to 915 MHz."
Set position (if GPS-enabled device) — "Helps build the coverage map. Your exact location isn't shared publicly, just general area."
```

**KEEP.** All three are tight and specific. "Meshtastic abcd" as the anti-example is a nice voice touch — concrete, not abstract. ✅

## Step 4 tip-banner

```
Leave the default "Long Fast" channel preset. Until we hit a critial mass and have to change presets, that's what KC nodes use.
```

**TYPO + TIGHTEN.** "critial" → "critical." Otherwise the prose is fine.

**Proposed:**

> Leave the default "Long Fast" channel preset. Until KC hits the density where we'd need to switch presets, that's what every node here runs. ✅

## Step 5 heading + body

```
Step 5: Say Hello

Open the Meshtastic app, go to Messages, and send a hello message to the Primary channel. You'll probably get responses from folks around KC within a few minutes (depending on time of day and your coverage).

You'll definitely get an automated welcome from the KCML node when it discovers your node for the first time.

Don't see any nodes? Check the coverage map to see if you're in range. The network is growing but still has gaps.

That's it. You're on the mesh.
```

**Verdict mixed:**

- Paragraph 1: **KEEP.** Specific, honest about timing dependencies.
- Paragraph 2: **KEEP.** Names KCML — a concrete community node.
- Paragraph 3: **KEEP.** The "still has gaps" admission is in voice.
- Paragraph 4: **KEEP.** "That's it. You're on the mesh." is voice-perfect closer. ✅

## Next Steps section

```
Next Steps

If you want to optimize your antenna, add more nodes, or troubleshoot anything, the Discord is full of people who've done this already.

[Join the Discord button]
```

**KEEP.** Tight, specific use cases, points at the right resource.
✅

---

# HostANodePage.tsx

## Hero label + headline + lede

```
KC Backbone Initiative
Got a rooftop, a tower, or a high spot? We need you.
Hosted infrastructure is the single biggest thing standing between KC Mesh today and KC Mesh covering the whole metro. If you have elevation and a willing outlet, we'd love to talk.
```

**KEEP.** Headline is direct. Lede states the stake clearly. "Willing outlet" is a nice voice touch. ✅

## "Why hosted infrastructure matters" — paragraph 1

```
KC Mesh has 60+ active nodes today, and we've built a strong spine running up and down the I-35 corridor — messages move cleanly between downtown, Westport, Overland Park, and the southern suburbs. That spine is real progress, and it's the foundation everything else builds on.
```

**TIGHTEN.** First sentence is excellent — concrete, names specific places, reports the working corridor. Second sentence ("That spine is real progress, and it's the foundation everything else builds on") is AP-CL-2 — capping sentence that restates "the spine is good."

**Proposed:**

> KC Mesh has 60+ active nodes today, with a strong spine running up and down the I-35 corridor — messages move cleanly between downtown, Westport, Overland Park, and the southern suburbs. ✅

## "Why hosted infrastructure matters" — paragraph 2

```
What we don't yet have is a mesh that reaches the metro's east and west edges, much less the cities just outside it. Most of our 60+ nodes are client nodes — handhelds, indoor home setups, T-Decks in backpacks — and client-only density doesn't carry a message from Westport to Blue Springs.
```

**KEEP.** Specific, names the actual gap, reports the technical reason (client-only density). Names cities at both ends of the failed hop. Strong voice. ✅

## "Why hosted infrastructure matters" — paragraph 3 + tip-banner

```
The fix is a small number of router nodes mounted high, with clear sky, running 24/7. We're calling the rollout the KC Backbone Initiative, and it has two parallel asks:

1. Round out the metro. Bonner Springs on the west side. Independence and Blue Springs to the east. These are the gaps where messages from downtown die before they reach you.

2. Close the chain to the outliers. There are already nodes on the map as far out as Manhattan, KS and Columbia, MO — but they can't reliably reach the KC mesh because the hop chain between them and downtown doesn't exist yet. Lawrence, Topeka, Lee's Summit, Warrensburg — every host along I-70 in either direction is a link that makes those far-out nodes part of the network.
```

**KEEP.** All three parts work. Specific cities, real technical claim ("hop chain"), concrete asks. ✅

## "What makes a great host site" — section lede

```
Honest list. If your site checks most of these, please get in touch — we can work around the rest.
```

**TIGHTEN.** "Honest list" as a section opener is a tic — it appears on this page and arguably implies the other lists weren't honest. AP-VO-3 cousin (intensifier-as-tic).

**Proposed:**

> If your site checks most of these, please get in touch. We can work around the rest. ✅

(Cuts the "Honest list" eyebrow. The list is just the list.)

## "What makes a great host site" — card 1 (Elevation)

```
Elevation — 15 feet and up
You don't need a 40-foot tower. A two-story roof works. A flagpole works. An attic with a clear southern exposure can work. The dogma about needing massive elevation is just dogma — get above the immediate clutter and you're already useful.
```

**KEEP.** Voice-perfect. The fragment runs are deliberate (AP-RH-2 exception: they enumerate concrete alternatives, not abstract claims). The "dogma is just dogma" line is the anti-perfectionism stance in compressed form. ✅

## "What makes a great host site" — card 2 (Sky/LoS)

```
Sky that's not blocked by another building
LoRa at 915 MHz mostly cares about line of sight. If you can see other rooftops and the horizon in at least one direction, signals will travel. We'll help you pick the antenna and aim.
```

**KEEP.** Tight, specific, ends on what we'll do (not a wrap-up coda). ✅

## "What makes a great host site" — card 3 (Power)

```
A 120V outlet — or room for a small solar panel
A wired node draws less power than a wifi router. Don't have an outlet on the roof? A 10W solar panel and a small battery run a node indefinitely. We've got documented setups for both.
```

**KEEP.** Specific, names the wattage. "Indefinitely" is doing real work here (it's literally true — solar with battery runs unattended for years). Good. ✅

## "What makes a great host site" — card 4 (Hardware)

```
Willingness to host modest hardware
We're talking about a $60–$200 device the size of a paperback, plus a small antenna. Not commercial telecom gear. Weekend-project scale. If something breaks, the worst case is somebody comes out and swaps the box.
```

**KEEP.** "Size of a paperback" is concrete and disarming. "Weekend-project scale" lands. The closer ("worst case is somebody comes out and swaps the box") reports what happens, doesn't reach for wisdom. ✅

## "Who should consider hosting" — section lede

```
If you see yourself in any of these, you're exactly who we're trying to reach.
```

**KEEP.** Direct, declarative, names the audience. ✅

## hostTypes cards

### Card 1: Businesses with rooftops

```
Warehouses, retail strip centers, offices. If you have a flat roof and a 120V outlet on it, you have what we need. We're especially looking in Bonner Springs, Independence, and Blue Springs — plus any spot along I-70 (east or west) where a hop helps connect existing outlier nodes in Manhattan and Columbia back to the KC mesh.
```

**KEEP.** Specific buildings, specific cities, specific reason. ✅

### Card 2: Ham operators & repeater owners

```
You already have what we need — elevation, line of sight, and the inclination to mess with radios. A Meshtastic router at your repeater site is a $60 add to infrastructure you've already built.
```

**KEEP.** Voice-tight. "Inclination to mess with radios" is good — names the cultural overlap with hams without being sycophantic. ✅

### Card 3: Churches, schools, civic buildings

```
Steeples, water tanks, rooftop HVAC platforms — anywhere with elevation and a friendly facilities person. A great emergency-comms talking point for your community.
```

**TIGHTEN.** First sentence is excellent — "friendly facilities person" is a perfect voice detail (the actual gatekeeper at these sites is usually a person, not a process). Second sentence is AP-CL-2 — a wrap-up that explains why this matters to the reader.

**Proposed:**

> Steeples, water tanks, rooftop HVAC platforms — anywhere with elevation and a friendly facilities person. Emergency comms is the right talking point if you're pitching this to a board.

(Names _how_ to use the angle, not just that the angle exists. More useful.) ✅

### Card 4: Billboard, water tower, cell tower owners

```
Cascadia's first big host was a billboard owner outside Mayfield, WA. The model works. If you own structures along I-29, I-35, I-70, or I-435, please get in touch.
```

**KEEP.** Specific case-study reference (Mayfield), specific highways. Voice. ✅

### Card 5: Building managers & flagpole homeowners

```
Apartment buildings, condos, HOA-restricted neighborhoods with a flagpole or attic. Stealth deployments are absolutely a thing. 15 feet of elevation is genuinely useful.
```

**TIGHTEN.** "Absolutely a thing" is AP-VO-4 territory ("actually" superiority cousin). "Genuinely useful" is similar — the "genuinely" is reaching to convince the skeptical reader.

**Proposed:**

> Apartment buildings, condos, HOA-restricted neighborhoods with a flagpole or attic. Stealth deployments work. 15 feet of elevation is enough to be useful.

(Drops "absolutely" and "genuinely" — the prose is stronger without the intensifiers. "Enough to be useful" is more precise than "genuinely useful.")

## "What KC Mesh provides in return" — section lede

```
This is a hobbyist project, not a vendor relationship. But here's what we bring to the table:
```

**REWRITE.** Two issues:

1. "Not a vendor relationship" — true but defensive. The reader didn't ask if you're a vendor.
2. "Here's what we bring to the table" is AP-VO-2 (corporate-adjacent vocabulary).

**Proposed:**

> Hosting a node is a favor. Here's what we do in return.

(States the relationship plainly. "Favor" is honest and accurate — hosts aren't being paid. "What we do in return" reports the exchange.)

## "What KC Mesh provides in return" — card 1 (Equipment)

```
Equipment guidance — and sometimes the equipment itself
We'll pick hardware that fits your site, your power situation, and your budget. For priority backbone locations, we can usually find someone in the community willing to donate or split the cost of the device.
```

**KEEP.** Honest about scope ("usually" not "always"). Specific exchange model.

## "What KC Mesh provides in return" — card 2 (Deployment)

```
Hands-on deployment help
Someone from the community will come out, mount the antenna, configure the node, and confirm it's healthy on the mesh. You don't need to learn LoRa to host one.
```

**KEEP.** Names the four actual steps. "You don't need to learn LoRa to host one" is a real value prop — most ham/RF gatekeeping fails this test.

## "What KC Mesh provides in return" — card 3 (Monitoring)

```
Ongoing monitoring via Discord
If your node falls off the mesh, somebody in the Discord will notice — usually within an hour. We'll let you know and help you bring it back up.
```

**KEEP.** Specific time ("within an hour"), names the action ("let you know"). Concrete.

## "What KC Mesh provides in return" — card 4 (Credit)

```
Public credit on the coverage map
Your site shows up on map.kansascitymesh.live as a contributing backbone node. If you're a business, we'll happily call you out by name; if you'd rather be anonymous, we don't have to.
```

**KEEP.** Names both options.

## "What this looks like in practice" — section

```
The proof of concept is already up. One of our first router nodes is a Heltec V3 in a weatherproof box, mounted about 25 feet up, drawing power from a regular outdoor outlet. Total hardware cost was under $100. Total install time was an afternoon.

It's been online for months. It hands off traffic between client nodes that can't hear each other directly. It made the difference between "a few people messing around" and "a network."

We need more like it — out at the edges, and along I-70 in both directions to close the chain to the existing outliers. That's the whole ask.
```

**KEEP.** All three paragraphs work. The closing "That's the whole ask" is the rare valid use of the understatement-closer — it lands because the section actually was just stating the ask.

## "Get in touch" — section

```
If you've got a site that sounds like it might fit — or you just want to talk it through to find out — please reach out. The fastest path is email, but Discord works too.

[Email button] [Discord button]

Not sure yet? No problem. The Discord is open — lurk for a while, see what people are doing, and circle back whenever it makes sense.
```

**TIGHTEN.** "Not sure yet? No problem." is two reassurance sentences before the actual content. The second one is AP-CL-2.

**Proposed:**

> Not sure yet? The Discord is open — lurk for a while, see what people are doing, and circle back whenever it makes sense.

(Drops "No problem.")

---

# StealThisNetworkPage.tsx

## Hero headline + lede

```
Steal this network.
If you're building a community mesh in another city — take whatever you can use from this site. Words, ideas, structure, code. That's how we got here, and that's how the next one happens.
```

**KEEP.** Strong voice. Closer ("how we got here, how the next one happens") is genuine, not wrap-up.

## Intro paragraph 1

```
Community mesh networks aren't a product. They're a posture — a small, friendly, anti-perfectionist bet that a handful of people with $60 radios can build something useful for the place they live. KC Mesh exists because Austin Mesh existed first, and the version of this site you're reading exists because Cascadia Mesh figured out a clearer way to talk about hosted infrastructure.
```

**KEEP.** The "posture not product" framing is the actual thesis. The lineage statement is specific and earned.

## Intro paragraph 2

```
None of that is proprietary. It shouldn't be. If you're trying to seed a mesh in your own city and any of this saves you a weekend, please take it. The site content here is offered under the same CC-BY-SA 4.0 license Austin Mesh uses — keep it open, share the next version forward.
```

**KEEP.** Tight, declarative, names the license, ends on a call to action that's specific ("share the next version forward").

## "What you can use" cards

### The words

```
Copy any sentence on this site. Rewrite it for your city, your terrain, your community's quirks. The anti-dogma framing — "15 feet is fine," "indoor sometimes works," "deployed imperfect beats theoretical perfect" — was hard-won over a lot of arguments online. You don't have to relitigate it.
```

**KEEP.** Three quoted slogans are specific and reusable. "You don't have to relitigate it" is voice — wry, reports a known cost.

### The structure

```
A homepage, a Get Started, a Host a Node, a Discord, a coverage map. That's the whole thing. You don't need a forum, a wiki, a Substack, or a 501(c)(3). Keep it small. Keep it scannable. Let the Discord carry the real-time stuff.
```

**KEEP.** Lists what's in, lists what's not, ends on three short imperatives. The 501(c)(3) detail is voice — names the institutional bloat trap by name.

### The host-a-node ask

```
The framing on our Host a Node page — businesses with rooftops, ham operators with repeater sites, billboard owners along interstates — works in any metro. Swap the highways and city names. The pitch is the same: "you already have what we need."
```

**KEEP.** Concrete, three example audiences, names the actual transferable line.

### The code

```
This site is a small React + Vite app, public on GitHub under CC-BY-SA 4.0. Fork it, gut it, swap out the city name and the highway list, and you've got a working starting point. There's nothing in there worth gatekeeping.
```

**KEEP.** Strong. "Gatekeeping" is on-brand vocabulary.

## "Who we stole from" — section lede

```
Credit where it's due — this is a chain, not an original.
```

**TIGHTEN.** "X — not Y" rhythm is AP-RH-1. Once is fine, but this is paired with "aren't a product. They're a posture" earlier in the same page and "isn't ego — it's that..." later. The pattern appears at least three times on this page. Pick one to keep; rewrite the others.

**Proposed:**

> Credit where it's due. This site is a link in a chain.

## Lineage card: austinmesh.org

```
Where this whole posture comes from. Austin Mesh runs their site under a CC-BY-SA share-alike license — they explicitly want other cities to copy it. The welcoming tone, the prosumer framing, the quarterly meetings, the running list of partner meshes across the country: all theirs first. If you can only read one other mesh site, read theirs.
```

**KEEP.** Names what they did first. Strong recommendation closer.

## Lineage card: cascadiamesh.org

```
The current refresh of this site is built on what Cascadia is doing — the Backbone Initiative framing, the host-a-node ask, the 'a billboard owner outside Mayfield' kind of storytelling. A lot of the language on the Host a Node page is a direct descendant of theirs.
```

**KEEP.** Specific debt named (the Mayfield billboard reference is real and traceable).

## "Before you start one" — section

```
Before you start one — find your nearest mesh

Two cities don't need two meshes. If there's already a community within an hour's drive, join theirs first — show up to a meeting, learn how they operate, and build a chapter or a partner mesh instead of a competitor.

Austin Mesh maintains the best-kept running list of partner meshes in the US (Bay Area, SoCal, Chicago, Colorado, Nashville, Birmingham, Asheville, Charlotte, North Texas, South Texas, Hawaii, Ohio, Wisconsin, Northwest Arkansas, OkMesh, Philadelphia, and more). Start there:
```

**TIGHTEN.** "Two cities don't need two meshes" is voice. "Best-kept" before "running list" is AP-CL-1 — reaching for pith ("best-kept" implies it's a hidden gem, which it isn't; it's just public).

**Proposed:**

> Austin Mesh maintains the running list of partner meshes in the US (Bay Area, SoCal, Chicago, Colorado, Nashville, Birmingham, Asheville, Charlotte, North Texas, South Texas, Hawaii, Ohio, Wisconsin, Northwest Arkansas, OkMesh, Philadelphia, and more). Start there.

## "Beyond the website" — section lede

```
The site is the easy part. The community is the hard part — and most of what's worth saying about it, Austin Mesh has already said well. The condensed version, in the same spirit:
```

**TIGHTEN.** "Easy part / hard part" is the X-not-Y rhythm again (AP-RH-1). Already used twice on this page.

**Proposed:**

> The site is the easy part. Growing the community is harder, and Austin Mesh has already said most of what's worth saying. The condensed version:

(Drops "in the same spirit" — implies derivation that the closer-link already makes explicit.)

## operationalTips cards

### Have regular meetings

```
Quarterly works. Sometimes 30 people show up, sometimes it's three of you at a bar. The point is that anyone who misses one knows there's another coming. Cadence beats turnout.
```

**KEEP.** "Cadence beats turnout" is voice — earned aphorism, four words, specific.

### Start a Discord (or Slack, or Telegram) and an email list

```
The Discord carries the day-to-day. The email list catches people who don't want to live in Discord — which is a lot of older operators, and they're the ones with the towers.
```

**KEEP.** "They're the ones with the towers" is the kind of specific observation that earns the broader point.

### Talk to your local ham radio clubs

```
They know radio. They have access to towers and rooftops. They are often delighted to be asked about anything that isn't 2-meter repeater drama. Go to a meeting. Bring a node.
```

**KEEP.** "2-meter repeater drama" is voice — names a specific known thing, lands without explanation for the audience that knows what it means.

### Talk to local mutual aid and disaster relief groups

```
Red Cross, ARES, neighborhood preparedness groups, community emergency response teams. They have buildings. They care about resilient comms. The emergency-comms framing opens doors that the hobby framing alone won't.
```

**KEEP.** Specific orgs named. Tactical observation about framing.

### Brag in public when something works

```
Solar node up? Post it. New router on a billboard? Post it. The point isn't ego — it's that someone two suburbs over has a node sitting on their desk because they didn't see traffic, and your post is what makes them turn it back on.
```

**TIGHTEN.** "The point isn't X — it's Y" is AP-RH-1 again. Same pattern as elsewhere on this page. The mechanism the sentence describes is real, but the rhythm is overused.

**Proposed:**

> Solar node up? Post it. New router on a billboard? Post it. Somewhere two suburbs over, someone has a node sitting on their desk — they didn't see traffic, so they stopped checking. Your post is what gets them to turn it back on.

(Drops the X-not-Y. Reports the mechanism flat.)

### Fly a node, once a week, if you can

```
Borrowed straight from Austin Mesh and worth its own line. Anyone in the community with a drone coordinates a weekly time, lifts a node to altitude for a few minutes, and a separate node on the ground (set to client_mute so it doesn't clog routing) blasts a few messages inviting people to the Discord. Most of the people you reach this way are folks who bought a node, didn't see traffic, and left it on a shelf. They may not see your message right then — but they'll see it in the coming days or weeks. In larger meshes (200+ online nodes) the airborne node can be configured as ROUTER.
```

**TIGHTEN.** "Borrowed straight from Austin Mesh and worth its own line" is meta-commentary (AP-RD-4 cousin — telling the reader why this entry exists instead of just having it exist).

**Proposed:**

> Anyone in the community with a drone coordinates a weekly time, lifts a node to altitude for a few minutes, and a separate node on the ground (set to `client_mute` so it doesn't clog routing) blasts a few messages inviting people to the Discord. Most of the people you reach this way are folks who bought a node, didn't see traffic, and left it on a shelf. They may not see your message right then — but they'll see it in the coming days or weeks. In larger meshes (200+ online nodes) the airborne node can be configured as ROUTER. (Borrowed straight from Austin Mesh — they wrote it first.)

(Moves the attribution to the end, in a parenthetical aside, where it belongs.)

## "Beyond the website" attribution paragraph

```
Almost all of this is borrowed, in spirit, from Austin Mesh's "How to start a similar network" guide. If anything here is useful, go read theirs in full — it's longer, more specific, and more battle-tested.
```

**KEEP.** Genuine credit, useful pointer.

## "A few honest tips" — section + four bullets

```
A few honest tips, if you're just starting

Deploy one router before you build the website. A real node on a real roof gives you something to point at. Without it, the site is just a manifesto.

Start the Discord on day one. Even if it's empty. The network is the people, and the people need a place to be. Mesh-on-radio is for messages; Discord is for figuring out what to build next.

Resist the urge to centralize. No bylaws. No officers. No membership tiers. The minute it starts feeling like a club is the minute the most interesting people stop showing up.

Tell the truth about what doesn't work. Every mesh has dead zones, dropped messages, and nodes that quietly fall off the network for weeks. Honesty about that earns more trust than another glossy coverage claim.
```

**Mixed verdict:**

- Section heading: **TIGHTEN.** "A few honest tips" is the second use of "honest" as a section eyebrow on this page (also "Honest list" on HostANodePage). Pick one or rewrite.
- Bullets 1-4: **KEEP all four.** They're the strongest piece of voice writing on the site.

**Proposed heading:**

> ## If you're just starting

(Drops "A few honest tips," which is wearing thin. The bullets speak for themselves.)

## "Say hi" — section

```
Say hi

If anything on this site inspired you, drop us a line. That's the line Austin Mesh closes their site with, and it's the right one. No agenda — just genuinely curious where the next one is going to be, and happy to share whatever's been useful here.

[Email button] [Discord button]
```

**TIGHTEN.** "That's the line Austin Mesh closes their site with, and it's the right one" is meta-commentary about why the line exists (AP-RD-4 cousin — same issue as the drone-tactic intro). The reader gets the credit from the lineage section earlier; the sentence here is doing the explanatory work that the rest of the page already did.

**Proposed:**

> If anything on this site inspired you, drop us a line. No agenda — just curious where the next one is going to be, and happy to share whatever's been useful here.

(Drops the meta-sentence. "Genuinely" → cut, AP-VO-4 cousin. Reads tighter.)

---

# Nav.tsx

## "KC Mesh" badge

**KEEP.** Branding chrome.

## Nav labels

```
Coverage Map | Host a Node | Get Started | Join Discord
```

**KEEP.** Standard nav.

---

# CLAUDE.md — Voice Direction (project memory)

```
Critical Voice Direction: First-person narrative. "I'm building..." not "The network provides...". Honest about learning curve. Welcoming to everyday people. Combat perfectionism that prevents deployment.
```

**REWRITE.** This is now stale and contradicts the new collective-voice direction. Any future Claude session that reads CLAUDE.md will be told to write first-person-singular, which is exactly what's being undone.

**Proposed:**

> **Critical Voice Direction**: Collective first person — the site speaks as the KC Mesh community of 200+. "We're building..." not "I'm building..." and not "The network provides...". The community is the implied speaker; specific people get named only when accuracy requires it. Honest about gaps and the learning curve. Welcoming to everyday people. Combat perfectionism that prevents deployment.

---

# Summary

## Verdict distribution

- **KEEP:** ~70% of passages
- **TIGHTEN:** ~25% of passages (most are AP-CL-2 capping sentences, a few AP-RH-1 rhythm tics, scattered AP-CO-3 vapid-abstract)
- **REWRITE:** ~5% of passages (corporate-adjacent vocabulary, dated CLAUDE.md, two cards that don't earn their place)

## The five highest-leverage edits

If you only do five things from this audit:

1. **Update CLAUDE.md voice direction.** Stops the drift before it spreads to future sessions.
2. **Fix the copyright year.** It's currently 2025 and the date is 2026-05-21.
3. **Strip the "Honest list" / "A few honest tips" eyebrows.** The word "honest" appearing four times across two pages reads formulaic.
4. **Cut three or four AP-RH-1 "X, not Y" sentences** on StealThisNetworkPage. The rhythm appears at least four times on that page alone.
5. **Cut wrap-up codas at the end of paragraphs.** DroneFlyCTA "Why bother?" paragraph, HostANodePage "Why this matters" paragraph 1, FinalCTASection body, and several others. These are the highest-frequency AP-CL-2 violations and the easiest to delete.

## Structural callouts (not voice issues, but worth flagging)

1. **Hardware data lives in two places** (HardwareSection and GetStartedPage Step 1) with slightly different descriptions for each device. Should be one source.
2. **Email constants** (`HOST_EMAIL`, `STEAL_EMAIL`) both point to `hello@orangefla.me`. Consider a single `CONTACT_EMAIL` in a constants file.
3. **Date in copyright is hardcoded.** Should derive from current year so this doesn't go stale again.
4. **The site has no per-page meta tags** (description, og:title, og:image, twitter:card). Social previews will be the same generic favicon for every link. Worth its own phase (Phase D).

## Anti-pattern frequency on this site

In rough order of how often each catalog entry fired:

1. **AP-CL-2** (capping sentences at paragraph ends) — ~12 instances
2. **AP-RH-1** ("X, not Y" rhythm) — ~6 instances, mostly on StealThisNetworkPage
3. **AP-CO-3** (vapid abstract subjects) — ~5 instances, mostly in lede/CTA copy
4. **AP-VO-4** ("actually" / "genuinely" / "absolutely" as superiority markers) — 4 instances
5. **AP-RD-4** (meta-commentary about patterns instead of the patterns themselves) — 3 instances
6. **AP-SC-7** (topic-label headers instead of named-thing headers) — 2 instances
7. **AP-VO-2** (corporate-adjacent vocabulary: "bring to the table") — 1 instance

The good news: the site is already mostly in voice. The bad news: the wrap-up coda habit is everywhere and needs surgical removal pass by pass.

---

# Next steps

Read this doc end-to-end. For each section, mark one of:

- **✅ Apply all proposed changes**
- **🟡 Apply some — mark which ones individually**
- **❌ Reject all proposed changes — original is better**

Then I'll apply the approved edits in a single pass and run typecheck + build. Voice audit is one phase; design system audit (Phase B) is a separate session.
