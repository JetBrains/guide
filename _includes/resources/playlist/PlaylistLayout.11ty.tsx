import { Playlist, PlaylistFrontmatter } from "./PlaylistModels";
import { LayoutContext, LayoutProps } from "../../../src/models";
import VideoPlayer from "../../video/VideoPlayer.11ty";
import { parse, HTMLElement } from "node-html-parser";
import { BaseLayout } from "../../layouts/BaseLayout.11ty";
import ArticleTitleSubtitle from "../common/ArticleTitleSubtitle.11ty";
import ArticleAuthor from "../common/ArticleAuthor.11ty";
import ArticleTopics from "../common/ArticleTopics.11ty";
import { Author } from "../author/AuthorModels";
import AnimatedGif from "../../animatedgif/AnimatedGif.11ty";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";
import { renderToString } from "jsx-async-runtime";
import path from "upath";

export type PlaylistLayoutData = LayoutProps & PlaylistFrontmatter;

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

export async function PlaylistLayout(
	this: LayoutContext,
	data: PlaylistLayoutData,
): Promise<string> {
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
				return (
					<div id={item.anchor} style={isVisible} class="playlist-item">
						<h2 class="is-size-2">{item.title}</h2>
						{item.subtitle && <p class="subtitle is-4">{item.subtitle}</p>}
						{item.animatedGif && (
							<AnimatedGif
								{...item.animatedGif}
								width="600"
								style="object-fit: contain; object-position: top"
							/>
						)}
						{item.screenshot && (
							<img
								src={item.screenshot}
								alt="Tip Screenshot"
								width="600"
								style="object-fit: contain; object-position: top"
							/>
						)}
						{item.video && <VideoPlayer source={item.video}></VideoPlayer>}
						{item.linkURL && (
							<p class={item.video ? "mt-4" : ""}>
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
	return await renderToString(
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
		</BaseLayout>,
	);
}

export const render = PlaylistLayout;
