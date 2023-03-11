import { Plugin } from "vite";

export const metaOpenGraphImageTag = (): Plugin => {
  const img = new RegExp(/<img[^>]data-meta="(?<siteUrl>[^"]+)".*src="(?<src>[^"]+)"[^>]*>/);

  return {
    name: "meta-open-graph-image",
    enforce: "post",
    apply: "build",
    transformIndexHtml: (html) => {
      const images = html.match(img);
      if (images && images.groups) {
        const original = images[0];
        const siteUrl = images[1]
        const src = images[2];
        return html
          .replace(original, "")
          .replace(
            `<head>`,
            `<head>\n<meta property="og:image" content="${siteUrl}${src}">`
          );
        return html;
      } else {
        return html;
      }
    }
  };
};