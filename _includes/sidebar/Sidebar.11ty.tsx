// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type SidebarProps = {
  children: string[];
};
const Sidebar = ({ children }: SidebarProps): JSX.Element => {
  return <aside className="bd-side bio-page-sidebar">{children}</aside>;
};

export default Sidebar;
