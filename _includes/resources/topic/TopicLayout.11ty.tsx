import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { LayoutContext, LayoutProps } from "../../../src/models";
import { Topic, TopicFrontmatter } from "./TopicModels";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";

export type TopicLayoutData = LayoutProps & TopicFrontmatter;

export function TopicLayout(
	this: LayoutContext,
	data: TopicLayoutData
): JSX.Element {
	const { collections, content, page } = data;
	const topic = collections.resourceMap.get(`topics:${page.fileSlug}`) as Topic;
	if (!topic) {
		throw new Error(`Topic "${page.fileSlug}" not in collection`);
	}

	const linkedResources = this.getResources().filter(
		(ci) => ci.topics && ci.topics.includes(topic.label)
	);

	let figure = "";
	if (topic.icon) {
		figure = <i class={`${topic.icon} has-text-${topic.accent} fa-7x`} />;
	} else if (topic.logo) {
		figure = <img src={topic.logo} alt={topic.title} />;
	}
	const listing = (
		<>
			{linkedResources.map((resource) => (
				<ResourceCard resource={resource}></ResourceCard>
			))}
		</>
	);
	const contentDiv = <div dangerouslySetInnerHTML={{ __html: content }} />;

	return (
		<ReferenceLayout
			{...data}
			figure={[figure]}
			listing={[listing]}
			content={contentDiv}
		/>
	);
}

export const render = TopicLayout;
