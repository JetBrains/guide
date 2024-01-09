import { LayoutContext, LayoutProps } from "../../../src/models";
import { TutorialStep, TutorialStepFrontmatter } from "./TutorialStepModels";
import VideoPlayer from "../../video/VideoPlayer.11ty";
import { Tutorial } from "./TutorialModels";
import { BottomNav } from "./TopBottomNav.11ty";
import { BaseLayout } from "../../layouts/BaseLayout.11ty";
import ArticleTitleSubtitle from "../common/ArticleTitleSubtitle.11ty";
import ArticleAuthor from "../common/ArticleAuthor.11ty";
import ArticleTopics from "../common/ArticleTopics.11ty";

export type TutorialStepLayoutData = LayoutProps & TutorialStepFrontmatter;

export function TutorialStepLayout(
	this: LayoutContext,
	data: TutorialStepLayoutData
): JSX.Element {
	const { collections, content, page } = data;
	const tutorialStep = collections.resourceMap.get(page.url) as TutorialStep;
	const parent = tutorialStep.parentTutorial as Tutorial;
	const references = tutorialStep.references;

	// video
	const video = tutorialStep.video && (
		<VideoPlayer source={tutorialStep.video} />
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
							<li>
								<a
									class={step == tutorialStep ? "is-active" : ""}
									href={step.url}
								>
									{step.title}
								</a>
							</li>
						))}
					</ul>
				</aside>
			</div>
		);
	}

	// Main content
	const videoBottom = tutorialStep.videoBottom;
	const main = (
		<>
			<ArticleTitleSubtitle
				title={tutorialStep.title}
				subtitle={tutorialStep.subtitle}
			/>
			<ArticleAuthor
				author={references!.author}
				displayDate={tutorialStep.displayDate}
			/>
			<ArticleTopics topics={references!.topics} />

			{video && !videoBottom && <div class="mb-4">{video}</div>}
			{content ? (
				<div dangerouslySetInnerHTML={{ __html: content }}></div>
			) : null}
			{video && videoBottom && <div class="mb-4">{video}</div>}
		</>
	);

	// Breadcrumbs
	let breadcrumbs = "";
	if (parent) {
		breadcrumbs = (
			<nav class="breadcrumb" aria-label="breadcrumbs">
				<ul>
					<li>
						<a href={parent.url}>{parent.title}</a>
					</li>
					<li class="is-active">
						<a href={tutorialStep.url}>{tutorialStep.title}</a>
					</li>
				</ul>
			</nav>
		);
	}

	// Bottom nav
	let bottomNav = "";
	if (parent) {
		bottomNav = (
			<BottomNav parent={parent} currentStep={tutorialStep}></BottomNav>
		);
	}

	return (
		<BaseLayout subtitle={tutorialStep.subtitle} {...data}>
			<div class="section">
				<div class="container">
					<div class="columns is-multiline">
						{sidebarSteps}
						<div class="column is-9">
							{breadcrumbs}
							<main class="content">
								{main}
								<hr />
								{bottomNav}
							</main>
						</div>
					</div>
				</div>
			</div>
		</BaseLayout>
	);
}

export const render = TutorialStepLayout;
