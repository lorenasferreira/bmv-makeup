# BMV Makeup — Project Context

Quick working context for continuing development of the BMV Makeup website across sessions.

For detailed visual rules, see `DESIGN_SYSTEM.md`.
For current tasks and dates, see `ROADMAP.md`.
For Bruno's approvals and pending reviews, see `CLIENT_FEEDBACK.md`.

---

## Project

**BMV Makeup** is the professional brand of Bruno Menezes, a Brazilian makeup artist based in Barcelona.

The goal is to create a premium website that positions Bruno as a versatile makeup artist and strengthens BMV as a professional brand.

The website must not position him exclusively as a bridal artist.

Main areas currently considered:

* Weddings
* Social / Events
* Campaigns
* Photoshoots
* Artistic Makeup
* Audiovisual / Camera Makeup
* Education

Photography and Bruno's work should remain the protagonists.

---

## Client

**Bruno Menezes**

Bruno is directly involved in approving:

* Copy
* Photography
* Service naming and grouping
* Professional history
* Education information
* Business workflows
* Final content

Do not invent personal history, qualifications, workflows, prices or business information that Bruno has not confirmed.

When information is missing, create safe provisional copy that can be reviewed rather than blocking development.

---

## Client Review Strategy

Do not send Bruno the entire website for review at once.

Work progressively:

```text
Build one deliverable
→ Bruno reviews it
→ Continue developing the next
→ Apply feedback
→ Approve Portuguese copy
→ Translate
```

While Bruno reviews one page, development may continue on the next page.

This keeps client review light and reduces large-scale rework.

The Portuguese version is currently the **content approval version**.

Do not spend time finalizing EN / ES / CA copy before Bruno approves the Portuguese content.

---

## Current Status — August 2026

### Home

The Home is structurally complete and responsive.

Current state:

* Desktop implemented
* Tablet implemented
* Mobile implemented
* i18n configured
* Language switcher implemented
* Instagram section prepared
* Real Instagram integration pending final access/setup
* Portuguese copy awaiting Bruno's review
* Final translations should wait for copy approval

The Home is currently the next client-review priority.

### About

Route:

`/about`

About V1 is implemented and responsive.

It has been split into:

```text
AboutHero
AboutStory
AboutRange
AboutClosing
```

Current characteristics:

* Portuguese provisional copy
* Real Bruno photography being used
* Editorial layout
* Animated versatility marquees
* Responsive desktop/tablet/mobile
* Ready for client review

**Do not present About to Bruno before the current Home review.**

After Bruno receives About for review, development can move to Services.

### Next

Primary next internal page:

`/services`

See `ROADMAP.md` for timing and current development order.

---

## Architecture

Current routes:

```text
/
├── /about
├── /services
├── /portfolio
├── /education
└── /contact
```

A deeper Weddings route may eventually exist:

```text
/services/weddings
```

but only if the available content and Bruno's real bridal workflow justify it.

---

## Information Architecture Principle

Use this model:

**Home = narrative**
**Navigation = map**
**Internal pages = depth + action**

Do not force symmetry between them.

A Home section does not automatically require:

* a navigation item
* an internal page

An internal page does not automatically require:

* a Home section
* a top-level navigation item

Before creating a page, ask:

**What can the visitor understand or do here that they cannot already understand or do on the Home?**

If there is no meaningful answer, do not create the page.

---

## Development Stack

Frontend:

* React
* Vite
* React Router DOM
* CSS Modules
* i18next / react-i18next
* React Icons

Deployment:

* Vercel

Domain:

* `bmvmakeup.com`

No backend should be introduced unless a confirmed feature actually requires one.

---

## Code & Architecture Rules

Prefer simple architecture over speculative abstraction.

### Components

Create a component when it has a clear responsibility.

Do not:

* create empty folders
* create components for hypothetical reuse
* over-componentize small markup
* leave obsolete implementations behind

Large page components may be split by meaningful responsibility.

Example:

