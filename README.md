# Re:Pixel Studio

A responsive, dependency-free website based on the supplied reference screenshots. Includes Home, Games, Our Team, and Contact pages, supplied artwork and team photos, mobile layouts, animated curtain navigation, reduced-motion support, and a validated contact form. The logo links to Home; the navigation lists Home, Games, Our Team, and Contact, with a hamburger menu on phones. The green curtain includes a quick spin of the supplied alien artwork.

## Run locally

With Node.js 20 or newer installed, run `npm run dev` (or `node server.cjs`) and open http://localhost:3000. No dependency installation is needed. Set `PORT` to use another port.

`npm run check` checks JavaScript syntax. `npm test` checks page generation, image paths, team portraits, curtain navigation, reduced-motion behavior, and email draft encoding. Restart the preview server after changes to `server.cjs` (including JPG support).

## Before launch

- The supplied logo, Glorp, Home page pizza and planet exports, group photo, and five portraits are in `assets`. The Games page uses the supplied pizza badge and store graphics in `game_assets`.
- Team pages use resized PNG copies in `assets/web`, which also work with preview servers started before JPG support was added. Keep these files in deployments; the original JPGs are preserved.
- Supply the gameplay preview and confirmed Steam/Epic game URLs. The store graphics currently display as images, with no invented store destinations.
- Set the confirmed studio email address in the contact form's `mailto:` URL in `app.js`. Currently it opens an email draft with no recipient and asks the visitor to add one. It does not send or store messages. For direct submission, connect a form service or backend.
- Confirm the intended fonts. Nunito and DM Mono are loaded from Google Fonts with local fallbacks.
- Add confirmed social links and business details if desired.

The Figma file was not accessible during implementation; the supplied image is the visual reference. The design is an approximation pending original assets and full-resolution details.

## Deploy

GitHub Pages publishes the site at https://lynettehemingway.github.io/re-pixel_studio/.

Push changes to `main` to deploy. The workflow in `.github/workflows/pages.yml` runs syntax and interaction checks, copies only the static website files into a deployment artifact, and publishes it to Pages. `server.cjs` is only a local preview server and is not deployed.

For another static host, publish `index.html`, `games.html`, `team.html`, `contact.html`, `styles.css`, `app.js`, and the `assets` and `game_assets` folders. There are no runtime dependencies.
