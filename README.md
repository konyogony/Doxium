# Doxium

An easy solution to generate modern documentation in Next.js

## Roadmap

**Bold -> Important**
_Italics -> Not sure_

-   [x] Configure Next.js
-   [x] Configure Shadcn
-   [x] Write files
-   [x] (SSR) Link github (edit in gh button)
    -   [ ] Convert to SSG somehow
-   [x] Colors
-   [ ] Codeblock customisation
    -   [x] Shiki themes
    -   [ ] **Visibility**
    -   [ ] Icons
    -   [ ] Languages (tsx, rs)
    -   [x] **highlighting**
-   [x] Fonts
-   [x] Rename "Home Page" to use 'docs' folder.
-   [ ] Fix turbo enabled by default (idk whyyyyyyyyyyyy)
-   [ ] Clean up code
-   [x] Host schema not on github.
-   [ ] Clean up console
-   [ ] Stripping Github repo from config.
-   [ ] _dark/light theme seems hard and cringe_
-   [x] Bug-fixing
-   [ ] _Use vertisan icons_
-   [ ] _Make pages for folders (toggleable)??_
-   [x] Make config file?
-   [x] Lib & Other aliases
-   [ ] **Make TOC SSG**
-   [ ] **Better errors in CLI**
-   [x] Make code use alias
-   [ ] **Automate structure!**
-   [ ] Languages (en, ru)
-   [ ] User-made themes -> marketplace?
-   [ ] Custom Readme
-   [ ] Add spinner (https://www.npmjs.com/package/cli-spinners) -> For different PM, diffferent spinner?
-   [ ] Mobile support
-   [x] Home page toggleable
    -   [ ] Being able to toggle later on
-   [x] **Accent color, shadcn color - differ them**
-   [ ] _Make an API so owner can get data from docs_
-   [x] https://www.npmjs.com/package/commander
    -   [ ] Add better args and `-y`, etc..
-   [x] (half working) add decor dotted to everything
-   [ ] https://shiki.matsu.io/packages/transformers
-   [x] Disable breadcrumb if page doesnt exist (just disabled everything)
-   [x] Fix spacing between lines in codeblock
-   [x] Add $Schema to config
-   [ ] Custom checkboxes
-   [ ] Make highlighter SSG
-   [x] Hover color `accent` -> `base`
-   [ ] _Add author to the end of page + last updated_ -> Actually really hard
-   [ ] Check if emoji's parse
-   [ ] _Make Doxium Integrate (only docs folder)_
-   [x] Add alias to the config for doxium components
-   [x] Fix fonts
-   [ ] footer
-   [ ] Windows support
-   [ ] Bunx doxium update
-   [ ] dont forget to remove console.logs
-   [ ] toggleable folder/list. if folder -> have pages
-   [x] https://www.npmjs.com/package/picocolors?activeTab=readme
-   [x] **https://www.npmjs.com/package/@vercel/ncc _VERY GOOD_** -> use `ncc build src/index.ts -o dist` to build, dk how to link yet
-   [x] https://www.npmjs.com/package/fast-glob
-   [x] execa -> https://www.npmjs.com/package/cross-spawn
-   [x] Fix '(node:208623) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. (Use `node --trace-deprecation ...` to show where the warning was created)' --> Issue with my node version, fixed by `nvm install 20.5.1`, `nvm use 20.5.1`

## Deployment

-   [ ] Website
-   [ ] Setup npm & gh page
-   [ ] Docs
-   [ ] Logo

## Techstack (Doxium)

-   [Next.js](https://nextjs.org/)
-   [shadcn](https://ui.shadcn.com/)
-   [Tailwindcss](https://tailwindcss.com/)
-   [MDX](https://mdxjs.com/)

## Techstack (create-doxium-app)

-   [NCC](https://www.npmjs.com/package/@vercel/ncc)

## Author

Main developer, [konyogony](https://github.com/konyogony)
My tester and a friend who helped, [PadowYT2](https://github.com/padowyt2), checkout his work!
