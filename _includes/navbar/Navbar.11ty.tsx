import h, { JSX } from "vhtml";
import NavbarSearch from "./NavbarSearch.11ty";
import { Resource } from "../../src/ResourceModels";
import ResourceCard from "../resourcecard/ResourceCard.11ty";

export type NavbarProps = {
	featuredResource: Resource | undefined;
	technologies: Resource[];
	interests: Resource[];
	topics: Resource[];
};

const Navbar = ({
	featuredResource,
	technologies,
	interests,
	topics,
}: NavbarProps): JSX.Element => {
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
					<a class="navbar-item has-text-weight-semibold is-size-5" href="/">
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
						<div class="navbar-item has-dropdown is-hoverable is-fullwidth">
							<a
								class="navbar-link has-text-grey-light is-arrowless"
								href="/channels/"
							>
								Topics
							</a>

							<div class="navbar-dropdown is-radiusless p-0">
								<div class="container has-background-white is-fluid pt-4">
									<div class="columns is-multiline">
										{featuredResource && (
											<ResourceCard
												columnClassName={
													"is-3 is-6 is-3-desktop is-hidden-touch"
												}
												compactMode={true}
												hasShadow={true}
												resource={featuredResource}
											/>
										)}

										<div class="column is-6 is-3-desktop">
											<span class="title is-6">By technology</span>
											{technologies &&
												technologies.map((resource: Resource) => (
													<a class="navbar-item" href={resource.url}>
														{resource.title}
													</a>
												))}
										</div>

										<div class="column is-6 is-3-desktop">
											<span class="title is-6">By interest</span>
											{interests &&
												interests.map((resource: Resource) => (
													<a class="navbar-item" href={resource.url}>
														{resource.title}
													</a>
												))}
										</div>

										<div class="column is-12 is-3-desktop is-hidden-touch">
											<span class="title is-6">Hot topics</span>
											{topics &&
												topics.map((resource: Resource) => (
													<a class="navbar-item" href={resource.url}>
														{resource.title}
													</a>
												))}
										</div>

										<div class="column is-12 has-text-right has-background-grey-lighter">
											<a
												class="button is-rounded is-primary is-vcentered"
												href="/explore/"
											>
												Browse more content...
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<a class="navbar-item has-text-grey-light" href="/explore/">
							Explore
						</a>
					</div>
					<NavbarSearch />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
