# Site Architecture Document
## Kansas City Meshtastic Network Website

**Version**: 1.0
**Date**: 2025-10-04
**Status**: Planning Phase

---

## 1. Executive Summary

This document defines the information architecture, navigation structure, and page hierarchy for the Kansas City Meshtastic Network website. The site serves dual purposes: comprehensive resource hub for mesh networking and coordination mechanism for connecting with existing community operators.

---

## 2. Site Map & Hierarchy

### 2.1 Primary Navigation Structure

```
┌─────────────────────────────────────────────────────┐
│                     HEADER                          │
│  Logo | About | Get Started | Network | Guides |   │
│        Resources | Community                        │
└─────────────────────────────────────────────────────┘

HOME (/)
│
├── ABOUT (/about)
│   ├── Community & Coordination (/about/coordination)
│   └── Why Meshtastic? (/about/why-meshtastic)
│
├── GET STARTED (/get-started)
│   ├── Join the Network (/get-started/join)
│   ├── Quick Start Guide (/get-started/quick-start)
│   └── Hardware Selection (/get-started/hardware)
│
├── NETWORK INFO (/network)
│   ├── Coverage Map (/network/coverage)
│   ├── Network Architecture (/network/architecture)
│   ├── Current Status (/network/status)
│   └── Growth Strategy (/network/growth)
│
├── DEPLOYMENT GUIDES (/guides)
│   ├── For Ham Radio Operators (/guides/ham-operators)
│   ├── For Repeater Owners (/guides/repeater-owners)
│   ├── Residential Solar Setups (/guides/solar-residential)
│   ├── Router vs Gateway Guide (/guides/router-gateway)
│   └── West Side Infrastructure (/guides/west-side)
│
├── RESOURCES (/resources)
│   ├── Frequency Reference (/resources/frequencies)
│   ├── Equipment Guide (/resources/equipment)
│   ├── Troubleshooting (/resources/troubleshooting)
│   └── FAQs (/resources/faqs)
│
└── COMMUNITY (/community)
    ├── Contact & Coordination (/community/contact)
    ├── Success Stories (/community/stories)
    └── How to Contribute (/community/contribute)

┌─────────────────────────────────────────────────────┐
│                     FOOTER                          │
│  Navigation Links | Contact Methods | Theme Toggle  │
│  Coordination Note | Legal | Last Updated           │
└─────────────────────────────────────────────────────┘
```

---

## 3. Page Definitions & Purposes

### 3.1 Homepage (/)
**Purpose**: Primary landing, orientation, and conversion
**Key Sections**:
- Hero with dual CTAs (Join Network / View Coverage)
- Community Coordination Banner (prominent, warm amber)
- Value Propositions (3 cards: Emergency Ready, Community Built, Easy to Join)
- Current Network Stats (live dashboard)
- Recent Updates (3 cards)
- Quick Access Links (4-column grid)

**Primary User Flows**:
1. New user → Join the Network
2. Existing community → Community & Coordination
3. Infrastructure contributor → Deployment Guides
4. Curious learner → Why Meshtastic?

---

### 3.2 About Section

#### 3.2.1 Community & Coordination (/about/coordination)
**Purpose**: PRIMARY coordination mechanism for kansascitymesh.net operator
**Unique Value**: This is the bridge to existing community - highest priority
**Key Sections**:
- Seeking Coordination with Existing Community
- Multiple Coordination Scenarios (4 detailed scenarios)
- What We Contribute (comprehensive list)
- Contact Methods (prominent, multiple options)
- For New Participants (guidance)
- Transparency & Timeline (live status panel)
- Why Unified Community Matters
- This Site as Community Resource

**Success Metric**: Contact established with existing operators

#### 3.2.2 Why Meshtastic? (/about/why-meshtastic)
**Purpose**: Educational foundation for complete beginners
**Key Sections**:
- Mesh Networking Explained (simple language, diagrams)
- The Meshtastic Implementation (specs, capabilities, limits)
- Real-World Applications (4 detailed scenarios)
- Kansas City's Strategic Approach (our differentiation)
- Common Questions for Beginners (8-10 Q&As)
- Technology Deep-Dive (expandable/optional for curious)

**Success Metric**: Beginner understands concept, moves to Get Started

---

