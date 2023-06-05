// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type ResourceCardProduct = {
  label: string;
  slug: string;
  url: string;
};

export type ResourceCardProductsProps = {
  items: ResourceCardProduct[];
};
const ResourceCardProducts = ({
  items,
}: ResourceCardProductsProps): JSX.Element => {
  return (
    <>
      {items.map((product) => (
        <span className="bio-common-card-references">
          <span className="tag is-rounded is-info is-light">
            <a href={product.url} className="has-text-info">
              {product.label}
            </a>
          </span>
        </span>
      ))}
    </>
  );
};

export default ResourceCardProducts;
