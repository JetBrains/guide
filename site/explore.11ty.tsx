import { LayoutContext, LayoutProps } from "../src/models";
import { BaseLayout } from "../_includes/layouts/BaseLayout.11ty";
import ListingSection from "../_includes/pageelements/ListingSection.11ty";
import ResourceCard from "../_includes/resourcecard/ResourceCard.11ty";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";
import { ResourceFrontmatter } from "../src/ResourceModels";

// Happy DOM throws a DOMException for external script/css even though
// we do the settings to suppress it. Vite catches the exception but
// logs it. We can't handle the exception, and it pollutes the test output.
// Let's detect if we're running in a test, then later, wrap the
// <link> and <script> to suppress.
const isNotTest = !(typeof window != "undefined" && !!(window as any).happyDOM);

type ExploreMenuItem = {
	value: string;
	label: string;
};

type ExploreGroup = {
	label: string;
	facetGroup: string;
	items: ExploreMenuItem[];
};

const exploreMenu: ExploreGroup[] = [
	{
		label: "Channels",
		facetGroup: "channels",
		items: [
			{ value: "/databases/", label: "Databases" },
			{ value: "/django/", label: "Django" },
			{ value: "/dotnet/", label: ".NET" },
			{ value: "/gamedev/", label: "Game Development" },
			{ value: "/go/", label: "Go" },
			{ value: "/java/", label: "Java" },
			{ value: "/python/", label: "Python" },
			{ value: "/javascript/", label: "JavaScript and TypeScript" },
			{ value: "/kotlin/", label: "Kotlin" },
		],
	},
	{
		label: "Top Tags",
		facetGroup: "topics",
		items: [
			{ value: "aws", label: "AWS" },
			{ value: "debugging", label: "Debugging" },
			{ value: "git", label: "Git" },
			{ value: "ide", label: "IDE" },
			{ value: "security", label: "Security" },
			{ value: "tricks", label: "Tricks" },
			{ value: "typescript", label: "TypeScript" },
			{ value: "web", label: "Web" },
			{ value: "kotlin", label: "Kotlin" },
		],
	},
	{
		label: "Resources",
		facetGroup: "resources",
		items: [
			// Hide these until we have some articles
			// { value: "article", label: "Articles" },
			{ value: "link", label: "Links" },
			{ value: "playlist", label: "Playlists" },
			{ value: "tip", label: "Tips" },
			{ value: "tutorial", label: "Tutorials" },
		],
	},
];

type ExplorePageProps = LayoutProps & ResourceFrontmatter;

export default class ExplorePage {
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

		// Rebuild channels list from data
		const channels = this.getResources({
			resourceTypes: ["channel"],
			limit: 12,
		});
		if (channels.length > 0) {
			const channelsMenu = exploreMenu.find(
				(menu) => menu.facetGroup === "channels",
			);
			if (channelsMenu) {
				channelsMenu.items = channels.map((channel) => ({
					value: channel.url,
					label: channel.title,
				}));
			}
		}

		const dummyChannel = this.getResource("/dotnet/");
		const resourceCard = (
			<ResourceCard
				resource={dummyChannel}
				columnClassName={"is-half-tablet is-one-third-desktop"}
			/>
		);
		return (
			<BaseLayout {...data}>
				<div class="section">
					<div class="container">
						<div class="columns is-multiline is-flex-direction-row-reverse">
							<div class="column">
								<div class="columns">
									<div class="column is-four-fifths mb-5 mr-auto">
										<h2 class="title mb-2 is-size-1 is-size-3-mobile has-text-weight-bold">
											Explore Content
										</h2>
									</div>
								</div>
								<div
									style="display: none"
									class="columns is-multiline"
									id="listing"
								></div>
								<div
									style="display: none"
									class="container"
									id="listing-no-results"
								>
									<div class="columns is-vcentered is-mobile">
										<div class="column">
											<h2 class="mt-2 mb-4 title has-text-weight-semibold">
												No matching content
											</h2>
											<p class="subtitle has-text-grey mb-5">
												Please try refining your filters.
											</p>
										</div>
									</div>
								</div>
								<ListingSection
									title="Latest content"
									resources={latestContent}
									moreLink="/latest/"
									isSection={false}
									includeContentType={true}
									anchor="latest-content"
								/>
							</div>

							<div class="column is-full-touch is-3">
								<aside class="menu" id="facetMenu">
									{exploreMenu.map((menuGroup) => {
										return (
											<Fragment>
												{menuGroup.label && (
													<p
														title={`${menuGroup.label} Group`}
														class="menu-label"
													>
														{menuGroup.label}
													</p>
												)}
												<ul
													class="menu-list"
													data-facet-group={menuGroup.facetGroup}
												>
													{menuGroup.items.map((item) => (
														<li>
															<label class="checkbox p-2">
																<input type="checkbox" value={item.value} />{" "}
																{item.label}
															</label>
														</li>
													))}
												</ul>
											</Fragment>
										);
									})}
									<template id="cardTemplate">{resourceCard}</template>
								</aside>
							</div>
						</div>
					</div>
				</div>
				{isNotTest ? (
					<script type="module" src="/assets/js/evm.js" async></script>
				) : (
					<Fragment></Fragment>
				)}
			</BaseLayout>
		);
	}
}