### 3.3 Get Started Section

#### 3.3.1 Join the Network (/get-started/join)
**Purpose**: PRIMARY CONVERSION PATH - zero to operational
**Format**: 4-step walkthrough with progress visual
**Key Sections**:
- Prerequisites Check (visual checkboxes)
- Step 1: Choose Your Hardware (decision framework, options)
- Step 2: Install Meshtastic App (platform-specific)
- Step 3: Configure Your Node (15-20 min walkthrough)
- Step 4: Connect and Verify (expectations, troubleshooting)
- Next Steps After Basic Setup (optimization path)
- Community Connection (coordination channels)
- Troubleshooting Quick Links

**Success Metric**: User completes setup, joins coordination channel

#### 3.3.2 Quick Start Guide (/get-started/quick-start)
**Purpose**: Minimal steps for experienced users
**Format**: Single-page scannable checklist
**Content**: Ultra-condensed version of Join the Network
**Success Metric**: Experienced user on mesh in 20 minutes

#### 3.3.3 Hardware Selection (/get-started/hardware)
**Purpose**: Deep-dive equipment guidance
**Key Sections**:
- Understanding Hardware Categories (entry/mid/infrastructure)
- Detailed Device Comparisons (specs, pros/cons, use cases)
- Mid-Range Options (3-4 models)
- Infrastructure/Router Hardware (4 approaches)
- Antenna Selection (critical for performance)
- Power Solutions (USB/battery/solar)
- Accessory Recommendations (essential + optional)
- Buying Guide and Warnings (sources, verification, red flags)
- Cost Planning (4 tiers: $30-350)
- Hardware Decision Framework (choose based on needs)
- Getting Started After Purchase (timeline)

**Success Metric**: User makes informed hardware purchase

---

### 3.4 Network Info Section

#### 3.4.1 Coverage Map (/network/coverage)
**Purpose**: Interactive visualization of current/planned coverage
**Key Components**:
- Interactive map (leaflet or similar)
- Live node markers (active nodes with stats)
- Coverage zones (signal strength overlays)
- Gap analysis (areas needing coverage)
- Strategic router positions (4-router backbone visualization)
- Filters (by signal strength, node type, status)
- Click node → details panel (stats, type, last seen)

**Success Metric**: User understands coverage status, identifies gaps

#### 3.4.2 Network Architecture (/network/architecture)
**Purpose**: Technical explanation of how KC mesh works
**Key Sections**:
- Mesh Topology Overview (peer-to-peer, self-healing)
- Four-Router Backbone Strategy (why this topology for KC)
- Router vs Client Nodes (roles, responsibilities)
- Routing and Hop Limits (how messages traverse)
- MQTT Gateway (Router 1 function, pros/cons)
- Redundancy and Failover (network resilience)
- Channel Configuration (LongFast preset, custom channels)
- Security Model (encryption, privacy considerations)
- Integration with Emergency Comms (ARES/RACES complement)

**Success Metric**: Technical user understands network design

#### 3.4.3 Current Status (/network/status)
**Purpose**: Live dashboard of network health and metrics
**Key Components**:
- Network Stats (total nodes, coverage area, messages/24h)
- Router Status (4 routers: operational/seeking/planned)
- Recent Activity Timeline (deployments, messages, events)
- Performance Metrics (average hop count, message success rate)
- West Side Infrastructure Campaign (progress tracker)
- Uptime Statistics (router reliability)
- Growth Charts (nodes over time, coverage expansion)

**Success Metric**: User sees network health, understands current state

#### 3.4.4 Growth Strategy (/network/growth)
**Purpose**: Vision document for network expansion
**Key Sections**:
- Vision: Metro-Wide Mesh Network (end goal)
- Phase-Based Deployment (4 phases with milestones)
  - Phase 1: East Anchor ✓ Complete
  - Phase 2: West Bridge ◆ In Progress (SEEKING HOST)
  - Phase 3: North/South Extension ○ Planned
  - Phase 4: Density Optimization ○ Future
- Success Metrics by Phase (measurable milestones)
- Strategic Infrastructure Needs (specific router positions)
- Community Growth Path (participant recruitment)
- Integration with Existing Networks (coordination scenarios)
- Long-Term Sustainability (maintenance, funding, governance)

