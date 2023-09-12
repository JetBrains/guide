import { expect, test } from "vitest";
import { Playlist, PlaylistFrontmatter } from "./PlaylistModels";
import { EleventyPage } from "../../../src/models";
import fixtures from "../../fixtures";

const data: PlaylistFrontmatter = {
	title: "Some Playlist",
	date: fixtures.date,
	resourceType: "playlist",
	author: "sa",
	topics: ["st", "at"],
	thumbnail: "thumbnail.png",
	playlistItems: [],
};
const page: EleventyPage = {
	fileSlug: "some-playlist",
	url: "/playlists/some-playlist/",
	inputPath: `/playlists/some-playlist/index.md`,
	date: fixtures.date,
};

test("construct a playlist", () => {
	const playlist = new Playlist({ data, page });
	expect(playlist.title).to.equal("Some Playlist");
});

test("resolves the resources in a playlist", () => {
	const playlistItem0 = fixtures.playlistItems[0];
	const tipItem0 = fixtures.tipItems[0];
	const playlist = fixtures.resourceMap.get(playlistItem0.page.url) as Playlist;
	expect(playlist.references?.author).to.exist;
	expect(playlist.playlistResources[0]).to.exist;
	expect(playlist.playlistResources[0].title).to.equal(tipItem0.data.title);
});
