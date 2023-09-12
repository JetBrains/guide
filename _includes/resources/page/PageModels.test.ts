import { expect, test } from "vitest";
import { Page, PageFrontmatter } from "./PageModels";
import { EleventyPage } from "../../../src/models";
import fixtures from "../../fixtures";

const data: PageFrontmatter = {
	title: "Some Page",
	resourceType: "page",
	author: "sa",
	date: fixtures.date,
	thumbnail: "thumbnail.png",
};
const page: EleventyPage = {
	fileSlug: "some-page",
	url: "/tips/some-page/",
	inputPath: `/some-page.md`,
	date: fixtures.date,
};

test("construct a page", () => {
	const tip = new Page({ data, page });
	expect(tip.title).to.equal("Some Page");
});
