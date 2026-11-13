# Instagram integration and maintenance

The existing implementation is `frontend/api/instagram.js`. The Home requests `/api/instagram`; the function reads `INSTAGRAM_ACCESS_TOKEN` from its server environment and fetches profile and media data from Meta. It normalizes posts and returns the username, profile picture URL and posts. Successful responses use `s-maxage=3600, stale-while-revalidate=86400`.

The browser never receives the access token. The existing failure diagnostic logs status codes and selected Meta error fields, without the token or full authenticated request URL. Preserve that diagnostic. The UI handles empty feeds, missing data, HTTP/network errors and invalid JSON with the existing fallback.

The last reported production issue was HTTP 500 caused by Meta rejecting the token with OAuthException code 190. It has not been reverified against the live account during repository cleanup. A replacement token still requires Bruno’s authorization. No credentials, API logic, hosting configuration or environment values were changed.

## Future work, after authorization

- Renew a long-lived token safely according to Meta’s rules at implementation time.
- Store the token and expiry in persistent, access-controlled server storage.
- Schedule renewal before expiry and handle failed refreshes and revoked access.
- Monitor validity, scheduled executions and errors, with alerts that never disclose credentials.

These items are pending; they are not implemented by this documentation. Tests use mocked endpoint responses and do not validate live Meta authorization.

Use a Vercel preview or production environment to verify the full function. The ordinary Vite server does not provide serverless API emulation; a working visual fallback there is expected. Never add the server token to a `VITE_` variable, screenshots, fixtures, logs or committed environment files.
