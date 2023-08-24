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
import AnimatedGif from "../../animatedgif/AnimatedGif.11ty";

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

							{tip.animatedGif && <AnimatedGif {...tip.animatedGif} />}

							{tip.screenshot && (
								<img
									src={tip.screenshot}
									alt="Tip Screenshot"
									style="object-fit: contain; object-position: top"
								/>
							)}
							{tip.video && <VideoPlayer source={tip.video} />}

							{content && (
								<div class="columns mt-2">
									<div
										class="column is-11-desktop content"
										dangerouslySetInnerHTML={{ __html: content }}
									/>
								</div>
							)}
							{tip.seealso && <SeeAlso items={tip.seealso} />}
						</main>
					</div>
				</div>
			</div>
		</div>
	);

	return <BaseLayout {...data}>{main}</BaseLayout>;
}

export const render = TipLayout;
