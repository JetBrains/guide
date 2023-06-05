// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type ResourceCardTechnology = {
  label: string;
  slug: string;
  url: string;
};

export type ResourceCardTechnologiesProps = {
  items: ResourceCardTechnology[];
};
const ResourceCardTechnologies = ({
  items,
}: ResourceCardTechnologiesProps): JSX.Element => {
  return (
    <>
      {items.map((technology) => (
        <span className="bio-common-card-references">
          <span className="tag is-rounded is-danger is-light">
            <a href={technology.url} className="has-text-danger">
              {technology.label}
            </a>
          </span>
        </span>
      ))}
    </>
  );
};

export default ResourceCardTechnologies;
