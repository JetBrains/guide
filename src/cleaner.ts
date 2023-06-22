/**
 * Utilities for loading site content and cleaning
 */
import { normalize } from "upath";
import * as fs from "fs";
import { join } from "path";
import matter from "gray-matter";

export function getRoot(): string {
  return normalize(`${__dirname}/../sites`);
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
  products?: string[];
  technologies?: string[];
  title?: string;
  topics?: string[];
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

export function cleanCategories(fm: MarkdownFrontmatter) {
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
