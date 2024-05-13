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
	TIP_RESOURCE,
	LINK_RESOURCE,
	TUTORIAL_RESOURCE,
} from "../../src/resourceType";

const frontmatter: ChannelFrontmatter = {
	title: "Django",
	subtitle: "Tips and content for\ndevelopment working with Django.",
	resourceType: "channel",
	date: new Date(Date.UTC(2023, 10, 20)),
	author: "hs",
	logo: "thumbnail.png",
	hero: "/assets/django_splash_gradient.svg",
	subnav: [{ title: "PyCharm", url: "https://www.jetbrains.com/pycharm/" }],
};

export default class DjangoHomepage {
	data() {
		return {
			layout: "",
			...frontmatter,
		};
	}

	render(this: LayoutContext, data: ChannelHomepageData): JSX.Element {
		const channel: Channel = this.getResource(data.page.url) as Channel;

		const tips = this.getResources({
			resourceTypes: [TIP_RESOURCE],
			limit: 4,
			//customFilter: (r) => r.channel == channel.url || r.topics?.includes("django") == true,
			customFilter: (r) => r.topics?.includes("django") == true,
		});

		const links = this.getResources({
			resourceTypes: [LINK_RESOURCE],
			limit: 4,
			customFilter: (r) => r.topics?.includes("django") == true,
			//channel: channel.url,
		});

		const tutorials = this.getResources({
			resourceTypes: [TUTORIAL_RESOURCE],
			channel: channel.url,
			limit: 4,
			customFilter: (r) => r.topics?.includes("django") == true,
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

				{tips && (
					<ListingSection
						title={`Latest tips`}
						resources={tips}
						separator={false}
						includeCardFooter={true}
						moreLink={`${channel.url}tips/`}
					/>
				)}

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

				{tutorials && (
					<ListingSection
						title={`Latest tutorials`}
						resources={tutorials}
						separator={false}
						includeCardFooter={false}
					/>
				)}
			</BaseLayout>
		);
	}
}
