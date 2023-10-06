// noinspection ES6UnusedImports
import { ReferenceLayoutProps } from "../_includes/layouts/ReferenceLayout.11y";
import { LunrBase } from "../_includes/lunr.11ty";

class LunrJson extends LunrBase {
	data() {
		return {
			eleventyExcludeFromCollections: true,
			layout: "",
			permalink: "lunr.json",
		};
	}

	render(data: ReferenceLayoutProps) {
		const results = this.getRecords(data);
		return JSON.stringify({ results });
	}
}

module.exports = LunrJson;
