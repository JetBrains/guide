import {
	ReferenceLayout,
	ReferenceLayoutProps,
} from "../../layouts/ReferenceLayout.11y";
import { LayoutContext } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";
import { Tutorial } from "./TutorialModels";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";

export default class TutorialsLayout {
	data() {
		return {
			eleventyExcludeFromCollections: true,
			title: "Tutorials",
			subtitle:
				"Learn how to work with technologies using detailed, multi-step lessons accompanied by code samples, instructions, and videos.",
		};
	}

	render(this: LayoutContext, data: ReferenceLayoutProps): JSX.Element {
		const { content, pagination } = data;
		const paginationItems = pagination ? pagination.items : [];
		const tutorials: Tutorial[] = paginationItems.map((t: any) => {
			return this.getResource(t.url) as Tutorial;
		});

		const listing = (
			<Fragment>
				{tutorials.map((tutorial) => {
					return <ResourceCard resource={tutorial}></ResourceCard>;
				})}
			</Fragment>
		);
		return <ReferenceLayout {...data} listing={listing} content={content} />;
	}
}
