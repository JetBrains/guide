// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { LayoutContext, LayoutProps } from "../../../src/models";
import { TutorialStep, TutorialStepFrontmatter } from "./TutorialStepModels";
import VideoPlayer from "../../video/VideoPlayer.11ty";
import { Tutorial } from "./TutorialModels";
import { BottomNav, TopNav } from "./TopBottomNav.11ty";
import { BaseLayout } from "../../layouts/BaseLayout.11ty";
import { Topic } from "../../references/topic/TopicModels";
import { References } from "../../../src/ReferenceModels";

export type TutorialStepLayoutData = LayoutProps & TutorialStepFrontmatter;

export function TutorialStepLayout(
  this: LayoutContext,
  data: TutorialStepLayoutData
): JSX.Element {
  const { collections, content, page } = data;
  const tutorialStep = collections.allResources.get(page.url) as TutorialStep;
  const parent = tutorialStep.parentTutorial as Tutorial;
  const references = tutorialStep.references as References;

  // Long video
  const longVideo = tutorialStep.longVideo && (
    <VideoPlayer
      source={tutorialStep.longVideo.url}
      poster={tutorialStep.longVideo.poster}
      start={tutorialStep.longVideo.start}
      end={tutorialStep.longVideo.end}
    />
  );

  // Sidebars
  let sidebarSteps = "";
  if (parent) {
    // Sometimes a tutorialstep might be "in-progress" and not
    // yet linked into the tutorial
    sidebarSteps = parent.tutorialSteps && (
      <div class="column is-3 is-full-touch">
        <aside class="menu">
          <p class="menu-label">Tutorial</p>
          <ul class="menu-list">
            {parent.tutorialSteps.map((step) => (
              <li><a class={step == tutorialStep ? 'is-active' : ''} href={step.url}>{step.title}</a></li>
            ))}
          </ul>
        </aside>
      </div>
    );
  }

  // Main
  const videoBottom = tutorialStep.videoBottom;
  const main = (
    <>
      <h2 class="title is-size-1">{tutorialStep.title}</h2>
      {tutorialStep.subtitle && (<h3 class="subtitle is-size-4 pt-1 has-text-grey">{tutorialStep.subtitle}</h3>)}

      <article class="media author mb-4">
        <div class="p-2 is-32x32 media-left">
          <a href={references.author.url}>
            <figure class="image is-32x32 m-0">
              <img src={references.author.thumbnail} alt={references.author.title} loading="lazy" class="avatar" />
            </figure>
          </a>
        </div>
        <div class="media-content">
          <div class="content">
            <p class="m-0">
              <a href={references.author.url}>{references.author.title}</a>
            </p>
            <time class="m-0 has-text-grey-dark" datetime={tutorialStep.displayDate}>{tutorialStep.displayDate}</time>
          </div>
        </div>
      </article>
      <article class="tags mb-4">
        <div class="content p-2 m-0">
          {references.topics.map((topic: Topic) => (
            <a class="tag is-info is-light" href={topic.url}>{topic.label}</a>
          ))}
        </div>
      </article>

      {longVideo && !videoBottom && (
        <div class="mb-4">{longVideo}</div>
      )}
      {content ? (<div dangerouslySetInnerHTML={{ __html: content }}></div>) : null}
      {longVideo && videoBottom && (
        <div class="mb-4">{longVideo}</div>
      )}
    </>
  );

  // Top/Bottom nav
  let topNav, bottomNav;
  if (parent) {
    topNav = <TopNav parent={parent} currentStep={tutorialStep}></TopNav>;
    bottomNav = (
      <BottomNav parent={parent} currentStep={tutorialStep}></BottomNav>
    );
  } else {
    topNav = bottomNav = "";
  }

  return (
    <BaseLayout
      title={tutorialStep.title}
      subtitle={tutorialStep.subtitle}
      {...data}
    >
      <div class="section">
        <div class="columns is-multiline">
          {sidebarSteps}
          <div class="column">
            <main class="content">
              {topNav}
              {main}
              {bottomNav}
            </main>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export const render = TutorialStepLayout;
