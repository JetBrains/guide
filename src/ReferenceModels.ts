import { BaseEntity, BaseFrontmatter } from "./ResourceModels";
import { EleventyPage } from "./models";
import { Static, Type } from "@sinclair/typebox";
import { Channel } from "../_includes/resources/channel/ChannelModels";
import { RESOURCE_TYPES } from "./resourceType";

export const ReferenceFrontmatter = Type.Intersect([
	BaseFrontmatter,
	Type.Object({
		label: Type.Optional(
			Type.String({ description: "Label of this resource" })
		), // Can be inferred from parentDir
	}),
]);
export type ReferenceFrontmatter = Static<typeof ReferenceFrontmatter>;

export class Reference<T extends RESOURCE_TYPES = RESOURCE_TYPES>
	extends BaseEntity<T>
	implements ReferenceFrontmatter
{
	label: string;
	static joinKey = "references"; // What field on resource? Used in label namespace.

	constructor({
		data,
		page,
	}: {
		data: ReferenceFrontmatter;
		page: EleventyPage;
	}) {
		super({ data, page });
		this.label = data.label ? data.label : page.fileSlug;
	}
}

export async function getReference(
	data: any,
	page: EleventyPage
): Promise<Reference> {
	// const linkedResources: Resource[] = [];
	return new Reference({ data, page });
}

export type References = {
	author: Reference & { thumbnail: string };
	channel?: Channel;
	topics: Reference[];
};
