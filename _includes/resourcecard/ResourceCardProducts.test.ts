import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import ResourceCardProducts, {
  ResourceCardProductsProps,
} from "./ResourceCardProducts.11ty";

const props: ResourceCardProductsProps = {
  items: [
    { label: "Some Label 1", slug: "/some-slug-1" },
    { label: "Some Label 2", slug: "/some-slug-2" },
    { label: "Some Label 3", slug: "/some-slug-3" },
  ],
};

test("ResourceCardProduct", () => {
  document.body.innerHTML = ResourceCardProducts(props);
  expect(screen.getByText("Some Label 1")).to.exist;
  const links: HTMLLinkElement[] = screen.getAllByRole("link");
  expect(links[0].href).to.equal("/some-slug-1");
});
