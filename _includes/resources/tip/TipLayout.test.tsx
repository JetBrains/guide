import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import { TipLayout, TipLayoutData } from "./TipLayout.11ty";
import fixtures from "../../fixtures";
import { SiteCollections } from "../../models";

test("should render TipLayout", () => {
  const tip0 = fixtures.tipItems[0];
  const renderProps: TipLayoutData = {
    ...tip0.data,
    page: tip0.page,
    collections: fixtures.resolvedCollections as SiteCollections,
    content: fixtures.content,
    site: fixtures.site,
  };
  document.body.innerHTML = TipLayout.call(fixtures.context, renderProps);
  expect(screen.getByText(tip0.data.title)).to.exist;
});
