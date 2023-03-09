import h, { JSX } from "vhtml";
import { ReferenceLayout } from "../../layouts/ReferenceLayout.11y";
import { LayoutContext, LayoutProps } from "../../../src/models";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";
import { BaseFrontmatter } from "../../../src/ResourceModels";

export type PlaylistsLayoutProps = LayoutProps & BaseFrontmatter;

export function PlaylistsLayout(
  this: LayoutContext,
  data: PlaylistsLayoutProps
): JSX.Element {
  const { content } = data;
  const playlists = this.getResources("playlist");
  const figure = undefined;
  const listing = (
    <>
      {playlists.map((playlist) => {
        return <ResourceCard resource={playlist}></ResourceCard>;
      })}
    </>
  );
  return (
    <ReferenceLayout
      {...data}
      content={content}
      figure={figure}
      listing={[listing]}
    />
  );
}

export const render = PlaylistsLayout;
