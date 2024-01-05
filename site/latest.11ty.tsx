// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { LayoutContext } from "../src/models";
import {
	ReferenceLayout,
	ReferenceLayoutProps,
} from "../_includes/layouts/ReferenceLayout.11y";
import { Resource } from "../src/ResourceModels";
import ResourceCard from "../_includes/resourcecard/ResourceCard.11ty";

export default class LatestLayout {
	data() {
		return {
			eleventyExcludeFromCollections: true,
			layout: "",
			title: "Latest",
			subtitle: " All the resources in the Guide, starting with most recent.",
			pagination: {
				data: "collections.all",
				size: 12,
				reverse: true,
				before: function (paginationData: any[], fullData: any) {
					const results: Resource[] = [];
					const { resourceMap } = fullData.collections;
					let thisItem: any;
					paginationData.forEach((item: any) => {
						thisItem = resourceMap.get(item.url);
						if (thisItem) {
							results.push(thisItem);
						}
					});
					return results;
				},
			},
		};
	}

	render(this: LayoutContext, data: ReferenceLayoutProps): JSX.Element {
		const { content, pagination } = data;

		const listing = (
			<>
				{pagination &&
					pagination.items.map((tip) => {
						return <ResourceCard resource={tip}></ResourceCard>;
					})}
			</>
		);
		return <ReferenceLayout {...data} listing={[listing]} content={content} />;
	}
}
