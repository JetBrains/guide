import { Reference, ReferenceFrontmatter } from "../../../src/ReferenceModels";
import { Static, Type } from "@sinclair/typebox";
import { EleventyPage } from "../../../src/models";

export const TopicFrontmatter = Type.Intersect([
  ReferenceFrontmatter,
  Type.Object({
    accent: Type.String(),
    icon: Type.String(),
  }),
]);
export type TopicFrontmatter = Static<typeof TopicFrontmatter>;

export class Topic extends Reference implements TopicFrontmatter {
  accent: string;
  icon: string;
  static frontmatterSchema = TopicFrontmatter;
  static joinKey = "topics"; // What field on resource? Used in label namespace.

  constructor({ data, page }: { data: TopicFrontmatter; page: EleventyPage }) {
    super({ data, page });
    this.accent = data.accent;
    // font-awesome string
    this.icon = data.icon;
  }
}
