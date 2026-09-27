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

- `src/main.jsx` — entry point: imports global styles, mounts `<App />` with `createRoot`, and unregisters the service worker left behind by old CRA builds (without that, returning visitors keep getting the cached 2021 bundle).
- `src/App.jsx` calls `useFetch()`, shows `Skeleton` (a page-shaped placeholder) while loading, then puts the payload into `DataContext.Provider` and renders a fixed `Profile` header (large at the top of the page, shrinks to a slim bar once scrolling starts; contains photo, name, position, city/age, `PrintButton`, `Contacts`) above a CSS-grid body: sticky `SectionNav` (left) + `RightContainer` (right, `<main>`). There is no grid library — reactstrap and react-sticky-box were removed. Section order: `Skills`, `WorkExperience`, `Education`, `About` — skills first so a recruiter can match the stack at a glance. `Courses` is deliberately not rendered while there is only one (2009) course.
- `src/components/helpers/hooks.js` — `useFetch` is the only data-access point: GET `$VITE_BACKEND_URL/api/v1/main` with the Basic header, unwraps `json?.data`. **If the backend is not configured or the request fails it falls back to `src/mocks/cv.json`**, so the page never hangs on the spinner; the fallback is announced via `console.warn`/`console.error`.
- `src/components/helpers/data-context.js` — a single `DataContext`. Every section component (`Profile`, `WorkExperience`, `Skills`, `Education`, `Courses`, `About`) reads it with `React.useContext(DataContext)` and guards each field with optional chaining; nothing is passed down as props. New sections should follow that pattern instead of threading props.
- `src/components/helpers/helpers.jsx` — shared formatting: `formatMonth` (`Intl.DateTimeFormat`), `normalizedDuration` / `normalizedCompanyDuration` / `totalExperienceMonths` (hand-rolled month math), `declarationOfNumbers` (Russian plural forms), and `SectionTitle`, the section header used by every section. Dated items (jobs, education, courses) share the `.entry` markup: a date column (`entry__period`, rendered by `WorkPeriod` for jobs) next to `entry__body`.
- `SectionNav.jsx` is a scrollspy table of contents built from `helpers/sections.js`; each section carries the matching `id`. A new section needs an entry there and an `id` on its `<section>`. It deliberately uses a passive `scroll` listener: the reading line slides down over the last half-screen so short bottom sections still become active — IntersectionObserver alone skipped them on tall screens.
- `Contacts.jsx` hard-codes the contact links. The owner asked to show only city and age as facts (no work format, relocation or total experience in the header) and does not publish a phone number — do not add those back.

### File extensions

Vite's esbuild only parses JSX in `.jsx` files. Any component file containing JSX must be `.jsx`; plain modules (`hooks.js`, `data-context.js`) stay `.js`.

### API payload

The live API returns camelCase (`fullName`, `cvHeadline`, `experiences[]` with `startDate`/`endDate`/`companyName`/`location`/`position`/`technologies[]`, `education[]`, `courses[]`, `skills[]`, plus `experience_total` in months). Descriptions arrive as HTML with literal `\n` sequences and are rendered with `html-react-parser` after newline→`<br />` replacement.

`src/mocks/cv.json` matches this shape and is the offline fallback; it was transcribed from the owner's Habr Career profile (`career.habr.com/ekhlusov`, private — needs his login), which is the place to refresh it from. `src/assets/ekhlusov.json` is a stale 2019 snake_case export that nothing imports — do not treat it as the current contract.

## Styling

Global SCSS only, compiled by dart-sass: `src/index.scss` imports `assets/styles/{colors,styles,loading,print}.scss`. Bootstrap (`bootstrap.scss`, reboot only) is imported in `main.jsx` *after* `index.scss` (the CRA order, preserved deliberately — flipping it changes which rules win). Because reboot comes later it overrides plain `body`/`a` rules, so the base font is set as Bootstrap Sass variables in `bootstrap.scss`, theme colors are applied via `html body` and `.cv a`, and print font size is set on `.cv`, not `body`. Light/dark themes follow `prefers-color-scheme` through the CSS variables in `colors.scss`; print always forces the light palette. Class names are short BEM (`profile__name`, `section__title`, `entry__period`, `skills__item`); there are no CSS modules or styled-components.

Visual rules (tokens, type scale, what is banned) are in the root `DESIGN.md`; color tokens live in `colors.scss`.

`sass` is pinned to `~1.77` on purpose: the stylesheets still use `@import`, which newer dart-sass floods with deprecation warnings. Migrating to `@use` means reworking how `styles.scss`'s variables reach the other partials.

`print.scss` is the "export to PDF" mechanism: `PrintButton` calls `window.print`, and the print media query turns the page into a single-column A4 document (photo + contacts header, then sections) and hides the button and skip link. The current CV fits exactly two pages — re-check with a PDF after changing print spacing or content. Width media queries in `styles.scss` are `screen`-only on purpose: an A4 page is narrower than 900px and would otherwise pick up the mobile layout.

## UI language

All user-facing strings, and most code comments, are in Russian. Keep new copy in Russian and format dates/durations through the helpers in `helpers.jsx`.

## Deployment

Push to `master` triggers `.github/workflows/main.yml`, which SSHes to the prod host, runs `git fetch && git reset --hard && git pull` in `/var/www/react-ekhlusov-new-site`, then `docker-compose stop/build/up -d frontend`. `git reset --hard` means anything uncommitted on prod (other than gitignored files like `.env`) is discarded.

The image is a two-stage build (`containers/node-nginx/Dockerfile`): node 22 runs `npm ci && npm run build`, nginx serves `build/` with an SPA `try_files` fallback; the container's :80 is published on host :10035.
