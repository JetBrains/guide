import path from "upath";
import { ChannelHomepageData } from "./resources/channel/ChannelModels";

export class LunrBase {
	data() {
		return {};
	}

	getRecords(data: ChannelHomepageData) {
		const { collections, commandLineArgs } = data;
		const { pathprefix } = commandLineArgs;
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
			} else {
				// @ts-ignore
				record.accent = value.accent;
				// @ts-ignore
				record.icon = value.icon;
			}
			return record;
		});
	}
}
