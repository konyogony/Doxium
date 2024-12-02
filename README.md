# Doxium

An easy solution to generate modern documentation in Next.js

## Roadmap

### For alpha release (Release date 22 Dec):

-   [x] Fix turbopack
-   [ ] Make website to present
    -   [ ] Logo
    -   [ ] Document everything
    -   [ ] Create a monorepo
-   [ ] Option to disable starter wiki
-   [ ] Mobile support
-   [ ] Change aliases
-   [ ] Ability to add links and text to sidebar
-   [ ] Add tabs inside code-blocks, which should sync.
-   [ ] Name on code-blocks
-   [ ] More elements
    -   [ ] Revisit alerts
    -   [ ] Make timeline
    -   [ ] Make file tree
    -   [ ] Revisit normal tabs
    -   [ ] Accordion
    -   [ ] Images
    -   [ ] Videos
-   [ ] Make nice footer
-   [ ] Review competitors and reflect

### For beta release (Not in mind yet):

-   [ ] Rework CLI
    -   [ ] `bunx doxium update`, should read new config, then install missing files and generally update everything
    -   [ ] `bunx doxium link`
    -   [ ] Make it more readable and add spinners
-   [ ] Be able to toggle folder/list mode for a group. Maybe implement automatic detection?
-   [ ] Dark / Light theme support (ask at the start)
-   [ ] Make sections and components toggleable
-   [ ] Better search. Instead of searching by the name implement search by contents
-   [ ] Make versioning of docs (v1, v2, ...)
-   [ ] Add multiple language support
-   [ ] Better metadata and SEO optimisations. Show last updated and author name at the end
-   [ ] Custom checkboxes
-   [ ] LaTeX, Mermaid, playground, twoslash custom support?
-   [ ] Make a toggleable api by which you can get raw data from the a webpage including metadata and other stuff

### Unsorted and outdated

-   [x] Configure Next.js
-   [x] Configure Shadcn
-   [x] Write files
-   [x] (SSR) Link github (edit in gh button)
    -   [ ] Convert to SSG somehow
-   [x] Colors
-   [ ] Codeblock customisation
    -   [x] Shiki themes
    -   [x] **Visibility**
    -   [x] CopyButton
    -   [ ] Languages (tsx, rs)
    -   [x] **highlighting**
-   [x] Fonts
-   [x] Fix codeblock bg bug
-   [x] Rename "Home Page" to use 'docs' folder.
-   [ ] Fix turbo enabled by default (idk whyyyyyyyyyyyy)
-   [ ] Clean up code
-   [x] Host schema not on github.
-   [ ] Clean up console
-   [x] Stripping Github repo from config.
-   [ ] _dark/light theme seems hard and cringe_
-   [x] Bug-fixing
-   [x] Use vertisan icons
-   [ ] Move optional options to the bottom
-   [ ] Remove bad looking colours (light themes)
-   [x] Make use of SSG and caching
-   [ ] _Make pages for folders (toggleable)??_
-   [x] Make config file?
-   [x] Lib & Other aliases
-   [x] Move toaster to top if mobile
-   [ ] **Make TOC SSG**
-   [ ] **Better errors in CLI**
-   [x] Make code use alias
-   [x] **Automate structure!**
-   [ ] Languages (en, ru)
-   [ ] _User-made themes -> marketplace?_ dk why tbh
-   [ ] Custom Readme
-   [ ] Add spinner (https://www.npmjs.com/package/cli-spinners) -> For different PM, diffferent spinner, dont want bun to use npm spinner?
-   [ ] **Mobile support**
-   [x] Home page toggleable
    -   [ ] Being able to toggle later on
-   [x] **Accent color, shadcn color - differ them**
-   [ ] _Make an API so owner can get data from docs_
-   [x] https://www.npmjs.com/package/commander
    -   [ ] Add better args and `-y`, etc..
-   [x] (half working) add decor dotted to everything
-   [x] https://shiki.matsu.io/packages/transformers
-   [x] Disable breadcrumb if page doesnt exist (just disabled everything)
-   [x] Fix spacing between lines in codeblock
-   [x] Add $Schema to config
-   [ ] Custom checkboxes
-   [x] ~~Make highlighter SSG~~ idk
-   [x] Hover color `accent` -> `base`
-   [ ] _Add author to the end of page + last updated_ -> Actually really hard
-   [ ] Check if emoji's parse
-   [ ] _Make Doxium Integratable (baseUrl)_
-   [x] Add alias to the config for doxium components
-   [x] Fix fonts
-   [ ] footer
-   [ ] Windows support
-   [x] Table
-   [x] Tabs
-   [ ] Timeline
-   [ ] Filetree
-   [x] Add alerts (bookmark, warning, error, success, tip, accent, base)
-   [ ] Package managers tabs
-   [ ] Add link cards
-   [ ] Add more stuff to sidebar
-   [ ] Better search
-   [x] Fix "edit in github"
-   [ ] Implement changing aliases
-   [ ] Check differences between canary/15
-   [x] More shiki plugins and stuff
-   [ ] Bunx doxium update
-   [ ] toggleable folder/list in sidebar. if folder -> have pages (nice idea but hard)
-   [x] https://www.npmjs.com/package/picocolors?activeTab=readme
-   [x] **https://www.npmjs.com/package/@vercel/ncc _VERY GOOD_** -> use `ncc build src/index.ts -o dist` to build, dk how to link yet
-   [x] https://www.npmjs.com/package/fast-glob
-   [x] execa -> https://www.npmjs.com/package/cross-spawn
-   [x] Fix '(node:208623) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead. (Use `node --trace-deprecation ...` to show where the warning was created)' --> Issue with my node version, fixed by `nvm install 20.5.1`, `nvm use 20.5.1`

## Techstack (Doxium)

-   [Next.js](https://nextjs.org/)
-   [shadcn](https://ui.shadcn.com/)
-   [Tailwindcss](https://tailwindcss.com/)
-   [MDX](https://mdxjs.com/)
-   [NCC](https://www.npmjs.com/package/@vercel/ncc)

## Credit

Lead developer - [konyogony](https://github.com/konyogony)
Beta Tester and a nice friend who helped - [PadowYT2](https://github.com/padowyt2)
Credits to [Next.js documentation](https://nextjs.org/docs), since I was influenced by them
