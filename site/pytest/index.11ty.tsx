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
	LINK_RESOURCE,
	TIP_RESOURCE,
	TUTORIAL_RESOURCE,
} from "../../src/resourceType";
import { renderToString } from "jsx-async-runtime";

const frontmatter: ChannelFrontmatter = {
	title: "pytest Framework",
	subtitle: "Discover one of Python's most popular test frameworks!",
	resourceType: "channel",
	date: new Date(Date.UTC(2024, 2, 19)),
	author: "hs",
	logo: "thumbnail.svg",
	hero: "/assets/splashes/pytest.svg",
	subnav: [
		{ title: "pytest", url: "https://www.jetbrains.com/help/idea/pytest.html" },
	],
};

class PytestHomepage {
	data() {
		return {
			layout: "",
			...frontmatter,
		};
	}

	async render(
		this: LayoutContext,
		data: ChannelHomepageData,
	): Promise<string> {
		const channel: Channel = this.getResource(data.page.url) as Channel;

		const all = this.getResources({
			resourceTypes: [TIP_RESOURCE, TUTORIAL_RESOURCE, LINK_RESOURCE],
			channel: channel.url,
			customFilter: (r) =>
				r.channel == channel.url || r.topics?.includes("pytest") == true,
			limit: 8,
		});

		return await renderToString(
			<BaseLayout {...data}>
				<HeroSection
					title={channel.title}
					subtitle={channel.subtitle!}
					image={channel.hero!}
					titleExtraClass={"has-text-black"}
					subtitleExtraClass={"has-text-black"}
				/>

				{/*{links && (*/}
				{/*	<ListingSection*/}
				{/*		title={`Latest links`}*/}
				{/*		resources={links}*/}
				{/*		separator={false}*/}
				{/*		includeCardFooter={false}*/}
				{/*		moreLink={`${channel.url}links/`}*/}
				{/*	/>*/}
				{/*)}*/}

				{all && (
					<ListingSection
						title={`Latest tips, tutorials, and links`}
						resources={all}
						includeCardFooter={true}
						includeContentType={true}
					/>
				)}
			</BaseLayout>,
		);
	}
}

module.exports = PytestHomepage;
