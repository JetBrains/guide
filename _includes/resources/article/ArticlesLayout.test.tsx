import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../fixtures";
import { ReferenceLayoutProps } from "../../layouts/ReferenceLayout.11y";
import {ArticlesLayout} from "./ArticlesLayout.11ty";

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
        pagination: fixtures.paginationProps.pagination,
    };
    fixtures.context.getResources = () =>
        Array.from(fixtures.resolvedCollections.allResources.values());
    const firstArticleURL = fixtures.articles[0].url;
    fixtures.context.getResource = () => fixtures.resolvedCollections.allResources.get(firstArticleURL)!;
    const articlesLayout = new ArticlesLayout();
    document.body.innerHTML = articlesLayout.render.call(
        fixtures.context,
        renderProps
    );
    const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
        name: "Resource",
    });
    expect(links[0].href).to.equal("/articles/some-article/");
});
