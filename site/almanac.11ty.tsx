import { LayoutContext, LayoutProps } from "../src/models";
import { BaseLayout } from "../_includes/layouts/BaseLayout.11ty";
import { ResourceFrontmatter } from "../src/ResourceModels";

type AlmanacProps = LayoutProps & ResourceFrontmatter;

export default class AlmanacPage {
	data() {
		return {
			title: "Almanac",
			layout: "",
			eleventyExcludeFromCollections: true,
		};
	}

	render(this: LayoutContext, data: AlmanacProps): JSX.Element {
		const resources = this.getResources({
			// resourceTypes: ["tip", "tutorial", "playlist"],
			// limit: 12,
		});

		return (
			<BaseLayout {...data}>
				<div class="section">
					<div class="container">
						<h2 class="title mb-2 is-size-1 is-size-3-mobile has-text-weight-bold">
							Almanac
						</h2>
						<table class="table">
							<thead>
								<tr>
									<th>Month</th>
									<th>All</th>
									<th>Tips</th>
									<th>Tutorials</th>
									<th>Tutorial Steps</th>
									<th>Links</th>
									<th>Articles</th>
									<th>Authors</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>2024-07</td>
									<td>67</td>
									<td>41</td>
									<td>13</td>
									<td>2</td>
									<td>3</td>
									<td>4</td>
									<td>
										<span>Helen Scott (22)</span>,<span>Paul Everitt (11)</span>
										,
									</td>
								</tr>
								<tr>
									<td>2024-06</td>
									<td>33</td>
									<td>11</td>
									<td>13</td>
									<td>2</td>
									<td>3</td>
									<td>4</td>
									<td>
										<span>Helen Scott (22)</span>,
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</BaseLayout>
		);
	}
}
