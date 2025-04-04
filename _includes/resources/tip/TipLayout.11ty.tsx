import SeeAlso from "../../seealso/SeeAlso.11ty";
import { Tip, TipFrontmatter } from "./TipModels";
import { Author } from "../author/AuthorModels";
import VideoPlayer from "../../video/VideoPlayer.11ty";
import { LayoutContext, LayoutProps } from "../../../src/models";
import { Topic } from "../topic/TopicModels";
import { BaseLayout } from "../../layouts/BaseLayout.11ty";
import ArticleTitleSubtitle from "../common/ArticleTitleSubtitle.11ty";
import ArticleAuthor from "../common/ArticleAuthor.11ty";
import ArticleTopics from "../common/ArticleTopics.11ty";
import AnimatedGif from "../../animatedgif/AnimatedGif.11ty";
import RelatedResources from "../../relatedresources/RelatedResources.11ty";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";
import { UserComments } from "../../userComments.11ty";
import EditArticle from "../common/EditArticle.11ty";

export type TipLayoutData = LayoutProps & TipFrontmatter;

export function TipLayout(
	this: LayoutContext,
	data: TipLayoutData,
): JSX.Element {
	const { collections, content, page } = data;
	const tip = collections.resourceMap.get(page.url) as Tip;
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

	// For "related resources", get an array
	const allResources = this.getResources({
		resourceTypes: ["tip", "tutorial", "tutorialstep", "link", "article"],
	});

	// Main content
	const main = (
		<Fragment>
			<div class="section">
				<div class="container">
					<div class="columns is-multiline">
						<div class="column">
							<main class="content">
								<ArticleTitleSubtitle
									title={tip.title}
									subtitle={tip.subtitle}
								/>
								<ArticleAuthor author={author} displayDate={tip.displayDate} />
								<EditArticle path={page.inputPath} />
								<ArticleTopics topics={topics} />

								{tip.animatedGif && <AnimatedGif {...tip.animatedGif} />}

								{tip.screenshot && (
									<img
										src={tip.screenshot}
										alt="Tip Screenshot"
										style="object-fit: contain; object-position: top"
									/>
								)}
								{tip.video && tip.videoVertical ? (
									<div class="columns">
										<div class="column is-one-third">
											<VideoPlayer source={tip.video} vertical={true} />
										</div>
										<div class="column is-two-thirds">
											{content && <div class="content">{content}</div>}
										</div>
									</div>
								) : (
									<Fragment>
										{tip.video && <VideoPlayer source={tip.video} />}
										{content && (
											<div class="columns mt-2">
												<div class="column is-11-desktop content">
													{content}
												</div>
											</div>
										)}
									</Fragment>
								)}
								{tip.seealso && <SeeAlso items={tip.seealso} />}
							</main>
							<UserComments theme={"light"} pageUrl={page.url} />
						</div>
					</div>
				</div>
			</div>
			<RelatedResources currentResource={tip} items={allResources} />
		</Fragment>
	);

	return <BaseLayout {...data}>{main}</BaseLayout>;
}

export const render = TipLayout;
