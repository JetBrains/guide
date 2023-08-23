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
import Subnav from "../navbar/Subnav.11ty";
import { Channel } from "../resources/channel/ChannelModels";

export type BaseLayoutProps = {
	children: string[];
	title: string;
	subtitle?: string;
	video?:
		| string
		| {
				url: string;
				start: number;
				end: number;
		  };
	resourceType?: string;
	channel?: string;
} & LayoutProps;

export function BaseLayout(
	this: LayoutContext,
	data: BaseLayoutProps
): JSX.Element {
	// @ts-ignore
	const { children, title, subtitle, video, resourceType, collections } = data;

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
	let cardThumbnail, channel;
	if (resourceType) {
		const resource = collections.allResources.get(data.page.url) as Resource;
		cardThumbnail = resource?.cardThumbnail;
		if (resourceType == "channel") {
			channel = resource;
		} else if (resource && resource.references) {
			channel = resource.references.channel;
		} else if (data.channel) {
			channel = collections.allResources.get(data.channel) as Channel;
		}
	}

	const year = new Date().getFullYear();
	const copyright = `Copyright © 2000–${year} <a href="https://www.jetbrains.com/">JetBrains</a> s.r.o.`;

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
					{channel && <Subnav channel={channel} />}
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
