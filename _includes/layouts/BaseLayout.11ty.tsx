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
import PromoBanner from "../navbar/PromoBanner.11ty";
import { Channel, isChannel } from "../resources/channel/ChannelModels";
import { Fragment } from "jsx-async-runtime/jsx-dev-runtime";
import { isLink } from "../resources/link/LinkModels";

export type BaseLayoutProps = {
	title: string;
	subtitle?: string;
	video?:
		| string
		| {
				url: string;
				start: number;
				end: number;
		  };
	resourceType: string;
	channel?: string;
} & LayoutProps;

export function BaseLayout(
	this: LayoutContext,
	data: BaseLayoutProps,
): JSX.Element {
	const { children, title, subtitle, resourceType, collections } = data;

	// Happy DOM throws a DOMException for external script/css even though
	// we do the settings to suppress it. Vite catches the exception but
	// logs it. We can't handle the exception, and it pollutes the test output.
	// Let's detect if we're running in a test, then later, wrap the
	// <link> and <script> to suppress.
	const isNotTest = !(
		typeof window != "undefined" && !!(window as any).happyDOM
	);

	// determine if there's an og:image
	let channel: Channel | undefined = undefined;
	let thumbnail: string | undefined = undefined;
	let linkURL: string | undefined = undefined;
	if (resourceType) {
		const resource = collections.resourceMap.get(data.page.url) as Resource;
		const resourceThumbnail = resource?.getThumbnail();
		// make sure we don't try to use fontawesome icons as the thumbnail image
		if (
			resourceThumbnail &&
			resourceThumbnail.indexOf("fa-") < 0 &&
			resourceThumbnail.indexOf("fas-") < 0 &&
			resourceThumbnail.indexOf("far-") < 0
		) {
			thumbnail = resourceThumbnail;
		}
		if (isChannel(resource)) {
			channel = resource;
		} else if (
			resource &&
			resource.references &&
			resource.references.channel?.url
		) {
			channel = resource.references.channel;
		} else if (data.channel) {
			channel = collections.resourceMap.get(data.channel) as Channel;
		}

		if (isLink(resource)) {
			let link = resource;
			linkURL = link?.linkURL;
		}
	}

	const year = new Date().getFullYear();
	const copyright = `Copyright © 2000–${year} <a href="https://www.jetbrains.com/">JetBrains</a> s.r.o.`;

	// TODO: data below should probably be cached and defined elsewhere, but hey - WIP!
	// data for navbar
	const featuredChannel = collections.resourceMap.get("/remote/");
	const technologies = [
		collections.resourceMap.get("/javascript/"),
		collections.resourceMap.get("/python/"),
		collections.resourceMap.get("/java/"),
		collections.resourceMap.get("/go/"),
		collections.resourceMap.get("/dotnet/"),
	].filter((it) => it != undefined) as Resource[];
	const solutions = [
		collections.resourceMap.get("/gamedev/"),
		collections.resourceMap.get("/ai/"),
		collections.resourceMap.get("/remote/"),
		collections.resourceMap.get("/databases/"),
		collections.resourceMap.get("/django/"),
	].filter((it) => it != undefined) as Resource[];
	const hotTopics = [
		collections.resourceMap.get("topics:aws"),
		collections.resourceMap.get("topics:debugging"),
		collections.resourceMap.get("topics:git"),
		collections.resourceMap.get("topics:gcp"),
		collections.resourceMap.get("topics:gradle"),
		collections.resourceMap.get("topics:refactoring"),
	].filter((it) => it != undefined) as Resource[];

	// render
	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>{data.title} - JetBrains Guide</title>
				<link
					rel="preload"
					as="font"
					href="https://resources.jetbrains.com/storage/jetbrains-sans/JetBrainsSans.woff2"
					crossorigin="anonymous"
				/>
				<link
					rel="preload"
					as="font"
					href="https://resources.jetbrains.com/storage/jetbrains-sans/JetBrainsSans-Regular.woff2"
					crossorigin="anonymous"
				/>
				<link rel="preload" as="style" href="/assets/site.scss" />
				{isNotTest && (
					<Fragment>
						<link rel="stylesheet" href="/assets/site.scss" />
						<script defer src="/assets/js/site.js" type="module"></script>
						<script defer src="/assets/js/video.js" type="module"></script>
					</Fragment>
				)}
				{linkURL && <link rel="canonical" href={linkURL} />}
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
				{thumbnail && <meta property="og:image:alt" content={title} />}
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:site" content="@jetbrains" />
				{subtitle && <meta name="description" content={subtitle} />}
				<GoogleTagManagerHeadScript googleTagManagerId="GTM-5P98" />
			</head>
			<body>
				<GoogleTagManagerBodyNoScript googleTagManagerId="GTM-5P98" />
				<Navbar
					featuredResource={featuredChannel}
					technologies={technologies}
					solutions={solutions}
					topics={hotTopics}
				/>
				{channel && <Subnav channel={channel} />}
				{channel && <PromoBanner channel={channel} />}
				{children}
				<Footer copyright={copyright}></Footer>
				{thumbnail && (
					<MetaOpenGraphImage
						siteUrl="https://www.jetbrains.com/guide/"
						src={thumbnail}
					/>
				)}
			</body>
		</html>
	);
}

export const render = BaseLayout;
