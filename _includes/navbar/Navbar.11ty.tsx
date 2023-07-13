import h, { JSX } from "vhtml";
import NavbarSearch from "./NavbarSearch.11ty";

const Navbar = (): JSX.Element => {
  return (
    <nav className="navbar is-dark">
      <div className="container">
        <div className="navbar-brand">
          <a className="navbar-item p-0" href="https://www.jetbrains.com/">
            <img
              src="/assets/jetbrains-simple.svg"
              alt="JetBrains"
              width="72"
              height="72"
            />
          </a>
          <a
            className="navbar-item has-text-weight-semibold is-size-5"
            href="https://www.jetbrains.com/guide/"
          >
            Guide
          </a>
          <a className="navbar-burger" role="button" aria-label="menu">
            <span />
            <span />
            <span />
          </a>
        </div>
        <div className="navbar-menu has-background-dark">
          <div className="navbar-end">
            <a className="navbar-item has-text-grey-light" href="/tips/">
              Tips
            </a>
            <a className="navbar-item has-text-grey-light" href="/tutorials/">
              Tutorials
            </a>
            <a className="navbar-item has-text-grey-light" href="/topics/">
              Topics
            </a>
            <a className="navbar-item has-text-grey-light" href="/playlists/">
              Playlists
            </a>
          </div>
          <NavbarSearch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
