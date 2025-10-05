# Project Overview
## Kansas City Meshtastic Network Website

**Version**: 2.0
**Date**: 2025-10-04
**Status**: Planning Complete - Ready for Development

---

## 1. Executive Summary

The Kansas City Meshtastic Network website is a comprehensive community resource hub and coordination mechanism for building a metro-wide mesh networking infrastructure using Meshtastic/LoRa technology. The site serves dual purposes: educating and onboarding new participants, AND connecting with the existing kansascitymesh.net operator to coordinate unified community efforts.

**Primary Goals**:
1. **Community Coordination**: Establish contact with existing kansascitymesh.net operator
2. **Participant Recruitment**: Convert beginners to operational nodes
3. **Infrastructure Recruitment**: Deploy strategic backbone routers (especially Router 2 - West Side)
4. **Education**: Demystify mesh networking with anti-dogma, prosumer-focused guidance
5. **Transparency**: Build trust through honest expectations and coordination status

---

## 2. Project Philosophy

### Anti-Dogma Approach

Refute common mesh networking myths that prevent deployment:

- ❌ "Need 40-foot tower" → ✅ 15 feet is functional
- ❌ "Indoor doesn't work" → ✅ Test your building
- ❌ "Antenna must be vertical" → ✅ Horizontal works with trade-offs
- ❌ "Need huge solar systems" → ✅ 10W adequate
- ❌ "HOAs make it impossible" → ✅ Stealth integration works
- ❌ "Perfect or nothing" → ✅ Deployed imperfect beats theoretical perfect

### Prosumer Scope (Strict Boundaries)

- Equipment: $25-200 range (consumer-grade)
- Installations: DIY backyard-achievable
- Timeframes: Weekend projects
- Performance: "Good enough for mission"
- Tone: Enthusiast community, not telecommunications company

### Strategic Network Design

**Four-Router Backbone**:
- Router 1: East Anchor (✓ Operational) - MQTT gateway
- Router 2: West Side (◆ SEEKING HOST) - Critical gap
- Router 3: North Metro (○ Planned) - River crossing
- Router 4: South Metro (○ Planned) - Cardinal coverage

Client nodes fill density around backbone infrastructure.

---

## 3. Planning Documents

| Document | Purpose |
|----------|---------|
| **00-PROJECT-OVERVIEW.md** | This document - high-level summary |
| **01-SITE-ARCHITECTURE.md** | Information architecture, navigation, page hierarchy |
| **02-CONTENT-STRATEGY.md** | Tone, voice, messaging, editorial guidelines |
| **03-TECHNICAL-REQUIREMENTS.md** | Technology stack, performance, implementation specs |
| **04-DESIGN-SYSTEM.md** | Color, typography, components, patterns |
| **05-SEO-ANALYTICS-PLAN.md** | Keyword strategy, optimization, analytics |
| **07-OCI-NGINX-DEPLOYMENT.md** | Hosting, deployment, operations on OCI |

Plus:
- **README.md** - Original comprehensive content plan (25,000+ words)
- **CLAUDE.md** - Context for future Claude Code sessions
- **jeremy-fuksa-style-guide.md** - Writing voice reference

---

## 4. Target Audiences

**1. Complete Beginners** (largest group)
- No radio experience needed
- Path: Why Meshtastic? → Join the Network

**2. Existing kansascitymesh.net Operator** (critical priority)
- Path: Homepage banner → Community & Coordination

**3. Repeater Owners** (high-value infrastructure)
- Have tower sites, power, access
- Path: For Repeater Owners guide → West Side campaign

**4. Ham Radio Operators** (technical community)
- Licensed, RF knowledge
- Path: For Ham Operators guide

**5. HOA-Restricted Homeowners** (underserved niche)
- Path: Residential Solar Setups guide

---

## 5. Site Structure

