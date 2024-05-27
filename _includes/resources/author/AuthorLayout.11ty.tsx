import {
	ReferenceLayout,
	ReferenceLayoutProps,
} from "../../layouts/ReferenceLayout.11y";
import { LayoutContext } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";
import { Author } from "./AuthorModels";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";
import { renderToString } from "jsx-async-runtime";

export async function AuthorLayout(
	this: LayoutContext,
	data: ReferenceLayoutProps,
): Promise<string> {
	const { collections, content, page } = data;
	const author = collections.resourceMap.get(
		`author:${page.fileSlug}`,
	) as Author;
	if (!author) {
		throw new Error(`Author "${page.fileSlug}" not in collection`);
	}

	const linkedResources = this.getResources().filter(
		// @ts-ignore
		(ci) => ci.author === author.label,
	);

	const listing = (
		<Fragment>
			{linkedResources.map((resource) => (
				// @ts-ignore
				<ResourceCard resource={resource}></ResourceCard>
			))}
		</Fragment>
	);

	return await renderToString(
		<ReferenceLayout {...data} listing={listing} content={content} />,
	);
}

export const render = AuthorLayout;
