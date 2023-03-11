// @ts-ignore
import h, {JSX} from "vhtml";
import { Plugin } from "vite";

export const metaOpenGraphImagePlugin = (): Plugin => {
  const img = new RegExp(/<img[^>].*data-meta="(?<siteUrl>[^"]+)".*src="(?<src>[^"]+)"[^>]*>/);

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
            `<head><meta property="og:image" content="${siteUrl}${src}">`
          );
        return html;
      } else {
        return html;
      }
    }
  };
};

export const getRootUrl = (siteUrl: string):string => {
  const url = new URL(siteUrl);
  return `${url.protocol}//${url.host}`;
}

export type MetaOpenGraphImageProps = {
  siteUrl : string;
  src?: string | undefined | null;
}

export function MetaOpenGraphImage({siteUrl, src} : MetaOpenGraphImageProps): JSX.Element {
  if (src && siteUrl) {
    // siteUrl might already have a prefix,
    // since we're dealing with assets, VITE will add the
    // appropriate prefix, so we only need the root url
    // @ts-ignore
    return <img lazy data-meta={getRootUrl(siteUrl)} src={src} style="display:none" />
  }

  return "";
}

