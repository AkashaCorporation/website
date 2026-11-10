# AkashaCorporation website

Official bilingual product website for Akasha Corporation, a Brazilian AI-first and cybersecurity startup.

- English default: https://akashacorporation.com/
- Brazilian Portuguese: https://akashacorporation.com/pt-br/
- Hosting: GitHub Pages through the `Deploy website` workflow.

## Architecture

The website uses a small React/Vite runtime with server-side prerendering at build time.

- `src/App.jsx`: accessible bilingual interface and route rendering.
- `src/styles.css`: Gallery/Archive visual system derived from the original Akasha museum concept.
- `scripts/content.mjs`: canonical English/PT-BR facts and legal copy.
- `scripts/postbuild.mjs`: prerenders the root, PT-BR, legal and error routes into `dist/`.
- `scripts/check-built.mjs`: validates the production output and claim boundaries.
- `public/assets/`: optimized editorial artwork and official Akasha product marks.

React hydrates already-rendered HTML. Visitors and crawlers receive complete content before JavaScript runs. GSAP and Lenis are dynamically loaded only for the home-page motion layer; reduced-motion users receive the static composition.

## Develop

Node.js 20 or later is required.

```sh
npm ci
npm run dev
npm test
git diff --check
```

`npm test` creates the client and SSR bundles, prerenders every public route and runs the production contract suite. Build output is intentionally ignored by Git and uploaded directly by GitHub Actions.

## Content contract

The website distinguishes shipped, pre-release, active R&D and planned work. Current public maturity labels include:

- HexCore stable `v3.8.4`;
- Scylla pre-release with a `3.0` product target;
- Hypotenuse `0.2` in development;
- Bari public `v0.7.0`;
- Akasha Sovereign SLM private R&D with codename and specifications pending evaluation.

Cloud providers are architecture targets, not partnership claims. Security-program references describe disclosure channels used by the team, not endorsement. Public product repositories remain authoritative for versions, platforms, licenses and limitations.

## Visual assets

The Hydra Akasha, HexCore, Scylla and Hypotenuse marks come from their official project sources. Museum artwork originates from the preserved first Akasha website prototype and is optimized for web delivery. Asset provenance is recorded in [content sources](docs/content-sources.md).

## Privacy and deployment

The site has no analytics, advertising, account system or backend form. The access dialog prepares a `mailto:` request in the visitor's email client.

The Pages repository must use **GitHub Actions** as its publishing source. A successful workflow is not final acceptance: inspect the live domain, English/PT-BR routes, legal pages, keyboard navigation, reduced motion and mobile layouts before announcing a release.

Rollback through a normal revert commit. Do not force-push shared history.
