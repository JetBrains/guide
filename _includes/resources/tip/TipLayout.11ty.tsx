// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import SeeAlso from "../../seealso/SeeAlso.11ty";
import { Tip, TipFrontmatter } from "./TipModels";
import { SidebarLayout } from "../../layouts/SidebarLayout.11ty";
import { Author } from "../../references/author/AuthorModels";
import VideoPlayer from "../../video/VideoPlayer.11ty";
import { LayoutContext, LayoutProps } from "../../../src/models";
import TipSidebar from "../../sidebar/TipSidebar.11ty";
import { Product } from "../../references/product/ProductModels";
import { Technology } from "../../references/technology/TechnologyModels";
import { Topic } from "../../references/topic/TopicModels";

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
  const technologies = tip.references.technologies
    ? (tip.references.technologies as Technology[])
    : [];
  const topics = tip.references.topics
    ? (tip.references.topics as Topic[])
    : [];

  // If there is a tip.leadin, markdown convert it
  let leadin;
  if (tip.leadin) {
    leadin = this.renderMarkdown(tip.leadin);
  }

  const sidebar = (
    <TipSidebar
      displayDate={tip.displayDate}
      author={author}
      products={tip.references.products as Product[]}
      technologies={technologies}
      topics={topics}
      hasBody={tip.hasBody}
      seealsos={tip.seealso}
      longVideo={tip.longVideo}
    />
  );

  // Main content
  const main = (
    <div className="mb-6">
      <div className="columns">
        <div className="column is-half">
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
        </div>
        <div className="column is-half content">
          {leadin && <div dangerouslySetInnerHTML={{ __html: leadin }} class="mb-4" />}
          <div>
            {content && (
              <a
                href="#in-depth"
                className="button is-info"
                style="width: auto;"
              >
                Learn More
              </a>
            )}
            {tip.longVideo && (
              <a
                href="#full-video"
                className="button is-light"
                style="width: auto; margin-left: 0.5em;"
              >
                Full Video
              </a>
            )}
          </div>
        </div>
      </div>
      {content && (
        <>
          <header id="in-depth" className="is-size-3 is-bold mb-3">
            In Depth
          </header>
          <div className="columns">
            <div
              className="column is-11-desktop content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          {tip.longVideo && (
            <div className="mb-3">
              <header id="full-video" className="is-size-3 is-bold mb-3">
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
    </div>
  );

  return (
    <SidebarLayout
      pageTitle={tip.title}
      subtitle={tip.subtitle}
      sidebar={[sidebar]}
      {...data}
    >
      <main>{main}</main>
    </SidebarLayout>
  );
}

export const render = TipLayout;
