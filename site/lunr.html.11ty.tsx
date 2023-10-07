// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { ReferenceLayoutProps } from "../_includes/layouts/ReferenceLayout.11y";
import { LunrBase } from "../_includes/lunr.11ty";

class LunrHtml extends LunrBase {
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
					<div>
						<pre>{JSON.stringify(record)}</pre>
						{record.thumbnail && (
							<img
								alt={record.title}
								src={record.thumbnail}
								data-key="thumbnail"
								data-path={record.thumbnail}
							/>
						)}
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

module.exports = LunrHtml;
