import { Static, Type } from "@sinclair/typebox";
import { EleventyPage } from "./models";
import path from "upath";
import { Reference, References } from "./ReferenceModels";
import { AllCollections, resolveReference } from "./registration";
import { validateFrontmatter } from "./validators";
import { DateTime } from "luxon";
import { ALL_RESOURCES, RESOURCE_TYPES } from "./resourceType";

const slugify = require("@sindresorhus/slugify");

export const BaseFrontmatter = Type.Object({
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
	channel: Type.Optional(
		Type.String({ description: "Possible channel this resource is in" })
	),
});
export type BaseFrontmatter = Static<typeof BaseFrontmatter>;

export type BaseItem = {
	content: string;
	data: BaseFrontmatter;
	page: EleventyPage;
};

export class BaseEntity<T extends RESOURCE_TYPES> implements BaseFrontmatter {
	resourceType: T;
	slug: string;
	title: string;
	subtitle?: string;
	obsoletes?: string[];
	url: string;
	channel?: string;
	static frontmatterSchema = BaseFrontmatter;

	constructor({ data, page }: { data: BaseFrontmatter; page: EleventyPage }) {
		this.resourceType = data.resourceType as T;
		this.slug = page.fileSlug;
		this.title = data.title;
		this.subtitle = data.subtitle;
		this.obsoletes = data.obsoletes;
		this.url = page.url;
		this.channel = data.channel;

		validateFrontmatter(BaseEntity.frontmatterSchema, data, page.url);
	}

	async init(): Promise<this> {
		return this;
	}
}

// TODO Get rid of slug in models if it isn't used

export const ResourceFrontmatter = Type.Intersect([
	BaseFrontmatter,
	Type.Object({
		author: Type.String({ description: "Author of this resource" }),
		channel: Type.Optional(
			Type.String({ description: "Possible channel this resource is in" })
		),
		date: Type.Date({
			description: "Date this resource was published",
			["format"]: "date",
			["type"]: "string",
		}),
		thumbnail: Type.Optional(
			Type.String({
				description: "File name of the thumbnail for this resource",
			})
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

export class Resource<T extends RESOURCE_TYPES = RESOURCE_TYPES>
	extends BaseEntity<T>
	implements ResourceFrontmatter
{
	anchor: string; // Playlist items need unique identifier
	author: string;
	date: Date;
	displayDate: string;
	thumbnail?: string;
	cardThumbnail?: string;
	tags?: string[];
	topics?: string[];
	references?: References;
	static frontmatterSchema: any = ResourceFrontmatter;
	static referenceFields = ["author", "channel", "topics"] as const;

	constructor({
		data,
		page,
	}: {
		data: ResourceFrontmatter;
		page: EleventyPage;
	}) {
		super({ data, page });
		const thisDate = DateTime.fromJSDate(data.date, { zone: "utc" });
		const displayDate = thisDate.toFormat("yyyy-LL-dd");
		this.anchor = slugify(this.url);
		this.author = data.author;
		this.date = new Date(data.date);
		this.displayDate = displayDate;
		if (data.thumbnail) {
			if (data.thumbnail.startsWith("/")) {
				// If absolute URL, just use it
				this.thumbnail = data.thumbnail;
			} else {
				this.thumbnail = path.join(page.url, data.thumbnail);
			}
		}
		this.tags = data.tags;
		this.topics = data.topics;

		if (data.cardThumbnail) {
			this.cardThumbnail = path.join(page.url, data.cardThumbnail);
		}
	}

	// async init(): Promise<this> {
	// 	return this;
	// }

	resolve(allCollections: AllCollections): void {
		const { allReferences, allResources } = allCollections;

		this.references = Resource.referenceFields.reduce((acc, fieldName) => {
			return {
				...acc,
				[fieldName]: this[fieldName]
					? resolveReference({
							fieldName,
							resource: this,
							allReferences,
							allResources,
					  })
					: [],
			};
		}, {} as References);
	}
}

export type ResourceCollection = Map<string, Resource>;
export type ReferenceCollection = Map<string, Reference>;

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
