// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import NavbarLink, { NavbarLinkProps } from "./NavbarLink.11ty";
import NavbarButton, { NavbarButtonProps } from "./NavbarButton.11ty";
import NavbarSearch from "./NavbarSearch.11ty";

export type NavbarEndProps = {
  buttons: NavbarButtonProps[];
  links: NavbarLinkProps[];
};

const NavbarEnd = ({ links, buttons }: NavbarEndProps): JSX.Element => {
  return (
    <div className="navbar-end">
      {links && links.map((link) => <NavbarLink key={link.href} {...link} />)}
      {buttons &&
        buttons
          .filter((button) => button.label != "Skip")
          .map((button) => <NavbarButton key={button.href} {...button} />)}

      <NavbarSearch />
    </div>
  );
};

export default NavbarEnd;
