import {expect, test} from "vitest";
import {screen} from "@testing-library/dom";

import {TipLayout, TipLayoutData} from "./TipLayout.11ty";
import fixtures, {baseRenderData} from "../../fixtures";

test("should render TipLayout", () => {
    const tip0 = fixtures.tipItems[0];
    const renderProps: TipLayoutData = {
        ...baseRenderData,
        ...tip0.data,
        page: tip0.page,
    };
    document.body.innerHTML = TipLayout.call(fixtures.context, renderProps);
    expect(screen.getByText(tip0.data.title)).to.exist;
});
