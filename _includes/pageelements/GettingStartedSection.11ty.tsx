import { Resource } from "../../src/ResourceModels";
import ResourceCard from "../resourcecard/ResourceCard.11ty";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";
import VideoPlayer from "../video/VideoPlayer.11ty";

export type GettingStartedSectionProps = {
	title: string;
	subtitle?: string;
	anchor?: string;
	description: string[];
	whyVideoUrl: string;
	resources: Resource[];
	resourcesSubtitle?: string;
	resourcesSubtitleTip?: string;
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
	resources,
	resourcesSubtitle,
	resourcesSubtitleTip,
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

	const sectionResources = (
		<div class="columns is-multiline">
			{resources.map((resource) => {
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
			<div class="columns is-vcentered is-mobile">
				<div class="column is-8 is-10-tablet is-10-desktop">
					<h2 class="mt-2 mb-4 is-size-2 is-size-3-mobile has-text-weight-bold">
						{title}
					</h2>
					{subtitle && (
						<p class="subtitle is-size-3 is-size-4-mobile has-text-grey mb-5">
							{subtitle}
						</p>
					)}
				</div>
			</div>
			<div class="columns">
				<div class="column is-two-thirds content">
					{description.map((paragraph, _index) => {
						return <p>{paragraph}</p>;
					})}
				</div>
				<div class="column is-one-third">{whyVideo}</div>
			</div>
			<div class="container">
				{resourcesSubtitle && (
					<div
						title={resourcesSubtitleTip}
						class="is-size-3"
						style="margin-bottom: 1em"
					>
						{resourcesSubtitle}
					</div>
				)}
				{sectionResources}
			</div>
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
