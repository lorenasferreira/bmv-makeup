````md
# BMV Makeup — Roadmap

## Current Status

**Home development — August 2026.**

🚧 Foundation and initial Home experience in progress.

The visual direction has been reviewed with Bruno and the first development phase has started.

---

# Phase 1 — Discovery & Foundation ✅

- [x] Brand discovery
- [x] Client meeting
- [x] Explore multiple visual directions
- [x] Present concepts to Bruno
- [x] Confirm initial visual direction
- [x] React + Vite setup
- [x] GitHub repository
- [x] Project documentation
- [x] Initial Design System
- [x] Brand color definition
- [x] BMV favicon
- [x] Global styles and design tokens
- [x] Initial typography
- [x] Responsive strategy

---

# Phase 2 — Home 🚧

## Completed

- [x] Header
- [x] Full-screen Hero
- [x] Six-slide Hero structure
- [x] Automatic Hero transitions
- [x] Hero counter
- [x] Meet the Artist
- [x] Initial Explore the Work structure
- [x] Desktop foundation
- [x] Tablet foundation
- [x] Mobile foundation

## Planned Home Journey

The Home should work as a visual and commercial introduction to BMV Makeup.

Its purpose is to:

1. Create desire
2. Introduce Bruno
3. Show versatility
4. Prove the quality of the work
5. Build trust
6. Present important business areas
7. Lead the visitor toward the right next step

Planned structure:

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

The exact order may evolve as sections are developed and validated.

---

# Phase 3 — Home Development

- [ ] Refine Explore the Work
- [ ] Selected Work
- [ ] Weddings Preview
- [ ] Behind the Brush
- [ ] Kind Words
- [ ] Education Preview
- [ ] Instagram Preview
- [ ] Final CTA
- [ ] Footer
- [ ] Scroll to Top
- [ ] Final desktop refinement
- [ ] Final tablet refinement
- [ ] Final mobile refinement

**Milestone:** Home ready for first complete client review.

---

# Phase 4 — Internationalization

The website should be prepared for:

- [ ] Portuguese
- [ ] Spanish
- [ ] English
- [ ] Catalan

Use nested translation keys from the beginning.

Suggested structure:

