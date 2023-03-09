// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type SidebarDoclinkProps = {
  label: string;
  target: string;
};
const SidebarDoclink = ({
  label,
  target,
}: SidebarDoclinkProps): JSX.Element => {
  return (
    <li>
      <a href={`#${target}`} style="width: auto">
        {label}
      </a>
    </li>
  );
};

export default SidebarDoclink;
