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
import { LINK_RESOURCE, TIP_RESOURCE } from "../../src/resourceType";

const frontmatter: ChannelFrontmatter = {
	title: "Artificial Intelligence",
	subtitle:
		"Discover JetBrains AI Assistant, Large Language Models and Artificial Intelligence (AI).",
	resourceType: "channel",
	date: new Date(Date.UTC(2024, 2, 5)),
	author: "hs",
	logo: "thumbnail.png",
	hero: "/assets/ai_splash.svg",
	subnav: [{ title: "AI Assistant", url: "https://www.jetbrains.com/ai/" }],
};

class AIHomepage {
	data() {
		return {
			layout: "",
			...frontmatter,
		};
	}

	render(this: LayoutContext, data: ChannelHomepageData): JSX.Element {
		const channel: Channel = this.getResource(data.page.url) as Channel;

		const links = this.getResources({
			resourceTypes: [LINK_RESOURCE],
			// would look across the guide for ai content
			//customFilter: (r) => r.topics?.includes("ai") == true,
			// anything under AI that's a link
			channel: channel.url,
			limit: 8,
		});

		const tips = this.getResources({
			resourceTypes: [TIP_RESOURCE],
			customFilter: (r) =>
				r.channel == channel.url || r.topics?.includes("ai-assistant") == true,
			limit: 8,
		});

		return (
			<BaseLayout {...data}>
				<HeroSection
					title={channel.title}
					subtitle={channel.subtitle!}
					image={channel.hero!}
					titleExtraClass={"has-text-white"}
					subtitleExtraClass={"has-text-white"}
				/>

				{links && (
					<ListingSection
						title={`Latest links`}
						resources={links}
						separator={false}
						includeCardFooter={false}
						moreLink={`${channel.url}links/`}
						sectionExtraClass={"has-background-grey-lighter"}
					/>
				)}

				{tips && (
					<ListingSection
						title={`Latest tips`}
						resources={tips}
						separator={false}
						includeCardFooter={false}
						moreLink={`${channel.url}tips/`}
						sectionExtraClass={"has-background-grey-lighter"}
					/>
				)}
			</BaseLayout>
		);
	}
}

module.exports = AIHomepage;
