// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type NavbarLinkProps = {
  color: string;
  href: string;
  key?: string;
  icon: string;
};
const NavbarLink = ({ href, color, icon }: NavbarLinkProps): JSX.Element => {
  return (
    <a className="navbar-item is-hidden-touch" href={href} target="_blank">
      <span className="icon" style={`{ color: #${color} }`}>
        <i className={`fab fa-lg fa-${icon}`} aria-label={`${icon} Icon`} />
      </span>
    </a>
  );
};

export default NavbarLink;
