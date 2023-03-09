// noinspection ES6UnusedImports
import h, { JSX } from "vhtml";
import { SidebarLayout } from "../../layouts/SidebarLayout.11ty";
import { Author } from "../../references/author/AuthorModels";
import SidebarPublished from "../../sidebar/SidebarPublished.11ty";
import Sidebar from "../../sidebar/Sidebar.11ty";
import { LayoutContext, LayoutProps } from "../../../src/models";
import { References } from "../../../src/ReferenceModels";
import { TutorialStep, TutorialStepFrontmatter } from "./TutorialStepModels";
import VideoPlayer from "../../video/VideoPlayer.11ty";
import { Tutorial } from "./TutorialModels";
import SidebarStep from "../../sidebar/SidebarStep.11ty";
import { BottomNav, TopNav } from "./TopBottomNav.11ty";

export type TutorialStepLayoutData = LayoutProps & TutorialStepFrontmatter;

export function TutorialStepLayout(
  this: LayoutContext,
  data: TutorialStepLayoutData
): JSX.Element {
  const { collections, content, page } = data;
  const tutorialStep = collections.allResources.get(page.url) as TutorialStep;
  const parent = tutorialStep.parentTutorial as Tutorial;

  // Sidebars
  const references = tutorialStep.references as References;

  const longVideo = tutorialStep.longVideo && (
    <VideoPlayer
      source={tutorialStep.longVideo.url}
      poster={tutorialStep.longVideo.poster}
    />
  );

  // #### Sidebar
  const sidebarPublished = (
    <SidebarPublished
      displayDate={tutorialStep.displayDate}
      author={references.author as Author}
    ></SidebarPublished>
  );
  let sidebarSteps;
  if (parent) {
    // Sometimes a tutorialstep might be "in-progress" and not
    // yet linked into the tutorial
    sidebarSteps = parent.tutorialSteps && (
      <div
        className="bio-page-sidebar-references-group"
        style="margin-top: 1rem"
      >
        <p className="menu-label bio-page-sidebar-published">Tutorial Steps</p>
        <ul className="steps has-content-centered is-vertical is-small">
          {parent.tutorialSteps.map((step, index) => (
            <SidebarStep
              label={step.title}
              target={step.url}
              marker={index + 1}
              isActive={step == tutorialStep}
            />
          ))}
        </ul>
      </div>
    );
  } else {
    sidebarSteps = "";
  }
  const sidebar = (
    <Sidebar>
      {sidebarPublished}
      {sidebarSteps}
    </Sidebar>
  );

  // Main
  const videoBottom = tutorialStep.videoBottom;
  const main = (
    <>
      {longVideo && !videoBottom && (
        <div style="margin-bottom: 2rem">{longVideo}</div>
      )}
      {content ? (
        <div className="columns">
          <div
            className="column is-11-desktop content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>
      ) : null}
      {longVideo && videoBottom && (
        <div style="margin-bottom: 2rem">{longVideo}</div>
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
    <SidebarLayout
      pageTitle={tutorialStep.title}
      subtitle={tutorialStep.subtitle}
      sidebar={[sidebar]}
      topNav={[topNav]}
      bottomNav={[bottomNav]}
      {...data}
    >
      <main>{main}</main>
    </SidebarLayout>
  );
}

export const render = TutorialStepLayout;
