import { Resource } from "../../src/ResourceModels";
import ResourceCard from "../resourcecard/ResourceCard.11ty";

export type FeaturedResourceProps = {
	resource: Resource;
	children: string[];
};

function FeaturedResource({ resource, children }: FeaturedResourceProps) {
	return (
		<section class="section">
			<div class="container">
				<div class="is-vcentered columns is-multiline is-centered pr-2 pl-2">
					<div class="column">
						<h2 class="is-size-1 is-size-3-mobile has-text-weight-bold title mb-6">
							Featured {resource.resourceType}
						</h2>
						<div class="content">{children}</div>
						<div className="mb-5">
							<a className="button is-rounded is-primary" href={resource.url}>
								Check it out
							</a>
						</div>
					</div>
					<ResourceCard
						resource={resource}
						hasShadow={true}
						includeContentType={false}
					/>
				</div>
			</div>
		</section>
	);
}

export default FeaturedResource;