```text
navigation
home
  hero
  artist
  work
  portfolio
  weddings
  experience
  reviews
  education
  instagram
  cta
about
services
portfolio
education
contact
common
````

Tasks:

* [ ] Install and configure i18n
* [ ] Create translation structure
* [ ] Move existing Home copy to translation files
* [ ] Add language selector
* [ ] Validate language switching
* [ ] Review responsive behavior with different text lengths

Internationalization should be implemented before large amounts of final copy are added.

---

# Phase 5 — Client Review

* [ ] Present complete Home
* [ ] Collect visual feedback
* [ ] Confirm final photography
* [ ] Confirm Hero photography
* [ ] Confirm final services
* [ ] Confirm service grouping
* [ ] Confirm portfolio categories
* [ ] Confirm bridal workflow
* [ ] Confirm courses and education offers
* [ ] Confirm course pricing
* [ ] Confirm testimonials
* [ ] Confirm Instagram strategy
* [ ] Confirm contact workflow
* [ ] Confirm booking requirements
* [ ] Confirm whether calendar integration is useful
* [ ] Confirm final languages
* [ ] Confirm social and external links
* [ ] Apply approved Home changes

---

# Phase 6 — Site Architecture

The Home, navigation and internal pages have different purposes.

## Home

The Home tells the brand story and introduces important paths.

## Navigation

The navigation acts as a map to the main destinations.

Initial main navigation:

```text
The Artist
Services
Portfolio
Education
Book
```

## Internal Pages

Internal pages should provide depth, information or functionality that the Home does not provide.

A page should not exist simply because a related section exists on the Home.

---

# Phase 7 — The Artist

Route:

`/about`

Purpose:

Present Bruno, his story and the identity behind BMV Makeup.

Potential content:

* [ ] Bruno's story
* [ ] Professional journey
* [ ] Brazil → Barcelona
* [ ] Makeup philosophy
* [ ] Professional experience
* [ ] Areas of expertise
* [ ] Languages
* [ ] Behind-the-scenes photography
* [ ] Bruno working with clients
* [ ] Personal / professional portraits
* [ ] Relevant collaborations or achievements

The Home introduces Bruno.

The Artist page tells his story.

---

# Phase 8 — Services

Route:

`/services`

Purpose:

Help visitors understand which BMV service matches their needs.

Current service areas:

* [ ] Weddings
* [ ] Social / Events
* [ ] Campaigns
* [ ] Photoshoots
* [ ] Artistic Makeup
* [ ] Audiovisual / Camera Makeup

Final grouping should be confirmed with Bruno.

Potential future architecture:

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

Do not create individual service pages until enough content exists to justify them.

---

# Phase 9 — Weddings

Potential route:

`/services/weddings`

Weddings deserve deeper treatment because bridal work is an important part of BMV Makeup's business.

The Home should preview the bridal experience without positioning the entire brand exclusively around weddings.

Potential page structure:

1. Bridal Hero
2. Bridal Philosophy
3. From Prep to Celebration
4. Bridal Portfolio
5. Bridal Party
6. What's Included
7. Bridal Reviews
8. Wedding FAQ
9. Request Your Date

## From Prep to Celebration

Potential journey:

1. First Contact
2. Planning
3. Trial
4. Wedding Morning
5. Final Touches
6. Celebration

Final workflow must be confirmed with Bruno before implementation.

---

# Phase 10 — Portfolio

Route:

`/portfolio`

Purpose:

Allow visitors to deeply explore Bruno's work.

Unlike the Home preview, this page should prioritize photography over explanation.

Potential filters:

* All
* Bridal
* Beauty
* Editorial
* Campaigns
* Artistic
* Audiovisual

Tasks:

* [ ] Define final categories
* [ ] Collect photography
* [ ] Curate photography
* [ ] Optimize images
* [ ] Build portfolio layout
* [ ] Add filtering if useful
* [ ] Consider individual projects / editorials if enough material exists

The Portfolio should demonstrate range without becoming visually repetitive.

---

# Phase 11 — Education

Route:

`/education`

Purpose:

Present Bruno's teaching services as a distinct business area.

Potential offers:

* Self-Makeup
* Professional Makeup
* Workshops

Potential content:

* [ ] Who each course is for
* [ ] Course description
* [ ] Duration
* [ ] Format
* [ ] What is included
* [ ] Individual / group options
* [ ] Pricing
* [ ] Available dates if relevant
* [ ] Booking / enquiry CTA

Unlike makeup services, course pricing may be displayed publicly.

The Home should introduce Education.

The Education page should sell it.

---

# Phase 12 — Contact / Book

Route:

`/contact`

Purpose:

Convert interest into qualified enquiries.

The contact experience should eventually adapt to the visitor's intention.

Possible entry options:

* Wedding
* Social / Event
* Campaign
* Photoshoot
* Audiovisual
* Artistic
* Education

Different enquiry types may require different information.

Example:

## Wedding

* Date
* Location
* Getting-ready location
* Bridal party
* Event details

## Commercial

* Production date
* Project type
* Location
* Number of people / talent
* Project details

## Education

* Course
* Individual / group
* Preferred date
* Experience level

Do not build complex forms or booking integrations before Bruno's actual workflow is confirmed.

---

# Phase 13 — Reviews & Social Proof

Reviews should appear where they are most relevant.

Possible strategy:

* Best general reviews → Home
* Bridal reviews → Weddings
* Education reviews → Education
* Relevant professional feedback → Services

Potential sources:

* Google
* Bodas.net
* Direct testimonials

A dedicated Reviews page should only be created if enough content exists to justify it.

---

# Phase 14 — Instagram

The Home should include an Instagram preview.

Purpose:

* Show recent work
* Show variety
* Reinforce Bruno's active professional presence
* Lead visitors to his social content

Implementation options should be evaluated when the section is developed.

Do not introduce unnecessary APIs or backend functionality solely for Instagram.

---

# Phase 15 — Photography

Current development uses placeholders.

Final photography should include, where available:

* Bruno working
* Beauty portraits
* Bridal
* Campaigns
* Photoshoots
* Artistic makeup
* Audiovisual work
* Social makeup
* Behind the scenes
* Bruno portraits

Hero photography should ideally include separate crops or assets when needed for:

* Desktop
* Tablet
* Mobile

Replace placeholders only after photography has been curated.

---

# Phase 16 — Backend & Growth Features

Do not build backend functionality until a real requirement exists.

Potential future features:

* [ ] Admin area
* [ ] Portfolio management
* [ ] Dynamic content management
* [ ] Dynamic testimonials
* [ ] Contact / lead management
* [ ] Booking system
* [ ] Calendar integration
* [ ] Course booking
* [ ] Online payments
* [ ] Blog
* [ ] SEO content
* [ ] Campaign landing pages

These are growth opportunities, not requirements for the initial launch.

---

# Phase 17 — Final Integration

* [ ] Final routes
* [ ] Final navigation
* [ ] Language selector
* [ ] WhatsApp integration
* [ ] Contact forms
* [ ] Google links
* [ ] Bodas.net links
* [ ] Instagram
* [ ] Social links
* [ ] Final testimonials
* [ ] Final photography
* [ ] Remove all placeholders
* [ ] Remove unused code and assets
* [ ] Review component reuse
* [ ] Review project structure
* [ ] Check for dead CSS and dead code

---

# Phase 18 — Launch

* [ ] SEO
* [ ] Metadata
* [ ] Social sharing metadata
* [ ] Accessibility review
* [ ] Keyboard navigation
* [ ] Performance review
* [ ] Image optimization
* [ ] Lazy loading
* [ ] Responsive QA
* [ ] Cross-browser testing
* [ ] Production build review
* [ ] Vercel deployment
* [ ] Custom domain
* [ ] Final production QA

---

# Architecture Principle

The project should not force symmetry between Home sections, navigation items and internal pages.

Use the following rule:

**Home = narrative**

**Navigation = map**

**Internal pages = depth and action**

A Home section does not automatically need:

* A menu item
* A dedicated page

A menu item does not automatically need:

* A Home section

An internal page does not automatically need:

* Direct exposure on the Home
* A top-level navigation item

Pages may exist deeper within the information architecture when that creates a more natural user journey.

---

# Development Principle

Before creating a page, ask:

**What can the visitor understand or do here that they cannot already understand or do on the Home?**

If there is no strong answer, do not create the page.

Before adding something to the main navigation, ask:

**Is this an important destination someone may reasonably want to access directly?**

Before adding a Home section, ask:

**Does this help create desire, explain the brand, demonstrate the work, build trust or lead toward conversion?**

---

# Current Development Flow

Continue developing progressively:

```text
Home section
↓
Desktop
↓
Tablet
↓
Mobile
↓
Review
↓
Commit
↓
Next section
```

Do not leave dead code, unused assets, temporary implementations or unnecessary abstractions behind.

---

# Next Steps

1. Configure multilingual architecture with nested translation keys
2. Refine the current Explore the Work section
3. Build Selected Work
4. Build Weddings Preview
5. Build Behind the Brush
6. Continue through the approved Home journey
7. Complete responsive Home
8. Present complete Home to Bruno
9. Collect final photography and business requirements
10. Begin internal pages only after the Home and site architecture are validated

```
```
