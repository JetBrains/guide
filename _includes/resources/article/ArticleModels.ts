import { Static, Type } from "@sinclair/typebox";
import { Resource, ResourceFrontmatter } from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import path from "upath";

export const ArticleFrontmatter = Type.Intersect([
  ResourceFrontmatter,
  Type.Object({
    animatedGif: Type.Optional(
      Type.Object(
        {
          file: Type.String({
            description: "File name of the animated GIF, can be webm or gif",
          }),
          width: Type.Number({
            description: "Width the animated GIF should be rendered",
          }),
          height: Type.Number({
            description: "Height the animated GIF should be rendered",
          }),
        },
        { description: "Animated GIF to show in this tip" }
      )
    ),
    screenshot: Type.Optional(
      Type.String({
        description: "File name of a screenshot to show in this tip",
      })
    ),
    video: Type.Optional(
      Type.Union([
        Type.String({
          description: "YouTube URL to the video",
        }),
        Type.Object(
          {
            url: Type.String({ description: "YouTube URL to the video" }),
            start: Type.Number({
              description: "start time for the video",
            }),
            end: Type.Number({
              description: "end time for the video",
            }),
          },
          { description: "Animated GIF to show in this tip" }
        ),
      ])
    ),
    seealso: Type.Optional(
      Type.Any({
        description: "Item(s) to show in the See Also section of this tip",
      })
    ),
  }),
]);
export type ArticleFrontmatter = Static<typeof ArticleFrontmatter>;

export class Article extends Resource implements ArticleFrontmatter {
  animatedGif?: ArticleFrontmatter["animatedGif"];
  video?: ArticleFrontmatter["video"];
  screenshot?: ArticleFrontmatter["screenshot"];
  seealso?: any;
  static frontmatterSchema = ArticleFrontmatter;

  constructor({
    data,
    page,
  }: {
    data: ArticleFrontmatter;
    page: EleventyPage;
  }) {
    super({ data, page });
    this.animatedGif = data.animatedGif;
    if (this.animatedGif) {
      this.animatedGif.file = path.join(page.url, this.animatedGif.file);
    }
    this.video = data.video;
    this.screenshot = data.screenshot
      ? path.join(page.url, data.screenshot)
      : undefined;
    this.seealso = data.seealso;
  }
}
