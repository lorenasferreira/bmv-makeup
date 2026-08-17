````md
# BMV Makeup — Project Context

## Status

**Home development in progress — August 2026.**

Initial visual exploration has been presented to Bruno and the general creative direction has been approved.

Current development focus:

**Build and validate the Home before expanding into internal pages.**

---

## Project Goal

Create a premium digital presence for **BMV Makeup**, the professional makeup brand of Bruno Menezes, a Brazilian makeup artist based in Barcelona.

The website should position Bruno as a versatile makeup artist rather than exclusively as a bridal professional.

The experience should communicate:

- Artistry
- Beauty
- Transformation
- Trust
- Personality
- Professionalism
- Versatility
- Human connection

The work itself should remain the main visual protagonist.

---

## Brand

### Name

**BMV Makeup**

Use BMV Makeup consistently as the main brand name.

### Brand Identity

Existing BMV logo provided by Bruno.

The green extracted from the existing identity is the primary brand accent:

```css
--color-bmv-green: #173605;
````

The green should appear intentionally and subtly throughout the website.

Avoid turning the website into a predominantly green interface.

---

## Visual Direction

The website should feel:

* Premium
* Editorial
* Contemporary
* Artistic
* Human
* Sophisticated
* Photography-led
* Fashion-inspired

The experience should feel closer to a beauty editorial or artist portfolio than a traditional salon website.

Avoid:

* Generic beauty templates
* Pink beauty clichés
* Glitter
* Makeup icons
* Excessive gold
* Excessive cards
* Heavy shadows
* Repetitive section layouts
* Overly feminine visual clichés
* Positioning BMV exclusively around weddings

---

## Brazilian Identity

Bruno's Brazilian identity is an important differentiator, especially within Barcelona.

It should appear naturally through:

* Bruno's story
* Personality
* Approach to beauty
* Photography
* Brand voice
* Human elements

Avoid:

* Flags as decoration
* Green-and-yellow combinations
* Tourism clichés
* Forced references to Brazil

The goal is for visitors to remember Bruno as a Brazilian artist without turning nationality into a visual gimmick.

---

## Stack

### Frontend

* React 19
* Vite
* CSS Modules
* React Icons

### Planned

* React Router DOM
* i18next
* react-i18next

### Deployment

* Vercel

Backend requirements will only be defined when a real business requirement exists.

---

## Architecture Principles

Single Git repository containing the frontend and space for future backend services if required.

Development principles:

* Plan UX before coding
* Build only what is currently needed
* Reuse components when real repetition exists
* Avoid premature abstractions
* Do not create empty folders
* Avoid dead code
* Avoid dead CSS
* Remove obsolete implementations instead of leaving them behind
* Use design tokens instead of unnecessary hardcoded values
* Desktop → Tablet → Mobile
* Validate each major section before moving forward
* Commit completed development units before starting the next one

---

# Information Architecture

Home sections, navigation items and internal pages are **not required to mirror each other**.

Use the following mental model:

**Home = narrative**

**Navigation = map**

**Internal pages = depth and action**

A Home section does not automatically need a dedicated page.

A page does not automatically need to appear on the Home.

A page does not automatically need to appear directly in the main navigation.

Deeper content may exist inside other sections of the information architecture.

---

# Home

The Home should work as both:

* Brand introduction
* Commercial journey

Its job is to create desire, establish trust, demonstrate versatility and guide visitors toward the appropriate next step.

Current planned structure:

1. Hero
2. Meet the Artist
3. Explore the Work
4. Selected Work
5. Weddings
6. Behind the Brush
7. Kind Words
8. Education
9. Instagram Preview
10. Final CTA
11. Footer
12. Scroll to Top

The exact order may evolve during development.

---

# Home — Current Development

## Header

Completed initial structure.

Current navigation direction:

```text
THE ARTIST
SERVICES
PORTFOLIO
EDUCATION
BOOK
```

The Header should remain visually minimal.

Navigation should provide access to important destinations rather than reproduce every Home section.

---

## Hero

Initial responsive version completed.

Direction:

* Near full-screen / full-screen photography
* Approximately six rotating images
* Automatic transitions
* Minimal interface
* Minimal copy
* Image counter
* Header layered over photography

Preferred photography sequence:

1. Bruno working
2. Beauty portrait
3. Bridal
4. Campaign / editorial
5. Artistic makeup
6. Audiovisual / social / contrasting work

The first image should preferably feature Bruno working.

### Photography Strategy

When final photography is available, use separate assets or crops when necessary.

Example:

```text
Desktop → landscape photography
Mobile → portrait photography
```

Do not force one crop to work across every viewport if it damages the composition.

Current development uses placeholders.

---

## Meet the Artist

Initial responsive version completed.

Purpose:

Introduce the person behind BMV immediately after the visual impact of the Hero.

The Home version should remain concise.

CTA:

```text
Discover Bruno →
```

This leads to the deeper About / The Artist experience.

---

## Explore the Work

Initial structure completed.

This section needs refinement before being considered final.

Its role should be:

**Show the range of work visitors can hire Bruno for.**

Current areas discussed with Bruno:

* Weddings
* Campaigns
* Social / Everyday Makeup
* Photoshoots
* Artistic Makeup
* Audiovisual / Camera Makeup

This section should not become a traditional services-card grid.

Maintain an editorial and photography-led approach.

---

# Selected Work

Planned Home section.

Purpose:

**Prove Bruno's ability visually.**

This should be different from Explore the Work.

Explore the Work answers:

> What can I hire Bruno for?

Selected Work answers:

> What can Bruno create?

The section should prioritize photography with minimal copy.

Potential direction:

* Large photography
* Different image proportions
* Editorial composition
* Asymmetrical layout
* Beauty close-ups
* Bridal
* Creative work
* Campaigns
* Behind-the-scenes moments where appropriate

CTA:

```text
View Portfolio →
```

---

# Weddings

Bridal work is commercially important to BMV Makeup but should not define the entire brand.

The Home should contain a dedicated bridal preview.

Potential direction:

```text
WEDDINGS

