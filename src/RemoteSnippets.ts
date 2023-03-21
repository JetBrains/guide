import path from "upath";
// @ts-ignore
import EleventyFetch from "@11ty/eleventy-fetch";
import fs from "fs/promises";

type CommentInformation = {
  start: string,
  remove: string[],
  keyword: string
}

let commentStylePicker = new Map<string, CommentInformation>([
  [".cs", { start: "//", keyword: "snippet", remove: ["//"] }],
  [".py", { start: "#", keyword: "snippet", remove: ["#"] }],
  [".js", { start: "//", keyword: "snippet", remove: ["//"] }],
  [".java", { start: "//", keyword: "snippet", remove: ["//"] }],
  [".cshtml", { start: "@*", keyword: "snippet", remove: ["@*", "*@"] }],
  [".html", { start: "<!--", keyword: "snippet", remove: ["<!--", "-->"] }]
]);

export async function remoteUrlParse(remoteUrl: string, key: string): Promise<string> {
  const text = await EleventyFetch(remoteUrl, { duration: "1d", type: "text" });
  return getSnippetByKey(text, key, path.extname(remoteUrl));
}

export async function localFileParse(filePath: string, key: string): Promise<string> {
  const text = await fs.readFile(filePath, "utf-8");
  const extension = path.extname(filePath);

  return getSnippetByKey(text, key, extension);
}

export function getSnippetByKey(text: string, key: string, extension: string): string {
  const map = getAllSnippets(text, extension);
  return map.get(key) ?? "";
}

export function getAllSnippets(text: string, extension: string): Map<string, string> {
  const comment = commentStylePicker.get(extension);

  if (!comment) {
    throw new Error(`unknown file extension of "${extension}"`);
  }

  const lines = text.split("\n");

  const map = new Map<string, string>();
  let name: any = null;
  let codeBlock = "";
  let indent = 0;

  for (const index in lines) {
    const currentLine = lines[index];
    const check = currentLine.toLowerCase().trim();

    if (check.startsWith(`${comment.start} ${comment.keyword}:`)) {
      // get current casing of snippet name
      name = currentLine.replace(`${comment.keyword}:`, "");
      comment.remove.forEach(v => name = name.replace(v, ""));
      name = name.trim();

      if (name.length > 0) {
        // new block
        codeBlock = "";
        // difference between currentLine length and trim
        indent = currentLine.length - currentLine.trimStart().length;
      }

      continue;
    }

    if (check.startsWith(`${comment.start} end ${comment.keyword}`)) {
      if (name) {
        map.set(name, codeBlock);
      }
      codeBlock = "";
      name = null;
      indent = 0;
      continue;
    }

    // Only build code block when a name exists
    if (name) {
      const clean = `${currentLine.substring(indent)}\n`;
      codeBlock += clean;
    }
  }
  return map;
}

