# Frontend behavior tests

Run from `frontend/`:

```sh
npm ci
npx playwright install chromium
npm run test:i18n
npm run test:behavior
npm run lint
npm run build
```

`npm test` runs the existing eight i18n tests followed by the browser suite. Playwright starts and stops an isolated Vite server on port 4273; that port must be free. No deployment, credentials or live Instagram account is required.

To use an installed Chrome/Chromium instead of downloading Playwright's browser:

```sh
BMV_BROWSER_PATH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' npm run test:behavior
```

Only `@playwright/test` was added, as a development dependency. The suite runs real Chromium browser behavior, with native dialogs, focus, scrolling and IntersectionObserver; no DOM emulation or animation library is used. Two workers keep the suite lightweight. Retries are disabled so a failure is reported rather than concealed. Failure screenshots and traces are written to ignored `test-results/`; open a trace using `npx playwright show-trace <trace.zip>`.

To validate with WebKit (Safari's engine):

```sh
npx playwright install webkit
BMV_BROWSER=webkit npm run test:behavior
```

## Coverage

- `routes.spec.js`: seven routes in PT/EN/ES/CA at 320, 390, 768 and 1440px (112 route/language/width combinations); page-specific text, document language, overflow, language selection/persistence, SPA scroll reset, anchor navigation and the localized 404/Home link.
- `navigation.spec.js`: mobile menu opening/closing, Escape, focus wrap/return, background scroll lock, navigation and resize cleanup, mobile language switching, all six Portfolio filters and accessible selection, pointer/keyboard scroll-to-top on mobile and desktop.
- `reveal.spec.js`: real scroll-triggered reveals on all seven routes, Heroes excluded, once-only behavior, stable flow geometry, offscreen content remaining unrevealed after ten seconds until scrolled into view, reduced-motion startup/live changes, missing-observer fallback, Hero rotation and review controls.
- `instagram.spec.js`: mocked successful photo/video data, empty/missing data, HTTP/network errors and invalid JSON. Post UI and the usable Instagram fallback are checked without changing the API implementation.
- `header.spec.js`: scroll direction, small-scroll tolerance, focus protection and tall Portfolio visibility after every filter on desktop/mobile.
- `fixtures.js`: shared translation data, network-boundary fixture, scroll helpers and uncaught-error/console-warning checks.

Tests select user-facing roles, names and content rather than generated CSS classes. Reveal tests inspect computed opacity and layout geometry because those are the visible effect being protected; they do not assert animation names or exact timing constants. Existing missing photography is not replaced or mocked. It remains a separate audit finding and is not counted as an application runtime exception.

This suite does not validate live Meta/Vercel connectivity, final photography, client business claims, or actual Safari/Firefox application rendering. WebKit can be run separately as above.
