import { expect, test } from "vitest";
import { Tip, TipFrontmatter } from "./TipModels";
import { EleventyPage } from "../../../src/models";
import fixtures from "../../fixtures";

const data: TipFrontmatter = {
	title: "Some Tip",
	date: fixtures.date,
	resourceType: "tip",
	author: "sa",
	topics: ["st", "at"],
	thumbnail: "thumbnail.png",
};
const page: EleventyPage = {
	fileSlug: "some-tip",
	url: "/tips/some-tip/",
	inputPath: `/tips/some-tip/index.md`,
	date: fixtures.date,
};

test("construct a tip", () => {
	const tip = new Tip({ data, page });
	expect(tip.title).to.equal("Some Tip");
});
