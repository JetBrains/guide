/**
 * Utilities for loading site content and cleaning
 */
import path, { normalize } from "upath";
import * as fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export const guideSites = [
  "dotnet",
  "goland",
  "intellij",
  "pycharm",
  "webstorm",
];

export function getRoot(): string {
  return normalize(`${__dirname}/../site`);
}

export function getAllFiles(dirPath: string, arrayOfFiles: string[]) {
  const files = fs.readdirSync(dirPath);
  const excludeDirs = ["demos", "_site"];

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      if (!excludeDirs.includes(file)) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      }
    } else {
      if (file.endsWith(".md")) {
        arrayOfFiles.push(join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

export type MarkdownFrontmatter = {
  label?: string;
  products?: string[];
  resourceType?: string;
  technologies?: string[];
  title?: string;
  topics?: string[];
  topicType?: string;
};

export type MarkdownResources = {
  [key: string]: {
    frontmatter: MarkdownFrontmatter;
    content: string;
  };
};

export function parseFrontmatter(filePaths: string[]): MarkdownResources {
  const results: MarkdownResources = {};
  filePaths.forEach((markdownFilename: string) => {
    const tipMatter = matter.read(markdownFilename);
    const frontmatter = tipMatter.data;
    const content = tipMatter.content;
    results[markdownFilename] = {
      frontmatter,
      content,
    };
  });
  return results;
}

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

export function cleanAllResources(resources: MarkdownResources): {
  [key: string]: string;
} {
  /* For all Markdown resources, clean them up and return string for disk  */
  const results: {
    [key: string]: string;
  } = {};
  Object.entries(resources).forEach(([filePath, markdown]) => {
    let fm: MarkdownFrontmatter;

    // Run each cleanup on this file
    fm = cleanCategories(markdown.frontmatter);
    fm = writeTopicType(filePath, fm);

    // Now make a string to later write to disk
    const cleanString1 = matter.stringify(markdown.content, fm);
    // js-yaml converts simple dates to date-times. It would be
    // better to https://github.com/jonschlinkert/gray-matter/issues/62
    // For now, just remove T00:00:00.000Z
    results[filePath] = cleanString1.replace("T00:00:00.000Z", "");
  });
  return results;
}

export function writeCleanResources(): void {
  /* Crawl the tree and write files for all cleaned up resources */
  const root = getRoot();
  const resourceFiles = getAllFiles(root, []);
  const markdownResources = parseFrontmatter(resourceFiles);
  const cleanedResources = cleanAllResources(markdownResources);

  Object.entries(cleanedResources).forEach(([filePath, markdown]) => {
    fs.writeFileSync(filePath, markdown, { flag: "w+" });
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
