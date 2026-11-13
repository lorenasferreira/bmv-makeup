# Repository validation

Validated locally on 13 November 2026. No commit, push or deployment was performed.

## Repository organization

- Public image masters: **52**, with **78** colocated responsive variants (**130 files**).
- **129 active files renamed/moved**, one stable social JPEG URL retained, and **five source inputs moved** outside the public build.
- **47 unused/duplicate photo files removed**, including the redundant lower-resolution master of the shared Hero/Selected Work portrait. Distinct approved crops were preserved.
- The isolated temporary photo-selection tool and its **284 files** were removed; no application route depended on it.
- **24 obsolete reports, exports and documentation files** were removed after useful technical material was consolidated; the design system was separately moved and updated.
- One unused Instagram placeholder dataset and seven public Finder metadata files were removed. The actual Instagram component and API were preserved.
- **363 files removed**, excluding renamed/moved files. Generated build/test output remains ignored.
- Public image directory: **72.49 MiB → 10.81 MiB**, approximately **85.1% smaller**. This measures deployed asset inventory, not the bytes downloaded by one page.
- No new package dependency was introduced.

## Preservation checks

- Approved masters and all retained responsive exports remain byte-identical to their existing files. The three final supplied JPEGs and the two other retained inputs were verified by SHA-256 after moving.
- Hero: exactly five images per device, approved order retained; preload, picture sources, arrows, autoplay and wraparound verified.
- About, Services, Weddings, Portfolio, Education, Home and Contact remain on the same public routes.
- Existing header/navigation code, routing, translations, SEO component, Instagram API/UI and Vercel configuration were verified unchanged against the start of this cleanup.
- Initial HTML differs only in its two renamed Home preload URLs. All manually authored metadata text, including the Open Graph description, is identical to the starting version.
- The social JPEG remains at the same URL and dimensions; favicon and local fonts/licenses are retained.
- Old image directories and temporary selection-tool paths have no remaining repository consumers.

## Checks

| Check | Result |
| --- | --- |
| ESLint | Passed |
| Vite production build | Passed |
| Translation tests | 8 passed |
| Image integrity tests | 3 passed; paths, sizes, master hashes, CSS focal-point selectors and manifest completeness |
| Browser suite | All 87 scenarios passed across the full run and targeted reruns |
| Final affected browser scenarios | 26/26 passed after completing path and focal-point-selector migration |
| Image decoding | All 130 master/variant exports decoded; nonblank-pixel checks passed |
| Build preview | Local photos verified in 56 route/language/viewport combinations |
| Existing route coverage | Seven routes × four languages × four widths (320, 390, 768, 1440 px) |
| Broken images / obsolete active paths | None found |
| README screenshots | 10 relative paths exist, decode, and render in a local image-gallery preview |
| Git whitespace validation | Passed |

The initial full browser run passed 85/87 scenarios; two Education assertions still contained old filename suffixes. Those expectations were migrated and both passed on rerun. The final affected set then passed all 26 scenarios, including the four retained Portfolio object-position rules and marquee behavior. A preexisting strict geometry comparison now permits a half-pixel rounding tolerance. No product layout change was made to address test precision.

## About marquee speeds

Each animation travels one group width; durations are calculated from the same pixels-per-second rate, rather than assigned equal seconds. The first row retains its previous responsive speed. The second row now matches it.

| Viewport | Before: upper / lower | After: upper / lower |
| --- | --- |
| 390 px | 31.27 / 77.92 px/s | 31.27 / 31.27 px/s |
| 1440 px | 51.43 / 131.29 px/s | 51.43 / 51.43 px/s |

Automated checks cover PT, EN, ES and CA, both viewport sizes, resizing and reduced motion. Duplicate groups remain equal in width and cover the viewport; text and directions are unchanged.

## Lighthouse comparison

One fresh local production-build run per viewport, before and after, using the same static preview server implementation and Lighthouse presets on this machine. The preview returns an empty Instagram feed without querying Meta. These are lab measurements, not production field metrics or a guarantee of identical results on every run.

| Viewport / build | Performance | Accessibility | Best practices | SEO | FCP / LCP | TBT | CLS | Transferred resources |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mobile / before | 100 | 100 | 100 | 100 | 1.21 / 1.21 s | 31 ms | 0 | 1.77 MiB |
| mobile / after | 100 | 100 | 100 | 100 | 1.20 / 1.20 s | 25 ms | 0 | 1.78 MiB |
| desktop / before | 100 | 100 | 100 | 100 | 0.29 / 0.29 s | 0 ms | 0 | 1.47 MiB |
| desktop / after | 100 | 100 | 100 | 100 | 0.29 / 0.29 s | 0 ms | 0 | 1.47 MiB |

No meaningful performance regression was measured. More descriptive paths and the width-aware motion code slightly increase JS/HTML bytes; the image migration itself preserves encoded photo bytes, loading priorities and responsive sizes.

## Screenshots and external follow-up

The ten optimized WebP screenshots total **304.0 KiB**, with seven desktop and three mobile views. They were captured from the final local build and visually reviewed. README image paths were decoded in a local browser preview; GitHub-hosted rendering was not published or externally verified.

After publication, validate public asset access, deep links, social crawler caches, production performance and live Instagram authorization. The last reported Meta token failure remains pending authorization to replace it; safe renewal, persistent storage, scheduling and monitoring are future work. Distinct language URLs / initial language HTML and valid hreflang remain outside this cleanup.

## Source comment cleanup

The follow-up removed 27 comments from 15 authored code/configuration files, including three XML comments in the favicon, plus descriptive comment headings in `.gitignore`. No tool, compiler or runtime directive needed to remain. Standalone font licenses and third-party legal notices remain intact. The useful implementation notes now live in `maintenance.md`, architecture documentation and the test README.

A parser-based scan verified zero comments in all 120 authored JavaScript, JSX, CSS, HTML and SVG files. JavaScript ASTs and CSS declarations were compared during removal. RouteScroll explicitly retains the undecoded fragment in its catch branch so removing the explanatory comment does not leave an empty catch; behavior is unchanged. The favicon tags, attributes and text are identical after comments and formatting whitespace are ignored.

Follow-up checks passed: lint, production build, eight translation tests, three image integrity tests and 24 browser scenarios covering image decoding/placements, Hero sequences, all seven routes in the four languages, responsive widths and scroll restoration. Existing image bytes, responsive metadata, initial HTML, manual sharing descriptions, Instagram logic, translations and Vercel settings were checked against the start of this follow-up and remain unchanged.

The image migration and authorized deletions are already applied on disk; no cleanup proposal or legacy-directory dependency remains outstanding. The social image keeps its existing semantic filename and public URL.
