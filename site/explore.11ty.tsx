// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { LayoutContext, LayoutProps } from "../src/models";
import { PageFrontmatter } from "../_includes/resources/page/PageModels";
import { BaseLayout } from "../_includes/layouts/BaseLayout.11ty";
import Logo from "../_includes/logos/Logo.11ty";
import ListingSection from "../_includes/pageelements/ListingSection.11ty";

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

		return (
			<BaseLayout {...data}>
				<div class="section">
					<div class="container">
						<div class="columns is-multiline is-flex-direction-row-reverse">
							<div class="column">
								<div class="columns is-multiline">
									<div class="column is-12 is-5-desktop mb-5 mr-auto">
										<h2 class="title mb-6 is-size-1 is-size-3-mobile has-text-weight-bold">
											Explore our channels
										</h2>
										<p class="subtitle has-text-grey">
											Looking to learn something new, or refresh your existing
											skills?
										</p>

										<div class="buttons mt-6">
											<a
												class="button is-rounded is-primary is-outlined"
												href="/channels/"
											>
												Browse...
											</a>
										</div>
									</div>
									<div class="column is-12 is-6-desktop">
										<div class="columns is-multiline is-mobile">
											<div class="column mb-1 is-6 py-5">
												<a href="/dotnet/">
													<figure class="image is-48x48 mb-1">
														<Logo product="resharper" width={48} height={48} />
													</figure>
												</a>
												<a
													href="/dotnet/"
													class="is-size-5 has-text-weight-bold title"
												>
													.NET
												</a>
											</div>
											<div class="column mb-1 is-6 py-5">
												<a href="/goland/">
													<figure class="image is-48x48 mb-1">
														<Logo product="goland" width={48} height={48} />
													</figure>
												</a>
												<a
													href="/goland/"
													class="is-size-5 has-text-weight-bold title"
												>
													GoLand
												</a>
											</div>
											<div class="column mb-1 is-6 py-5">
												<a href="/idea/">
													<figure class="image is-48x48 mb-1">
														<Logo
															product="intellij-idea"
															width={48}
															height={48}
														/>
													</figure>
												</a>
												<a
													href="/idea/"
													class="is-size-5 has-text-weight-bold title"
												>
													IntelliJ IDEA
												</a>
											</div>
											<div class="column mb-1 is-6 py-5">
												<a href="/pycharm/">
													<figure class="image is-48x48 mb-1">
														<Logo product="pycharm" width={48} height={48} />
													</figure>
												</a>
												<a
													href="/pycharm/"
													class="is-size-5 has-text-weight-bold title"
												>
													PyCharm
												</a>
											</div>
											<div class="column mb-1 is-6 py-5">
												<a href="/webstorm/">
													<figure class="image is-48x48 mb-1">
														<Logo product="webstorm" width={48} height={48} />
													</figure>
												</a>
												<a
													href="/webstorm/"
													class="is-size-5 has-text-weight-bold title"
												>
													WebStorm
												</a>
											</div>
										</div>
									</div>
								</div>

								<ListingSection
									title="Latest"
									resources={latestContent}
									moreLink="/latest/"
									isSection={false}
								/>
							</div>

							<div class="column is-full-touch is-3">
								<aside class="menu">
									<p class="menu-label">Channels</p>
									<ul class="menu-list">
										<li>
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
