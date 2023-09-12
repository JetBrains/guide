import h, { JSX } from "vhtml";
import { Tutorial, TutorialFrontmatter } from "./TutorialModels";
import { LayoutContext, LayoutProps } from "../../../src/models";
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
	const tutorial = collections.resourceMap.get(page.url) as Tutorial;
	const references = tutorial.references;

	// Sidebars
	let sidebarSteps = tutorial.tutorialSteps && (
		<div class="column is-3 is-full-touch">
			<aside class="menu">
				<p class="menu-label">Tutorial</p>
				<ul class="menu-list">
					{tutorial.tutorialSteps.map((step) => (
						<li>
							<a aria-label="Tutorial Step" href={step.url}>
								{step.title}
							</a>
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

	const firstTutorialStep =
		tutorial.tutorialSteps.length > 0 ? tutorial.tutorialSteps[0] : undefined;

	// Breadcrumbs
	let breadcrumbs = (
		<nav class="breadcrumb" aria-label="breadcrumbs">
			<ul>
				<li class="is-active">
					<a href={tutorial.url}>{tutorial.title}</a>
				</li>
			</ul>
		</nav>
	);

	const main = (
		<>
			<ArticleTitleSubtitle
				title={tutorial.title}
				subtitle={tutorial.subtitle}
			/>
			<ArticleAuthor
				author={references!.author}
				displayDate={tutorial.displayDate}
			/>
			<ArticleTopics topics={references!.topics} />

			{content ? (
				<div class="mb-4" dangerouslySetInnerHTML={{ __html: content }}></div>
			) : null}
			{firstTutorialStep ? (
				<div class="mb-5">
					<a
						className="button is-rounded is-primary"
						href={firstTutorialStep.url}
					>
						Start learning &raquo;
					</a>
				</div>
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
							{breadcrumbs}
							<main class="content">{main}</main>
						</div>
					</div>
				</div>
			</div>
		</BaseLayout>
	);
}

export const render = TutorialLayout;
