import { expect, test } from "vitest";
import { Link, LinkFrontmatter } from "./LinkModels";
import { EleventyPage } from "../../../src/models";
import { rootPath } from "../../config";
import fixtures from "../../fixtures";

const data: LinkFrontmatter = {
	title: "Some Link",
	date: fixtures.date,
	resourceType: "link",
	author: "sa",
	topics: ["st", "at"],
	thumbnail: "thumbnail.png",
	linkURL: "http://some.link/",
};
const page: EleventyPage = {
	fileSlug: "some-link",
	url: "/links/some-link/",
	inputPath: `${rootPath}/links/some-link/index.md`,
	date: fixtures.date,
};

test("construct a link", async () => {
	const link = await new Link({ data, page }).init();
	expect(link.title).to.equal(data.title);
	expect(link.linkURL).to.equal(data.linkURL);
});
