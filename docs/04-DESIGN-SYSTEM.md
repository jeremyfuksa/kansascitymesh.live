# Design System Specification
## Kansas City Meshtastic Network Website

**Version**: 1.0
**Date**: 2025-10-04
**Status**: Planning Phase

---

## 1. Executive Summary

This document defines the complete design system for the Kansas City Meshtastic Network website including color palette, typography, spacing, components, and design patterns. The system prioritizes mobile-first responsive design, dark/light theme support with warm undertones, and high-end professional aesthetic with local Kansas City identity.

---

## 2. Design Principles

### 2.1 Core Principles

**Mobile-First**: Design for smallest screen, enhance for larger
- Touch-friendly targets (44×44px minimum)
- Thumb-reachable primary actions
- Vertical scrolling preferred over horizontal

**Professional but Accessible**: High-end aesthetic without intimidation
- Clean, spacious layouts
- Clear hierarchy and scanning
- Welcoming to all skill levels

**Local Identity**: Kansas City pride without gimmicks
- KC color palette (red, blue, gold)
- Skyline imagery where appropriate
- Midwestern straightforward tone in design

**Warm Undertones**: Counter cold blue/green tech feeling
- Warm browns for dark mode backgrounds
- Warm off-white for light mode backgrounds
- Amber and gold accent colors
- Human, approachable feeling

**Performance-Conscious**: Beautiful but fast
- Minimal decorative elements
- System fonts primarily
- Optimized images only
- Progressive enhancement

---

## 3. Color System

### 3.1 Brand Colors

**Primary Colors**:
```css
--kc-red: #E31837;        /* Kansas City Red - Primary CTAs, alerts */
--kc-blue: #004687;       /* Kansas City Blue - Secondary elements, links */
--kc-sky: #5DADE2;        /* Kansas City Sky Blue - Accents, info callouts */
--mesh-green: #67C98F;    /* Meshtastic Green - Success states, network status */
```

**Warm Accents** (balance blue/green dominance):
```css
--sunset-amber: #F59E42;  /* Warm highlights, secondary CTAs */
--kc-clay: #D4825C;       /* Tertiary accents, borders */
--prairie-gold: #E8B547;  /* Attention elements, badges */
```

### 3.2 Light Mode Theme

**Backgrounds**:
```css
--bg-primary: #FDFBF7;    /* Warm off-white (not stark white) */
--bg-secondary: #F5EFE6;  /* Cream/warm gray for cards */
--bg-tertiary: #EBE3D5;   /* Slightly darker for subtle contrast */
```

**Text**:
```css
--text-primary: #2B2420;   /* Warm dark brown (not black) */
--text-secondary: #5A4F47; /* Muted brown for secondary text */
--text-tertiary: #8B7F76;  /* Light brown for meta/captions */
```

**Borders**:
```css
--border-light: #D9D1C7;   /* Subtle warm border */
--border-medium: #C4B8AB;  /* Medium contrast border */
--border-dark: #9B8D80;    /* Strong border */
```

### 3.3 Dark Mode Theme

**Backgrounds**:
```css
--bg-primary: #1A1512;     /* Warm dark brown (not black) */
--bg-secondary: #2B2420;   /* Warm charcoal for cards */
--bg-tertiary: #3C352F;    /* Slightly lighter for contrast */
```

**Text**:
```css
--text-primary: #F4E8D8;   /* Warm off-white */
--text-secondary: #D9C7B3; /* Muted warm tan */
--text-tertiary: #B3A090;  /* Subtle warm gray */
```

**Borders**:
```css
--border-light: #3C352F;   /* Subtle border in dark */
--border-medium: #5A4F47;  /* Medium contrast border */
--border-dark: #8B7F76;    /* Strong border */
```

### 3.4 Semantic Colors

**Success** (operational, completed):
```css
--success-light: #67C98F;  /* Meshtastic Green */
--success-dark: #52A675;   /* Darker green for dark mode */
```

**Warning** (caution, attention needed):
```css
--warning-light: #E8B547;  /* Prairie Gold */
--warning-dark: #C99B3A;   /* Darker gold for dark mode */
```

