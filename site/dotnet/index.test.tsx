import { expect, test } from "vitest";
import { DotNetHomepage, DotNetHomepageData } from "./index.11ty";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../_includes/fixtures";

test("should render DotNetHomepage", () => {
  const tip0 = fixtures.tipItems[0];
  const pageLayoutData: DotNetHomepageData = {
    ...baseRenderData,
    ...tip0.data,
    page: tip0.page,
    title: ".NET Home Page",
  };

  const resolvedResources = Array.from(
    fixtures.resolvedCollections.allResources.values()
  );

  const context = {
    ...fixtures.context,
    getResources: () => resolvedResources,
  };

  const homepage = new DotNetHomepage();
  const render = homepage.render;
  document.body.innerHTML = render.call(context, pageLayoutData);
  expect(screen.findByText(".NET Home Page - JetBrains Guide")).to.exist;
});
