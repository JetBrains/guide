import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { Product } from "./ProductModels";
import { LayoutContext, LayoutProps } from "../../../src/models";
import Thumbnail from "../../Image.11ty";
import { BaseFrontmatter } from "../../../src/ResourceModels";

export type ProductsLayoutData = LayoutProps & BaseFrontmatter;

export function ProductsLayout(
  this: LayoutContext,
  data: ProductsLayoutData
): JSX.Element {
  const { content } = data;
  const products = this.getReferences("product") as Product[];
  const figure = undefined;
  const listing = (
    <nav className="bd-links bio-resourcecards">
      {products.map((product) => (
        <a
          aria-label={`Product`}
          className="bd-link"
          href={product.url}
          title={product.title}
        >
          <h2 className="bd-link-name">
            <figure className="bd-link-figure">
              <div className="image is-rounded is-64x64">
                <Thumbnail
                  src={product.logo}
                  alt={`${product.title} image`}
                  className="bio-resourcecard-logo"
                />
              </div>
            </figure>
            {product.title}
          </h2>
          {product.subtitle && (
            <p className="bd-link-subtitle">{product.subtitle}</p>
          )}
        </a>
      ))}
    </nav>
  );

  return (
    <ReferenceLayout
      {...data}
      figure={figure}
      listing={[listing]}
      content={content}
    />
  );
}

export const render = ProductsLayout;
