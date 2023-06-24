import { Static, Type } from "@sinclair/typebox";
import { EleventyPage } from "./models";
import path from "upath";
import { ReferenceFrontmatter, References } from "./ReferenceModels";
import { AllCollections, resolveReference } from "./registration";
import { validateFrontmatter } from "./validators";
import { DateTime } from "luxon";

const slugify = require("@sindresorhus/slugify");

export const BaseFrontmatter = Type.Object({
  resourceType: Type.Optional(
    Type.String({
      description: "Resource type. Should not be specified manually",
    })
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
});
export type BaseFrontmatter = Static<typeof BaseFrontmatter>;

export type BaseItem = {
  content: string;
  data: BaseFrontmatter;
  page: EleventyPage;
};

export class BaseEntity implements BaseFrontmatter {
  resourceType: string;
  slug: string;
  title: string;
  subtitle?: string;
  obsoletes?: string[];
  url: string;
  static frontmatterSchema = BaseFrontmatter;

  constructor({ data, page }: { data: BaseFrontmatter; page: EleventyPage }) {
    this.resourceType = data.resourceType as string;
    this.slug = page.fileSlug;
    this.title = data.title;
    this.subtitle = data.subtitle;
    this.obsoletes = data.obsoletes;
    this.url = page.url;

    // @ts-ignore
    const frontmatter = this.constructor.frontmatterSchema;
    validateFrontmatter(frontmatter, data, page.url);
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
    date: Type.Date({
      description: "Date this resource was published",
      ["format"]: "date",
      ["type"]: "string",
    }),
    thumbnail: Type.String({
      description: "File name of the thumbnail for this resource",
    }),
    cardThumbnail: Type.Optional(
      Type.String({
        description: "File name of the social card thumbnail for this resource",
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

export class Resource extends BaseEntity implements ResourceFrontmatter {
  anchor: string; // Playlist items need unique identifier
  author: string;
  date: Date;
  displayDate: string;
  thumbnail: string;
  cardThumbnail?: string;
  topics?: string[];
  references?: References;
  static frontmatterSchema: any = ResourceFrontmatter;
  static referenceFields = ["author", "topics"];

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
    this.thumbnail = path.join(page.url, data.thumbnail);
    this.topics = data.topics;

    if (data.cardThumbnail) {
      this.cardThumbnail = path.join(page.url, data.cardThumbnail);
    }
  }

  async init(): Promise<this> {
    return this;
  }

  resolve(allCollections: AllCollections): void {
    const { allReferences } = allCollections;
    // @ts-ignore
    const fieldNames: string[] = this.constructor.referenceFields;

    // @ts-ignore
    const references: References = {};
    for (const fieldName of fieldNames) {
      // @ts-ignore
      if (this[fieldName]) {
        // @ts-ignore
        references[fieldName] = resolveReference({
          fieldName,
          resource: this,
          allReferences,
        });
      } else {
        // Only array references things should be empty;
        // @ts-ignore
        references[fieldName] = [];
      }
    }

    this.references = references;
  }
}

export type ResourceCollection = Map<string, Resource>;
export type ReferenceCollection = Map<string, ReferenceFrontmatter>;

export function getResourceType(data: any, page: EleventyPage): string {
  /* Determine the resource type based on some policies */
  if (data.resourceType) {
    return data.resourceType;
  }

  // The data cascade should return a resourceType
  try {
    return data.resourceType;
  } catch (e) {
    const msg = `Page at "${page.url} does not have a resourceType`;
    throw new Error(msg);
  }
}
