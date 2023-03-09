import h from "vhtml";
import { Tip, TipFrontmatter } from "./resources/tip/TipModels";
import { Author, AuthorFrontmatter } from "./references/author/AuthorModels";
import { SiteCollections } from "./models";
import {
  Technology,
  TechnologyFrontmatter,
} from "./references/technology/TechnologyModels";
import { Topic, TopicFrontmatter } from "./references/topic/TopicModels";
import {
  Product,
  ProductFrontmatter,
} from "./references/product/ProductModels";
import { referenceCollections, resourceCollections, rootPath } from "./config";
import { vi } from "vitest";
import { EleventyPage, LayoutContext } from "../src/models";
import {
  BaseItem,
  ReferenceCollection,
  ResourceCollection,
} from "../src/ResourceModels";
import { resolveAllCollections } from "../src/registration";
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

/**
 * Reusable test data``
 */
const content = `<p>Hello <em id="world">world</em>.</p>`;
const date = new Date(Date.UTC(2023, 1, 11));

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
    products: ["sp", "ap"],
    technologies: ["st", "at"],
    topics: ["st", "at"],
    thumbnail: "thumbnail.png",
  },
  {
    title: "Another Tip",
    date,
    resourceType: "tip",
    author: "aa",
    technologies: ["st", "at"],
    topics: ["st", "at"],
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
      inputPath: `${rootPath}/tips/some-tip/index.md`,
      date,
    },
  },
  {
    content,
    data: { ...tipFrontmatters[1] },
    page: {
      fileSlug: "another-tip",
      url: "/tips/another-tip/",
      inputPath: `${rootPath}/tips/another-tip/index.md`,
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

const authorsFrontmatters: AuthorFrontmatter[] = [
  {
    title: "Some Author",
    resourceType: "author",
    label: "sa",
    thumbnail: "sa.png",
  },
  {
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
      inputPath: `${rootPath}/authors/sa/index.md`,
      date,
    },
  },
  {
    content,
    data: { ...authorsFrontmatters[1] },
    page: {
      fileSlug: "aa",
      url: "/authors/aa/",
      inputPath: "./sites/webstorm-pycharm-webstorm-guide/authors/aa/index.md",
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

const technologyFrontmatters: TechnologyFrontmatter[] = [
  {
    title: "Some Technology",
    resourceType: "technology",
    label: "st",
    logo: "stlogo.svg",
  },
  {
    title: "Another Technology",
    resourceType: "technology",
    label: "at",
    logo: "atlogo.svg",
  },
];
// This is data shaped like the collection API sends it: data/page/content.
const technologyItems: {
  content: string;
  data: TechnologyFrontmatter;
  page: EleventyPage;
}[] = [
  {
    content,
    data: { ...technologyFrontmatters[0] },
    page: {
      fileSlug: "st",
      url: "/technologies/st/",
      inputPath: `${rootPath}/technologies/st/index.md`,
      date,
    },
  },
  {
    content,
    data: { ...technologyFrontmatters[1] },
    page: {
      fileSlug: "at",
      url: "/technologies/at/",
      inputPath: `${rootPath}/technologies/at/index.md`,
      date,
    },
  },
];
// This is data shaped like on our side.
const technologyDatas: {
  data: TechnologyFrontmatter;
  page: EleventyPage;
  content: string;
}[] = [
  {
    content,
    data: { ...technologyItems[0].data },
    page: technologyItems[0].page,
  },
  {
    content,
    data: { ...technologyItems[1].data },
    page: technologyItems[1].page,
  },
];

const topicFrontmatters: TopicFrontmatter[] = [
  {
    title: "Some Topic",
    resourceType: "topic",
    label: "st",
    accent: "st-accent",
    icon: "st-icon.png",
  },
  {
    title: "Another Topic",
    resourceType: "topic",
    label: "at",
    accent: "at-accent",
    icon: "at-icon.png",
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
      fileSlug: "at",
      url: "/topics/at/",
      inputPath: `${rootPath}/topics/at/index.md`,
      date,
    },
  },
  {
    content,
    data: { ...topicFrontmatters[1] },
    page: {
      fileSlug: "sp",
      url: "/products/sp/",
      inputPath: `${rootPath}/products/sp/index.md`,
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
];

const productFrontmatters: ProductFrontmatter[] = [
  {
    title: "Some Product",
    resourceType: "product",
    label: "sp",
    logo: "some.png",
  },
  {
    title: "Another Product",
    resourceType: "product",
    label: "ap",
    logo: "another.png",
  },
];

// This is data shaped like the collection API sends it: data/page/content.
const productItems: {
  content: string;
  data: ProductFrontmatter;
  page: EleventyPage;
}[] = [
  {
    content,
    data: { ...productFrontmatters[0] },
    page: {
      fileSlug: "sp",
      url: "/products/sp/",
      inputPath: `${rootPath}/products/sp/index.md`,
      date,
    },
  },
  {
    content,
    data: { ...productFrontmatters[1] },
    page: {
      fileSlug: "ap",
      url: "/topics/ap/",
      inputPath: `${rootPath}/topics/ap/index.md`,
      date,
    },
  },
];
// This is data shaped like on our side.
const productDatas: {
  data: ProductFrontmatter;
  page: EleventyPage;
  content: string;
}[] = [
  {
    content,
    data: { ...productItems[0].data },
    page: productItems[0].page,
  },
  {
    content,
    data: { ...productItems[1].data },
    page: productItems[1].page,
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
    date,
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
      inputPath: `${rootPath}/tutorials/some-tutorial/index.md`,
      date,
    },
  },
  {
    content,
    data: { ...tutorialFrontmatters[1] },
    page: {
      fileSlug: "another-tutorial",
      url: "/tutorials/another-tutorial/",
      inputPath: `${rootPath}/tutorials/another-tutorial/index.md`,
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
      inputPath: `${rootPath}/tutorials/some-tutorial/some-tutorialstep/index.md`,
      date,
    },
  },
  {
    content,
    data: { ...tutorialStepFrontmatters[1] },
    page: {
      fileSlug: "another-tutorialstep",
      url: "/tutorials/some-tutorial/another-tutorialstep/",
      inputPath: `${rootPath}/tutorials/some-tutorial/another-tutorialstep/index.md`,
      date,
    },
  },
  {
    content,
    data: { ...tutorialStepFrontmatters[2] },
    page: {
      fileSlug: "third-tutorialstep",
      url: "/tutorials/some-tutorial/third-tutorialstep/",
      inputPath: `${rootPath}/tutorials/some-tutorial/third-tutorialstep/index.md`,
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
      inputPath: `${rootPath}/playlists/some-playlist/index.md`,
      date,
    },
  },
  {
    content,
    data: { ...playlistFrontmatters[1] },
    page: {
      fileSlug: "another-playlist",
      url: "/playlists/another-playlist/",
      inputPath: `${rootPath}/playlists/another-playlist/index.md`,
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
const all: BaseItem[] = [
  ...tipItems,
  ...tutorialItems,
  ...tutorialStepItems,
  ...authorItems,
  ...productItems,
  ...technologyItems,
  ...topicItems,
  ...playlistItems,
];

const authors = await Promise.all(
  authorDatas.map(
    async (ref) => await new Author({ data: ref.data, page: ref.page }).init()
  )
);

const technologies = await Promise.all(
  technologyDatas.map(
    async (ref) =>
      await new Technology({ data: ref.data, page: ref.page }).init()
  )
);

const topics = await Promise.all(
  topicDatas.map(
    async (ref) => await new Topic({ data: ref.data, page: ref.page }).init()
  )
);

const products = await Promise.all(
  productDatas.map(
    async (ref) => await new Product({ data: ref.data, page: ref.page }).init()
  )
);

const tips = await Promise.all(
  tipDatas.map(
    async (ref) => await new Tip({ data: ref.data, page: ref.page }).init()
  )
);

const tutorials = await Promise.all(
  tutorialDatas.map(
    async (ref) => await new Tutorial({ data: ref.data, page: ref.page }).init()
  )
);

const tutorialSteps = await Promise.all(
  tutorialStepDatas.map(
    async (ref) =>
      await new TutorialStep({ data: ref.data, page: ref.page }).init()
  )
);

const playlists = await Promise.all(
  playlistDatas.map(
    async (ref) => await new Playlist({ data: ref.data, page: ref.page }).init()
  )
);

const allResources: ResourceCollection = new Map();
[...tips, ...tutorials, ...tutorialSteps, ...playlists].forEach((resource) =>
  allResources.set(resource.url, resource)
);

const allReferences: ReferenceCollection = new Map();
[...authors, ...products, ...technologies, ...topics].forEach((reference) => {
  // @ts-ignore
  const joinKey = reference.constructor.joinKey;
  const key = `${joinKey}:${reference.label}`;
  return allReferences.set(key, reference);
});

// Make duplicates as resolved collections
const clonedCollectionItems = structuredClone(all);
const resolvedCollections = await resolveAllCollections({
  allCollectionItems: clonedCollectionItems,
  resourceCollections,
  referenceCollections,
});
const collections: SiteCollections = {
  all,
  allResources,
  allReferences,
};

const addTestCase = vi.fn();
const getResources = vi.fn();
const getReferences = vi.fn();
const context: LayoutContext = {
  addTestCase,
  getResources,
  getReferences,
};

const site = {
  siteLogo: "jetbrains-simple.svg",
  siteTitle: "PyCharm Guide",
  copyright:
    'Copyright © 2000–2022 <a href="https://www.jetbrains.com/">JetBrains</a> s.r.o.',
  start: {
    items: [
      {
        accent: "success",
        cssClass: "documentation",
        href: "/webstorm/pycharm-webstorm-guide/tips/",
        label: "Tips",
        icon: "fas fa-play-circle",
      },
      {
        accent: "info",
        cssClass: "documentation",
        href: "/webstorm/pycharm-webstorm-guide/tutorials/",
        label: "Tutorials",
        icon: "fas fa-tasks",
      },
      {
        accent: "warning",
        cssClass: "documentation",
        href: "/webstorm/pycharm-webstorm-guide/playlists/",
        label: "Playlists",
        icon: "fas fa-list",
      },
      {
        accent: "danger",
        cssClass: "documentation",
        href: "/webstorm/pycharm-webstorm-guide/technologies/",
        label: "Technologies",
        icon: "fas fa-project-diagram",
      },
      {
        accent: "danger",
        cssClass: "documentation",
        href: "/webstorm/pycharm-webstorm-guide/topics/",
        label: "Topics",
        icon: "fas fa-project-diagram",
      },
    ],
  },
  end: {
    buttons: [
      {
        accent: "light",
        href: "https://www.jetbrains.com/pycharm/download/",
        label: "Get PyCharm",
      },
    ],
    links: [
      {
        color: "light",
        href: "https://github.com/jetbrains/jetbrains_guide",
        icon: "github",
      },
      {
        color: "55acee",
        href: "https://twitter.com/pycharm",
        icon: "twitter",
      },
    ],
  },
};

// Now assemble for export
const fixtures = {
  authors,
  authorItems,
  children,
  collections,
  content,
  date,
  technologies,
  technologyItems,
  tips,
  tipItems,
  topics,
  topicItems,
  products,
  productItems,
  tutorials,
  tutorialItems,
  tutorialSteps,
  tutorialStepItems,
  playlists,
  playlistItems,
  all,
  context,
  site,
  resolvedCollections: resolvedCollections,
};
export default fixtures;
