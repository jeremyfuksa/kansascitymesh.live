# Technical Requirements Document

## Kansas City Meshtastic Network Website

**Version**: 2.0
**Date**: 2025-10-04
**Status**: Implementation Ready

> **Implementation note:** the production build now relies on Bootstrap 5 rather than Tailwind CSS. Tailwind references below capture earlier planning work and will be refreshed in a future revision.

---

## 1. Executive Summary

This document defines the technical requirements, technology stack, performance criteria, and implementation specifications for the Kansas City Meshtastic Network website. The site uses static generation for performance, security, and low operational cost, hosted on OCI infrastructure with Nginx.

---

## 2. Technology Stack

### 2.1 Static Site Generator

**Astro**

- Ships zero JavaScript by default, adds only what's needed
- Excellent markdown/MDX support for content-heavy site
- Built-in SSG, meta tags, sitemaps
- Modern tooling, fast builds

### 2.2 CSS Framework

**Tailwind CSS**

Configuration:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "kc-red": "#E31837",
        "kc-blue": "#004687",
        "kc-sky": "#5DADE2",
        "mesh-green": "#67C98F",
        "sunset-amber": "#F59E42",
        "kc-clay": "#D4825C",
        "prairie-gold": "#E8B547",
      },
    },
  },
};
```

### 2.3 Interactive Map

**Leaflet.js**

- Open source, no API keys required
- Mobile-touch support built-in
- Custom markers, overlays, popups
- Lightweight (~40KB)

### 2.4 Data Management

**Static JSON for Network Stats**

Option: GitHub Actions updates JSON every 15 minutes

- Fetches data from source (MQTT, database)
- Generates `network-stats.json`
- Commits to repo, triggers rebuild
- Fully static, automated, no runtime backend

### 2.5 Form Handling

**PHP Form Handler** (on OCI server)

Simple contact form handler with email delivery and validation. See deployment documentation for implementation details.

### 2.6 Analytics

**Plausible Analytics**

- Privacy-friendly (GDPR compliant, no cookies)
- Lightweight script (~1KB)
- Cost: $9/month

**Key Metrics**:

- Page views, sessions, sources
- Conversion events (form submissions, hardware clicks, chat joins)
- Time on page, bounce rate
- Device/browser distribution

---

## 3. Performance Requirements

### 3.1 Core Web Vitals Targets

- **LCP (Largest Contentful Paint)**: < 2.5 seconds
- **FID (First Input Delay)**: < 100 milliseconds
- **CLS (Cumulative Layout Shift)**: < 0.1
- **FCP (First Contentful Paint)**: < 1.5 seconds
- **TTI (Time to Interactive)**: < 3.5 seconds

### 3.2 Performance Budget

**Page Weight Limits**:

- HTML: < 50KB (gzipped)
- CSS: < 30KB total (after purging)
- JavaScript: < 100KB total
- Images (per page): < 500KB total (optimized)
- Total page weight: < 1MB initial load

**Resource Limits**:

- HTTP requests: < 50 per page
- Web fonts: Maximum 2 font families

### 3.3 Image Optimization

**Formats**:

- Primary: WebP
- Fallback: JPEG/PNG

**Responsive Images**:

- Multiple sizes: 400w, 800w, 1200w, 1600w
- `srcset` and `sizes` attributes

**Lazy Loading**:

- Below-fold images: `loading="lazy"`
- Above-fold: Eager load

**Dimensions**:

- Always specify width/height (prevent CLS)

### 3.4 Font Strategy

**System Font Stack** (zero load time):

```css
font-family:
  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
  Arial, sans-serif;
```

---

## 4. Accessibility Requirements

### 4.1 WCAG 2.1 Level AA Compliance

**Perceivable**:

- Text alternatives (alt text) for all images
- Color contrast minimum 4.5:1 for normal text
- Content doesn't rely solely on color
- Text can be resized 200% without loss of functionality

**Operable**:

- All functionality available via keyboard
- Skip to main content link
- Page titles descriptive
- Focus order logical
- Link purpose clear
- Focus visible

**Understandable**:

- Language declared (`lang="en"`)
- Navigation consistent across pages
- Form inputs have labels
- Error messages helpful

**Robust**:

- Valid HTML
- Name, role, value available for UI components

### 4.2 Semantic HTML

```html
<header>
  <nav aria-label="Primary">...</nav>
