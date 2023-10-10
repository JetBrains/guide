import h from "vhtml";
import { Static, Type } from "@sinclair/typebox";
import { EleventyPage } from "./models";
import path from "upath";
import { resolveReference } from "./registration";
import { validateFrontmatter } from "./validators";
import { DateTime } from "luxon";
import { ALL_RESOURCES, RESOURCE_TYPES } from "./resourceType";
import { Author } from "../_includes/resources/author/AuthorModels";
import { Channel } from "../_includes/resources/channel/ChannelModels";
import { Topic } from "../_includes/resources/topic/TopicModels";

import slugify from "@sindresorhus/slugify";

// @ts-ignore
import { getContentType } from "../public/assets/js/utils";

export function getThumbnailPath(
	dataThumbnail: string,
	pageURL: string
): string {
	// If absolute URL, just use it
	if (dataThumbnail.startsWith("/")) {
		return dataThumbnail;
	} else {
		return path.join(pageURL, dataThumbnail);
	}
}

export const BaseFrontmatter = Type.Object({});
export type BaseFrontmatter = Static<typeof BaseFrontmatter>;

export const ResourceFrontmatter = Type.Intersect([
	Type.Object({
		resourceType: Type.Union(
			[
				...ALL_RESOURCES.map((x) => Type.Literal(x)),
				Type.Literal("author"),
				Type.Literal("topic"),
			],
			{
				description: "Resource type. Should not be specified manually",
			}
		),
		title: Type.String({ description: "Title of this resource" }),
		subtitle: Type.Optional(
			Type.String({ description: "Subtitle of this resource" })
		),
		obsoletes: Type.Optional(
			Type.Array(Type.String(), {
				description: "Paths that should redirect to this resource",
			})
		),
		// TODO JNW Sucks to have author on an Author
		author: Type.String({ description: "Author of this resource" }),
		date: Type.Date({
			description: "Date this resource was published",
			["format"]: "date",
			["type"]: "string",
		}),
		channel: Type.Optional(
			Type.String({ description: "Possible channel this resource is in" })
		),
		cardThumbnail: Type.Optional(
			Type.String({
				description: "File name of the social card thumbnail for this resource",
			})
		),
		tags: Type.Optional(
			Type.Array(Type.String(), {
				description: "11ty tag data",
			})
		),
		topics: Type.Optional(
			Type.Array(Type.String(), {
				description: "Topics related to this resource",
			})
		),
	}),
]);
export type ResourceFrontmatter = Static<typeof ResourceFrontmatter>;

export type ResourceItem = {
	content: string;
	data: ResourceFrontmatter;
	page: EleventyPage;
};

export type References = {
	author: Author;
	channel?: Channel;
	topics: Topic[];
};

export class Resource<T extends RESOURCE_TYPES = RESOURCE_TYPES>
	implements ResourceFrontmatter
{
	resourceType: T;
	author: string;
	date: Date;
	slug: string;
	title: string;
	subtitle?: string;
	obsoletes?: string[];
	url: string;
	channel?: string;
	// TODO: JNW figure out why any is necessary here
	static frontmatterSchema: any = ResourceFrontmatter;

	anchor: string; // Playlist items need unique identifier
	displayDate: string;
	cardThumbnail?: string;
	tags?: string[];
	topics?: string[];
	references?: References;
	static referenceFields = ["author", "channel", "topics"] as const;

	constructor({
		data,
		page,
	}: {
		data: ResourceFrontmatter;
		page: EleventyPage;
	}) {
		this.resourceType = data.resourceType as T;
		this.slug = page.fileSlug;
		this.title = data.title;
		this.subtitle = data.subtitle;
		this.obsoletes = data.obsoletes;
		this.url = page.url;
		this.channel = data.channel;
		this.author = data.author;
		this.date = new Date(data.date);

		const thisDate = DateTime.fromJSDate(data.date, { zone: "utc" });
		const displayDate = thisDate.toFormat("yyyy-LL-dd");
		this.anchor = slugify(this.url);
		this.displayDate = displayDate;
		this.tags = data.tags;
		this.topics = data.topics;

		if (data.cardThumbnail) {
			this.cardThumbnail = path.join(page.url, data.cardThumbnail);
		}
	}

	resolve(resourceMap: ResourceMap): void {
		// TODO JNW Why does TS think frontmatterSchema is not a part of
		//    this.constructor?
		// @ts-ignore
		validateFrontmatter(this.constructor.frontmatterSchema, this, this.url);

		this.references = Resource.referenceFields.reduce((acc, fieldName) => {
			return {
				...acc,
				[fieldName]: this[fieldName]
					? resolveReference({
							fieldName,
							resource: this,
							resourceMap,
					  })
					: [],
			};
		}, {} as References);
	}

	getThumbnail(): string {
		const defaultThumbnail = "/assets/jetbrains-simple.svg";
		return (
			<img
				data-template-src="thumbnail"
				data-template-alt="title"
				src={defaultThumbnail}
				alt={this.title}
			/>
		);
	}

	describeContentType(): string {
		return getContentType(this.resourceType);
	}
}

export type ResourceMap = Map<string, Resource<RESOURCE_TYPES>>;

export function getResourceType<T extends RESOURCE_TYPES>(
	data: { resourceType?: T },
	page: EleventyPage
): T {
	if (!data.resourceType) {
		const msg = `Page at "${page.url} does not have a resourceType`;
		throw new Error(msg);
	}
	return data.resourceType;
}
