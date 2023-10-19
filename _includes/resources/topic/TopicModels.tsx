import { Static, Type } from "@sinclair/typebox";
import { EleventyPage } from "../../../src/models";
import path from "upath";
import { IconField, LabelField } from "../commonModels";
import { Resource, ResourceFrontmatter } from "../../../src/ResourceModels";
import { TOPIC_RESOURCE_TYPE } from "../../../src/resourceType";
import h from "vhtml";

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
			this.logo = path.join(page.url, data.logo);
			this.thumbnail = this.logo;
		}
	}

	getThumbnail(): string {
		if (this.logo) {
			return (
				<img
					data-template-src="thumbnail"
					data-template-alt="title"
					src={this.logo}
					alt={this.title}
				/>
			);
		} else {
			return <i class={`${this.icon} has-text-${this.accent} fa-5x`} />;
		}
	}
}
