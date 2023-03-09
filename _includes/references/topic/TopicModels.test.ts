import { expect, test } from "vitest";
import { EleventyPage } from "../../../src/models";
import { rootPath } from "../../config";
import { Topic, TopicFrontmatter } from "./TopicModels";
import fixtures from "../../fixtures";

const data: TopicFrontmatter = {
  accent: "some accent",
  icon: "some-icon.png",
  label: "sa",
  resourceType: "topic",
  title: "Some Topic",
};
const page: EleventyPage = {
  fileSlug: "sa",
  url: "/technologies/st/",
  inputPath: `${rootPath}/technologies/st/index.md`,
  date: fixtures.date,
};

test("construct a topic", async () => {
  const topic = new Topic({ data, page });
  expect(topic.title).to.equal("Some Topic");
});

test("construct a topic from factory", async () => {
  const topic = await new Topic({ data, page }).init();
  expect(topic.title).to.equal("Some Topic");
});
