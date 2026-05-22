# V-Dumblog

> A dead-simple, self-hosted blogging platform. No databases, no build pipelines, no nonsense.

[![Vue 3](https://img.shields.io/badge/Vue-3-42b883?logo=vue.js)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5-5a3ab8?logo=daisyui)](https://daisyui.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite)](https://vite.dev/)
[![License](https://img.shields.io/badge/License-UNLICENSE-blue)](#license)

---

V-Dumblog is a lightweight blog that runs entirely in the browser. Write posts with the built-in markdown editor, customize everything through a single JSON file, and deploy by pushing to GitHub Pages. No server, no database, no CI/CD wizardry required.

It was born out of the opinion that Jekyll is too convoluted for a simple blog. The code isn't an example of awesomeness, but it does the job and pretty well at that.

## Features

- **In-browser editor** -- write and preview markdown posts without leaving the app
- **Zero config deployment** -- push to GitHub Pages and you're live
- **Themeable** -- ships with the Magi CRT terminal theme, plus full DaisyUI theme support
- **Responsive** -- works on desktop and mobile
- **Fast** -- Vite 8 with Rolldown, no SSR overhead, static JSON assets

## Quick start

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/`.

## Build

```bash
npm run build
```

Output goes to `dist/`. The build step automatically updates `index.html` with your blog title from `settings.json`.

## Configuration

All customization lives in `public/assets/settings.json`:

```json
{
  "blogTitle": "My New Blog",
  "yourAvatar": "avatar.png",
  "yourName": "Your Name",
  "yourBio": "Your Bio. Who are you? ;)",
  "yourEmail": "foo@bar.baz",
  "facebook": "",
  "twitter": "",
  "instagram": "",
  "linkedin": "",
  "youtube": "",
  "enableMailMeAt": true,
  "maxPosts": 5,
  "showPoweredBy": true,
  "theme": "magi"
}
```

Leave social fields as empty strings to hide them. Set `maxPosts` to control how many posts appear on the home page.

## Creating posts

Navigate to `/#/editor` in your browser. Write your post, hit save, and it generates a JSON file. Commit that file to `public/assets/posts/` and push -- done.

## Themes

V-Dumblog is fully themeable. The default theme is **Magi** -- a CRT terminal aesthetic inspired by the MAGI supercomputer system.

### Switching themes

Set the `theme` field in `settings.json` and reload:

```json
{
  "theme": "magi"
}
```

No rebuild needed for DaisyUI built-in themes.

### Custom themes

1. Create a CSS file in `src/themes/` (e.g. `src/themes/mytheme.css`):

```css
[data-theme="mytheme"] {
  --color-base-100: #your-darkest-bg;
  --color-base-200: #your-panel-bg;
  --color-base-300: #your-hover-bg;
  --color-base-content: #your-text-color;

  --color-primary: #your-primary;
  --color-primary-content: #your-primary-text;
  --color-secondary: #your-secondary;
  --color-secondary-content: #your-secondary-text;
  --color-accent: #your-accent;
  --color-accent-content: #your-accent-text;

  --color-info: #your-info;
  --color-success: #your-success;
  --color-warning: #your-warning;
  --color-error: #your-error;

  --font-sans: "Your Font", sans-serif;
  --font-header: "Your Header Font", sans-serif;

  --radius-box: 0.5rem;
  --radius-field: 0.5rem;
  --radius-selector: 0.25rem;
}
```

2. Import it in `src/style.css`:

```css
@import "./themes/mytheme.css";
```

3. Set `"theme": "mytheme"` in `settings.json`.

You can add any additional CSS inside the `[data-theme]` block -- component overrides, effects, scrollbar styling, etc. See `src/themes/magi.css` for a full example.

### Built-in themes

| Theme | Description |
|-------|-------------|
| `magi` | **(Default)** CRT terminal look -- dark green-on-black, monospace font, scanlines, vignette, screen flicker. |

Any [DaisyUI theme](https://daisyui.com/docs/themes/) works out of the box. Some highlights:

| Theme | Description |
|-------|-------------|
| `dark` | Clean dark theme |
| `light` | Clean light theme |
| `cyberpunk` | Neon yellow/pink on dark |
| `forest` | Deep green dark theme |
| `dracula` | Purple/green dark theme |
| `night` | Deep blue dark theme |
| `nord` | Arctic blue-grey theme |
| `sunset` | Warm orange/red theme |

Full list: https://daisyui.com/docs/themes/

## Contributing

Fork it, please.

## License

UNLICENSE
