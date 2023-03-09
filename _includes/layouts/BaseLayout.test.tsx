import { expect, test } from "vitest";

import { BaseLayout, BaseLayoutProps } from "./BaseLayout.11ty";
import fixtures from "../fixtures";
import { SiteCollections } from "../models";

const tip0 = fixtures.tipItems[0];
const renderProps: BaseLayoutProps = {
  ...tip0.data,
  page: tip0.page,
  collections: fixtures.resolvedCollections as SiteCollections,
  content: fixtures.content,
  children: [],
  site: fixtures.site,
};

test("BaseLayout", () => {
  document.body.innerHTML = BaseLayout.call(fixtures.context, renderProps);
  expect(document.body).to.exist;
});
