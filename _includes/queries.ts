import { Resource } from "../src/ResourceModels";
import { Reference, ReferenceFrontmatter } from "../src/ReferenceModels";
import { EleventyCollectionItem } from "../src/models";
import { POSSIBLE_RESOURCE_TYPES, RESOURCE_TYPES } from "../src/resourceType";

export type QueryFilter = {
	channel?: string;
	limit?: number;
	resourceTypes?: RESOURCE_TYPES | POSSIBLE_RESOURCE_TYPES;
	tag?: string;
	customFilter?: (resource: Resource) => boolean;
	sorter?: (a: Resource, b: Resource) => number;
};

export function getResources(
	allResourcesList: Resource[],
	filter: QueryFilter
): Resource[] | null {
	let resources = allResourcesList;
	const types =
		filter && filter.resourceTypes != null
			? Array.isArray(filter.resourceTypes)
				? [...filter.resourceTypes]
				: [filter.resourceTypes]
			: undefined;
	if (types) {
		resources = resources.filter((r) => types.includes(r.resourceType!));
	}

	const tag = filter && filter.tag;
	if (tag) {
		resources = resources.filter((r) => r.tags?.includes(tag));
	}

	const channel = filter && filter.channel;
	if (channel) {
		resources = resources.filter((r) => r.channel == channel);
	}

	const customFilter = filter && filter.customFilter;
	if (customFilter) {
		resources = resources.filter(customFilter);
	}

	const limit = filter && filter.limit;
	if (limit) {
		resources = resources.slice(0, limit);
	}

	if (resources.length == 0) {
		return null;
	}

	const sorter = filter && filter.sorter;
	if (sorter) {
		// Sort by custom sorter
		resources.sort(sorter);
	} else {
		// Sort in reverse date order
		resources.sort((a, b) => b.date.getTime() - a.date.getTime());
	}
	return resources;
}

export function getResource(
	allResourcesList: Resource[],
	url: string
): Resource {
	return allResourcesList.filter((r) => r.url == url)[0];
}

export function getReference(
	allReferencesList: Reference[],
	url: string
): Reference {
	return allReferencesList.filter((r) => r.url == url)[0];
}

export function getReferences(
	allReferencesList: ReferenceFrontmatter[],
	{ resourceTypes }: QueryFilter
): ReferenceFrontmatter[] | null {
	let references = allReferencesList;
	if (resourceTypes) {
		references = references.filter((r) =>
			resourceTypes.includes(r.resourceType!)
		);
	}

	if (references.length == 0) {
		return null;
	}

	return references;
}

export function sortByFrontmatter(
	items: EleventyCollectionItem[],
	sortByOption?: string
) {
	if (!sortByOption) {
		return;
	}

	let sortOrder = 1;
	if (sortByOption[0] === "-") {
		sortOrder = -1;
		sortByOption = sortByOption.substring(1);
	}

	switch (sortByOption) {
		case "title":
			items.sort((a, b) => {
				const aTitle = a.data.title.toLowerCase();
				const bTitle = b.data.title.toLowerCase();
				return (aTitle > bTitle ? -1 : bTitle > aTitle ? 1 : 0) * sortOrder;
			});
			break;
		case "date":
			items.sort((a, b) => {
				let result = a.page.date.getTime() - b.page.date.getTime();
				return result * sortOrder;
			});
			break;
		default:
			break;
	}
}
