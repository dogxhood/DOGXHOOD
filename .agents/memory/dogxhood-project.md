---
name: DOGXHOOD project key facts
description: Key facts about the DOGXHOOD meme game project — image paths, game architecture, GitHub setup
---

## Character Image
- Located at: `artifacts/dogxhood/public/assets/dogxhood-character.jpg`
- Reference in JSX as: `<img src="/assets/dogxhood-character.jpg" />` (public path)
- Do NOT use `@assets/...` import — it's in the public folder, not attached_assets

**Why:** Vite resolves `@assets` to `attached_assets/` (root). Character image was copied to `public/assets/` for the artifact, so it must use the public URL path.

## Game Architecture
- All game logic is 100% client-side (localStorage)
- No API calls in the game frontend — do not import from `@workspace/api-client-react`
- Scores stored under keys: `dxhood_tapper_hs`, `dxhood_dash_hs`, `dxhood_moon_hs`
- Auth: username only, stored under `dxhood_user` in localStorage

## GitHub
- Repo: https://github.com/dogxhood/DOGXHOOD
- GitHub Pages: auto-deploys via `.github/workflows/pages.yml` on push to main
- Build command for Pages: `pnpm --filter @workspace/dogxhood run build` with `PORT=3000 BASE_PATH=/`
- Pages serves from: `artifacts/dogxhood/dist/public`
