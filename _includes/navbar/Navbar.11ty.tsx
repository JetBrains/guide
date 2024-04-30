import NavbarSearch from "./NavbarSearch.11ty";
import { Resource } from "../../src/ResourceModels";
import ResourceCard from "../resourcecard/ResourceCard.11ty";

export type NavbarProps = {
	featuredResource: Resource | undefined;
	technologies: Resource[];
	solutions: Resource[];
	topics: Resource[];
};

const Navbar = ({
	featuredResource,
	technologies,
	solutions,
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
						{/*<img
							src="/assets/jetbrains-white.svg"
							alt="JetBrains"
							width="149"
							height="32"
							class="logo"
						/>*/}
					</a>
					<a class="navbar-item is-size-5" href="/">
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
								class="navbar-link has-text-grey-light is-arrowless is-hidden-touch"
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
											<span class="title is-6">Technologies</span>
											{technologies &&
												technologies.map((resource: Resource) => (
													<a class="navbar-item" href={resource.url}>
														{resource.title}
													</a>
												))}
										</div>

										<div class="column is-6 is-3-desktop">
											<span class="title is-6">Solutions</span>
											{solutions &&
												solutions.map((resource: Resource) => (
													<a class="navbar-item" href={resource.url}>
														{resource.title}
													</a>
												))}
										</div>

										<div class="column is-12 is-3-desktop is-hidden-touch">
											<span class="title is-6">Hot tags</span>
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
						<a
							class="navbar-item has-text-grey-light is-hidden-touch"
							href="/explore/"
						>
							Explore
						</a>
					</div>
				</div>
				<div class="navbar-end">
					<NavbarSearch />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
