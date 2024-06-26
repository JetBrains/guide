import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { LayoutContext, LayoutProps } from "../../../src/models";
import { Topic, TopicFrontmatter } from "./TopicModels";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";

export type TopicLayoutData = LayoutProps & TopicFrontmatter;

export function TopicLayout(
	this: LayoutContext,
	data: TopicLayoutData,
): JSX.Element {
	const { collections, content, page } = data;
	const topic = collections.resourceMap.get(`topics:${page.fileSlug}`) as Topic;
	if (!topic) {
		throw new Error(`Topic "${page.fileSlug}" not in collection`);
	}

	const linkedResources = this.getResources().filter(
		// @ts-ignore
		(ci) => ci.topics && ci.topics.includes(topic.label),
	);

	const listing = (
		<Fragment>
			{linkedResources.map((resource) => (
				// @ts-ignore
				<ResourceCard resource={resource}></ResourceCard>
			))}
		</Fragment>
	);

	return <ReferenceLayout {...data} listing={listing} content={content} />;
}

// noinspection JSUnusedGlobalSymbols
export const render = TopicLayout;
