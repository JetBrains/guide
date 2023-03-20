import path from "upath";
// @ts-ignore
import EleventyFetch from "@11ty/eleventy-fetch"

let commentStylePicker = new Map<string, string>([
  [".cs", "//"],
  [".py", "#"]
]);

export async function parse(remoteUrl: string, key: string) : Promise<string> {
  const comment = commentStylePicker.get(path.extname(remoteUrl));
  const text = await EleventyFetch(remoteUrl, { duration: "1d", type: "text"});
  const lines = text.split("\n");

  const map = new Map<string, string>();
  let name = null;
  let codeBlock = '';

  for (const index in lines) {
    const line = lines[index];
    if (line.toLowerCase().startsWith(`${comment} snippet:`)) {
      name = line.replace(`${comment} snippet:`, "").trim()
      // new block
      codeBlock = '';
      continue;
    }
    if (line.toLowerCase().startsWith(`${comment} end snippet`)) {
      if (name) {
        map.set(name, codeBlock);
      }
      codeBlock = '';
      name = null;
      continue;
    }
    codeBlock += line + "\n";
  }

  return map.get(key) ?? '';
}

