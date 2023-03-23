const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const { registerIncludes } = require("./_includes/config");
const commandLineArgs = require("command-line-args");
const { ViteImageOptimizer } = require("vite-plugin-image-optimizer");
const { absolutePaths } = require("./src/plugins/absolutePaths");
const {
  metaOpenGraphImagePlugin,
} = require("./src/plugins/metaOpenGraphImagePlugin");
const purgeCss = require("@fullhuman/postcss-purgecss");

const options = commandLineArgs([
  { name: "config", type: String },
  { name: "incremental", type: Boolean, defaultOption: false },
  { name: "pathprefix", type: String, defaultOption: "/" },
  { name: "serve", type: Boolean, defaultOption: false },
  { name: "watch", type: Boolean, defaultOption: false },
]);
module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    assetsInclude: ["**/rss.xml"],
    viteOptions: {
      clearScreen: true,
      appType: "mpa",
      css: {
        postcss: {
          plugins: [
            purgeCss({
              content: [
                // for development
                "./_site/**/*.html",
                // for production builds
                "./.11ty-vite/**/*.html",
              ],
              safelist: {
                deep: [/plyr.*/],
              },
            }),
          ],
        },
      },
      plugins: [
        ViteImageOptimizer(),
        absolutePaths({
          prefix: options.pathprefix,
        }),
        metaOpenGraphImagePlugin(),
      ],
      base: options.pathprefix,
      assetsInclude: ["**/demos/**"],
      server: {
        mode: "development",
        middlewareMode: true,
        watch: {
          ignored: ["_site/**"],
        },
      },
      build: {
        mode: "production",
      },
    },
  });

  // These are all relative to the input directory at the end
  eleventyConfig.addPassthroughCopy("./!(_site)**/*.{gif,jpg,png,svg,jpeg}", {
    overwrite: true,
  });
  eleventyConfig.addPassthroughCopy(
    { "../../public/assets": "assets" },
    { overwrite: true }
  );

  eleventyConfig.ignores.add("**/demos/**");

  registerIncludes({ eleventyConfig })
    .then((r) => {})
    .catch((e) => console.log(e));

  eleventyConfig.addGlobalData("commandLineArgs", options);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  return {
    dir: {
      input: "./",
      includes: "../../_includes",
      layouts: "../../_includes",
      output: "./_site",
    },
  };
};
