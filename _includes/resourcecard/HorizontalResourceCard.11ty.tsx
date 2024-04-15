import { Resource } from "../../src/ResourceModels";
import { Topic } from "../resources/topic/TopicModels";
import TopicTag from "../resources/topic/TopicTag.11ty";
import { AuthorIcon, doesExist } from "./Utilities.11ty";

export type HorizontalResourceCardProps = {
	resource: Resource;
	columnClassName?: string;
	includeCardFooter?: boolean;
	showThumbnail?: boolean;
	showAuthor?: boolean;
};

const HorizontalResourceCard = ({
	resource: { url, title, displayDate, subtitle, references },
	resource,
	columnClassName,
	includeCardFooter = true,
	showThumbnail = true,
	showAuthor = true,
}: HorizontalResourceCardProps): JSX.Element => {
	doesExist(references);
	const { author, topics } = references;
	let thumbnail = resource.getThumbnail();

	const columnCssClass = columnClassName ? columnClassName : "is-12 pb-0";

	return (
		<div class={`column ${columnCssClass}`}>
			<div class="card is-equal-height has-box-outline has-box-hover is-shadowless has-background-white-bis">
				<div class="card-content">
					<article class="media">
						{showThumbnail && (
							<figure class="media-left m-0 mr-4 is-hidden-mobile is-contained image is-80px">
								<a href={url}>
									<img width={140} height={80} src={thumbnail} alt={title} />
								</a>
							</figure>
						)}
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
									<div class="tags my-2">
										{topics.map((topic: Topic) => (
											<TopicTag topic={topic} />
										))}
									</div>

									{showAuthor && (
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
														<a href={author.url}>
															{author.title}{" "}
															{(author as any).isGuest && "(Community)"}
														</a>
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
									)}
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
