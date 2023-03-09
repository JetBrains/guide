import { Reference, ReferenceFrontmatter } from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { EleventyPage } from "../../../src/models";
import path from "upath";

export const ProductFrontmatter = Type.Intersect([
  ReferenceFrontmatter,
  Type.Object({
    logo: Type.String(),
  }),
]);
export type ProductFrontmatter = Static<typeof ProductFrontmatter>;

export class Product extends Reference implements ProductFrontmatter {
  logo: string;
  static frontmatterSchema = ProductFrontmatter;
  static joinKey = "products"; // What field on resource? Used in label namespace.

  constructor({
    data,
    page,
  }: {
    data: ProductFrontmatter;
    page: EleventyPage;
  }) {
    super({ data, page });
    this.logo = path.join(page.url, data.logo);
  }
}
