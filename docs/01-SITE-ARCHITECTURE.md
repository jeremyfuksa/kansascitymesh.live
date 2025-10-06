# Site Architecture
## Kansas City Meshtastic Network

**Version**: 2.0  
**Updated**: 2025-10-04  
**Status**: Content-driven build (live)

---

## 1. Overview
The Astro project now renders page content from Markdown files (`src/content/pages/**`) and uses a small set of content layouts to keep presentation consistent. Navigation mirrors the public site:

```
Home
About
  ├─ Community & Coordination
  └─ Why Meshtastic?
Get Started
  ├─ Join the Network
  ├─ Quick Start Checklist
  ├─ Hardware Selection
  └─ MQTT & The KC Mesh
Network
  ├─ Coverage Map (copy + forthcoming map)
  ├─ Network Architecture
  └─ Current Status
Resources
  ├─ Resource Library index
  ├─ Frequency Reference
  ├─ Troubleshooting
  └─ FAQs
Community
  ├─ Community hub index
  └─ Contact & Coordination
```

A persistent footer highlights contact email plus the Discord invite.

---

## 2. Layout System
Content/front matter drives layout selection. Each route imports the relevant layout and passes the `astro:content` entry.

| Layout | Path | Used by | Description |
| --- | --- | --- | --- |
| `BasePage.astro` | `src/layouts/content/BasePage.astro` | Home, Get Started index, Community index | Renders optional alerts, callouts, Discord CTA, card sections, and closing CTA. |
| `ArticlePage.astro` | `src/layouts/content/ArticlePage.astro` | All narrative pages (About, Network pages, Get Started guides, Resources except FAQ) | Simple prose article with optional lead copy, action buttons, Discord CTA. |
| `FaqPage.astro` | `src/layouts/content/FaqPage.astro` | `resources/faqs` | Converts Q&A front matter into accordion UI. |

Front matter reference lives in `README.md`.

---

## 3. Page Summaries & Key Messaging

### 3.1 Home (`/`)
- Lead story: personal build narrative + call for collaborators.
- Alerts/callouts: highlight geofence priority and coordination.
- Card sections: current router status + participation paths.
- Discord CTA encourages real-time coordination.

### 3.2 About
- **Community & Coordination**: outreach to kansascitymesh.net operator, scenarios for collaboration, contact emphasis.
- **Why Meshtastic?**: explains technology, KC strategy, and backbone plan.

### 3.3 Get Started
- **Index**: directs new users to join guide, quick checklist, hardware, and MQTT notes; Discord CTA for support.
- **Join the Network**: step-by-step walkthrough from hardware to validation.
- **Quick Start**: condensed checklist for experienced users.
- **Hardware Selection**: prosumer hardware breakdown, accessories, buying advice.
- **MQTT & The KC Mesh**: describes broker usage, safeguards, and activation checklist.

### 3.4 Network
- **Index**: orientation to coverage/status/architecture docs.
- **Coverage Map**: current state, router priorities, and geofence polygon.
- **Architecture**: backbone strategy, device roles, telemetry plans.
- **Status**: current router uptime, upcoming work, next milestones.

### 3.5 Resources
- **Resource Library**: entry point for factual references.
- **Frequency Reference**: ISM band settings for KC mesh.
- **Troubleshooting**: common setup mistakes and fixes.
- **FAQs**: grouped questions rendered via accordion.

### 3.6 Community
- **Index**: ways to connect, invite to Discord, contribution summary.
- **Contact & Coordination**: email, Discord, on-mesh handle, GitHub; expectation-setting for response.

---

## 4. Geofence Priority
All outreach copy references the immediate build target rectangle:
1. 39.561616° N, -93.948472° W
2. 39.561616° N, -95.148729° W
3. 38.649439° N, -95.148729° W
4. 38.649439° N, -93.948472° W

Home and Network pages call this out explicitly to keep deployment focus tight before expanding.

---

## 5. Future Enhancements
- Leaflet coverage map once data pipeline exists.
- Live status dashboard fed from MQTT logs.
- Deployment guide section (`/guides`) once content is authored.
- Additional layouts (e.g., data-rich dashboards) when interactive features launch.
