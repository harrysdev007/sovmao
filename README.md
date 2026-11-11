# sovmao

React website for SOVMAO, built with Vite and custom CSS.

## Local development

Requires Node.js 18 or newer.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` directory to any static hosting service. No environment variables or API keys are required.

## Features

* Full-screen video hero with muted autoplay, looping and a sound toggle.
* Official X link: https://x.com/sovmao_sol
* Six-image meme gallery with an accessible image viewer and downloads.
* Local salute interaction, stored per visitor in their browser.
* Responsive layout and reduced motion support.
* Navigation without URL fragments.
* Anton and Oswald poster typography, with local font fallbacks.

## Files

* `src/main.jsx`: page content and React interactions.
* `src/style.css`: theme, layout and responsive styles.
* `public/media/hero.mp4`: current hero video.
* `public/media/`: gallery images and character artwork.
* `public/favicon.png`: SOVMAO profile image used as the site icon.

Artwork was created for this project with image generation tools. Fonts are loaded from Google Fonts. The site uses no backend, wallet connection or analytics service.
