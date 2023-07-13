import { expect, test } from "vitest";
import { IntelliJHomepage, IntelliJHomepageData } from "./index.11ty";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../_includes/fixtures";

test("should render DotNetHomepage", () => {
  const tip0 = fixtures.tipItems[0];
  const pageLayoutData: IntelliJHomepageData = {
    ...baseRenderData,
    ...tip0.data,
    page: tip0.page,
    title: "IntelliJ IDEA Home Page",
  };

  const resolvedResources = Array.from(
    fixtures.resolvedCollections.allResources.values()
  );

  const context = {
    ...fixtures.context,
    getResources: () => resolvedResources,
  };

  const homepage = new IntelliJHomepage();
  const render = homepage.render;
  document.body.innerHTML = render.call(context, pageLayoutData);
  // The fixture has the page as PyCharm so look for that
  expect(screen.findByText("IntelliJ IDEA Home Page - JetBrains Guide")).to
    .exist;
});
