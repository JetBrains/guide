import {expect, test} from "vitest";

import {BaseLayout, BaseLayoutProps} from "./BaseLayout.11ty";
import fixtures, {baseRenderData} from "../fixtures";

const tip0 = fixtures.tipItems[0];
const renderProps: BaseLayoutProps = {
  ...baseRenderData,
  ...tip0.data,
  page: tip0.page,
  children: [],
};

test("BaseLayout", () => {
  document.body.innerHTML = BaseLayout.call(fixtures.context, renderProps);
  expect(document.body).to.exist;
});
