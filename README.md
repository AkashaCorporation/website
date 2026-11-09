# Akasha website

Public AI, cybersecurity and systems-engineering website for Akasha Corporation.

- Portuguese: https://akashacorporation.com/
- English: https://akashacorporation.com/en/
- Hosting: GitHub Pages, published from `main` at the existing custom domain in `CNAME`.

## Develop

Node.js 20 or later is sufficient. There are no npm dependencies and no package installation is needed.

```sh
npm run dev
```

The preview defaults to port 3000. `PORT` and `--port` are supported.

## Edit and validate

1. Update both languages in `scripts/content.mjs`.
2. Update the semantic templates in `scripts/build.mjs` when necessary.
3. Edit `styles.css` and `site.js` for presentation and progressive enhancements.
4. Run `npm test` and `git diff --check`.
5. Commit the generated HTML and sitemap along with the source changes.

`npm test` regenerates the four localized pages, 404 page and sitemap. It then checks internal links, metadata, translation completeness, accessibility attributes, image dimensions, content guardrails, mobile navigation states and clipboard success/failure handling. The `Website checks` workflow repeats these checks on GitHub and verifies that the generated pages are committed.

Check desktop and phone layouts before deployment, including menu open/close, Escape, anchor navigation, language links, privacy pages and browser Back/Forward. Check reduced motion and JavaScript-disabled navigation when changing relevant styles or behavior. Automated checks are not a complete accessibility audit.

## Publish and rollback

The existing GitHub Pages deployment builds from the committed files. Keep `CNAME` unchanged unless the domain configuration is intentionally changed. `.nojekyll` makes these static files independent of Jekyll processing.

After pushing to `main`, inspect the Pages workflow for that exact commit, then check the live Portuguese and English pages and assets. Do not treat a successful push alone as a successful deployment.

To roll back a published redesign, revert its commit and push the revert. Avoid force-pushing or resetting shared history.

## Content and privacy

Product descriptions are grounded in public documentation. See [content sources](docs/content-sources.md). Distinguish stable releases, pre-releases and research. Do not imply certifications, guaranteed results, commercial service commitments or customer relationships without evidence and approval.

The site loads no third-party fonts, runtime scripts, analytics or embeds. JavaScript only controls the mobile menu and copies the published support email. The site has no form or backend. Contact opens the visitor's email application; no email is sent by the website itself.

The original `Akasha.png` is retained. The former React/Babel files and original upload/screenshot assets are preserved as historical source material; they are not loaded by the current website. New generated pages are regular HTML and remain readable without JavaScript.
