import { Reference, ReferenceFrontmatter } from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import path from "upath";
import { EleventyPage } from "../../../src/models";

export const AuthorFrontmatter = Type.Intersect([
  ReferenceFrontmatter,
  Type.Object({
    thumbnail: Type.String(),
  }),
]);
export type AuthorFrontmatter = Static<typeof AuthorFrontmatter>;

export class Author extends Reference implements AuthorFrontmatter {
  thumbnail: string;
  static frontmatterSchema = AuthorFrontmatter;
  static joinKey = "author"; // What field on resource? Used in label namespace.

  constructor({ data, page }: { data: AuthorFrontmatter; page: EleventyPage }) {
    super({ data, page });
    this.thumbnail = path.join(page.url, data.thumbnail);
  }
}
