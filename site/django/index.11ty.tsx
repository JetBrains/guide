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
import {
	LINK_RESOURCE,
	TIP_RESOURCE,
	TUTORIAL_RESOURCE,
} from "../../src/resourceType";

const frontmatter: ChannelFrontmatter = {
	title: "Django",
	subtitle: "Tips and content for development working with Django.",
	resourceType: "channel",
	date: new Date(Date.UTC(2023, 10, 20)),
	author: "hs",
	logo: "thumbnail.png",
	hero: "/assets/database_splash.svg",
	subnav: [{ title: "PyCharm", url: "https://www.jetbrains.com/pycharm/" }],
};

class DjangoHomepage {
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
			// customFilter: (r) =>
			// 	r.topics?.includes("databases") == true &&
			// 	r.topics?.includes("mongodb") == false,
		});

		// const mongodb = this.getResources({
		// 	resourceTypes: [TIP_RESOURCE, LINK_RESOURCE],
		// 	limit: 4,
		// 	customFilter: (r) =>
		// 		r.topics?.includes("mongodb") == true && r.slug.indexOf("mongodb") >= 0,
		// });

		const links = this.getResources({
			resourceTypes: [LINK_RESOURCE],
			limit: 4,
			channel: channel.url,
		});

		const tutorials = this.getResources({
			resourceTypes: [TUTORIAL_RESOURCE],
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
						title={`Latest tips`}
						resources={tips}
						moreLink={`/topics/django/`}
						separator={false}
						includeCardFooter={false}
						sectionExtraClass={"has-background-grey-lighter"}
					/>
				)}

				{links && (
					<ListingSection
						title={`Latest links`}
						resources={links}
						moreLink={`/django/links/`}
						separator={false}
						includeCardFooter={false}
					/>
				)}

				{tutorials && (
					<ListingSection
						title={`Latest tutorials`}
						resources={tutorials}
						//moreLink={`/django/tutorials/`}
						separator={false}
						includeCardFooter={false}
					/>
				)}

				{/*{mongodb && (*/}
				{/*	<ListingSection*/}
				{/*		title={`NoSQL with MongoDB`}*/}
				{/*		resources={mongodb}*/}
				{/*		separator={true}*/}
				{/*		includeCardFooter={false}*/}
				{/*	/>*/}
				{/*)}*/}
			</BaseLayout>
		);
	}
}

module.exports = DjangoHomepage;
