import { Static, Type } from "@sinclair/typebox";
import {
	getThumbnailPath,
	Resource,
	ResourceFrontmatter,
} from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import {
	ThumbnailField,
	VideoField,
	VideoVerticalField,
} from "../commonModels";
import { TIP_RESOURCE_TYPE } from "../../../src/resourceType";
import path from "upath";

// noinspection DuplicatedCode
export const TipFrontmatter = Type.Intersect([
	ResourceFrontmatter,
	ThumbnailField,
	VideoField,
	VideoVerticalField,
	Type.Object({
		animatedGif: Type.Optional(
			Type.Object(
				{
					file: Type.String({
						description: "File name of the animated GIF, can be webm or gif",
					}),
					width: Type.Optional(
						Type.Number({
							description: "Width the animated GIF should be rendered",
						}),
					),
					height: Type.Optional(
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
export type TipFrontmatter = Static<typeof TipFrontmatter>;

export class Tip extends Resource<TIP_RESOURCE_TYPE> implements TipFrontmatter {
	animatedGif?: TipFrontmatter["animatedGif"];
	screenshot?: TipFrontmatter["screenshot"];
	seealso?: any;
	thumbnail: TipFrontmatter["thumbnail"];
	video?: TipFrontmatter["video"];
	videoVertical?: TipFrontmatter["videoVertical"];
	static frontmatterSchema = TipFrontmatter;

	constructor({ data, page }: { data: TipFrontmatter; page: EleventyPage }) {
		// noinspection DuplicatedCode
		super({ data, page });
		this.animatedGif = data.animatedGif;
		if (this.animatedGif) {
			this.animatedGif.file = path.join(page.url, this.animatedGif.file);
		}
		this.video = data.video;
		this.videoVertical = data.videoVertical;
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