**Success Metric**: User understands vision, sees how to contribute

---

### 3.5 Deployment Guides Section

#### 3.5.1 For Ham Radio Operators (/guides/ham-operators)
**Purpose**: Bridge to licensed amateur radio community
**Target Audience**: Licensed hams with RF knowledge
**Key Sections**:
- Why Meshtastic for Ham Operators (value proposition)
- Translation to Ham Terminology (frequency/modulation/power)
- Comparison to Voice Nets (complementary, not replacement)
- Repeater Site Integration (leverage existing infrastructure)
- Emergency Communications Value (ARES/RACES integration)
- Technical Deep-Dive (LoRa modulation, link budgets, propagation)
- Amateur Band Operation (experimental vs ISM band)
- Contributing Infrastructure (repeater-sited router nodes)
- Legal Considerations (ISM vs amateur bands, power limits)

**Success Metric**: Ham operator deploys node, shares with club

#### 3.5.2 For Repeater Owners (/guides/repeater-owners)
**Purpose**: Convert repeater sites to mesh infrastructure
**Target Audience**: Repeater trustees, tower site owners
**Key Sections**:
- You Already Have What We Need (elevation, power, access)
- Minimal Investment Required ($60-120 hardware)
- No Interference Concerns (different frequency, low power)
- Simple Integration (independent system, minimal complexity)
- Strategic Value (single router node covers miles)
- Installation Approach (mounting, power, configuration)
- Maintenance Requirements (firmware updates, monitoring)
- Community Benefit (multiply network effectiveness)
- Legal/Coordination (site permissions, coordination)

**Success Metric**: Repeater owner agrees to host router node

