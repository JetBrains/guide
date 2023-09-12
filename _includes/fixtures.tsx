import h from "vhtml";
import { Tip, TipFrontmatter } from "./resources/tip/TipModels";
import { Author, AuthorFrontmatter } from "./resources/author/AuthorModels";
import { Topic, TopicFrontmatter } from "./resources/topic/TopicModels";
import { vi } from "vitest";
import { EleventyPage, LayoutContext } from "../src/models";
import { ResourceItem } from "../src/ResourceModels";
import {
	Tutorial,
	TutorialFrontmatter,
} from "./resources/tutorial/TutorialModels";
import {
	TutorialStep,
	TutorialStepFrontmatter,
} from "./resources/tutorial/TutorialStepModels";
import {
	Playlist,
	PlaylistFrontmatter,
} from "./resources/playlist/PlaylistModels";
import { PaginationProps } from "./pagination/Pagination.11ty";
import { Article, ArticleFrontmatter } from "./resources/article/ArticleModels";
import { Channel, ChannelFrontmatter } from "./resources/channel/ChannelModels";
import {
	makeResourceMap,
	makeResources,
	resolveResourceMap,
} from "../src/registration";
import { resourceClasses, rootPath } from "./config";
import { Link, LinkFrontmatter } from "./resources/link/LinkModels";

/**
 * Reusable test data
 */
const content = `<p>Hello <em id="world">world</em>.</p>`;
const date = new Date(Date.UTC(2023, 1, 11));
const laterDate = new Date(Date.UTC(2023, 1, 22));

const children: string[] = [
	h("", {
		dangerouslySetInnerHTML: { __html: content },
	}),
];

const tipFrontmatters: TipFrontmatter[] = [
	{
		title: "Some Tip",
		date,
		resourceType: "tip",
		author: "sa",
		topics: ["sto", "ato", "sp", "ap", "ste", "ate"],
		thumbnail: "thumbnail.png",
		obsoletes: ["/oldtips/tip1/", "/oldtips/tip2/"],
		channel: "/channels/some-channel/",
	},
	{
		title: "Another Tip",
		date: laterDate,
		resourceType: "tip",
		author: "aa",
		tags: ["tag1", "tag2"],
		topics: ["sto", "ato", "ste", "ate"],
		thumbnail: "aa.png",
	},
];
// This is data shaped like the collection API sends it: data/page/content.
const tipItems: {
	content: string;
	data: TipFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...tipFrontmatters[0] },
		page: {
			fileSlug: "some-tip",
			url: "/tips/some-tip/",
			inputPath: `/tips/some-tip/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...tipFrontmatters[1] },
		page: {
			fileSlug: "another-tip",
			url: "/tips/another-tip/",
			inputPath: `/tips/another-tip/index.md`,
			date,
		},
	},
];
// This is data shaped like on our side.
const tipDatas: {
	data: TipFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: { ...tipItems[0].data },
		page: tipItems[0].page,
	},
	{
		content,
		data: { ...tipItems[1].data },
		page: tipItems[1].page,
	},
];

const tips = tipDatas.map(
	(ref) =>
		new Tip({
			data: ref.data,
			page: ref.page,
		})
);

const linkFrontmatters: LinkFrontmatter[] = [
	{
		title: "Some Link",
		date,
		resourceType: "link",
		author: "sa",
		topics: ["sto", "ato", "sp", "ap", "ste", "ate"],
		thumbnail: "thumbnail.png",
		linkURL: "http://some.jetbrains.link",
	},
	{
		title: "Another Link",
		date: laterDate,
		resourceType: "link",
		author: "aa",
		topics: ["sto", "ato", "ste", "ate"],
		thumbnail: "aa.png",
		linkURL: "http://another.jetbrains.link",
	},
];
const linkItems: {
	content: string;
	data: LinkFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...linkFrontmatters[0] },
		page: {
			fileSlug: "some-link",
			url: "/links/some-link/",
			inputPath: `${rootPath}/links/some-link/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...linkFrontmatters[1] },
		page: {
			fileSlug: "another-link",
			url: "/links/another-link/",
			inputPath: `${rootPath}/links/another-link/index.md`,
			date,
		},
	},
];
const linkDatas: {
	data: LinkFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: { ...linkItems[0].data },
		page: linkItems[0].page,
	},
	{
		content,
		data: { ...linkItems[1].data },
		page: linkItems[1].page,
	},
];

