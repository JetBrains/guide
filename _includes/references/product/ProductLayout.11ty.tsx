// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { LayoutContext, LayoutProps } from "../../../src/models";
import { Product, ProductFrontmatter } from "./ProductModels";
import { Resource } from "../../../src/ResourceModels";

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
    <div className="image is-rounded is-96x96">
      <img
        alt=""
        className="bio-resourcecard-logo"
        height="96"
        width="96"
        src={product.logo}
      />
    </div>
  );
  const listing = (
    <ul>
      {linkedResources.map((resource) => (
        <li>
          <a aria-label="Resource" href={resource.url}>
            {resource.title}
          </a>
        </li>
      ))}
    </ul>
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
