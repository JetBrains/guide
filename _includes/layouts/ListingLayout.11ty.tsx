import {
	EleventyCollectionItem,
	LayoutContext,
	LayoutProps,
} from "../../src/models";
import ResourceCard from "../resourcecard/ResourceCard.11ty";
import { ResourceFrontmatter } from "../../src/ResourceModels";
import { BaseLayout } from "./BaseLayout.11ty";
import Pagination from "../pagination/Pagination.11ty";
import { sortByFrontmatter } from "../queries";

type FullData = {
	pagination: {
		resourceType?: string;
		sortBy?: string;
	};
} & ResourceFrontmatter;

type ListingLayoutProps = {
	content?: string;
	figure?: string[];
	listing: string[];
} & LayoutProps &
	ResourceFrontmatter;

export default class ListingLayout {
	data() {
		return {
			eleventyExcludeFromCollections: true,
			pagination: {
				data: "collections.all",
				size: 12,
				reverse: true,
				before: function (
					paginationData: EleventyCollectionItem[],
					fullData: FullData
				): EleventyCollectionItem[] {
					// Get pagination.resourceType and pagination.channel, if present
					const { resourceType } = fullData.pagination;
					const { sortBy }: { sortBy?: string } = fullData.pagination;
					const channel = fullData.channel;
					const result = paginationData
						.filter((item) => {
							return !(resourceType && resourceType != item.data.resourceType);
						})
						.filter((item) => {
							return !(channel && channel != item.data.channel);
						});

					sortByFrontmatter(result, sortBy);
					return result;
				},
			},
		};
	}

	render(this: LayoutContext, data: ListingLayoutProps): JSX.Element {
		const { content, figure, pagination } = data;
		const paginationItems = pagination ? pagination.items : [];
		const resources = paginationItems.map((r: any) => {
			return this.getResource(r.url);
		});

		const pages = (
			<section class="section" aria-label="Pagination">
				<div class="container">
					{pagination && <Pagination pagination={pagination} />}
					<div class="columns is-multiline">
						{resources.map((resource) => {
							return (
								<ResourceCard
									resource={resource}
									includeContentType={false}
									includeCardFooter={resource.resourceType != "channel"}
								/>
							);
						})}
					</div>
					{pagination && <Pagination pagination={pagination} />}
				</div>
			</section>
		);

		return (
			<BaseLayout {...data}>
				<section class="section">
					<div class="container">
						<div class="is-flex">
							{figure && (
								<span class="mr-4">
									<figure class="image is-128x128">{figure}</figure>
								</span>
							)}
							<div>
								<h1 class="mt-2 mb-4 is-size-1 has-text-weight-bold">
									{data.title}
								</h1>
								{data.subtitle && (
									<p class="subtitle has-text-grey mb-5">{data.subtitle}</p>
								)}
							</div>
						</div>
						{content && <div class="content pt-2">{content}</div>}
					</div>
				</section>

				{pages}
			</BaseLayout>
		);
	}
}
