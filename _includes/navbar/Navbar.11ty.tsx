import h, { JSX } from "vhtml";
import NavbarSearch from "./NavbarSearch.11ty";

const Navbar = (): JSX.Element => {
  return (
    <nav class="navbar is-dark">
      <div class="container">
        <div class="navbar-brand">
          <a class="navbar-item p-0" href="https://www.jetbrains.com/">
            <img
              src="/assets/jetbrains-simple.svg"
              alt="JetBrains"
              width="72"
              height="72"
            />
          </a>
          <a
            class="navbar-item has-text-weight-semibold is-size-5"
            href="https://www.jetbrains.com/guide/"
          >
            Guide
          </a>

          <a class="navbar-burger" role="button" aria-label="menu">
            <span />
            <span />
            <span />
          </a>
        </div>
        <div class="navbar-menu has-background-dark">
          <div class="navbar-end">
            <a class="navbar-item has-text-grey-light" href="/explore/">
              Explore
            </a>
            <a class="navbar-item has-text-grey-light" href="/tips/">
              Tips
            </a>
            <a class="navbar-item has-text-grey-light" href="/tutorials/">
              Tutorials
            </a>
            <a class="navbar-item has-text-grey-light" href="/topics/">
              Topics
            </a>
          </div>
          <NavbarSearch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
