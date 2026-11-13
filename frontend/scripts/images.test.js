import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { join, relative } from "node:path";

const frontend = fileURLToPath(new URL("../", import.meta.url));
const publicDirectory = join(frontend, "public");
const metadata = JSON.parse(readFileSync(join(frontend, "src/data/image-metadata.json")));
const approved = JSON.parse(readFileSync(join(frontend, "tests/fixtures/approved-images.json")));
function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).filter(entry => entry.name !== ".DS_Store").flatMap(entry =>
    entry.isDirectory() ? files(join(directory, entry.name)) : [join(directory, entry.name)],
  );
}
const images = Object.entries(metadata).flatMap(([src, image]) => [
  { src, width: image.width, bytes: image.bytes }, ...image.variants,
]);

test("all published photos and responsive variants exist, with current sizes and semantic paths", () => {
  const expected = new Set(images.map(image => image.src));
  for (const image of images) {
    assert.match(image.src, /^\/assets\/images\/(?:[a-z0-9-]+\/)*[a-z0-9-]+\.(webp|jpg)$/);
    assert.ok(image.width > 0);
    assert.equal(statSync(join(publicDirectory, image.src)).size, image.bytes, image.src);
  }
  const published = files(join(publicDirectory, "assets/images")).map(path => `/${relative(publicDirectory, path).split("\\").join("/")}`);
  assert.deepEqual(new Set(published), expected, "Every public photo belongs to the maintained image manifest");
});

test("approved master photographs and both five-image Hero sequences are preserved", () => {
  assert.deepEqual(new Set(approved.images.map(image => image.url)), new Set(Object.keys(metadata)));
  for (const image of approved.images) {
    const actual = createHash("sha256").update(readFileSync(join(publicDirectory, image.url))).digest("hex");
    assert.equal(actual, image.sha256, image.url);
  }
  for (const sequence of Object.values(approved.hero)) {
    assert.equal(sequence.length, 5);
    assert.equal(new Set(sequence).size, 5);
    sequence.forEach(url => assert.ok(metadata[url], url));
  }
});

test("source, tests and initial HTML reference existing local photos", () => {
  const paths = [...files(join(frontend, "src")), ...files(join(frontend, "tests")), join(frontend, "index.html")];
  for (const path of paths.filter(path => /\.(jsx?|json|css|html)$/.test(path))) {
    const text = readFileSync(path, "utf8");
    for (const [url] of text.matchAll(/\/assets\/images\/[a-zA-Z0-9/-]+\.(?:webp|jpe?g|png|svg)/g)) {
      assert.ok(statSync(join(publicDirectory, url)).isFile(), `${path}: ${url}`);
    }
    for (const [, suffix] of text.matchAll(/src\$="([^"\s]+\.(?:webp|jpe?g|png))"/g)) {
      assert.ok(images.some(image => image.src.endsWith(suffix)), `${path}: obsolete focal-point selector ${suffix}`);
    }
  }
});
