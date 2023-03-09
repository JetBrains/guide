import { beforeEach, describe, expect, test } from "vitest";
import fixtures from "../_includes/fixtures";
import {
  CollectionApi,
  getAllCollections,
  resolveReference,
} from "./registration";
import { referenceCollections, resourceCollections } from "../_includes/config";
import { Tip } from "../_includes/resources/tip/TipModels";
import { AuthorFrontmatter } from "../_includes/references/author/AuthorModels";

const mockCollectionApi: CollectionApi = {
  getAll: () => fixtures.all,
  getFilteredByTag: () => fixtures.all,
};

test("should start with unresolved references on tips", () => {
  const tip0 = fixtures.collections.allResources.get("/tips/some-tip/");
  expect(tip0).to.exist;
  expect(tip0 && tip0.references).to.be.undefined;
});

test("a resource and a reference exist in fixture data", () => {
  const tip0 = fixtures.collections.allResources.get("/tips/some-tip/");
  const author0 = fixtures.collections.allReferences.get("author:sa");
  expect(tip0).to.exist;
  expect(author0).to.exist;
});

test("should construct collections", async () => {
  const { allReferences, allResources } = await getAllCollections({
    collectionApi: mockCollectionApi,
    resourceCollections,
    referenceCollections,
  });
  expect(allResources).to.exist;
  const tipItem0 = fixtures.tipItems[0];
  const thisTip0 = allResources.get(tipItem0.page.url) as Tip;
  expect(thisTip0).to.exist;

  // Authors
  const authorItem0 = fixtures.authorItems[0];
  const thisAuthor0 = allReferences.get(
    `author:${authorItem0.data.label}`
  ) as AuthorFrontmatter;
  expect(thisAuthor0).to.exist;
  expect(thisAuthor0.title).to.equal(authorItem0.data.title);

  // Topics
  const topic0Item = fixtures.topicItems[0];
  const thisTopic0 = allReferences.get(`topics:${topic0Item.data.label}`);
  expect(thisTopic0 && thisTopic0.title).to.equal(topic0Item.data.title);

  // Technologies
  const technology0Item = fixtures.technologyItems[0];
  const technology0 = allReferences.get(
    `technologies:${technology0Item.data.label}`
  );
  expect(technology0 && technology0.title).to.equal(technology0Item.data.title);

  // Let's look at references
  const refs = thisTip0.references;
  expect(refs).to.exist;
  expect(refs && refs.author.title).to.equal(authorItem0.data.title);
});

describe("Resolve References", () => {
  const allCollections = fixtures.collections;
  const allReferences = fixtures.collections.allReferences;
  const authorItem0 = fixtures.authorItems[0];
  const authorItem1 = fixtures.authorItems[1];
  let resource: Tip;
  const tip0 = fixtures.collections.allResources.get("/tips/some-tip/") as Tip;
  expect(tip0).to.exist;

  beforeEach(() => {
    resource = structuredClone(tip0);
  });

  test("allReferences should exist", () => {
    expect(allReferences.get("author:sa")).to.exist;
  });

  test("should throw error for undefined field", () => {
    const fieldName = "xxx";
    const resolver = () =>
      resolveReference({ fieldName, resource, allReferences });
    expect(resolver).toThrowError(`No reference field "xxx" on resource`);
  });

  test("should throw error for undefined label in array", () => {
    expect(resource.products && resource.products.length).to.be.gt(0);
    const fieldName = "products";
    resource.products = ["xxx", "yyy"];
    const resolver = () =>
      resolveReference({ fieldName, resource, allReferences });
    expect(resolver).toThrowError(
      `Resource "/tips/some-tip/" has unresolved reference "products:xxx"`
    );
  });

  test("should throw error for undefined label in value", () => {
    expect(resource.author).to.exist;
    const fieldName = "author";
    resource.author = "xxx";
    const resolver = () =>
      resolveReference({ fieldName, resource, allReferences });
    expect(resolver).toThrowError(
      `Resource "/tips/some-tip/" has unresolved reference "author:xxx"`
    );
  });

  test("resolve a set of references", () => {
    const tip0 = fixtures.collections.allResources.get(
      "/tips/some-tip/"
    ) as Tip;
    expect(tip0).to.exist;
    expect(tip0.references).not.to.exist;
    tip0.resolve(allCollections);
    expect(tip0.references).to.exist;
    if (tip0.references) {
      const refAuthor = tip0.references.author;
      expect(refAuthor.title).to.equal(authorItem0.data.title);
      const refProducts = tip0.references.products;
      const productItem0 = fixtures.productItems[0];
      expect(refProducts[0].title).to.equal(productItem0.data.title);
    }
  });

  test("resolve a missing products", () => {
    // Get a tip with no products in frontmatter
    const tip1 = fixtures.collections.allResources.get(
      "/tips/another-tip/"
    ) as Tip;
    expect(tip1).to.exist;
    expect(tip1.references).not.to.exist;
    tip1.resolve(allCollections);
    expect(tip1.references).to.exist;
    if (tip1.references) {
      const refAuthor = tip1.references.author;
      expect(refAuthor.title).to.equal(authorItem1.data.title);
      expect(tip1.references.products).to.exist;
    }
  });
});