From prep
to celebration.

Discover the bridal experience →
```

The Home sells the emotion.

The Weddings page explains and sells the service.

---

# The Bridal Experience

Potential route:

```text
/services/weddings
```

Bruno responded positively to the concept:

**From Prep to Celebration**

Potential structure:

1. First Contact
2. Planning
3. Trial
4. Wedding Morning
5. Final Touches
6. Celebration

The actual workflow must be confirmed with Bruno before implementation.

Potential page content:

* Bridal philosophy
* Process
* Bridal portfolio
* Bridal party
* Service information
* Reviews
* FAQ
* Request your date

Do not display bridal makeup pricing unless Bruno later changes his current preference.

---

# Behind the Brush

Planned Home-only experience unless future content justifies expansion.

Purpose:

Show what being a BMV client actually feels like.

Potential content:

* Bruno working
* Preparing skin
* Client interaction
* Brushes and products
* Backstage
* Sets
* Wedding preparation
* Clients looking in the mirror
* Candid moments
* Video

This section should build human connection and trust.

It does not currently need:

* A navigation item
* A dedicated page

---

# Kind Words

Planned social-proof section.

Potential sources:

* Google
* Bodas.net
* Direct testimonials

Use only a curated selection on the Home.

Reviews should eventually appear contextually where possible:

```text
General reviews → Home
Bridal reviews → Weddings
Education reviews → Education
Professional feedback → relevant service
```

Do not create a dedicated Reviews page unless there is enough content to justify it.

---

# Education

Education is a separate business area and should not be hidden from Home visitors.

Home should provide a concise preview.

Potential offers discussed:

* Self-Makeup
* Professional Education
* Workshops

CTA:

```text
Explore Education →
```

The full Education page may include:

* Audience
* Format
* Duration
* Content
* What's included
* Individual / group options
* Pricing
* Booking

Unlike makeup services, Bruno is comfortable displaying pricing for relevant education products.

---

# Instagram

Bruno requested an Instagram preview.

The Home implementation should feel integrated into the editorial design rather than looking like a generic social widget.

Potential direction:

```text
@BMVMAKEUP

