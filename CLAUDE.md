# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

Two-level repo: the root is the deployment wrapper (`docker-compose.yml`, `containers/node-nginx/`, `.github/workflows/main.yml`), and **all application code lives in `app/`** — a React 18 + Vite single-page app. There is no root `package.json`; every npm command must be run from `app/`.

The project used Create React App + yarn until the Vite migration (branch `dev`); `node_modules` or a lockfile at the repo root is an accident, installs belong in `app/`.

## Commands

```bash
cd app
npm install
npm run dev       # dev server on :3000
npm run build     # production bundle -> app/build
npm run preview   # serve the built bundle locally
```

`build.outDir` is kept as `build` (not Vite's default `dist`) so the Dockerfile and nginx config did not have to change.

There is no test runner and no lint script — CRA's jest and eslint config went away with react-scripts and were not replaced. Prettier config is `app/.prettierrc` (`useTabs: true`, `arrowParens: "avoid"`), but existing files are inconsistent — match the file you are editing rather than reformatting it.

## Environment

`app/.env` (gitignored, see `app/.env.example`) supplies:

- `VITE_BACKEND_URL` — base URL of the CV API
- `VITE_LOGIN` / `VITE_PASSWORD` — HTTP Basic credentials, optional (without them no auth header is sent)

Vite inlines `VITE_*` into the bundle at build time, so these credentials are public by design; the Basic header is built client-side with `btoa` in `useFetch`. Because the Dockerfile does `COPY ./app ./` before `npm run build`, the production `.env` must exist in the checkout on the prod server — it is never created by CI.

## Architecture

A single-page Russian-language CV/resume. No router, no Redux, no local persistence — one fetch on mount feeds everything.

- `src/main.jsx` — entry point: sets the moment locale, imports global styles, mounts `<App />` with `createRoot`, and unregisters the service worker left behind by old CRA builds (without that, returning visitors keep getting the cached 2021 bundle).
- `src/App.jsx` calls `useFetch()`, shows a `ClipLoader` while loading, then puts the payload into `DataContext.Provider` and renders a two-column reactstrap layout: sticky `Sidebar` (left) + `RightContainer` (right).
- `src/components/helpers/hooks.js` — `useFetch` is the only data-access point: GET `$VITE_BACKEND_URL/api/v1/main` with the Basic header, unwraps `json?.data`. **If the backend is not configured or the request fails it falls back to `src/mocks/cv.json`**, so the page never hangs on the spinner; the fallback is announced via `console.warn`/`console.error`.
- `src/components/helpers/data-context.js` — a single `DataContext`. Every section component (`Sidebar`, `Skills`, `WorkExperience`, `Courses`, `Education`) reads it with `React.useContext(DataContext)` and guards each field with optional chaining; nothing is passed down as props. New sections should follow that pattern instead of threading props.
- `src/components/helpers/helpers.jsx` — shared formatting: `normalizedDuration` / `normalizedCompanyDuration` (moment + humanize-duration), `declarationOfNumbers` (Russian plural forms), and `TitleWithLines`, the section-header component used by every section.
- `src/components/helpers/Fade.jsx` — in-house IntersectionObserver fade-in that replaced `react-reveal` (abandoned, React 16 only). Paired with `assets/styles/fade.scss`; the `.fade-block` class is also neutralised in `print.scss` and under 800px in `styles.scss`.
- `src/moment-ru.js` — the single place that configures moment's Russian locale. Import moment **from here**, not from `"moment"`: under Vite the side-effect import `"moment/locale/ru"` registers against a different moment instance and dates silently come out in English.

### File extensions

Vite's esbuild only parses JSX in `.jsx` files. Any component file containing JSX must be `.jsx`; plain modules (`hooks.js`, `data-context.js`, `Constants.js`, `moment-ru.js`) stay `.js`.

### API payload

The live API returns camelCase (`fullName`, `cvHeadline`, `experiences[]` with `startDate`/`endDate`/`companyName`/`location`/`position`/`technologies[]`, `education[]`, `courses[]`, `skills[]`, plus `experience_total` in months). Descriptions arrive as HTML with literal `\n` sequences and are rendered with `html-react-parser` after newline→`<br />` replacement.

`src/mocks/cv.json` matches this shape and is the offline fallback. `src/assets/ekhlusov.json` is a legacy snake_case export (Habr Career / «Мой круг») that nothing imports — the mock was derived from it, but do not treat it as the current contract.

## Styling

Global SCSS only, compiled by dart-sass: `src/index.scss` imports `assets/styles/{colors,styles,loading,print,achievments,fade}.scss`. Bootstrap CSS is imported in `main.jsx` *after* `index.scss` (the CRA order, preserved deliberately — flipping it changes which rules win). Class names are hand-written BEM-ish (`right-container__work-experience--info-block--item-desc`); there are no CSS modules or styled-components.

`sass` is pinned to `~1.77` on purpose: the stylesheets still use `@import`, which newer dart-sass floods with deprecation warnings. Migrating to `@use` means reworking how `styles.scss`'s variables reach the other partials.

`print.scss` is the "export to PDF" mechanism: `PrintButton` calls `window.print`, and the print media query hides the social block, sticky wrapper, tooltips and print button.

## UI language

All user-facing strings, and most code comments, are in Russian. Keep new copy in Russian and localize dates/durations through `src/moment-ru.js` and the existing `humanize-duration` helpers.

## Deployment

Push to `master` triggers `.github/workflows/main.yml`, which SSHes to the prod host, runs `git fetch && git reset --hard && git pull` in `/var/www/react-ekhlusov-new-site`, then `docker-compose stop/build/up -d frontend`. `git reset --hard` means anything uncommitted on prod (other than gitignored files like `.env`) is discarded.

The image is a two-stage build (`containers/node-nginx/Dockerfile`): node 22 runs `npm ci && npm run build`, nginx serves `build/` with an SPA `try_files` fallback; the container's :80 is published on host :10035.