</header>

<main id="main-content">
  <article>
    <h1>Page Title</h1>
    <section>
      <h2>Section Title</h2>
    </section>
  </article>
</main>

<footer>
  <nav aria-label="Footer">...</nav>
</footer>
```

### 4.3 Keyboard Navigation

- Tab order logical
- All interactive elements focusable
- Enter/Space activate buttons
- Skip to main content link
- Focus indicators visible

```css
:focus-visible {
  outline: 2px solid var(--kc-blue);
  outline-offset: 2px;
}
```

---

## 5. Responsive Design Requirements

### 5.1 Breakpoints

```css
/* Mobile: 0-767px (default styles) */

/* Tablet: 768px - 1023px */
@media (min-width: 768px) { ... }

/* Desktop: 1024px+ */
@media (min-width: 1024px) { ... }
```

### 5.2 Mobile Requirements

**Touch Targets**:

- Minimum 44×44px for all interactive elements
- Adequate spacing between targets (8px minimum)

**Navigation**:

- Hamburger menu < 768px
- Full horizontal menu ≥ 768px

**Typography**:

- Minimum 16px body text (prevents zoom on iOS)
- Line height 1.5-1.6

**Forms**:

- Full-width inputs on mobile
- Appropriate input types (`type="email"`, `type="tel"`)
- Submit button fixed at bottom (if form long)

---

## 6. SEO Technical Requirements

### 6.1 Meta Tags (All Pages)

```html
<title>Page Title - Kansas City Meshtastic Network</title>
<meta name="description" content="150-160 character description" />
<meta name="viewport" content="width=device-width, initial-scale=1" />

<!-- Open Graph -->
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Description" />
<meta property="og:image" content="/images/og-image.jpg" />
<meta property="og:url" content="https://kansascitymesh.live/page" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Page Title" />
<meta name="twitter:description" content="Description" />
<meta name="twitter:image" content="/images/twitter-image.jpg" />
```

### 6.2 Structured Data

**Organization**:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Kansas City Meshtastic Network",
  "url": "https://kansascitymesh.live",
  "logo": "https://kansascitymesh.live/logo.png"
}
```

**HowTo** (for guides):

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Join the Kansas City Mesh Network",
  "step": [...]
}
```

**FAQPage**:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [...]
}
```

### 6.3 Sitemap and Robots

**Sitemap.xml** (auto-generated):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kansascitymesh.live/</loc>
    <lastmod>2025-10-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**Robots.txt**:

```
User-agent: *
Allow: /

Sitemap: https://kansascitymesh.live/sitemap.xml
```

---

## 7. Security Requirements

### 7.1 HTTPS

- All traffic over HTTPS
- SSL via Let's Encrypt (configured on OCI/Nginx)
- HTTP redirects to HTTPS automatically

### 7.2 Security Headers (Nginx)

```nginx
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

### 7.3 Form Security

- Server-side validation (PHP)
- Honeypot field (bot detection)
- Input sanitization (prevent XSS)
- CSRF protection (if session-based)

---

## 8. Browser Support

**Modern Browsers** (full support):

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile Safari (iOS 12+)
- Mobile Chrome (Android 8+)

**Progressive Enhancement**:

- Core content accessible without JavaScript
- JavaScript enhances experience (map, live stats)
- Graceful degradation for older browsers

---

## 9. Content Management

### 9.1 MDX Structure

**Frontmatter**:

```yaml
---
title: "Join the Network"
description: "Complete guide to getting started"
date: 2025-10-04
updated: 2025-10-04
---
```

**Directory Structure**:

```
/content
  /pages
    /about
    /get-started
    /guides
  /blog (future)

MDX entries may import shared UI primitives (cards, CTA blocks, figures) directly at the top of the file. Keep presentation concerns inside components and reserve MDX for structured copy and component composition.
```

### 9.2 Image Management

**Directory Structure**:

```
/public
  /images
    /homepage
    /hardware
    /guides
    /icons
