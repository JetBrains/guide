import h, { JSX } from "vhtml";
import { Resource } from "../../src/ResourceModels";
import { Topic } from "../resources/topic/TopicModels";
import TopicTag from "../resources/topic/TopicTag.11ty";
import { AuthorIcon, doesExist } from "./Utilities.11ty";

export type HorizontalResourceCardProps = {
	resource: Resource;
	columnClassName?: string;
	includeCardFooter?: boolean;
};

const HorizontalResourceCard = ({
	resource: { url, title, displayDate, subtitle, references },
	resource,
	columnClassName,
	includeCardFooter = true,
}: HorizontalResourceCardProps): JSX.Element => {
	doesExist(references);
	const { author, topics } = references;
	let thumbnail = resource.getThumbnail();

	const columnCssClass = columnClassName ? columnClassName : "is-12";

	return (
		<div class={`column ${columnCssClass}`}>
			<div class="card is-equal-height has-box-outline has-box-hover is-shadowless has-background-white-bis">
				<div class="card-content">
					<article class="media">
						<figure class="media-left m-0 mr-4 is-hidden-mobile is-contained image is-128x128">
							<a href={url}>
								<img class="" src={thumbnail} alt={title} />
							</a>
						</figure>
						<div class="media-content">
							<div class="has-position-relative">
								<a
									class="title is-size-4 is-stretched-link"
									aria-label={`Resource`}
									href={url}
								>
									{title}
								</a>
								{subtitle && (
									<div class="content clamp clamp-3">{subtitle}</div>
								)}
							</div>

							{includeCardFooter && (
								<footer>
									<div>
										<div class="tags my-2">
											{topics.map((topic: Topic) => (
												<TopicTag topic={topic} />
											))}
										</div>

										<div class="media author">
											<div class="p-2 media-left">
												<a href={author.url}>
													<figure class="image m-0 is-24x24">
														<AuthorIcon {...author} />
													</figure>
												</a>
											</div>
											<div class="media-content">
												<div class="content is-size-7">
													<p class="m-0">
														<a href={author.url}>{author.title}</a>
													</p>
													<time
														class="m-0 has-text-grey-dark"
														datetime={displayDate}
													>
														{displayDate}
													</time>
												</div>
											</div>
										</div>
									</div>
								</footer>
							)}
						</div>
					</article>
				</div>
			</div>
		</div>
	);
};

export default HorizontalResourceCard;
