// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

function NavbarSearch(): JSX.Element {
  return (
    <div className="navbar-item navbar-search">
      <div className="control">
        <div id="search-dropdown" className="dropdown is-right">
          <div className="dropdown-trigger">
            <button
              id="search"
              className="button is-black"
              aria-label="Trigger Searchbox"
            >
              <span className="icon">
                <i className="fas fa-search" />
              </span>
            </button>
          </div>
          <div
            className="dropdown-menu"
            id="search-menu"
            aria-role="search-results"
          >
            <div className="dropdown-content">
              <nav className="panel is-shadowless" style="width:600px">
                <div className="panel-block has-text-centered ">
                  <p className="control has-icons-left">
                    <input
                      id="searchbox-input"
                      aria-label="Search"
                      className="input"
                      type="text"
                      placeholder="Search"
                    />
                    <span className="icon is-left">
                      <i className="fas fa-search" aria-hidden={true} />
                    </span>
                  </p>
                </div>
                <div id="search-results"></div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarSearch;
