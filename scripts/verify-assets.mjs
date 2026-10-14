import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import process from "node:process";

const root = process.cwd();
const sourceRoots = ["app", "components", "constants", "public"];
const sourceExtensions = new Set([".css", ".json", ".ts", ".tsx"]);
const mediaPattern = /["'(]((?:\/)?(?:images|videos)\/[^"')\s?#]+)/g;
const references = new Set();

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(path);
    } else if (sourceExtensions.has(extname(entry.name))) {
      const contents = readFileSync(path, "utf8");
      for (const match of contents.matchAll(mediaPattern)) {
        references.add(match[1].replace(/^\//, ""));
      }
    }
  }
}

for (const sourceRoot of sourceRoots) {
  walk(join(root, sourceRoot));
}

const required = [
  ...references,
  "favicon.ico",
  "images/og-image.jpg",
];
const errors = [];

for (const asset of required) {
  const path = join(root, "public", asset);
  if (!existsSync(path)) {
    errors.push(`Missing: public/${asset}`);
  } else if (statSync(path).size === 0) {
    errors.push(`Empty: public/${asset}`);
  }
}

const heroPath = join(root, "public/videos/hero.mp4");
if (existsSync(heroPath) && statSync(heroPath).size >= 6_000_000) {
  errors.push("public/videos/hero.mp4 must be smaller than 6,000,000 bytes");
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `PASS: verified ${required.length} local media assets from ${sourceRoots
    .map((path) => relative(root, join(root, path)))
    .join(", ")}.`,
);
