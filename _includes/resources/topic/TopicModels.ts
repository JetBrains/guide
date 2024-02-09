import { Static, Type } from "@sinclair/typebox";
import { EleventyPage } from "../../../src/models";
import { IconField, LabelField } from "../commonModels";
import { Resource, ResourceFrontmatter } from "../../../src/ResourceModels";
import { TOPIC_RESOURCE_TYPE } from "../../../src/resourceType";
import { join } from "upath";

export const TopicFrontmatter = Type.Intersect([
	ResourceFrontmatter,
	LabelField,
	IconField,
]);
export type TopicFrontmatter = Static<typeof TopicFrontmatter>;

export class Topic
	extends Resource<TOPIC_RESOURCE_TYPE>
	implements TopicFrontmatter
{
	accent?: string;
	icon?: string;
	label: string;
	logo?: string;
	topicType?: string;
	thumbnail?: string;
	static frontmatterSchema = TopicFrontmatter;
	static joinKey = "topics"; // What field on resource? Used in label namespace.

	constructor({ data, page }: { data: TopicFrontmatter; page: EleventyPage }) {
		super({
			data,
			page,
		});
		this.label = data.label ? data.label : page.fileSlug;
		this.topicType = data.topicType;
		this.logo = data.logo;
		this.accent = data.accent;
		// font-awesome string
		this.icon = data.icon;
		if (data.logo) {
			this.logo = join(page.url, data.logo);
			this.thumbnail = this.logo;
		}
	}

	getThumbnail(): string {
		return this.logo ? this.logo! : this.icon!;
	}
}
