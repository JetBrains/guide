import { Static, Type } from "@sinclair/typebox";
import {
	getThumbnailPath,
	Resource,
	ResourceFrontmatter,
} from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import path from "upath";
import { VideoType } from "../common/VideoProp";
import { LINK_RESOURCE_TYPE } from "../../../src/resourceType";
import { ThumbnailField } from "../commonModels";

export const LinkFrontmatter = Type.Intersect([
	ResourceFrontmatter,
	ThumbnailField,
	Type.Object({
		screenshot: Type.Optional(
			Type.String({
				description: "File name of a screenshot to show in this link",
			})
		),
		video: Type.Optional(VideoType),
		linkURL: Type.String({
			description: "URL of external resource to link to",
		}),
	}),
]);
export type LinkFrontmatter = Static<typeof LinkFrontmatter>;

export class Link
	extends Resource<LINK_RESOURCE_TYPE>
	implements LinkFrontmatter
{
	linkURL: string;
	screenshot?: LinkFrontmatter["screenshot"];
	thumbnail: LinkFrontmatter["thumbnail"];
	video?: LinkFrontmatter["video"];
	static frontmatterSchema = LinkFrontmatter;

	constructor({ data, page }: { data: LinkFrontmatter; page: EleventyPage }) {
		super({ data, page });
		this.linkURL = data.linkURL;
		this.video = data.video;
		this.thumbnail = getThumbnailPath(data.thumbnail, page.url);
		this.screenshot = data.screenshot
			? path.join(page.url, data.screenshot)
			: undefined;
	}
}
