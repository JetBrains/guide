import { LayoutContext } from "../../src/models";
import ListingSection from "../../_includes/pageelements/ListingSection.11ty";
import HeroSection from "../../_includes/pageelements/HeroSection.11ty";
import {
	Channel,
	ChannelFrontmatter,
	ChannelHomepageData,
} from "../../_includes/resources/channel/ChannelModels";
import { BaseLayout } from "../../_includes/layouts/BaseLayout.11ty";
import {
	ARTICLE_RESOURCE,
	LINK_RESOURCE,
	TIP_RESOURCE,
} from "../../src/resourceType";

const frontmatter: ChannelFrontmatter = {
	title: "Artificial Intelligence",
	subtitle: "Discover JetBrains AI Assistant\nand Full Line Code Completion.",
	resourceType: "channel",
	date: new Date(Date.UTC(2024, 2, 5)),
	author: "hs",
	logo: "thumbnail.svg",
	hero: "/assets/splashes/ai.svg",
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

		const aiaResources = this.getResources({
			resourceTypes: [LINK_RESOURCE, TIP_RESOURCE, ARTICLE_RESOURCE],
			customFilter: (r) =>
				!!r.topics?.includes("ai") && !!r.topics?.includes("aia"),
		});

		const junieResources = this.getResources({
			resourceTypes: [LINK_RESOURCE, TIP_RESOURCE, ARTICLE_RESOURCE],
			customFilter: (r) =>
				!!r.topics?.includes("ai") && !!r.topics?.includes("junie"),
		});

		const artificalIntelligenceResources = this.getResources({
			resourceTypes: [LINK_RESOURCE, TIP_RESOURCE, ARTICLE_RESOURCE],
			customFilter: (r) =>
				!!r.topics?.includes("ai") &&
				!r.topics?.includes("aia") &&
				!r.topics?.includes("junie"),
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

				{aiaResources && aiaResources.length > 0 && (
					<ListingSection
						title={`AI Assistant`}
						resources={aiaResources.slice(0, 4)}
						separator={false}
						includeCardFooter={false}
						moreLink={aiaResources.length > 4 ? `/tags/aia/` : undefined}
						sectionExtraClass={"has-background-grey-lighter"}
					/>
				)}

				{junieResources && junieResources.length > 0 && (
					<ListingSection
						title={`Junie`}
						resources={junieResources.slice(0, 4)}
						separator={false}
						includeCardFooter={false}
						moreLink={junieResources.length > 4 ? `/tags/junie/` : undefined}
						sectionExtraClass={"has-background-grey-lighter"}
					/>
				)}
				{artificalIntelligenceResources &&
					artificalIntelligenceResources.length > 0 && (
						<ListingSection
							title={`Artificial Intelligence`}
							resources={artificalIntelligenceResources}
							separator={false}
							includeCardFooter={false}
							moreLink={
								artificalIntelligenceResources.length > 4
									? `/tags/ai/`
									: undefined
							}
							sectionExtraClass={"has-background-grey-lighter"}
						/>
					)}
			</BaseLayout>
		);
	}
}

module.exports = AIHomepage;
