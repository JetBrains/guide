// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { LayoutContext, LayoutProps } from "../../../src/models";
import { Product, ProductFrontmatter } from "./ProductModels";
import { Resource } from "../../../src/ResourceModels";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";

export type ProductLayoutProps = LayoutProps & ProductFrontmatter;

export function ProductLayout(
  this: LayoutContext,
  data: ProductLayoutProps
): JSX.Element {
  const { collections, content, page } = data;
  const product = collections.allReferences.get(
    `products:${page.fileSlug}`
  ) as Product;
  if (!product) {
    throw new Error(`Product "${page.fileSlug}" not in collection`);
  }

  const linkedResources: Resource[] = this.getResources().filter(
    (ci) => ci.products && ci.products.includes(product.label as string)
  );

  const figure = (
    <div className="image is-96x96">
      <img
        alt={product.title}
        className="bio-resourcecard-logo"
        height="96"
        width="96"
        src={product.logo}
      />
    </div>
  );
  const listing = (
    <div>
      <ul>
        {linkedResources.map((resource) => (
          <ResourceCard resource={resource}></ResourceCard>
        ))}
      </ul>
    </div>
  );
  const contentDiv = <div dangerouslySetInnerHTML={{ __html: content }} />;

  return (
    <ReferenceLayout
      {...data}
      figure={[figure]}
      listing={[listing]}
      content={contentDiv}
    />
  );
}

export const render = ProductLayout;