```text
About
├── AboutHero
├── AboutStory
├── AboutRange
└── AboutClosing
```

This is preferred over either:

* one enormous page component
* one component for every tiny section

### CSS

Use CSS Modules.

Prefer:

* existing design tokens
* responsive `clamp()`
* purposeful breakpoints
* clean component ownership

Avoid:

* unnecessary hardcoded colors
* dead CSS
* duplicated styles without reason
* abstractions created only to reduce line count

---

## Responsive Workflow

Default development order:

```text
Desktop
→ Tablet
→ Mobile
```

Mobile is not simply a scaled-down desktop.

Layout, image crop, spacing, alignment and content order may change when necessary.

Validate responsiveness before considering a development unit complete.

---

## Internationalization

Languages:

* Portuguese
* Spanish
* English
* Catalan

i18n is already configured.

Current workflow:

```text
Develop content in Portuguese
→ Bruno reviews
→ Adjust
→ Approve
→ Translate to EN / ES / CA
```

Do not mix languages in pages currently being prepared for Bruno's review.

Translation keys should remain organized by page/section.

---

## Content Direction

Copy should feel:

* sophisticated
* human
* confident
* concise
* contemporary
* connected to artistry and individuality

Avoid:

* generic luxury copy
* exaggerated marketing language
* beauty clichés
* repetitive claims
* invented biography
* making every sentence sound poetic
* making BMV sound exclusively bridal

Bruno's personality and actual story should gradually replace provisional copy as he reviews the site.

---

## Photography

Photography is central to the product experience.

Prioritize:

* Bruno working
* faces
* makeup close-ups
* real clients
* beauty portraits
* weddings
* campaigns
* photoshoots
* artistic work
* audiovisual work
* behind-the-scenes moments

Real Bruno photography is preferred whenever suitable material exists.

Assets are currently kept under:

```text
public/assets/images/
```

Reference them directly:

```jsx
src="/assets/images/..."
```

Different crops/assets may be used across desktop and mobile when composition requires it.

---

## Business Rules Currently Known

### Makeup Services

Do not assume fixed public pricing.

Pricing may depend on the project/client/context.

### Education

Pricing may be shown publicly when Bruno confirms the final offers and values.

Potential areas include:

* Self-Makeup
* Professional Makeup
* Workshops

### Booking

The final booking workflow is not yet defined.

Do not build calendar, payments or complex booking infrastructure until Bruno's real workflow is confirmed.

### Weddings

Weddings are commercially important but should remain one part of the broader BMV identity.

Do not make the entire website bridal-focused.

The phrase **“From Prep to Celebration” is currently under review** and should not be treated as approved copy.

---

## Working With Existing Code

Before proposing new architecture:

1. Respect the existing project structure.
2. Check whether a component already solves the problem.
3. Preserve working functionality unless there is a reason to change it.
4. Do not rewrite unrelated files.
5. Prefer incremental changes.
6. Keep Bruno's pending approvals in mind before finalizing copy.
7. Commit coherent development units.

When Lorena provides current code, modify that version rather than reconstructing an older version from context.

---

## Documentation Responsibilities

### `PROJECT_CONTEXT.md`

Stable project context, working rules and important current decisions.

### `DESIGN_SYSTEM.md`

Visual language, typography, colors, spacing, motion and reusable UI rules.

### `ROADMAP.md`

Current status, dates, development sequence and next tasks.

### `CLIENT_FEEDBACK.md`

Bruno's pending reviews, approvals, questions and prepared client communication.

Avoid duplicating the same information across all four files.

---

## Resume Rule

When resuming this project in a new session:

1. Read this file for context.
2. Check `ROADMAP.md` for the latest development state.
3. Check `CLIENT_FEEDBACK.md` before assuming Bruno approved content.
4. Use `DESIGN_SYSTEM.md` for visual implementation decisions.
5. Continue from the existing code instead of redesigning already approved work.

When documentation and current code conflict, verify the latest implementation before making large changes.
