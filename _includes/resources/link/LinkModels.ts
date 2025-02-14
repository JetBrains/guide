import { Static, Type } from "@sinclair/typebox";
import {
	getThumbnailPath,
	Resource,
	ResourceFrontmatter,
} from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import { VideoType } from "../common/VideoProp";
import { LINK_RESOURCE, LINK_RESOURCE_TYPE } from "../../../src/resourceType";
import { ThumbnailField } from "../commonModels";
// @ts-ignore
import { getContentType } from "../../../public/assets/js/utils";
import path from "upath";

export const LinkFrontmatter = Type.Intersect([
	ResourceFrontmatter,
	ThumbnailField,
	Type.Object({
		screenshot: Type.Optional(
			Type.String({
				description: "File name of a screenshot to show in this link",
			}),
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

	getThumbnail(): string {
		return this.thumbnail;
	}

	describeContentType(): string {
		return getContentType(this.resourceType, this.linkURL);
	}
}

export const isLink = (resource: Resource | undefined): resource is Link => {
	return resource?.resourceType === LINK_RESOURCE;
};
