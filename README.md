# DOGXHOOD

[![Featured on Orynth](https://orynth.dev/api/badge/dogxhood?theme=light&style=default)](https://orynth.dev/projects/dogxhood)

A mobile-first browser game hub for the DOGXHOOD community and the `$DXHOOD` token on Robinhood Chain. Choose a game, chase a high score, and track your personal progress from the player dashboard.

## Live project

- Website: [dogxhood.fun](https://dogxhood.fun)
- Orynth: [Featured on Orynth](https://orynth.dev/projects/dogxhood)
- X: [@dogxhood](https://x.com/dogxhood)

## Features

### Three mini-games

- **Hood Tapper** — tap the DOGXHOOD character for 60 seconds, build combo multipliers, and beat your best score.
- **Doge Dash** — jump over FUD blocks and red candles in a fast endless runner.
- **Moon or FUD** — make a prediction across 10 rounds and build a streak by calling the next move correctly.

### Player experience

- Username-only login gate with a fast local start.
- MetaMask wallet login using the browser wallet provider, with account-change handling.
- **Player dashboard** at `/dashboard` with:
  - Total high score across all games.
  - Best run and games-played summary.
  - Individual records with quick links back to each game.
  - Logout control.
- Local leaderboard for all three games.
- How-to-play guide and DOGXHOOD information page.
- Credentials page explaining username and MetaMask safety.
- Cookies page explaining local browser storage and privacy controls.
- Legal page covering entertainment use, wallet responsibility, and external services.
- Mobile-first layout with animated interactions and persistent navigation.
- Direct route support for GitHub Pages, including `/dashboard`.

> Scores, the username, and the connected wallet session are stored in the browser's `localStorage`. No account or server-side score database is required to play.

## Tech stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Wouter
- Lucide React
- pnpm workspaces
- GitHub Actions + GitHub Pages

## Run locally

Install dependencies:

```bash
pnpm install
```

Start the game frontend:

```bash
pnpm --filter @workspace/dogxhood run dev
```

The Vite server uses the `PORT` value provided by the Replit workflow. For a manual production-style build, provide the required environment values:

```bash
PORT=3000 BASE_PATH=/ NODE_ENV=production \
  pnpm --filter @workspace/dogxhood run build
```

The generated static site is written to:

```text
artifacts/dogxhood/dist/public
```

Run the frontend typecheck:

```bash
pnpm --filter @workspace/dogxhood run typecheck
```

## Project structure

```text
artifacts/dogxhood/
├── src/
│   ├── components/
│   │   └── BottomNav.tsx
│   ├── lib/
│   │   ├── gameStorage.ts
│   │   └── useAuth.ts
│   └── pages/
│       ├── DashboardPage.tsx
│       ├── HomePage.tsx
│       ├── HoodTapperGame.tsx
│       ├── DogeDashGame.tsx
│       ├── MoonOrFudGame.tsx
│       ├── LeaderboardPage.tsx
│       ├── HowToPlayPage.tsx
│       └── AboutPage.tsx
├── public/
│   └── assets/dogxhood-character.jpg
└── scripts/
    └── prepare-pages.mjs
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Username login gate |
| `/home` | Game hub |
| `/dashboard` | Personal player dashboard |
| `/game/tapper` | Hood Tapper |
| `/game/dash` | Doge Dash |
| `/game/moon` | Moon or FUD |
| `/leaderboard` | Local high scores |
| `/how-to-play` | Game instructions |
| `/about` | DOGXHOOD, token, social, and Orynth information |
| `/credentials` | Login and wallet safety information |
| `/cookies` | Cookie and browser storage information |
| `/legal` | Legal information and disclaimers |

## GitHub Pages deployment

Every push to `main` triggers [`.github/workflows/pages.yml`](.github/workflows/pages.yml). The workflow:

1. Installs dependencies with pnpm.
2. Runs the shared library typecheck.
3. Builds the DOGXHOOD frontend with `PORT=3000`, `BASE_PATH=/`, and production mode.
4. Generates static entry files for internal routes so GitHub Pages can serve direct links such as `/dashboard`.
5. Deploys `artifacts/dogxhood/dist/public` to GitHub Pages.

## Visual identity

- Background: `#0D0D0D`
- Primary lime: `#C8FF00`
- Neon green accent: `#00FF41`
- Card background: `#111111`
- Display font: Press Start 2P
- Body font: Inter

## License

This project is maintained for the DOGXHOOD community.