```

**Naming Convention**:

- Descriptive: `heltec-v3-antenna.jpg`
- Resolution indicator: `@2x` for retina
- Format: `.webp` with `.jpg` fallback

### 9.3 Dynamic Data

**Network Stats JSON** (`/public/api/network-stats.json`):

```json
{
  "lastUpdated": "2025-10-04T14:30:00Z",
  "totalNodes": 12,
  "coverageAreaSqMiles": 45,
  "messages24h": 287,
  "routers": [
    {
      "id": "router1",
      "name": "Router 1 - East Anchor",
      "status": "seeking-host",
      "uptime": 0.0
    }
  ]
}
```

---

## 10. Hosting Infrastructure

### 10.1 Platform

**Oracle Cloud Infrastructure (OCI)**

- OS: Ubuntu 22.04 LTS
- Web Server: Nginx
- Instance: VM.Standard.E2.1.Micro (OCI Free Tier)

See `07-OCI-NGINX-DEPLOYMENT.md` for complete deployment guide.

### 10.2 Domain

**Domain**: kansascitymesh.live
**DNS**: Points to OCI public IP
**SSL**: Let's Encrypt via Certbot
**Email**: Cloudflare Email Routing (contact@kansascitymesh.live)

### 10.3 Deployment Pipeline

**Git Repository**: GitHub
**Deployment**: Git-based with automated build script
**CI/CD**: GitHub Actions SSH to OCI, runs deploy script

See deployment documentation for details.

---

## 11. Development Workflow

### 11.1 Local Development

**Requirements**:

- Node.js 18+ (LTS)
- npm or yarn
- Git

**Setup**:

```bash
git clone https://github.com/kc-mesh/website.git
cd website
npm install
npm run dev
```

**Dev Server**: `localhost:4321` (Astro default)

### 11.2 Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### 11.3 Code Quality

**ESLint** (JavaScript linting)
**Prettier** (code formatting)

Pre-commit hooks ensure code quality before commits.

---

## 12. Third-Party Integrations

### 12.1 Plausible Analytics

```html
<script
  defer
  data-domain="kansascitymesh.live"
  src="https://plausible.io/js/script.js"
></script>
```

**Custom Events**:

```javascript
plausible("HardwarePurchase", { props: { device: "Heltec V3" } });
plausible("ContactForm");
plausible("JoinChat");
```

### 12.2 Leaflet Map

Load conditionally on Coverage Map page:

```html
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<div id="map" style="height: 600px;"></div>

<script>
  const map = L.map("map").setView([39.0997, -94.5786], 10);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  // Add markers from /api/nodes.geojson
</script>
```

### 12.3 Google Tag Manager

Load Google Tag Manager container `GTM-NV5FCM83` globally to coordinate lightweight analytics tags.

- Inject the standard GTM loader script inline in `<head>` of the root layout so it executes before other scripts.
- Include the companion `<noscript>` iframe immediately after `<body>` to support users without JavaScript.
- Document any additional tags (e.g., Plausible events) in the privacy copy and avoid adding scripts that set cookies unless explicitly required.

---

## 13. Implementation Phases

### Phase 1: Foundation (Week 1-2)

- Set up Astro project
- Configure Tailwind CSS
- Create base layout
- Implement theme toggle
- Deploy to OCI

### Phase 2: Core Content (Week 3-4)

- All Get Started pages
- Coverage Map (basic)
- Troubleshooting, FAQs
- Set up analytics

### Phase 3: Specialized Guides (Week 5-8)

- Deployment guides
- West Side Infrastructure
- SEO optimization

### Phase 4: Enhancement (Week 9-12)

- Interactive map (Leaflet)
- Automated network stats
- Search functionality
- Final optimization

---

## 14. Testing Requirements

### 14.1 Pre-Launch

- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility 100
- [ ] Lighthouse Best Practices > 90
- [ ] Lighthouse SEO 100
- [ ] Core Web Vitals green
- [ ] Mobile-friendly test passed
- [ ] All links work
- [ ] Forms submit correctly
- [ ] SSL configured correctly
- [ ] Analytics tracking

---

**Document Status**: Complete - Implementation Ready
**Next Phase**: Begin Phase 1 development
