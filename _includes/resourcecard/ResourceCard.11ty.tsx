import h, { JSX } from "vhtml";
import ConsistentHash from "consistent-hash";
import { Resource } from "../../src/ResourceModels";
import { Topic } from "../resources/topic/TopicModels";
import TopicTag from "../resources/topic/TopicTag.11ty";
import { AuthorIcon, doesExist } from "./Utilities.11ty";

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

export type ResourceCardProps = {
	resource: Resource;
	columnClassName?: string;
	hasShadow?: boolean;
	includeCardFooter?: boolean;
	compactMode?: boolean;
	includeContentType?: boolean;
};

export type GetGlowInfoProps = {
	displayDate: string;
	title: string;
};

export function getGlowInfo({ displayDate, title }: GetGlowInfoProps): any {
	// Thumbnail

	const thumbnailFigureCss = "is-16by9 is-contained";
	// Glow
	const glowCssClass = glowColorHashRing.get(title + displayDate);

	return {
		thumbnailFigureCss,
		glowCssClass,
	};
}

const ResourceCard = ({
	resource: { url, title, displayDate, subtitle, references },
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

	// Data needed for glow info
	const { thumbnailFigureCss, glowCssClass } = getGlowInfo({
		displayDate,
		title,
	});

	// Custom CSS classes
	const columnCssClass = columnClassName
		? columnClassName
		: "is-half-tablet is-one-quarter-desktop";

	const cardCssClass = hasShadow ? "" : "is-shadowless";

	// Content type
	const contentType = resource.describeContentType();

	return (
		<div class={`column ${columnCssClass}`}>
			<div
				class={`card is-equal-height has-box-outline has-box-hover ${cardCssClass}`}
			>
				<div class="card-image">
					<a
						href={url}
						data-template-href="url"
						aria-hidden={true}
						tabindex={-1}
					>
						<figure
							data-template-class="thumbnailCss"
							class={`image ${thumbnailFigureCss} ${glowCssClass}`}
						>
							<img
								data-template-src="thumbnail"
								data-template-title="title"
								src={thumbnail}
								alt={title}
							/>
						</figure>
					</a>
				</div>
				<div class="card-content has-position-relative">
					{contentType && includeContentType && !compactMode && (
						<p
							className="subtitle is-size-7 is-uppercase"
							// TODO Paul remember this might be "Medium" etc. for Link
							data-template="contentType" // TODO Paul this should be replaced in explore as well
						>
							{contentType}
						</p>
					)}
					<a
						class="title is-size-5 is-stretched-link clamp clamp-2 mb-1"
						aria-label={title}
						data-template="title"
						href={url}
					>
						{title}
					</a>
					{subtitle && !compactMode && (
						<div class="content clamp clamp-5">{subtitle}</div>
					)}
				</div>
				{includeCardFooter && !compactMode && (
					<footer class="card-footer">
						<div class="container p-4">
							<div class="tags mb-2 clamp clamp-1">
								{topics.map((topic: Topic) => (
									<TopicTag topic={topic} />
								))}
							</div>

							<div class="media author">
								<div class="p-2 media-left">
									<a href={author.url} data-template-href="authorURL">
										<figure class="image m-0 is-24x24">
											<AuthorIcon {...author} />
										</figure>
									</a>
								</div>
								<div class="media-content">
									<div class="content is-size-7">
										<p class="m-0">
											<a
												href={author.url}
												data-template-href="authorURL"
												data-template="author"
											>
												{author.title}{" "}
												{(author as any).isGuest && "(Community)"}
											</a>
										</p>
										<time
											class="m-0 has-text-grey-dark"
											datetime={displayDate}
											data-template-datetime="datetime"
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
};

export default ResourceCard;