```
HOME
  ├── ABOUT
  │   ├── Community & Coordination
  │   └── Why Meshtastic?
  ├── GET STARTED
  │   ├── Join the Network
  │   ├── Quick Start Guide
  │   └── Hardware Selection
  ├── NETWORK INFO
  │   ├── Coverage Map
  │   ├── Network Architecture
  │   ├── Current Status
  │   └── Growth Strategy
  ├── DEPLOYMENT GUIDES
  │   ├── For Ham Radio Operators
  │   ├── For Repeater Owners
  │   ├── Residential Solar Setups
  │   ├── Router vs Gateway Guide
  │   └── West Side Infrastructure
  ├── RESOURCES
  │   ├── Frequency Reference
  │   ├── Equipment Guide
  │   ├── Troubleshooting
  │   └── FAQs
  └── COMMUNITY
      ├── Contact & Coordination
      ├── Success Stories
      └── How to Contribute
```

### Implementation Priorities

**Phase 1 (MVP - Weeks 1-2)**:
1. Homepage
2. Community & Coordination
3. Contact & Coordination
4. Why Meshtastic?
5. Join the Network (basic version)

**Phase 2 (Core Content - Weeks 3-4)**:
6. Quick Start Guide
7. Hardware Selection
8. Coverage Map (basic)
9. Troubleshooting
10. FAQs

**Phase 3 (Infrastructure Recruitment - Weeks 5-8)**:
11. For Ham Radio Operators
12. For Repeater Owners
13. Residential Solar Setups
14. West Side Infrastructure

---

## 6. Technology Stack

**Framework**: Astro (static site generator)
**Styling**: Tailwind CSS with custom KC brand colors
**Hosting**: OCI with Nginx
**Analytics**: Plausible Analytics ($9/month)
**Map**: Leaflet.js
**Forms**: PHP handler on OCI server
**Cost**: ~$1-10/month (domain + optional analytics)

### Performance Targets

- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Lighthouse Performance > 90
- Lighthouse Accessibility 100

---

## 7. Design System

### Colors

**Primary**:
- Kansas City Red: `#E31837`
- Kansas City Blue: `#004687`
- Kansas City Sky Blue: `#5DADE2`
- Meshtastic Green: `#67C98F`

**Warm Accents**:
- Sunset Amber: `#F59E42`
- Kansas Clay: `#D4825C`
- Prairie Gold: `#E8B547`

### Themes

**Light Mode**:
- Background: `#FDFBF7` (warm off-white)
- Cards: `#F5EFE6` (cream)
- Text: `#2B2420` (warm dark brown)

**Dark Mode**:
- Background: `#1A1512` (warm dark brown)
- Cards: `#2B2420` (warm charcoal)
- Text: `#F4E8D8` (warm off-white)

### Typography

**System Font Stack**:
```
-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
"Helvetica Neue", Arial, sans-serif
```

**Type Scale**: 1.25 ratio, responsive (16px base)

---

## 8. Content Strategy

### Voice

- **Enthusiast Community**: Passionate but not evangelical
- **Knowledgeable but Accessible**: Explain without condescension
- **Honest about Limitations**: Not overpromising
- **Inclusive**: All skill levels welcome
- **Anti-Perfectionist**: Deployed imperfect > theoretical perfect

### Narrative Approach

- Prefer narrative paragraphs over bullets (except for checklists/specs)
- Tell stories in success stories
- Provide context and reasoning
- Hero section + body sections + related resources

---

## 9. SEO Strategy

### Primary Keywords

- Kansas City mesh network
- Meshtastic Kansas City
- what is Meshtastic
- join mesh network
- best Meshtastic device
- HOA friendly mesh antenna (low competition opportunity)
- stealth mesh deployment (very low competition opportunity)

### Success Metrics (6 Months)

**Traffic**:
- Organic: 500-1000 sessions/month
- Direct: 200-300 sessions/month
- Referral: 100-200 sessions/month

**Rankings**:
- Top 3: "Kansas City mesh network"
- Top 5: "Meshtastic Kansas City"
- Top 10: "join mesh network", "Meshtastic setup"

