import { expect, test } from "vitest";
import {
  BaseEntity,
  BaseFrontmatter,
  Resource,
  ResourceFrontmatter,
} from "./ResourceModels";
// import fixtures from "../_includes/fixtures";
import { rootPath } from "../_includes/config";
import { EleventyPage } from "./models";
import fixtures from "../_includes/fixtures";

const baseFrontmatter: BaseFrontmatter = {
  resourceType: "tip",
  title: "Some Tip",
};
const data: ResourceFrontmatter = {
  ...baseFrontmatter,
  author: "sa",
  date: new Date(Date.UTC(2023, 1, 11)),
  products: ["sp", "ap"],
  technologies: ["st", "at"],
  thumbnail: "thumbnail.png",
  topics: ["st", "at"],
};
const page: EleventyPage = {
  fileSlug: "some-tip",
  url: "/tips/some-tip/",
  inputPath: `${rootPath}/tips/some-tip/index.md`,
  date: fixtures.date,
};

test("construct a BaseEntity", () => {
  const baseEntity = new BaseEntity({ data: baseFrontmatter, page });
  expect(baseEntity).to.exist;
});
test("construct a Resource", () => {
  const resource = new Resource({ data, page });
  resource.init();
  expect(resource).to.exist;
});

test("get a class attribute from base class", () => {
  expect(BaseEntity.frontmatterSchema).to.equal(BaseFrontmatter);
});
test("get a class attribute from base class", () => {
  expect(Resource.frontmatterSchema).to.equal(ResourceFrontmatter);
});

test("get a friendly date display format", () => {
  const resource = new Resource({ data, page });
  expect(resource.displayDate).to.equal("2023-02-11");
});
