import { expect, test } from "vitest";
import { EleventyPage } from "../../../src/models";
import { Topic, TopicFrontmatter } from "./TopicModels";
import fixtures from "../../fixtures";

const data: TopicFrontmatter = {
	date: fixtures.date,
	author: "sa",
	accent: "some accent",
	icon: "some-icon.png",
	label: "sa",
	resourceType: "topic",
	title: "Some Topic",
};
const page: EleventyPage = {
	fileSlug: "sa",
	url: "/topics/st/",
	inputPath: `/topics/st/index.md`,
	date: fixtures.date,
	rawInput: "",
};

test("construct a topic", async () => {
	// With a FontAwesome icon and accent color
	const topic = new Topic({
		data,
		page,
	});
	expect(topic.title).to.equal("Some Topic");
});

test("construct a topic from factory", () => {
	const topic = new Topic({
		data,
		page,
	});
	expect(topic.title).to.equal("Some Topic");
});
