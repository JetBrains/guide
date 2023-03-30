import { expect, test } from "vitest";
import { WebStormHomepage, WebStormHomepageData } from "./index.11ty";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../_includes/fixtures";

test("should render WebStormHomepage", () => {
  const tip0 = fixtures.tipItems[0];
  const pageLayoutData: WebStormHomepageData = {
    ...baseRenderData,
    ...tip0.data,
    page: tip0.page,
  };

  const resolvedResources = Array.from(
    fixtures.resolvedCollections.allResources.values()
  );

  const context = {
    ...fixtures.context,
    getResources: () => resolvedResources,
  };

  const homepage = new WebStormHomepage();
  const render = homepage.render;
  document.body.innerHTML = render.call(context, pageLayoutData);
  expect(screen.getByText("Learn Something New Quickly")).to.exist;
});
