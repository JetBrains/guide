import { Plugin } from "vite";
import { CustomPluginOptions } from "rollup";

export const absolutePaths = (options: CustomPluginOptions = {}): Plugin => {
  const anchor = new RegExp("<[a|link][^>]+href=\"(?<href>.*?)\"[^>]*>", "g");
  const { prefix } = options;

  return {
    name: "absolute-paths",
    enforce: "post",
    apply: "build",
    transformIndexHtml: (html) => {
      // @ts-ignore
      let newHtml = html.replaceAll(anchor, (match, href) => {
        // already good
        if (href.startsWith(prefix)) return match;
        // absolute urls
        if (href.startsWith("http://") || href.startsWith("https://")) return match;
        // relative paths
        if (href.startsWith(".")) return match;

        const updatedHref = href.replace("/", `${prefix}/`);
        return match.replace(href, updatedHref);
      });
      return newHtml;
    }
  };
};

