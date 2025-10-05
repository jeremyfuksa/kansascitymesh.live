# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Important**: All planning is complete. Decisions have been made. Implementation phase has begun. Do not suggest alternatives to established decisions.

## Project Overview

Kansas City Meshtastic Network website - **one person's mesh infrastructure project** inviting others to join and help build community mesh networking in KC. This is NOT an established organization or club. It's one person (Jeremy) who deployed a router, documented the process, and is building this site to help others participate.

**Current Status**: Active development. Site scaffold exists. Content being populated with personal, conversational voice (see docs/06-CONTENT-VOICE-GUIDELINES.md).

**Critical Voice Direction**: First-person narrative. "I'm building..." not "The network provides...". Honest about learning curve. Welcoming to everyday people. Combat perfectionism that prevents deployment.

## Core Project Philosophy

**Anti-Dogma Approach**: Combat mesh networking perfectionism that prevents deployment:
- Refute "must be perfect or don't do it" mentality
- Emphasize "deployed imperfect beats theoretical perfect"
- Provide practical prosumer solutions ($25-200 hardware range)
- Focus on hobbyist-achievable deployments (weekend projects, not professional-grade)

**Prosumer/Hobbyist Scope Throughout**:
- Equipment: $25-200 range (consumer-grade)
- Installations: DIY backyard-achievable
- Performance: "Good enough for mission" not commercial-grade
- Tone: Enthusiast community, not telecommunications company

**Critical Anti-Dogma Content to Incorporate**:
- Elevation: 15 feet functional vs "need 40-foot tower" dogma
- Indoor deployment: "Test your building" vs "indoor doesn't work"
- Antenna polarization: Horizontal works with trade-offs vs "must be vertical"
- Solar sizing: 10W adequate vs fear-mongering 50W systems
- HOA restrictions: Stealth integration possible vs "HOAs make it impossible"

## Design System

**Color Palette** (warm-balanced to counter blue/green dominance):

Primary:
- Kansas City Red: #E31837 (primary CTAs, alerts)
- Kansas City Blue: #004687 (secondary elements, links)
- Kansas City Sky Blue: #5DADE2 (accents, info callouts)
- Meshtastic Green: #67C98F (success states, network status)

Warm Accents:
- Sunset Amber: #F59E42 (warm highlights, secondary CTAs)
- Kansas Clay: #D4825C (tertiary accents, borders)
- Prairie Gold: #E8B547 (attention elements, badges)

Dark Mode:
- Background: #1A1512 (warm dark brown)
- Cards: #2B2420 (warm charcoal)
- Text: #F4E8D8 (warm off-white)

Light Mode:
- Background: #FDFBF7 (warm off-white)
- Cards: #F5EFE6 (cream/warm gray)
- Text: #2B2420 (warm dark)

**Design Principles**:
- Mobile-first responsive (field use on phones priority)
- High-end professional aesthetic with local KC identity
- Dual theme (dark/light) with warm undertones
- Narrative-driven content (not bullet-heavy)
- Clear information hierarchy for scanning

## Site Structure

```
HOME
ABOUT
  ├── Community & Coordination (coordination mechanism for kansascitymesh.net)
  └── Why Meshtastic? (educational foundation)
GET STARTED
  ├── Join the Network (primary action path)
  ├── Quick Start Guide (fast path for experienced)
  └── Hardware Selection (equipment guidance)
NETWORK INFO
  ├── Coverage Map (interactive visualization)
  ├── Network Architecture (technical explanation)
  ├── Current Status (live dashboard)
  └── Growth Strategy (vision & roadmap)
DEPLOYMENT GUIDES
  ├── For Ham Radio Operators (licensed amateurs)
  ├── For Repeater Owners (infrastructure hosts)
  ├── Residential Solar Setups (stealth/HOA-friendly)
  ├── Router vs Gateway Guide (configuration decisions)
  └── West Side Infrastructure (priority needs)
RESOURCES
  ├── Frequency Reference (business/retail frequencies)
  ├── Equipment Guide (hardware deep-dive)
  ├── Troubleshooting (problem solving)
  └── FAQs (quick answers)
COMMUNITY
  ├── Contact & Coordination (multiple contact methods)
  ├── Success Stories (deployment examples)
  └── How to Contribute (participation paths)
```

## Target Audiences

1. Complete beginners (no radio experience)
2. Ham radio operators (licensed amateurs with RF knowledge)
3. Repeater owners (infrastructure hosts with towers/elevated sites)
4. HOA-restricted homeowners (need stealth deployment solutions)
5. Emergency communications community (ARES/RACES)

## Network Architecture Context

**Four-Router Backbone Strategy**:
- Router 1: East side (operational) - anchor + MQTT gateway
- Router 2: West side (PRIORITY - seeking host) - critical gap
- Router 3: North metro (planned) - river crossing, northland coverage
- Router 4: South metro (planned) - completes cardinal coverage

Client nodes fill density around backbone infrastructure.

## Key Content Requirements

**Community Coordination Banner** (prominent on homepage):
- Welcome existing kansascitymesh.net operator
- "We want to collaborate, not compete" messaging
- Multiple contact methods prominently displayed
- Transparency panel showing coordination status/timeline

**Deployment Guides Must Include**:

Ham Operators:
- Translation to ham terminology
- Repeater site integration opportunity
- Emergency communications value prop
- Technical depth for licensed operators

Repeater Owners:
- "You already have what we need" framing
- Minimal investment ($60-120)
- Leveraging existing infrastructure
- Strategic value of repeater-sited nodes

Residential Solar:
- Flagpole integration (stealth, HOA-acceptable)
- Fence post extension (decorative element)
- Attic installation (test building attenuation)
- Birdhouse disguise (maximum stealth)
- Real costs ($100-200 complete systems)

## Content Guidelines

**Tone and Voice**:
- Welcoming and inclusive (all experience levels)
- Enthusiast/hobbyist community feel
- Professional but not corporate
- Educational without condescension
- Anti-perfectionism, pro-deployment

**Scope Discipline**:
- ALWAYS maintain prosumer/hobbyist expectations
- Equipment recommendations: $25-200 range
- Timeframes: Weekend projects, not professional deployments
- Performance: Realistic expectations, not commercial-grade promises
- Avoid feature creep into commercial/professional territory

**SEO Strategy**:
- Primary: "Kansas City mesh network", "Meshtastic Kansas City"
- Audience-specific: "Meshtastic for ham radio", "HOA-friendly mesh deployment"
- Geographic: "Johnson County Meshtastic", "west Kansas City mesh coverage"

## Development Notes (when implementation begins)

**Future Technical Stack** (to be determined):
- Static site generator recommended (fast, cheap hosting, security)
- Mobile-first framework essential
- Dark/light theme switching
- Interactive map component for coverage visualization
- Live dashboard for network stats

**Content Management**:
- README.md contains complete content specifications
- 25,000-35,000 word comprehensive site plan
- All copy provided in detail (headlines, body, CTAs)
- Reference README.md sections 4.1-4.10 for exact content

**Critical Implementation Priorities**:
1. Community Coordination page (coordination mechanism for kansascitymesh.net)
2. Join the Network page (primary conversion path)
3. Deployment guides (differentiated by audience)
4. Homepage with prominent coordination banner
