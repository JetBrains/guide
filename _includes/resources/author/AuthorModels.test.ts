import { expect, test } from "vitest";
import { EleventyPage } from "../../../src/models";
import { Author, AuthorFrontmatter } from "./AuthorModels";
import fixtures from "../../fixtures";

const data: AuthorFrontmatter = {
	date: fixtures.date,
	author: "sa",
	resourceType: "author",
	thumbnail: "thumbnail.png",
	title: "Some Author",
};
const page: EleventyPage = {
	fileSlug: "sa",
	url: "/authors/sa/",
	inputPath: `/authors/sa/index.md`,
	date: fixtures.date,
	rawInput: "",
};

test("construct an author", async () => {
	const author = new Author({ data, page });
	expect(author.label).to.equal("sa");
	expect(author.title).to.equal("Some Author");
});

test("construct an author from factory", () => {
	const author = new Author({ data, page });
	expect(author.label).to.equal("sa");
	expect(author.title).to.equal("Some Author");
});
