import { Resource } from "../src/ResourceModels";
import { EleventyCollectionItem } from "../src/models";
import { POSSIBLE_RESOURCE_TYPES, RESOURCE_TYPES } from "../src/resourceType";
import { ResourceMapType } from "./config";

export type RESOURCE_MODELS_BY_TYPE<
	RESOURCE extends RESOURCE_TYPES | POSSIBLE_RESOURCE_TYPES =
		| RESOURCE_TYPES
		| POSSIBLE_RESOURCE_TYPES
> = RESOURCE extends keyof ResourceMapType
	? Array<ResourceMapType[RESOURCE]>
	: RESOURCE extends Array<RESOURCE_TYPES>
	? Array<ResourceMapType[RESOURCE[number]]>
	: Resource[];

export type RESOURCE_MODEL_BY_TYPE<
	T extends RESOURCE_TYPES | POSSIBLE_RESOURCE_TYPES
> = T extends keyof ResourceMapType
	? ResourceMapType[T]
	: T extends Array<RESOURCE_TYPES>
	? ResourceMapType[T[number]]
	: Resource;

export type QueryFilter<
	T extends RESOURCE_TYPES | POSSIBLE_RESOURCE_TYPES =
		| RESOURCE_TYPES
		| POSSIBLE_RESOURCE_TYPES
> = {
	channel?: string;
	limit?: number;
	resourceTypes?: T;
	tag?: string;
	customFilter?: (resource: RESOURCE_MODEL_BY_TYPE<T>) => boolean;
	sorter?: (
		a: RESOURCE_MODEL_BY_TYPE<T>,
		b: RESOURCE_MODEL_BY_TYPE<T>
	) => number;
};

export function getResources<
	T extends RESOURCE_TYPES | POSSIBLE_RESOURCE_TYPES
>(
	allResourcesList: Resource[],
	filter: QueryFilter<T>
): RESOURCE_MODELS_BY_TYPE<T> | null {
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
		resources = resources.filter((x) =>
			customFilter(x as RESOURCE_MODEL_BY_TYPE<T>)
		);
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
		resources.sort((a, b) =>
			sorter(a as RESOURCE_MODEL_BY_TYPE<T>, b as RESOURCE_MODEL_BY_TYPE<T>)
		);
	} else {
		// Sort in reverse date order
		resources.sort((a, b) => b.date.getTime() - a.date.getTime());
	}
	return resources as RESOURCE_MODELS_BY_TYPE<T>;
}

// TODO PWE Get rid of this and just use collections.resourceMap
export function getResource(resources: Resource[], url: string): Resource {
	return resources.filter((r) => r.url == url)[0];
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
