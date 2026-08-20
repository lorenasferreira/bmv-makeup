# BMV Makeup — Design System

Visual and UI reference for maintaining consistency across BMV Makeup.

This is a living system. Reuse the visual language without forcing every section into the same layout.

---

## Visual Direction

BMV should feel:

* Editorial
* Premium
* Artistic
* Contemporary
* Human
* Sophisticated
* Photography-led

The website should feel closer to a **beauty editorial / artist portfolio** than a traditional salon website.

The work should always remain the visual protagonist.

### Avoid

* Generic beauty templates
* Pink, glitter and makeup clichés
* Excessive gold
* Excessive cards
* Heavy shadows
* Repetitive grids
* Decorative elements without purpose
* Overly feminine visual clichés
* Making the brand exclusively bridal

Consistency should come from the **visual language**, not from repeating the same composition.

---

# Color System

Tokens are defined in:

`src/styles/variables.css`

```css
--color-primary: #2d2926;
--color-primary-dark: #1d1a18;

--color-bmv-green: #173605;

--color-secondary: #8d8172;
--color-tertiary: #e2ded0;

--color-background: #f9f8f5;
--color-surface: #ffffff;

--color-text: #2d2926;
--color-text-light: #746d66;

--color-border: #e2ded0;

--color-accent: var(--color-bmv-green);
```

Use existing tokens instead of hardcoded colors whenever possible.

## BMV Green

`#173605` comes from the existing BMV identity.

Treat it as a **signature**, not the dominant interface color.

Good uses:

* Small labels
* Links
* Active states
* Thin lines
* Hover details
* Editorial accents

Avoid large green areas that compete with photography unless a specific composition clearly benefits from it.

---

# Typography

Typography works through contrast.

The project currently uses three roles:

```css
var(--font-editorial)
var(--font-section)
var(--font-primary)
```

## Editorial

Use `--font-editorial` selectively for moments that should feel expressive or magazine-like.

Examples:

* Hero typography
* Names
* Quotes
* Selected editorial details
* High-impact brand moments

Do not use it automatically for every large heading.

## Section

Use `--font-section` for major section statements and large internal-page headings.

Examples:

* Section titles
* Manifesto statements
* Large CTAs
* Narrative headings

This is generally easier to read at large sizes while maintaining the editorial character of the site.

## Primary

Use `--font-primary` for functional and long-form content.

Examples:

* Paragraphs
* Navigation
* Buttons
* Labels
* Prices
* Forms
* UI elements

### Principle

Typography hierarchy should come from **role and contrast**, not simply font size.

---

# Photography

Photography is the primary visual material of BMV Makeup.

Prioritize:

* Faces
* Makeup close-ups
* Bruno working
* Bruno portraits
* Real clients
* Beauty portraits
* Weddings
* Campaigns
* Photoshoots
* Artistic makeup
* Audiovisual work
* Behind-the-scenes moments

Avoid generic lifestyle photography where makeup, artistry or Bruno's work is not meaningfully present.

## Cropping

Do not force one crop to work everywhere.

Desktop and mobile may use:

* Different crops
* Different positioning
* Different image proportions
* Separate assets when necessary

Use `object-fit: cover` intentionally and validate the subject position at each breakpoint.

---

# Layout

Prefer:

* Large photography
* Generous negative space
* Asymmetry
* Portrait compositions
* Mixed image proportions
* Strong typography
* Editorial rhythm
* Occasional full-width visual moments

Sections should feel related without looking identical.

Avoid repeatedly solving sections with:

```text
Title
↓
3 cards
↓
CTA
```

Different content may require different compositions.

---

# Editorial Rhythm

Pages should alternate visual density.

A useful rhythm may include:

```text
Large visual impact
↓
Negative space
↓
Typography-led moment
↓
Photography
↓
Movement or contrast
↓
Quiet content
```

Do not make every section equally loud.

The user should have moments to visually breathe.

---

# Motion

Motion should reinforce the content.

Current visual language may include:

* Hero image transitions
* Slow editorial marquees
* Image reveals
* Soft fades
* Subtle hover interactions
* BMV logo loader

The About page establishes a useful motion pattern with two editorial marquees moving in opposite directions.

Motion should generally feel:

* Smooth
* Slow
* Intentional
* Secondary to photography

Avoid animation simply because an element can move.

## Accessibility

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Continuous animations should have a non-animated fallback.

---

# Spacing

Prefer responsive spacing with:

