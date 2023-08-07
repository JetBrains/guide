import { Resource } from "../../src/ResourceModels";
import ResourceCard from "../resourcecard/ResourceCard.11ty";
import h from "vhtml";

export type SectionListingProps = {
  title: string;
  subtitle?: string;
  moreLink?: string;
  resources: Resource[];
};

function SectionListing({
  title,
  subtitle,
  moreLink,
  resources,
}: SectionListingProps) {
  /* A reusable component for section-style paginated ResourceCard listings */
  return (
    <section class="section">
      <div class="container">
        <div class="is-flex">
          <div>
            <h2 class="mt-2 mb-4 is-size-1 has-text-weight-bold">{title}</h2>
            {subtitle && <p class="subtitle has-text-grey mb-5">{subtitle}</p>}
          </div>
        </div>
        <div class="is-flex">
          {resources.map((resource) => {
            return <ResourceCard resource={resource}></ResourceCard>;
          })}
        </div>
        {moreLink && (
          <a
            class="button is-rounded"
            href={moreLink}
            data-config-id="primary-action"
          >
            Learn More
          </a>
        )}
      </div>
    </section>
  );
}

export default SectionListing;
