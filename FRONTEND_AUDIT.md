BMV Makeup frontend audit — 25 September 2026

Reviewed all frontend pages, components, styles, translation dictionaries, asset references, routing, and configuration before restoring the Hero. No sections were redesigned and no approved copy was changed. Findings below remain open.

**Changes made**

- `frontend/src/components/sections/home/Hero/Hero.jsx`: restored six editorial labels from the version preceding commit `b1f8e83`; removed photographic slide data and image rendering.
- `frontend/src/components/sections/home/Hero/Hero.module.css`: restored the six tonal backgrounds and placeholder typography; removed photo-specific overlays/zoom rules. Preserved current heading/layout breakpoints, four-second carousel interval, counter, 1.2-second fade, reduced-motion transition override, and existing translation calls.
- `FRONTEND_AUDIT.md`: this report.

The pre-existing edit to `frontend/src/styles/variables.css` was left untouched. Original Hero photographs remain on disk, unused by the Hero.

**Validation**

- Chrome: all seven routes at 320, 390, 640, 768, 1024, and 1440px with EN, PT, ES, and CA selected (168 page checks), plus targeted 641/700px, keyboard, and interaction checks.
- All existing internal route links and Home anchor targets resolve. Each existing route has one H1. Portfolio filters return 24 total items / four per category.
- Hero counter verified through 01 → 06 → 01; six labels/backgrounds verified; no Hero images; CTA reaches `#portfolio`; reduced-motion disables the fade. Desktop/mobile screenshots inspected.
- Production build and Hero ESLint check pass. Full lint fails at `frontend/api/instagram.js:2`: `process` is undefined under the browser-only ESLint globals configuration.
- No uncaught JavaScript errors or console warnings observed on the seven existing routes. An unknown route emits React Router's “No routes matched” warning and shows only header/footer.
- Scope: local Chrome/Vite, not Safari/Firefox or deployed Vercel/Meta integration. Broken image decoding was checked separately from console output.

**Assets — high priority**

47 referenced image files are absent:

| Route | Missing images | Components |
| --- | ---: | --- |
| `/about` | 4 | AboutStory (portrait/client), AboutClosing (two backstage images) |
| `/services` | 8 | ServicesHero, ServicesOverview (six), ServicesExperience |
| `/portfolio` | 24 | PortfolioGallery (every item) |
| `/education` | 5 | EducationHero, EducationCourses (two), EducationProfessional (two) |
| `/services/weddings` | 6 | WeddingsHero, WeddingsIntro, WeddingsProcess (four) |

Additionally, `public/assets/images/home/explore-work/{campaigns,social,artistic}.jpg` contain HEIF/HEIC data rather than JPEG data. All three fail to decode in Chrome. Home's other editorial placeholders are intentional, not missing asset requests.

**Responsive behavior**

- About at 320px: document width 345px, driven by AboutStory's manifesto text/grid.
- Services at 320px: document width 322px, driven by the Photoshoots service row.
- Education at 320/390px: document width 341/412px, driven by EducationCourses' “Automaquiagem” heading.
- Weddings at 320px: document width 341px, driven by WeddingsProcess's heading.
- Header at 641px: document width 656px; desktop navigation/language controls no longer fit just above the mobile breakpoint. The 700px header is also tightly packed.
- Opening the mobile menu, then resizing above 640px, hides the menu but leaves `body` scrolling locked.
- React Router link navigation retains the previous scroll position: `/portfolio` at scrollY 1200 → `/about` still at scrollY 1200. Plain anchor navigation reloads the page, so behavior differs between links.

**Translations and hardcoded copy**

- EN/PT have matching sets of 92 keys. ES/CA dictionaries are empty and fall back to English.
- All four languages lack `home.work.items.{weddings,campaigns,social,photoshoots,artistic,audiovisual}.imageAlt`; Home images expose key strings as alt text.
- All six internal pages contain hardcoded Portuguese/English headings, body copy, CTAs, labels, and image descriptions. Language selection changes shared navigation but not this content.
- Home reviews and their control/rating labels are hardcoded Portuguese. Placeholder labels remain English, including the restored Hero labels.
- Header/Footer/MobileMenu/LanguageSwitcher accessibility labels are hardcoded English. Instagram's “Ver no Instagram” is Portuguese, its fallback label is English, and dates always use `pt-BR`.
- WhatsApp messages live in duplicated per-component language maps instead of i18next; using `resolvedLanguage` means ES/CA can send English messages while their dictionaries are empty.
- Seven unused dictionary keys: `footer.{book,contact,instagram,navigation,reviews,social}` and `home.instagram.handle`.
- `html lang="en"` never updates with the selected language.

**Accessibility basics**

- All rendered image elements have alt attributes; six Home values are unresolved keys. Portfolio descriptions are generic; WeddingsProcess uses step titles rather than descriptions. Service overview images have empty alt attributes and should be reviewed for whether they convey essential portfolio content.
- Mobile menu initially focuses Close and supports Escape, but does not trap focus or restore focus to its opener. Tab from its final language button reaches the page behind it. It lacks modal semantics/background inertness.
- Home lacks a `main` landmark; no skip link is provided. Other routes have `main` landmarks.
- Portfolio filters are native buttons but lack an accessible selected state (`aria-pressed` or equivalent).
- Review auto-rotation pauses only on mouse hover, not keyboard focus; there is no explicit pause control. Reduced-motion CSS removes reveal animation but does not stop automatic content changes. About's duplicated marquee text is also exposed twice to assistive technology.
- Rendered links/buttons have names; navigation uses links and actions use native buttons. Language buttons and some carousel/menu controls have small touch targets.

**CSS and obsolete code**

- `styles/globals.css` imports overlapping Google Font families three times.
- Its later `body, button, input, textarea, select { font: inherit; }` overrides the earlier body font-family. Chrome computes body text as Times despite the DM Sans token.
- `src/index.css` is unused Vite starter CSS. `src/data/instagramPosts.js` is unused placeholder data.
- ExploreTheWork CSS retains a dead `.imagePlaceholder` selector after switching to `.imageWrapper`.
- EducationProfessional references undefined `styles.learning`.
- Repeated declarations exist across section labels, About titles, and Services/Education CTAs. Some repetition is intentional component ownership; consolidation needs a separate scoped change.

**Instagram limitation**

Plain Vite serves `/api/instagram` as JavaScript rather than executing the Vercel function. JSON parsing fails and the component silently hides the feed while retaining the Instagram link. Production feed success, remote media, and credentials were not validated; no credentials were changed.
