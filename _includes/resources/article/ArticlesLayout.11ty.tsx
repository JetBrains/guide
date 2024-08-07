import {
	ReferenceLayout,
	ReferenceLayoutProps,
} from "../../layouts/ReferenceLayout.11y";
import { LayoutContext } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";
import { Article } from "./ArticleModels";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";

export default class ArticlesLayout {
	data() {
		return {
			eleventyExcludeFromCollections: true,
			title: "Articles",
			subtitle:
				"Visual, standalone, bite-sized learning resources organized into different categories.",
		};
	}

	render(this: LayoutContext, data: ReferenceLayoutProps): JSX.Element {
		const { content, pagination } = data;
		const paginationItems = pagination ? pagination.items : [];
		const articles: Article[] = paginationItems.map((t: any) => {
			return this.getResource(t.url) as Article;
		});

		const listing = (
			<Fragment>
				{articles.map((tip) => {
					return <ResourceCard resource={tip}></ResourceCard>;
				})}
			</Fragment>
		);
		return <ReferenceLayout {...data} listing={listing} content={content} />;
	}
}
