import { Static, Type } from "@sinclair/typebox";
import {
	getThumbnailPath,
	Resource,
	ResourceFrontmatter,
} from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import { ThumbnailField } from "../commonModels";
import { PAGE_RESOURCE_TYPE } from "../../../src/resourceType";

export const PageFrontmatter = Type.Intersect([
	ResourceFrontmatter,
	ThumbnailField,
]);
export type PageFrontmatter = Static<typeof PageFrontmatter>;

export class Page
	extends Resource<PAGE_RESOURCE_TYPE>
	implements PageFrontmatter
{
	thumbnail: PageFrontmatter["thumbnail"];
	static frontmatterSchema = PageFrontmatter;

	constructor({ data, page }: { data: PageFrontmatter; page: EleventyPage }) {
		super({
			data,
			page,
		});
		this.thumbnail = getThumbnailPath(data.thumbnail, page.url);
	}
}
