import { Static, Type } from "@sinclair/typebox";
import { Resource, ResourceFrontmatter } from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import path from "upath";

export const ArticleFrontmatter = Type.Intersect([
    ResourceFrontmatter,
    Type.Object({
        leadin: Type.Optional(Type.String({ description: "Tip leadin text" })),
        animatedGif: Type.Optional(
            Type.Object({
                file: Type.String({ description: "File name of the animated GIF" }),
                width: Type.Number({ description: "Width the animated GIF should be rendered" }),
                height: Type.Number({ description: "Height the animated GIF should be rendered" }),
            }, { description: "Animated GIF to show in this tip" })
        ),
        screenshot: Type.Optional(Type.String({ description: "File name of a screenshot to show in this tip" })),
        shortVideo: Type.Optional(
            Type.Object({
                url: Type.String({ description: "URL of the video" }),
                posterNumber: Type.Optional(Type.String({ description: "Poster number to render" })),
                poster: Type.Optional(Type.String({ description: "File name of a poster to show for this video" })),
            }, { description: "Short video to show in this tip" })
        ),
        longVideo: Type.Optional(
            Type.Object({
                url: Type.String({ description: "URL of the video" }),
                posterNumber: Type.Optional(Type.String({ description: "Poster number to render" })),
                poster: Type.Optional(Type.String({ description: "File name of a poster to show for this video" })),
                start: Type.Optional(Type.Number({ description: "Where to start the video in seconds" })),
                end: Type.Optional(Type.Number({ description: "Where to stop the video in seconds" }))
            }, { description: "Long video to show in this tip" })
        ),
        hasBody: Type.Optional(Type.Boolean({ description: "True if body text should be rendered; false otherwise" })),
        seealso: Type.Optional(Type.Any({ description: "Item(s) to show in the See Also section of this tip" })),
    }),
]);
export type ArticleFrontmatter = Static<typeof ArticleFrontmatter>;

export class Article extends Resource implements ArticleFrontmatter {
    animatedGif?: ArticleFrontmatter["animatedGif"];
    hasBody?: boolean;
    leadin?: string;
    longVideo?: ArticleFrontmatter["longVideo"];
    screenshot?: ArticleFrontmatter["screenshot"];
    seealso?: any;
    shortVideo?: ArticleFrontmatter["shortVideo"];
    static frontmatterSchema = ArticleFrontmatter;

    constructor({ data, page }: { data: ArticleFrontmatter; page: EleventyPage }) {
        super({ data, page });
        this.animatedGif = data.animatedGif;
        if (this.animatedGif) {
            this.animatedGif.file = path.join(page.url, this.animatedGif.file);
        }
        this.hasBody = data.hasBody;
        this.leadin = data.leadin;
        this.longVideo = data.longVideo;
        this.screenshot = data.screenshot
            ? path.join(page.url, data.screenshot)
            : undefined;
        this.seealso = data.seealso;
        this.shortVideo = data.shortVideo;
        if (this.shortVideo && this.shortVideo.poster) {
            this.shortVideo.poster = path.join(page.url, this.shortVideo.poster);
        }
        if (this.longVideo && this.longVideo.poster) {
            this.longVideo.poster = path.join(page.url, this.longVideo.poster);
        }
    }
}
