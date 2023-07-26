import h, { JSX } from "vhtml";
import { Playlist, PlaylistFrontmatter } from "./PlaylistModels";
import { LayoutContext, LayoutProps } from "../../../src/models";
import VideoPlayer from "../../video/VideoPlayer.11ty";
import { parse } from "node-html-parser";
import path from "upath";
import { BaseLayout } from "../../layouts/BaseLayout.11ty";
import ArticleTitleSubtitle from "../common/ArticleTitleSubtitle.11ty";
import ArticleAuthor from "../common/ArticleAuthor.11ty";
import ArticleTopics from "../common/ArticleTopics.11ty";
import { Author } from "../../references/author/AuthorModels";

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
    // no value
    if (!href) return;
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

  // Top nav
  let topNav = <nav className="navbar navbar-secondary">
    <div className="container">
      <div className="navbar-brand">
        <div className="navbar-item is-size-5 has-text-weight-semibold pl-0">
          <a href={`${playlist.url}`} aria-label="Parent Tutorial" className="is-hidden-touch">{playlist.title}</a>
          <a href={`${playlist.url}`} aria-label="Parent Tutorial" className="is-hidden-desktop ml-5">{playlist.title}</a>
        </div>
      </div>
    </div>
  </nav>;

  // Main content
  const author = playlist.references?.author as Author;
  if (!author) {
    throw new Error(`Author "${playlist.author}" not in collection`);
  }
  const main = (
    <>
      <ArticleTitleSubtitle
        title={playlist.title}
        subtitle={playlist.subtitle}
      />
      <ArticleAuthor
        author={author}
        displayDate={playlist.displayDate}
      />
      {playlist.references?.topics &&
        <ArticleTopics topics={playlist.references?.topics} />}
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
  const sidebarSteps = (
    <div className="column is-3 is-full-touch">
      <aside className="menu">
        <p className="menu-label">Tutorial</p>
        <ul className="menu-list playlist-toggles">
          {playlist.playlistResources.map((step) => (
            <li>
              <a
                aria-label="Playlist Item"
                href={`#${step.anchor}`}
              >
                {step.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );

  /*
      <SidebarLayout
      pageTitle={playlist.title}
      subtitle={playlist.subtitle}
      sidebar={[sidebar]}
      {...data}
    >
      <main>{main}</main>
    </SidebarLayout>
   */
  // data-meta will be processed out
  return (
  <BaseLayout subtitle={playlist.subtitle} {...data}>
    {topNav}
    <div class="section">
      <div class="container">
        <div class="columns is-multiline">
          {sidebarSteps}
          <div class="column is-9">
            <main class="content">
              {main}
            </main>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
  );
}

export const render = PlaylistLayout;
