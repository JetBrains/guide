// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import SidebarDoclink, { SidebarDoclinkProps } from "./SidebarDoclink.11ty";

export type SidebarDoclinksProps = {
  links: SidebarDoclinkProps[];
};
const SidebarDoclinks = ({ links }: SidebarDoclinksProps): JSX.Element => {
  return (
    <div className="bio-page-sidebar-references-group" style="margin-top: 1rem">
      {links.length > 0 && (
        <>
          <p className="menu-label bio-page-sidebar-published">On This Page</p>
          <ul className="menu-list">
            {links.map((link) => (
              <SidebarDoclink {...link} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SidebarDoclinks;
