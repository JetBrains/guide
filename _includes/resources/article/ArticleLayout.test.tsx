import {expect, test} from "vitest";
import {screen} from "@testing-library/dom";

import fixtures, {baseRenderData} from "../../fixtures";
import {ArticleLayout, ArticleLayoutData} from "./ArticleLayout.11ty";

test("should render ArticleLayout", () => {
    const tip0 = fixtures.tipItems[0];
    const renderProps: ArticleLayoutData = {
        ...baseRenderData,
        ...tip0.data,
        page: tip0.page,
    };
    document.body.innerHTML = ArticleLayout.call(fixtures.context, renderProps);
    expect(screen.getByText(tip0.data.title)).to.exist;
});
