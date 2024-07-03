import { LayoutContext, LayoutProps } from "../src/models";
import { BaseLayout } from "../_includes/layouts/BaseLayout.11ty";
import { Resource, ResourceFrontmatter } from "../src/ResourceModels";
import { RESOURCE_TYPES } from "../src/resourceType";

type AlmanacProps = LayoutProps & ResourceFrontmatter;

type Row = {
	byResourceType: Record<RESOURCE_TYPES, number>;
	byAuthor: Record<string, number>;
};

type Data = Record<string, Row>;

export default class AlmanacPage {
	data() {
		return {
			title: "Almanac",
			layout: "",
			eleventyExcludeFromCollections: true,
		};
	}

	render(this: LayoutContext, data: AlmanacProps): JSX.Element {
		const resources = this.getResources() as Resource[];
		const resourceTypes: Record<string, true> = {} as any;
		const aggregatedData = resources.reduce((acc, resource) => {
			const res = resource as Resource;
			// if (res.resourceType === "author") {
			// 	return { ...acc };
			// }
			resourceTypes[resource.resourceType] = true;
			const date = `${res.date.getFullYear()}-${res.date.getMonth() + 1}`;
			const t = {
				...acc,
				[date]: {
					byResourceType: {
						...(acc[date]?.byResourceType ?? {}),
						[resource.resourceType]:
							(acc[date]?.byResourceType[resource.resourceType] ?? 0) + 1,
					},
					byAuthor: {
						...(acc[date]?.byAuthor ?? {}),
						[resource.references?.author?.title ?? resource.author]:
							(acc[date]?.byAuthor[
								resource.references?.author?.title ?? resource.author
							] ?? 0) + 1,
					},
				},
			};
			return t;
		}, {} as Data);

		const calculateSum = (data: Record<string, number>) =>
			Object.values(data).reduce((acc, curr) => {
				return acc + curr;
			}, 0);

		function sortAuthorsByAmount(byAuthor: Record<string, number>): Array<{
			author: string;
			amount: number;
		}> {
			const res = Object.entries(byAuthor).reduce(
				(acc, [key, value]) => {
					return [...acc, { author: key, amount: value }];
				},
				[] as { author: string; amount: number }[],
			);
			return res.sort((a, b) => b.amount - a.amount);
		}

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
									<th style={{ width: "90px" }}>Month</th>
									<th>All</th>
									{Object.keys(resourceTypes).map((resourceType) => (
										<th>{resourceType}</th>
									))}
									<th>Authors</th>
								</tr>
							</thead>
							<tbody>
								{Object.keys(aggregatedData).map((date) => (
									<tr>
										<td>{date}</td>
										<td class="has-text-right">
											{calculateSum(aggregatedData[date].byResourceType)}
										</td>
										{Object.keys(resourceTypes).map((resourceType) => (
											<td class="has-text-right">
												{aggregatedData[date].byResourceType[
													resourceType as RESOURCE_TYPES
												] ?? "0"}
											</td>
										))}
										<td>
											{sortAuthorsByAmount(aggregatedData[date].byAuthor).map(
												({ author, amount }) => (
													<span>
														{author} ({amount}),
													</span>
												),
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</BaseLayout>
		);
	}
}
