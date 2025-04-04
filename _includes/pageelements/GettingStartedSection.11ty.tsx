import { Resource } from "../../src/ResourceModels";
import ResourceCard from "../resourcecard/ResourceCard.11ty";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";
import VideoPlayer from "../video/VideoPlayer.11ty";

export type GettingStartedSectionProps = {
	title: string;
	subtitle?: string;
	anchor?: string;
	moreLink?: string;
	resources: Resource[];
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
	moreLink,
	resources,
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

	const learnMore = (
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

	const whyVideoUrl = "https://www.youtube.com/watch?v=Y80rIKoSSSU";
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
				{moreLink && (
					<div class="column has-text-right">
						<a class="button is-rounded is-outlined" href={moreLink}>
							More...
						</a>
					</div>
				)}
			</div>
			<div class="columns">
				<div class="column is-two-thirds content">
					<p>
						That’s a look at the updated AI Assistant. Briefly summarized: Local
						and cloud completion, powerful models, deep IDE integration, in chat
						or your editor window.
					</p>
					<p>
						That’s a look at the updated AI Assistant. Briefly summarized: Local
						and cloud completion, powerful models, deep IDE integration, in chat
						or your editor window.
					</p>
				</div>
				<div class="column is-one-third">{whyVideo}</div>
			</div>
			<div class="container">
				<div
					title="Much longer sentence with "
					class="is-size-3"
					style="margin-bottom: 1em"
				>
					How To Use AI Assistant
				</div>
				{learnMore}
			</div>
			<div class="container">
				<div class="is-size-3" style="margin-bottom: 1em">
					Learn More
				</div>
				{learnMore}
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
