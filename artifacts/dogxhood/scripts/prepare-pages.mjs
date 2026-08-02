import { cp, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputRoot = resolve(projectRoot, "dist/public");
const indexFile = resolve(outputRoot, "index.html");

const routes = [
  "home",
  "about",
  "leaderboard",
  "how-to-play",
  "game/tapper",
  "game/dash",
  "game/moon",
];

await cp(indexFile, resolve(outputRoot, "404.html"));

for (const route of routes) {
  const routeIndex = resolve(outputRoot, route, "index.html");
  await mkdir(dirname(routeIndex), { recursive: true });
  await cp(indexFile, routeIndex);
}