import { Resource } from "../../src/ResourceModels";
import ListingSection from "../pageelements/ListingSection.11ty";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";

// The upper limit on the number of items to show
const ITEM_LIMIT = 3;

export type RelatedItemsProps = {
	currentResource: Resource;
	items: Resource[];
};

export type FilterItemsProps = {
	currentResource: Resource;
	items: Resource[];
};

type ScoredItem = {
	item: Resource;
	score: number;
};

export function filterResources({
	currentResource,
	items,
}: FilterItemsProps): Resource[] {
	const currentTopics = currentResource.topics;
	let scoredItems: ScoredItem[] = items
		// Never include the current resource as a related resource
		.filter((item) => item.url !== currentResource.url)

		// Check channels
		.filter((item) => {
			if (!currentResource.channel) {
				// This request didn't ask for a channel
				return true;
			} else {
				if (item.channel === undefined) {
					// Allow resources outside a channel
					return true;
				}
				// Check if this item's channel matches this resource's channel
				return item.channel === currentResource.channel;
			}
		})

		// Now get a tuple of (intersectionCount, resource) to "score" the
		// overlap between the tags
		.map((resource) => {
			// currentResource and/or this item might not have a topics field
			let score: number = 0;
			if (currentTopics && currentTopics.length) {
				score = currentTopics.filter((x) => {
					return resource.topics && resource.topics.includes(x);
				}).length;
			}
			return { score, item: resource };
		});

	// Reverse sort the scored items
	scoredItems.sort((a, b) => b.score - a.score);

	// Unpack just the resource
	return scoredItems.map((scoredItem) => scoredItem.item).slice(0, ITEM_LIMIT);
}

const RelatedResources = ({
	currentResource,
	items,
}: RelatedItemsProps): JSX.Element => {
	const filteredResources = filterResources({ currentResource, items });
	if (filteredResources.length) {
		return (
			<ListingSection
				title={`Related Resources`}
				resources={filteredResources}
				includeCardFooter={false}
				sectionExtraClass={"has-background-grey-lighter"}
			/>
		);
	}
	return <Fragment></Fragment>;
};

export default RelatedResources;
