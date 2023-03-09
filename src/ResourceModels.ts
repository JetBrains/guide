import { Static, Type } from "@sinclair/typebox";
import { EleventyPage } from "./models";
import path from "upath";
import { ReferenceFrontmatter, References } from "./ReferenceModels";
import { AllCollections, resolveReference } from "./registration";
import { validateFrontmatter } from "./validators";
import { DateTime } from "luxon";

const slugify = require("@sindresorhus/slugify");

export const BaseFrontmatter = Type.Object({
  resourceType: Type.String(),
  title: Type.String(),
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
  url: string;
  static frontmatterSchema = BaseFrontmatter;

  constructor({ data, page }: { data: BaseFrontmatter; page: EleventyPage }) {
    this.resourceType = data.resourceType;
    this.slug = page.fileSlug;
    this.title = data.title;
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
    author: Type.String(),
    date: Type.Date(),
    products: Type.Optional(Type.Array(Type.String())),
    subtitle: Type.Optional(Type.String()),
    technologies: Type.Optional(Type.Array(Type.String())),
    thumbnail: Type.String(),
    topics: Type.Optional(Type.Array(Type.String())),
  }),
]);
export type ResourceFrontmatter = Static<typeof ResourceFrontmatter>;

export class Resource extends BaseEntity implements ResourceFrontmatter {
  anchor: string; // Playlist items need unique identifier
  author: string;
  date: Date;
  displayDate: string;
  products?: string[];
  subtitle?: string;
  technologies?: string[];
  thumbnail: string;
  topics?: string[];
  references?: References;
  static frontmatterSchema = ResourceFrontmatter;
  static referenceFields = ["author", "products", "technologies", "topics"];

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
    this.products = data.products;
    this.subtitle = data.subtitle;
    this.technologies = data.technologies;
    this.thumbnail = path.join(page.url, data.thumbnail);
    this.topics = data.topics;
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
