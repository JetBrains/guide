import { LayoutContext, LayoutProps } from "../src/models";
import { encode } from "html-entities";
import path from "upath";

export function RssLayout(this: LayoutContext, data: LayoutProps): string {
	const { collections, page } = data;

	let items = "";
	collections.resourceMap.forEach((page) => {
		items += `<item>
        <title>${encode(page.title, { level: "xml" })}</title>
        <link>${path
					.join(`https://www.jetbrains.com/guide`, page.url)
					.replace("https:/www", "https://www")}</link>
        <description>${encode(page.subtitle, { level: "xml" })}</description>
        <category>${page.resourceType}</category>
        <author>${page.references?.author.title}</author>        
        <pubDate>${page.date.toUTCString()}</pubDate>        
      </item>`;
	});

	const year = new Date().getFullYear();
	const copyright = `Copyright © 2000–${year} <a href="https://www.jetbrains.com/">JetBrains</a> s.r.o.`;

	return `<?xml version="1.0" encoding="utf-8"?>
  <rss version="2.0">
    <channel>
      <title>JetBrains Guide</title>
      <link>https://www.jetbrains.com/guide</link>
      <lastBuildDate>${page.date.toUTCString()}</lastBuildDate>
      <description>Be more productive and write high-quality code faster with a series of tips and tricks.</description>
      <copyright>${copyright}</copyright>
      <language>en-us</language>      
      ${items}
    </channel>
  </rss>`;
}

export const render = RssLayout;