const links = await Promise.all(
	linkDatas.map(
		async (ref) =>
			await new Link({
				data: ref.data,
				page: ref.page,
			})
	)
);

const channelFrontmatters: ChannelFrontmatter[] = [
	{
		title: "Some Channel",
		date,
		resourceType: "channel",
		author: "sa",
		thumbnail: "thumbnail.png",
		subnav: [{ title: "First Link", url: "/first/" }],
	},
	{
		title: "Another Channel",
		date: laterDate,
		resourceType: "channel",
		author: "aa",
		thumbnail: "aa.png",
	},
];
const channelItems: {
	content: string;
	data: ChannelFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...channelFrontmatters[0] },
		page: {
			fileSlug: "some-channel",
			url: "/channels/some-channel/",
			inputPath: `/channels/some-channel/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...channelFrontmatters[1] },
		page: {
			fileSlug: "another-channel",
			url: "/channels/another-channel/",
			inputPath: `/channels/another-channel/index.md`,
			date,
		},
	},
];
const channelDatas: {
	data: ChannelFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: { ...channelItems[0].data },
		page: channelItems[0].page,
	},
	{
		content,
		data: { ...channelItems[1].data },
		page: channelItems[1].page,
	},
];
const channels = channelDatas.map(
	(ref) =>
		new Channel({
			data: ref.data,
			page: ref.page,
		})
);

const articleItems: {
	content: string;
	data: ArticleFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...tipFrontmatters[0] },
		page: {
			fileSlug: "some-article",
			url: "/articles/some-article/",
			inputPath: `/articles/some-article/index.md`,
			date,
		},
	},
];

const articleDatas: {
	data: TipFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: { ...articleItems[0].data },
		page: articleItems[0].page,
	},
];

const authorsFrontmatters: AuthorFrontmatter[] = [
	{
		date: date,
		author: "sa",
		title: "Some Author",
		resourceType: "author",
		label: "sa",
		thumbnail: "sa.png",
	},
	{
		date: date,
		author: "sa",
		title: "Another Author",
		resourceType: "author",
		label: "aa",
		thumbnail: "aa.png",
	},
];
// This is data shaped like the collection API sends it: data/page/content.
const authorItems: {
	content: string;
	data: AuthorFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...authorsFrontmatters[0] },
		page: {
			fileSlug: "sa",
			url: "/authors/sa/",
			inputPath: `/authors/sa/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...authorsFrontmatters[1] },
		page: {
			fileSlug: "aa",
			url: "/authors/aa/",
			inputPath: "./site/webstorm-pycharm-webstorm-guide/authors/aa/index.md",
			date,
		},
	},
];
// This is data shaped like on our side.
const authorDatas: {
	data: AuthorFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: { ...authorItems[0].data },
		page: authorItems[0].page,
	},
	{
		content,
		data: { ...authorItems[1].data },
		page: authorItems[1].page,
	},
];

