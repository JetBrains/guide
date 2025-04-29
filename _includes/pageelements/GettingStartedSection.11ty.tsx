import { Resource } from "../../src/ResourceModels";
import ResourceCard from "../resourcecard/ResourceCard.11ty";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";
import VideoPlayer from "../video/VideoPlayer.11ty";

export type GettingStartedSectionProps = {
	title: string;
	subtitle?: string;
	anchor?: string;
	description: string;
	whyVideoUrl: string;
	howToResources: Resource[];
	howToResourcesSubtitle?: string;
	howToResourcesSubtitleTip?: string;
	learnMoreResources?: Resource[];
	learnMoreResourcesSubtitle?: string;
	learnMoreResourcesSubtitleTip?: string;
	learnMoreLink?: string;
	separator?: boolean;
	isSection?: boolean;
	includeCardFooter?: boolean;
	sectionExtraClass?: string;
	includeContentType?: boolean;
};

function GettingStartedSection({
	title,
	subtitle,
	anchor,
	description,
	whyVideoUrl,
	howToResources,
	howToResourcesSubtitle,
	howToResourcesSubtitleTip,
	learnMoreResources,
	learnMoreResourcesSubtitle,
	learnMoreResourcesSubtitleTip,
	learnMoreLink,
	separator,
	isSection = true,
	includeCardFooter = true,
	sectionExtraClass,
	includeContentType = false,
}: GettingStartedSectionProps) {
	/* A reusable component for section-style paginated ResourceCard listings */
	const columnClassName = isSection
		? undefined
		: "is-half-tablet is-one-third-desktop";

	const sectionClassName = sectionExtraClass ? sectionExtraClass : "";

	const sectionHowToResources = (
		<div class="columns is-multiline">
			{howToResources.map((resource) => {
				return (
					<ResourceCard
						compactMode={true}
						resource={resource}
						columnClassName={
							howToResources.length == 5
								? "is-one-fifth-desktop"
								: columnClassName
						}
						includeCardFooter={includeCardFooter}
						includeContentType={includeContentType}
						hideTitle={true}
					></ResourceCard>
				);
			})}
		</div>
	);

	const sectionLearnMoreResources = (
		<div class="columns is-multiline">
			{learnMoreResources &&
				learnMoreResources.slice(0, 4).map((resource) => {
					return (
						<ResourceCard
							compactMode={true}
							resource={resource}
							columnClassName={columnClassName}
							includeCardFooter={includeCardFooter}
							includeContentType={includeContentType}
						></ResourceCard>
					);
				})}
		</div>
	);

	const whyVideo = <VideoPlayer source={whyVideoUrl} />;

	const container = (
		<div class="container" id={anchor}>
			<h2 class="mt-2 mb-4 is-size-2 is-size-3-mobile has-text-weight-bold">
				{title}
			</h2>
			{subtitle && (
				<p class="subtitle is-size-3 is-size-4-mobile has-text-grey mb-5">
					{subtitle}
				</p>
			)}
			<div class="columns">
				<div class="column is-two-thirds content">{description}</div>
				<div class="column is-one-third">{whyVideo}</div>
			</div>
			<div class="container">
				{howToResourcesSubtitle && (
					<div
						title={howToResourcesSubtitleTip}
						class="is-size-3"
						style="margin-bottom: 1em"
					>
						{howToResourcesSubtitle}
					</div>
				)}
				{sectionHowToResources}
			</div>
			{learnMoreResources && (
				<div class="container">
					<div class="columns is-vcentered is-mobile">
						<div class="column is-10 is-10-tablet is-10-desktop">
							{learnMoreResourcesSubtitle && (
								<div title={learnMoreResourcesSubtitleTip} class="is-size-3">
									{learnMoreResourcesSubtitle}
								</div>
							)}
						</div>
						{learnMoreLink && learnMoreResources?.length > 4 && (
							<div class="column is-2 has-text-right">
								<a class="button is-rounded is-outlined" href={learnMoreLink}>
									More...
								</a>
							</div>
						)}
					</div>
					{sectionLearnMoreResources}
				</div>
			)}
		</div>
	);

	const result = isSection ? (
		<section class={`section ${sectionClassName}`}>{container}</section>
	) : (
		container
	);

	return (
		<Fragment>
			{separator && (
				<section class="container">
					<hr />
				</section>
			)}
			{result}
		</Fragment>
	);
}

export default GettingStartedSection;
