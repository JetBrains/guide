import {expect, test} from "vitest";
import {screen} from "@testing-library/dom";

import {ArticleLayout} from "./ArticleLayout.11ty";
import fixtures, {baseRenderData} from "../../fixtures";

test("should render ArticleLayout", () => {
    const article = fixtures.tipItems[0];
    const renderProps: ArticleLayoutData = {
        ...baseRenderData,
        ...article.data,
        page: article.page,
    };
    document.body.innerHTML = ArticleLayout.call(fixtures.context, renderProps);
    expect(screen.getByText(article.data.title)).to.exist;
});
