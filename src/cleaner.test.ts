import { describe, expect, test } from "vitest";
import {
  AllTopicTypes,
  cleanAllResources,
  cleanCategories,
  dumpAuthors,
  dumpTopics,
  getAllFiles,
  getRoot,
  guideSites,
  MarkdownFrontmatter,
  parseFrontmatter,
  writeTopicType,
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

  test("migrated products and technologies get the topicType assigned", () => {
    const fm: MarkdownFrontmatter = {
      products: ["p1", "p3", "p2"],
      topics: ["to1"],
    };
    const filePath = "/foo/products/tip1/index.md";
    const results = writeTopicType(filePath, fm);
    expect(results.topicType).toEqual("product");
  });

  test("cleans all resources and prepares for writing to disk", () => {
    const markdownResources = parseFrontmatter(pyCharmTipFiles);
    const results = cleanAllResources(markdownResources);
    const first = Object.values(results)[0];
    expect(first).not.toContain("topics: ");
    expect(first).not.toContain("topicType");
  });
});

test.skip("actually execute the cleaning", () => {
  // TODO Should not have to execute as a test, but the
  //   whole TS/ESM thing interfered with running from
  //   package.json or the command line.
  // writeCleanResources();
});

test.skip("dump all topics for content migration", () => {
  // TODO Should not have to execute as a test, but the
  //   whole TS/ESM thing interfered with running from
  //   package.json or the command line.
  const results: AllTopicTypes = dumpTopics();
  expect(results["dotnet"]["product"].length).toEqual(6);

  // Now write to output for cutting-and-pasting
  Object.entries(results).forEach(([site, entries]) => {
    console.log(`\n${site}\n=====`);
    Object.entries(entries).forEach(([topicType, values]) => {
      console.log(`\n${topicType}\n----------`);
      values.sort().forEach((value) => {
        // Brute force!! Get a count of how many times this value appears
        // in all the sites. If over one, flag as duplicate.
        let count = 0;
        guideSites.forEach((site) => {
          const labels = results[site][topicType];
          if (labels.includes(value)) {
            count = count + 1;
          }
        });
        const flag = count > 1 ? ` (${count})` : "";
        console.log(`${value}${flag}`);
      });
    });
  });
});

test.skip("dump all authors for content migration", () => {
  // TODO Should not have to execute as a test, but the
  //   whole TS/ESM thing interfered with running from
  //   package.json or the command line.
  const results: AllTopicTypes = dumpAuthors();
  expect(results["dotnet"]["author"].length).toEqual(5);

  // Now write to output for cutting-and-pasting
  Object.entries(results).forEach(([site, entries]) => {
    console.log(`\n${site}\n=====`);
    Object.entries(entries).forEach(([topicType, values]) => {
      console.log(`\n${topicType}\n----------`);
      values.sort().forEach((value) => {
        // Brute force!! Get a count of how many times this value appears
        // in all the sites. If over one, flag as duplicate.
        let count = 0;
        guideSites.forEach((site) => {
          const labels = results[site][topicType];
          if (labels.includes(value)) {
            count = count + 1;
          }
        });
        const flag = count > 1 ? ` (${count})` : "";
        console.log(`${value}${flag}`);
      });
    });
  });
});