const topicFrontmatters: TopicFrontmatter[] = [
	{
		date: date,
		author: "sa",
		title: "Some Topic",
		resourceType: "topic",
		label: "sto",
		accent: "st-accent",
		icon: "st-icon.png",
	},
	{
		date: date,
		author: "sa",
		title: "Another Topic",
		resourceType: "topic",
		label: "ato",
		accent: "at-accent",
		icon: "at-icon.png",
	},
	{
		date: date,
		author: "sa",
		title: "Some Technology",
		resourceType: "topic",
		label: "ste",
		logo: "stlogo.svg",
	},
	{
		date: date,
		author: "sa",
		title: "Another Technology",
		resourceType: "topic",
		label: "ate",
		logo: "atlogo.svg",
	},
	{
		date: date,
		author: "sa",
		title: "Some Product",
		resourceType: "topic",
		label: "sp",
		logo: "some.png",
	},
	{
		date: date,
		author: "sa",
		title: "Another Product",
		resourceType: "topic",
		label: "ap",
		logo: "another.png",
	},
];
// This is data shaped like the collection API sends it: data/page/content.
const topicItems: {
	content: string;
	data: TopicFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...topicFrontmatters[0] },
		page: {
			fileSlug: "ato",
			url: "/topics/ato/",
			inputPath: `/topics/ato/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...topicFrontmatters[1] },
		page: {
			fileSlug: "sto",
			url: "/topics/sto/",
			inputPath: `/products/sto/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...topicFrontmatters[2] },
		page: {
			fileSlug: "ste",
			url: "/topics/ste/",
			inputPath: `/topics/ste/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...topicFrontmatters[3] },
		page: {
			fileSlug: "ate",
			url: "/topics/ate/",
			inputPath: `/topics/ate/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...topicFrontmatters[4] },
		page: {
			fileSlug: "sp",
			url: "/topics/sp/",
			inputPath: `/topics/sp/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...topicFrontmatters[5] },
		page: {
			fileSlug: "ap",
			url: "/topics/ap/",
			inputPath: `/topics/ap/index.md`,
			date,
		},
	},
];
// This is data shaped like on our side.
const topicDatas: {
	data: TopicFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: { ...topicItems[0].data },
		page: topicItems[0].page,
	},
	{
		content,
		data: { ...topicItems[1].data },
		page: topicItems[1].page,
	},
	{
		content,
		data: { ...topicItems[2].data },
		page: topicItems[2].page,
	},
	{
		content,
		data: { ...topicItems[3].data },
		page: topicItems[3].page,
	},
	{
		content,
		data: { ...topicItems[4].data },
		page: topicItems[4].page,
	},
	{
		content,
		data: { ...topicItems[5].data },
		page: topicItems[5].page,
	},
];

export const tutorialFrontmatters: TutorialFrontmatter[] = [
	{
		title: "Some Tutorial",
		resourceType: "tutorial",
		author: "sa",
		date,
		thumbnail: "thumbnail.png",
		tutorialItems: [
			"./some-tutorialstep",
			"./another-tutorialstep",
			"./third-tutorialstep",
		],
	},
	{
		title: "Another Tutorial",
		resourceType: "tutorial",
		author: "sa",
		date: laterDate,
		thumbnail: "thumbnail.png",
		tutorialItems: [],
	},
];

export const tutorialItems: {
	content: string;
	data: TutorialFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...tutorialFrontmatters[0] },
		page: {
			fileSlug: "some-tutorial",
			url: "/tutorials/some-tutorial/",
			inputPath: `/tutorials/some-tutorial/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...tutorialFrontmatters[1] },
		page: {
			fileSlug: "another-tutorial",
			url: "/tutorials/another-tutorial/",
			inputPath: `/tutorials/another-tutorial/index.md`,
			date,
		},
	},
];

export const tutorialDatas: {
	data: TutorialFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: { ...tutorialItems[0].data },
		page: tutorialItems[0].page,
	},
	{
		content,
		data: { ...tutorialItems[1].data },
		page: tutorialItems[1].page,
	},
];

export const tutorialStepFrontmatters: TutorialStepFrontmatter[] = [
	{
		title: "Some Tutorial Step",
		resourceType: "tutorialstep",
		author: "sa",
		date,
		thumbnail: "thumbnail.png",
	},
	{
		title: "Another Tutorial Step",
		resourceType: "tutorialstep",
		author: "sa",
		thumbnail: "thumbnail.png",
		date,
	},
	{
		title: "Third Tutorial Step",
		resourceType: "tutorialstep",
		author: "sa",
		date,
		thumbnail: "thumbnail.png",
	},
];

export const tutorialStepItems: {
	content: string;
	data: TutorialStepFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...tutorialStepFrontmatters[0] },
		page: {
			fileSlug: "some-tutorialstep",
			url: "/tutorials/some-tutorial/some-tutorialstep/",
			inputPath: `/tutorials/some-tutorial/some-tutorialstep/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...tutorialStepFrontmatters[1] },
		page: {
			fileSlug: "another-tutorialstep",
			url: "/tutorials/some-tutorial/another-tutorialstep/",
			inputPath: `/tutorials/some-tutorial/another-tutorialstep/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...tutorialStepFrontmatters[2] },
		page: {
			fileSlug: "third-tutorialstep",
			url: "/tutorials/some-tutorial/third-tutorialstep/",
			inputPath: `/tutorials/some-tutorial/third-tutorialstep/index.md`,
			date,
		},
	},
];
export const tutorialStepDatas: {
	data: TutorialStepFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: {
			...tutorialStepItems[0].data,
		},
		page: tutorialStepItems[0].page,
	},
	{
		content,
		data: {
			...tutorialStepItems[1].data,
		},
		page: tutorialStepItems[1].page,
	},
	{
		content,
		data: {
			...tutorialStepItems[2].data,
		},
		page: tutorialStepItems[2].page,
	},
];

