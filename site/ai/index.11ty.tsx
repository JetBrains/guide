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
import GettingStartedSection from "../../_includes/pageelements/GettingStartedSection.11ty";

const frontmatter: ChannelFrontmatter = {
	title: "Artificial Intelligence",
	subtitle: "Discover JetBrains AI tools",
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

		let aiaWhyVideoUrl = "https://www.youtube.com/watch?v=Y80rIKoSSSU";
		const aiaHowTos = [
			this.getResource("/ai/links/how-aia/kotlin/"),
			this.getResource("/ai/links/how-aia/java/"),
			this.getResource("/ai/links/how-aia/php/"),
			this.getResource("/ai/links/how-aia/python/"),
			this.getResource("/ai/links/how-aia/js-ts/"),
			this.getResource("/ai/links/how-aia/go/"),
			this.getResource("/ai/links/how-aia/dotnet/"),
		];

		let junieWhyVideoUrl = "https://www.youtube.com/watch?v=Y80rIKoSSSU";
		const junieHowTos = [
			this.getResource("/ai/links/how-junie/kotlin/"),
			this.getResource("/ai/links/how-junie/java/"),
			this.getResource("/ai/links/how-junie/python/"),
			this.getResource("/ai/links/how-junie/js-ts/"),
			this.getResource("/ai/links/how-junie/go/"),
		];

		const aiaResources = this.getResources({
			resourceTypes: [LINK_RESOURCE, ARTICLE_RESOURCE],
			customFilter: (r) =>
				!!r.topics?.includes("ai") && !!r.topics?.includes("aia"),
		});

		const junieResources = this.getResources({
			resourceTypes: [LINK_RESOURCE, ARTICLE_RESOURCE],
			customFilter: (r) =>
				!!r.topics?.includes("ai") && !!r.topics?.includes("junie"),
		});

		const tips = this.getResources({
			resourceTypes: [TIP_RESOURCE],
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

				{aiaHowTos && aiaHowTos.length > 0 && (
					<GettingStartedSection
						title={`Getting Started with AI Assistant`}
						resources={aiaHowTos}
						resourcesSubtitle={``}
						resourcesSubtitleTip={``}
						separator={false}
						includeCardFooter={false}
						sectionExtraClass={"has-background-success"}
						description={[
							"That’s a look at the updated AI Assistant. Briefly summarized: Local and cloud completion, powerful models, deep IDE integration, in chat or your editor window.",
						]}
						whyVideoUrl={aiaWhyVideoUrl}
					/>
				)}

				{aiaResources && aiaResources.length > 0 && (
					<ListingSection
						title={`Problem-solving with AI Assistant`}
						resources={aiaResources.slice(0, 4)}
						separator={false}
						includeCardFooter={false}
						moreLink={aiaResources.length > 4 ? `/tags/aia/` : undefined}
						sectionExtraClass={"has-background-grey-lighter"}
					/>
				)}

				{junieHowTos && junieHowTos.length > 0 && (
					<GettingStartedSection
						title={`Getting Started with Junie`}
						resources={junieHowTos}
						resourcesSubtitle={``}
						resourcesSubtitleTip={``}
						separator={false}
						includeCardFooter={false}
						sectionExtraClass={"has-background-success"}
						description={["That’s a look at the JetBrains Junie"]}
						whyVideoUrl={junieWhyVideoUrl}
					/>
				)}

				{junieResources && junieResources.length > 0 && (
					<ListingSection
						title={`Problem-solving with Junie`}
						resources={junieResources.slice(0, 4)}
						separator={false}
						includeCardFooter={false}
						moreLink={junieResources.length > 4 ? `/tags/junie/` : undefined}
						sectionExtraClass={"has-background-grey-lighter"}
					/>
				)}

				{tips && (
					<ListingSection
						title={`Tips & Tricks`}
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
