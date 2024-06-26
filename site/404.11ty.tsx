import { LayoutContext, LayoutProps } from "../src/models";
import { PageFrontmatter } from "../_includes/resources/page/PageModels";
import { BaseLayout } from "../_includes/layouts/BaseLayout.11ty";
import ListingSection from "../_includes/pageelements/ListingSection.11ty";

type Http404PageProps = LayoutProps & PageFrontmatter;

export default class Http404Page {
	data() {
		return {
			title: "404 - Page Not Found",
			subtitle: "Uh-oh! The page could not be found",
			layout: "",
			eleventyExcludeFromCollections: true,
			permalink: "404.html",
		};
	}

	render(this: LayoutContext, data: Http404PageProps): JSX.Element {
		const latestContent = this.getResources({ limit: 12 });

		return (
			<BaseLayout {...data}>
				<section class="section has-gradient-magenta">
					<div class="container">
						<div class="columns is-multiline">
							<div class="column is-8">
								<h1 class="mt-2 mb-4 title has-text-weight-semibold has-text-white">
									{data.title}
								</h1>
								<p class="subtitle mb-5 has-text-white">{data.subtitle}</p>
								<div class="buttons mt-6">
									<a class="button is-rounded is-white" href="/explore">
										Explore our site...
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>

				<ListingSection
					title="Latest content"
					// @ts-ignore
					resources={latestContent}
					moreLink="/latest/"
				/>
			</BaseLayout>
		);
	}
}
