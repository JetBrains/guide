import { ReferenceLayoutProps } from "../_includes/layouts/ReferenceLayout.11y";
import { LunrBase } from "../_includes/lunr.11ty";

export default class LunrJson extends LunrBase {
	data() {
		return {
			eleventyExcludeFromCollections: true,
			layout: "",
			permalink: "lunr.json",
		};
	}

	render(data: ReferenceLayoutProps) {
		const { collections, commandLineArgs } = data;
		const { pathprefix } = commandLineArgs;
		const results = this.getRecords(collections, pathprefix);
		return JSON.stringify({ results });
	}
}
