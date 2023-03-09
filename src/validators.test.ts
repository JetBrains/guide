import { expect, test } from "vitest";
import path from "upath";
import { sitesDir, validateFrontmatter } from "./validators";
import { TipFrontmatter } from "../_includes/resources/tip/TipModels";

test("defines the sitesDir", () => {
  expect(path.basename(sitesDir)).to.equal("sites");
});

test("validates good frontmatter", () => {
  const frontmatter = {
    title: "A Good Tip",
    body: "Some *content*",
    id: "some-id",
    author: "some-author",
    slug: "some-slug",
    url: "/tips/some-slug",
    date: new Date(),
    resourceType: "some-resourcetype",
    thumbnail: "thumbnail.png",
    inputFolder: "sites/webstorm-pycharm-webstorm-guide/tips/some-slug/",
  };
  const validation = () =>
    validateFrontmatter(TipFrontmatter, frontmatter, "tip1.md");
  expect(validation).not.toThrow();
});

test("validates bad frontmatter", () => {
  const frontmatter = { age: 49 };
  const validation = () =>
    validateFrontmatter(TipFrontmatter, frontmatter, "tip1.md");
  expect(validation).toThrow("Expected required");
  expect(validation).toThrow("tip1.md");
});
