import { expect, test } from "vitest";
import { Article, ArticleFrontmatter } from "./ArticleModels";
import { EleventyPage } from "../../../src/models";
import { rootPath } from "../../config";
import fixtures from "../../fixtures";

const data: ArticleFrontmatter = {
  title: "Some Article",
  date: fixtures.date,
  resourceType: "article",
  author: "sa",
  topics: ["st", "at"],
  thumbnail: "thumbnail.png",
};
const page: EleventyPage = {
  fileSlug: "some-article",
  url: "/articles/some-article/",
  inputPath: `${rootPath}/articles/some-article/index.md`,
  date: fixtures.date,
};

test("construct an article", async () => {
  const article = await new Article({ data, page }).init();
  expect(article.title).to.equal("Some Article");
});
