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
	PLAYLIST_RESOURCE,
	TIP_RESOURCE,
	TUTORIAL_RESOURCE,
} from "../../src/resourceType";

const frontmatter: ChannelFrontmatter = {
	title: "Game Development",
	subtitle: "Learn how to build games with Unity, Unreal Engine, or Godot.",
	resourceType: "channel",
	date: new Date(Date.UTC(2023, 9, 11)),
	author: "maartenba",
	logo: "thumbnail.svg",
	hero: "/assets/splashes/gamedev.svg",
	subnav: [
		{ title: "Download", url: "https://www.jetbrains.com/gamedev/" },
		{
			title: "Unity",
			url: "https://blog.jetbrains.com/dotnet/tag/unity/",
		},
		{
			title: "Unreal",
			url: "https://blog.jetbrains.com/dotnet/tag/unreal-engine/",
		},
	],
};

export default class GameDevHomepage {
	data() {
		return {
			layout: "",
			...frontmatter,
		};
	}

	render(this: LayoutContext, data: ChannelHomepageData): JSX.Element {
		const channel: Channel = this.getResource(data.page.url) as Channel;

		const unityTutorials = this.getResources({
			resourceTypes: [TUTORIAL_RESOURCE],
			channel: channel.url,
			limit: 4,
			customFilter: (r) => r.topics?.includes("unity") == true,
			sorter: (a, b) => (a.date < b.date ? 1 : -1),
		});

		const unrealTutorials = this.getResources({
			resourceTypes: [TUTORIAL_RESOURCE],
			channel: channel.url,
			limit: 2,
			customFilter: (r) => r.topics?.includes("unreal") == true,
			sorter: (a, b) => (a.date > b.date ? 1 : -1),
		});

		const godotTutorials = this.getResources({
			resourceTypes: [TUTORIAL_RESOURCE],
			channel: channel.url,
			limit: 2,
			customFilter: (r) => r.topics?.includes("godot") == true,
			sorter: (a, b) => (a.date > b.date ? 1 : -1),
		});

		const tips = this.getResources({
			resourceTypes: [TIP_RESOURCE, LINK_RESOURCE],
			channel: channel.url,
			limit: 4,
		});

		const eventPlaylists = this.getResources({
			resourceTypes: [PLAYLIST_RESOURCE],
			channel: channel.url,
			limit: 4,
			customFilter: (r) => r.slug.indexOf("gamedev-day") >= 0,
		});

		return (
			<BaseLayout {...data}>
				<HeroSection
					title={channel.title}
					titleExtraClass={"has-text-white"}
					subtitle={channel.subtitle!}
					subtitleExtraClass={"has-text-white"}
					image={channel.hero!}
					extraContent={
						<div class="buttons are-medium">
							<a
								href="#learn-unity"
								class="button is-rounded is-light is-outlined"
							>
								Learn Unity
							</a>
							<a
								href="#learn-unreal-engine"
								class="button is-rounded is-light is-outlined"
							>
								Learn Unreal Engine
							</a>
							<a
								href="#learn-godot-engine"
								class="button is-rounded is-light is-outlined"
							>
								Learn Godot
							</a>
						</div>
					}
				/>

				{unityTutorials && (
					<ListingSection
						title={`Learn Unity`}
						anchor={"learn-unity"}
						resources={unityTutorials}
						includeCardFooter={false}
						separator={false}
						includeContentType={true}
					/>
				)}

				{unrealTutorials && (
					<ListingSection
						title={`Learn Unreal Engine`}
						anchor={"learn-unreal-engine"}
						resources={unrealTutorials}
						includeCardFooter={false}
						separator={false}
						includeContentType={true}
					/>
				)}

				{godotTutorials && (
					<ListingSection
						title={`Learn Godot Game Engine`}
						anchor={"learn-godot-engine"}
						resources={godotTutorials}
						includeCardFooter={false}
						separator={true}
						includeContentType={true}
					/>
				)}

				{tips && (
					<ListingSection
						title={`Latest tips`}
						resources={tips}
						moreLink={`${channel.url}tips/`}
						separator={false}
						sectionExtraClass={"has-background-grey-lighter"}
					/>
				)}

				{eventPlaylists && (
					<ListingSection
						title={`Past events`}
						resources={eventPlaylists}
						separator={false}
					/>
				)}
			</BaseLayout>
		);
	}
}