A little more
behind the scenes.
```

Use selected visual content and link to Instagram.

Evaluate dynamic integration only when necessary.

Do not introduce backend/API complexity without a clear benefit.

---

# Internal Pages

Initial architecture:

```text
Home
│
├── The Artist
│
├── Services
│   └── Weddings
│
├── Portfolio
│
├── Education
│
└── Contact / Book
```

This architecture may expand as the available content and business requirements become clearer.

---

# The Artist

Potential route:

```text
/about
```

The Home introduces Bruno.

This page should deepen the story.

Potential content:

* Bruno's background
* Professional journey
* Brazil → Barcelona
* Philosophy
* Experience
* Areas of expertise
* Languages
* Bruno working
* Portraits
* Behind the scenes
* Relevant professional achievements or collaborations

Do not repeat the Home copy with additional paragraphs.

---

# Services

Route:

```text
/services
```

Purpose:

Help visitors understand which BMV service matches their needs.

Possible future organization:

```text
Services
├── Weddings
├── Social
├── Commercial
│   ├── Campaigns
│   ├── Photoshoots
│   └── Audiovisual
└── Artistic
```

This structure is not final.

Confirm with Bruno before creating unnecessary subpages.

Individual service pages should only exist when there is enough unique content or a sufficiently different customer journey.

---

# Portfolio

Route:

```text
/portfolio
```

The Portfolio should be significantly richer than Selected Work on the Home.

Potential categories:

* All
* Bridal
* Beauty
* Editorial
* Campaigns
* Artistic
* Audiovisual

The page should prioritize visual exploration.

Possible future feature:

Individual campaigns, editorials or important projects may receive their own pages if enough material exists.

---

# Contact / Book

Potential route:

```text
/contact
```

The final contact experience has not yet been defined.

Do not assume that every customer should follow the same booking workflow.

Potential lead paths:

```text
Wedding
Social / Event
Campaign
Photoshoot
Audiovisual
Artistic
Education
```

The website may eventually collect different information depending on the selected service.

### Example — Wedding

Potential information:

* Date
* Location
* Getting-ready location
* Bridal party
* Event details

### Example — Commercial

Potential information:

* Production date
* Project type
* Location
* Number of people / talent
* Project details

### Example — Education

Potential information:

* Course
* Experience level
* Individual / group
* Preferred dates

This could become a lead-qualification system rather than simply redirecting every visitor immediately to WhatsApp.

---

# Booking

Booking requirements are currently undefined.

Possible future options:

* WhatsApp
* Contact form
* Calendar
* Availability request
* Course booking
* Direct booking for selected services

Do not implement calendar or booking infrastructure until Bruno's real workflow is understood.

Different services may require different booking processes.

---

# Pricing Strategy

Current direction:

### Makeup Services

Do not publicly display fixed prices unless Bruno later requests it.

Bruno prefers flexibility because quotes may depend on the client, project and context.

### Education

Prices may be displayed for:

* Self-makeup courses
* Professional courses
* Workshops

Final pricing and packages will be provided by Bruno.

---

# Internationalization

Planned languages:

* Portuguese
* Spanish
* English
* Catalan

Use nested translation keys.

Example:

```json
{
  "navigation": {},
  "home": {
    "hero": {},
    "artist": {},
    "work": {},
    "portfolio": {},
    "weddings": {},
    "experience": {},
    "reviews": {},
    "education": {},
    "instagram": {},
    "cta": {}
  },
  "about": {},
  "services": {},
  "portfolio": {},
  "education": {},
  "contact": {},
  "common": {}
}
```

Internationalization should be introduced early, before large amounts of final copy are hardcoded.

Different languages may change:

* Text length
* Line breaks
* Navigation width
* Heading composition
* Responsive behavior

Do not design only around English copy.

---

# Photography

Photography is the product.

The interface should support the photography rather than compete with it.

Final material should ideally cover:

* Bruno working
* Bruno portraits
* Beauty portraits
* Makeup close-ups
* Weddings
* Social makeup
* Campaigns
* Photoshoots
* Artistic makeup
* Audiovisual
* Behind the scenes
* Client interactions

Until the final material is delivered, use intentional placeholders.

Do not select final image crops before the real assets exist.

---

# Backend

No backend is currently required.

Potential future requirements:

* Admin
* Dynamic portfolio
* Dynamic testimonials
* Lead management
* Booking
* Calendar integration
* Course management
* Payments
* Blog / content management

Create backend infrastructure only when a confirmed feature requires it.

---

# Growth Opportunities

Potential future expansion:

```text
Admin
Dynamic Portfolio
Booking
Calendar
Payments
Courses
Blog
SEO Content
Campaign Landing Pages
Client Management
```

These should be treated as future business opportunities rather than automatically included in the initial scope.

---

# Development Workflow

For each Home section:

```text
Plan purpose
↓
Build desktop
↓
Validate composition
↓
Tablet
↓
Mobile
↓
Review
↓
Clean code
↓
Commit
↓
Next section
```

Do not continue building sections simply to move faster if the business purpose of the next section is unclear.

---

# Before Creating a Home Section

Ask:

1. What is this section trying to communicate?
2. Does it create desire, explain the brand, prove the work, build trust or support conversion?
3. Is this information already communicated elsewhere?
4. Does it need a CTA?
5. Does that CTA have a meaningful destination?

---

# Before Creating a Page

Ask:

**What can the visitor understand or do here that they cannot already understand or do on the Home?**

If there is no strong answer, do not create the page.

---

# Before Adding a Navigation Item

Ask:

**Is this an important destination that a visitor may reasonably want to access directly?**

The navigation should remain useful and concise.

It does not need to expose every page in the site.

---

# Core Principle

The site should be able to grow through layers.

Not every destination needs to be directly exposed from the Home or Header.

A visitor may naturally navigate:

```text
Home
→ Services
→ Weddings
→ Bridal Experience
→ Request Your Date
```

This depth is intentional when each step adds meaningful information or functionality.

---

# Documentation

* `README.md` → project overview
* `PROJECT_CONTEXT.md` → current decisions, architecture and business context
* `ROADMAP.md` → development progress
* `frontend/DESIGN_SYSTEM.md` → visual system and reusable UI rules

---

# Resume From Here

Current implemented Home foundation:

```text
Header
↓
Hero
↓
Meet the Artist
↓
Explore the Work
```

Before adding additional Home sections:

1. Configure multilingual architecture with nested translation keys
2. Migrate existing copy to translations
3. Refine Explore the Work so its role is clearly distinct from Portfolio
4. Build Selected Work
5. Continue through the planned Home journey

Keep the project clean as it grows.

Do not leave obsolete implementations, unused components, dead CSS or unnecessary abstractions behind.

```
```
