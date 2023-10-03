import { Resource } from "../../src/ResourceModels";
import ResourceCard from "../resourcecard/ResourceCard.11ty";
import h from "vhtml";

export type ListingSectionProps = {
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

function ListingSection({
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
}: ListingSectionProps) {
	/* A reusable component for section-style paginated ResourceCard listings */
	const columnClassName = isSection
		? undefined
		: "is-half-tablet is-one-third-desktop";

	const sectionClassName = sectionExtraClass ? sectionExtraClass : "";

	const listing = (
		<div class="columns is-multiline">
			{resources.map((resource) => {
				return (
					<ResourceCard
						resource={resource}
						columnClassName={columnClassName}
						includeCardFooter={includeCardFooter}
						includeContentType={includeContentType}
					></ResourceCard>
				);
			})}
		</div>
	);

	const container = (
		<div className="container" id={anchor}>
			<div className="columns is-vcentered is-mobile">
				<div className="column is-8">
					<h2 className="mt-2 mb-4 is-size-1 has-text-weight-bold">{title}</h2>
					{subtitle && (
						<p className="subtitle has-text-grey mb-5">{subtitle}</p>
					)}
				</div>
				{moreLink && (
					<div className="column has-text-right">
						<a className="button is-rounded is-outlined" href={moreLink}>
							More...
						</a>
					</div>
				)}
			</div>
			<div className="container">{listing}</div>
		</div>
	);

	const result = isSection ? (
		<section class={`section ${sectionClassName}`}>{container}</section>
	) : (
		container
	);

	return (
		<>
			{separator && (
				<section class="container">
					<hr />
				</section>
			)}
			{result}
		</>
	);
}

export default ListingSection;
