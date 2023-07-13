import h, { JSX } from "vhtml";
import { Tip } from "../resources/tip/TipModels";

export type SidebarPlaylistsProps = {
  playlistResources: Tip[];
};
const SidebarPlaylists = ({
  playlistResources,
}: SidebarPlaylistsProps): JSX.Element => {
  return (
    <div class="bio-page-sidebar-references-group" style="margin-top: 1rem">
      {playlistResources && playlistResources.length > 0 && (
        <>
          <p class="menu-label">Playlist Resources</p>
          <ul class="steps has-content-centered is-vertical is-small">
            {playlistResources.map((item, index) => (
              <li class="steps-segment" style="flex-grow: 0">
                <a
                  aria-label="Playlist Item"
                  class="has-text-dark playlist-item-toggle"
                  style="width: auto"
                  href={`#${item.anchor}`}
                >
                  <span class="steps-marker is-primary">{index + 1}</span>
                  <div class="steps-content">
                    <p> {item.title}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SidebarPlaylists;
