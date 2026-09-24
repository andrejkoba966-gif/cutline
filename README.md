# CUTLINE · Kyiv

Ukrainian-language website for the CUTLINE automotive vinyl studio.

## Run locally

No dependencies or build step are required. From the project directory:

```sh
python3 -m http.server 4173 --directory dist
```

Open http://localhost:4173.

## Files

- `dist/index.html` — page content and structure
- `dist/style.css` — styling and responsive layouts
- `dist/app.js` — video controls, galleries, comparisons and inquiry form
- `dist/assets/` — images, fonts and videos
- `.openai/hosting.json` — earlier Sites deployment configuration
- `.github/workflows/pages.yml` — GitHub Pages deployment

## Deployment

GitHub is the single source of truth: edit files here (from Claude, ChatGPT/Codex or by hand) and merge into `main`.

Every push to `main` publishes `dist/` to GitHub Pages via `.github/workflows/pages.yml`. It can also be started manually from the Actions tab (“Deploy to GitHub Pages” → “Run workflow”).

One-time setup: Settings → Pages → Build and deployment → Source: **GitHub Actions**. Free GitHub accounts can use Pages only for public repositories.

The earlier Sites deployment (`.openai/hosting.json`) is separate and is not updated by pushes to GitHub.

## Content notes

The inquiry form prepares text to copy; it does not send messages to a server. Studio contact details still need to be provided. Gallery concepts and sample reviews are labelled as demonstrations.

## Languages

Ukrainian: `dist/index.html`. English: `dist/en.html`. The UA / EN switch remembers the selected language.

After editing Ukrainian content or interactions, update `scripts/en-translations.json` and run:

```sh
python3 scripts/build-english.py
```

Commit the regenerated `dist/en.html` and `dist/en-app.js` alongside the Ukrainian source. Videos retain their original audio.
