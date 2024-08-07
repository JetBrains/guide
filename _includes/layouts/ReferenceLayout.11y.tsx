import { BaseLayout } from "./BaseLayout.11ty";
import { LayoutProps } from "../../src/models";
import Pagination from "../pagination/Pagination.11ty";
import { ResourceFrontmatter } from "../../src/ResourceModels";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";

export type ReferenceLayoutProps = {
	content: string;
	listing: JSX.Element;
	logo?: string;
	thumbnail?: string;
	icon?: string;
	accent?: string;
} & LayoutProps &
	ResourceFrontmatter;

export function ReferenceLayout(data: ReferenceLayoutProps): JSX.Element {
	const { content, listing, pagination } = data;
	const safeListing = <div class="columns is-multiline">{listing}</div>;

	const pages = (
		<section class="section" aria-label="Pagination">
			<div class="container">
				{pagination && <Pagination pagination={pagination} />}
				{safeListing}
				{pagination && <Pagination pagination={pagination} />}
			</div>
		</section>
	);

	let figure: JSX.Element;
	if (data.thumbnail) {
		const isGuest = (data as any).guest;
		figure = (
			<Fragment>
				{isGuest && <span class={"guest-author-badge"}>Community</span>}
				<img src={data.thumbnail} alt={data.title} />
			</Fragment>
		);
	} else if (data.icon) {
		figure = <i class={`${data.icon} has-text-${data.accent} fa-5x`} />;
	} else if (data.logo) {
		figure = <img src={data.logo} alt={data.title} />;
	} else {
		figure = undefined;
	}

	return (
		<BaseLayout {...data}>
			<section class="section">
				<div class="container">
					<div class="is-flex">
						{figure && (
							<span class="mr-4">
								<figure class="image is-128x128 has-text-centered">
									{figure}
								</figure>
							</span>
						)}
						<div>
							<h1 class="mt-2 mb-4 title is-size-2 is-size-3-mobile has-text-weight-bold">
								{data.title}
							</h1>
							{data.subtitle && (
								<p class="subtitle is-size-4 has-text-grey mb-5">
									{data.subtitle}
								</p>
							)}
						</div>
					</div>
					{content && content != data.subtitle && (
						<div class="content pt-2">{content}</div>
					)}
				</div>
			</section>

			{pages}
		</BaseLayout>
	);
}