**Conversions**:
- Contact forms: 10-20/month
- Community chat joins: 20-30/month
- Hardware purchase clicks: 50-100/month

---

## 10. Deployment (OCI/Nginx)

**Platform**: Oracle Cloud Infrastructure
**OS**: Ubuntu 22.04 LTS
**Web Server**: Nginx
**SSL**: Let's Encrypt via Certbot
**Domain**: kansascitymesh.live
**Email**: Cloudflare Email Routing (contact@kansascitymesh.live)

**Deployment Pipeline**:
- Git Repository: GitHub
- CI/CD: GitHub Actions → SSH to OCI → Run deploy script
- Deploy Script: Git pull, npm build, rsync to web root, reload Nginx

See `07-OCI-NGINX-DEPLOYMENT.md` for complete setup instructions.

---

## 11. Implementation Timeline

### Phase 1: Foundation (Week 1-2)
- Set up Astro project
- Configure Tailwind CSS
- Create base layout
- Implement theme toggle
- Build MVP pages
- Deploy to OCI

### Phase 2: Core Content (Week 3-4)
- Complete Get Started pages
- Coverage Map (basic)
- Troubleshooting, FAQs
- Set up analytics

### Phase 3: Specialized Guides (Week 5-8)
- Deployment guides (Ham, Repeater, Solar)
- West Side Infrastructure campaign
- SEO optimization

### Phase 4: Enhancement (Week 9-12)
- Interactive map (Leaflet)
- Automated network stats
- Search functionality
- Final optimization

---

## 12. Success Criteria

### Technical
- ✅ Site live at kansascitymesh.live with HTTPS
- ✅ Lighthouse scores meet targets
- ✅ Mobile-friendly
- ✅ All pages indexed
- ✅ Forms working
- ✅ Analytics tracking

### Content
- ✅ All Phase 1-3 pages published
- ✅ Content proofread
- ✅ Images optimized
- ✅ SEO meta tags complete

### Community (6 Months)
- ✅ Contact with kansascitymesh.net operator (or documented attempts)
- ✅ 10+ community chat members
- ✅ 5+ operational client nodes
- ✅ Router 2 (West Side) host identified
- ✅ First success story published

### Traffic (6 Months)
- ✅ 500-1000 organic sessions/month
- ✅ Top 3 for "Kansas City mesh network"
- ✅ 10-20 contact form submissions/month
- ✅ Average session duration > 2 minutes

---

## 13. Next Steps

### Immediate Actions

1. **Repository Setup**:
   - [ ] Create GitHub repository
   - [ ] Initialize Astro project
   - [ ] Configure Tailwind CSS
   - [ ] Create initial commit

2. **OCI/Nginx Setup** (see deployment doc):
   - [ ] Install Node.js 18+
   - [ ] Configure Nginx server block
   - [ ] Set up SSL with Let's Encrypt
   - [ ] Create deployment script

3. **Begin Development** (Phase 1):
   - [ ] Create base layout components
   - [ ] Implement theme toggle
   - [ ] Build homepage
   - [ ] Build Community & Coordination page
   - [ ] Build Contact page with form
   - [ ] Deploy MVP to production

---

## 14. Document Guide

**For Developers**:
1. Start with `03-TECHNICAL-REQUIREMENTS.md` (tech stack)
2. Reference `04-DESIGN-SYSTEM.md` (colors, components)
3. Follow `07-OCI-NGINX-DEPLOYMENT.md` (deployment)

**For Content Writers**:
1. Start with `02-CONTENT-STRATEGY.md` (tone, voice)
2. Reference `jeremy-fuksa-style-guide.md` (writing style)
3. Use README.md as content source
4. Follow prosumer scope strictly

**For Project Managers**:
- Implementation phases: Weeks 1-12
- Success criteria defined
- Risk mitigation in README.md

---

**Document Status**: Complete - Implementation Ready
**Planning Phase**: ✅ Complete (2025-10-04)
**Next Phase**: Phase 1 Implementation (Foundation)
