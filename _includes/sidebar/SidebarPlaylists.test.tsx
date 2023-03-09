import { expect, test } from "vitest";
import { screen } from "@testing-library/dom";

import SidebarPlaylists, {
  SidebarPlaylistsProps,
} from "./SidebarPlaylists.11ty";
import fixtures from "../fixtures";

test("SidebarPlaylists", () => {
  const props: SidebarPlaylistsProps = {
    playlistResources: fixtures.tips,
  };
  document.body.innerHTML = SidebarPlaylists(props);
  const results: HTMLAnchorElement[] = screen.getAllByRole("link");
  expect(results[0].href).to.equal("about:blank#tips-some-tip");
  expect(results[1].href).to.equal("about:blank#tips-another-tip");
});
