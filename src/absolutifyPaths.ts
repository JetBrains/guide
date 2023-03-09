import { Plugin } from "vite";
import { CustomPluginOptions } from "rollup";

const anchor = new RegExp('<[a|link][^>]+(href="(?<href>.*?)")[^>]*>', "g");
export const absolutifyPaths = (options: CustomPluginOptions = {}): Plugin => {
  const { prefix } = options;
  return {
    name: "absolutify-paths",
    enforce: "post",
    apply: "build",
    transformIndexHtml: (html) => {
      // @ts-ignore
      let newHtml = html.replaceAll(anchor, (match, href, args) => {
        if (href.startsWith(prefix)) return match;
        if (href.startsWith("http://") || args.startsWith("https://")) return match;

        const absolutifiedHref = href.replace("/", `${prefix}/`);
        return match.replace(href, absolutifiedHref);
      });
      return newHtml;
    },
  };
};
