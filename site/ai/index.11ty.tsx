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
import GettingStartedSection from "../../_includes/pageelements/GettingStartedSection.11ty";

const frontmatter: ChannelFrontmatter = {
	title: "Artificial Intelligence",
	subtitle: "Discover JetBrains AI Assistant\nand Full Line Code Completion.",
	resourceType: "channel",
	date: new Date(Date.UTC(2024, 2, 5)),
	author: "hs",
	logo: "thumbnail.svg",
	hero: "/assets/splashes/ai.svg",
	subnav: [
		{ title: "AI Assistant", url: "https://www.jetbrains.com/ai/" },
		{ title: "Junie", url: "https://www.jetbrains.com/ai/" },
		{
			title: "JetBrains AI",
			url: "https://www.jetbrains.com/ai/",
		},
	],
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
			customFilter: (r) =>
				r.channel == channel.url || r.topics?.includes("ai") == true,
			limit: 8,
		});

		// const learnMoreResources = [this.getResource()];

		const tips = this.getResources({
			resourceTypes: [TIP_RESOURCE],
			customFilter: (r) =>
				r.channel == channel.url && r.topics?.includes("ai") == true,
			limit: 4,
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
					<GettingStartedSection
						title={`Getting Started with AI Assistant`}
						resources={links.slice(0, 4)}
						separator={false}
						includeCardFooter={false}
						sectionExtraClass={"has-background-success"}
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
