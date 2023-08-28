/**
 * Utilities for loading site content and cleaning
 */
import path, { normalize } from "upath";
import * as fs from "fs";
import matter from "gray-matter";
import {
	getAllFiles,
	getMarkdownFiles,
	getRoot,
	guideSites,
	Markdown,
	MarkdownFrontmatter,
	MarkdownResources,
	parseFrontmatter,
} from "./file.utils";

export function cleanCategories(fm: MarkdownFrontmatter): MarkdownFrontmatter {
	let topics: string[] = fm.topics ? fm.topics : [];
	if (fm.technologies) {
		topics = [...fm.technologies, ...topics];
		delete fm.technologies;
	}

	if (fm.products) {
		topics = [...fm.products, ...topics];
		delete fm.products;
	}

	// Now assign to topics, if it contains anything
	if (topics.length) {
		topics.sort();
		fm.topics = topics;
	}
	return fm;
}

export function writeTopicType(
	filePath: string,
	fm: MarkdownFrontmatter
): MarkdownFrontmatter {
	if (filePath.includes("/products/")) {
		fm.topicType = "product";
	} else if (filePath.includes("/technologies/")) {
		fm.topicType = "technology";
	}
	return fm;
}

export function cleanAllResources(
	resources: MarkdownResources
): Record<string, string> {
	/* For all Markdown resources, clean them up and return string for disk  */
	const results: Record<string, string> = {};
	Object.entries(resources).forEach((markdownRecord) => {
		results[markdownRecord[0]] = cleanResource(markdownRecord);
	});
	return results;
}

export const cleanResource = (
	document: Markdown | [string, MarkdownResources[string]]
) => {
	const [filePath, markdown] = Array.isArray(document)
		? document
		: [
				document.path,
				{ frontmatter: document.frontmatter, content: document.content },
		  ];
	let fm: MarkdownFrontmatter;
	fm = cleanCategories(markdown.frontmatter);
	fm = writeTopicType(filePath, fm);

	// Now make a string to later write to disk
	let cleanString1;
	cleanString1 = matter.stringify(markdown.content, fm);
	// js-yaml converts simple dates to date-times. It would be
	// better to https://github.com/jonschlinkert/gray-matter/issues/62
	// For now, just remove T00:00:00.000Z
	return cleanString1.replace("T00:00:00.000Z", "");
};

export const migrateFrontMatter = () => {
	const allMarkdownFiles = getMarkdownFiles();

	const markdowns = pipe(
		migrateLeadInAttribute,
		removeHasBodyAttribute,
		migrateVideoFrontmatter
	)(allMarkdownFiles);

	writeMarkdownDocuments(markdowns);
};

export const writeMarkdownDocuments = (documents: Markdown[]) => {
	documents
		.filter((x) => x.isChanged)
		.forEach((document) => {
			const cleanedFileContent = cleanResource(document);
			document.onWrite?.();
			fs.writeFileSync(document.path, cleanedFileContent, { flag: "w+" });
		});
};

export const removeHasBodyAttribute = (documents: Markdown[]): Markdown[] => {
	return documents.map((document) => {
		if (typeof document.frontmatter.hasBody === "undefined") {
			return document;
		}
		delete document.frontmatter.hasBody;
		return { ...document, isChanged: true };
	});
};

export const migrateVideoFrontmatter = (documents: Markdown[]): Markdown[] => {
	return documents.map((document) => {
		if (!document.frontmatter.shortVideo && !document.frontmatter.longVideo) {
			return document;
		}
		const oldDocument = structuredClone(document);
		const videoRef =
			document.frontmatter.longVideo ?? document.frontmatter.shortVideo;
		const hasStart = !!videoRef?.start;
		const video =
			hasStart && videoRef
				? { url: videoRef.url, start: videoRef.start!, end: videoRef.end! }
				: videoRef?.url;
		delete document.frontmatter.shortVideo;
		delete document.frontmatter.longVideo;
		return {
			...document,
			isChanged: true,
			frontmatter: { ...document.frontmatter, video },
			onWrite: () => {
				const { longVideo, shortVideo } = oldDocument.frontmatter;
				[longVideo, shortVideo].forEach((video) => {
					if (
						video &&
						![
							oldDocument.frontmatter.thumbnail,
							oldDocument.frontmatter.cardThumbnail,
						].includes(video.poster)
					) {
						const resolvedPath = path.normalize(
							`${path.dirname(oldDocument.path)}/${video.poster}`
						);
						if (fs.existsSync(resolvedPath)) {
							fs.unlinkSync(resolvedPath);
						}
					}
				});
			},
		};
	});
};

export function migrateLeadInAttribute(documents: Markdown[]): Markdown[] {
	return documents.map((document) => {
		if (!document.frontmatter.leadin) {
			return document;
		}
		const hasContent = document.content && document.content !== "\n";
		const oldLeadin = document.frontmatter.leadin;
		delete document.frontmatter.leadin;
		return {
			...document,
			content: !hasContent ? oldLeadin : document.content,
			isChanged: true,
		};
	});
}

export function writeCleanResources(): void {
	/* Crawl the tree and write files for all cleaned up resources */
	const root = getRoot();
	const resourceFiles = getAllFiles(root, []);
	const markdownResources = parseFrontmatter(resourceFiles);
	const cleanedResources = cleanAllResources(markdownResources);

	Object.entries(cleanedResources).forEach(([filePath, markdown]) => {
		const pattern = /\n+$/; // Matches one or more newline characters at the end of the string
		const replacement = "\n"; // Replace with a single newline character

		const m = markdown.replace(pattern, replacement);
		fs.writeFileSync(filePath, m, { flag: "w+" });
	});
}

type TopicTypes = {
	[key: string]: string[];
};
export type AllTopicTypes = {
	[key: string]: TopicTypes;
};

export function dumpTopics(): AllTopicTypes {
	/* Utility function to get a content migration spreadsheet of topics */
	const allTopicTypes: AllTopicTypes = {};
	guideSites.forEach((site) => {
		allTopicTypes[site] = {
			product: [],
			technology: [],
			topic: [],
		};
		const topics = normalize(`${__dirname}/../sites/${site}/topics`);
		const resourceFiles = getAllFiles(topics, []);
		const markdownResources = parseFrontmatter(resourceFiles);
		Object.entries(markdownResources).forEach(([filePath, markdown]) => {
			const label = filePath.split(path.sep)[10];
			if (label !== "index.md") {
				const topicType = markdown.frontmatter.topicType;
				const key = topicType ? topicType : "topic";
				allTopicTypes[site][key].push(label);
			}
		});
	});
	return allTopicTypes;
}

export function dumpAuthors(): AllTopicTypes {
	/* Utility function to get a content migration spreadsheet of authors */
	const allAuthorTypes: AllTopicTypes = {};
	guideSites.forEach((site) => {
		allAuthorTypes[site] = {
			author: [],
		};
		const authors = normalize(`${__dirname}/../sites/${site}/authors`);
		const resourceFiles = getAllFiles(authors, []);
		const markdownResources = parseFrontmatter(resourceFiles);
		Object.keys(markdownResources).forEach((filePath) => {
			const label = filePath.split(path.sep)[10];
			if (label !== "index.md") {
				allAuthorTypes[site]["author"].push(label);
			}
		});
	});
	return allAuthorTypes;
}

type MarkdownTransducer = (markdowns: Markdown[]) => Markdown[];
export const pipe = (...fns: MarkdownTransducer[]) => {
	return (markdowns: Markdown[]) =>
		fns.reduce((prev, fn) => fn(prev), markdowns);
};
