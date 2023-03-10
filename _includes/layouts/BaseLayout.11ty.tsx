// @ts-ignore
import h, { JSX } from "vhtml";
import Navbar from "../navbar/Navbar.11ty";
import Footer from "../footer/Footer.11ty";
import { LayoutContext, LayoutProps } from "../../src/models";

export type BaseLayoutProps = {
  children: string[];
  site: any;
  title: string;
} & LayoutProps;

export function BaseLayout(
  this: LayoutContext,
  data: BaseLayoutProps
): JSX.Element {
  const { children, site } = data;
  const { siteTitle, copyright } = site;
  // @ts-ignore
  const { longVideo, shortVideo } = data;

  // @ts-ignore
  const { subtitle } = data;
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          {data.title} - {siteTitle}
        </title>
        <link rel="stylesheet" href="/assets/guide.css" />
        <link rel="icon" href="/assets/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/assets/favicon.ico" />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={subtitle} />
        {/*<meta*/}
        {/*  property="og:image"*/}
        {/*  content={`${siteUrl}__VITE_ASSET__6d742142__`}*/}
        {/*/>*/}
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content="2023-02-17" />
        <meta property="article:author" content="" />
        <meta property="article:section" content="" />
        <meta property="og:image:alt" content="" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@jetbrains" />
        <script defer src="/assets/js/site.js" type="module"></script>
        {(longVideo || shortVideo) &&
        <script defer src="/assets/js/video.js" type="module"></script>}
        <script defer src="https://use.fontawesome.com/releases/v6.0.0-beta3/js/all.js"></script>
      </head>
      <body>
        <Navbar site={site}></Navbar>
        {children}
        <Footer copyright={copyright}></Footer>
      </body>
    </html>
  );
}

export const render = BaseLayout;
