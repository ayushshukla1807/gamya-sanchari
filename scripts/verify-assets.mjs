import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import process from "node:process";

const root = process.cwd();
const sourceRoots = ["app", "components", "constants", "public"];
const sourceExtensions = new Set([".css", ".json", ".ts", ".tsx"]);
const mediaPattern = /["'(]((?:\/)?(?:audio|images|videos)\/[^"')\s?#]+)/g;
const references = new Set();
const sourceFiles = [];

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(path);
    } else if (
      sourceExtensions.has(extname(entry.name)) &&
      !/\.(?:test|spec)\.[^.]+$/.test(entry.name)
    ) {
      const contents = readFileSync(path, "utf8");
      sourceFiles.push({ path, contents });
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
const credits = readFileSync(join(root, "docs/media-credits.md"), "utf8");

for (const asset of required) {
  const path = join(root, "public", asset);
  if (!existsSync(path)) {
    errors.push(`Missing: public/${asset}`);
  } else if (statSync(path).size === 0) {
    errors.push(`Empty: public/${asset}`);
  } else if (/\.(?:jpe?g|png|webp|gif|mp4)$/i.test(asset) && !credits.includes(`public/${asset}`)) {
    errors.push(`Uncredited: public/${asset}`);
  } else if (/\.(?:jpe?g|png|webp|gif)$/i.test(asset) && statSync(path).size >= 2_000_000) {
    errors.push(`Oversized image: public/${asset} must be smaller than 2,000,000 bytes`);
  }
}

const heroPath = join(root, "public/videos/hero.mp4");
if (existsSync(heroPath) && statSync(heroPath).size >= 6_000_000) {
  errors.push("public/videos/hero.mp4 must be smaller than 6,000,000 bytes");
}

const allSource = sourceFiles.map(({ contents }) => contents).join("\n");
const retiredThemeValues = [
  "#1844ef",
  "#0b1633",
  "#071027",
  "#071126",
  "#081329",
  "#10182a",
  "rgb(24 68 239",
  "rgb(8 19 41",
  "rgb(11 22 51",
];
for (const value of retiredThemeValues) {
  for (const { path, contents } of sourceFiles) {
    if (contents.toLowerCase().includes(value)) {
      errors.push(`Retired blue/navy theme value in ${relative(root, path)}: ${value}`);
    }
  }
}
const ids = new Set(Array.from(allSource.matchAll(/\bid=["']([^"']+)["']/g), (match) => match[1]));
for (const { path, contents } of sourceFiles) {
  for (const match of contents.matchAll(/href=["']#([^"']*)["']/g)) {
    if (!match[1] || !ids.has(match[1])) errors.push(`Dead hash link in ${relative(root, path)}: #${match[1]}`);
  }
  if (/\b(?:lorem ipsum|coming soon|placeholder copy|todo:)\b/i.test(contents)) {
    errors.push(`Placeholder content in ${relative(root, path)}`);
  }
  if (/\b(?:aggregateRating|ratingValue|priceRange)\b|["']?availability["']?\s*:/.test(contents)) {
    errors.push(`Unsupported commercial schema marker in ${relative(root, path)}`);
  }
}

const metadataSource = readFileSync(join(root, "lib/metadata.ts"), "utf8");
for (const staticRoute of ["/", "/destinations/", "/packages/", "/experiences/", "/plan-my-trip/", "/about/", "/contact/", "/journal/"]) {
  if (!metadataSource.includes(`path: "${staticRoute}"`)) errors.push(`Static route missing from metadata registry: ${staticRoute}`);
}
for (const dynamicCollection of ["DESTINATIONS.map", "JOURNEYS.map", "JOURNAL_ARTICLES.map"]) {
  if (!metadataSource.includes(dynamicCollection)) errors.push(`Dynamic route collection missing from metadata registry: ${dynamicCollection}`);
}

const brandSource = readFileSync(join(root, "constants/brand.ts"), "utf8");
for (const requiredContact of ["+91 80732 54766", "918073254766", "reach@gamyasanchari.com"]) {
  if (!brandSource.includes(requiredContact)) errors.push(`Canonical contact detail missing: ${requiredContact}`);
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
