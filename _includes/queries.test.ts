import { beforeEach, describe, expect, it, test } from "vitest";
import { Resource } from "../src/ResourceModels";
import fixtures from "./fixtures";
import {
  getReference,
  getResource,
  getResources,
  QueryFilter,
  sortByFrontmatter,
} from "./queries";
import { EleventyCollectionItem } from "../src/models";

it("gets a resource by path", () => {
  const result = getResource(fixtures.resolvedResources, "/tips/some-tip/");
  expect(result.url).to.equal("/tips/some-tip/");
});

it("gets a reference by path", () => {
  const result = getReference(fixtures.resolvedReferences, "/authors/sa/");
  expect(result.url).to.equal("/authors/sa/");
});

describe("getResources filtering", () => {
  let resources: Resource[];
  beforeEach(() => {
    resources = fixtures.resolvedResources;
  });

  it("does no filtering", () => {
    const filter: QueryFilter = {};
    const result = getResources(resources, filter);
    expect(result).to.have.length(resources.length);
  });

  it("sorts reverse on date", () => {
    const filter: QueryFilter = {};
    const result = getResources(resources, filter);
    expect(result && result[0].url).to.equal(resources[0].url);
  });

  it("filters on resourceType", () => {
    const filter: QueryFilter = { resourceType: "tip" };
    const result = getResources(resources, filter);
    expect(result).to.have.length(3);
  });

  it("filters on channel", () => {
    const filter: QueryFilter = { channel: "/channels/some-channel/" };
    const result = getResources(resources, filter);
    expect(result).to.have.length(2);
  });

  it("filters on tag", () => {
    const filter: QueryFilter = { tag: "tag1" };
    const result = getResources(resources, filter);
    expect(result).to.have.length(1);
  });

  it("returns null when nothing matches", () => {
    const filter: QueryFilter = { tag: "tagXXX" };
    const result = getResources(resources, filter);
    expect(result).to.be.null;
  });

  it("limits results", () => {
    const filter: QueryFilter = { limit: 2 };
    const result = getResources(resources, filter);
    expect(result).to.have.length(2);
  });

  it("filters on resourceType and tag", () => {
    const filter: QueryFilter = { resourceType: "tip", tag: "tag1" };
    const result = getResources(resources, filter);
    expect(result).to.have.length(1);
  });

  it("filters on resourceType and tag and limit", () => {
    const filter: QueryFilter = { resourceType: "tip", tag: "tag1", limit: 1 };
    const result = getResources(resources, filter);
    expect(result).to.have.length(1);
  });
});

describe("Sort By", () => {
  let theseItems: EleventyCollectionItem[] = [];
  beforeEach(() => {
    theseItems = [...fixtures.all];
    theseItems[0].page.date = new Date("2024-01-01");
  });

  test("respects default sort order", () => {
    expect(theseItems[0].data.title).to.equal("Some Tip");
    sortByFrontmatter(theseItems);
    expect(theseItems[0].data.title).to.equal("Some Tip");
  });

  test("sorts on title", () => {
    expect(theseItems[0].data.title).to.equal("Some Tip");
    sortByFrontmatter(theseItems, "title");
    expect(theseItems[0].data.title).to.equal("Third Tutorial Step");
  });

  test("sorts on date", () => {
    expect(theseItems[0].data.title).to.equal("Some Tip");
    sortByFrontmatter(theseItems, "date");
    expect(theseItems[0].data.title).to.equal("Another Tip");
  });

  test("reverse sorts on a field", () => {
    expect(theseItems[0].data.title).to.equal("Some Tip");
    sortByFrontmatter(theseItems, "-title");
    expect(theseItems[0].data.title).to.equal("Another Author");
  });
});
