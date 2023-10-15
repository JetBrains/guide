import path from "upath";
import { SiteCollections } from "./models";
import { getGlowInfo } from "./resourcecard/ResourceCard.11ty";

export class LunrBase {
	data() {
		return {};
	}

	getRecords(collections: SiteCollections, pathprefix: string | undefined) {
		return Array.from(collections.resourceMap.values()).map((value) => {
			const url = pathprefix ? path.join(pathprefix, value.url) : value.url;
			const authorURL = pathprefix
				? path.join(pathprefix, value.references?.author.url)
				: value.references?.author.url;
			const record = {
				title: value.title,
				subtitle: value.subtitle,
				url,
				topics: value.topics,
				channel: value.channel,
				resourceType: value.resourceType,
				authorURL,
				authorThumbnail: value.references?.author.thumbnail,
				author: value.references?.author.title,
				datetime: value.displayDate,
			};
			// @ts-ignore
			if (value.thumbnail) {
				// @ts-ignore
				record.thumbnail = value.thumbnail;
				// do the hash, produce a value for "class" attribute
				const { thumbnailFigureCss, glowCssClass } = getGlowInfo(value);
				record.thumbnailCss = `image ${thumbnailFigureCss} ${glowCssClass}`;
			} else {
				// TODO Paul likely no longer needed for CSR
				// @ts-ignore
				record.accent = value.accent;
				// @ts-ignore
				record.icon = value.icon;
			}
			// @ts-ignore
			if (value.linkURL) {
				// @ts-ignore
				record.linkURL = value.linkURL;
			}
			return record;
		});
	}
}
