import { expect, test } from "vitest";
import { Resource, ResourceFrontmatter } from "./ResourceModels";
import { EleventyPage } from "./models";
import fixtures from "../_includes/fixtures";

const resourceFrontmatter: ResourceFrontmatter = {
	date: fixtures.date,
	author: "sa",
	resourceType: "tip",
	title: "Some Tip",
};
const data: ResourceFrontmatter = {
	...resourceFrontmatter,
	author: "sa",
	date: new Date(Date.UTC(2023, 1, 11)),
	topics: ["st", "at", "sp", "ap"],
};
const page: EleventyPage = {
	fileSlug: "some-tip",
	url: "/tips/some-tip/",
	inputPath: `/tips/some-tip/index.md`,
	date: fixtures.date,
};

test("construct a BaseEntity", () => {
	const baseEntity = new Resource({ data: resourceFrontmatter, page });
	expect(baseEntity).to.exist;
});
test("construct a Resource", () => {
	const resource = new Resource({ data, page });
	expect(resource).to.exist;
});

test("get a class attribute from base class", () => {
	expect(Resource.frontmatterSchema).to.equal(ResourceFrontmatter);
});
test("get a class attribute from base class", () => {
	expect(Resource.frontmatterSchema).to.equal(ResourceFrontmatter);
});

test("get a friendly date display format", () => {
	const resource = new Resource({ data, page });
	expect(resource.displayDate).to.equal("2023-02-11");
});
