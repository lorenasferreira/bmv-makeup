import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createInstance } from "i18next";

const languages = ["pt", "en", "es", "ca"];
const resources = Object.fromEntries(
  languages.map((language) => [
    language,
    {
      translation: JSON.parse(
        readFileSync(new URL(`../src/i18n/locales/${language}.json`, import.meta.url), "utf8"),
      ),
    },
  ]),
);

function flatten(value, prefix = "") {
  return Object.fromEntries(
    Object.entries(value).flatMap(([key, child]) => {
      const path = prefix ? `${prefix}.${key}` : key;
      return typeof child === "object" && child !== null
        ? Object.entries(flatten(child, path))
        : [[path, child]];
    }),
  );
}

const source = flatten(resources.pt.translation);
const placeholders = (value) => [...value.matchAll(/{{\s*(\w+)\s*}}/g)]
  .map((match) => match[1]).sort();

for (const language of languages) {
  test(`${language}: complete Portuguese key set, interpolation and factual numbers`, () => {
    const translations = flatten(resources[language].translation);
    assert.deepEqual(Object.keys(translations).sort(), Object.keys(source).sort());

    for (const [key, value] of Object.entries(translations)) {
      assert.equal(typeof value, "string", `${key} must be a string`);
      assert.ok(value.trim(), `${key} must not be empty`);
      assert.deepEqual(placeholders(value), placeholders(source[key]), key);
      assert.deepEqual(value.match(/\d+/g), source[key].match(/\d+/g), `${key}: factual numbers`);
    }
  });

  test(`${language}: every key resolves without another language as fallback`, async () => {
    const i18n = createInstance();
    await i18n.init({ resources, lng: language, fallbackLng: false });

    for (const key of Object.keys(source)) {
      const result = i18n.t(key, {
        rating: 5,
        number: 2,
        category: i18n.t("portfolio.gallery.categories.beauty"),
        returnDetails: true,
      });
      assert.equal(result.usedLng, language, key);
      assert.notEqual(result.res, key, key);
      assert.doesNotMatch(result.res, /{{|}}/, key);
    }

    for (const count of [0, 1, 4, 24]) {
      const key = `portfolio.gallery.count_${count === 1 ? "one" : "other"}`;
      assert.equal(i18n.t("portfolio.gallery.count", { count }), i18n.t(key));
    }
  });
}
