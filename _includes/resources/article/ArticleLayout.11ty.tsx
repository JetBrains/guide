import h, { JSX } from "vhtml";
import SeeAlso from "../../seealso/SeeAlso.11ty";
import { Article, ArticleFrontmatter } from "./ArticleModels";
import { Author } from "../../references/author/AuthorModels";
import VideoPlayer from "../../video/VideoPlayer.11ty";
import { LayoutContext, LayoutProps } from "../../../src/models";
import { Topic } from "../../references/topic/TopicModels";
import { BaseLayout } from "../../layouts/BaseLayout.11ty";
import ArticleTitleSubtitle from "../common/ArticleTitleSubtitle.11ty";
import ArticleAuthor from "../common/ArticleAuthor.11ty";
import ArticleTopics from "../common/ArticleTopics.11ty";

export type TipLayoutData = LayoutProps & ArticleFrontmatter;

export function ArticleLayout(
    this: LayoutContext,
    data: TipLayoutData
): JSX.Element {
  const { collections, content, page } = data;
  const article = collections.allResources.get(page.url) as Article;
  if (!article) {
    throw new Error(`Article "${page.url}" not in collection`);
  }
  // Unpack references and make it not undefined
  if (!article.references) {
    throw new Error(`Article ${article.url} has no references.`);
  }
  const author = article.references.author as Author;
  if (!author) {
    throw new Error(`Author "${article.author}" not in collection`);
  }
  const topics = article.references.topics
      ? (article.references.topics as Topic[])
      : [];

  // If there is a tip.leadin, markdown convert it
  let leadin;
  if (article.leadin) {
    leadin = this.renderMarkdown(article.leadin);
  }

  // Main content
  const main = (
      <div class="section">
        <div class="container">
          <div class="columns is-multiline">
            <div class="column">
              <main class="content">
                <ArticleTitleSubtitle title={article.title} subtitle={article.subtitle} />
                <ArticleAuthor author={author} displayDate={article.displayDate} />
                <ArticleTopics topics={topics} />

                {article.animatedGif && (
                    <img
                        src={article.animatedGif.file}
                        alt="Article Screenshot"
                        class="animated-gif"
                    />
                )}
                {article.screenshot && (
                    <img
                        src={article.screenshot}
                        alt="Article Screenshot"
                        style="object-fit: contain; object-position: top"
                    />
                )}
                {article.shortVideo && (
                    <VideoPlayer
                        source={article.shortVideo.url}
                        poster={article.shortVideo.poster}
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
                      {article.longVideo && (
                          <div class="mb-3">
                            <header id="full-video" class="is-size-3 is-bold mb-3">
                              Full Video
                            </header>
                            <VideoPlayer
                                source={article.longVideo.url}
                                poster={article.longVideo.poster}
                                start={article.longVideo.start}
                                end={article.longVideo.end}
                            />
                          </div>
                      )}
                    </>
                )}
                {article.seealso && <SeeAlso items={article.seealso} />}
              </main>
            </div>

            {(content || article.longVideo) && (
                <div class="column is-hidden-touch is-3">
                  <aside class="menu">
                    <p class="menu-label">ON THIS PAGE</p>
                    <ul class="menu-list on-this-page">
                      {content && (
                          <li>
                            <a href="#in-depth">Learn More</a>
                          </li>
                      )}
                      {article.longVideo && (
                          <li>
                            <a href="#full-video">Full Video</a>
                          </li>
                      )}
                    </ul>
                  </aside>
                </div>
            )}

            {!content && !article.longVideo && (
                <div class="column is-hidden-touch is-3"></div>
            )}
          </div>
        </div>
      </div>
  );

  return <BaseLayout {...data}>{main}</BaseLayout>;
}

export const render = ArticleLayout;
