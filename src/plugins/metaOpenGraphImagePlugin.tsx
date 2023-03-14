// @ts-ignore
import h, {JSX} from "vhtml";
import { Plugin } from "vite";
import { parse} from "node-html-parser"

export const metaOpenGraphImagePlugin = (): Plugin => {
  return {
    name: "meta-open-graph-image",
    enforce: "post",
    apply: "build",
    transformIndexHtml: (html) => {
      const doc = parse(html);
      const image = doc.querySelector("img[data-meta]");

      if (image) {
        const head = doc.getElementsByTagName("head")[0];
        const siteUrl = image.attrs["data-meta"]
        const src = image.attrs["src"];
        const meta = parse(`<meta property="og:image" content="${siteUrl}${src}">`);
        head.appendChild(meta);
        image.remove()

        return doc.toString()
      }

      return html;

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
    return <img alt="" lazy data-meta={getRootUrl(siteUrl)} src={src} style="display:none" />
  }

  return "";
}

