# Architecture

BMV Makeup is a React 19 single-page application built with Vite 8. The active application and its package scripts live in `frontend/`; there is no separate backend service or database.

## Routes and content

`frontend/src/App.jsx` defines `/`, `/about`, `/services`, `/services/weddings`, `/portfolio`, `/education` and `/contact`. A wildcard renders the translated 404. Pages compose sections from `src/components/sections/`; common behavior belongs in `components/common/`, and the header/footer live in `components/layout/`.

Content is maintained in `src/i18n/locales/{pt,en,es,ca}.json`. English is the initial selection, Portuguese the fallback, and localStorage retains a visitor’s choice. These are shared routes, not separate URLs for each language.

## Navigation and motion

The header uses React Router links and separate submenu disclosure controls. Services stays highlighted on its Weddings descendant, while `aria-current="page"` identifies the actual route. Recommended Professionals targets `/services/weddings#recommended-professionals`. `RouteScroll` handles fragments and scroll restoration; section scroll margins account for the header.

The Smart Sticky Header follows scroll direction and remains available while focused or expanded. The mobile menu uses a native modal dialog with focus handling and scroll cleanup. ScrollReveal progressively enhances sections; content remains readable if IntersectionObserver is unavailable. Motion styles include reduced-motion alternatives.

About’s two marquees contain two identical copies of each text group. Each loop travels one group width. A ResizeObserver calculates durations as `groupWidth / pixelsPerSecond`, deriving the common speed from the first row and its responsive base duration. Text changes, font loading and viewport changes therefore preserve equal perceptible speed even though the two groups have different widths. Directions and text are unchanged; reduced motion disables both animations.

## Asset delivery

Photos are served from `public/assets/images/`, grouped by page/use. Cross-page photographs live in `shared/`. Responsive variants are adjacent to their masters, with width suffixes such as `-480w.webp`, `-960w.webp` or `-128w.webp` for avatars. Approved masters and variants retain their existing encoded bytes during the repository migration.

The shared structured-bodice portrait has one high-resolution master for the mobile Hero and Selected Work; cards retain their smaller existing variants. Other photographs with distinct approved crops remain separate assets.

`src/data/image-metadata.json` is the maintained delivery manifest: URL, intrinsic dimensions, byte sizes and variants. `OptimizedImage` consumes it. The Hero has five desktop/mobile pairs and uses `<picture>` to avoid downloading the other viewport’s set. Only the initial slide has high fetch priority; the Home-only initial preload selects the same device-specific source.

`image-sources/` holds five retained inputs outside the public build. They support the latest replacements and portrait/share-image maintenance. Other existing WebP masters can regenerate their responsive variants; no external curation folder is required to build or test the site.

## Metadata

`frontend/index.html` supplies the initial canonical, Open Graph and Twitter card tags. Their manually authored descriptions are independent of the translation dictionaries and must be preserved. The social JPEG remains at `/assets/images/social/bmv-makeup-bruno.jpg` (1200 × 630).

`SeoMetadata` updates titles, descriptions, canonical URLs and language metadata after JavaScript executes. Vite emits one initial HTML document; it does not prerender each route or language. Distinct language URLs and corresponding initial HTML are required before adding valid hreflang. No such architectural change is included.

## Server integration

The only application endpoint is `frontend/api/instagram.js`, a Vercel server function using native fetch. See [Instagram](instagram.md). Neither local Vite development nor `vite preview` executes that function. Browser tests intercept only the endpoint boundary, leaving production UI code unchanged.

## Styling and fonts

CSS Modules isolate section styles. Shared colors, typography, spacing and transitions are defined in `src/styles/variables.css`, with global rules and local WOFF2 declarations beside it. Font license files remain under `public/fonts/`. The [design system](design-system.md) documents the visual principles; CSS tokens are authoritative.
