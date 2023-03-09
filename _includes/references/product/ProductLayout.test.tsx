import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { ProductLayout, ProductLayoutProps } from "./ProductLayout.11ty";
import fixtures from "../../fixtures";

test("should render ProductLayout", () => {
  const renderProps: ProductLayoutProps = {
    collections: fixtures.collections,
    content: fixtures.content,
    ...fixtures.productItems[0].data,
    page: {
      fileSlug: fixtures.products[0].slug,
      url: "some-url",
      date: fixtures.date,
    },
    site: fixtures.site,
  };
  fixtures.context.getResources = () =>
    Array.from(fixtures.resolvedCollections.allResources.values());
  document.body.innerHTML = ProductLayout.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Resource",
  });
  expect(links.length).to.equal(1);
  expect(links[0].href).to.equal("/tips/some-tip/");
});
