# BMV Makeup — Project Context

## Status

**Initial development — August 2026.**

Visual exploration completed.

Initial concepts are being reviewed with Bruno before the final visual system is defined.

---

## Project Goal

Create a premium digital presence for **BMV Makeup**, presenting Bruno Menezes as a professional makeup artist whose work combines:

- Artistry
- Beauty
- Identity
- Versatility
- Human connection
- Client experience

The website should not feel like a traditional beauty salon website.

The work itself — especially faces, makeup and portrait photography — should be the visual protagonist.

---

## Brand

**BMV Makeup**

Professional makeup artist based in Barcelona.

Bruno's Brazilian background is part of the brand story and personality, but should be represented without obvious visual clichés such as flags, green and yellow palettes or tourism-inspired imagery.

Barcelona should also appear subtly through atmosphere, architecture, interiors and natural light rather than explicit tourism imagery.

---

## Stack

- React 19
- Vite
- React Router DOM
- CSS Modules
- React Icons
- Vercel

Backend technology will only be selected when actual backend requirements are confirmed.

---

## Architecture

Single Git repository prepared to contain:

- `frontend/`
- `backend/`

The backend should remain minimal until dynamic functionality is actually required.

Development principles:

- Plan UX before coding
- Do not create empty folders
- Create components when they are needed
- Reuse components when real repetition exists
- Avoid unnecessary abstractions
- Keep content separated from presentation where useful
- Desktop → Tablet → Mobile
- Validate each section before moving forward
- Do not build speculative backend functionality

---

## Visual Direction

Several concepts were explored during discovery:

### Minimal Luxury

Clean, sophisticated and premium.

Strong whitespace and restrained visual composition allow the makeup work to remain the focus.

### Editorial Beauty

Inspired by luxury beauty editorials and portrait photography.

Faces, skin, makeup details and dramatic compositions become the main visual language.

### The Experience

More human and emotional.

Shows Bruno working with clients, behind-the-scenes moments and the relationship between artist and client rather than only finished results.

---

## Current Direction

The final visual direction may combine elements from the explored concepts.

Current principles:

- Faces are the protagonists
- Portraits over generic lifestyle photography
- Makeup must remain visible
- Large photography
- Editorial rhythm
- Generous whitespace
- Minimal interface
- Limited body copy
- Bruno should appear throughout the experience
- Human moments should balance polished portfolio imagery
- Barcelona should be felt rather than explained
- Brazilian identity should be part of the story without becoming a visual cliché
- Design should support bridal, beauty, editorial, events and creative makeup

---

## Home — Initial Structure

Current working structure:

1. Header
2. Hero
3. Selected Work
4. The Artist
5. Beauty Philosophy
6. Explore My Work
7. The Experience
8. Behind the Brush
9. Kind Words
10. FAQ Preview
11. Final CTA
12. Footer
13. Scroll to Top

This structure is not final.

Sections should only be implemented when they contribute meaningfully to the user journey.

---

## Photography

Final BMV Makeup photography has not yet been collected.

Development will initially use placeholder imagery.

Placeholder images are temporary and should help validate:

- Composition
- Cropping
- Aspect ratios
- Responsive behavior
- Visual rhythm
- Portfolio layouts

They should not determine the final brand identity.

Once Bruno provides his material, the final photography should be curated rather than simply uploading every available image.

---

## Portfolio

The portfolio should demonstrate Bruno's versatility rather than positioning BMV Makeup exclusively as a bridal brand.

Potential categories:

- Bridal
- Beauty
- Editorial
- Creative
- Events
- Before & After

Final categories must be confirmed with Bruno.

---

## Potential Interactions

Ideas currently being explored:

- Full-screen Hero
- Hero photography transitions
- Portrait-focused visual storytelling
- Subtle image reveals
- Editorial scroll transitions
- BMV logo loading animation
- Behind-the-scenes video
- Portfolio filtering

Interactions should remain subtle and premium.

Avoid animation that exists only for decoration.

---

## Pending Client Decisions

Confirm with Bruno:

- Preferred visual direction
- Desired brand perception
- Priority client type
- Final services
- Portfolio categories
- Available photography
- Available video / behind-the-scenes material
- Which reviews can be published
- Google review source
- Bodas.net profile
- Languages
- Booking workflow
- WhatsApp contact
- Social links
- Whether pricing should appear
- Whether education / workshops should have dedicated content
- Future admin requirements

---

## Backend

Do not build backend functionality yet.

Potential future requirements:

- Portfolio management
- Admin area
- Dynamic reviews
- Content management
- Booking functionality

The backend architecture should be decided only after these requirements become concrete.

---

## Documentation

- `README.md` → public project overview
- `PROJECT_CONTEXT.md` → decisions, constraints and current project state
- `ROADMAP.md` → development progress
- `frontend/DESIGN_SYSTEM.md` → visual system once defined

---

## Resume From Here

Next development session:

1. Review Bruno's feedback
2. Confirm initial visual direction
3. Define the first Design System decisions
4. Build the Header
5. Build the Hero
6. Validate the visual direction before developing additional Home sections

Do not create folders, components, pages or backend functionality until they are actually needed.