import {expect, test} from "vitest";
import {TipsLayout} from "./TipsLayout.11ty";
import {screen} from "@testing-library/dom";
import fixtures, {baseRenderData} from "../../fixtures";
import {ReferenceLayoutProps} from "../../layouts/ReferenceLayout.11y";

test("should render TipsLayout", () => {
    const renderProps: ReferenceLayoutProps = {
        ...baseRenderData,
        title: "These Tips",
        resourceType: "tips",
        listing: [],
        page: {
            fileSlug: "slug",
            url: "url",
            date: fixtures.date,
        },
    };
    fixtures.context.getResources = () =>
        Array.from(fixtures.resolvedCollections.allResources.values());
    document.body.innerHTML = TipsLayout.call(fixtures.context, renderProps);
    const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
        name: "Resource",
    });
    expect(links[6].href).to.equal("/tutorials/some-tutorial/third-tutorialstep/");
});
