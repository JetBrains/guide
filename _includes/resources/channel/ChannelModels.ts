import { Static, Type } from "@sinclair/typebox";
import {
	getThumbnailPath,
	Resource,
	ResourceFrontmatter,
} from "../../../src/ResourceModels";
import { EleventyPage, LayoutProps } from "../../../src/models";
import { CHANNEL_RESOURCE_TYPE } from "../../../src/resourceType";
import { ThumbnailField } from "../commonModels";

export const ChannelFrontmatter = Type.Intersect([
	ResourceFrontmatter,
	ThumbnailField,
	Type.Object({
		hero: Type.Optional(
			Type.String({
				description: "File name of the hero image",
			})
		),
	}),
	Type.Object({
		subnav: Type.Optional(
			Type.Array(
				Type.Object({
					title: Type.String({
						description: "File name of the animated GIF, can be webm or gif",
					}),
					url: Type.String({
						description: "URL to link to",
					}),
				})
			)
		),
	}),
]);
export type ChannelFrontmatter = Static<typeof ChannelFrontmatter>;

export class Channel
	extends Resource<CHANNEL_RESOURCE_TYPE>
	implements ChannelFrontmatter
{
	hero?: string;
	subnav?: ChannelFrontmatter["subnav"];
	thumbnail: ChannelFrontmatter["thumbnail"];
	static frontmatterSchema = ChannelFrontmatter;

	constructor({
		data,
		page,
	}: {
		data: ChannelFrontmatter;
		page: EleventyPage;
	}) {
		super({
			data,
			page,
		});
		this.hero = data.hero;
		this.subnav = data.subnav;
		this.thumbnail = getThumbnailPath(data.thumbnail, page.url);
	}
}

// The following type is helpful for re-use in
// channel homepage views.

export type ChannelHomepageData = {} & LayoutProps & ChannelFrontmatter;
