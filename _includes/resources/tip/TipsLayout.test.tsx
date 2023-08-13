import { expect, test } from "vitest";
import { TipsLayout } from "./TipsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../fixtures";
import { ReferenceLayoutProps } from "../../layouts/ReferenceLayout.11y";

test("should render TipsLayout", () => {
  const renderProps: ReferenceLayoutProps = {
    ...baseRenderData,
    title: "These Tips",
    resourceType: "tips",
    listing: [],
    page: {
      fileSlug: "slug",
      url: "url",
      date: fixtures.date,
    },
    pagination: fixtures.paginationProps.pagination,
    channel: "/channels/some-channel/",
  };
  const firstTipURL = fixtures.tips[0].url;
  fixtures.context.getResource = () =>
    fixtures.resolvedCollections.allResources.get(firstTipURL)!;
  const tipsLayout = new TipsLayout();
  document.body.innerHTML = tipsLayout.render.call(
    fixtures.context,
    renderProps
  );
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Resource",
  });
  expect(links[0].href).to.equal("/tips/some-tip/");

  // Look for channel stuff
  const subnavTitle: HTMLAnchorElement = screen.getByRole("link", {
    name: "Channel",
  });
  expect(subnavTitle.text).to.equal("Some Channel");
});
