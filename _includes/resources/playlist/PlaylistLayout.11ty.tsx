// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { Playlist, PlaylistFrontmatter } from "./PlaylistModels";
import { SidebarLayout } from "../../layouts/SidebarLayout.11ty";
import { LayoutContext, LayoutProps } from "../../../src/models";
import Sidebar from "../../sidebar/Sidebar.11ty";
import VideoPlayer from "../../video/VideoPlayer.11ty";
import SidebarPublished, {
  SidebarPublishedProps,
} from "../../sidebar/SidebarPublished.11ty";
import { Author } from "../../references/author/AuthorModels";
import SidebarPlaylists from "../../sidebar/SidebarPlaylists.11ty";
import { parse } from "node-html-parser";
import path from "upath";

export type PlaylistLayoutData = LayoutProps & PlaylistFrontmatter;

function relativize(originalUrl: string, content: string) {
  const prefix = `../../${originalUrl}`;
  const doc = parse(content);

  // @ts-ignore
  const anchors = doc.getElementsByTagName("a");
  const imgs = doc.getElementsByTagName("img");

  function rewriteAttribute(element: HTMLElement, attribute: string) {
    // @ts-ignore
    const href = element.attrs[attribute];
    // already good
    if (href.startsWith(prefix)) return;
    // absolute urls
    if (href.startsWith("http://") || href.startsWith("https://")) return;
    // relative paths
    if (href.startsWith(".") && !href.startsWith("../")) return;
    // anchor link
    if (href.startsWith("#")) return;
    // ignore VITE ASSETS
    if (href.startsWith("__VITE_ASSET__")) return;

    element.setAttribute(attribute, path.join(prefix, href));
  }

  anchors.forEach((element) => {
    // @ts-ignore
    rewriteAttribute(element, "href");
  });

  imgs.forEach((element) => {
    // @ts-ignore
    rewriteAttribute(element, "src");
  });

  return doc.toString();
}

export function PlaylistLayout(
  this: LayoutContext,
  data: PlaylistLayoutData
): JSX.Element {
  const { collections, content, page } = data;
  const playlist = collections.allResources.get(page.url) as Playlist;
  if (!playlist) {
    throw new Error(`Playlist "${page.url}" not in collection`);
  }

  const { all } = data.collections;

  // Main content
  const main = (
    <>
      <div
        className="content"
        style="margin-bottom: 3rem"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      {playlist.playlistResources.map((item: any, index: number) => {
        const thisItem = all.find((i) => i.page.url === item.url);
        const itemContent = thisItem ? relativize(thisItem.page.url, thisItem.content) : "";
        const isVisible = index == 0 ? "" : "display:none";
        return (
          <div id={item.anchor} style={isVisible} class="playlist-item">
            <h2 className="is-size-2">{item.title}</h2>
            {item.subtitle && <p className="subtitle is-4">{item.subtitle}</p>}
            {item.animatedGif && (
              <img
                src={item.animatedGif.file}
                alt="Tip Screenshot"
                width="600"
                class="animated-gif"
                style="object-fit: contain; object-position: top"
              />
            )}
            {item.screenshot && (
              <img
                src={item.screenshot}
                alt="Tip Screenshot"
                width="600"
                style="object-fit: contain; object-position: top"
              />
            )}
            {item.shortVideo && (
              <VideoPlayer
                source={item.shortVideo.url}
                poster={item.shortVideo?.poster}
              ></VideoPlayer>
            )}
            {itemContent && (
              <div
                class="content"
                style="margin-top: 3rem"
                dangerouslySetInnerHTML={{ __html: itemContent }}
              ></div>
            )}
          </div>
        );
      })}
    </>
  );

  // Sidebar
  const author = playlist.references?.author as Author;
  if (!author) {
    throw new Error(`Author "${playlist.author}" not in collection`);
  }
  const published: SidebarPublishedProps = {
    author,
    displayDate: playlist.displayDate,
  };

  const sidebar = (
    <Sidebar>
      <SidebarPublished {...published} />
      <SidebarPlaylists
        playlistResources={playlist.playlistResources}
      ></SidebarPlaylists>
    </Sidebar>
  );

  // data-meta will be processed out
  return (
    <SidebarLayout
      pageTitle={playlist.title}
      subtitle={playlist.subtitle}
      sidebar={[sidebar]}
      {...data}
    >
      <main>{main}</main>
    </SidebarLayout>
  );
}

export const render = PlaylistLayout;