```css
clamp(...)
```

Use generous spacing when it strengthens:

* Hierarchy
* Photography
* Editorial composition
* Separation between narrative moments

Avoid arbitrary spacing when an established pattern already works.

Page-level horizontal spacing should use the existing:

```css
var(--page-padding)
```

whenever appropriate.

---

# Borders & Shadows

Prefer subtle hairline borders:

```css
1px solid var(--color-border);
```

Dark sections may use subtle transparent light borders when necessary.

Avoid shadows by default.

If depth can be created through:

* spacing
* typography
* photography
* contrast
* borders

prefer those methods.

---

# Responsive Design

Development order:

```text
Desktop
→ Tablet
→ Mobile
```

Responsive design may change:

* Layout
* Image crop
* Scale
* Spacing
* Alignment
* Content order
* Typography
* Motion speed

Mobile should not simply be a smaller desktop.

Preserve the **idea of the composition**, not necessarily its exact geometry.

---

# Hero Language

Heroes should establish a strong visual hierarchy quickly.

Prefer:

* Photography-led compositions
* Limited copy
* Strong typography
* Minimal controls
* Intentional image cropping

The Home Hero uses rotating photography and should remain the strongest initial visual moment of the site.

Internal-page heroes may use different compositions while remaining part of the same visual language.

Do not copy the Home Hero structure onto every page.

---

# Labels

Small uppercase labels are part of the editorial language.

Typical characteristics:

```css
font-size: 0.68rem;
font-weight: 500;
letter-spacing: 0.16em;
text-transform: uppercase;
```

They may use the accent color or a context-specific muted color.

Labels can include:

* Section names
* Numbers
* Categories
* Small contextual information

Avoid overusing them on every element.

---

# CTAs & Links

CTAs should feel integrated into the editorial design rather than like generic application buttons.

Possible treatments:

* Underlined text links
* Minimal buttons
* Arrow links
* Small uppercase labels

Use stronger button treatments only when the action requires greater prominence.

Hover states should remain subtle.

---

# Brand Presence

## BMV

Use the BMV identity intentionally in:

* Header
* Loader
* Footer
* Favicon
* Selected brand moments

Avoid repeating the logo simply to fill space.

## Barcelona

Barcelona may appear through:

* Light
* Architecture
* Interiors
* Balconies
* Streets
* Environmental details

Avoid tourism imagery.

## Brazilian Identity

Bruno's Brazilian background should appear naturally through:

* Story
* Personality
* Voice
* Photography
* Approach

Avoid:

* Flags as decoration
* Green-and-yellow combinations
* Brazilian visual clichés

Identity should feel human, not themed.

---

# UI Principles

Prefer interfaces that feel:

* Quiet
* Intentional
* Spacious
* Easy to navigate

Avoid unnecessary:

* Cards
* Containers
* Badges
* Pills
* Shadows
* Icons

Not every piece of information needs a visual container.

---

# CSS Modules

Component styles use CSS Modules.

Class names:

```css
heroImage
sectionTitle
navigationLink
imageWrapper
```

Use camelCase and describe the element's role.

Keep styles with the component that owns them.

When a page becomes too large, split it by **meaningful visual responsibility**, not simply to reduce line count.

---

# Component Visual Ownership

Typical component structure:

```text
ComponentName/
├── ComponentName.jsx
└── ComponentName.module.css
```

A component should generally own:

* Its layout
* Its responsive behavior
* Its local visual states
* Its local animation

Global tokens belong in the shared style system.

Do not move component-specific styling into global CSS simply to reuse a few declarations.

---

# Reuse

Reuse:

* Tokens
* Typography roles
* Spacing logic
* Motion language
* Interaction patterns
* Responsive principles

Do **not** force reuse of an entire layout simply because another section already exists.

For BMV:

**Reuse the system, not the composition.**

---

# Visual QA

Before considering a major section complete, check:

### Desktop

* Hierarchy
* Photography
* Negative space
* Alignment
* Visual rhythm

### Tablet

* Composition still makes sense
* Typography does not dominate unexpectedly
* Image crops remain intentional

### Mobile

* Content order feels natural
* Text remains readable
* Images retain their subject
* No accidental horizontal overflow
* Motion still works appropriately
* Touch targets remain usable

---

# Core Principle

The interface exists to frame Bruno's work.

When choosing between a decorative UI element and giving the photography, typography or content more space:

**prefer the work.**
