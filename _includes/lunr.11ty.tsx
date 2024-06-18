import { SiteCollections } from "./models";
import { getGlowInfo } from "./resourcecard/ResourceCard.11ty";
import path from "upath";

export class LunrBase {
	data() {
		return {};
	}

	getRecords(collections: SiteCollections, pathprefix: string | undefined) {
		return Array.from(collections.resourceMap.values()).map((value) => {
			const url = pathprefix ? path.join(pathprefix, value.url) : value.url;
			const authorUrl = value.references?.author.url ?? "";
			const authorURL = pathprefix
				? path.join(pathprefix, authorUrl)
				: authorUrl;
			const record = {
				title: value.title,
				subtitle: value.subtitle,
				url,
				topics: value.topics,
				channel: value.channel,
				channelTitle: value.references?.channel?.title,
				resourceType: value.resourceType,
				authorURL,
				authorThumbnail: value.references?.author.thumbnail,
				author: value.references?.author.title,
				datetime: value.displayDate,
				thumbnail: null,
				thumbnailCss: "",
			};

			// @ts-ignore
			record.thumbnail = value.thumbnail;

			if (record.thumbnail) {
				// do the hash, produce a value for "class" attribute
				const { thumbnailFigureCss, glowCssClass } = getGlowInfo({
					displayDate: record.datetime,
					title: record.title,
				});
				record.thumbnailCss = `image ${thumbnailFigureCss} ${glowCssClass}`;
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
