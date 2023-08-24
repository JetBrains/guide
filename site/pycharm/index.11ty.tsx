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
	title: "PyCharm Guide",
	subtitle: "Well-organized collection of learning resources for PyCharm.",
	resourceType: "channel",
	date: new Date(Date.UTC(2020, 1, 11)),
	author: "pwe",
	thumbnail: "thumbnail.png",
	hero: "/assets/pycharm_splash.svg",
	subnav: [
		{ title: "Download", url: "https://www.jetbrains.com/pycharm/" },
		{ title: "Blog", url: "https://blog.jetbrains.com/pycharm/" },
		{ title: "Docs", url: "https://www.jetbrains.com/help/" },
	],
};

class PyCharmHomepage {
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
				/>
				{tips && (
					<ListingSection
						title={`Recent Tips`}
						resources={tips}
						moreLink={`${channel.url}tips/`}
					/>
				)}
				{tutorials && (
					<ListingSection
						title={`Recent Tutorials`}
						resources={tutorials}
						moreLink={`${channel.url}tutorials/`}
						separator={true}
					/>
				)}
				{playlists && (
					<ListingSection
						title={`Recent Playlists`}
						resources={playlists}
						moreLink={`${channel.url}playlists/`}
						separator={true}
					/>
				)}
			</BaseLayout>
		);
	}
}

module.exports = PyCharmHomepage;
