import { expect, test } from "vitest";

import { PlaylistLayout, PlaylistLayoutData } from "./PlaylistLayout.11ty";
import fixtures from "../../fixtures";
import { SiteCollections } from "../../models";
import { screen } from "@testing-library/dom";

test("should render PlaylistLayout", () => {
  const playlist0 = fixtures.playlistItems[0];
  const renderProps: PlaylistLayoutData = {
    ...playlist0.data,
    page: playlist0.page,
    collections: fixtures.resolvedCollections as SiteCollections,
    content: fixtures.content,
    site: fixtures.site,
  };
  document.body.innerHTML = PlaylistLayout.call(fixtures.context, renderProps);
  expect(screen.getByRole("link", { name: "Author Sidebar" })).to.exist;
  const playlistItems = screen.getAllByRole("link", { name: "Playlist Item" });
  expect(playlistItems.length).to.equal(1);
});
