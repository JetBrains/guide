import {expect, test} from "vitest";
import {ProductsLayout, ProductsLayoutData} from "./ProductsLayout.11ty";
import {screen} from "@testing-library/dom";
import fixtures, {baseRenderData} from "../../fixtures";

test("should render ProductsLayout", () => {
    const productsLayoutData: ProductsLayoutData = {
        ...baseRenderData,
        ...fixtures.productItems[0].data,
        page: {...fixtures.productItems[0].page},
    };
    fixtures.context.getReferences = () => fixtures.products;
    document.body.innerHTML = ProductsLayout.call(
        fixtures.context,
        productsLayoutData
    );
    const items: HTMLAnchorElement[] = screen.getAllByRole("link", {
        name: "Product",
    });
    expect(items[0].title).to.equal("Some Product");
});
