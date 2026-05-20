# V-Dumblog

Developed with Vue3 + Tailwind + DaisyUI.

A simple and dumb blogging platform with an editor in-browser (you need to commit/upload your files after editing them). Made to be an simpler alternative to Jekyll.

## Customizations

On the settings.json file you'll find options to customize your blog title, avatar, bio, social networks (leave the fields empty, don't delete them if you don't want them showing up!), and ability to select how many posts will be shown on the home page.

## Themes

Dumblog is fully themeable. The default theme is **Magi** — a CRT terminal aesthetic inspired by the MAGI supercomputer system. You can also switch to any built-in DaisyUI theme or create your own custom themes.

### Switching themes

Set the `theme` field in `public/assets/settings.json`:

```json
{
  "blogTitle": "My Blog",
  "theme": "magi"
}
```

No rebuild needed for DaisyUI built-in themes — just change the value and reload.

### Built-in themes

#### Custom themes

| Theme | Description |
|-------|-------------|
| `magi` | **(Default)** CRT terminal look — dark green-on-black, monospace font, scanlines, vignette, screen flicker. Based on the MAGI Supercomputer System dashboard. |

#### DaisyUI built-in themes

Any [DaisyUI theme](https://daisyui.com/docs/themes/) works out of the box. Some highlights:

| Theme | Description |
|-------|-------------|
| `dark` | Clean dark theme |
| `light` | Clean light theme |
| `cupcake` | Soft pastel light theme |
| `cyberpunk` | Neon yellow/pink on dark |
| `valentine` | Pink/rose light theme |
| `forest` | Deep green dark theme |
| `aqua` | Blue-toned theme |
| `dracula` | Purple/green dark theme |
| `night` | Deep blue dark theme |
| `nord` | Arctic blue-grey theme |
| `sunset` | Warm orange/red theme |

Full list: https://daisyui.com/docs/themes/

### Creating a custom theme

1. Create a new CSS file in `src/themes/` (e.g. `src/themes/mytheme.css`):

```css
[data-theme="mytheme"] {
  /* DaisyUI color overrides */
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

  /* Fonts */
  --font-sans: "Your Font", sans-serif;
  --font-header: "Your Header Font", sans-serif;

  /* Border radius */
  --radius-box: 0.5rem;
  --radius-field: 0.5rem;
  --radius-selector: 0.25rem;
}
```

2. Import it in `src/style.css`:

```css
@import "./themes/mytheme.css";
```

3. Set it in `settings.json`:

```json
{
  "theme": "mytheme"
}
```

You can add any additional CSS inside the `[data-theme="mytheme"]` block — component overrides, effects, scrollbar styling, etc. See `src/themes/magi.css` for a full example.

## Creating and editing posts

You can go to (e.g.) `YOUR_USERNAME.github.io/#/editor` to see the online editor. From there you can create and edit posts. To have those posts reflect on Github, you need to place and commit the files it generates in the `public/assets/posts` folder of your install.

## Running locally

First run `npm install` then run `npm run dev` and it should open automatically on `http://localhost:5173/`.

## Build

Run `npm run build` to build it. It'll automatically update the index.html title based on the title in the settings.json file.

## Contributing

Fork it, please.

## Why?

Because I always thought Jekyll to be too convoluted and I wanted something dumb and simple. The code isn't an example of awesomeness but it does the job and pretty well at that.

## License

UNLICENSE