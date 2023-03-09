import { expect, test } from "vitest";
import { EleventyPage } from "../../../src/models";
import { rootPath } from "../../config";
import { Technology, TechnologyFrontmatter } from "./TechnologyModels";
import fixtures from "../../fixtures";

const data: TechnologyFrontmatter = {
  label: "sa",
  logo: "some-logo.png",
  resourceType: "technology",
  title: "Some Technology",
};
const page: EleventyPage = {
  fileSlug: "sa",
  url: "/technologies/st/",
  inputPath: `${rootPath}/technologies/st/index.md`,
  date: fixtures.date,
};

test("construct a technology", async () => {
  const technology = new Technology({ data, page });
  expect(technology.title).to.equal("Some Technology");
});

test("construct a technology from factory", async () => {
  const technology = await new Technology({ data, page }).init();
  expect(technology.title).to.equal("Some Technology");
});
