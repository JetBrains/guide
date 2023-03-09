import { Reference, ReferenceFrontmatter } from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { EleventyPage } from "../../../src/models";
import path from "upath";

export const TechnologyFrontmatter = Type.Intersect([
  ReferenceFrontmatter,
  Type.Object({
    logo: Type.String(),
  }),
]);
export type TechnologyFrontmatter = Static<typeof TechnologyFrontmatter>;

export class Technology extends Reference implements TechnologyFrontmatter {
  logo: string;
  static frontmatterSchema = TechnologyFrontmatter;
  static joinKey = "technologies"; // What field on resource? Used in label namespace.

  constructor({
    data,
    page,
  }: {
    data: TechnologyFrontmatter;
    page: EleventyPage;
  }) {
    super({ data, page });
    this.logo = path.join(page.url, data.logo);
  }
}
