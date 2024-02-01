import fs from "fs";
import { join, normalize } from "path";
import matter from "gray-matter";

export const guideSites = [
	"dotnet",
	"goland",
	"intellij",
	"pycharm",
	"webstorm",
] as const;

export type VideoRef = {
	poster: string;
	url: string;
	start?: number;
	end?: number;
};

export type MarkdownFrontmatter = {
	thumbnail?: string;
	cardThumbnail?: string;
	label?: string;
	products?: string[];
	resourceType?: string;
	technologies?: string[];
	title?: string;
	topics?: string[];
	topicType?: string;
	shortVideo?: VideoRef;
	longVideo?: VideoRef;
	video?: string | { url: string; start: number; end: number };
	obsoletes?: string[];
	/**
	 * @deprecated this is from old guides, and just listed here for intellisense
	 */
	leadin?: string;
	/**
	 * @deprecated this is from old guides, and just listed here for intellisense
	 */
	hasBody?: boolean;
};

export type MarkdownResources = {
	[key: string]: {
		frontmatter: MarkdownFrontmatter;
		content: string;
		isChanged: boolean;
	};
};

export type Markdown = {
	path: string;
	frontmatter: MarkdownFrontmatter;
	content: string;
	isChanged: boolean;
	onWrite?: () => void;
};

export function getRoot(): string {
	return normalize(`${__dirname}/../site`);
}

export function getAllFiles(
	dirPath: string,
	arrayOfFiles: string[],
	fileExtension = [".md"]
) {
	const files = fs.readdirSync(dirPath);
	const excludeDirs = ["demos", "_site"];

	arrayOfFiles = arrayOfFiles || [];

	files.forEach(function (file) {
		if (fs.statSync(dirPath + "/" + file).isDirectory()) {
			if (!excludeDirs.includes(file)) {
				arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
			}
		} else {
			if (fileExtension.find((extension) => file.endsWith(extension))) {
				arrayOfFiles.push(join(dirPath, "/", file));
			}
		}
	});

	return arrayOfFiles;
}

export function parseFrontmatter(filePaths: string[]): MarkdownResources {
	const results: MarkdownResources = {};
	filePaths.forEach((markdownFilename: string) => {
		const tipMatter = matter.read(markdownFilename);
		const frontmatter = tipMatter.data;
		const content = tipMatter.content;
		results[markdownFilename] = {
			frontmatter,
			content,
			isChanged: false,
		};
	});
	return results;
}

export const getMarkdownFiles = (
	dir = getRoot(),
	files: string[] = []
): Markdown[] => {
	return getAllFiles(dir, files).map((markdownFilename) => {
		const tipMatter = matter.read(markdownFilename);
		const frontmatter = tipMatter.data;
		const content = tipMatter.content;
		return { path: markdownFilename, content, frontmatter, isChanged: false };
	});
};
