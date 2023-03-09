// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";

export type NavbarSearchProps = {};
const NavbarSearch = (props: NavbarSearchProps): JSX.Element => {
  // noinspection BadExpressionStatementJS
  props;
  return (
    <div className="navbar-item navbar-search">
      <div className="control">
        <div className={`dropdown is-NOT-active`}>
          <div className="dropdown-trigger">
            <button className="button is-black">
              <span className="icon">
                <i className="fas fa-search" />
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="search-menu" role="menu">
            <div className="dropdown-content">
              <input />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarSearch;
