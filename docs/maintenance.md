# Maintenance

## Image conventions

Public photos live in `frontend/public/assets/images/`:

```text
images/
├── home/{hero/desktop,hero/mobile,artist,explore-work,selected-work,behind-the-brush,weddings,testimonials}/
├── about/
├── services/{beauty,weddings,artistic}/
├── weddings/testimonials/
├── portfolio/{beauty,weddings,artistic}/
├── education/bridal/
├── shared/{beauty,weddings,artistic}/
└── social/
```

Use descriptive kebab-case names based on visible content and use, rather than private catalogue IDs. Keep responsive variants beside the master with width suffixes. Use a shared master across pages when the photograph and approved crop are the same; do not merge distinct approved crops. Do not rename the stable social image casually, as it is referenced by the initial sharing metadata.

`src/data/image-metadata.json` drives loading and intrinsic dimensions. `tests/fixtures/approved-images.json` stores approved master hashes, Hero order and page placements. It contains no private workstation paths or curation notes. Do not update its hashes simply to make an unapproved photograph change pass tests.

### Replacing an approved photo

1. Locate and preserve the source, inspect orientation and framing, and verify that any supplied clean version is used.
2. Export a WebP without unnecessary upscaling or cropping. Use a descriptive new filename when the photo changes so public caches get a new URL.
3. Generate the sizes actually needed by the component. Update the manifest’s URLs, intrinsic dimensions and byte sizes, and then the approved fixture for the authorized change.
4. Update every consumer, including Hero source/preload pairs where applicable. Preserve manually authored metadata text. Check all usages in desktop and mobile.
5. Run `npm run test:images`, browser image tests, lint and build. Delete an obsolete file only after no required consumer references it.

The existing responsive WebPs are already generated. No image conversion tool is required for installation, build or tests. If new variants are needed, `cwebp` is an optional external maintenance tool; prefer a retained source when available, otherwise use the maintained high-resolution master. For example, from `frontend/`:

```sh
cwebp -q 84 -m 6 -metadata none -resize 480 0 public/assets/images/services/artistic/clown-makeup-portrait.webp -o public/assets/images/services/artistic/clown-makeup-portrait-480w.webp
```

Do not re-encode existing approved photos merely to reorganize paths. Avoid repeated lossy conversions. HEIC input needs a compatible decoder before browser delivery; check the actual format rather than assuming it from the extension.

### Retained source inputs

`frontend/image-sources/` retains the three final supplied JPEGs, the About portrait source used for the social derivative, and the shared beauty portrait input. Their names and folders describe the current content; their original bytes are preserved. They are not copied into `dist/`. The website and tests do not depend on the external curation tool or photo catalogue.

## Cache and SEO

Public assets keep their filenames in Vite builds rather than receiving automatic content hashes. The semantic path migration therefore creates new photo URLs and avoids reusing cached bytes under old names. Encoded bytes, responsive sizes, lazy loading and priority settings remain unchanged. The social image URL remains stable, and the only initial HTML edits are the two renamed Home preload sources.

No redirect/configuration changes were made. After deployment, confirm new assets are publicly available and deep links work. Old CDN/browser/social caches and external links directly to removed image URLs are outside local validation; refresh sharing caches only if necessary. Do not restore duplicate legacy files solely for old internal references: fix the consumer.

## Content and accessibility

Keep Bruno’s professional name exactly **Bruno Mënezess**. Update PT, EN, ES and CA together and run `test:i18n`. Preserve facts, approved pricing, photograph order, semantic headings, keyboard navigation, image alt text and reduced-motion behavior. Campaigns, Photoshoots and Audiovisual remain About versatility terms, not standalone Services or Portfolio categories.

Changing marquee content or fonts requires checking pixel speeds, duplicate widths and seamless loops in all languages at mobile and desktop sizes. The existing ResizeObserver recalculates durations when group widths change.

## Documentation and screenshots

Keep this README and technical documents current rather than generating permanent per-round reports. Screenshots in `docs/screenshots/` are real viewport captures from a local production build, saved as compressed WebP. Refresh them when the visible product changes. Preserve relative paths and review their language, framing and file weights before committing.

Run checks from `frontend/`. `npm test` runs translation, asset integrity and browser tests; Playwright needs port 4273 free. Its output directories are ignored. See [test instructions](../frontend/tests/README.md).

## Outstanding external checks

A local build cannot confirm Meta token validity, Vercel’s dashboard settings, public CDN availability, social-platform cache refresh or final production performance. Language-specific initial HTML/hreflang and production activation of the prepared token renewal remain separate future work; see [architecture](architecture.md) and [Instagram](instagram.md).

## Source comment policy

Authored JSX, JavaScript, CSS, HTML, SVG and configuration files contain no explanatory or historical comments. Put technical explanations in these documents or the README. Retain a source comment only if a tool, compiler or runtime actually requires its directive; none were necessary in this revision. Third-party packages, generated output and standalone license notices are not authored source and must retain their required legal notices.

Keep the mobile navigation breakpoint aligned across MobileMenu, Header and LanguageSwitcher styles (currently 1000 px). RouteScroll handles malformed URI fragments by retaining the undecoded fragment instead of failing page rendering. Browser tests intercept only the Instagram network boundary, leaving the production components unchanged; reveal tests observe animation frames to avoid missing transitions on slower machines.
