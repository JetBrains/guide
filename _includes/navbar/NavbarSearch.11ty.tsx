import Icon from "../icons/Icon.11ty";

function NavbarSearch(): JSX.Element {
	return (
		<div class="navbar-item navbar-search">
			<div class="buttons">
				<div id="search-dropdown" class="dropdown is-right">
					<div class="dropdown-trigger">
						<button
							id="search"
							class="button is-dark has-text-light mt-2"
							aria-label="Trigger Searchbox"
						>
							<Icon name={`search`} />
						</button>
					</div>
					<div class="dropdown-menu" id="search-menu" role="search">
						<div class="dropdown-content">
							<nav class="panel is-shadowless">
								<div class="panel-block has-text-centered ">
									<p class="control has-icons-left">
										<input
											id="searchbox-input"
											role="searchbox"
											aria-label="Search"
											class="input"
											type="text"
											placeholder="Search"
										/>
										<span class="icon is-left">
											<i class="fas fa-search" aria-hidden={true} />
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
