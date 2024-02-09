import { expect, test } from "vitest";
import { sitesDir, validateFrontmatter } from "./validators";
import { TipFrontmatter } from "../_includes/resources/tip/TipModels";
import { basename } from "upath";

test("defines the sitesDir", () => {
	expect(basename(sitesDir)).to.equal("site");
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
		resourceType: "tip",
		thumbnail: "thumbnail.png",
		inputFolder: "site/webstorm-pycharm-webstorm-guide/tips/some-slug/",
	};
	const validation = () =>
		validateFrontmatter(TipFrontmatter, frontmatter, "tip1.md");
	expect(validation).not.toThrow();
});

test("validates bad frontmatter", () => {
	const frontmatter = { age: 49 };
	const validation = () =>
		validateFrontmatter(TipFrontmatter, frontmatter, "tip1.md");
	expect(validation).toThrow("Validation failure");
	expect(validation).toThrow("tip1.md");
});