#### 3.5.3 Residential Solar Setups (/guides/solar-residential)
**Purpose**: HOA-friendly, stealth, anti-dogma deployment
**Target Audience**: Homeowners (especially HOA-restricted)
**Key Sections**:
- Anti-Dogma Introduction (deployed imperfect > theoretical perfect)
- Stealth Integration Approaches:
  - Flagpole Integration (HOA-acceptable, 15-20 ft elevation)
  - Fence Post Extension (decorative element approach)
  - Attic Installation (test your building's attenuation)
  - Birdhouse Disguise (maximum stealth)
  - Gutter/Soffit Mounting (hidden in plain sight)
- Solar System Sizing Reality (10W adequate, not 50W fear)
- Complete System Builds ($100-200 each):
  - Budget Build ($100-120)
  - Recommended Build ($140-180)
  - Premium Build ($180-220)
- Performance Expectations (realistic ranges, trade-offs)
- Testing Your Environment (signal tests, optimization)
- HOA Navigation (stealth, rules interpretation, asking forgiveness)

**Success Metric**: HOA homeowner deploys stealth node successfully

#### 3.5.4 Router vs Gateway Guide (/guides/router-gateway)
**Purpose**: Configuration decision guide
**Key Sections**:
- Client vs Router vs Gateway (three roles explained)
- When to Configure as Router (stable, elevated, good coverage)
- When to Configure as Gateway (MQTT bridge, internet)
- Configuration Walkthrough (router mode setup)
- Gateway Setup (MQTT broker, internet requirements)
- Router Best Practices (antenna, power, positioning)
- Gateway Security (network isolation, firewall)
- Kansas City Network Roles (how roles fit strategy)

**Success Metric**: User configures node appropriately

#### 3.5.5 West Side Infrastructure (/guides/west-side)
**Purpose**: PRIORITY gap - specific campaign for Router 2
**Key Sections**:
- Why West Side is Critical (gap in backbone strategy)
- Strategic Position Requirements (elevation, coverage area)
- Ideal Host Profile (repeater site, tall building, hilltop)
- What We Provide (hardware, installation, maintenance)
- What We Need from Host (elevated position, power, access)
- Coverage Simulation (expected reach from various positions)
- Current Candidates (potential sites being evaluated)
- How to Offer Your Site (contact, evaluation process)
- Community Impact (unlocks Johnson County, completes bridge)

**Success Metric**: West side router host identified and deployed

---

### 3.6 Resources Section

#### 3.6.1 Frequency Reference (/resources/frequencies)
**Purpose**: Business/retail monitoring frequencies for KC area
**Content**: Tables of frequencies from README (retail, business, public safety)
**Note**: Educational/monitoring only (receive, not transmit)
**Success Metric**: User finds relevant monitoring frequencies

#### 3.6.2 Equipment Guide (/resources/equipment)
**Purpose**: Advanced technical topics beyond hardware selection
**Key Sections**:
- Antenna Theory and Selection (detailed RF concepts)
- Transmission Line Losses (cable types, connectors)
- Power System Design (solar calculations, battery sizing)
- Weatherproofing Techniques (enclosures, sealing, protection)
- Advanced Configurations (custom channels, encryption)
- Firmware Management (updates, custom builds)
- Integration Projects (sensors, automation, APIs)

**Success Metric**: Advanced user finds technical depth needed

#### 3.6.3 Troubleshooting (/resources/troubleshooting)
**Purpose**: Systematic problem solving
**Format**: Problem → Diagnosis → Solutions
**Key Sections**:
- Device Won't Power On (battery, USB, hardware)
- Bluetooth Pairing Issues (common problems, solutions)
- No Nodes Showing (expected behavior, actual problems)
- Poor Range/Coverage (antenna, position, configuration)
- Battery Drains Quickly (power settings, optimization)
- Configuration Won't Save (firmware, app issues)
- GPS Not Working (signal, antenna, settings)
- Messages Not Sending (channel, encryption, routing)

**Success Metric**: User resolves issue independently

#### 3.6.4 FAQs (/resources/faqs)
**Purpose**: Quick answers to common questions
**Format**: Categorized Q&A with jump links
**Categories**:
- Getting Started (5-7 questions)
- Hardware and Equipment (8-10 questions)
- Network and Coverage (6-8 questions)
- Configuration and Setup (7-9 questions)
- Security and Privacy (5-6 questions)
- Community and Coordination (4-5 questions)

**Success Metric**: User finds answer quickly without contacting support

---

### 3.7 Community Section

#### 3.7.1 Contact & Coordination (/community/contact)
**Purpose**: Multiple contact methods with response commitments
**Key Sections**:
- Primary Coordination Email (response time: 24-48h)
- Community Chat (Discord/Matrix) (real-time, best for quick questions)
- GitHub (technical issues, documentation contributions)
- Local Ham Clubs (in-person coordination)
- Response Expectations (what to expect, when)
- For kansascitymesh.net Operator (special priority note)

**Success Metric**: User contacts via appropriate channel

#### 3.7.2 Success Stories (/community/stories)
**Purpose**: Real deployments with costs, performance, lessons
**Format**: Case studies with photos, stats, takeaways
**Example Stories**:
- Router 1 East Anchor (first backbone node, full story)
- First HOA Stealth Deployment (flagpole integration)
- Mobile Node on Vehicle (coverage testing)
- Ham Club Partnership (repeater site integration)
- Budget Entry Node (under $50 total cost)

**Success Metric**: User sees realistic examples, feels achievable

#### 3.7.3 How to Contribute (/community/contribute)
**Purpose**: Multiple participation paths
**Key Sections**:
- Deploy a Node (primary contribution)
- Host Infrastructure (router/gateway hosting)
- Contribute Documentation (improve guides)
- Test and Report (coverage testing, bug reports)
- Spread the Word (community outreach)
- Technical Contributions (firmware, integration)
- Donate/Support (optional, not emphasized)

**Success Metric**: User identifies how they can contribute

---

## 4. Cross-Cutting Features

### 4.1 Global Components (All Pages)

**Header**:
- Logo (links to home)
- Primary navigation (About, Get Started, Network, Guides, Resources, Community)
- Mobile hamburger menu (< 768px)
- Theme toggle (sun/moon icons)
- Optional: Network status indicator (nodes online)

**Footer**:
- Navigation columns (structured by section)
- Contact methods (email, chat, GitHub)
- kansascitymesh.net coordination note (prominent)
- Theme toggle (duplicate for convenience)
- Last updated timestamp
- Legal/compliance notices (minimal)

**Coordination Banner** (Homepage + About/Coordination):
- Warm amber background (#F59E42)
- Prominent messaging about seeking kansascitymesh.net operator
- CTA to Contact & Coordination page

### 4.2 Mobile Considerations

**Breakpoints**:
- Mobile: < 768px (single column, stacked navigation)
- Tablet: 768px - 1024px (2-column layouts)
- Desktop: > 1024px (full multi-column layouts)

**Mobile-Specific Optimizations**:
- Hamburger menu navigation
- Sticky header with minimal height
- Touch-friendly buttons (min 44px height)
- Simplified tables (responsive/scrollable)
- Click-to-call phone numbers
- Optimized image sizes
- Progressive image loading

### 4.3 Accessibility

**Requirements**:
- WCAG 2.1 AA compliance minimum
- Semantic HTML5 structure
- ARIA labels where needed
- Keyboard navigation support
- Color contrast ratios (4.5:1 minimum text)
- Alt text for all images
- Skip to main content link
- Focus indicators visible

---

## 5. User Flows

### 5.1 Primary Flow: Complete Beginner to Operational Node

```
Homepage
  ↓ "Join the Network" CTA
Join the Network (/get-started/join)
  ↓ Read prerequisites, choose hardware
Hardware Selection (/get-started/hardware)
  ↓ Purchase device (external)
[Wait 1-3 weeks for delivery]
  ↓ Hardware arrives
Join the Network (/get-started/join) - Step 2-4
  ↓ Install app, configure, verify
Community Contact (/community/contact)
  ↓ Join coordination chat
  ✓ Operational node, connected to community
```

### 5.2 Secondary Flow: Repeater Owner to Infrastructure Host

```
Homepage
  ↓ "For Repeater Owners" quick link
For Repeater Owners Guide (/guides/repeater-owners)
  ↓ Reads value proposition
West Side Infrastructure (/guides/west-side)
  ↓ Identifies if site matches needs
Community Contact (/community/contact)
  ↓ Reaches out to coordinate
[Offline: Site evaluation, installation]
  ✓ Router node deployed at repeater site
```

### 5.3 Tertiary Flow: Existing Community Coordination

```
Homepage
  ↓ Sees Community Coordination Banner
Community & Coordination (/about/coordination)
  ↓ Reads coordination scenarios
  ↓ Identifies scenario match
Community Contact (/community/contact)
  ↓ Reaches out via preferred method
[Offline: Coordination conversation]
  ✓ Community connection established
```

### 5.4 Supporting Flow: HOA Homeowner to Stealth Deployment

```
Homepage
  ↓ "Join the Network" CTA
Join the Network (/get-started/join)
  ↓ Interested but concerned about HOA
Residential Solar Setups (/guides/solar-residential)
  ↓ Reviews stealth options
  ↓ Selects flagpole integration approach
Hardware Selection (/get-started/hardware)
  ↓ Orders appropriate hardware
[Purchase and installation]
  ↓ Needs help optimizing
Troubleshooting (/resources/troubleshooting)
  ✓ Stealth node operational
```

---

## 6. Information Architecture Principles

### 6.1 Audience Segmentation

Primary audiences have dedicated entry points:
- Beginners → Get Started section
- Ham operators → Deployment Guides (Ham)
- Repeater owners → Deployment Guides (Repeater)
- HOA homeowners → Deployment Guides (Residential Solar)
- Existing community → About (Coordination)

### 6.2 Progressive Disclosure

Information depth increases with user commitment:
- Homepage: Overview, orientation
- Section landing pages: Segmented options
- Specific pages: Detailed content
- Expandable sections: Advanced/optional details

### 6.3 Multiple Pathways

Users can reach goals via different paths:
- Quick Start (experienced users)
- Join the Network (detailed walkthrough)
- Deployment Guides (audience-specific approaches)

### 6.4 Consistency

Repeated patterns across pages:
- Hero section (headline, subheadline, intro)
- Sections with clear headings
- CTAs at logical transition points
- Related links footer on each page

---

## 7. Content Hierarchy Rules

### 7.1 Page Structure Template

```
1. Hero Section
   - H1 headline
   - Subheadline (larger text, not H2)
   - 1-2 paragraph introduction
   - Primary CTA (if applicable)

2. Body Sections
   - H2 section headings
   - H3 subsections
   - Paragraphs (2-4 sentences typically)
   - Lists (when appropriate, not overused)
   - CTAs at section transitions

3. Related Resources (footer area)
   - 3-4 relevant page links
   - Brief descriptions

4. Page-specific CTAs
   - 1-2 primary actions
   - Highly visible, action-oriented
```

### 7.2 Content Density

**Scannable for Mobile**:
- Short paragraphs (2-4 sentences)
- Frequent headings (every 1-2 screens)
- Lists for sequential/parallel information
- Bold for emphasis (sparingly)
- Callout boxes for important notes

**Narrative-Driven**:
- Prefer narrative paragraphs over bullet lists when explaining concepts
- Use bullets for checklists, specifications, quick reference
- Tell stories in Success Stories section
- Provide context and reasoning, not just facts

---

## 8. Navigation Design

### 8.1 Primary Navigation

**Desktop** (horizontal menu bar):
```
[Logo] About | Get Started | Network | Guides | Resources | Community [Theme]
```

**Mobile** (hamburger menu):
```
☰  [Logo]  [Theme]

[Tap ☰]
├─ About
│  ├─ Community & Coordination
│  └─ Why Meshtastic?
├─ Get Started
│  ├─ Join the Network
│  ├─ Quick Start Guide
│  └─ Hardware Selection
[... etc]
```

### 8.2 Breadcrumbs

Show on all pages except homepage:
```
Home > Get Started > Join the Network
```

### 8.3 Related Pages Links

Each page footer includes 3-4 contextually related page links:

Example for "Join the Network":
- Need Help? → Troubleshooting
- Want to Contribute More? → Deployment Guides
- Understand the Network? → Network Architecture

### 8.4 Call-to-Action Hierarchy

**Primary CTAs** (highest visibility):
- Homepage: "Join the Network"
- About/Coordination: "Contact Us"
- Network/Coverage: "See How to Join"
- Guides: "Get Started"

**Secondary CTAs** (supporting actions):
- "Learn More"
- "View Details"
- "See Examples"

---

## 9. SEO-Driven Architecture

### 9.1 URL Structure

Clean, hierarchical, keyword-rich:
```
kansascitymesh.live/
kansascitymesh.live/about/coordination
kansascitymesh.live/get-started/join
kansascitymesh.live/network/coverage
kansascitymesh.live/guides/ham-operators
kansascitymesh.live/resources/faqs
```

### 9.2 Internal Linking Strategy

**Hub Pages** (high authority, many inbound links):
- Homepage (linked from all pages via logo)
- Join the Network (primary conversion, linked frequently)
- Community & Coordination (unique value, linked prominently)

**Spoke Pages** (specialized content):
- Link back to hub pages
- Link to related spoke pages
- Create topic clusters (e.g., all deployment guides link to each other)

### 9.3 Content Clusters

**Cluster 1: Getting Started**
- Hub: Join the Network
- Spokes: Quick Start, Hardware Selection, Troubleshooting

**Cluster 2: Deployment Guides**
- Hub: Deployment Guides landing page (if created)
- Spokes: Ham Operators, Repeater Owners, Residential Solar, Router/Gateway, West Side

**Cluster 3: Network Information**
- Hub: Network Architecture
- Spokes: Coverage Map, Current Status, Growth Strategy

---

## 10. Technical Considerations

### 10.1 Page Load Performance

**Target Metrics**:
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

**Strategies**:
- Static site generation (pre-rendered HTML)
- Lazy loading for images below fold
- Critical CSS inline, deferred non-critical
- Minimal JavaScript (progressive enhancement)
- CDN delivery

### 10.2 Interactive Components

**Coverage Map** (/network/coverage):
- Client-side JavaScript required
- Load map library lazily
- Fallback: Static image with description

**Live Dashboard** (/network/status, homepage stats):
- Fetch from API or static JSON
- Update interval: 5 minutes (not real-time)
- Fallback: Last known values with timestamp

**Theme Toggle**:
- Pure CSS implementation preferred
- localStorage for persistence
- Defaults to system preference (prefers-color-scheme)

### 10.3 Content Management

**Static Content** (most pages):
- Markdown files in repository
- Version controlled
- Build-time rendering

**Dynamic Content** (live data):
- Node statistics (count, coverage, messages)
- Network status (router operational status)
- Recent updates timeline
- Coordination status panel

**Update Frequency**:
- Static content: On-demand (git push triggers rebuild)
- Dynamic data: 5-minute updates (API calls or static JSON regeneration)

---

## 11. Implementation Phases

### Phase 1: Foundation (MVP)
**Priority**: Get coordination mechanism online
**Pages**:
- Homepage (simplified)
- Community & Coordination
- Contact & Coordination
- Why Meshtastic?
- Join the Network (basic version)

**Goal**: Enable kansascitymesh.net operator to find and contact us

### Phase 2: Core Content
**Priority**: Enable new users to join
**Pages**:
- Quick Start Guide
- Hardware Selection
- Coverage Map (basic)
- Troubleshooting (basic)
- FAQs

**Goal**: Complete user can purchase hardware and get operational

### Phase 3: Specialized Guides
**Priority**: Recruit infrastructure hosts
**Pages**:
- For Ham Radio Operators
- For Repeater Owners
- Residential Solar Setups
- West Side Infrastructure

**Goal**: Deploy Router 2 (west side)

### Phase 4: Technical Depth
**Priority**: Support advanced users
**Pages**:
- Network Architecture
- Current Status (full dashboard)
- Growth Strategy
- Router vs Gateway Guide
- Equipment Guide (advanced)

**Goal**: Technical users contribute meaningfully

### Phase 5: Community Features
**Priority**: Build community engagement
**Pages**:
- Success Stories
- How to Contribute
- Frequency Reference
- Enhanced Coverage Map (interactive)

**Goal**: Active, self-sustaining community

---

## 12. Success Metrics by Page Type

### Landing Pages (Homepage, Section Landing Pages)
- Bounce rate < 60%
- Average time on page > 45 seconds
- Click-through to deeper pages > 40%

### Educational Content (Why Meshtastic, Guides)
- Average time on page > 2 minutes
- Scroll depth > 70%
- Return visitor rate > 20%

### Conversion Pages (Join the Network, Contact)
- Goal completion rate (tracked via analytics events)
- Form submissions or CTA clicks
- Exit rate to external sites (hardware purchases) > 15%

### Reference Pages (FAQs, Troubleshooting, Frequency Reference)
- Search landing rate > 30% (finding via search)
- Bounce rate > 70% acceptable (quick reference)
- Average time on page 1-3 minutes

---

## 13. Maintenance & Evolution

### Content Review Schedule
- Homepage: Monthly review
- Get Started section: Quarterly review (hardware changes)
- Deployment Guides: Semi-annual review
- Resources: Annual review
- Community section: Monthly updates (success stories)

### Feedback Integration
- User testing: Before Phase 1 launch, after Phase 2
- Analytics review: Monthly
- Community feedback: Ongoing via contact channels
- Iteration: Continuous improvement based on data

### Archive Strategy
- Outdated hardware recommendations: Move to "Legacy" subsection
- Deprecated guides: Mark as outdated with migration path
- Completed phases (Growth Strategy): Update to reflect completion

---

## 14. Appendix: Page Priority Matrix

| Page | Implementation Phase | Strategic Priority | User Impact |
|------|---------------------|-------------------|-------------|
| Homepage | 1 | Critical | High |
| Community & Coordination | 1 | Critical | High |
| Contact & Coordination | 1 | Critical | High |
| Join the Network | 1 | Critical | High |
| Why Meshtastic? | 1 | High | Medium |
| Quick Start Guide | 2 | High | Medium |
| Hardware Selection | 2 | High | High |
| Coverage Map | 2 | High | Medium |
| For Repeater Owners | 3 | Critical | High |
| West Side Infrastructure | 3 | Critical | High |
| Residential Solar Setups | 3 | High | Medium |
| For Ham Radio Operators | 3 | High | Medium |
| Troubleshooting | 2 | Medium | High |
| FAQs | 2 | Medium | Medium |
| Network Architecture | 4 | Medium | Low |
| Current Status | 4 | Medium | Medium |
| Growth Strategy | 4 | Medium | Low |
| Router vs Gateway | 4 | Medium | Medium |
| Equipment Guide | 4 | Low | Low |
| Success Stories | 5 | Medium | Medium |
| How to Contribute | 5 | Low | Low |
| Frequency Reference | 5 | Low | Low |

---

**Document Status**: Complete
**Next Steps**: Review with stakeholders, begin technical requirements document
