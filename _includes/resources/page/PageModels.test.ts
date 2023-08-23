import { expect, test } from "vitest";
import { Page, PageFrontmatter } from "./PageModels";
import { EleventyPage } from "../../../src/models";
import { rootPath } from "../../config";
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
	inputPath: `${rootPath}/some-page.md`,
	date: fixtures.date,
};

test("construct a page", async () => {
	const tip = await new Page({ data, page }).init();
	expect(tip.title).to.equal("Some Page");
});
