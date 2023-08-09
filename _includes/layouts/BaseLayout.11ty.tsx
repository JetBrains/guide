// @ts-ignore
import h, { JSX } from "vhtml";
import Navbar from "../navbar/Navbar.11ty";
import Footer from "../footer/Footer.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";
import { MetaOpenGraphImage } from "../../src/plugins/metaOpenGraphImagePlugin";
import { Resource } from "../../src/ResourceModels";
import {
  GoogleTagManagerBodyNoScript,
  GoogleTagManagerHeadScript,
} from "../googleTagManager.11ty";

export type SubnavItem = {
  text: string;
  url: string;
};

export type Channel = {
  name: string;
  url: string;
  subnav?: SubnavItem[];
};

export type BaseLayoutProps = {
  children: string[];
  title: string;
  subtitle?: string;
  video?: string | { url: string; start: number; end: number };
  resourceType?: string;
  channel?: Channel;
} & LayoutProps;

export function BaseLayout(
  this: LayoutContext,
  data: BaseLayoutProps
): JSX.Element {
  // @ts-ignore
  const {
    children,
    title,
    subtitle,
    video,
    resourceType,
    collections,
    channel,
  } = data;

  // Happy DOM throws a DOMException for external script/css even though
  // we do the settings to suppress it. Vite catches the exception but
  // logs it. We can't handle the exception, and it pollutes the test output.
  // Let's detect if we're running in a test, then later, wrap the
  // <link> and <script> to suppress.
  let isNotTest = true;
  // @ts-ignore
  if (typeof window != "undefined" && window.happyDOM) {
    isNotTest = false;
  }

  // TODO This is a hack. Bake it into the contract.
  const hasVideo = !!video || (!!resourceType && resourceType == "playlist");

  // determine if there's an og:image
  let cardThumbnail;
  if (resourceType) {
    const resource = collections.allResources.get(data.page.url) as Resource;
    cardThumbnail = resource?.cardThumbnail;
  }

  const year = new Date().getFullYear();
  const copyright = `Copyright © 2000–${year} <a href="https://www.jetbrains.com/">JetBrains</a> s.r.o.`;

  const subnav = !channel?.subnav ? (
    ""
  ) : (
    <nav class="navbar navbar-secondary">
      <div class="container">
        <div class="navbar-brand">
          <div class="navbar-item is-size-5 has-text-weight-semibold pl-0">
            <a href="#" class="is-hidden-touch">
              {channel.name}
            </a>
            <a href="#" className="is-hidden-desktop ml-5">
              {channel.name}
            </a>
          </div>
        </div>
        <div className="navbar-end is-hidden-touch">
          {channel.subnav.map((channel) => (
            <a className="navbar-item" href={channel.url}>
              {channel.text}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
  return (
    "<!doctype html>" +
    (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>{data.title} - JetBrains Guide</title>
          {isNotTest && (
            <>
              <link rel="stylesheet" href="/assets/site.scss" />
              <script defer src="/assets/js/site.js" type="module"></script>
              {hasVideo && (
                <script defer src="/assets/js/video.js" type="module"></script>
              )}
            </>
          )}
          <link rel="icon" href="/assets/favicon.ico" type="image/x-icon" />
          <link rel="shortcut icon" href="/assets/favicon.ico" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title={`${title} RSS Feed`}
            href={`/rss.xml`}
          />
          <meta property="og:title" content={title} />
          {subtitle && <meta property="og:description" content={subtitle} />}
          <meta property="og:type" content="article" />
          <meta property="article:published_time" content="2023-02-17" />
          <meta property="article:author" content="" />
          <meta property="article:section" content="" />
          {cardThumbnail && <meta property="og:image:alt" content={title} />}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@jetbrains" />
          <GoogleTagManagerHeadScript googleTagManagerId="GTM-5P98" />
        </head>
        <body>
          <GoogleTagManagerBodyNoScript googleTagManagerId="GTM-5P98" />
          <Navbar />
          {subnav}
          {children}
          <Footer copyright={copyright}></Footer>
          {cardThumbnail && (
            <MetaOpenGraphImage
              siteUrl="https://www.jetbrains.com/guide/"
              src={cardThumbnail}
            />
          )}
        </body>
      </html>
    )
  );
}

export const render = BaseLayout;
