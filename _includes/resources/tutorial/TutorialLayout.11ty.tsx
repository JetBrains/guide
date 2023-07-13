import h, { JSX } from "vhtml";
import { Tutorial, TutorialFrontmatter } from "./TutorialModels";
import { LayoutContext, LayoutProps } from "../../../src/models";
import { References } from "../../../src/ReferenceModels";
import ResourceCard, {
  ResourceCardOrientation,
} from "../../resourcecard/ResourceCard.11ty";
import { BaseLayout } from "../../layouts/BaseLayout.11ty";
import ArticleTitleSubtitle from "../common/ArticleTitleSubtitle.11ty";
import ArticleAuthor from "../common/ArticleAuthor.11ty";
import ArticleTopics from "../common/ArticleTopics.11ty";

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
            <li>
              <a href={step.url}>{step.title}</a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );

  // Main content
  const listing = (
    <>
      {tutorial.tutorialSteps.map((resource) => (
        <ResourceCard
          resource={resource}
          orientation={ResourceCardOrientation.Landscape}
        />
      ))}
    </>
  );

  const main = (
    <>
      <ArticleTitleSubtitle
        title={tutorial.title}
        subtitle={tutorial.subtitle}
      />
      <ArticleAuthor
        author={references.author}
        displayDate={tutorial.displayDate}
      />
      <ArticleTopics topics={references.topics} />

      {content ? (
        <div class="mb-4" dangerouslySetInnerHTML={{ __html: content }}></div>
      ) : null}
      {listing && (
        <div
          class="columns is-multiline"
          dangerouslySetInnerHTML={{ __html: listing }}
        />
      )}
    </>
  );
  return (
    <BaseLayout {...data}>
      <div class="section">
        <div class="container">
          <div class="columns is-multiline">
            {sidebarSteps}
            <div class="column">
              <main class="content">{main}</main>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export const render = TutorialLayout;
