// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { LayoutContext, LayoutProps } from "../src/models";
import { PageFrontmatter } from "../_includes/resources/page/PageModels";
import { BaseLayout } from "../_includes/layouts/BaseLayout.11ty";
import ListingSection from "../_includes/pageelements/ListingSection.11ty";
import ResourceCard from "../_includes/resourcecard/ResourceCard.11ty";

type ExploreMenuItem = {
	href: string;
	label: string;
};

type ExploreGroup = {
	label?: string;
	items: ExploreMenuItem[];
};

const exploreMenu: ExploreGroup[] = [
	{
		label: "Channels",
		items: [
			{ href: "/remote/", label: "Remote Development" },
			{ href: "/gamedev/", label: "Game Development" },
			{ href: "/dotnet/", label: ".NET" },
			{ href: "/goland/", label: "GoLand" },
			{ href: "/idea/", label: "IntelliJ IDEA" },
			{ href: "/pycharm/", label: "PyCharm" },
			{ href: "/webstorm/", label: "WebStorm" },
		],
	},
	{
		items: [{ href: "/latest/", label: "Latest" }],
	},
	{
		items: [
			{ href: "/articles/", label: "Articles" },
			{ href: "/playlists/", label: "Playlists" },
			{ href: "/tips/", label: "Tips" },
			{ href: "/tutorials/", label: "Tutorials" },
		],
	},
	{
		items: [{ href: "/topics/", label: "Topics" }],
	},
];

type ExplorePageProps = LayoutProps & PageFrontmatter;

class ExplorePage {
	data() {
		return {
			title: "Explore",
			subtitle: "Explore the JetBrains Guide",
			layout: "",
			eleventyExcludeFromCollections: true,
		};
	}

	render(this: LayoutContext, data: ExplorePageProps): JSX.Element {
		const latestContent = this.getResources({
			resourceTypes: ["tip", "tutorial", "playlist"],
			limit: 12,
		});

		const channels = [
			this.getResource("/remote/"),
			this.getResource("/gamedev/"),
			this.getResource("/dotnet/"),
		];

		return (
			<BaseLayout {...data}>
				<div class="section">
					<div class="container">
						<div class="columns is-multiline is-flex-direction-row-reverse">
							<div class="column">
								<div class="columns">
									<div class="column is-four-fifths mb-5 mr-auto">
										<h2 class="title mb-6 is-size-1 is-size-3-mobile has-text-weight-bold">
											Explore our channels
										</h2>
										<p class="subtitle has-text-grey">
											Looking to learn something new, or refresh your existing
											skills?
										</p>
									</div>
									<div class="column has-text-right">
										<a
											class="button is-rounded is-outlined"
											href={`/channels/`}
										>
											More...
										</a>
									</div>
								</div>

								<div class="columns is-multiline">
									{channels.map((channel) => {
										return (
											<ResourceCard compactMode={true} resource={channel} />
										);
									})}
								</div>

								<ListingSection
									title="Latest content"
									resources={latestContent}
									moreLink="/latest/"
									isSection={false}
								/>
							</div>

							<div class="column is-full-touch is-3">
								<aside class="menu">
									{exploreMenu.map((menuGroup) => {
										return (
											<>
												{menuGroup.label && (
													<p class="menu-label">{menuGroup.label}</p>
												)}
												<ul class="menu-list">
													{menuGroup.items.map((item) => (
														<li>
															<a href={item.href}>{item.label}</a>
														</li>
													))}
												</ul>
											</>
										);
									})}
								</aside>

								<aside class="menu">
									<p class="menu-label">Channels</p>
									<ul class="menu-list">
										<li>
											<a href="/remote/">Remote Development</a>
										</li>
										<li>
											<li>
												<a href="/gamedev/">Game Development</a>
											</li>
											<a href="/dotnet/">.NET</a>
										</li>
										<li>
											<a href="/goland/">GoLand</a>
										</li>
										<li>
											<a href="/idea/">IntelliJ IDEA</a>
										</li>
										<li>
											<a href="/pycharm/">PyCharm</a>
										</li>
										<li>
											<a href="/webstorm/">WebStorm</a>
										</li>
									</ul>

									<p class="menu-label">What's new?</p>
									<ul class="menu-list">
										<li>
											<a href="/latest/">Latest</a>
										</li>
									</ul>

									<p class="menu-label">Content</p>
									<ul class="menu-list">
										<li>
											<a href="/authors/">Authors</a>
										</li>
										<li>
											<a href="/channels/">Channels</a>
										</li>
										<li>
											<a href="/playlists/">Playlists</a>
										</li>
										<li>
											<a href="/tips/">Tips</a>
										</li>
										<li>
											<a href="/topics/">Topics</a>
										</li>
										<li>
											<a href="/tutorials/">Tutorials</a>
										</li>
									</ul>
								</aside>
							</div>
						</div>
					</div>
				</div>
			</BaseLayout>
		);
	}
}

module.exports = ExplorePage;
