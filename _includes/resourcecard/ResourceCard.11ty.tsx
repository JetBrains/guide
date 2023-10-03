import h, { JSX } from "vhtml";
import ConsistentHash from "consistent-hash";
import { References, Resource } from "../../src/ResourceModels";
import { Topic } from "../resources/topic/TopicModels";
import TopicTag from "../resources/topic/TopicTag.11ty";
import { AuthorFrontmatter } from "../resources/author/AuthorModels";
import {
	ARTICLE_RESOURCE,
	CHANNEL_RESOURCE,
	LINK_RESOURCE,
	PLAYLIST_RESOURCE,
	TIP_RESOURCE,
	TUTORIAL_RESOURCE,
	TUTORIAL_STEP_RESOURCE,
} from "../../src/resourceType";
import { Link } from "../resources/link/LinkModels";

const glowColorHashRing = new ConsistentHash({
	range: 100003,
	weight: 85,
	distribution: "uniform",
});
glowColorHashRing.add("has-glow-magenta");
glowColorHashRing.add("has-glow-pink");
glowColorHashRing.add("has-glow-fresh-green");
glowColorHashRing.add("has-glow-cold-green");
glowColorHashRing.add("has-glow-orange");
glowColorHashRing.add("has-glow-red");
glowColorHashRing.add("has-glow-purple");

export enum ResourceCardOrientation {
	Portrait = 0,
	Landscape = 1,
}

export type ResourceCardProps = {
	resource: Resource;
	orientation?: ResourceCardOrientation;
	columnClassName?: string;
	hasShadow?: boolean;
	includeCardFooter?: boolean;
	compactMode?: boolean;
	includeContentType?: boolean;
};

const lazyLoading = "lazy" as const;

export const AuthorIcon = (
	author: Pick<AuthorFrontmatter, "thumbnail" | "title">
) => (
	<img
		src={author.thumbnail}
		alt={author.title}
		loading={lazyLoading}
		class="avatar"
	/>
);

function doesExist(resource: References | undefined): asserts resource {
	if (!resource) {
		throw new Error("Resource does not exist");
	}
}

function describeContentType(resourceType: string, resource: Resource) {
	let contentType = "";
	switch (resourceType) {
		case TIP_RESOURCE:
		case ARTICLE_RESOURCE:
		case TUTORIAL_RESOURCE:
		case PLAYLIST_RESOURCE:
		case CHANNEL_RESOURCE:
			contentType = resourceType;
			break;
		case TUTORIAL_STEP_RESOURCE:
			contentType = "Part of tutorial";
			break;
		case LINK_RESOURCE:
			contentType = resourceType;
			const linkResource = resource as Link;
			if (
				linkResource.linkURL.indexOf("youtube.com") >= 0 ||
				linkResource.linkURL.indexOf("youtu.be") >= 0
			) {
				contentType = "YouTube";
			} else if (linkResource.linkURL.indexOf("blog.jetbrains.com") >= 0) {
				contentType = "JetBrains Blog";
			} else if (
				linkResource.linkURL.indexOf("jetbrains.com") >= 0 &&
				linkResource.linkURL.indexOf("help") >= 0
			) {
				contentType = "Documentation";
			} else if (linkResource.linkURL.indexOf("medium.com") >= 0) {
				contentType = "Medium";
			}
			break;
	}
	return contentType;
}

const ResourceCard = ({
	resource: { resourceType, url, title, displayDate, subtitle, references },
	orientation,
	resource,
	columnClassName,
	hasShadow = false,
	includeCardFooter = true,
	compactMode = false,
	includeContentType = true,
}: ResourceCardProps): JSX.Element => {
	doesExist(references);
	const { author, topics } = references;
	let thumbnail = resource.getThumbnail();

	if (orientation == null || orientation == ResourceCardOrientation.Portrait) {
		// Thumbnail
		const isThumbnailImage = thumbnail.indexOf("<img") >= 0;
		const thumbnailFigureCss = isThumbnailImage
			? "is-16by9 is-contained"
			: "is-16by9 has-text-centered";

		// Glow
		const glowCssClass =
			resourceType != CHANNEL_RESOURCE || !isThumbnailImage
				? glowColorHashRing.get(title + displayDate)
				: "";
		if (!isThumbnailImage && glowCssClass != "") {
			// when using glow, make sure icon-based thumbnails are shown with white text
			thumbnail = thumbnail.replace("has-text-primary", "has-text-white");
		}

		// Custom CSS classes
		const columnCssClass = columnClassName
			? columnClassName
			: "is-half-tablet is-one-quarter-desktop";

		const cardCssClass = hasShadow ? "" : "is-shadowless";

		// Content type
		const contentType = describeContentType(resourceType, resource);

		return (
			<div class={`column ${columnCssClass}`}>
				<div
					class={`card is-equal-height has-box-outline has-box-hover ${cardCssClass}`}
				>
					<div class="card-image">
						<a href={url}>
							<figure
								class={`image ${thumbnailFigureCss} ${glowCssClass}`}
								dangerouslySetInnerHTML={{ __html: thumbnail }}
							></figure>
						</a>
					</div>
					<div class="card-content has-position-relative">
						{contentType && includeContentType && !compactMode && (
							<p className="subtitle is-size-7 is-uppercase">{contentType}</p>
						)}
						<a
							class="title is-size-5 is-stretched-link clamp-2 mb-1"
							aria-label={`Resource`}
							href={url}
						>
							{title}
						</a>
						{subtitle && !compactMode && (
							<div class="content clamp-5">{subtitle}</div>
						)}
					</div>
					{includeCardFooter && !compactMode && (
						<footer class="card-footer">
							<div class="container p-4">
								<div class="tags mb-2 clamp-1">
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
			</div>
		);
	} else {
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
									{subtitle && <div class="content clamp-3">{subtitle}</div>}
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
	}
};

export default ResourceCard;
