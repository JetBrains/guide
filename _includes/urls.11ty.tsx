import { LayoutContext, LayoutProps } from "../src/models";
import path from "upath";

export function UrlsLayout (
  this: LayoutContext,
  data: LayoutProps
):string {

  const { site, collections } = data;
  const { siteUrl } = site;

  // TODO: limit this to stuff and order it
  let numberOfitems = 0;
  let items  = '';
  collections.allResources.forEach(page => {
    numberOfitems++;
    items += `${path.join(siteUrl, page.url).replace('https:/www.jetbrains.com', '')}\n`
  })

  return `# Total number of pages in ${siteUrl}: ${numberOfitems}\n${items}`;
}

export const render = UrlsLayout;