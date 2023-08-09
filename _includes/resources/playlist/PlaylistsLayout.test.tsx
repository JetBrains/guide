import { expect, test } from "vitest";
import { PlaylistsLayout, PlaylistsLayoutProps } from "./PlaylistsLayout.11ty";
import { screen } from "@testing-library/dom";
import fixtures, { baseRenderData } from "../../fixtures";

test("should render PlaylistLayout", () => {
  const title = "These Tips";
  const renderProps: PlaylistsLayoutProps = {
    ...baseRenderData,
    title,
    resourceType: "playlists",
    page: {
      fileSlug: "slug",
      url: "url",
      date: fixtures.date,
    },
    pagination: fixtures.paginationProps.pagination,
  };
  fixtures.context.getResource = () =>
    Array.from(fixtures.resolvedCollections.allResources.values())[0];
  document.body.innerHTML = PlaylistsLayout.call(fixtures.context, renderProps);
  const links: HTMLAnchorElement[] = screen.getAllByRole("link", {
    name: "Resource",
  });
  expect(links[0].href).to.equal("/tips/another-tip/");
});
