import { expect, test } from "vitest";
import { GoLandHomepage, GoLandHomepageData } from "./index.11ty";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../_includes/fixtures";

test("should render GoLandHomepage", () => {
  const tip0 = fixtures.tipItems[0];
  const pageLayoutData: GoLandHomepageData = {
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

  const homepage = new GoLandHomepage();
  const render = homepage.render;
  document.body.innerHTML = render.call(context, pageLayoutData);
  expect(screen.findByText("GoLand Guide")).to.exist;
});
