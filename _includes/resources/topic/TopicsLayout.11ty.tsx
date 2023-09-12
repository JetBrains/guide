import h, { JSX } from "vhtml";
import {
	ReferenceLayout,
	ReferenceLayoutProps,
} from "../../layouts/ReferenceLayout.11y";
import { Topic } from "./TopicModels";
import { LayoutContext } from "../../../src/models";

export function TopicsLayout(
	this: LayoutContext,
	data: ReferenceLayoutProps
): JSX.Element {
	const topics = this.getResources({
		resourceTypes: ["topic"],
	}) as Topic[];

	topics.sort((a, b) => {
		const aTitle = a.title.toLowerCase();
		const bTitle = b.title.toLowerCase();
		return aTitle < bTitle ? -1 : bTitle < aTitle ? 1 : 0;
	});

	const listing = (
		<section class="section">
			<div class="container">
				<div class="columns is-multiline">
					{topics.map((topic) => {
						let figure: string;
						if (topic.icon) {
							figure = (
								<i class={`${topic.icon} has-text-${topic.accent} fa-5x`} />
							);
						} else if (topic.logo) {
							figure = <img src={topic.logo} alt={topic.title} />;
						} else {
							figure = (
								<i class={`fas fa-file has-text-${topic.accent} fa-5x`} />
							);
						}

						return (
							<div class="column is-6 is-4-desktop mb-5 has-box-hover">
								<div class="is-flex has-position-relative">
									<span class="mr-4">
										<a href={topic.url}>
											<figure class="image is-128x128 has-text-centered">
												{figure}
											</figure>
										</a>
									</span>
									<div>
										<a
											href={topic.url}
											aria-label={`Topic`}
											class="is-size-5 has-text-weight-bold mb-2 title is-stretched-link"
										>
											{topic.title}
										</a>
										{topic.subtitle && (
											<p class="has-text-grey-dark">{topic.subtitle}</p>
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

	return (
		<ReferenceLayout
			{...data}
			figure={undefined}
			listing={[listing]}
			content={data.content}
		/>
	);
}

export const render = TopicsLayout;
