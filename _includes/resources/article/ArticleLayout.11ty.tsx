import SeeAlso from "../../seealso/SeeAlso.11ty";
import { Article, ArticleFrontmatter } from "./ArticleModels";
import { Author } from "../author/AuthorModels";
import VideoPlayer from "../../video/VideoPlayer.11ty";
import { LayoutContext, LayoutProps } from "../../../src/models";
import { Topic } from "../topic/TopicModels";
import { BaseLayout } from "../../layouts/BaseLayout.11ty";
import ArticleTitleSubtitle from "../common/ArticleTitleSubtitle.11ty";
import ArticleAuthor from "../common/ArticleAuthor.11ty";
import ArticleTopics from "../common/ArticleTopics.11ty";
import AnimatedGif from "../../animatedgif/AnimatedGif.11ty";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";
import EditArticle from "../common/EditArticle.11ty";

export type ArticleLayoutData = LayoutProps & ArticleFrontmatter;

export function ArticleLayout(
	this: LayoutContext,
	data: ArticleLayoutData,
): JSX.Element {
	const { collections, content, page } = data;
	const article = collections.resourceMap.get(page.url) as Article;
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

	// Main content
	const main = (
		<div class="section">
			<div class="container">
				<div class="columns is-multiline">
					<div class="column">
						<main class="content">
							<ArticleTitleSubtitle
								title={article.title}
								subtitle={article.subtitle}
							/>
							<ArticleAuthor
								author={author}
								displayDate={article.displayDate}
							/>
							<EditArticle path={page.inputPath} />
							<ArticleTopics topics={topics} />

							{article.animatedGif && <AnimatedGif {...article.animatedGif} />}
							{article.screenshot && (
								<img
									src={article.screenshot}
									alt="Article Screenshot"
									style="object-fit: contain; object-position: top"
								/>
							)}
							{article.video && <VideoPlayer source={article.video} />}

							{content && (
								<Fragment>
									<div class="columns">
										<div class="column is-11-desktop content">{content}</div>
									</div>
								</Fragment>
							)}
							{article.seealso && <SeeAlso items={article.seealso} />}
						</main>
					</div>
				</div>
			</div>
		</div>
	);

	return <BaseLayout {...data}>{main}</BaseLayout>;
}

export const render = ArticleLayout;
