// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type NavbarLinkProps = {
  color: string;
  href: string;
  key?: string;
  icon: string;
};
const NavbarLink = ({ href, color, icon }: NavbarLinkProps): JSX.Element => {
  const style = `color: #${color}`;
  const iconClass = icon.indexOf('fas') >= 0
    ? `fa-lg ${icon}` // fully-specified icon? use it as-is (with a fa-lg format)
    : `fab fa-lg fa-${icon}`; // shorthand icon? use defaults

  return (
    <a className="navbar-item is-hidden-touch" href={href} target="_blank">
      <span className="icon" style={style}>
        <i className={`${iconClass}`} aria-label={`${icon} Icon`} />
      </span>
    </a>
  );
};

export default NavbarLink;
