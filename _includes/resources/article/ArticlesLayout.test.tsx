import {expect, test} from "vitest";
import {ArticlesLayout} from "./ArticlesLayout.11ty";
import {screen} from "@testing-library/dom";
import fixtures, {baseRenderData} from "../../fixtures";
import {ReferenceLayoutProps} from "../../layouts/ReferenceLayout.11y";

test("should render ArticlesLayout", () => {
    const renderProps: ReferenceLayoutProps = {
        ...baseRenderData,
        title: "These Articles",
        resourceType: "articles",
        listing: [],
        page: {
            fileSlug: "slug",
            url: "url",
            date: fixtures.date,
        },
    };
    fixtures.context.getResources = () =>
        Array.from(fixtures.resolvedCollections.allResources.values());
    const articlesLayout = new ArticlesLayout();
    document.body.innerHTML = articlesLayout.render.call(fixtures.context, renderProps);
    // TODO Make fixture data for articles to allow uncommenting this
    // const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    //     name: "Resource",
    // });
    // expect(links[6].href).to.equal("/tutorials/some-tutorial/third-tutorialstep/");
});
