import { test } from "vitest";

import { PageLayout, PageLayoutData } from "./PageLayout.11ty";
import fixtures, { baseRenderData } from "../../fixtures";

test("should render TipLayout", () => {
  const tip0 = fixtures.tipItems[0];
  const renderProps: PageLayoutData = {
    ...baseRenderData,
    ...tip0.data,
    page: tip0.page,
  };
  document.body.innerHTML = PageLayout.call(fixtures.context, renderProps);
  // expect(screen.getByText(tip0.data.title)).to.exist;
});
