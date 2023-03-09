import { Static, Type } from "@sinclair/typebox";
import { Resource, ResourceFrontmatter } from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import { AllCollections } from "../../../src/registration";

export const PlaylistFrontmatter = Type.Intersect([
  ResourceFrontmatter,
  Type.Object({
    playlistItems: Type.Array(Type.String()),
  }),
]);
export type PlaylistFrontmatter = Static<typeof PlaylistFrontmatter>;

export class Playlist extends Resource implements PlaylistFrontmatter {
  playlistItems: string[];
  playlistResources: Resource[];
  static frontmatterSchema = PlaylistFrontmatter;

  constructor({
    data,
    page,
  }: {
    data: PlaylistFrontmatter;
    page: EleventyPage;
  }) {
    super({ data, page });
    this.playlistItems = data.playlistItems;
    this.playlistResources = [];
  }

  resolve(allCollections: AllCollections) {
    super.resolve(allCollections);
    const { allResources } = allCollections;

    // then call this
    this.playlistItems.forEach((pi) => {
      const playlistResource = allResources.get(pi);
      if (playlistResource) {
        this.playlistResources.push(playlistResource);
      } else {
        throw new Error(`Playlist resource ${pi} not found in ${this.url}`);
      }
    });
  }
}
