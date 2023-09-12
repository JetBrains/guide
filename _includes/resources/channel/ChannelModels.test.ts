import { expect, test } from "vitest";
import { Channel, ChannelFrontmatter } from "./ChannelModels";
import { EleventyPage } from "../../../src/models";
import fixtures from "../../fixtures";

const data: ChannelFrontmatter = {
	title: "Some Channel",
	resourceType: "channel",
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

test("construct a channel", () => {
	const channel = new Channel({ data, page });
	expect(channel.title).to.equal("Some Channel");
});

test("resolve author in a channel", async () => {
	const someChannel = fixtures.resourceMap.get("/channels/some-channel/");
	expect(someChannel && someChannel.title).to.equal("Some Channel");
});
