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
	subtitle: "From smart assistance to autonomous agents.",
	resourceType: "channel",
	date: new Date(Date.UTC(2024, 2, 5)),
	author: "hs",
	logo: "thumbnail.svg",
	hero: "/assets/splashes/ai.svg",
	subnav: [
		{
			title: "JetBrains AI",
			url: "https://www.jetbrains.com/ai/",
			target: "_blank",
		},
		{
			title: "Junie",
			url: "https://www.jetbrains.com/junie/",
			target: "_blank",
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
			customFilter: (r) => !!r.topics?.includes("learn-aia"),
		});

		const junieResources = this.getResources({
			resourceTypes: [LINK_RESOURCE, ARTICLE_RESOURCE],
			customFilter: (r) =>
				!!r.topics?.includes("ai") && !!r.topics?.includes("learn-junie"),
		});

		const communityResources = this.getResources({
			resourceTypes: [LINK_RESOURCE, ARTICLE_RESOURCE],
			customFilter: (r) =>
				!!r.topics?.includes("ai") && !!r.topics?.includes("ai-community"),
		});

		const tips = this.getResources({
			resourceTypes: [TIP_RESOURCE],
			customFilter: (r) =>
				!!r.topics?.includes("aia") || !!r.topics?.includes("junie"),
		});

		const divingDeeperResources = this.getResources({
			resourceTypes: [LINK_RESOURCE, ARTICLE_RESOURCE],
			customFilter: (r) =>
				!!r.topics?.includes("ai") && !!r.topics?.includes("deeper-ai"),
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
						howToResources={aiaHowTos}
						howToResourcesSubtitle={``}
						howToResourcesSubtitleTip={``}
						separator={false}
						includeCardFooter={false}
						sectionExtraClass={"has-background-purple has-text-white"}
						description={
							"AI Assistant brings context-aware, AI-driven features right into your JetBrains IDE to help you code faster, solve problems, and stay in flow. Powered by optimized language models, it handles everything from multiline code completion and test generation to refactoring, explaining errors, writing docs, resolving merge conflicts, and more. Whether you’re chatting, creating prompts, or working inline, it’s deeply integrated and always ready to assist — right where you need it most."
						}
						whyVideoUrl={aiaWhyVideoUrl}
						learnMoreResources={aiaResources}
						learnMoreResourcesSubtitle={`Master Problem-Solving with AI Assistant`}
						learnMoreResourcesSubtitleTip={``}
						learnMoreLink={`/tags/learn-aia/`}
					/>
				)}

				{junieHowTos && junieHowTos.length > 0 && (
					<GettingStartedSection
						title={`Getting Started with Junie`}
						howToResources={junieHowTos}
						howToResourcesSubtitle={``}
						howToResourcesSubtitleTip={``}
						separator={false}
						includeCardFooter={false}
						sectionExtraClass={"has-background-success"}
						description={
							"Meet Junie, your autonomous coding partner — built to help you delegate, iterate, and stay in flow. Assign tasks in natural language, and Junie handles them while you stay focused on what matters.\n" +
							"\n" +
							"It learns your codebase, adapts to your style, and refines results with every interaction. You stay in control — reviewing, adjusting, and moving faster with cleaner, more consistent code."
						}
						whyVideoUrl={junieWhyVideoUrl}
						learnMoreResources={junieResources}
						learnMoreResourcesSubtitle={`Master Problem-Solving with Junie`}
						learnMoreResourcesSubtitleTip={``}
						learnMoreLink={`/tags/learn-junie/`}
					/>
				)}

				{communityResources && communityResources.length > 0 && (
					<ListingSection
						title={`JetBrains AI in the Community`}
						resources={communityResources.slice(0, 4)}
						separator={false}
						includeCardFooter={false}
						moreLink={
							communityResources.length > 4 ? `/tags/ai-community/` : undefined
						}
					/>
				)}

				{tips && (
					<ListingSection
						title={`Latest Tips`}
						resources={tips.slice(0, 4)}
						separator={false}
						includeCardFooter={false}
						moreLink={tips.length > 4 ? `${channel.url}tips/` : undefined}
						sectionExtraClass={"has-background-grey-lighter"}
					/>
				)}

				{divingDeeperResources && divingDeeperResources.length > 0 && (
					<ListingSection
						title={`Diving Deeper into AI`}
						resources={divingDeeperResources.slice(0, 4)}
						separator={false}
						includeCardFooter={false}
						moreLink={
							divingDeeperResources.length > 4 ? `/tags/deeper-ai/` : undefined
						}
					/>
				)}
			</BaseLayout>
		);
	}
}

module.exports = AIHomepage;
