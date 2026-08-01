# DOGXHOOD Game

A mobile-first browser meme game hub for the $DXHOOD token on Robinhood Chain. Features three addictive mini-games, a login gate, leaderboard, how-to-play guide, and tokenomics page — all built around the Shiba Inu DOGXHOOD character.

## Run & Operate

- `pnpm --filter @workspace/dogxhood run dev` — run the game frontend (port assigned by workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, /api)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec

## GitHub

- Repo: https://github.com/dogxhood/DOGXHOOD
- GitHub Pages: auto-deployed via GitHub Actions on every push to main (see `.github/workflows/pages.yml`)
- Push with: `TOKEN=$(printenv GITHUB_TOKEN) && git remote set-url origin "https://dogxhood:${TOKEN}@github.com/dogxhood/DOGXHOOD.git" && git push origin main`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Game frontend: React + Vite + Tailwind CSS + Framer Motion + wouter
- API: Express 5 (minimal, game logic is all client-side)
- DB: PostgreSQL + Drizzle ORM (not used by game, available for future features)
- Game state: localStorage (all scores persisted locally)
- Fonts: Press Start 2P (headings/scores) + Inter (body)
- Build: Vite → dist/public (served by GitHub Pages)

## Where things live

- `artifacts/dogxhood/src/pages/` — all game pages
  - `LoginPage.tsx` — login gate (username → localStorage)
  - `HomePage.tsx` — game hub with 3 game cards
  - `HoodTapperGame.tsx` — tap game with combo multipliers
  - `DogeDashGame.tsx` — canvas endless runner
  - `MoonOrFudGame.tsx` — binary prediction game
  - `LeaderboardPage.tsx` — local high scores
  - `HowToPlayPage.tsx` — instructions
  - `AboutPage.tsx` — tokenomics / $DXHOOD info
- `artifacts/dogxhood/src/lib/gameStorage.ts` — localStorage helpers for all game scores
- `artifacts/dogxhood/src/lib/useAuth.ts` — auth hook (localStorage)
- `artifacts/dogxhood/src/components/BottomNav.tsx` — persistent bottom nav
- `artifacts/dogxhood/public/assets/dogxhood-character.jpg` — main character image
- `.github/workflows/pages.yml` — GitHub Actions CI/CD for GitHub Pages

## Product

- **Login Gate**: Username-only entry, stored in localStorage. Auto-skips if already logged in.
- **Hood Tapper**: Click/tap the dog for 60 seconds. Combo multipliers (x2→x10) for rapid taps. High score saved.
- **Doge Dash**: Canvas endless runner. Tap/space to jump over FUD obstacles. Speed increases over time.
- **Moon or FUD**: 10-round prediction game. Pick Moon or FUD, watch a coin flip animation, track your streak.
- **Leaderboard**: Shows local high scores for all 3 games.
- **How to Play + About**: Accessible without login.

## Palette

- Background: `#0D0D0D`
- Primary lime: `#C8FF00`
- Neon green accent: `#00FF41`
- Cards: `#111111`

## User preferences

- Commit incrementally to GitHub after major changes
- Push to GitHub using: `TOKEN=$(printenv GITHUB_TOKEN) && git remote set-url origin "https://dogxhood:${TOKEN}@github.com/dogxhood/DOGXHOOD.git" && git push origin main`
- GITHUB_TOKEN is saved as a Replit secret

## Gotchas

- Character image is in `public/assets/` — reference as `/assets/dogxhood-character.jpg` (NOT @assets import)
- GitHub Pages build needs `PORT=3000 BASE_PATH=/` env vars — see pages.yml
- gitPush() callback fails (no Replit GitHub OAuth) — always push via shell with the token in the remote URL
- The `origin` remote URL must be refreshed with the token each session (token in URL)
