import h, { JSX } from "vhtml";
import { LayoutContext } from "../../src/models";
import ListingSection from "../../_includes/pageelements/ListingSection.11ty";
import HeroSection from "../../_includes/pageelements/HeroSection.11ty";
import {
	Channel,
	ChannelFrontmatter,
	ChannelHomepageData,
} from "../../_includes/resources/channel/ChannelModels";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";

const frontmatter: ChannelFrontmatter = {
	title: "Python",
	subtitle: "Well-organized collection of learning resources for Python.",
	resourceType: "channel",
	date: new Date(Date.UTC(2020, 1, 11)),
	author: "pwe",
	accent: "primary",
	icon: "fa-brands fa-python",
	hero: "/assets/python_splash.svg",
	logo: "thumbnail.png",
	subnav: [
		{ title: "Download", url: "https://www.jetbrains.com/pycharm/" },
		{ title: "Blog", url: "https://blog.jetbrains.com/pycharm/" },
		{ title: "Docs", url: "https://www.jetbrains.com/help/" },
	],
};

export default class PythonHomepage {
	data() {
		return {
			layout: "",
			...frontmatter,
		};
	}

	render(this: LayoutContext, data: ChannelHomepageData): JSX.Element {
		const channel: Channel = this.getResource(data.page.url) as Channel;
		const tips = this.getResources({
			resourceTypes: ["tip"],
			channel: channel.url,
			limit: 4,
		});

		const tutorials = this.getResources({
			resourceTypes: ["tutorial"],
			channel: channel.url,
			limit: 4,
		});

		const playlists = this.getResources({
			resourceTypes: ["playlist"],
			channel: channel.url,
			limit: 4,
		});

		return (
			<BaseLayout {...data}>
				<HeroSection
					title={channel.title}
					subtitle={channel.subtitle!}
					image={channel.hero!}
					subtitleExtraClass={"has-text-white has-text-shadow"}
					titleExtraClass={"has-text-white has-text-shadow"}
				/>
				{tips && (
					<ListingSection
						title={`Latest tips`}
						resources={tips}
						moreLink={`${channel.url}tips/`}
					/>
				)}
				{tutorials && (
					<ListingSection
						title={`Latest tutorials`}
						resources={tutorials}
						moreLink={`${channel.url}tutorials/`}
						separator={true}
					/>
				)}
				{playlists && (
					<ListingSection
						title={`Recent playlists`}
						resources={playlists}
						moreLink={`${channel.url}playlists/`}
						separator={true}
					/>
				)}
			</BaseLayout>
		);
	}
}
