import { expect, test } from "vitest";
import { Article, ArticleFrontmatter } from "./ArticleModels";
import { EleventyPage } from "../../../src/models";
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
	inputPath: `/articles/some-article/index.md`,
	date: fixtures.date,
	rawInput: "",
};

test("construct an article", () => {
	const article = new Article({ data, page });
	expect(article.title).to.equal("Some Article");
});
