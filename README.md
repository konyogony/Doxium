# Doxium

An easy solution to generate modern documentation in Next.js

## Roadmap

-   [x] Configure Next.js
-   [x] Configure Shadcn
-   [x] Write files
-   [x] (SSR) Link github (edit in gh button)
    -   [ ] Convert to SSG somehow
-   [x] Colors
-   [ ] Codeblock customisation
    -   [ ] Visibility
    -   [ ] Icons
    -   [ ] highlighting
    -   [ ] Add auto coloring??
-   [x] Fonts
-   [ ] Clean up code
-   [ ] Clean up console
-   [ ] _dark/light theme_ seems hard and cringe
-   [x] Bug-fixing
-   [ ] Use vertisan icons
-   [ ] Make pages for folders (toggleable)??
-   [ ] Make config file?
-   [ ] Make TOC SSG
-   [ ] Automate structure!
-   [ ] Themes?
-   [ ] Custom Readme
-   [ ] Add spinner (https://www.npmjs.com/package/cli-spinners)
-   [ ] Mobile support
-   [x] Home page toggleable
    -   [ ] Being able to toggle later on
-   [ ] Accent color, background color, shadcn color - differ them
-   [ ] Make an API so owner can get data from docs
-   [x] https://www.npmjs.com/package/commander
    -   [ ] Add better args and `-y`, etc..
-   [x] (half working) add decor dotted to everything
-   [ ] Disable breadcrumb if page doesnt exist
-   [ ] footer
-   [ ] dont forget to remove console.logs
-   [ ] toggleable folder/list. if folder -> have pages
-   [ ] ~~Learn how to actually make a CLI~~ impossible
-   [x] https://www.npmjs.com/package/picocolors?activeTab=readme
-   [x] **https://www.npmjs.com/package/@vercel/ncc _VERY GOOD_** -> use `ncc build src/index.ts -0 dist` to build, dk how to link yet
-   [x] https://www.npmjs.com/package/fast-glob
-   [x] execa -> https://www.npmjs.com/package/cross-spawn
-   [x] Fix '(node:208623) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. (Use `node --trace-deprecation ...` to show where the warning was created)' --> Issue with my node version, fixed by `nvm install 20.5.1`, `nvm use 20.5.1`

## Deployment

-   [ ] Website
-   [ ] Setup npm & gh page
-   [ ] Docs

## Techstack (Doxium)

-   [Next.js](https://nextjs.org/)
-   [shadcn](https://ui.shadcn.com/)
-   [Tailwindcss](https://tailwindcss.com/)
-   [MDX](https://mdxjs.com/)

## Techstack (create-doxium-app)

-   [NCC](https://www.npmjs.com/package/@vercel/ncc)

## Author

Sole developer, [konyogony](https://github.com/konyogony)
