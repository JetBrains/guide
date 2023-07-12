// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { Tutorial, TutorialFrontmatter } from "./TutorialModels";
import { SidebarLayout } from "../../layouts/SidebarLayout.11ty";
import { Author } from "../../references/author/AuthorModels";
import SidebarPublished from "../../sidebar/SidebarPublished.11ty";
import Sidebar from "../../sidebar/Sidebar.11ty";
import { LayoutContext, LayoutProps } from "../../../src/models";
import { References } from "../../../src/ReferenceModels";
import ResourceCard from "../../resourcecard/ResourceCard.11ty";
import { BaseLayout } from "../../layouts/BaseLayout.11ty";
import { Topic } from "../../references/topic/TopicModels";

export type TutorialLayoutData = LayoutProps & TutorialFrontmatter;
export function TutorialLayout(
  this: LayoutContext,
  data: TutorialLayoutData
): JSX.Element {
  const { collections, page, content } = data;
  const tutorial = collections.allResources.get(page.url) as Tutorial;
  const references = tutorial.references as References;

  // Sidebars
  let sidebarSteps = tutorial.tutorialSteps && (
    <div class="column is-3 is-full-touch">
      <aside class="menu">
        <p class="menu-label">Tutorial</p>
        <ul class="menu-list">
          {tutorial.tutorialSteps.map((step) => (
            <li><a href={step.url}>{step.title}</a></li>
          ))}
        </ul>
      </aside>
    </div>
  );

  // Main content
  const listing = (
    <>
      {tutorial.tutorialSteps.map((resource) => (
        <ResourceCard resource={resource} />
      ))}
    </>
  );

  const main = (
    <>
      <h2 class="title is-size-1">{tutorial.title}</h2>
      {tutorial.subtitle && (<h3 class="subtitle is-size-4 pt-1 has-text-grey">{tutorial.subtitle}</h3>)}

      <article className="media author mb-4">
        <div className="p-2 is-32x32 media-left">
          <a href={references.author.url}>
            <figure className="image is-32x32 m-0">
              <img src={references.author.thumbnail} alt={references.author.title} loading="lazy" className="avatar" />
            </figure>
          </a>
        </div>
        <div className="media-content">
          <div className="content">
            <p className="m-0">
              <a href={references.author.url}>{references.author.title}</a>
            </p>
            <time className="m-0 has-text-grey-dark" datetime={tutorial.displayDate}>{tutorial.displayDate}</time>
          </div>
        </div>
      </article>
      <article className="tags mb-4">
        <div className="content p-2 m-0">
          {references.topics.map((topic: Topic) => (
            <a className="tag is-info is-light" href={topic.url}>{topic.label}</a>
          ))}
        </div>
      </article>

      {content ? (<div class="mb-4" dangerouslySetInnerHTML={{ __html: content }}></div>) : null}
      {listing && <div className="columns is-multiline"
                       dangerouslySetInnerHTML={{ __html: listing }} />}
    </>
  );
  return (
    <BaseLayout
      title={tutorial.title}
      subtitle={tutorial.subtitle}
      {...data}
    >
      <div class="section">
        <div class="columns is-multiline">
          {sidebarSteps}
          <div class="column">
            <main class="content">
              {main}
            </main>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export const render = TutorialLayout;
