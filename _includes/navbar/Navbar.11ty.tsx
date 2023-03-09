// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import NavbarBrand from "./NavbarBrand.11ty";
import NavbarStart from "./NavbarStart.11ty";
import NavbarEnd from "./NavbarEnd.11ty";

type NavbarProps = {
  site: any;
};

const Navbar = ({ site }: NavbarProps): JSX.Element => {
  return (
    <nav id="navbar" className="navbar is-spaced is-dark">
      <div className="container">
        <NavbarBrand {...site}></NavbarBrand>
        <div id="navMenuIndex" className="navbar-menu">
          {site.start && <NavbarStart items={site.start.items}></NavbarStart>}
          {site.end && (
            <NavbarEnd
              buttons={site.end.buttons}
              links={site.end.links}
            ></NavbarEnd>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
