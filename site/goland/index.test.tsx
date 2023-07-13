import { expect, test } from "vitest";
import { GoLandHomepage, GoLandHomepageData } from "./index.11ty";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../_includes/fixtures";

test("should render GoLandHomepage", async () => {
  const tip0 = fixtures.tipItems[0];
  const pageLayoutData: GoLandHomepageData = {
    ...baseRenderData,
    ...tip0.data,
    page: tip0.page,
    title: "GoLand Home Page",
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
  // The fixture has the page as PyCharm so look for that
  expect(screen.findByText("GoLand Home Page - JetBrains Guide")).to.exist;
});
