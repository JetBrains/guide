import { Playlist, PlaylistFrontmatter } from "./PlaylistModels";
import { LayoutContext, LayoutProps } from "../../../src/models";
import VideoPlayer from "../../video/VideoPlayer.11ty";
import { HTMLElement, parse } from "node-html-parser";
import { BaseLayout } from "../../layouts/BaseLayout.11ty";
import ArticleTitleSubtitle from "../common/ArticleTitleSubtitle.11ty";
import ArticleAuthor from "../common/ArticleAuthor.11ty";
import ArticleTopics from "../common/ArticleTopics.11ty";
import { Author } from "../author/AuthorModels";
import AnimatedGif from "../../animatedgif/AnimatedGif.11ty";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";
import path from "upath";
import EditArticle from "../common/EditArticle.11ty";

export type PlaylistLayoutData = LayoutProps & PlaylistFrontmatter;

function relativizeContentUrl(originalUrl: string, contentUrl: string) {
	if (!originalUrl) return originalUrl;
	// noinspection SuspiciousTypeOfGuard Guess what, we have videos that are an object, not a string
	if (typeof originalUrl !== "string") return originalUrl;

	// rewrite relative URL
	if (originalUrl.startsWith(".") && !originalUrl.startsWith("../")) {
		return contentUrl + originalUrl;
	}

	return originalUrl;
}

function relativize(originalUrl: string, content: string) {
	const prefix = originalUrl; //`../../${originalUrl}`;
	const doc = parse(content);

	const anchors = doc.getElementsByTagName("a");
	const imgs = doc.getElementsByTagName("img");

	function rewriteAttribute(element: HTMLElement, attribute: string) {
		const href = element.attrs[attribute];
		// no value
		if (!href) return;
		// already good
		if (href.startsWith(prefix)) return;
		// data URI
		if (href.startsWith("data:")) return;
		// absolute urls
		if (href.startsWith("http://") || href.startsWith("https://")) return;
		// relative paths
		if (href.startsWith(".") && !href.startsWith("../")) return;
		// root link
		if (href.startsWith("/")) return;
		//anchor link
		if (href.startsWith("#")) return;
		// ignore VITE ASSETS
		if (href.startsWith("__VITE_ASSET__")) return;

		if (prefix && href) {
			element.setAttribute(attribute, path.join(prefix, href));
		}
	}

	anchors.forEach((element) => {
		rewriteAttribute(element, "href");
	});

	imgs.forEach((element) => {
		rewriteAttribute(element, "src");
	});

	return doc.toString();
}

export function PlaylistLayout(
	this: LayoutContext,
	data: PlaylistLayoutData,
): JSX.Element {
	const { collections, content, page } = data;
	const playlist = collections.resourceMap.get(page.url) as Playlist;
	if (!playlist) {
		throw new Error(`Playlist "${page.url}" not in collection`);
	}

	const { all } = data.collections;

	// Main content
	const author = playlist.references?.author as Author;
	if (!author) {
		throw new Error(`Author "${playlist.author}" not in collection`);
	}

	const main = (
		<Fragment>
			<ArticleTitleSubtitle
				title={playlist.title}
				subtitle={playlist.subtitle}
			/>
			<EditArticle path={page.inputPath} />
			<ArticleAuthor author={author} displayDate={playlist.displayDate} />
			{playlist.references?.topics && (
				<ArticleTopics topics={playlist.references?.topics} />
			)}
			<div class="content" style="margin-bottom: 3rem">
				{content}
			</div>
			{playlist.playlistResources.map((item: any, index: number) => {
				const thisItem = all.find((i) => i.page.url === item.url);
				const itemContent = thisItem
					? relativize(thisItem.page.url, thisItem.content)
					: "";
				const isVisible = index == 0 ? "" : "display:none";

				// rewrite relative URLs
				const animatedGif = item.animatedGif;
				if (animatedGif) {
					animatedGif.file = relativizeContentUrl(animatedGif.file, item.url);
				}
				let screenshot = item.screenshot;
				if (screenshot) {
					screenshot = relativizeContentUrl(screenshot, item.url);
				}
				let video = item.video;
				if (video) {
					video = relativizeContentUrl(video, item.url);
				}

				return (
					<div id={item.anchor} style={isVisible} class="playlist-item">
						<h2 class="is-size-2">{item.title}</h2>
						{item.subtitle && <p class="subtitle is-4">{item.subtitle}</p>}
						{animatedGif && (
							<AnimatedGif
								{...animatedGif}
								width="600"
								style="object-fit: contain; object-position: top"
							/>
						)}
						{screenshot && (
							<img
								src={screenshot}
								alt="Tip Screenshot"
								width="600"
								style="object-fit: contain; object-position: top"
							/>
						)}
						{video && <VideoPlayer source={video}></VideoPlayer>}
						{item.linkURL && (
							<p class={video ? "mt-4" : ""}>
								<a href={item.linkURL} class="link-external">
									View at original site
								</a>
							</p>
						)}
						{itemContent && <div class="content mt-4">{itemContent}</div>}
					</div>
				);
			})}
		</Fragment>
	);

	// Sidebar
	const sidebarSteps = (
		<div class="column is-3 is-full-touch">
			<aside class="menu">
				<p class="menu-label">Playlist</p>
				<ul class="menu-list playlist-toggles">
					{playlist.playlistResources.map((step) => (
						<li>
							<a aria-label="Playlist Item" href={`#${step.anchor}`}>
								{step.title}
							</a>
						</li>
					))}
				</ul>
			</aside>
		</div>
	);

	// data-meta will be processed out
	return (
		<BaseLayout subtitle={playlist.subtitle} {...data}>
			<div class="section">
				<div class="container">
					<div class="columns is-multiline">
						{sidebarSteps}
						<div class="column is-9">
							<main class="content">{main}</main>
						</div>
					</div>
				</div>
			</div>
		</BaseLayout>
	);
}

export const render = PlaylistLayout;
