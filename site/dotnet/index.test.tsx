import { expect, test } from "vitest";
import { DotNetHomepage, DotNetHomepageData } from "./index.11ty";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../_includes/fixtures";

test("should render DotNetHomepage", () => {
  const channelItem = fixtures.channelItems[0];
  const pageLayoutData: DotNetHomepageData = {
    ...baseRenderData,
    ...channelItem.data,
    page: channelItem.page,
  };

  const r = fixtures.resolvedResources;

  const context = {
    ...fixtures.context,
    // TODO Find any const resolvedResources Array.from in tests
    getResource: () => fixtures.channels[0],
    getResources: () => fixtures.resolvedResources,
  };

  const homepage = new DotNetHomepage();
  const render = homepage.render;
  document.body.innerHTML = render.call(context, pageLayoutData);
  expect(screen.findByText(".NET Home Page - JetBrains Guide")).to.exist;
  expect(screen.findByText(".NET")).to.exist;
  expect(screen.findByText("First Link")).to.exist;
});
