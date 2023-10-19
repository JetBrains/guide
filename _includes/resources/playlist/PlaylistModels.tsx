import { Static, Type } from "@sinclair/typebox";
import {
	getThumbnailPath,
	Resource,
	ResourceFrontmatter,
	ResourceMap,
} from "../../../src/ResourceModels";
import { EleventyPage } from "../../../src/models";
import { ThumbnailField } from "../commonModels";
import { PLAYLIST_RESOURCE_TYPE } from "../../../src/resourceType";
import h from "vhtml";

export const PlaylistFrontmatter = Type.Intersect([
	ResourceFrontmatter,
	ThumbnailField,
	Type.Object({
		playlistItems: Type.Array(Type.String()),
	}),
]);
export type PlaylistFrontmatter = Static<typeof PlaylistFrontmatter>;

export class Playlist
	extends Resource<PLAYLIST_RESOURCE_TYPE>
	implements PlaylistFrontmatter
{
	playlistItems: string[];
	playlistResources: Resource[];
	thumbnail: PlaylistFrontmatter["thumbnail"];
	static frontmatterSchema: any = PlaylistFrontmatter;

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
		this.thumbnail = getThumbnailPath(data.thumbnail, page.url);
	}

	resolve(allResources: ResourceMap) {
		super.resolve(allResources);

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

	getThumbnail(): string {
		return (
			<img
				data-template-src="thumbnail"
				data-template-alt="title"
				src={this.thumbnail}
				alt={this.title}
			/>
		);
	}
}
