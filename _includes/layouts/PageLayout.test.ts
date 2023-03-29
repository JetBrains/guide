import {expect, test} from "vitest";
import {PageLayout, PageLayoutData} from "./PageLayout.11ty";
import {screen} from "@testing-library/dom";
import fixtures, {baseRenderData} from "../fixtures";

test("should render PageLayout", () => {
    const tip0 = fixtures.tipItems[0];
    const pageLayoutData: PageLayoutData = {
        ...baseRenderData,
        ...tip0.data,
        page: tip0.page,
        content: "<p>Hello world</p>"
    };

    document.body.innerHTML = PageLayout.call(fixtures.context, pageLayoutData);
    expect(screen.getByText("Hello world")).to.exist;
});
