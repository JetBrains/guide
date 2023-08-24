import { Reference, ReferenceFrontmatter } from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { EleventyPage } from "../../../src/models";
import path from "upath";

export const TopicFrontmatter = Type.Intersect([
	ReferenceFrontmatter,
	Type.Object({
		accent: Type.Optional(Type.String()),
		icon: Type.Optional(Type.String()),
		logo: Type.Optional(Type.String()),
		topicType: Type.Optional(Type.String()),
	}),
]);
export type TopicFrontmatter = Static<typeof TopicFrontmatter>;

export class Topic extends Reference implements TopicFrontmatter {
	accent?: string;
	icon?: string;
	logo?: string;
	topicType?: string;
	static frontmatterSchema: any = TopicFrontmatter;
	static joinKey = "topics"; // What field on resource? Used in label namespace.

	constructor({ data, page }: { data: TopicFrontmatter; page: EleventyPage }) {
		super({
			data,
			page,
		});
		this.topicType = data.topicType;
		this.logo = data.logo;
		this.accent = data.accent;
		// font-awesome string
		this.icon = data.icon;
		if (data.logo) {
			this.logo = path.join(page.url, data.logo);
		}
	}
}
