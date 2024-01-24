// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { LayoutContext, LayoutProps } from "../src/models";
import { PageFrontmatter } from "../_includes/resources/page/PageModels";
import { BaseLayout } from "../_includes/layouts/BaseLayout.11ty";
import MultiColumnSection from "../_includes/pageelements/MultiColumnSection";
import ListingSection from "../_includes/pageelements/ListingSection.11ty";
import { CHANNEL_RESOURCE } from "../src/resourceType";
import { Resource } from "../src/ResourceModels";
import { Channel } from "../_includes/resources/channel/ChannelModels";
import { Topic } from "../_includes/resources/topic/TopicModels";

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
		const channels = [
			this.getResource("/javascript/"),
			this.getResource("/python/"),
			this.getResource("/java/"),
			this.getResource("/go/"),
			this.getResource("/dotnet/"),
		];
		const solutions = [
			this.getResource("/gamedev/"),
			this.getResource("/databases/"),
			this.getResource("/django/"),
			this.getResource("/remote/"),
		];
		const hotTopics = [
			this.getResource("/tags/aws/"),
			this.getResource("/tags/debugging/"),
			this.getResource("/tags/git/"),
			this.getResource("/tags/gcp/"),
			this.getResource("/tags/gradle/"),
			this.getResource("/tags/refactoring/"),
		] as Topic[];

		return (
			<BaseLayout {...data}>
				<section className="section has-background-grey-darker has-glow-purple-transparent">
					<div class="container">
						<div class="columns is-multiline">
							<div class="column is-7">
								<h1 class="mt-2 mb-4 is-size-1 has-text-weight-bold has-text-white">
									Welcome to the JetBrains Guide
								</h1>
								<p class="subtitle mb-5 has-text-white">
									Learn about technologies and become a badass developer. We
									have tips, tutorials, videos, articles and much, much more
									covering popular technologies, solutions, and hot topics!
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="section has-background-grey-darker">
					<div class="container">
						<div class="columns is-multiline is-centered">
							{channels
								.filter(
									(resource: Resource): resource is Channel =>
										resource.resourceType === CHANNEL_RESOURCE
								)
								.map((channel) => {
									return (
										<div class="column has-background-grey-darker has-box-outline m-4 is-5 is-2-desktop has-box-hover has-text-centered has-position-relative box">
											<a
												href={channel.url}
												aria-label={channel.title}
												class="is-size-5 has-text-white title is-stretched-link"
											>
												<figure
													class="image mb-4"
													style="border-radius: 6px; overflow:hidden"
												>
													<img src={channel.logo} alt="" />
												</figure>
												{channel.title}
											</a>
										</div>
									);
								})}
						</div>
					</div>
				</section>

				<ListingSection title={"Solutions"} resources={solutions} />

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

				<section className="section">
					<div class="container">
						<div class="columns is-vcentered is-mobile">
							<div class="column is-8">
								<h2 class="mt-2 mb-4 is-size-1 has-text-weight-bold">
									Hot tags
								</h2>
							</div>
							<div class="column has-text-right">
								<a class="button is-rounded is-outlined" href="/tags/">
									More...
								</a>
							</div>
						</div>
						<div class="columns is-multiline">
							{hotTopics.map((topic) => {
								let figure: string;
								if (topic.icon) {
									figure = (
										<i
											class={`${topic.icon} has-text-${topic.accent} fa-5x`}
											role="link"
											aria-label={topic.title}
										/>
									);
								} else if (topic.logo) {
									figure = <img src={topic.logo} alt={topic.title} />;
								} else {
									figure = (
										<i
											class={`fas fa-file has-text-${topic.accent} fa-5x`}
											role="link"
											aria-label={topic.title}
										/>
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
													aria-label={topic.title}
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
			</BaseLayout>
		);
	}
}

module.exports = IndexPage;
