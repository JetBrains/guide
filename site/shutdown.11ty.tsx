import { LayoutContext, LayoutProps } from "../src/models";
import { BaseLayout } from "../_includes/layouts/BaseLayout.11ty";
import { ResourceFrontmatter } from "../src/ResourceModels";

type ExplorePageProps = LayoutProps & ResourceFrontmatter;

export default class ExplorePage {
	data() {
		return {
			title: "Shutting Down",
			subtitle: "Shutting Down the JetBrains Guide",
			layout: "",
			eleventyExcludeFromCollections: true,
		};
	}

	render(this: LayoutContext, data: ExplorePageProps): JSX.Element {
		return (
			<BaseLayout {...data}>
				<div class="section">
					<div class="container">
						<div class="columns is-multiline is-flex-direction-row-reverse">
							<div class="column">
								<div class="columns">
									<div class="column is-four-fifths mb-5 mr-auto">
										<h2 class="title mb-2 is-size-1 is-size-3-mobile has-text-weight-bold">
											Retiring the JetBrains Guide
										</h2>
									</div>
								</div>

								<div class="content">
									<p>We closed the JetBrains Guide on March 30, 2026.</p>
									<p>
										It's been a wonderful journey and we're proud of what we
										did, but we need to put our effort into other, existing
										channels. Thanks to those that contributed, those that
										helped build the Guide, and to JetBrains for letting us
										experiment.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</BaseLayout>
		);
	}
}
