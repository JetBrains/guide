/**
 * Content registration in a site
 */
import { EleventyCollectionItem } from "./models";
import { UserConfig } from "@11ty/eleventy";
import {
	getResourceType,
	Resource,
	ResourceFrontmatter,
	ResourceMap,
} from "./ResourceModels";

export type CollectionApi = {
	getAll(): EleventyCollectionItem[];
	getFilteredByTag(a: string): EleventyCollectionItem[];
};
export type RegisterIncludesProps = {
	eleventyConfig: UserConfig;
};

type MakeResource = {
	item: EleventyCollectionItem;
	resourceClasses: {
		// TODO JNW Shouldn't return any
		[key: string]: any;
	};
};

export function makeResource({ item, resourceClasses }: MakeResource) {
	const { data, page } = item;
	const resourceType = getResourceType(data, page);
	const resourceClass = resourceClasses[resourceType];
	return new resourceClass({ data, page });
}

export type MakeResources = {
	collectionItems: EleventyCollectionItem[];
	resourceClasses: {
		[key: string]: any;
	};
};

export function makeResources({
	collectionItems,
	resourceClasses,
}: MakeResources): Resource[] {
	/* Process Eleventy collections.all and filter things with resource type */
	const allResourceItems: EleventyCollectionItem[] = collectionItems.filter(
		(ci) => ci.data.resourceType
	);
	return allResourceItems.map((item) => {
		return makeResource({ item, resourceClasses });
	});
}

export function makeResourceMap(resources: Resource[]): ResourceMap {
	/* Make mapping of resources with correct keys (URL vs. label) */
	const allResources = new Map();

	resources.forEach((resource) => {
		let key: string;
		// @ts-ignore
		if (resource.label) {
			// References use the label as the key instead of the url
			// @ts-ignore
			key = `${resource.constructor.joinKey}:${resource.label}`;
		} else {
			key = resource.url;
		}
		allResources.set(key, resource);
	});
	return allResources;
}

export function resolveResourceMap(resourceMap: ResourceMap): ResourceMap {
	/* Make mapping of resources with correct keys (URL vs. label) */

	Array.from(resourceMap.values()).map((resource) =>
		resource.resolve(resourceMap)
	);

	return resourceMap;
}

export type GetResourceMap = {
	collectionApi: CollectionApi;
	resourceClasses: {
		[key: string]: any;
	};
};

export function getResourceMap({
	collectionApi,
	resourceClasses,
}: GetResourceMap): ResourceMap {
	/* Called from config with the collection API, then calls helpers here */
	const collectionItems = collectionApi.getAll();
	const resources = makeResources({ collectionItems, resourceClasses });
	const resourceMap = makeResourceMap(resources);
	resolveResourceMap(resourceMap);
	return resourceMap;
}

export type ResolveReferenceProps = {
	fieldName: Exclude<keyof Resource, "date" | "resolve" | "references">;
	resource: Resource;
	resourceMap: ResourceMap;
};

export function resolveReference({
	fieldName,
	resource,
	resourceMap,
}: ResolveReferenceProps): ResourceFrontmatter | ResourceFrontmatter[] {
	/* Return the matching reference or references  */

	const thisFieldValue = resource[fieldName];
	if (!thisFieldValue) {
		// Never ask for a reference field that doesn't exist on resource.
		throw new Error(
			`No reference field "${fieldName}" on resource ${resource.url}`
		);
	}

	if (typeof thisFieldValue === "function") {
		throw new Error(
			`Cannot get value from method "${fieldName}" on resource ${resource.url}`
		);
	}

	if (Array.isArray(thisFieldValue)) {
		// resource.author is a single value, but resource.topics etc. array
		return thisFieldValue.map((label) => {
			const resolvedLabel = `${fieldName}:${label}`;
			const reference = resourceMap.get(resolvedLabel);
			if (!reference) {
				throw new Error(
					`Resource "${resource.url}" has unresolved reference "${resolvedLabel}"`
				);
			}
			return reference;
		});
	} else {
		// Single-value reference like author
		const resolvedLabel = `${fieldName}:${thisFieldValue}`;

		const reference = resourceMap.get(resolvedLabel);
		if (!reference && fieldName == "channel") {
			const channel = resourceMap.get(thisFieldValue);
			if (channel) return channel;
		}
		if (!reference) {
			throw new Error(
				`Resource "${resource.url}" has unresolved reference "${resolvedLabel}"`
			);
		}
		return reference;
	}
}
