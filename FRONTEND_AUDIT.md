# BMV Makeup frontend audit — current state

Updated 27 September 2026 after code hygiene and complete automated validation. This document supersedes the original unresolved-issue list. The approved design, layouts, photography, copy, translations, 404 and scroll-to-top control are preserved. No commit was made by this pass.

## Resolved findings

| Area | Current status |
| --- | --- |
| Home Hero | Restored six tonal editorial slides with translated labels. Existing carousel, counter, transitions and responsive behavior preserved. |
| Internationalization | All seven routes use react-i18next. PT/EN/ES/CA have the same 373 nonempty keys, including the approved 404 message and scroll-to-top label. Selection, persistence and document language are synchronized. Existing eight i18n tests retained. |
| Mobile/tablet overflow | Previously identified About, Services, Education, Weddings and intermediate-width header overflow resolved. Additional Contact/Home heading sizing and Services grid adjustments preserve the editorial compositions. |
| Mobile menu | Native modal dialog, initial focus, Tab/Shift+Tab containment, Escape, focus restoration and hidden-control exclusion implemented. Body/root scrolling is restored on close, navigation, breakpoint changes and effect cleanup. |
| Routing | All seven routes render. SPA navigation resets scroll, Home's portfolio anchor works, and unknown routes show the approved localized 404 with a working Home link. |
| Fonts/CSS | Global form-control reset no longer overrides the body font. Duplicate font imports, unused starter CSS and dead ExploreTheWork selector removed; undefined EducationProfessional class reference removed. Design tokens preserved. |
| Lint | Server-side Node globals configured for the API; no API source change. Full ESLint passes, including the new tests. |
| Accessibility improvements | Home main landmark, accessible Portfolio selected-filter state, hidden duplicate marquee content, and review keyboard/reduced-motion pause behavior are implemented. |
| Scroll-to-top | Reusable translated control works with pointer/keyboard, remains hidden near the top, respects reduced motion, and yields to overlapping links/controls. Approved styling unchanged in this pass. |
| Scroll reveal | Matches the supplied reference: CSS opacity 0 → 1 and translateY(18px) → 0, both 650ms ease, with IntersectionObserver threshold 0.08 and bottom root margin -30px. No stagger. Heroes are excluded. There is no global reveal timer: offscreen sections wait for intersection, reveal once, and are unobserved. Without IntersectionObserver no hiding classes are added. Route cleanup removes enhancement classes; reduced motion, missing observer support and keyboard focus keep content available. No animation dependency or layout changes. |
| Regression coverage | Playwright added only as a development dependency; real browser tests protect navigation, language selection, mobile menu, filters, scrolling, reveal accessibility and Instagram boundary states. |

## Final validation

- Existing i18n suite: **8/8 passing**.
- Complete Playwright suite: **44/44 passing**, in one clean run with one Chrome worker and no retries. Together with the existing i18n suite: **52 total tests passing**.
- Full ESLint: **pass**. Production build: **pass**. `git diff --check`: **pass**.
- Chromium/installed Chrome: all seven routes in PT, EN, ES and CA at **320, 390, 768 and 1440px**: **112 route/language/width combinations**, with no document-level horizontal overflow, missing page-title/description translations, uncaught application errors or console warnings.
- Language changes update visible text, selected state, persisted preference and document language; reload preserves selection. Mobile language controls also tested.
- Mobile menu: opening, close button, Escape, Tab wrap, focus return, background scroll lock, hidden controls, navigation and resize cleanup tested.
- Portfolio: all six categories produce four matching works; All restores 24; accessible selection tracks the active filter.
- Routing: page-specific content, SPA scroll reset, portfolio anchor, all four localized 404 messages and Home recovery link tested.
- Scroll-to-top: mobile/desktop threshold visibility, pointer and Enter activation, actual return to top and immediate reduced-motion scrolling tested.
- Reveal: representative sections on every route fade on intersection, reveal only once, preserve flow position/height, exclude Heroes and remain readable without IntersectionObserver. Delayed-scroll tests verify that offscreen content stays unrevealed after ten seconds and then appears on intersection. Reduced motion at startup and during animation tested. Existing Hero rotation and review controls still work.
- Instagram: mocked image/video success, absent/empty posts, HTTP failure, network failure and invalid JSON preserve Home and the usable Instagram link. Production API/credentials not used or altered.
- Byte comparisons against the pre-pass snapshot confirm public assets, translation dictionaries/configuration, Instagram API/component/styles and design variables unchanged. The final hygiene pass changed no production behavior. Test readiness checks now wait for page loading and visible section reveals; anchor navigation verifies the destination heading is in view, independent of the approved reveal transform.

Run instructions and test scope: [frontend/tests/README.md](frontend/tests/README.md). `npm test` runs both suites; the behavior suite starts its own Vite server on port 4273. Traces/screenshots are retained only on failure and ignored by Git.

## Code hygiene

Reviewed changed implementation, configuration and test files. Removed a redundant test comment and generated Playwright artifacts, and corrected obsolete timer-fallback documentation. No dead/commented-out development code, temporary debug logging or obsolete TODO/FIXME markers remain in the reviewed changed files. Comments retained explain non-obvious constraints. No commit was made.

## Remaining: photography requiring Bruno

**47 referenced files are still absent.** No image paths were changed to conceal missing files.

| Route | Missing files |
| --- | ---: |
| About | 4 |
| Services | 8 |
| Portfolio | 24 |
| Education | 5 |
| Weddings | 6 |

Three Home files, `public/assets/images/home/explore-work/{campaigns,social,artistic}.jpg`, still contain HEIF/HEIC rather than JPEG data and do not decode in Chrome. Bruno's final assets/correct exports remain required. Intentional editorial placeholders remain intentional. Final photography may require more specific alt descriptions.

## Remaining: factual/client confirmation

The approved wording/translations were not changed or reopened for stylistic review. Earlier documented factual/provisional questions remain for Bruno:

- More than eight years of experience, Brazil/Barcelona biography, and worldwide/destination-wedding availability.
- Final service names/groupings and wedding process/inclusions, especially the trial and celebration wording.
- Course formats and stated terms: VIP/Night €170 individually or €300 for two; professional bridal module €300; up to four hours; 15-minute break; student model or additional €60. Existing figures are unchanged.
- Intended technique behind “Otimização de cores”; no technical interpretation was invented.
- Testimonial accuracy/permissions, particularly the Clare/Marina summaries.
- Recommended professionals remain “coming soon”; final people and partnerships require confirmation.

See [I18N_AUDIT.md](I18N_AUDIT.md) for historical migration detail. Its old key count and lint status are superseded by this report.

## Remaining: broader accessibility and cleanup

- Add a skip-to-main link in a separately approved scope.
- Consider explicit pause controls for automatically changing content; reviews already pause on keyboard focus/reduced motion, but a user-visible pause control is absent.
- Review generic image descriptions and decorative/service image choices against final photography.
- Review smaller language/carousel/menu touch targets.
- Unused `src/data/instagramPosts.js` placeholder data remains. Cross-component CSS repetition was retained where consolidation would require broader refactoring.

These items were not silently treated as resolved by the behavior suite; it is not a complete accessibility/conformance audit.

## Remaining: integration and environment limits

Local Vite does not execute the Vercel `/api/instagram` function. Browser tests mock only that endpoint and confirm frontend rendering/fallbacks, not live Meta credentials, remote media availability or production deployment. Live Vercel/Meta verification remains outstanding. Safari/Firefox and physical-device testing were not performed. Known missing/invalid image requests remain distinct from application runtime errors.
