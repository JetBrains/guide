import { expect, test } from "vitest";
import fixtures from "../_includes/fixtures";
import {
	CollectionApi,
	getResourceMap,
	makeResource,
	makeResourceMap,
	makeResources,
	resolveResourceMap,
} from "./registration";
import { resourceClasses } from "../_includes/config";

const mockCollectionApi: CollectionApi = {
	getAll: () => fixtures.all,
	getFilteredByTag: () => fixtures.all,
};

test("make a resource from 11ty collection item data", () => {
	const item = fixtures.tipItems[0];
	const result = makeResource({ item, resourceClasses });
	expect(result.title).to.equal(item.data.title);
});

test("make resources from 11ty collection item data", () => {
	const collectionItems = fixtures.all;
	const result = makeResources({
		collectionItems,
		resourceClasses,
	});
	expect(result[0].title).to.equal(collectionItems[0].data.title);
});

test("initialize 11ty collection items into a map with correct keys", () => {
	const collectionItems = fixtures.all;
	const resources = makeResources({
		collectionItems,
		resourceClasses,
	});
	const resourceCollection = makeResourceMap(resources);
	expect(resourceCollection.get("/tips/some-tip/")).to.exist;
	expect(resourceCollection.get("author:sa")).to.exist;
	expect(resourceCollection.get("topics:sto")).to.exist;
});

test("resolve the references in a resource map", () => {
	const collectionItems = fixtures.all;
	const resources = makeResources({
		collectionItems,
		resourceClasses,
	});
	const resourceMap = makeResourceMap(resources);
	resolveResourceMap(resourceMap);
	const tip = resourceMap.get("/tips/some-tip/");
	expect(tip && tip.references && tip.references.author.url).to.equal(
		"/authors/sa/"
	);
});

test("simulate config calling with the collection API", () => {
	const resourceMap = getResourceMap({
		collectionApi: mockCollectionApi,
		resourceClasses,
	});
	const tip = resourceMap.get("/tips/some-tip/");
	expect(tip && tip.references && tip.references.author.url).to.equal(
		"/authors/sa/"
	);
});
