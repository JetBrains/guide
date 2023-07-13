import h, { JSX } from "vhtml";
import SeeAlso from "../../seealso/SeeAlso.11ty";
import { Tip, TipFrontmatter } from "./TipModels";
import { Author } from "../../references/author/AuthorModels";
import VideoPlayer from "../../video/VideoPlayer.11ty";
import { LayoutContext, LayoutProps } from "../../../src/models";
import { Topic } from "../../references/topic/TopicModels";
import { BaseLayout } from "../../layouts/BaseLayout.11ty";
import ArticleTitleSubtitle from "../common/ArticleTitleSubtitle.11ty";
import ArticleAuthor from "../common/ArticleAuthor.11ty";
import ArticleTopics from "../common/ArticleTopics.11ty";

export type TipLayoutData = LayoutProps & TipFrontmatter;

export function TipLayout(
  this: LayoutContext,
  data: TipLayoutData
): JSX.Element {
  const { collections, content, page } = data;
  const tip = collections.allResources.get(page.url) as Tip;
  if (!tip) {
    throw new Error(`Tip "${page.url}" not in collection`);
  }
  // Unpack references and make it not undefined
  if (!tip.references) {
    throw new Error(`Tip ${tip.url} has no references.`);
  }
  const author = tip.references.author as Author;
  if (!author) {
    throw new Error(`Author "${tip.author}" not in collection`);
  }
  const topics = tip.references.topics
    ? (tip.references.topics as Topic[])
    : [];

  // If there is a tip.leadin, markdown convert it
  let leadin;
  if (tip.leadin) {
    leadin = this.renderMarkdown(tip.leadin);
  }

  // Main content
  const main = (
    <div class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column">
            <main class="content">
              <ArticleTitleSubtitle title={tip.title} subtitle={tip.subtitle} />
              <ArticleAuthor author={author} displayDate={tip.displayDate} />
              <ArticleTopics topics={topics} />

              {tip.animatedGif && (
                <img
                  src={tip.animatedGif.file}
                  alt="Tip Screenshot"
                  class="animated-gif"
                />
              )}
              {tip.screenshot && (
                <img
                  src={tip.screenshot}
                  alt="Tip Screenshot"
                  style="object-fit: contain; object-position: top"
                />
              )}
              {tip.shortVideo && (
                <VideoPlayer
                  source={tip.shortVideo.url}
                  poster={tip.shortVideo.poster}
                />
              )}

              {leadin && <div dangerouslySetInnerHTML={{ __html: leadin }} />}

              {content && (
                <>
                  <header id="in-depth" class="is-size-3 is-bold mb-3">
                    In Depth
                  </header>
                  <div class="columns">
                    <div
                      class="column is-11-desktop content"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                  {tip.longVideo && (
                    <div class="mb-3">
                      <header id="full-video" class="is-size-3 is-bold mb-3">
                        Full Video
                      </header>
                      <VideoPlayer
                        source={tip.longVideo.url}
                        poster={tip.longVideo.poster}
                        start={tip.longVideo.start}
                        end={tip.longVideo.end}
                      />
                    </div>
                  )}
                </>
              )}
              {tip.seealso && <SeeAlso items={tip.seealso} />}
            </main>
          </div>

          {(content || tip.longVideo) && (
            <div class="column is-hidden-touch is-3">
              <aside class="menu">
                <p class="menu-label">ON THIS PAGE</p>
                <ul class="menu-list on-this-page">
                  {content && (
                    <li>
                      <a href="#in-depth">Learn More</a>
                    </li>
                  )}
                  {tip.longVideo && (
                    <li>
                      <a href="#full-video">Full Video</a>
                    </li>
                  )}
                </ul>
              </aside>
            </div>
          )}

          {!content && !tip.longVideo && (
            <div class="column is-hidden-touch is-3"></div>
          )}
        </div>
      </div>
    </div>
  );

  return <BaseLayout {...data}>{main}</BaseLayout>;
}

export const render = TipLayout;
