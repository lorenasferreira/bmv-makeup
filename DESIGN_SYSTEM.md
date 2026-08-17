# BMV Makeup — Design System

A lightweight reference for maintaining visual and code consistency across the project.

This system should evolve with the product. It is a guide, not a set of rigid rules.

---

## Visual Direction

The brand should feel:

- Editorial
- Premium
- Artistic
- Contemporary
- Human
- Portrait-led
- Sophisticated

The website should feel closer to a beauty editorial and artist portfolio than a traditional salon website.

Balance:

- Polished makeup photography
- Bruno working
- Real clients
- Behind-the-scenes moments
- Creative and editorial work

Avoid:

- Generic beauty templates
- Excessive cards and shadows
- Pink, glitter or makeup clichés
- Repetitive layouts
- Making the brand exclusively bridal
- Decorative elements without purpose

---

## Colors

Color tokens are defined in:

`src/styles/variables.css`

Initial palette:

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
````

The BMV green comes from the existing brand identity and should be used as a subtle signature.

Good uses:

* Small labels
* Active states
* Thin lines
* Links
* Hover details
* Small editorial accents

Avoid large amounts of green competing with the photography.

Prefer design tokens over hardcoded colors.

---

## Typography

The visual direction combines:

### Editorial Serif

Used selectively for:

* Hero
* Large titles
* Quotes
* High-impact editorial moments

### Clean Sans Serif

Used for:

* Paragraphs
* Navigation
* Buttons
* Labels
* Prices
* UI elements

Initial references:

* Bodoni Moda
* DM Sans

Final fonts should be validated during implementation.

Do not use the editorial font everywhere. Contrast creates impact.

---

## Photography

Photography is the main visual element of the website.

Prioritize:

* Faces
* Makeup close-ups
* Portraits
* Bruno working
* Real clients
* Behind the scenes
* Bridal
* Campaigns
* Social makeup
* Artistic makeup
* Photoshoots
* Audiovisual work

Avoid generic lifestyle imagery where makeup is not the focus.

Until Bruno's final material is available, use placeholders to validate layout, cropping and responsiveness.

---

## Hero

The Hero should create the strongest visual impact on the Home.

Current direction:

* Near full-screen
* Photography-led
* Minimal text
* Approximately 6 rotating images
* Smooth automatic transitions

Preferred sequence:

1. Bruno working
2. Beauty portrait
3. Bridal
4. Campaign / editorial
5. Artistic makeup
6. Another contrasting service or style

The first image should preferably show Bruno working.

Avoid large carousel arrows or controls competing with the photography.

---

## Layout

Use:

* Large photography
* Generous negative space
* Asymmetry
* Portrait-oriented compositions
* Different image proportions
* Editorial rhythm

Sections should feel connected without looking identical.

Do not repeat the same grid or card structure simply for consistency.

Consistency should come from the visual language.

---

## Brand Presence

### BMV

Use the BMV logo intentionally in:

* Header
* Loader
* Footer
* Favicon
* Selected brand moments

Avoid unnecessary repetition.

### Barcelona

Represent Barcelona subtly through:

* Light
* Architecture
* Interiors
* Balconies
* Streets
* Background details

Avoid tourism imagery.

### Brazilian Identity

Bruno's Brazilian background can appear through his story, personality and approach.

Avoid flags, green-and-yellow combinations and obvious Brazilian clichés.

---

## Services

Current categories discussed with Bruno:

* Weddings
* Campaigns
* Social / Everyday Makeup
* Photoshoots
* Artistic Makeup
* Audiovisual / Camera Makeup
* Courses
* Appointments

Courses and appointments may display pricing.

Final names and grouping can evolve during development.

---

## Home Direction

Current ideas:

1. Header
2. Hero
3. Meet Bruno
4. Selected Work / Services
5. Experience / Behind the Scenes
6. Courses & Appointments
7. Reviews
8. Instagram Preview
9. Final CTA
10. Footer

The order is not final.

Build and validate one section at a time.

---

## Motion

Possible interactions:

* Hero image transitions
* Subtle image reveals
* Soft fades
* Small hover interactions
* BMV logo loader

Animations should support the experience without competing with the content.

Avoid decorative motion without purpose.

---

## Spacing

Prefer responsive spacing:

```css
clamp(...)
```

Use generous negative space when it improves hierarchy and photography.

Avoid arbitrary spacing when an existing pattern can be reused.

---

## Borders & Shadows

Prefer subtle hairline borders:

```css
1px solid var(--color-border);
```

Avoid shadows by default.

---

## Responsive Strategy

Development order:

```text
Desktop
↓
Tablet
↓
Mobile
```

Responsive design may change:

* Layout
* Image crop
* Scale
* Spacing
* Alignment
* Content order

Mobile should not simply be a smaller desktop.

---

## Component Architecture

Create components only when they are actually needed.

Possible structure as the project grows:

```text
components/
├── common/
├── layout/
└── sections/
```

Do not create empty folders or abstractions for hypothetical future use.

### Component Structure

```text
ComponentName/
├── ComponentName.jsx
└── ComponentName.module.css
```

---

## Code Conventions

### Components

PascalCase:

```text
Hero
Header
MeetBruno
InstagramPreview
```

### CSS Modules

camelCase:

```text
heroImage
navigationLink
serviceLabel
```

### Import Order

1. External libraries
2. Components
3. Assets
4. CSS Module

---

## Before Creating a Component

Ask:

1. What is its purpose?
2. Do we need it now?
3. Is it page-specific or genuinely reusable?
4. Does a component already exist that solves this?
5. Does it contribute to the user journey?

Then build.

---

## Development Principle

Current workflow:

```text
Foundation
↓
Header + Hero
↓
Validate Desktop
↓
Tablet
↓
Mobile
↓
Next Home Section
↓
Repeat
```

Do not create unnecessary folders, abstractions or backend functionality before they are required.

Reuse the **system**, not the visual identity, in future projects.

```
```
