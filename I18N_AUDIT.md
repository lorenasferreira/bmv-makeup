BMV Makeup i18n migration — 25 September 2026

**Result**

All seven routes now use react-i18next for their authored UI copy, including headings, paragraphs, service/course data, image descriptions, placeholder labels, review text and controls, portfolio filters/counts, navigation accessibility labels, and WhatsApp messages. PT is the source and fallback language; the existing default selection remains EN when no preference is saved.

Each of PT, EN, ES and CA contains the same 370 nonempty translation keys. Existing Portuguese dictionary values and Portuguese component copy were preserved verbatim. English wording that previously differed from PT (including the Home artist statement) now follows the Portuguese source. Existing JSX elements, emphasis, explicit line breaks and CSS classes were preserved; no CSS was changed for this migration.

Language changes update the document's `lang`, Instagram date formatting and WhatsApp message language immediately. Instagram captions remain the original API content, not machine-translated copy. Names, BMV/Makeup branding, social platform names, handles, phone numbers, prices and numerical counters remain invariant. Existing naming conventions such as Weddings, Beauty & Social, Destination Weddings, VIP, Night and cut crease are retained where appropriate.

Removed only seven confirmed-unused keys: `footer.book`, `footer.contact`, `footer.instagram`, `footer.navigation`, `footer.reviews`, `footer.social`, and `home.instagram.handle`. Dynamic keys used by ExploreTheWork and plural forms remain in all dictionaries.

**Files changed in this migration**

37 JSX component files under `frontend/src/components/`:

| Area | Components |
| --- | --- |
| Shared | LanguageSwitcher, Header, MobileMenu, Footer |
| Home | Hero, MeetBruno, SelectedWork, WeddingsPreview, BehindTheBrush, KindWords, EducationPreview, InstagramPreview |
| About | AboutHero, AboutStory, AboutRange, AboutClosing |
| Services | ServicesHero, ServicesOverview, ServicesExperience, ServicesCTA |
| Portfolio | PortfolioHero, PortfolioGallery, PortfolioCTA |
| Education | EducationHero, EducationIntro, EducationCourses, EducationProfessional, EducationCTA |
| Contact | ContactHero, ContactOptions, ContactCTA |
| Weddings | WeddingsHero, WeddingsIntro, WeddingsProcess, WeddingsReviews, WeddingsPartners, WeddingsCTA |

Also changed `frontend/src/i18n/index.js`, all four `frontend/src/i18n/locales/*.json` files, and `frontend/package.json`. Added `frontend/scripts/i18n.test.js` and this report. Page wrappers, routes, assets and CSS were not changed. The earlier Hero CSS restoration, prior audit report and user's pre-existing variables.css edit remain intact.

**Verification**

- `npm run test:i18n`: eight passing checks covering key parity, nonempty values, interpolation, factual numbers, plural counts, and direct resolution in each language with fallback disabled.
- `npm run build`: passes.
- `npx eslint src scripts`: passes. Full-project lint still has the previously reported `process` globals error in `api/instagram.js`; this migration does not change that server file or lint configuration.
- Static source checks: no missing literal key references; all previous Portuguese strings retained; JSX element/style structure unchanged. Remaining hardcoded rendered strings are names, brands, language codes or invariant numeric information. Unused Instagram placeholder data is not rendered.
- Chrome: switched PT → EN → ES → CA → PT on each of seven routes (35 page/language checks); exercised every review and portfolio category. No missing translations, raw key strings, runtime errors or console warnings. Selected language, local storage and document language agree. WhatsApp messages switch to the selected language.
- Mobile menu: all four languages switch and update their labels and Hero copy.
- Instagram: local API fixtures with/without captions and with image/video types confirm translated links, fallback accessible labels and locale-aware dates in all four languages, with no runtime errors. Actual Meta/Vercel production connectivity was not tested.

**Still requires Bruno's confirmation**

The following existing claims and provisional content were translated faithfully, without adding or changing information:

- More than eight years of experience, the Brazil → Barcelona biography, and worldwide/destination-wedding availability.
- Final service names/groupings and whether Weddings, Beauty & Social and Destination Weddings should remain English conventions in every locale.
- Wedding process stages and included services, especially the trial and celebration wording. The code currently says “Da Visão à celebração”; older client notes reference “From Prep to Celebration”. The current code's meaning was retained.
- Course names, content and format: VIP/Night at €170 individually or €300 for two; bridal professional module at €300; duration up to four hours; 15-minute coffee break; student-supplied model or additional €60. All facts are unchanged.
- The precise intended technique behind “Otimização de cores”. Translated literally as colour optimisation, without inferring colour theory, colour correction or colour analysis.
- Existing review wording and permission/accuracy of translated testimonials, particularly the Clare/Marina summaries.
- The recommended-professionals section remains “coming soon”; no people or partnerships were invented. Final names and relationships still need confirmation.
- Final approval of Portuguese copy and the new EN/ES/CA translations. Missing-image alt text uses only existing category/context information; final photography may warrant more specific descriptions.

This report supersedes the translation findings in FRONTEND_AUDIT.md. Its unrelated asset, responsive, accessibility and CSS findings remain outside this migration.