export const playlistFrontmatters: PlaylistFrontmatter[] = [
	{
		title: "Some Playlist",
		resourceType: "playlist",
		author: "sa",
		date,
		thumbnail: "thumbnail.png",
		playlistItems: ["/tips/some-tip/"],
	},
	{
		title: "Another Playlist",
		resourceType: "playlist",
		author: "sa",
		thumbnail: "thumbnail.png",
		date,
		playlistItems: [],
	},
];

export const playlistItems: {
	content: string;
	data: PlaylistFrontmatter;
	page: EleventyPage;
}[] = [
	{
		content,
		data: { ...playlistFrontmatters[0] },
		page: {
			fileSlug: "some-playlist",
			url: "/playlists/some-playlist/",
			inputPath: `/playlists/some-playlist/index.md`,
			date,
		},
	},
	{
		content,
		data: { ...playlistFrontmatters[1] },
		page: {
			fileSlug: "another-playlist",
			url: "/playlists/another-playlist/",
			inputPath: `/playlists/another-playlist/index.md`,
			date,
		},
	},
];

export const playlistDatas: {
	data: PlaylistFrontmatter;
	page: EleventyPage;
	content: string;
}[] = [
	{
		content,
		data: { ...playlistItems[0].data },
		page: playlistItems[0].page,
	},
	{
		content,
		data: { ...playlistItems[1].data },
		page: playlistItems[1].page,
	},
];

// This data structure matches collections.all
// https://www.11ty.dev/docs/collections/#collection-item-data-structure
const all: ResourceItem[] = [
	...tipItems,
	...tutorialItems,
	...tutorialStepItems,
	...authorItems,
	...topicItems,
	...playlistItems,
	...articleItems,
	...channelItems,
	...linkItems,
];

const authors = authorDatas.map(
	(ref) =>
		new Author({
			data: ref.data,
			page: ref.page,
		})
);

const topics = topicDatas.map(
	(ref) =>
		new Topic({
			data: ref.data,
			page: ref.page,
		})
);

const articles = articleDatas.map(
	(ref) =>
		new Article({
			data: ref.data,
			page: ref.page,
		})
);

const tutorials = tutorialDatas.map(
	(ref) =>
		new Tutorial({
			data: ref.data,
			page: ref.page,
		})
);

const tutorialSteps = tutorialStepDatas.map(
	(ref) =>
		new TutorialStep({
			data: ref.data,
			page: ref.page,
		})
);

const playlists = playlistDatas.map(
	(ref) =>
		new Playlist({
			data: ref.data,
			page: ref.page,
		})
);

const allResources: ResourceCollection = new Map();
[
	...tips,
	...tutorials,
	...tutorialSteps,
	...playlists,
	...channels,
	...links,
].forEach((resource) => allResources.set(resource.url, resource));

const resources = makeResources({
	collectionItems: all,
	resourceClasses,
});
const resourceMap = makeResourceMap(resources);
resolveResourceMap(resourceMap);

const getResource = vi.fn();
const renderMarkdown = (content: string): string => content;
const context: LayoutContext = {
	getResources: () => resources,
	getResource,
	renderMarkdown,
};

export const commandLineArgs = { pathprefix: undefined };

export const baseRenderData = {
	author: "sa",
	date,
	collections: {
		all,
		resourceMap,
	},
	commandLineArgs,
	content: "",
};

const paginationItems = [...tipItems, ...articleItems] as const;

const paginationProps: PaginationProps = {
	pagination: {
		items: [...paginationItems],
		pageNumber: 0,
		hrefs: paginationItems.map((ti) => ti.page.url),
		href: {
			next: "tip5",
			previous: "tip3",
			first: "tip0",
			last: "tip6",
		},
	},
};
// Now assemble for export
const fixtures = {
	articles,
	authors,
	authorItems,
	children,
	// collections,
	content,
	date,
	paginationProps,
	channels,
	channelItems,
	tips,
	tipItems,
	links,
	linkItems,
	topics,
	topicItems,
	tutorials,
	tutorialItems,
	tutorialSteps,
	tutorialStepItems,
	playlists,
	playlistItems,
	all,
	context,
	resources,
	resourceMap,
};
export default fixtures;
