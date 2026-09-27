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

No environment variables are needed — there is no backend. `app/.env` / `VITE_*` are unused; an old `app/.env` may still exist locally or on the prod server, but nothing reads it.

## Architecture

A single-page Russian-language CV/resume. No router, no Redux, no local persistence — the CV is a static JSON (`src/data/cv.json`) imported at build time.

- `src/main.jsx` — entry point: imports global styles, mounts `<App />` with `createRoot`, and unregisters the service worker left behind by old CRA builds (without that, returning visitors keep getting the cached 2021 bundle).
- `src/App.jsx` imports `src/data/cv.json`, puts it into `DataContext.Provider` and renders a fixed `Profile` header (large at the top of the page, shrinks to a slim bar once scrolling starts; contains photo, name, position, city/age, `PrintButton`, `Contacts`) above a CSS-grid body: sticky `SectionNav` (left) + `RightContainer` (right, `<main>`). There is no grid library — reactstrap and react-sticky-box were removed. Section order: `About`, `Skills`, `WorkExperience`, `Education`, `Languages` — a short «Обо мне» first (who he is and what work he is looking for), then skills so a recruiter can match the stack at a glance, then experience. `Courses` is deliberately not rendered while there is only one (2009) course.
- `src/components/helpers/data-context.js` — a single `DataContext`. Every section component (`Profile`, `WorkExperience`, `Skills`, `Education`, `Courses`, `About`) reads it with `React.useContext(DataContext)` and guards each field with optional chaining; nothing is passed down as props. New sections should follow that pattern instead of threading props.
- `src/components/helpers/helpers.jsx` — shared formatting: `formatMonth` (`Intl.DateTimeFormat`), `normalizedDuration` / `normalizedCompanyDuration` / `totalExperienceMonths` (hand-rolled month math), `declarationOfNumbers` (Russian plural forms), and `SectionTitle`, the section header used by every section. Dated items (jobs, education, courses) share the `.entry` markup: a date column (`entry__period`, rendered by `WorkPeriod` for jobs) next to `entry__body`.
- `SectionNav.jsx` is a scrollspy table of contents built from `helpers/sections.js`; each section carries the matching `id`. A new section needs an entry there and an `id` on its `<section>`. It deliberately uses a passive `scroll` listener: the reading line slides down over the last half-screen so short bottom sections still become active — IntersectionObserver alone skipped them on tall screens.
- `Contacts.jsx` hard-codes the contact links. The owner asked to show only city and age as facts (no work format, relocation or total experience in the header) and does not publish a phone number — do not add those back.

### File extensions

Vite's esbuild only parses JSX in `.jsx` files. Any component file containing JSX must be `.jsx`; plain modules (`data-context.js`, `sections.js`) stay `.js`.

### Data (src/data/cv.json)

This JSON is the single source of truth — effectively the site's database. To change any text on the site, edit this file and commit (push to `master` deploys).

Shape: camelCase `fullName`, `cvHeadline`, `age`, `location` (`{city, country}`), `about`, `experiences[]` (`startDate`/`endDate`/`companyName`/`location`/`position`/`description`/`technologies[]`), `education[]`, `languages[]` (`name`/`level`, optional `note`), `courses[]`, `skills[]`. `description` and `about` are HTML strings rendered with `html-react-parser`. Total experience is computed from the dates in `helpers.jsx`; there is no `experience_total` field.

The data was originally transcribed from the owner's Habr Career profile (`career.habr.com/ekhlusov`, private — needs his login), and has since been edited by hand (ЕШКО condensed, duplicate «Технологии»/«Стек» paragraphs removed, «Обо мне» extended). The owner wants plain hyphens (`-`) instead of em/en dashes (`—`, `–`) in CV texts — keep it that way when editing. `src/assets/ekhlusov.json` is a stale 2019 snake_case export that nothing imports — do not treat it as the current contract.

## Styling

Global SCSS only, compiled by dart-sass: `src/index.scss` imports `assets/styles/{colors,styles,print}.scss`. Bootstrap (`bootstrap.scss`, reboot only) is imported in `main.jsx` *after* `index.scss` (the CRA order, preserved deliberately — flipping it changes which rules win). Because reboot comes later it overrides plain `body`/`a` rules, so the base font is set as Bootstrap Sass variables in `bootstrap.scss`, theme colors are applied via `html body` and `.cv a`, and print font size is set on `.cv`, not `body`. Light/dark themes follow `prefers-color-scheme` through the CSS variables in `colors.scss`; print always forces the light palette. Class names are short BEM (`profile__name`, `section__title`, `entry__period`, `skills__item`); there are no CSS modules or styled-components.

Visual rules (tokens, type scale, what is banned) are in the root `DESIGN.md`; color tokens live in `colors.scss`.

`sass` is pinned to `~1.77` on purpose: the stylesheets still use `@import`, which newer dart-sass floods with deprecation warnings. Migrating to `@use` means reworking how `styles.scss`'s variables reach the other partials.

`print.scss` is the "export to PDF" mechanism: `PrintButton` calls `window.print`, and the print media query turns the page into a single-column A4 document (photo + contacts header, then sections) and hides the button and skip link. The current CV fits exactly two pages — re-check with a PDF after changing print spacing or content. Width media queries in `styles.scss` are `screen`-only on purpose: an A4 page is narrower than 900px and would otherwise pick up the mobile layout.

## UI language

All user-facing strings, and most code comments, are in Russian. Keep new copy in Russian and format dates/durations through the helpers in `helpers.jsx`.

## Deployment

Push to `master` triggers `.github/workflows/main.yml`, which SSHes to the prod host, runs `git fetch && git reset --hard && git pull` in `/var/www/react-ekhlusov-new-site`, then `docker-compose stop/build/up -d frontend`. `git reset --hard` means anything uncommitted on prod (other than gitignored files) is discarded.

The image is a two-stage build (`containers/node-nginx/Dockerfile`): node 22 runs `npm ci && npm run build`, nginx serves `build/` with an SPA `try_files` fallback; the container's :80 is published on host :10035.
