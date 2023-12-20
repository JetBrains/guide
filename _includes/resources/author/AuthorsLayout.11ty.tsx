import h, { JSX } from "vhtml";
import {
	ReferenceLayout,
	ReferenceLayoutProps,
} from "../../layouts/ReferenceLayout.11y";
import { Author } from "./AuthorModels";
import { LayoutContext } from "../../../src/models";

export function AuthorsLayout(
	this: LayoutContext,
	data: ReferenceLayoutProps
): JSX.Element {
	const { content } = data;
	const authors = this.getResources({
		resourceTypes: ["author"],
	}) as Author[];
	authors.sort((a, b) => {
		const aTitle = a.title.toLowerCase();
		const bTitle = b.title.toLowerCase();
		return aTitle < bTitle ? -1 : bTitle < aTitle ? 1 : 0;
	});

	const listing = (
		<section class="section">
			<div class="container">
				<div class="columns is-multiline">
					{authors.map((author) => {
						return (
							<div class="column is-6 is-4-desktop mb-5">
								<div class="is-flex">
									<span class="mr-4">
										<a href={author.url}>
											<figure class="image is-1by1 is-128x128">
												{author.isGuest && (
													<span class={"guest-author-badge"}>Guest</span>
												)}
												<img src={author.thumbnail} alt={author.title} />
											</figure>
										</a>
									</span>
									<div>
										<a
											href={author.url}
											aria-label={`Author`}
											class="is-size-5 has-text-weight-bold mb-2 title"
										>
											{author.title}
										</a>
										{author.subtitle && (
											<p class="has-text-grey-dark">{author.subtitle}</p>
										)}
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);

	return <ReferenceLayout {...data} listing={[listing]} content={content} />;
}

export const render = AuthorsLayout;
