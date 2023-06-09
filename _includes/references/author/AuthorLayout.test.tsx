import {expect, test} from "vitest";
import {screen} from "@testing-library/dom";

import {AuthorLayout} from "./AuthorLayout.11ty";
import fixtures, {baseRenderData} from "../../fixtures";
import {ReferenceLayoutProps} from "../../layouts/ReferenceLayout.11y";

test("should render AuthorLayout", () => {
    const renderProps: ReferenceLayoutProps = {
        ...baseRenderData,
        ...fixtures.authorItems[0].data,
        page: fixtures.authorItems[0].page,
        listing: [""],
    };
    fixtures.context.getResources = () =>
        Array.from(fixtures.resolvedCollections.allResources.values());
    document.body.innerHTML = AuthorLayout.call(fixtures.context, renderProps);
    const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
        name: "Resource",
    });
    expect(links.length).to.equal(8);
    expect(links[5].href).to.equal("/tutorials/some-tutorial/third-tutorialstep/");
});
