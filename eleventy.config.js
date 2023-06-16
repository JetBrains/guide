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
                deep: [
                  /plyr.*/,
                  /is-active/,
                  /fa-robot/,
                  /has-background-info-light/,
                  /tag/,
                  /is-warning/,
                  /is-pulled-right/,
                ],
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
      server: {
        mode: "development",
        middlewareMode: true,
        watch: {
          ignored: ["_site/**"],
        },
      },
      build: {
        mode: "production",
        rollupOptions: {
          output: {
            assetFileNames: (info) => {
              if (info.name.includes("rss.xml")) {
                // don't modify the rss.xml file name
                return "[name][extname]";
              } else {
                return "assets/[name]-[hash][extname]";
              }
            },
          },
        },
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

  registerIncludes({ eleventyConfig }, process.cwd())
    .then((_) => {})
    .catch((e) => console.log(e));

  eleventyConfig.addGlobalData("commandLineArgs", options);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  return {
    dir: {
      input: "./sites",
      includes: "../_includes",
      layouts: "../_includes",
      output: "./_site",
    },
  };
};
