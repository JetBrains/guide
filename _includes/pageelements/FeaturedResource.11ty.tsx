import h from "vhtml";
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
        <div class="is-vcentered columns is-multiline is-centered">
          <div class="column">
            <h2 class="is-size-1 is-size-3-mobile has-text-weight-bold title mb-6">
              Featured {resource.resourceType}
            </h2>
            <div class="content">{children}</div>
          </div>
          <ResourceCard resource={resource} />
        </div>
      </div>
    </section>
  );
}

export default FeaturedResource;
