import { expect, test } from "vitest";
import { Channel, ChannelFrontmatter } from "./ChannelModels";
import { EleventyPage } from "../../../src/models";
import { rootPath } from "../../config";
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
  inputPath: `${rootPath}/some-page.md`,
  date: fixtures.date,
};

test("construct a channel", async () => {
  const channel = await new Channel({ data, page }).init();
  expect(channel.title).to.equal("Some Channel");
});

test("resolve author in a channel", async () => {
  const someChannel = fixtures.resolvedCollections.allResources.get(
    "/channels/some-channel/"
  );
  expect(someChannel && someChannel.title).to.equal("Some Channel");
});
