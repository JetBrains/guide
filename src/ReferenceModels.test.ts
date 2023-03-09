import { expect, it } from "vitest";
import {
  getReference,
  Reference,
  ReferenceFrontmatter,
} from "./ReferenceModels";
import { EleventyPage } from "./models";
import { rootPath } from "../_includes/config";
import fixtures from "../_includes/fixtures";

const data: ReferenceFrontmatter = {
  label: "sr",
  resourceType: "author",
  subtitle: "Some Subtitle",
  title: "Some Reference",
};
const page: EleventyPage = {
  fileSlug: "some-tip",
  url: "/tips/some-tip/",
  inputPath: `${rootPath}/tips/some-tip/index.md`,
  date: fixtures.date,
};
it("should construct a Reference", () => {
  const reference = new Reference({ data, page });
  expect(reference.title).to.equal(data.title);
});

it("should construct a reference via the factory", async () => {
  const reference = await getReference(data, page);
  expect(reference.title).to.equal(data.title);
});
