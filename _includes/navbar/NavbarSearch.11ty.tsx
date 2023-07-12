import h, { JSX } from "vhtml";
import Icon from "../icons/Icon.11ty";

function NavbarSearch(): JSX.Element {
  return (
    <div className="navbar-item navbar-search">
      <div className="buttons">
        <div id="search-dropdown" className="dropdown is-right">
          <div className="dropdown-trigger">
            <button
              id="search"
              className="button is-dark has-text-light"
              aria-label="Trigger Searchbox"
            >
              <Icon name={`search`} />
            </button>
          </div>
          <div className="dropdown-menu" id="search-menu" role="search">
            <div className="dropdown-content">
              <nav className="panel is-shadowless">
                <div className="panel-block has-text-centered ">
                  <p className="control has-icons-left">
                    <input
                      id="searchbox-input"
                      role="searchbox"
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
