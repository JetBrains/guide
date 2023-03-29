import {expect, test} from "vitest";
import {PlaylistsLayout, PlaylistsLayoutProps} from "./PlaylistsLayout.11ty";
import {screen} from "@testing-library/dom";
import fixtures, {baseRenderData} from "../../fixtures";

test("should render TipsLayout", () => {
    const title = "These Tips";
    const renderProps: PlaylistsLayoutProps = {
        ...baseRenderData,
        title,
        resourceType: "playlist",
        page: {
            fileSlug: "slug",
            url: "url",
            date: fixtures.date,
        },
    };
    fixtures.context.getResources = () =>
        Array.from(fixtures.resolvedCollections.allResources.values());
    document.body.innerHTML = PlaylistsLayout.call(fixtures.context, renderProps);
    const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
        name: "Resource",
    });
    expect(links[6].href).to.equal("/tutorials/some-tutorial/third-tutorialstep/");
});
