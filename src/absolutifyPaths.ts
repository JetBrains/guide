import { Plugin } from "vite";
import { CustomPluginOptions } from "rollup";

const anchor = new RegExp('<[a|link][^>]+href="(.*?)"[^>]*>', "g");
export const absolutifyPaths = (options: CustomPluginOptions = {}): Plugin => {
  const { prefix } = options;
  return {
    name: "absolutify-paths",
    enforce: "post",
    apply: "build",
    transformIndexHtml: (html) => {
      // @ts-ignore
      let newHtml = html.replaceAll(anchor, (match, args) => {
        if (args.startsWith(prefix)) return;
        return match.replace("/", `${prefix}/`);
      });
      return newHtml;
    },
  };
};
