// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { LayoutContext, LayoutProps } from "../src/models";
import { PageFrontmatter } from "../_includes/resources/page/PageModels";
import { BaseLayout } from "../_includes/layouts/BaseLayout.11ty";
import MultiColumnSection from "../_includes/pageelements/MultiColumnSection";
import ListingSection from "../_includes/pageelements/ListingSection.11ty";
import ResourceCard from "../_includes/resourcecard/ResourceCard.11ty";
import { Topic } from "../_includes/resources/topic/TopicModels";
import {
	ARTICLE_RESOURCE,
	LINK_RESOURCE,
	PLAYLIST_RESOURCE,
	TIP_RESOURCE,
	TOPIC_RESOURCE,
	TUTORIAL_RESOURCE,
	TUTORIAL_STEP_RESOURCE,
} from "../src/resourceType";

type IndexPageProps = LayoutProps & PageFrontmatter;

class IndexPage {
	data() {
		return {
			title: "JetBrains Guide",
			subtitle: "Learn about technologies and become a badass developer.",
			layout: "",
			eleventyExcludeFromCollections: true,
		};
	}

	render(this: LayoutContext, data: IndexPageProps): JSX.Element {
		const featuredChannel = this.getResource("/remote/");
		const channels = [
			// TODO: These need updating if/when we rename channels to be technology focused.
			this.getResource("/dotnet/"),
			this.getResource("/go/"),
			this.getResource("/java/"),
			this.getResource("/python/"),
			this.getResource("/webjs/"),
		];
		const communities = [
			// TODO: These need updating if/when we rename channels to be technology focused.
			this.getResource("/gamedev/"),
			this.getResource("/topics/django/"), // TODO: topics have an icon or logo or accent, ResourceCard does not account for this and will not render a nice image). Ideally we standardize on thumbnail for everything.
			this.getResource("/topics/kotlin/"),
		];

		const topicNamesForNewestResources = this.getResources({
			resourceTypes: [
				TIP_RESOURCE,
				ARTICLE_RESOURCE,
				TUTORIAL_RESOURCE,
				TUTORIAL_STEP_RESOURCE,
				PLAYLIST_RESOURCE,
				LINK_RESOURCE,
			],
			limit: 60,
		})
			.flatMap((r) => r.topics)
			.slice(0, 20);

		const topicsForNewestResources = this.getResources({
			resourceTypes: [TOPIC_RESOURCE],
			customFilter: (r) =>
				topicNamesForNewestResources.includes(r.slug) &&
				(!r.topicType || r.topicType != "product"),
			limit: 6,
		});

		return (
			<BaseLayout {...data}>
				<section class="section has-gradient-purple">
					<div class="container">
						<div class="columns is-multiline">
							<div class="column is-7">
								<h1 class="mt-2 mb-4 is-size-1 has-text-weight-bold has-text-white">
									Welcome to the JetBrains Guide
								</h1>
								<p class="subtitle mb-5 has-text-white">
									Learn about technologies and become a badass developer. We
									have tips, tutorials, videos, articles and much, much more!
								</p>
							</div>
							<ResourceCard
								columnClassName={"is-3 is-offset-2 has-shadow"}
								compactMode={true}
								hasShadow={true}
								resource={featuredChannel}
							/>
						</div>
					</div>
				</section>
				{/* TODO PWE: Copied from dotnet/index.11ty.tsx with adaptations:
				 * thumbnail property is used for the image here vs. cardThumbnail in the dotnet index page
				 * CSS classnames for the column are different on this page vs. dotnet index page*/}
				<section class="section has-background-dark">
					<div class="container">
						<div class="columns is-multiline is-centered">
							{channels.map((channel) => {
								const figure = (
									<img src={channel.thumbnail} alt={channel.title} />
								);

								return (
									<div class="column has-background-white m-4 is-5 is-2-desktop py-5 has-box-hover has-text-centered has-position-relative">
										<a
											href={channel.url}
											aria-label={`Topic`}
											class="is-size-5 has-text-weight-bold title is-stretched-link"
										>
											<figure class="image is-48x48 mb-1 mx-auto">
												{figure}
											</figure>
											{channel.title}
										</a>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				<ListingSection title={"Communities"} resources={communities} />

				<section class="container">
					<hr />
				</section>

				<section class="section">
					<div class="container">
						<div class="columns is-vcentered is-mobile">
							<div class="column is-8">
								<h2 class="mt-2 mb-4 is-size-1 has-text-weight-bold">
									Hot topics
								</h2>
							</div>
							<div class="column has-text-right">
								<a class="button is-rounded is-outlined" href="/topics/">
									More...
								</a>
							</div>
						</div>
						{/* TODO PWE: Copied from TopicsLayout.11ty.tsx */}
						<div class="columns is-multiline">
							{topicsForNewestResources.map((topic) => {
								let figure: string;
								if (topic.icon) {
									figure = (
										<i class={`${topic.icon} has-text-${topic.accent} fa-5x`} />
									);
								} else if (topic.logo) {
									figure = <img src={topic.logo} alt={topic.title} />;
								} else {
									figure = (
										<i class={`fas fa-file has-text-${topic.accent} fa-5x`} />
									);
								}

								return (
									<div class="column is-6 is-4-desktop mb-5 has-box-hover">
										<div class="is-flex has-position-relative">
											<span class="mr-4">
												<a href={topic.url}>
													<figure class="image is-128x128 has-text-centered">
														{figure}
													</figure>
												</a>
											</span>
											<div>
												<a
													href={topic.url}
													aria-label={`Topic`}
													class="is-size-5 has-text-weight-bold mb-2 title is-stretched-link"
												>
													{topic.title}
												</a>
												{topic.subtitle && (
													<p class="has-text-grey-dark">{topic.subtitle}</p>
												)}
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</section>

				<MultiColumnSection>
					<div>
						<h2>Learn something new, quickly</h2>
						<p>
							We have created the JetBrains Guide, a collection of bite-sized
							visual resources, organized to help spark your learning. We hope
							it helps you get into the flow and excel at what you do.
						</p>
					</div>
					<div>
						<h2>Sharing feedback and contributing</h2>
						<p>
							The JetBrains Guide is also an open project, with{" "}
							<a href="https://github.com/jetbrains/guide">
								a repository in GitHub
							</a>{" "}
							that hosts all the content. We write all the content in Markdown
							and render a static site. If you'd like to contribute to it,
							please refer to the{" "}
							<a href="https://github.com/jetbrains/guide/blob/main/README.md">
								README
							</a>{" "}
							for more information.
						</p>
					</div>
				</MultiColumnSection>
			</BaseLayout>
		);
	}
}

module.exports = IndexPage;
