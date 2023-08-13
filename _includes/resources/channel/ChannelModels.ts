import { Static, Type } from "@sinclair/typebox";
import { Resource, ResourceFrontmatter } from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";

export const ChannelFrontmatter = Type.Intersect([
  ResourceFrontmatter,
  Type.Object({
    subnav: Type.Optional(
      Type.Array(
        Type.Object({
          title: Type.String({
            description: "File name of the animated GIF, can be webm or gif",
          }),
          url: Type.String({
            description: "URL to link to",
          }),
        })
      )
    ),
  }),
]);
export type ChannelFrontmatter = Static<typeof ChannelFrontmatter>;

export class Channel extends Resource implements ChannelFrontmatter {
  subnav?: ChannelFrontmatter["subnav"];
  static frontmatterSchema = ChannelFrontmatter;

  constructor({
    data,
    page,
  }: {
    data: ChannelFrontmatter;
    page: EleventyPage;
  }) {
    super({
      data,
      page,
    });
    this.subnav = data.subnav;
  }

  async init(): Promise<this> {
    return this;
  }
}
