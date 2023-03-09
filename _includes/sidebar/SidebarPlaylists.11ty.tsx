// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { Tip } from "../resources/tip/TipModels";

export type SidebarPlaylistsProps = {
  playlistResources: Tip[];
};
const SidebarPlaylists = ({
  playlistResources,
}: SidebarPlaylistsProps): JSX.Element => {
  return (
    <div className="bio-page-sidebar-references-group" style="margin-top: 1rem">
      {playlistResources && playlistResources.length > 0 && (
        <>
          <p className="menu-label">Playlist Resources</p>
          <ul className="steps has-content-centered is-vertical is-small">
            {playlistResources.map((item, index) => (
              <li className="steps-segment" style="flex-grow: 0">
                <a
                  aria-label="Playlist Item"
                  className="has-text-dark playlist-item-toggle"
                  style="width: auto"
                  href={`#${item.anchor}`}
                >
                  <span className="steps-marker is-primary">{index + 1}</span>
                  <div className="steps-content">
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
