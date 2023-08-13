import { expect, test } from "vitest";

import { BaseLayout, BaseLayoutProps } from "./BaseLayout.11ty";
import fixtures, { baseRenderData } from "../fixtures";

test("BaseLayout for Tip", () => {
  const tip0 = fixtures.tipItems[0];
  const renderProps: BaseLayoutProps = {
    ...baseRenderData,
    ...tip0.data,
    page: tip0.page,
    children: [],
  };
  document.body.innerHTML = BaseLayout.call(fixtures.context, renderProps);
  expect(document.body).to.exist;
});
test("BaseLayout for Channel", () => {
  const tip0 = fixtures.tipItems[0];
  const renderProps: BaseLayoutProps = {
    ...baseRenderData,
    ...tip0.data,
    page: tip0.page,
    children: [],
  };
  document.body.innerHTML = BaseLayout.call(fixtures.context, renderProps);
  expect(document.body).to.exist;
});
