import { ReferenceLayoutProps } from "../_includes/layouts/ReferenceLayout.11y";
import { LunrBase } from "../_includes/lunr.11ty";

export default class LunrHtml extends LunrBase {
	data() {
		return {
			eleventyExcludeFromCollections: true,
			layout: "",
			permalink: "lunr.html",
		};
	}

	render(data: ReferenceLayoutProps): JSX.Element {
		const { collections, commandLineArgs } = data;
		const { pathprefix } = commandLineArgs;
		const records = this.getRecords(collections, pathprefix);
		return (
			<div>
				{records.map((record) => (
					<div class="record">
						<pre>{JSON.stringify(record)}</pre>

						{
							// @ts-ignore
							record.thumbnail && (
								<img
									alt={record.title}
									// @ts-ignore
									src={record.thumbnail}
									data-key="thumbnail"
									// @ts-ignore
									data-path={record.thumbnail}
								/>
							)
						}
						<img
							alt={record.title}
							src={record.authorThumbnail}
							data-key="authorThumbnail"
							data-path={record.authorThumbnail}
						/>
					</div>
				))}
			</div>
		);
	}
}
