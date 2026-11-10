# AkashaCorporation website

Official product website for Akasha Corporation, a Brazilian AI-first and cybersecurity startup.

- English default: https://akashacorporation.com/
- Brazilian Portuguese: https://akashacorporation.com/pt-br/
- Hosting: GitHub Pages from `main:/` with the custom domain preserved in `CNAME`.

## Architecture

The site is static, dependency-free and generated from one bilingual content source.

- `scripts/content.mjs`: canonical English and PT-BR content, product stages and legal copy.
- `scripts/build.mjs`: semantic page generator.
- `styles.css`: responsive visual system.
- `site.js`: language state, mobile navigation, terminal replay and early-access dialog.
- Generated pages are committed for GitHub Pages.

English is visible without JavaScript. PT-BR has its own indexable route. The language control switches every visible interface string instantly without storage or network requests.

## Develop and validate

Node.js 20 or later is sufficient. There are no npm dependencies.

```sh
npm run dev
npm test
git diff --check
```

`npm test` regenerates the landing pages, localized legal pages, 404 page and sitemap. It then runs more than 240 assertions covering links, language parity, metadata, legal identity, claim guardrails, accessibility structure, privacy and deployment files.

Manual browser QA remains required for desktop and phone layouts, menu/dialog focus, language switching, terminal replay and reduced-motion behavior. Automated checks do not replace an accessibility audit.

## Content contract

The website distinguishes:

- public, shipping engineering;
- private research in active setup;
- planned roadmap targets;
- provider architecture targets that are not partnerships or endorsements.

The Sovereign SLM program deliberately has no final product name, parameter count, license claim or public-weight promise until evaluation is complete. HexCore's current LLVM/MLIR 18.1.8 runtime is distinct from the LLVM/MLIR 22 migration target.

Security-program references describe disclosure channels used by the team. They are not customer claims, partnerships or permission to publish confidential reports.

## Privacy and contact

The site loads no third-party fonts, scripts, analytics or embeds. It has no backend and stores no form data. The early-access dialog prepares a `mailto:` request in the visitor's email client.

Legal, privacy, terms and ethical-use copy is generated in English and PT-BR. Product and legal facts are tracked in [content sources](docs/content-sources.md).

## Publish and rollback

Keep `CNAME` unchanged. After merging to `main`, verify the exact GitHub Pages deployment and then inspect the live English/PT-BR routes and legal pages. A successful push alone is not deployment acceptance.

Rollback with a normal revert commit. Do not force-push shared history.
