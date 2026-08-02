---
name: GitHub Pages routing
description: Durable routing requirement for the DOGXHOOD static GitHub Pages deployment
---

GitHub Pages must receive a generated `index.html` inside every valid client-side route directory, not only a root `index.html` or a `404.html` fallback.

**Why:** A `404.html` fallback can render the React app after a direct navigation, but GitHub Pages still returns HTTP 404. Route-specific entry files make direct navigation and refreshes return HTTP 200.

**How to apply:** When adding or renaming a client-side route, update the static route preparation list and verify the deployed URL returns HTTP 200.