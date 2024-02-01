import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { LayoutContext, LayoutProps } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";
import { ResourceFrontmatter } from "../../../src/ResourceModels";
import { Playlist } from "./PlaylistModels";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";

export type PlaylistsLayoutProps = LayoutProps & ResourceFrontmatter;

export function PlaylistsLayout(
	this: LayoutContext,
	data: PlaylistsLayoutProps
): JSX.Element {
	const { content, pagination } = data;
	const paginationItems = pagination ? pagination.items : [];
	const playlists: Playlist[] = paginationItems.map((p: any) => {
		return this.getResource(p.url) as Playlist;
	});
	const listing = (
		<Fragment>
			{playlists.map((playlist) => {
				return <ResourceCard resource={playlist}></ResourceCard>;
			})}
		</Fragment>
	);
	return <ReferenceLayout {...data} content={content} listing={listing} />;
}

export const render = PlaylistsLayout;
