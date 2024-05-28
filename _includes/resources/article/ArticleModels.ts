import { Static, Type } from "@sinclair/typebox";
import {
	getThumbnailPath,
	Resource,
	ResourceFrontmatter,
} from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import { ARTICLE_RESOURCE_TYPE } from "../../../src/resourceType";
import { ThumbnailField, VideoField } from "../commonModels";
import path from "upath";

export const ArticleFrontmatter = Type.Intersect([
	ResourceFrontmatter,
	ThumbnailField,
	VideoField,
	Type.Object({
		animatedGif: Type.Optional(
			Type.Object(
				{
					file: Type.String({
						description: "File name of the animated GIF, can be webm or gif",
					}),
					width: Type.Null(
						Type.Number({
							description: "Width the animated GIF should be rendered",
						}),
					),
					height: Type.Null(
						Type.Number({
							description: "Height the animated GIF should be rendered",
						}),
					),
				},
				{ description: "Animated GIF to show in this tip" },
			),
		),
		screenshot: Type.Optional(
			Type.String({
				description: "File name of a screenshot to show in this tip",
			}),
		),
		seealso: Type.Optional(
			Type.Any({
				description: "Item(s) to show in the See Also section of this tip",
			}),
		),
	}),
]);
export type ArticleFrontmatter = Static<typeof ArticleFrontmatter>;

export class Article
	extends Resource<ARTICLE_RESOURCE_TYPE>
	implements ArticleFrontmatter
{
	animatedGif?: ArticleFrontmatter["animatedGif"];
	screenshot?: ArticleFrontmatter["screenshot"];
	seealso?: any;
	thumbnail: ArticleFrontmatter["thumbnail"];
	video?: ArticleFrontmatter["video"];
	static frontmatterSchema = ArticleFrontmatter;

	constructor({
		data,
		page,
	}: {
		data: ArticleFrontmatter;
		page: EleventyPage;
	}) {
		super({ data, page });
		this.animatedGif = data.animatedGif;
		if (this.animatedGif) {
			this.animatedGif.file = path.join(page.url, this.animatedGif.file);
		}
		this.video = data.video;
		this.screenshot = data.screenshot
			? path.join(page.url, data.screenshot)
			: undefined;
		this.seealso = data.seealso;
		this.thumbnail = getThumbnailPath(data.thumbnail, page.url);
	}

	getThumbnail(): string {
		return this.thumbnail;
	}
}
