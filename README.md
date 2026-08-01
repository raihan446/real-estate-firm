# AURA Real Estate

A refined, responsive real-estate showcase for exclusive villas, penthouses, and private investment properties. The application is a React single-page experience built with strict TypeScript and Vite.

## Tech stack

- React 19 + TypeScript (strict mode)
- Vite 8
- Tailwind CSS v4 (Vite integration) and a custom-property design system
- Framer Motion 11 for GPU-friendly transitions
- Lucide React icons

## Prerequisites

- **Node.js 20.19+ or 22.12+** (current Vite 8 requirement)
- npm 10+ (installed with Node), or pnpm 9+

Check your local versions:

```bash
node --version
npm --version
```

Download Node from [nodejs.org](https://nodejs.org/) if needed. Corepack can enable pnpm without a global installation:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

## Install and run locally

Install dependencies with your preferred package manager:

```bash
npm install
# or
pnpm install
```

Start the local development server:

```bash
npm run dev
# or
pnpm dev
```

Vite prints the local URL (normally `http://localhost:5173`). To expose the dev server on your local network, use `npm run dev -- --host`.

## Production build

```bash
npm run build
npm run preview
```

`npm run build` performs a strict TypeScript check, then outputs the static production site to `dist/`. `npm run preview` serves that exact build locally for a final check.

## Deployment

This is a static Vite application. For every provider, set the build command to `npm run build` and the output/publish directory to `dist`.

### Vercel

1. Push the project to GitHub, GitLab, or Bitbucket.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Select the **Vite** framework preset (or leave it auto-detected).
4. Confirm build command `npm run build` and output directory `dist`, then deploy.

For the CLI flow: `npm i -g vercel`, then run `vercel` from the project root.

### Netlify

1. Import the repository at Netlify, or drag the generated `dist` folder into Netlify Drop.
2. Set build command to `npm run build`.
3. Set publish directory to `dist`.
4. Deploy. Netlify will rebuild automatically on each connected branch push.

### Cloudflare Pages

1. Go to **Workers & Pages → Create → Pages → Connect to Git**.
2. Select the repository and choose the **React (Vite)** preset.
3. Use build command `npm run build` and build output directory `dist`.
4. Deploy. Add a custom domain from the Pages project’s **Custom domains** panel when ready.

## Project structure

```text
src/
  components/      # Header, sections, cards, footer
  data/            # Typed property catalogue
  types/           # Shared TypeScript models
  App.tsx          # Composition, lazy loading, JSON-LD
  styles.css       # Design tokens and responsive global styles
resources/         # Local property imagery
```

## Quality notes

- The responsive layer supports 320px phones through 4K displays using `clamp()`, container limits, and grid fallbacks.
- Images define their aspect ratio to prevent layout shifts and load lazily below the fold.
- Form values are sanitized before the client-side submission simulation.
- Before deploying, replace the `.example` schema URL, contact details, and simulated inquiry submission with production values/endpoints.
