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
  const listing = (
    <div class="columns is-multiline">
      {resources.map((resource) => {
        return <ResourceCard resource={resource}></ResourceCard>;
      })}
    </div>
  );

  return (
    <section class="section">
      <div class="columns is-vcentered is-mobile">
        <div class="column is-8">
          <h2 class="mt-2 mb-4 is-size-1 has-text-weight-bold">{title}</h2>
          {subtitle && <p class="subtitle has-text-grey mb-5">{subtitle}</p>}
        </div>
        <div class="column has-text-right">
          <a class="button is-rounded is-outlined" href={moreLink}>
            All...
          </a>
        </div>
      </div>
      <div class="container">{listing}</div>
    </section>
  );
}

export default SectionListing;
