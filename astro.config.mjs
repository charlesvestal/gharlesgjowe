import { defineConfig } from 'astro/config';

// TODO: set to your repo name (e.g. 'glasgow-weekend'). Leave '/' if deploying to a root domain
// (Cloudflare Pages, Netlify, or a <user>.github.io repo).
const REPO_NAME = 'gharlesgjowe';

// TODO: set to your GitHub username for GitHub Pages (https://<user>.github.io/<repo>/).
const GH_USER = 'charlesvestal';

export default defineConfig({
  site: `https://${GH_USER}.github.io`,
  base: `/${REPO_NAME}/`,
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    assets: 'assets',
  },
});
