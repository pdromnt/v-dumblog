# V-Dumblog

Developed with Vue3 + Tailwind + DaisyUI.

A simple and dumb blogging platform with an editor in-browser (you need to commit/upload your files after editing them). Made to be an simpler alternative to Jekyll.

## Customizations

On the settings.json file you'll find options to customize your blog title, avatar, bio, social networks (leave the fields empty, don't delete them if you don't want them showing up!), and ability to select how many posts will be shown on the home page.

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