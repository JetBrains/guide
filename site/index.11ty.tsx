// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { LayoutContext, LayoutProps } from "../src/models";
import { PageFrontmatter } from "../_includes/resources/page/PageModels";
import { BaseLayout } from "../_includes/layouts/BaseLayout.11ty";
import FeaturedResource from "../_includes/pageelements/FeaturedResource.11ty";
import MultiColumnSection from "../_includes/pageelements/MultiColumnSection";
import ListingSection from "../_includes/pageelements/ListingSection.11ty";

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
		const featuredResource = this.getResource(
			"/idea/tutorials/gitlab-merge-requests/"
		);
		const latestContent = this.getResources({
			resourceTypes: ["tip", "tutorial", "playlist"],
			limit: 12,
		});

		return (
			<BaseLayout {...data}>
				<section class="section has-gradient-purple">
					<div class="container">
						<div class="columns is-multiline">
							<div class="column is-8">
								<h1 class="mt-2 mb-4 is-size-1 has-text-weight-bold has-text-white">
									Welcome to the JetBrains Guide
								</h1>
								<p class="subtitle mb-5 has-text-white">
									Learn about technologies and become a badass developer. We
									have tips, tutorials, videos, articles and much, much more!
								</p>
							</div>
						</div>
					</div>
				</section>
				<FeaturedResource resource={featuredResource}>
					<p>
						You're working hard on a branch. Then, a colleague finishes some
						work. Congratulations -- you have a GitLab merge request. How do you
						productively, efficiently process it with the least distraction?
					</p>{" "}
					<p>
						The IDE can help! JetBrains IDEs have GitLab integration. Learn how
						to process that merge request, in the IDE, and quickly get back in
						the flow.
					</p>
				</FeaturedResource>
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
						<h2>Sharing Feedback and Contributing</h2>
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

				<ListingSection
					title="Latest"
					resources={latestContent}
					moreLink="/latest/"
				/>
			</BaseLayout>
		);
	}
}

module.exports = IndexPage;
