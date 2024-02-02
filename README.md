# Pocket AI Assistant Extension V0.0.1
An ai assistant available in your browser without leaving to another page.

<a href="https://www.producthunt.com/posts/mini-chatgpt-extension-for-chrome?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-mini&#0045;chatgpt&#0045;extension&#0045;for&#0045;chrome" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=437490&theme=light" alt="Mini&#0032;ChatGPT&#0032;Extension&#0032;for&#0032;Chrome - A&#0032;simple&#0032;ChatGPT&#0032;in&#0032;your&#0032;local&#0032;browser&#0046; | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>



## Table of Contents
- [Features](#features)
- [Get Started](#get-started)
- [Installation](#installation)
    - [Chrome](#chrome)
    - [FireFox](#firefox)
- [Technologies](#technologies)




## Features <a name="features"></a>
✅ Direct Access to Open AI 
✅ Switch to GPT3 to GPT4 easily
❌ Chat History (🔜)

## Get Started <a name="get-started"></a>
1. Install on Google Chrome (PENDING MODE)
2. Get your Open AI Key ID
3. Enjoy!


## Installation <a name="installation"></a>
### Procedure
1. Clone this repository.
2. Change extensionDescription and extensionName in messages.json
3. Install pnpm globally: `npm install -g pnpm` (check your node version >= 16.6, recommended >= 18)
4. Run `pnpm install`

### For Chrome: <a name="chrome"></a>
1. Run:
    - Dev: `pnpm dev` or `npm run dev`
    - Prod: `pnpm build` or `npm run build`
2. Open in browser - `chrome://extensions`
3. Check - `Developer mode`
4. Find and Click - `Load unpacked extension`
5. Select - `dist` folder

### For Firefox: <a name="firefox"></a>
1. Run:
    - Dev: `pnpm dev:firefox` or `npm run dev:firefox`
    - Prod: `pnpm build:firefox` or `npm run build:firefox`
2. Open in browser - `about:debugging#/runtime/this-firefox`
3. Find and Click - `Load Temporary Add-on...`
4. Select - `manifest.json` from `dist` folder

### <i>Remember in firefox you add plugin in temporary mode, that's mean it's disappear after close browser, you must do it again, on next launch.</i>


## Technologies Used <a name="technologies"></a>
- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vite](https://vitejs.dev/)
- [SASS](https://sass-lang.com/)
- [Tailwind](https://tailwindcss.com/)
- [HeroIcons](https://heroicons.com/)
- [React Icons](https://react-icons.github.io/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Husky](https://typicode.github.io/husky/getting-started.html#automatic-recommended)
- [Commitlint](https://commitlint.js.org/#/guides-local-setup?id=install-commitlint)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
- [Chrome Extension Manifest Version 3](https://developer.chrome.com/docs/extensions/mv3/intro/)
- HRR(Hot Rebuild & Refresh/Reload)
