import { expect, test } from "vitest";
import { Tip, TipFrontmatter } from "./TipModels";
import { EleventyPage } from "../../../src/models";
import { rootPath } from "../../config";
import fixtures from "../../fixtures";

const data: TipFrontmatter = {
  title: "Some Tip",
  date: fixtures.date,
  resourceType: "tip",
  author: "sa",
  products: ["sp", "ap"],
  technologies: ["st", "at"],
  topics: ["st", "at"],
  thumbnail: "thumbnail.png",
};
const page: EleventyPage = {
  fileSlug: "some-tip",
  url: "/tips/some-tip/",
  inputPath: `${rootPath}/tips/some-tip/index.md`,
  date: fixtures.date,
};

test("construct a tip", async () => {
  const tip = await new Tip({ data, page }).init();
  expect(tip.title).to.equal("Some Tip");
});
