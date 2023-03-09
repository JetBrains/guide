// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type NavbarMenuItem = {
  accent: string;
  cssClass: string;
  href: string;
  icon: string;
  label: string;
};
export type NavbarStartProps = {
  items: NavbarMenuItem[];
};

const NavbarStart = ({ items }: NavbarStartProps): JSX.Element => {
  return (
    <div className="navbar-start">
      {items.map((item) => (
        <a
          className={`navbar-item bd-navbar-item-${item.cssClass}`}
          href={item.href}
        >
          <span className={`icon has-text-${item.accent}`}>
            <i className={`fas fa-${item.icon}`}></i>
          </span>
          <span className="bulmaio-menu-label">{item.label}</span>
        </a>
      ))}
    </div>
  );
};

export default NavbarStart;
