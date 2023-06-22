import { describe, expect, test } from "vitest";
import {
  cleanAllResources,
  cleanCategories,
  getAllFiles,
  getRoot,
  MarkdownFrontmatter,
  parseFrontmatter,
  writeCleanResources,
} from "./cleaner";

describe("Content Cleaning", () => {
  const root = getRoot();
  const pycharmTipRoot = `${root}/pycharm/tips`;
  const pyCharmTipFiles = getAllFiles(pycharmTipRoot, []).slice(0, 10);

  test("get the root of the site as a path", () => {
    expect(root).to.contain("guide/sites");
  });
  test("recursively load a list of file paths", () => {
    // Walking everything can be slow, let's pick a subset
    expect(pyCharmTipFiles.length).to.be.gt(9);
  });

  test("convert file paths to parsed frontmatter", () => {
    const results = parseFrontmatter(pyCharmTipFiles);
    const first = Object.values(results)[0];
    expect(first.frontmatter.title).to.exist;
  });

  test("clean up a frontmatter with no existing topics", () => {
    const fm: MarkdownFrontmatter = {
      topics: [],
    };
    expect(cleanCategories(fm).topics).toEqual([]);
  });

  test("not change frontmatter with anything", () => {
    const fm: MarkdownFrontmatter = {};
    expect(cleanCategories(fm).topics).toBeUndefined();
  });

  test("combine technologies into topics and sort", () => {
    const fm: MarkdownFrontmatter = {
      technologies: ["te1", "te3", "te2"],
      topics: ["to1"],
    };
    const expected = ["te1", "te2", "te3", "to1"];
    const results = cleanCategories(fm);
    expect(results.topics).toEqual(expected);
    expect(results.technologies).toBeUndefined();
  });
  test("delete empty technologies and sort topics", () => {
    const fm: MarkdownFrontmatter = {
      technologies: [],
      topics: ["to1", "to3", "to2"],
    };
    const expected = ["to1", "to2", "to3"];
    const results = cleanCategories(fm);
    expect(results.topics).toEqual(expected);
    expect(results.technologies).toBeUndefined();
  });
  test("combine products into topics and sort", () => {
    const fm: MarkdownFrontmatter = {
      products: ["p1", "p3", "p2"],
      topics: ["to1"],
    };
    const expected = ["p1", "p2", "p3", "to1"];
    const results = cleanCategories(fm);
    expect(results.topics).toEqual(expected);
    expect(results.technologies).toBeUndefined();
  });

  test("cleans all resources and prepares for writing to disk", () => {
    const markdownResources = parseFrontmatter(pyCharmTipFiles);
    const results = cleanAllResources(markdownResources);
    const first = Object.values(results)[0];
    expect(first).not.toContain("topics: ");
  });
});

test("actually execute the cleaning", () => {
  // TODO Should not have to execute as a test, but the
  //   whole TS/ESM thing interfered with running from
  //   package.json or the command line.
  writeCleanResources();
});
