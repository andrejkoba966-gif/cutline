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
- `.openai/hosting.json` — existing Sites deployment configuration

## Deployment

Serve `dist/` as a static website. The current Sites deployment is configured separately; pushing to GitHub alone does not update it.

## Content notes

The inquiry form prepares text to copy; it does not send messages to a server. Studio contact details still need to be provided. Gallery concepts and sample reviews are labelled as demonstrations.
