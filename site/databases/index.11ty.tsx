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
	title: "Databases",
	subtitle: "Tips and content for development using databases.",
	resourceType: "channel",
	date: new Date(Date.UTC(2023, 9, 29)),
	author: "hs",
	logo: "thumbnail.png",
	hero: "/assets/splashes/databases.png",
	subnav: [{ title: "DataGrip", url: "https://www.jetbrains.com/datagrip/" }],
};

export default class DatabasesHomepage {
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
			customFilter: (r) =>
				r.topics?.includes("databases") == true &&
				r.topics?.includes("mongodb") == false,
		});

		const mongodb = this.getResources({
			resourceTypes: [TIP_RESOURCE, LINK_RESOURCE],
			limit: 4,
			customFilter: (r) =>
				r.topics?.includes("mongodb") == true && r.slug.indexOf("mongodb") >= 0,
		});

		const springBoot = [
			this.getResource(
				"/java/tutorials/marco-codes-spring-boot/h2-database-intro/"
			),
			this.getResource(
				"/java/tutorials/marco-codes-spring-boot/spring-data-jdbc-repositories/"
			),
		];

		const dotnet = [
			this.getResource("/dotnet/tutorials/basics/entity-framework-core/"),
			this.getResource("/dotnet/tutorials/basics/ado-net/"),
			this.getResource("/dotnet/tutorials/basics/dapper/"),
		];

		const links = this.getResources({
			resourceTypes: [LINK_RESOURCE],
			limit: 4,
			channel: channel.url,
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
						moreLink={`/tags/databases/`}
						separator={false}
						includeCardFooter={false}
						sectionExtraClass={"has-background-grey-lighter"}
					/>
				)}

				{links && (
					<ListingSection
						title={`Latest links`}
						resources={links}
						moreLink={`/databases/links/`}
						separator={false}
						includeCardFooter={false}
					/>
				)}

				{mongodb && (
					<ListingSection
						title={`NoSQL with MongoDB`}
						resources={mongodb}
						separator={true}
						includeCardFooter={false}
						sectionExtraClass={"has-background-grey-lighter"}
					/>
				)}

				{springBoot && (
					<ListingSection
						title={`Spring Boot – Marco Codes`}
						resources={springBoot}
						//moreLink={`/idea/tutorials/marco-codes-spring-boot/`}
						separator={true}
						includeCardFooter={false}
					/>
				)}

				{dotnet && (
					<ListingSection
						title={`Data access in .NET`}
						resources={dotnet}
						//moreLink={`/dotnet/`}
						separator={true}
						includeCardFooter={false}
					/>
				)}
			</BaseLayout>
		);
	}
}
