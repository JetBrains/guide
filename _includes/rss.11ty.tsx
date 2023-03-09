import { LayoutContext, LayoutProps } from "../src/models";
import path from "upath";

export function RssLayout (
  this: LayoutContext,
  data: LayoutProps
):string {

  const { site, collections, page } = data;
  const { siteTitle, siteUrl, siteDescription, copyright } = site;

  // TODO: limit this to stuff and order it
  let items  = '';
  collections.allResources.forEach(page => {
    items +=
      `<item>
        <title>${page.title}</title>
        <link>${path.join(siteUrl, page.url)}</link>
        <description>${page.subtitle}</description>
        <category>${page.resourceType}</category>
        <author>${page.references?.author.title}</author>        
        <pubDate>${page.date.toUTCString()}</pubDate>        
      </item>`
  })

  return `<?xml version="1.0" encoding="utf-8"?>
  <rss version="2.0">
    <channel>
      <title>${siteTitle}</title>
      <link>${siteUrl}</link>
      <lastBuildDate>${page.date.toUTCString()}</lastBuildDate>
      <description>${siteDescription}</description>
      <copyright>${copyright}</copyright>
      <language>en-us</language>      
      ${items}
    </channel>
  </rss>`;
}

export const render = RssLayout;