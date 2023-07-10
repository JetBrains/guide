import { Static, Type } from "@sinclair/typebox";
import { BaseEntity, BaseFrontmatter } from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";

export const PageFrontmatter = Type.Intersect([BaseFrontmatter]);
export type PageFrontmatter = Static<typeof PageFrontmatter>;

export class Page extends BaseEntity implements PageFrontmatter {
  static frontmatterSchema = PageFrontmatter;

  constructor({ data, page }: { data: PageFrontmatter; page: EleventyPage }) {
    super({
      data,
      page,
    });
  }

  async init(): Promise<this> {
    return this;
  }
}
