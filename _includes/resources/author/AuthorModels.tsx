import { Static, Type } from "@sinclair/typebox";
import path from "upath";
import { EleventyPage } from "../../../src/models";
import { LabelField, ThumbnailField } from "../commonModels";
import { Resource, ResourceFrontmatter } from "../../../src/ResourceModels";
import { AUTHOR_RESOURCE_TYPE } from "../../../src/resourceType";

export const AuthorFrontmatter = Type.Intersect([
	ResourceFrontmatter,
	ThumbnailField,
	LabelField,
	Type.Object({
		guest: Type.Optional(
			Type.Boolean({
				description:
					"Marks a community author/not JetBrains employee and is marked as such in the Author's profile page",
			})
		),
	}),
]);
export type AuthorFrontmatter = Static<typeof AuthorFrontmatter>;

export class Author
	extends Resource<AUTHOR_RESOURCE_TYPE>
	implements AuthorFrontmatter
{
	label: string;
	thumbnail: string;
	isGuest: boolean;
	static frontmatterSchema = AuthorFrontmatter;
	static joinKey = "author"; // What field on resource? Used in label namespace.

	constructor({ data, page }: { data: AuthorFrontmatter; page: EleventyPage }) {
		super({ data, page });
		this.label = data.label ? data.label : page.fileSlug;
		this.thumbnail = path.join(page.url, data.thumbnail);
		this.isGuest = data.guest ?? false;
	}

	getThumbnail(): string {
		return this.thumbnail;
	}
}
