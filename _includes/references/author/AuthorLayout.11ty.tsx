import h, { JSX } from "vhtml";
import {
	ReferenceLayout,
	ReferenceLayoutProps,
} from "../../layouts/ReferenceLayout.11y";
import { LayoutContext } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";
import { Resource } from "../../../src/ResourceModels";
import { Author } from "./AuthorModels";

export function AuthorLayout(
	this: LayoutContext,
	data: ReferenceLayoutProps
): JSX.Element {
	const { collections, content, page } = data;
	const author = collections.allReferences.get(
		`author:${page.fileSlug}`
	) as Author;
	if (!author) {
		throw new Error(`Author "${page.fileSlug}" not in collection`);
	}

	const linkedResources: Resource[] = this.getResources().filter(
		(ci) => ci.author === author.label
	);

	const figure = <img src={author.thumbnail} alt={author.title} />;
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

export const render = AuthorLayout;
