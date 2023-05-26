import { Plugin } from "vite";
import { CustomPluginOptions } from "rollup";
import { parse } from "node-html-parser";

export const absolutePaths = (_: CustomPluginOptions = {}): Plugin => ({
  name: "absolute-paths",
  enforce: "post",
  apply: "build",
  transformIndexHtml: (html) => {
    const doc = parse(html);

    const meta = doc.querySelector("meta[property=root]");
    const prefix = meta?.attrs["content"] as string;
    const channel = meta?.attrs["data-channel"] as string;

    meta?.remove();

    // @ts-ignore
    const anchors = doc.getElementsByTagName("a");
    const links = doc.getElementsByTagName("link");

    const targets = anchors.concat(links);

    targets.forEach((element) => {
      const href = element.attrs["href"];
      // already good
      if (href.startsWith(prefix)) return;
      // absolute urls
      if (href.startsWith("http://") || href.startsWith("https://")) return;
      // relative paths
      if (href.startsWith(".")) return;
      // anchor link
      if (href.startsWith("#")) return;
      // ignore VITE ASSETS
      if (href.startsWith("__VITE_ASSET__")) return;

      const newHref = href.replace(`/${channel}/`, prefix);
      element.setAttribute("href", newHref);
    });

    return doc.toString();
  },
});
