import { beforeEach, describe, expect, test } from "vitest";

import { filterResources, RelatedItemsProps } from "./RelatedResources.11ty";
import fixtures from "../fixtures";
import { Resource } from "../../src/ResourceModels";

describe("Related Resources", () => {
	let props: RelatedItemsProps, currentResource: Resource;
	let thisItem: Resource;
	const renderedResources = Array.from(fixtures.resourceMap.values()).map(
		(r) => {
			thisItem = structuredClone(r);
			// By default, set all the content to be in a channel
			thisItem.channel = "zzzzzzz";
			return thisItem;
		}
	);

	beforeEach(() => {
		currentResource = structuredClone(fixtures.resources[0]);

		// Make sure the current resource's URL won't match any fixture resources
		currentResource.url = "xxxxxxxxx";
		props = {
			currentResource,
			items: renderedResources,
		};
	});

	test("filter related resources when current has no channel", () => {
		props.currentResource.channel = undefined;
		const results = filterResources(props);
		expect(results).toHaveLength(3);
	});

	test("filter related resources when current has no channel", () => {
		props.currentResource.channel = undefined;
		const results = filterResources(props);
		expect(results).toHaveLength(3);
	});

	test("filter when current is in a channel and no related", () => {
		props.currentResource.channel = "/dotnet/";
		const results = filterResources(props);
		expect(results).toHaveLength(0);
	});

	test("filter when current is in a channel and one related", () => {
		props.currentResource.channel = "/dotnet/";
		props.items[0].channel = "/dotnet/";
		const results = filterResources(props);
		expect(results).toHaveLength(1);
	});

	test("filter when current is in a channel and one related in channel", () => {
		props.currentResource.channel = "/dotnet/";
		props.items[0].channel = "/dotnet/";
		const results = filterResources(props);
		expect(results).toHaveLength(1);
	});

	test("filter when current is in a channel and one related at root", () => {
		props.currentResource.channel = "/dotnet/";
		delete props.items[0].channel;
		const results = filterResources(props);
		expect(results).toHaveLength(1);
	});

	test("filter when current is in a channel and one related", () => {
		props.currentResource.channel = "/dotnet/";
		props.currentResource.topics = ["t1", "t2", "t3", "t4"];
		props.items[0].channel = "/dotnet/";
		props.items[1].channel = "/dotnet/";
		props.items[2].channel = "/dotnet/";
		props.items[0].topics = ["t1", "t2"];
		props.items[1].topics = ["t1", "t2", "t3"];
		props.items[2].topics = ["t1", "t2", "t3", "t4"];
		const results = filterResources(props);
		expect(results).toHaveLength(3);
		expect(results[0].url).toEqual(props.items[2].url);
	});
});
