// @ts-ignore
import h, {JSX} from "vhtml";
import Navbar from "../navbar/Navbar.11ty";
import Footer from "../footer/Footer.11ty";
import {LayoutContext, LayoutProps} from "../../src/models";
import { MetaOpenGraphImage } from "../../src/plugins/metaOpenGraphImagePlugin";
import { Resource } from "../../src/ResourceModels";

export type BaseLayoutProps = {
    children: string[];
    site: any;
    title: string;
} & LayoutProps;

export function BaseLayout(
    this: LayoutContext,
    data: BaseLayoutProps
): JSX.Element {
    // @ts-ignore
    const {children, title, subtitle, site, longVideo, shortVideo, resourceType, collections} = data;
    const {siteTitle, copyright, siteUrl } = site;
    // TODO This is a hack. Bake it into the contract.
    const hasVideo = (longVideo || shortVideo) || resourceType == "playlist";

    // determine if there's an og:image
    let cardThumbnail;
    if (resourceType) {
        const resource = collections.allResources.get(data.page.url) as Resource;
        cardThumbnail = resource?.cardThumbnail;
    }

    return "<!doctype html>" + (
        <html lang="en">
        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>
                {data.title} - {siteTitle}
            </title>
            <link rel="stylesheet" href="/assets/guide.css"/>
            <link rel="icon" href="/assets/favicon.ico" type="image/x-icon"/>
            <link rel="shortcut icon" href="/assets/favicon.ico"/>
            <link rel="alternate" type="application/rss+xml" title={`${title} RSS Feed`} href="/rss.xml"/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={subtitle}/>
            <meta property="og:type" content="article"/>
            <meta property="article:published_time" content="2023-02-17"/>
            <meta property="article:author" content=""/>
            <meta property="article:section" content=""/>
            {cardThumbnail && <meta property="og:image:alt" content={title} /> }
            <meta name="twitter:card" content="summary"/>
            <meta name="twitter:site" content="@jetbrains"/>
            <script defer src="/assets/js/site.js" type="module"></script>
            {hasVideo &&
                <>
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.21.2/video-js.min.css"
                          rel="stylesheet"/>
                    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.21.2/video.min.js"/>
                    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/videojs-youtube/2.6.1/Youtube.min.js"/>
                </>
            }
        </head>
        <body>
        <Navbar site={site}></Navbar>
        {children}
        <Footer copyright={copyright}></Footer>
        {cardThumbnail && <MetaOpenGraphImage siteUrl={siteUrl} src={cardThumbnail} />}
        </body>
        </html>
    );
}

export const render = BaseLayout;