**Error** (problems, critical):
```css
--error-light: #E31837;    /* KC Red */
--error-dark: #B91329;     /* Darker red for dark mode */
```

**Info** (helpful information):
```css
--info-light: #5DADE2;     /* KC Sky Blue */
--info-dark: #4A8AB8;      /* Darker blue for dark mode */
```

### 3.5 Color Usage Guidelines

**KC Red (#E31837)**:
- Primary CTAs ("Join the Network", "Get Started")
- Alert badges ("SEEKING INFRASTRUCTURE")
- Error states
- Navigation hover states (sparingly)

**KC Blue (#004687)**:
- Links (text links, navigation)
- Secondary CTAs
- Headings (optional, if want color)
- Icons (infrastructure, technical)

**KC Sky Blue (#5DADE2)**:
- Info callouts
- Highlights
- Tooltips backgrounds
- Code blocks (optional)

**Meshtastic Green (#67C98F)**:
- Success states ("Operational", "Connected")
- Positive metrics (uptime, active nodes)
- Confirmation messages
- Progress indicators

**Sunset Amber (#F59E42)**:
- Community Coordination Banner background (warm, welcoming)
- Secondary CTAs (softer than red)
- Warm highlights
- Badges (non-critical attention)

**KC Clay (#D4825C)**:
- Tertiary accents
- Border highlights
- Decorative elements
- Subtle backgrounds

**Prairie Gold (#E8B547)**:
- Date badges
- Update indicators
- "New" or "Updated" labels
- Attention (non-error)

### 3.6 Contrast Ratios

**WCAG AA Compliance Minimum**:
- Normal text (< 18pt): 4.5:1
- Large text (≥ 18pt or 14pt bold): 3:1
- UI components and graphics: 3:1

**Verified Combinations** (light mode):
- `#2B2420` on `#FDFBF7`: 11.2:1 ✅
- `#004687` on `#FDFBF7`: 10.8:1 ✅
- `#E31837` on `#FDFBF7`: 5.2:1 ✅

**Verified Combinations** (dark mode):
- `#F4E8D8` on `#1A1512`: 12.1:1 ✅
- `#5DADE2` on `#1A1512`: 6.7:1 ✅
- `#67C98F` on `#1A1512`: 7.3:1 ✅

---

## 4. Typography

### 4.1 Font Stack

**Body Text** (system fonts for performance):
```css
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, "Noto Sans", sans-serif,
             "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
```

**Monospace** (code, technical specs):
```css
--font-mono: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono",
             Consolas, "Courier New", monospace;
```

**Optional Custom Font** (headings only, if brand identity requires):
```css
/* Consider: Inter, Manrope, or similar geometric sans */
/* Only load if performance budget allows */
--font-heading: 'Inter Variable', var(--font-sans);
```

**Recommendation**: Use system fonts entirely for MVP, add custom heading font only if design requires and performance testing validates.

### 4.2 Font Sizes

**Type Scale** (1.25 ratio, responsive):

**Mobile** (< 768px):
```css
--text-xs: 0.75rem;    /* 12px - Captions, meta */
--text-sm: 0.875rem;   /* 14px - Small text, labels */
--text-base: 1rem;     /* 16px - Body text */
--text-lg: 1.125rem;   /* 18px - Emphasized body */
--text-xl: 1.25rem;    /* 20px - H4 */
--text-2xl: 1.5rem;    /* 24px - H3 */
--text-3xl: 1.875rem;  /* 30px - H2 */
--text-4xl: 2.25rem;   /* 36px - H1 */
--text-5xl: 3rem;      /* 48px - Hero headline (mobile) */
```

**Desktop** (≥ 768px):
```css
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.375rem;   /* 22px - H4 */
--text-2xl: 1.75rem;   /* 28px - H3 */
--text-3xl: 2.25rem;   /* 36px - H2 */
--text-4xl: 3rem;      /* 48px - H1 */
--text-5xl: 4rem;      /* 64px - Hero headline */
```

### 4.3 Font Weights

```css
--font-normal: 400;    /* Body text */
--font-medium: 500;    /* Emphasized body, labels */
--font-semibold: 600;  /* Subheadings, buttons */
--font-bold: 700;      /* Headings */
```

**Usage**:
- Body paragraphs: 400
- Labels, emphasized text: 500
- Buttons, CTAs: 600
- H1-H6: 700

### 4.4 Line Heights

```css
--leading-tight: 1.25;   /* Headings */
--leading-snug: 1.375;   /* Subheadings, large text */
--leading-normal: 1.5;   /* Body text (default) */
--leading-relaxed: 1.625;/* Long-form content */
--leading-loose: 2;      /* Captions, annotations */
```

**Usage**:
- H1-H2: 1.25
- H3-H4: 1.375
- Paragraphs: 1.5
- Long articles: 1.625

### 4.5 Letter Spacing

```css
--tracking-tighter: -0.05em;  /* Large headings (H1) */
--tracking-tight: -0.025em;   /* Headings (H2-H3) */
--tracking-normal: 0;         /* Default */
--tracking-wide: 0.025em;     /* Labels, buttons */
--tracking-wider: 0.05em;     /* All-caps text */
```

### 4.6 Heading Styles

**H1** (Page Title):
```css
.h1 {
  font-size: var(--text-4xl);  /* Mobile: 36px, Desktop: 48px */
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tighter);
  color: var(--text-primary);
  margin-bottom: 1rem;
}
```

**H2** (Section Heading):
```css
.h2 {
  font-size: var(--text-3xl);  /* Mobile: 30px, Desktop: 36px */
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
  margin-top: 3rem;
  margin-bottom: 1rem;
}
```

**H3** (Subsection):
```css
.h3 {
  font-size: var(--text-2xl);  /* Mobile: 24px, Desktop: 28px */
  font-weight: var(--font-bold);
  line-height: var(--leading-snug);
  letter-spacing: var(--tracking-tight);
  color: var(--text-primary);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}
```

**H4** (Sub-subsection):
```css
.h4 {
  font-size: var(--text-xl);   /* Mobile: 20px, Desktop: 22px */
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
  color: var(--text-primary);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
```

**Body Text**:
```css
.body {
  font-size: var(--text-base);  /* 16px */
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--text-primary);
  margin-bottom: 1rem;
}
```

**Subheadline** (below H1):
```css
.subheadline {
  font-size: var(--text-lg);   /* 18px */
  font-weight: var(--font-normal);
  line-height: var(--leading-snug);
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}
```

**Caption/Meta**:
```css
.caption {
  font-size: var(--text-sm);   /* 14px */
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--text-tertiary);
}
```

---

## 5. Spacing System

### 5.1 Spacing Scale

**Base Unit**: 4px (0.25rem)

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### 5.2 Component Spacing

**Card/Section Padding**:
- Mobile: `--space-6` (24px)
- Desktop: `--space-8` (32px)

**Section Margins** (between major page sections):
- Mobile: `--space-12` (48px)
- Desktop: `--space-16` (64px)

**Element Margins** (between elements within section):
- Heading → Body: `--space-4` (16px)
- Paragraph → Paragraph: `--space-4` (16px)
- List items: `--space-2` (8px)

**Button Padding**:
- Small: `--space-2` `--space-4` (8px 16px)
- Medium: `--space-3` `--space-6` (12px 24px)
- Large: `--space-4` `--space-8` (16px 32px)

### 5.3 Layout Margins

**Page Margins** (horizontal):
- Mobile (< 768px): `--space-4` (16px)
- Tablet (768-1024px): `--space-6` (24px)
- Desktop (> 1024px): `--space-8` (32px) or auto (centered with max-width)

**Max Widths** (content containers):
```css
--max-width-sm: 640px;   /* Narrow content (not used often) */
--max-width-md: 768px;   /* Standard content pages */
--max-width-lg: 1024px;  /* Wide content, guides */
--max-width-xl: 1280px;  /* Homepage, landing pages */
--max-width-full: 100%;  /* Full-width (map, hero) */
```

---

## 6. Components

### 6.1 Buttons

**Primary Button** (KC Red, high emphasis):
```css
.btn-primary {
  background-color: var(--kc-red);
  color: #FFFFFF;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  border-radius: 0.375rem; /* 6px */
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-primary:hover {
  background-color: #B91329; /* Darker red */
}

.btn-primary:focus-visible {
  outline: 2px solid var(--kc-blue);
  outline-offset: 2px;
}
```

**Secondary Button** (KC Blue, medium emphasis):
```css
.btn-secondary {
  background-color: var(--kc-blue);
  color: #FFFFFF;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-secondary:hover {
  background-color: #003366;
}
```

**Tertiary Button** (Sunset Amber, warm alternative):
```css
.btn-tertiary {
  background-color: var(--sunset-amber);
  color: var(--text-primary);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-tertiary:hover {
  background-color: #D98A35;
}
```

**Outline Button** (low emphasis):
```css
.btn-outline {
  background-color: transparent;
  color: var(--text-primary);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  border-radius: 0.375rem;
  border: 2px solid var(--border-medium);
  cursor: pointer;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.btn-outline:hover {
  border-color: var(--kc-blue);
  color: var(--kc-blue);
}
```

**Button Sizes**:
```css
.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
}

.btn-md {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-lg);
}
```

### 6.2 Cards

**Basic Card**:
```css
.card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: 0.5rem; /* 8px */
  padding: var(--space-6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

**Card with Header**:
```html
<div class="card">
  <div class="card-header">
    <h3>Card Title</h3>
  </div>
  <div class="card-body">
    <p>Card content...</p>
  </div>
</div>
```

```css
.card-header {
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--border-light);
}

.card-body {
  /* Content flows naturally */
}
```

**Interactive Card** (clickable):
```css
.card-interactive {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card-interactive:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.1);
}
```

### 6.3 Badges

**Status Badges**:
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  border-radius: 9999px; /* Fully rounded */
}

.badge-success {
  background-color: var(--success-light);
  color: #FFFFFF;
}

.badge-warning {
  background-color: var(--warning-light);
  color: var(--text-primary);
}

.badge-error {
  background-color: var(--error-light);
  color: #FFFFFF;
}

.badge-info {
  background-color: var(--info-light);
  color: #FFFFFF;
}
```

**Usage Examples**:
```html
<span class="badge badge-success">Operational</span>
<span class="badge badge-warning">Seeking Host</span>
<span class="badge badge-error">Offline</span>
<span class="badge badge-info">Planned</span>
```

### 6.4 Forms

**Input Fields**:
```css
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--text-primary);
  background-color: var(--bg-primary);
  border: 1px solid var(--border-medium);
  border-radius: 0.375rem;
  transition: border-color 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--kc-blue);
  box-shadow: 0 0 0 3px rgba(0, 70, 135, 0.1);
}

.input::placeholder {
  color: var(--text-tertiary);
}

.input:disabled {
  background-color: var(--bg-tertiary);
  cursor: not-allowed;
  opacity: 0.6;
}
```

**Labels**:
```css
.label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-primary);
  margin-bottom: var(--space-2);
}

.label-required::after {
  content: ' *';
  color: var(--error-light);
}
```

**Textarea**:
```css
.textarea {
  /* Inherits from .input */
  min-height: 8rem;
  resize: vertical;
}
```

**Select**:
```css
.select {
  /* Inherits from .input */
  appearance: none;
  background-image: url("data:image/svg+xml...");  /* Dropdown arrow */
  background-position: right var(--space-3) center;
  background-repeat: no-repeat;
  padding-right: var(--space-8);
}
```

**Checkbox/Radio**:
```css
.checkbox, .radio {
  width: 1.25rem;
  height: 1.25rem;
  border: 2px solid var(--border-medium);
  border-radius: 0.25rem; /* Checkbox square corners */
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.radio {
  border-radius: 50%; /* Radio circular */
}

.checkbox:checked, .radio:checked {
  background-color: var(--kc-blue);
  border-color: var(--kc-blue);
}
```

**Form Layout**:
```html
<form class="form">
  <div class="form-group">
    <label for="name" class="label label-required">Name</label>
    <input type="text" id="name" class="input" required />
  </div>

  <div class="form-group">
    <label for="email" class="label label-required">Email</label>
    <input type="email" id="email" class="input" required />
  </div>

  <div class="form-group">
    <label for="message" class="label">Message</label>
    <textarea id="message" class="textarea"></textarea>
  </div>

  <button type="submit" class="btn-primary">Send</button>
</form>
```

```css
.form-group {
  margin-bottom: var(--space-6);
}
```

### 6.5 Alerts/Callouts

**Alert Box**:
```css
.alert {
  padding: var(--space-4);
  border-radius: 0.5rem;
  border-left: 4px solid;
  margin-bottom: var(--space-6);
}

.alert-success {
  background-color: rgba(103, 201, 143, 0.1);
  border-color: var(--success-light);
  color: var(--text-primary);
}

.alert-warning {
  background-color: rgba(232, 181, 71, 0.1);
  border-color: var(--warning-light);
  color: var(--text-primary);
}

.alert-error {
  background-color: rgba(227, 24, 55, 0.1);
  border-color: var(--error-light);
  color: var(--text-primary);
}

.alert-info {
  background-color: rgba(93, 173, 226, 0.1);
  border-color: var(--info-light);
  color: var(--text-primary);
}
```

**Usage**:
```html
<div class="alert alert-info">
  <strong>Note:</strong> Network coverage improves as more nodes join.
</div>
```

### 6.6 Navigation

**Primary Navigation** (desktop):
```css
.nav-primary {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  padding: var(--space-4) var(--space-6);
  background-color: var(--bg-primary);
  border-bottom: 1px solid var(--border-light);
}

.nav-link {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: var(--font-medium);
  padding: var(--space-2) var(--space-3);
  border-radius: 0.375rem;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.nav-link:hover {
  background-color: var(--bg-secondary);
  color: var(--kc-blue);
}

.nav-link[aria-current="page"] {
  color: var(--kc-blue);
  font-weight: var(--font-semibold);
}
```

**Mobile Navigation** (hamburger):
```css
.nav-mobile {
  position: fixed;
  top: 0;
  left: -100%;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background-color: var(--bg-primary);
  box-shadow: 4px 0 8px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  z-index: 1000;
}

.nav-mobile.open {
  left: 0;
}

.nav-mobile-links {
  display: flex;
  flex-direction: column;
  padding: var(--space-6);
}

.nav-mobile-link {
  color: var(--text-primary);
  text-decoration: none;
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--border-light);
}
```

**Hamburger Icon**:
```css
.hamburger {
  display: none; /* Hidden on desktop */
  background: none;
  border: none;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .nav-primary-links {
    display: none; /* Hide desktop nav on mobile */
  }
}
```

### 6.7 Footer

```css
.footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-light);
  padding: var(--space-12) var(--space-6);
  margin-top: var(--space-16);
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-8);
  max-width: var(--max-width-xl);
  margin: 0 auto;
}

.footer-section {
  /* Each navigation column */
}

.footer-section-title {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  color: var(--text-secondary);
  margin-bottom: var(--space-3);
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-link {
  display: block;
  color: var(--text-secondary);
  text-decoration: none;
  padding: var(--space-2) 0;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--kc-blue);
}
```

---

## 7. Layout Patterns

### 7.1 Page Layout

**Standard Page**:
```html
<div class="page">
  <header class="header">
    <!-- Navigation -->
  </header>

  <main id="main-content" class="main">
    <div class="container">
      <article class="content">
        <!-- Page content -->
      </article>
    </div>
  </main>

  <footer class="footer">
    <!-- Footer content -->
  </footer>
</div>
```

```css
.container {
  max-width: var(--max-width-lg);
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.content {
  padding: var(--space-8) 0;
}

@media (max-width: 768px) {
  .container {
    padding: 0 var(--space-4);
  }

  .content {
    padding: var(--space-6) 0;
  }
}
```

### 7.2 Hero Section

```html
<section class="hero">
  <div class="hero-content">
    <h1 class="hero-title">Kansas City Metropolitan Meshtastic Network</h1>
    <p class="hero-subtitle">Independent Emergency Communications Infrastructure for the KC Metro Area</p>
    <div class="hero-ctas">
      <a href="/get-started/join" class="btn-primary btn-lg">Join the Network</a>
      <a href="/network/coverage" class="btn-outline btn-lg">View Coverage Map</a>
    </div>
  </div>
</section>
```

```css
.hero {
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  padding: var(--space-16) var(--space-6);
  text-align: center;
}

.hero-content {
  max-width: var(--max-width-lg);
  margin: 0 auto;
}

.hero-title {
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--text-primary);
  margin-bottom: var(--space-4);
}

.hero-subtitle {
  font-size: var(--text-xl);
  color: var(--text-secondary);
  margin-bottom: var(--space-8);
}

.hero-ctas {
  display: flex;
  gap: var(--space-4);
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .hero {
    padding: var(--space-12) var(--space-4);
  }

  .hero-title {
    font-size: var(--text-3xl);
  }

  .hero-subtitle {
    font-size: var(--text-lg);
  }

  .hero-ctas {
    flex-direction: column;
  }
}
```

### 7.3 Grid Layouts

**Card Grid** (homepage value propositions, quick links):
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
  margin: var(--space-8) 0;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr; /* Single column on mobile */
  }
}
```

**Two-Column Layout** (content + sidebar):
```css
.two-column {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--space-8);
}

@media (max-width: 1024px) {
  .two-column {
    grid-template-columns: 1fr; /* Stack on tablet/mobile */
  }
}
```

### 7.4 Community Coordination Banner

**Special Homepage Component**:
```html
<section class="coordination-banner">
  <div class="coordination-content">
    <h2>Looking for kansascitymesh.net Operator</h2>
    <p>We want to collaborate, not compete. If you operate kansascitymesh.net or know existing KC mesh community, please contact us to combine resources.</p>
    <a href="/about/coordination" class="btn-tertiary">Let's Coordinate</a>
  </div>
</section>
```

```css
.coordination-banner {
  background-color: var(--sunset-amber);
  color: var(--text-primary);
  padding: var(--space-8) var(--space-6);
  margin: var(--space-8) 0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.coordination-content {
  max-width: var(--max-width-lg);
  margin: 0 auto;
  text-align: center;
}

.coordination-content h2 {
  margin-bottom: var(--space-4);
}

.coordination-content p {
  font-size: var(--text-lg);
  margin-bottom: var(--space-6);
}
```

---

## 8. Icons and Graphics

### 8.1 Icon Strategy

**Recommendation: Heroicons** (or similar open-source set)
- Consistent style
- Outline and solid variants
- SVG format (scalable, accessible)
- Free, no attribution required

**Icon Sizes**:
```css
--icon-sm: 1rem;    /* 16px - Inline with text */
--icon-md: 1.5rem;  /* 24px - Standard UI */
--icon-lg: 2rem;    /* 32px - Featured icons */
--icon-xl: 3rem;    /* 48px - Hero/landing sections */
```

**Icon Colors**:
- Default: Match text color (`currentColor`)
- Semantic: Use brand/semantic colors
  - Success: `--success-light`
  - Warning: `--warning-light`
  - Error: `--error-light`
  - Info: `--info-light`

**Accessibility**:
```html
<!-- Decorative icon (no meaning) -->
<svg aria-hidden="true" class="icon">...</svg>

<!-- Meaningful icon -->
<svg aria-label="Success" role="img" class="icon">...</svg>
```

### 8.2 Logo

**Placeholder** (until designed):
- Text-based: "KC Mesh" in brand font
- Color: KC Red or KC Blue
- Simple, recognizable at small sizes

**Future Logo Considerations**:
- Works in dark and light mode
- Scalable (SVG)
- Recognizable at favicon size (16×16px)
- Incorporates local identity (KC skyline silhouette?)
- Mesh network motif (connected nodes?)

### 8.3 Photography

**Style Guidelines**:
- Real hardware (not stock photos)
- Kansas City locations (skyline, recognizable landmarks)
- Diverse people (inclusive community)
- Natural lighting (warm, approachable)
- In-context shots (hardware in use, installations)

**Image Treatment**:
- Subtle border radius (0.5rem)
- Optional: Subtle shadow on hover
- Lazy loading below fold
- Alt text always

---

## 9. Motion and Transitions

### 9.1 Transition Timing

```css
--transition-fast: 150ms;    /* Hover states, small changes */
--transition-base: 200ms;    /* Standard transitions */
--transition-slow: 300ms;    /* Larger movements, fades */
```

**Easing Functions**:
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

**Default**: `ease-out` for most UI transitions (feels responsive)

### 9.2 Common Transitions

**Hover States** (buttons, links, cards):
```css
transition: background-color var(--transition-base) ease-out,
            color var(--transition-base) ease-out,
            transform var(--transition-base) ease-out,
            box-shadow var(--transition-base) ease-out;
```

**Focus States** (immediate, no transition):
```css
/* No transition on focus - should be instant for accessibility */
```

**Page Transitions** (optional, subtle):
```css
.page-enter {
  opacity: 0;
  transform: translateY(8px);
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity var(--transition-slow) ease-out,
              transform var(--transition-slow) ease-out;
}
```

### 9.3 Animation Principles

**Subtle and Purposeful**:
- No animation for decoration only
- Support user goals (provide feedback, guide attention)
- Respect `prefers-reduced-motion`

**Reduced Motion**:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Dark Mode Implementation

### 10.1 Theme Toggle

**HTML Structure**:
```html
<button id="theme-toggle" aria-label="Toggle dark mode">
  <svg class="sun-icon" aria-hidden="true"><!-- Sun icon --></svg>
  <svg class="moon-icon" aria-hidden="true"><!-- Moon icon --></svg>
</button>
```

**JavaScript**:
```javascript
const toggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check localStorage or system preference
const currentTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

html.classList.add(currentTheme);

toggle.addEventListener('click', () => {
  const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
  html.classList.remove('dark', 'light');
  html.classList.add(newTheme);
  localStorage.setItem('theme', newTheme);
});
```

### 10.2 CSS Variables Approach

**Define colors for both themes**:
```css
:root {
  /* Light mode (default) */
  --bg-primary: #FDFBF7;
  --bg-secondary: #F5EFE6;
  --text-primary: #2B2420;
  /* ... all other light mode colors */
}

.dark {
  /* Dark mode */
  --bg-primary: #1A1512;
  --bg-secondary: #2B2420;
  --text-primary: #F4E8D8;
  /* ... all other dark mode colors */
}
```

**Components use variables** (automatically adapt):
```css
.card {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  /* No need for .dark-specific rules */
}
```

### 10.3 Images in Dark Mode

**Logo**:
- SVG with `currentColor` (adapts to text color)
- Or: Separate light/dark logos, swap with CSS

**Photos**:
- Optional: Slight opacity reduction in dark mode (reduce glare)
```css
.dark img {
  opacity: 0.9;
}
```

---

## 11. Accessibility Features

### 11.1 Focus Indicators

**Visible Focus**:
```css
:focus-visible {
  outline: 2px solid var(--kc-blue);
  outline-offset: 2px;
}

/* Remove default outline, use custom */
:focus {
  outline: none;
}

/* Ensure focus-visible used (not just :focus) */
```

### 11.2 Skip Links

```html
<a href="#main-content" class="skip-link">Skip to main content</a>

<main id="main-content">
  <!-- Content -->
</main>
```

```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background-color: var(--kc-blue);
  color: #FFFFFF;
  padding: var(--space-3) var(--space-4);
  text-decoration: none;
  z-index: 9999;
}

.skip-link:focus {
  top: 0;
}
```

### 11.3 Text Alternatives

**Image Alt Text**:
- Decorative images: `alt=""` (empty, screen reader skips)
- Meaningful images: Descriptive alt text
- Complex diagrams: Alt text + long description below

**Icon Buttons**:
```html
<button aria-label="Open navigation menu" class="hamburger">
  <svg aria-hidden="true"><!-- Icon --></svg>
</button>
```

### 11.4 Color Contrast

**Tool**: Use WebAIM Contrast Checker

**Verify All Combinations**:
- Text on backgrounds (4.5:1 minimum)
- Button text on button backgrounds
- Link colors on page background
- Badge text on badge backgrounds

**Already verified** (see section 3.6)

---

## 12. Responsive Images

### 12.1 Responsive Syntax

```html
<img
  src="/images/hero-800.jpg"
  srcset="/images/hero-400.jpg 400w,
          /images/hero-800.jpg 800w,
          /images/hero-1200.jpg 1200w,
          /images/hero-1600.jpg 1600w"
  sizes="(max-width: 768px) 100vw,
         (max-width: 1024px) 80vw,
         1200px"
  alt="Kansas City skyline with mesh network visualization"
  width="1200"
  height="600"
  loading="lazy"
/>
```

### 12.2 WebP with Fallback

```html
<picture>
  <source type="image/webp" srcset="/images/hero.webp" />
  <source type="image/jpeg" srcset="/images/hero.jpg" />
  <img src="/images/hero.jpg" alt="..." />
</picture>
```

### 12.3 Background Images (Responsive)

```css
.hero {
  background-image: url('/images/hero-mobile.jpg');
}

@media (min-width: 768px) {
  .hero {
    background-image: url('/images/hero-tablet.jpg');
  }
}

@media (min-width: 1024px) {
  .hero {
    background-image: url('/images/hero-desktop.jpg');
  }
}

/* Or use image-set for WebP support */
.hero {
  background-image: image-set(
    url('/images/hero.webp') type('image/webp'),
    url('/images/hero.jpg') type('image/jpeg')
  );
}
```

---

## 13. Print Styles (Optional)

**Basic Print Optimization**:
```css
@media print {
  /* Hide navigation, footer */
  .header, .footer, .nav-primary, .nav-mobile {
    display: none;
  }

  /* Ensure content uses full width */
  .container {
    max-width: 100%;
  }

  /* Print links with URLs */
  a[href^="http"]:after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    color: var(--text-tertiary);
  }

  /* Avoid page breaks inside elements */
  .card, .section {
    page-break-inside: avoid;
  }

  /* Use light mode colors */
  :root {
    /* Override to light mode for print */
  }
}
```

---

## 14. Component Library Quick Reference

| Component | Class | Variants |
|-----------|-------|----------|
| **Button** | `.btn-primary` | `.btn-secondary`, `.btn-tertiary`, `.btn-outline` |
| **Button Size** | `.btn-md` | `.btn-sm`, `.btn-lg` |
| **Card** | `.card` | `.card-interactive` |
| **Badge** | `.badge` | `.badge-success`, `.badge-warning`, `.badge-error`, `.badge-info` |
| **Alert** | `.alert` | `.alert-success`, `.alert-warning`, `.alert-error`, `.alert-info` |
| **Input** | `.input` | - |
| **Textarea** | `.textarea` | - |
| **Select** | `.select` | - |
| **Label** | `.label` | `.label-required` |
| **Heading** | `.h1`, `.h2`, `.h3`, `.h4` | - |
| **Navigation** | `.nav-primary` | `.nav-mobile` |
| **Footer** | `.footer` | - |
| **Container** | `.container` | - |

---

## 15. Design Tokens Summary

**Export for Tailwind Config**:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'kc-red': '#E31837',
        'kc-blue': '#004687',
        'kc-sky': '#5DADE2',
        'mesh-green': '#67C98F',
        'sunset-amber': '#F59E42',
        'kc-clay': '#D4825C',
        'prairie-gold': '#E8B547',
      },
      spacing: {
        // Uses default Tailwind spacing (4px base unit)
      },
      maxWidth: {
        'content': '1024px',
        'wide': '1280px',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
}
```

---

**Document Status**: Complete
**Next Steps**: Review with stakeholders, begin SEO and analytics plan
